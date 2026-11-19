<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { readPairing } from '../lib/phone-remote.mjs'

const status = ref('connecting')
const page = ref(1)
const total = ref(21)
const canNext = ref(false)
const canPrev = ref(false)
const pairing = readPairing(location.hash)
let peer
let connection
let timer
let sequence = 0
let generation = 0

function cleanup() {
  generation++
  clearTimeout(timer)
  connection?.close()
  connection = undefined
  peer?.destroy()
  peer = undefined
}

async function connect() {
  cleanup()
  if (!pairing) { status.value = 'invalid'; return }
  status.value = 'connecting'
  const current = generation
  try {
    const { Peer } = await import('peerjs')
    if (current !== generation) return
    peer = new Peer({ secure: true })
    timer = setTimeout(() => {
      if (current !== generation) return
      cleanup()
      status.value = 'error'
    }, 15000)
    const failed = () => {
      if (current !== generation) return
      cleanup()
      status.value = 'error'
    }
    peer.on('error', failed)
    peer.on('open', () => {
      if (current !== generation) return
      connection = peer.connect(pairing.peer, { reliable: true, metadata: { key: pairing.key } })
      connection.on('data', (message) => {
        if (current !== generation || message?.type !== 'state') return
        clearTimeout(timer)
        status.value = 'connected'
        page.value = message.page
        total.value = message.total
        canNext.value = message.next
        canPrev.value = message.prev
      })
      connection.on('close', failed)
      connection.on('error', failed)
    })
  } catch {
    if (current !== generation) return
    cleanup()
    status.value = 'error'
  }
}

function navigate(action) {
  if (status.value !== 'connected' || !connection?.open) return
  connection.send({ type: 'navigate', key: pairing.key, action, sequence: ++sequence })
  navigator.vibrate?.(15)
}
onMounted(connect)
onBeforeUnmount(cleanup)
</script>

<template>
  <main class="phone-remote-page">
    <div class="phone-remote-content">
      <p class="phone-eyebrow">TROY · REMOTE</p>
      <h1>Điều khiển slide</h1>
      <p class="phone-remote-status" role="status">
        <template v-if="status === 'connected'">Đã kết nối · Slide {{ page }} / {{ total }}</template>
        <template v-else-if="status === 'connecting'">Đang kết nối với màn hình…</template>
        <template v-else-if="status === 'invalid'">Mã QR không hợp lệ. Quét lại mã trên máy tính.</template>
        <template v-else>Mất kết nối. Kiểm tra Internet hoặc quét lại mã QR trên máy tính.</template>
      </p>
      <div class="phone-remote-buttons">
        <button aria-label="Lùi một nhịp" :disabled="status !== 'connected' || !canPrev" @click="navigate('prev')">
          <span aria-hidden="true">←</span><span>Lùi</span>
        </button>
        <button aria-label="Tới một nhịp" :disabled="status !== 'connected' || !canNext" @click="navigate('next')">
          <span aria-hidden="true">→</span><span>Tới</span>
        </button>
      </div>
      <button v-if="status === 'error'" class="phone-pair-action" @click="connect">Kết nối lại</button>
    </div>
  </main>
</template>
