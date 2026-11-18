<script setup>
defineProps({
  at: { type: Number, default: 1 },
  step: { type: Number, default: 0 },
  delay: { type: Number, default: 0 },
})
</script>

<template>
  <div
    class="reveal"
    :class="{ shown: step >= at }"
    :style="step >= at && delay ? { transitionDelay: delay + 'ms' } : undefined"
  >
    <slot />
  </div>
</template>
