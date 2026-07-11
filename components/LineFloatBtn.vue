<script setup lang="ts">
// LINE 官方帳號連結，換成你的實際 LINE 加好友 URL
const lineUrl = 'https://line.me/R/ti/p/@forma_global'
</script>

<template>
  <a
    :href="lineUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="line-float"
    aria-label="LINE 諮詢"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" class="line-icon" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.03 2 11c0 3.13 1.73 5.88 4.36 7.59L5.5 22l3.64-1.91C10.19 20.67 11.09 21 12 21c5.52 0 10-4.03 10-9S17.52 2 12 2zm5.5 12.5c-.2.56-1.18 1.07-1.63 1.13-.44.06-.45.33-2.86-.6-2.41-.92-3.86-3.18-3.97-3.33-.11-.14-.92-1.22-.92-2.33s.58-1.65.79-1.87c.21-.22.46-.28.61-.28h.44c.14 0 .33-.05.52.4l.67 1.72c.06.15.03.32-.05.46l-.38.55c-.08.11-.16.24-.07.47.09.22.42.73.9 1.18.61.57 1.13.75 1.29.83.16.08.26.07.36-.04l.51-.61c.12-.14.24-.1.4-.04l1.68.79c.15.07.25.11.28.17.15.28.07.94-.12 1.5z"/>
    </svg>
    <span class="line-label">LINE 諮詢</span>
  </a>
</template>

<style scoped>
.line-float {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  background: #06C755;
  color: #fff;
  border-radius: 999px;
  padding: 0.75rem 1.1rem;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(6, 199, 85, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.line-float:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(6, 199, 85, 0.5);
  color: #fff;
}

.line-icon {
  width: 28px;
  height: 28px;
  display: block;
}

.line-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

@media (max-width: 480px) {
  .line-float {
    bottom: 1.2rem;
    right: 1.2rem;
    padding: 0.75rem;
  }

  .line-label { display: none; }

  .line-float {
    border-radius: 50%;
    width: 52px;
    height: 52px;
    justify-content: center;
  }
}
</style>