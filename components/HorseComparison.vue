<script setup>
defineProps({
  compact: Boolean,
  answer: { type: String, default: '' },
  boxLabel: { type: String, default: '' },
  flipped: { type: Boolean, default: true },
})
const base = import.meta.env.BASE_URL
</script>

<template>
  <div class="horse-comparison" :class="{ compact }">
    <div class="hc-card">
      <img :src="base + 'troy/image13.svg'" alt="Ảnh gốc" />
      <span v-if="answer" class="hc-ans">{{ answer }}</span>
    </div>
    <div class="hc-eq">
      <small v-if="boxLabel">{{ boxLabel }}</small>
      <b>==</b>
    </div>
    <div class="hc-card">
      <img class="mirror-target" :class="{ mirrored: flipped }" :src="base + 'troy/image13.svg'" alt="Ảnh lật ngang" />
      <span v-if="answer" class="hc-ans">{{ answer }}</span>
    </div>
  </div>
</template>

<style scoped>
.horse-comparison {
  display: inline-flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 253, 248, 0.94);
  border: 1px solid #dfd3be;
  border-radius: 10px;
  padding: 8px 14px;
  flex-shrink: 0;
}
.hc-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.hc-card img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
.hc-ans {
  font: 600 12.5px/1.2 'JetBrains Mono', Consolas, monospace;
  color: #227a4d;
  background: #e3f4eb;
  padding: 2px 8px;
  border-radius: 99px;
}
.hc-eq {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.hc-eq small {
  font: 600 10px/1.1 'JetBrains Mono', Consolas, monospace;
  color: #b45328;
  white-space: nowrap;
}
.hc-eq b {
  font: 600 16px/1 'JetBrains Mono', Consolas, monospace;
  color: #b48b45;
}
.mirror-target {
  transform: scaleX(1);
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
.mirror-target.mirrored {
  transform: scaleX(-1);
}
.compact {
  gap: 8px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
  border-radius: 8px;
}
.page-10 .compact {
  background: #f6f3ec;
  border-color: #dfd5c3;
}
.page-10 .compact .hc-eq b {
  color: #b45328;
}
.compact .hc-card img {
  width: 28px;
  height: 28px;
}
.compact .hc-eq b {
  font-size: 13px;
  color: #84e8ae;
}
@media (prefers-reduced-motion: reduce) {
  .mirror-target {
    transition: none !important;
  }
}
</style>
