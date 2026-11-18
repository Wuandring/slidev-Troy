<script setup>
import { computed } from 'vue'
import HorseRig from './HorseRig.vue'
import TroyCharacters from './TroyCharacters.vue'

const props = defineProps({
  step: { type: Number, default: 0 },
  mode: { type: String, default: 'intro' }, // 'intro' | 'closing' | 'siege' | 'fall' | 'oracle' | 'mini'
})

const s = computed(() => props.step || 0)
const base = import.meta.env.BASE_URL

// Slide 1 (intro): s=0 hero, s=1 CI + peeking horse
// Slide 2 (siege): s=0 day-night pass, s=1 tired guard, s=2 takeaway
// Slide 6 (fall):  s=0 horse arrives, s=1 scan + 5 features, s=2 gate opens & horse enters, s=3 night + hatch + soldiers jump & grow, s=4 question
// Slide 12 (oracle): s=0 closed horse, s=1 X-ray cutaway + magnifying glass zoom on 3 soldiers, s=2 Clue 2
// Slide 21 (closing): s=0 gate + question, s=1 Thank you
const gateOpen = computed(() => props.mode === 'fall' && s.value >= 2)
const nightMode = computed(() => props.mode === 'fall' && s.value >= 3)
const duskMode = computed(() => props.mode === 'intro' || props.mode === 'closing')
const cutaway = computed(() => props.mode === 'oracle' && s.value >= 1)
const hatchOpen = computed(() => props.mode === 'fall' && s.value >= 3)
const fallAmbush = computed(() => props.mode === 'fall' && s.value >= 3)
const isRolling = computed(() => props.mode === 'fall' && (s.value === 0 || s.value === 2))
const isScanning = computed(() => (props.mode === 'fall' && s.value === 1) || (props.mode === 'oracle' && s.value === 1))

const showHorse = computed(() => {
  if (props.mode === 'siege') return false
  if (props.mode === 'intro') return s.value >= 1
  return true
})

const showCi = computed(() => {
  if (props.mode === 'oracle' || props.mode === 'siege') return false
  if (props.mode === 'intro') return s.value >= 1
  return true
})

const guardPose = computed(() => {
  if (props.mode === 'siege' && s.value >= 1) return 'tired'
  if (props.mode === 'fall' && s.value === 2) return 'open-gate'
  if (props.mode === 'oracle') return 'look-left'
  if (props.mode === 'closing') return 'look-left'
  return 'idle'
})

const features = ['4 chân', 'Thân lớn', 'Cao', 'Bờm', 'Móng']
</script>

