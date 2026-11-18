<script setup>
defineProps({
  role: { type: String, default: 'guard' }, // 'guard' | 'cassandra' | 'real-horse' | 'soldier'
  pose: { type: String, default: 'idle' },  // 'idle' | 'tired' | 'alert' | 'open-gate' | 'look-left' | 'warn'
  coat: { type: String, default: '#7c4d2b' },
})
</script>

<template>
  <!-- Trojan Guard: exact deck SVG style with articulated head & spear arm -->
  <svg
    v-if="role === 'guard' || role === 'soldier'"
    class="char-svg guard-char"
    :class="['pose-' + pose, { 'is-soldier': role === 'soldier' }]"
    viewBox="0 0 172 274"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g class="guard-body">
      <!-- Tunic & cloak -->
      <path d="M12.5 270.8L44.6 80.8h64.2L141 270.8Z" :fill="role === 'soldier' ? '#354664' : '#8b6b43'" stroke="#2b2118" stroke-width="2" />
      <line x1="51.6" y1="264.9" x2="62.2" y2="146.8" stroke="#2b2118" stroke-width="2" />
      <line x1="93" y1="146.9" x2="103.6" y2="265.1" stroke="#2b2118" stroke-width="2" />
      <!-- Left arm -->
      <rect x="9" y="96" width="22" height="66" rx="8" transform="rotate(-13 20 129)" :fill="role === 'soldier' ? '#354664' : '#8b6b43'" stroke="#2b2118" stroke-width="2" />

      <!-- Articulated Head -->
      <g class="guard-head">
        <rect x="68.8" y="2" width="15.8" height="23" rx="2" :fill="role === 'soldier' ? '#b4572b' : '#7a2e22'" stroke="#2b2118" stroke-width="1.6" />
        <circle cx="76.8" cy="56" r="30" fill="#e8d4ae" stroke="#2b2118" stroke-width="2" />
        <rect x="43" y="21" width="67.7" height="27" rx="12" :fill="role === 'soldier' ? '#4a5a78' : '#9a7b4f'" stroke="#2b2118" stroke-width="2" />
        <g class="guard-eyes">
          <circle cx="63.2" cy="58" r="3.7" fill="#2b2118" />
          <circle cx="90.1" cy="58" r="3.7" fill="#2b2118" />
          <line x1="54" y1="48" x2="69" y2="49.5" stroke="#2b2118" stroke-width="2" stroke-linecap="round" />
          <line x1="83" y1="49.5" x2="98" y2="48" stroke="#2b2118" stroke-width="2" stroke-linecap="round" />
        </g>
        <ellipse cx="76.7" cy="73.5" rx="7.2" ry="4.3" fill="#2b2118" />
      </g>

      <!-- Articulated Right Arm + Spear -->
      <g class="guard-spear-arm">
        <rect x="121" y="96" width="22" height="66" rx="8" transform="rotate(13 132 129)" :fill="role === 'soldier' ? '#354664' : '#8b6b43'" stroke="#2b2118" stroke-width="2" />
        <line x1="157.5" y1="18" x2="160" y2="270" stroke="#7a5230" stroke-width="3.6" stroke-linecap="round" />
        <path d="M150 23L157.8 2L165.6 23Z" fill="#a8b0b8" stroke="#2b2118" stroke-width="1.8" />
      </g>
    </g>
  </svg>

  <!-- Cassandra: matching 2D flat geometric vector style (distinct prophetess character) -->
  <svg
    v-else-if="role === 'cassandra'"
    class="char-svg cassandra-char"
    :class="'pose-' + pose"
    viewBox="0 0 172 274"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <!-- Dark hair back -->
    <path d="M44 48C44 24 60 16 84 16C108 16 122 26 122 50L128 112H40Z" fill="#2b2118" />
    <!-- Prophetess robe & golden sash -->
    <path d="M24 270L52 86h64l28 184Z" fill="#7a2e22" stroke="#2b2118" stroke-width="2" />
    <path d="M62 86L84 156L106 86Z" fill="#c9a24d" opacity="0.9" />
    <line x1="66" y1="266" x2="74" y2="152" stroke="#2b2118" stroke-width="1.8" />
    <line x1="94" y1="152" x2="102" y2="266" stroke="#2b2118" stroke-width="1.8" />
    <!-- Left arm resting -->
    <rect x="28" y="96" width="20" height="62" rx="9" transform="rotate(14 38 127)" fill="#7a2e22" stroke="#2b2118" stroke-width="2" />
    <!-- Raised right warning arm -->
    <g class="cassandra-arm">
      <rect x="116" y="64" width="20" height="64" rx="9" transform="rotate(-28 126 96)" fill="#7a2e22" stroke="#2b2118" stroke-width="2" />
      <circle cx="141" cy="63" r="8" fill="#e8d4ae" stroke="#2b2118" stroke-width="1.8" />
    </g>
    <!-- Head & golden laurel fillet -->
    <circle cx="84" cy="54" r="28" fill="#e8d4ae" stroke="#2b2118" stroke-width="2" />
    <path d="M55 44Q84 22 113 44L111 33Q84 14 57 33Z" fill="#2b2118" />
    <path d="M56 40Q84 28 112 40" fill="none" stroke="#c9a24d" stroke-width="4" stroke-linecap="round" />
    <circle cx="72" cy="55" r="3.4" fill="#2b2118" />
    <circle cx="96" cy="55" r="3.4" fill="#2b2118" />
    <path d="M65 46L78 48" stroke="#2b2118" stroke-width="2" stroke-linecap="round" />
    <path d="M103 46L90 48" stroke="#2b2118" stroke-width="2" stroke-linecap="round" />
    <path d="M77 70Q84 66 91 70" fill="none" stroke="#2b2118" stroke-width="2.2" stroke-linecap="round" />
  </svg>

  <!-- Living Horse (organic silhouette, no wheels, subtle breathing) -->
  <svg
    v-else-if="role === 'real-horse'"
    class="char-svg real-horse-char"
    viewBox="0 0 220 175"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g class="horse-breathe">
      <!-- Flowing tail -->
      <path d="M36 74C16 78 10 98 14 122C24 114 31 98 40 84Z" fill="#2b2118" />
      <!-- Legs + hooves -->
      <path d="M54 108L48 164h12l6-56Z" :fill="coat" stroke="#2b2118" stroke-width="1.6" />
      <path d="M74 108L72 164h12l2-56Z" :fill="coat" opacity="0.85" stroke="#2b2118" stroke-width="1.6" />
      <path d="M138 108L136 164h12l3-56Z" :fill="coat" opacity="0.85" stroke="#2b2118" stroke-width="1.6" />
      <path d="M156 108L162 164h12l-6-56Z" :fill="coat" stroke="#2b2118" stroke-width="1.6" />
      <rect x="47" y="158" width="13" height="7" rx="1.5" fill="#2b2118" />
      <rect x="71" y="158" width="13" height="7" rx="1.5" fill="#2b2118" />
      <rect x="135" y="158" width="13" height="7" rx="1.5" fill="#2b2118" />
      <rect x="161" y="158" width="13" height="7" rx="1.5" fill="#2b2118" />
      <!-- Organic torso, neck & head -->
      <ellipse cx="108" cy="88" rx="68" ry="31" :fill="coat" stroke="#2b2118" stroke-width="1.8" />
      <!-- Mane -->
      <path d="M138 62L168 18L178 24L152 68Z" fill="#2b2118" />
      <path d="M144 68L172 22L192 34L168 86Z" :fill="coat" stroke="#2b2118" stroke-width="1.8" />
      <path d="M172 20L180 8L186 22Z" :fill="coat" stroke="#2b2118" stroke-width="1.5" />
      <path d="M170 20L210 34C214 36 215 44 209 48L182 44Z" :fill="coat" stroke="#2b2118" stroke-width="1.8" />
      <circle cx="188" cy="31" r="2.8" fill="#2b2118" />
    </g>
  </svg>
</template>

<style scoped>
.char-svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}
.guard-head {
  transform-origin: 76.8px 65px;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.guard-spear-arm {
  transform-origin: 132px 108px;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
.guard-body {
  transform-origin: 80px 265px;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
.pose-tired .guard-body {
  transform: translateY(5px);
}
.pose-tired .guard-head {
  transform: rotate(6deg) translateY(2px);
}
.pose-alert .guard-head,
.pose-look-left .guard-head {
  transform: rotate(-6deg);
}
.pose-look-left .guard-eyes {
  transform: translateX(-4px);
}
.pose-open-gate .guard-spear-arm {
  transform: rotate(-16deg) translateY(-6px);
}
.cassandra-arm {
  transform-origin: 120px 102px;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.pose-warn .cassandra-arm {
  transform: rotate(-8deg);
}
.horse-breathe {
  transform-origin: 108px 110px;
  animation: gentle-breathe 3.2s ease-in-out infinite;
}
@keyframes gentle-breathe {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .guard-head,
  .guard-spear-arm,
  .guard-body,
  .cassandra-arm,
  .horse-breathe {
    animation: none !important;
    transition: none !important;
  }
}
</style>
