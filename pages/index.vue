<script lang="ts" setup>
const line = useCookie<'study' | 'work'>('forma-line', { default: () => 'study' })
const localePath = useLocalePath()

// SSR/CSR 皆可生效的重導
await navigateTo(localePath(line.value === 'work' ? '/work' : '/study'), { replace: true })
</script>

<template>
  <div />
</template>