<template>
  <div
    class="troy-scene"
    :data-step="s"
    :class="[
      'mode-' + mode,
      {
        'gate-open': gateOpen,
        'is-night': nightMode,
        'is-dusk': duskMode,
        'is-cutaway': cutaway,
        'is-ambush': fallAmbush,
      },
    ]"
  >
    <!-- Full-bleed Trojan Gate Artwork -->
    <template v-if="mode !== 'oracle'">
      <img class="city-art" :src="base + 'troy/city.png'" alt="Cổng thành Troy" />
      <div class="siege-glow" :class="{ active: nightMode }"></div>
      <div class="left-scrim"></div>

      <!-- Double wooden gate doors -->
      <div class="gate-doors" aria-hidden="true">
        <div class="door-leaf door-left"></div>
        <div class="door-leaf door-right"></div>
      </div>
    </template>

    <!-- Studio backdrop for Oracle X-ray & Magnifying Glass stage (Slide 12) -->
    <div v-else class="oracle-backdrop">
      <span class="oracle-stage-tag" :class="{ shown: cutaway }">Cảm biến bên trong</span>

      <!-- Sensor Ring + Diagonal Arrow + Magnifying Glass Zoom Lens (matching user's sketch!) -->
      <div class="belly-ring" :class="{ shown: cutaway }"></div>

      <svg class="zoom-connector" :class="{ shown: cutaway }" viewBox="0 0 560 350" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M 178 206 Q 248 176 318 124"
          fill="none"
          stroke="#1b2640"
          stroke-width="2.8"
          stroke-linecap="round"
        />
        <polyline
          points="304,121 320,122 314,137"
          fill="none"
          stroke="#1b2640"
          stroke-width="2.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <!-- Magnifying Glass Zoom Lens in top-right above Guard -->
      <div class="magnifier-widget" :class="{ shown: cutaway }" aria-hidden="true">
        <div class="magnifier-lens">
          <div class="lens-wood-bg"></div>
          <div class="lens-soldiers">
            <div v-for="i in 3" :key="i" class="zoomed-soldier">
              <TroyCharacters role="soldier" />
            </div>
          </div>
          <div class="lens-glare"></div>
        </div>
        <div class="magnifier-handle"></div>
      </div>
    </div>

    <!-- Right-tower foreground occlusion mask -->
    <img
      v-if="mode === 'fall'"
      class="city-mask-right"
      :src="base + 'troy/city.png'"
      alt=""
      aria-hidden="true"
    />

    <!-- Trojan Wooden Horse Rig -->
    <div
      class="horse-stage"
      :class="{
        visible: showHorse,
        peeking: mode === 'intro',
        entering: gateOpen,
        'initial-roll': mode === 'fall' && s === 0,
      }"
    >
      <HorseRig :rolling="isRolling" :cutaway="cutaway" :hatch-open="hatchOpen" />

      <!-- Small cutaway soldiers inside horse belly on Slide 12 -->
      <div v-if="mode === 'oracle'" class="belly-soldiers" :class="{ shown: cutaway }">
        <div
          v-for="i in 3"
          :key="i"
          class="belly-soldier"
          :style="{ '--i': i }"
        >
          <TroyCharacters role="soldier" />
        </div>
      </div>

      <!-- Optical / X-ray scanner beam -->
      <div v-if="isScanning" class="scan-beam"></div>
    </div>

    <!-- Slide 6 Ambush Soldiers: start small at horse hatch and smoothly GROW to full human scale on the road! -->
    <div v-if="mode === 'fall'" class="ambush-layer" aria-hidden="true">
      <div
        v-for="i in 3"
        :key="i"
        class="ambush-soldier"
        :class="{ deployed: fallAmbush }"
        :style="{ '--i': i }"
      >
        <TroyCharacters role="soldier" />
      </div>
    </div>

    <!-- Requirement stone marker on Closing Slide 21 -->
    <div v-if="mode === 'closing'" class="req-pillar">
      <span>YÊU CẦU</span>
      <strong>Ngựa thật?</strong>
    </div>

    <!-- Trojan Gate Guard -->
    <div class="guard-stage">
      <TroyCharacters role="guard" :pose="guardPose" />
    </div>

    <!-- CI · main PASS HUD badge -->
    <div v-if="mode !== 'oracle' && mode !== 'siege'" class="ci-hud" :class="{ shown: showCi }">
      <span class="ci-dot">✓</span>
      <span class="ci-name">CI · main</span>
      <strong class="ci-pass">PASS</strong>
    </div>

    <!-- 5 Feature Inspection Pills on Slide 6 -->
    <div v-if="mode === 'fall'" class="feature-hud" :class="{ active: s === 1 }">
      <span v-for="(f, i) in features" :key="f" :style="{ '--i': i }">
        <i>✓</i> {{ f }}
      </span>
    </div>

    <!-- Threshold & Climax Status Badges on Slide 6 -->
    <template v-if="mode === 'fall'">
      <div class="arch-badge amber" :class="{ shown: s === 2 }">
        CỔNG ĐÃ MỞ
      </div>
      <div class="arch-badge crimson" :class="{ shown: s >= 3 }">
        Troy thất thủ · CI vẫn xanh
      </div>
    </template>
  </div>
</template>

<style scoped>
.troy-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  isolation: isolate;
  pointer-events: none;
  z-index: 1;
}

