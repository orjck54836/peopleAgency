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
  width: 65px;
  height: 200px;
  bottom: 50px;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  border-radius: 20px 0 0 20px;
  text-decoration: none;

  /* 玻璃霧面核心設定 */
  background: rgba(240, 149, 52, 0.451); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 模糊背景 */
  -webkit-backdrop-filter: blur(10px); /* Safari 支援 */

  /* 視覺效果 */
  border: 1px solid rgba(219, 185, 185, 0.3); /* 淡白邊框 */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform 0.2s ease, background-color 0.3s ease;

  span {
    text-align: center;
    font-size: 1rem;
  }

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    transform: scale(1.05);
    background: rgba(210, 172, 172, 0.15);
    color: rgba(197, 92, 36, 0.555);
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
  