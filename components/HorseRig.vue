<script setup>
defineProps({
  rolling: Boolean,
  cutaway: Boolean,
  hatchOpen: Boolean,
})
</script>

<template>
  <svg
    class="horse-svg"
    :class="{ rolling, cutaway, 'hatch-open': hatchOpen }"
    role="img"
    aria-label="Ngựa gỗ thành Troy"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 260 256"
    preserveAspectRatio="xMidYMid meet"
  >
    <!-- Wooden legs & tail -->
    <g class="wood-shell">
      <rect x="42.3" y="133.3" width="21.7" height="93.5" fill="#c28a52" />
      <rect x="70.5" y="133.3" width="21.7" height="93.5" fill="#8a5a2b" />
      <rect x="143.7" y="133.3" width="21.7" height="93.5" fill="#c28a52" />
      <rect x="166.3" y="133.3" width="21.7" height="93.5" fill="#8a5a2b" />
      <path d="M29.07 70.57l15.85 7.39L17.29 137.2 1.44 129.81Z" fill="#8a5a2b" />

      <!-- Main hollow wooden barrel torso -->
      <rect x="31.06" y="71.38" width="161.14" height="76.64" rx="17.69" fill="#c28a52" stroke="#7a4d22" stroke-width="1.5" />

      <!-- Neck, mane & head -->
      <path d="M171.49 20.87l17.93 9.53-41.27 77.61-17.93-9.53Z" fill="#8a5a2b" />
      <path d="M188.05 22.21L223.39 41l-43.91 82.58-35.34-18.79Z" fill="#c28a52" />
      <path d="M192.59 12.68c2.61-6.47 9.96-9.59 16.43-6.97l37.2 15.03c6.47 2.61 9.59 9.96 6.97 16.43l-2.36 5.85c-2.61 6.47-9.96 9.59-16.43 6.97L197.2 34.96c-6.47-2.6-9.59-9.95-6.98-16.41Z" fill="#c28a52" />
      <circle cx="226" cy="23.5" r="3.2" fill="#2b2118" />

      <!-- Plank seams -->
      <g stroke="#8a5a2b" stroke-width="2" stroke-linecap="round">
        <line x1="66.3" y1="74" x2="68.8" y2="145" />
        <line x1="100.1" y1="74" x2="102.6" y2="145" />
        <line x1="133.9" y1="74" x2="136.4" y2="145" />
        <line x1="167.7" y1="74" x2="170.2" y2="145" />
      </g>

      <!-- Side hatch / emblem panel -->
      <g class="side-hatch">
        <rect x="76.13" y="93.91" width="42.83" height="37.2" rx="2" fill="#efe6d6" stroke="#7a4d22" stroke-width="1.6" />
        <circle cx="97.54" cy="112.5" r="8.74" fill="#1f2a44" />
      </g>
    </g>

    <!-- Rolling wooden platform -->
    <rect x="22.61" y="223.48" width="178.03" height="13.27" rx="3" fill="#7a4d22" />

    <!-- Left wheel with spokes so clockwise rotation is clearly visible -->
    <g class="wheel wheel-left">
      <circle cx="53.9" cy="240.68" r="12.2" fill="#6e441f" stroke="#2b2118" stroke-width="1.6" />
      <line x1="53.9" y1="230" x2="53.9" y2="251.3" stroke="#e5d3b3" stroke-width="2" />
      <line x1="43.2" y1="240.68" x2="64.6" y2="240.68" stroke="#e5d3b3" stroke-width="2" />
      <circle cx="53.9" cy="240.68" r="3.2" fill="#c9a24d" />
    </g>

    <!-- Right wheel with spokes -->
    <g class="wheel wheel-right">
      <circle cx="183.46" cy="240.68" r="12.2" fill="#6e441f" stroke="#2b2118" stroke-width="1.6" />
      <line x1="183.46" y1="230" x2="183.46" y2="251.3" stroke="#e5d3b3" stroke-width="2" />
      <line x1="172.8" y1="240.68" x2="194.1" y2="240.68" stroke="#e5d3b3" stroke-width="2" />
      <circle cx="183.46" cy="240.68" r="3.2" fill="#c9a24d" />
    </g>
  </svg>
</template>

<style scoped>
.horse-svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}
.wood-shell {
  transition: opacity 0.6s ease;
}
.cutaway .wood-shell {
  opacity: 0.28;
}
.side-hatch {
  transform-origin: 76.13px 112.5px;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.hatch-open .side-hatch {
  transform: translateX(-8px) scaleX(0.22);
}
.wheel-left {
  transform-origin: 53.9px 240.68px;
}
.wheel-right {
  transform-origin: 183.46px 240.68px;
}
.rolling .wheel-left,
.rolling .wheel-right {
  animation: wheel-turn 1.15s cubic-bezier(0.22, 0.78, 0.24, 1) both;
}
@keyframes wheel-turn {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(540deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .wood-shell,
  .side-hatch,
  .rolling .wheel-left,
  .rolling .wheel-right {
    animation: none !important;
    transition: none !important;
  }
}
</style>