.city-art,
.city-mask-right {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  transition: filter 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.city-art { z-index: 1; }

.city-mask-right {
  z-index: 5;
  clip-path: polygon(80.8% 22%, 100% 22%, 100% 91.2%, 80.8% 91.2%);
}

.mode-intro .city-art {
  animation: scene-settle 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.is-dusk .city-art,
.is-dusk .city-mask-right {
  filter: brightness(0.76) saturate(0.95) contrast(1.04);
}

.is-night .city-art,
.is-night .city-mask-right {
  filter: brightness(0.54) saturate(0.82) contrast(1.08) hue-rotate(-14deg);
}

.mode-siege[data-step="0"] .city-art {
  animation: siege-day-night 1.5s ease-in-out both;
}

.siege-glow {
  position: absolute;
  right: 11%;
  bottom: 9%;
  width: 28%;
  height: 36%;
  z-index: 2;
  opacity: 0;
  transform: scale(0.9);
  background: radial-gradient(circle, rgba(224, 88, 46, 0.48) 0%, rgba(224, 88, 46, 0) 72%);
  transition: opacity 0.65s ease, transform 0.65s ease;
}

.siege-glow.active {
  opacity: 1;
  transform: scale(1);
}

.left-scrim {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.mode-intro .left-scrim,
.mode-closing .left-scrim {
  background:
    linear-gradient(96deg, rgba(22, 18, 14, 0.95) 0%, rgba(24, 19, 15, 0.87) 39%, rgba(27, 22, 17, 0.35) 60%, rgba(27, 22, 17, 0.06) 80%),
    linear-gradient(0deg, rgba(18, 14, 11, 0.78) 0%, rgba(18, 14, 11, 0) 13%);
}

.mode-siege .left-scrim {
  background:
    linear-gradient(95deg, #f3e9d2 0%, rgba(243, 233, 210, 0.96) 38%, rgba(243, 233, 210, 0.62) 53%, rgba(243, 233, 210, 0) 69%),
    linear-gradient(0deg, rgba(35, 27, 19, 0.68) 0%, rgba(35, 27, 19, 0) 12%);
}

.mode-fall .left-scrim {
  background:
    linear-gradient(95deg, rgba(22, 18, 14, 0.95) 0%, rgba(24, 19, 15, 0.88) 39%, rgba(24, 19, 15, 0.36) 57%, rgba(24, 19, 15, 0) 74%),
    linear-gradient(0deg, rgba(16, 13, 10, 0.82) 0%, rgba(16, 13, 10, 0) 13%);
}

/* Gate Doors */
.gate-doors {
  position: absolute;
  left: 68.3%;
  top: 61.7%;
  width: 12.5%;
  height: 29.3%;
  display: flex;
  perspective: 650px;
  z-index: 3;
  border-radius: 49% 49% 0 0;
  overflow: hidden;
}

.door-leaf {
  width: 50%;
  height: 100%;
  background:
    repeating-linear-gradient(90deg, #6e4726 0 10px, #5d3b1e 10px 12px),
    linear-gradient(180deg, #523319 0%, #784e2b 45%, #5c3a1e 100%);
  border: 2px solid #3f2712;
  box-shadow: inset 0 8px 18px rgba(0, 0, 0, 0.35);
  transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), filter 0.55s ease;
}

.door-left { transform-origin: left center; }
.door-right { transform-origin: right center; }

.gate-open .door-left { transform: rotateY(80deg); }
.gate-open .door-right { transform: rotateY(-80deg); }

.is-night .door-leaf,
.is-dusk .door-leaf {
  filter: brightness(0.68);
}

/* Horse Stage */
.horse-stage {
  position: absolute;
  left: 43%;
  bottom: 64px;
  width: 196px;
  z-index: 4;
  opacity: 0;
  transform: translate3d(-180px, 0, 0);
  transition:
    transform 1.05s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}

.horse-stage.visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.horse-stage.initial-roll.visible {
  animation: horse-roll-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.horse-stage.peeking {
  left: 36%;
  bottom: 62px;
  width: 126px;
  filter: brightness(0.75) contrast(1.05);
  transform: translate3d(-28px, 0, 0);
}

.horse-stage.peeking.visible {
  opacity: 0.9;
  transform: translate3d(0, 0, 0);
}

.mode-closing .horse-stage.visible {
  left: 45%;
  bottom: 64px;
  width: 176px;
}

.horse-stage.entering.visible {
  transform: translate3d(255px, 0, 0) scale(0.84);
}

/* =========================================================
   SLIDE 6 AMBUSH SOLDIERS: JUMP FROM HATCH & GROW TO FULL SIZE!
   ========================================================= */
.ambush-layer {
  position: absolute;
  inset: 0;
  z-index: 8;
  pointer-events: none;
}

.ambush-soldier {
  position: absolute;
  width: 78px;
  left: 66.5%;
  bottom: 142px;
  transform-origin: bottom center;
  opacity: 0;
  transform: translate3d(0, 0, 0) scale(0.22);
  transition:
    transform 0.95s cubic-bezier(0.2, 0.9, 0.25, 1),
    opacity 0.35s ease;
  will-change: transform, opacity;
}

.ambush-soldier.deployed {
  opacity: 1;
  /* Land on foreground road (bottom: 60px) and scale up to 1.0 (78px wide, matching guard!) */
  transform: translate3d(calc((var(--i) - 2) * 74px - 56px), 82px, 0) scale(1);
  transition-delay: calc((var(--i) - 1) * 150ms);
}

/* Scanner Beam */
.scan-beam {
  position: absolute;
  top: 6%;
  bottom: 4%;
  left: 0;
  width: 14px;
  background: linear-gradient(90deg, rgba(111, 224, 162, 0), rgba(111, 224, 162, 0.65), rgba(111, 224, 162, 0));
  border-left: 2px solid #7fd1a0;
  z-index: 7;
  animation: sweep-x 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.mode-oracle .scan-beam {
  top: 24%;
  bottom: 36%;
  left: 14%;
  width: 12px;
  animation: sweep-body 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* Guard Stage */
.guard-stage {
  position: absolute;
  right: 16.5%;
  bottom: 62px;
  width: 92px;
  z-index: 7;
}

.mode-closing .guard-stage {
  right: 21%;
  width: 94px;
}

.req-pillar {
  position: absolute;
  right: 11.5%;
  bottom: 72px;
  z-index: 7;
  padding: 9px 13px;
  border-radius: 8px;
  background: rgba(29, 23, 18, 0.92);
  border: 1px solid rgba(201, 162, 77, 0.65);
  color: #f5ebd5;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.32);
}

.req-pillar span {
  display: block;
  font: 700 9px/1.2 'Be Vietnam Pro', sans-serif;
  letter-spacing: 1.6px;
  color: #c9a24d;
  margin-bottom: 3px;
}

.req-pillar strong {
  font: 600 13px/1.2 'Be Vietnam Pro', sans-serif;
  color: #f5ebd5 !important;
}

/* CI HUD Pill */
.ci-hud {
  position: absolute;
  top: 76px;
  right: 224px;
  z-index: 9;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 15px;
  border-radius: 999px;
  background: #14241b;
  border: 1.5px solid #59c987;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  color: #f0fcf5;
  font: 600 14px/1 'JetBrains Mono', Consolas, monospace;
  opacity: 0;
  transform: translate3d(0, -8px, 0);
  transition: opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1), transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}

.ci-hud.shown {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.ci-dot {
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #2f9e66;
  color: #fff;
  font-size: 12px;
}

.ci-pass {
  color: #84e8ae !important;
  letter-spacing: 1px;
  margin-left: 4px;
}

/* Feature HUD pills on Slide 6 */
.feature-hud {
  position: absolute;
  left: 40.5%;
  bottom: 274px;
  z-index: 9;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-width: 340px;
  pointer-events: none;
}

.feature-hud span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #17573a;
  border: 1px solid #8be4b1;
  color: #f4fcf7;
  font: 600 12.5px/1 'Be Vietnam Pro', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.28);
  opacity: 0;
  transform: translate3d(0, 8px, 0);
  transition: opacity 0.32s cubic-bezier(0.22, 1, 0.36, 1), transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
}

.feature-hud.active span {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition-delay: calc(var(--i) * 0.08s);
}

.feature-hud i {
  font-style: normal;
  color: #8ce6b2;
}

.arch-badge {
  position: absolute;
  right: 9.5%;
  top: 152px;
  z-index: 9;
  padding: 9px 16px;
  border-radius: 10px;
  font: 700 14px/1.2 'Be Vietnam Pro', sans-serif;
  letter-spacing: 0.3px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.42);
  opacity: 0;
  transform: translate3d(0, 6px, 0);
  transition: opacity 0.38s cubic-bezier(0.22, 1, 0.36, 1), transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}

.arch-badge.shown {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.arch-badge.amber {
  background: #2e200d;
  border: 1.5px solid #f0b24a;
  color: #ffe29e;
}

.arch-badge.crimson {
  background: #331311;
  border: 1.5px solid #f07668;
  color: #ffe3df;
}

/* =========================================================
   SLIDE 12: ORACLE STAGE WITH MAGNIFYING GLASS ZOOM
   ========================================================= */
.mode-oracle {
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 16px;
  background:
    radial-gradient(circle at 32% 58%, rgba(201, 162, 77, 0.16), transparent 58%),
    linear-gradient(180deg, #f3ecdf 0%, #e7dcc8 82%, #d8c8ad 82%, #d1bfa1 100%);
  border: 1px solid #d5c7b0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 10px 28px rgba(31, 42, 68, 0.06);
}

.oracle-backdrop {
  position: absolute;
  inset: 0;
  z-index: 8;
}

.oracle-stage-tag {
  position: absolute;
  top: 14px;
  left: 16px;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(27, 38, 64, 0.09);
  border: 1px solid rgba(27, 38, 64, 0.16);
  color: #1b2640;
  font: 600 12px/1.1 'Be Vietnam Pro', sans-serif;
  opacity: 0;
  transform: translate3d(0, -4px, 0);
  transition: opacity 0.38s ease, transform 0.38s ease;
}

.oracle-stage-tag.shown {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.mode-oracle .horse-stage {
  left: 20px;
  bottom: 22px;
  width: 248px;
  transform: none;
  opacity: 1;
}

.mode-oracle .guard-stage {
  right: 28px;
  bottom: 18px;
  width: 82px;
}

/* Small cutaway soldiers inside horse belly */
.belly-soldiers {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.45s ease;
}

.belly-soldiers.shown {
  opacity: 1;
}

.belly-soldier {
  position: absolute;
  width: 28px;
  left: 33%;
  bottom: 43%;
  transform: translateX(calc((var(--i) - 2) * 22px));
}

/* Dashed highlight circle around horse belly */
.belly-ring {
  position: absolute;
  left: 56px;
  bottom: 98px;
  width: 122px;
  height: 96px;
  border-radius: 50%;
  border: 2.5px dashed #1b2640;
  background: rgba(27, 38, 64, 0.04);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.belly-ring.shown {
  opacity: 0.85;
  transform: scale(1);
}

/* Diagonal connector arrow from belly ring up-right to magnifying glass */
.zoom-connector {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease 0.12s;
}

.zoom-connector.shown {
  opacity: 0.85;
}

/* Magnifying Glass Widget in top-right (above Guard, matching user's drawing!) */
.magnifier-widget {
  position: absolute;
  top: 16px;
  right: 48px;
  width: 146px;
  height: 146px;
  opacity: 0;
  transform: translate3d(-40px, 32px, 0) scale(0.45);
  transition:
    transform 0.58s cubic-bezier(0.16, 1, 0.3, 1) 0.14s,
    opacity 0.4s ease 0.14s;
  will-change: transform, opacity;
}

.magnifier-widget.shown {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.magnifier-lens {
  position: relative;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  border: 6px solid #1b2640;
  background: radial-gradient(circle at 38% 32%, #fffdf8 0%, #f5ebd8 68%, #e6d5b8 100%);
  box-shadow:
    0 12px 26px rgba(27, 38, 64, 0.24),
    inset 0 0 0 3px rgba(255, 255, 255, 0.75);
  overflow: hidden;
}

.lens-wood-bg {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    rgba(194, 138, 82, 0.14) 0 24px,
    rgba(138, 90, 43, 0.22) 24px 26px
  );
}

.lens-soldiers {
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 2px;
}

.zoomed-soldier {
  width: 42px;
  flex-shrink: 0;
}

.lens-glare {
  position: absolute;
  top: 8px;
  left: 14px;
  width: 44px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  transform: rotate(-28deg);
}

.magnifier-handle {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 44px;
  height: 13px;
  border-radius: 999px;
  background: linear-gradient(180deg, #2d3c5e, #1b2640);
  border: 2px solid #111829;
  transform: rotate(42deg);
  transform-origin: left center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.22);
}

@keyframes scene-settle {
  from { transform: scale(1.025); }
  to { transform: scale(1); }
}

@keyframes horse-roll-in {
  from { opacity: 0; transform: translate3d(-190px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}

@keyframes siege-day-night {
  0%, 100% { filter: brightness(1); }
  38% { filter: brightness(0.58) hue-rotate(-10deg); }
  68% { filter: brightness(0.9); }
  84% { filter: brightness(0.7); }
}

@keyframes sweep-x {
  from { transform: translate3d(0, 0, 0); opacity: 0.9; }
  to { transform: translate3d(188px, 0, 0); opacity: 0; }
}

@keyframes sweep-body {
  from { transform: translate3d(0, 0, 0); opacity: 0.95; }
  to { transform: translate3d(155px, 0, 0); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .city-art,
  .city-mask-right,
  .siege-glow,
  .door-leaf,
  .horse-stage,
  .ambush-soldier,
  .scan-beam,
  .ci-hud,
  .feature-hud span,
  .arch-badge,
  .oracle-stage-tag,
  .belly-ring,
  .zoom-connector,
  .magnifier-widget {
    animation: none !important;
    transition: none !important;
  }
}
</style>
