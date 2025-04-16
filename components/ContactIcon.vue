<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
    <NuxtLink :to="localePath('/contact')" class="floating-contact-btn animate-in">
        <span>{{ $t('contactButton') }}</span>
    </NuxtLink>
</template>

<style lang="scss">
.floating-contact-btn {
  position: fixed;
  width: 100px;
  height: 100px;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  font-weight: 600;
  font-size: 0.9rem;
  background-color: rgb(var(--primary));
  color: white;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.3s ease;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: #be6a10;
    transform: translateY(-3px);
  }

  // 初始動畫狀態
  &.animate-in {
    animation: slideInFromRight 1.2s ease-out forwards;
  }

  @media (min-width: 1200px) {
    display: none;
  }

  // 緩慢從右滑入 + 淡入
    @keyframes slideInFromRight {
    0% {
        opacity: 0;
        transform: translateX(80px) translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateX(0) translateY(0);
    }
    }
}
</style>
  