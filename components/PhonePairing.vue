<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { renderSVG } from 'uqr'
import { makeRemoteUrl, commandReceiver } from '../lib/phone-remote.mjs'

const nav = useNav()
const visible = ref(false)
const dialog = ref()
const status = ref('idle')
const error = ref('')
const url = ref('')
const qr = computed(() => url.value ? renderSVG(url.value, { border: 4, ecc: 'M' }) : '')
let peer
let connection
let generation = 0
let pairingTimer
let connectionTimer
let navigation = Promise.resolve()
watch(visible, async (open) => {
  if (open) {
    await nextTick()
    dialog.value?.querySelector('button')?.focus()
  }
})

function trapFocus(event) {
  if (event.key !== 'Tab') return
  const items = [...dialog.value.querySelectorAll('button, a[href]')]
  const first = items[0]
  const last = items.at(-1)
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function sendState() {
  if (connection?.open) connection.send({
    type: 'state', page: nav.currentSlideNo.value, total: nav.total.value,
    next: nav.hasNext.value, prev: nav.hasPrev.value,
  })
}
watch(() => [nav.currentSlideNo.value, nav.clicksContext.value.current, nav.hasNext.value, nav.hasPrev.value], sendState)

function stop() {
  generation++
  clearTimeout(pairingTimer)
  clearTimeout(connectionTimer)
  connection?.close()
  connection = undefined
  peer?.destroy()
  peer = undefined
  url.value = ''
  status.value = 'idle'
}

async function start() {
  stop()
  error.value = ''
  status.value = 'starting'
  const current = generation
  const key = [...crypto.getRandomValues(new Uint8Array(16))].map(n => n.toString(16).padStart(2, '0')).join('')
  try {
    const { Peer } = await import('peerjs')
    if (current !== generation) return
    peer = new Peer({ secure: true })
    pairingTimer = setTimeout(() => {
      if (current !== generation || status.value !== 'starting') return
      stop()
      error.value = 'Chưa kết nối được. Kiểm tra Internet rồi tạo lại QR.'
    }, 15000)
    peer.on('open', (id) => {
      if (current !== generation) return
      clearTimeout(pairingTimer)
      url.value = makeRemoteUrl(new URL(import.meta.env.BASE_URL, location.origin), id, key)
      status.value = 'waiting'
    })
    peer.on('connection', (incoming) => {
      if (current !== generation || incoming.metadata?.key !== key || connection) {
        incoming.close()
        return
      }
      connection = incoming
      const receive = commandReceiver(key, action => {
        navigation = navigation.then(() => {
          if (current === generation && connection === incoming) return nav[action]()
        }).catch(() => {})
      })
      connectionTimer = setTimeout(() => {
        if (current !== generation || connection !== incoming) return
        connection = undefined
        incoming.close()
      }, 15000)
      incoming.on('open', () => {
        if (current !== generation) return
        clearTimeout(connectionTimer)
        status.value = 'connected'
        visible.value = false
        sendState()
      })
      incoming.on('data', receive)
      const disconnected = () => {
        if (current !== generation || connection !== incoming) return
        clearTimeout(connectionTimer)
        connection = undefined
        status.value = 'waiting'
      }
      incoming.on('close', disconnected)
      incoming.on('error', disconnected)
    })
    peer.on('error', () => {
      if (current !== generation) return
      stop()
      error.value = 'Kết nối bị gián đoạn. Kiểm tra Internet rồi tạo lại QR.'
    })
    peer.on('disconnected', () => {
      if (current === generation && !peer.destroyed) peer.reconnect()
    })
  } catch {
    if (current !== generation) return
    stop()
    error.value = 'Không mở được điều khiển. Kiểm tra Internet rồi thử lại.'
  }
}

function open() {
  visible.value = true
  if (status.value === 'idle') start()
}
onBeforeUnmount(stop)
</script>

<template>
  <button class="icon-btn phone-qr-trigger" title="Điều khiển bằng điện thoại" aria-label="Mở mã QR điều khiển" @click="open">
    <span class="i-carbon:qr-code" aria-hidden="true" />
    <span class="phone-qr-label">QR</span>
    <span v-if="status === 'connected'" class="phone-connected-dot" />
  </button>
  <Teleport to="body">
    <div v-if="visible" class="phone-pair-backdrop" @click.self="visible = false" @keydown.esc="visible = false">
      <section ref="dialog" class="phone-pair-dialog" role="dialog" aria-modal="true" aria-labelledby="phone-pair-title" @keydown="trapFocus">
        <button class="phone-pair-close" aria-label="Đóng mã QR" autofocus @click="visible = false">×</button>
        <p class="phone-eyebrow">TROY · REMOTE</p>
        <h2 id="phone-pair-title">Quét để điều khiển</h2>
        <p>Dùng camera điện thoại quét mã QR.<br />Điện thoại sẽ có hai nút lùi và tới.</p>
        <div v-if="qr" class="phone-pair-qr" v-html="qr" />
        <p v-else-if="status === 'starting'" role="status">Đang tạo mã QR…</p>
        <p v-if="error" class="phone-pair-error" role="alert">{{ error }}</p>
        <p v-if="status === 'connected'" class="phone-pair-status">Đã kết nối điện thoại</p>
        <a v-if="url" class="phone-pair-link" :href="url" target="_blank" rel="noopener noreferrer">Mở bộ điều khiển trong tab mới ↗</a>
        <button v-if="error" class="phone-pair-action" @click="start">Tạo lại mã QR</button>
        <button v-if="url" class="phone-pair-action" @click="stop">Kết thúc điều khiển</button>
      </section>
    </div>
  </Teleport>
</template>
