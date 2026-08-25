<script setup lang="ts">
import { ref, onMounted } from 'vue'

// LINE 官方帳號連結,換成你的實際 LINE 加好友 URL
const lineUrl = 'https://line.me/R/ti/p/@forma_global'

const showAttention = ref(false)

function trackClick(source: string) {
  // GA4 事件追蹤,方便之後量化不同入口的轉換率
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'line_consult_click', {
      event_category: 'engagement',
      event_label: source,
    })
  }
}

onMounted(() => {
  setTimeout(() => {
    showAttention.value = true
  }, 2500)

  setInterval(() => {
    showAttention.value = true
    setTimeout(() => (showAttention.value = false), 1800)
  }, 15000)
})
</script>

<template>
  <div class="line-stack">
    <!-- 免費資源鉤子：N5 考前補帖 -->
    <a
      :href="lineUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="line-float line-float--gift"
      aria-label="加入官方 LINE 索取 N5 考前補帖"
      @click="trackClick('n5_giveaway_button')"
    >
      <span class="gift-badge">免費</span>

      <span class="line-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="line-icon" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V21M12 8C12 5.79086 10.2091 4 8 4C6.5 4 5 5 5 6.5C5 8 6.5 8 8 8H12ZM12 8C12 5.79086 13.7909 4 16 4C17.5 4 19 5 19 6.5C19 8 17.5 8 16 8H12Z" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="4" y="8" width="16" height="4" rx="0.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 12V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>

      <span class="line-copy">
        <span class="line-label">N5考前必備補帖</span>
        <span class="line-sub">加好友索取補帖</span>
      </span>
    </a>

    <!-- 主要諮詢按鈕 -->
    <a
      :href="lineUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="line-float line-float--consult"
      :class="{ 'is-pulsing': showAttention }"
      aria-label="LINE 諮詢，線上客服為您服務"
      @click="trackClick('floating_line_button')"
    >
      <span class="pulse-ring" aria-hidden="true"></span>

      <span class="line-icon-wrap">
        <svg viewBox="0 0 24 24" fill="currentColor" class="line-icon" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.03 2 11c0 3.13 1.73 5.88 4.36 7.59L5.5 22l3.64-1.91C10.19 20.67 11.09 21 12 21c5.52 0 10-4.03 10-9S17.52 2 12 2zm5.5 12.5c-.2.56-1.18 1.07-1.63 1.13-.44.06-.45.33-2.86-.6-2.41-.92-3.86-3.18-3.97-3.33-.11-.14-.92-1.22-.92-2.33s.58-1.65.79-1.87c.21-.22.46-.28.61-.28h.44c.14 0 .33-.05.52.4l.67 1.72c.06.15.03.32-.05.46l-.38.55c-.08.11-.16.24-.07.47.09.22.42.73.9 1.18.61.57 1.13.75 1.29.83.16.08.26.07.36-.04l.51-.61c.12-.14.24-.1.4-.04l1.68.79c.15.07.25.11.28.17.15.28.07.94-.12 1.5z"/>
        </svg>
        <span class="online-dot" aria-hidden="true"></span>
      </span>

      <span class="line-copy">
        <span class="line-label">LINE免費諮詢</span>
        <span class="line-sub">熱烈招生中</span>
      </span>
    </a>
  </div>
</template>

<style scoped>
.line-stack {
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6rem;
}

.line-float {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  height: 50px;
  border-radius: 999px;
  padding: 0.55rem 1.05rem 0.55rem 0.55rem;
  text-decoration: none;
  color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.line-float:hover {
  transform: translateY(-3px);
  color: #fff;
}

.line-float--consult {
  background: #06C755;
  box-shadow: 0 4px 16px rgba(6, 199, 85, 0.4);
}

.line-float--consult:hover {
  box-shadow: 0 8px 24px rgba(6, 199, 85, 0.5);
}

.line-float--gift {
  background: linear-gradient(135deg, #e8a33d, #d88a1f);
  box-shadow: 0 4px 16px rgba(216, 138, 31, 0.4);
}

.line-float--gift:hover {
  box-shadow: 0 8px 24px rgba(216, 138, 31, 0.5);
}

.gift-badge {
  position: absolute;
  top: -8px;
  left: -6px;
  background: #e74c3c;
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  pointer-events: none;
}

.is-pulsing .pulse-ring {
  animation: ring-pulse 1.8s ease-out;
}

@keyframes ring-pulse {
  0% { box-shadow: 0 0 0 0 rgba(6, 199, 85, 0.55); }
  100% { box-shadow: 0 0 0 18px rgba(6, 199, 85, 0); }
}

.line-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.line-icon {
  width: 26px;
  height: 26px;
  display: block;
}

.online-dot {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 10px;
  height: 10px;
  background: #ffe14d;
  border: 2px solid #06C755;
  border-radius: 50%;
  animation: dot-breathe 2s ease-in-out infinite;
}

@keyframes dot-breathe {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.85); }
}

.line-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.line-label {
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.line-sub {
  font-size: 0.65rem;
  opacity: 0.85;
  white-space: nowrap;
}

@media (max-width: 480px) {
  .line-stack {
    bottom: 1.2rem;
    right: 1.2rem;
    gap: 0.5rem;
  }

  .line-float {
    padding: 0.5rem 0.85rem 0.5rem 0.5rem;
  }

  .line-sub { display: none; }

  .line-icon {
    width: 22px;
    height: 22px;
  }

  .line-label {
    font-size: 0.75rem;
  }

  .gift-badge {
    font-size: 0.55rem;
  }
}
</style>