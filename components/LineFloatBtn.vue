<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 右下角常駐的兩個入口：皓學日語 App、LINE 諮詢。
 * （原本中間還有一顆 N5 補帖，也是連到同一個 LINE，拿掉讓畫面乾淨一點）
 *
 * 設計：兩顆用同一個白底膠囊、同樣寬度，顏色只留在左邊的圓形圖示上。
 * 之前是酒紅、橘色漸層、LINE 綠三塊實色疊在一起，彼此搶眼又跟頁面內容打架。
 * 手機上只留圓形圖示（文字收進 aria-label），避免膠囊蓋住半個畫面。
 */

const lineUrl = 'https://line.me/R/ti/p/@forma_global'

// 常駐的 App 下載入口：直接開 App Store，不先繞到 /study/app，少一次跳轉。
// ct 固定用 float-button，App Store Connect 的行銷活動報表才分得出這顆按鈕帶來的下載。
const appHref = appStoreUrl('float-button')
const { track } = useGtag()
const route = useRoute()
const trackAppClick = () => track('app_store_click', { placement: 'float_button', page: route.path })

// 沿用既有的事件名稱與 label，GA 報表才能跟改版前的數字接起來
const trackLine = (source: string) =>
  track('line_consult_click', { event_category: 'engagement', event_label: source })

// LINE 諮詢每隔一段時間輕輕閃一下提醒；用 class 切換，關掉動畫偏好的人 CSS 會略過
const pulsing = ref(false)
let timers: ReturnType<typeof setTimeout>[] = []
let loop: ReturnType<typeof setInterval> | undefined
const pulse = () => {
  pulsing.value = true
  timers.push(setTimeout(() => (pulsing.value = false), 1600))
}
onMounted(() => {
  timers.push(setTimeout(pulse, 2500))
  loop = setInterval(pulse, 15000)
})
onUnmounted(() => {
  timers.forEach(clearTimeout)
  if (loop) clearInterval(loop)
})
</script>

<template>
  <nav class="fab-stack" aria-label="快速連結">
    <a
      :href="appHref"
      target="_blank"
      rel="noopener"
      class="fab fab--app"
      aria-label="下載皓學日語 App（App Store）"
      @click="trackAppClick"
    >
      <span class="fab-icon">
        <img src="/images/haogaku-logo.svg" alt="" width="40" height="40" />
        <!-- 手機只剩圖示時，米白 logo 看不出是 App，用一個小標補上 -->
        <span class="fab-badge fab-badge--app">App</span>
      </span>
      <span class="fab-copy">
        <span class="fab-label">皓學日語 App</span>
        <span class="fab-sub">課程免費・iPhone</span>
      </span>
      <svg class="fab-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
    </a>

    <a
      :href="lineUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="fab fab--line"
      :class="{ 'is-pulsing': pulsing }"
      aria-label="LINE 免費諮詢"
      @click="trackLine('floating_line_button')"
    >
      <span class="fab-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3C6.75 3 2.5 6.43 2.5 10.66c0 3.79 3.37 6.97 7.92 7.57.31.07.73.2.83.47.1.24.06.61.03.86l-.13.81c-.04.24-.19.94.82.51 1.01-.42 5.45-3.21 7.43-5.5 1.37-1.5 2.03-3.03 2.03-4.72C21.5 6.43 17.25 3 12 3Zm-5.9 10.16H4.22a.5.5 0 0 1-.5-.5V9.08a.5.5 0 0 1 1 0v3.08H6.1a.5.5 0 0 1 0 1Zm1.94-.5a.5.5 0 0 1-1 0V9.08a.5.5 0 0 1 1 0v3.58Zm4.52 0a.5.5 0 0 1-.9.3L9.8 10.65v2.01a.5.5 0 0 1-1 0V9.08a.5.5 0 0 1 .9-.3l1.86 2.32V9.08a.5.5 0 0 1 1 0v3.58Zm3.03-2.29a.5.5 0 0 1 0 1h-1.37v.79h1.37a.5.5 0 0 1 0 1h-1.87a.5.5 0 0 1-.5-.5V9.08a.5.5 0 0 1 .5-.5h1.87a.5.5 0 0 1 0 1h-1.37v.79h1.37Z" />
        </svg>
      </span>
      <span class="fab-copy">
        <span class="fab-label">LINE 免費諮詢</span>
        <span class="fab-sub">留學・就職都能問</span>
      </span>
      <svg class="fab-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
    </a>
  </nav>
</template>

<style scoped>
.fab-stack {
  --fab-ink: #141012;
  --fab-sub: #6f6568;
  --fab-wine: #8a2432;
  --fab-line: #06c755;

  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  /* stretch：兩顆膠囊等寬，右緣和左緣都對齊 */
  align-items: stretch;
  gap: 10px;
}

.fab {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 7px 14px 7px 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(20, 16, 18, 0.06);
  box-shadow: 0 8px 24px rgba(20, 16, 18, 0.12), 0 1px 3px rgba(20, 16, 18, 0.06);
  color: var(--fab-ink);
  text-decoration: none;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.fab:hover {
  color: var(--fab-ink);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(20, 16, 18, 0.16), 0 2px 4px rgba(20, 16, 18, 0.06);
}

.fab:focus-visible {
  outline: 2px solid var(--fab-wine);
  outline-offset: 3px;
}

/* ── 左邊的圓形圖示：顏色只出現在這裡 ── */
.fab-icon {
  position: relative;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
}

.fab-icon svg {
  width: 22px;
  height: 22px;
}

.fab--app .fab-icon {
  background: #ffedd4;
  box-shadow: inset 0 0 0 1px rgba(138, 36, 50, 0.12);
}

.fab--app .fab-icon img {
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
}

.fab--line .fab-icon { background: var(--fab-line); }
.fab--line .fab-icon svg { width: 24px; height: 24px; }

.fab-badge {
  position: absolute;
  top: -5px;
  right: -9px;
  padding: 1px 5px;
  border-radius: 999px;
  border: 2px solid #fff;
  background: #d64545;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.3;
}

.fab-badge--app {
  display: none;
  background: var(--fab-wine);
}

/* ── 文字 ── */
.fab-copy {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  line-height: 1.2;
}

.fab-label {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.fab-sub {
  margin-top: 2px;
  font-size: 11.5px;
  color: var(--fab-sub);
  white-space: nowrap;
}

.fab-arrow {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-left: 2px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.35;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.fab:hover .fab-arrow {
  opacity: 0.7;
  transform: translateX(2px);
}

/* App 是主要入口：名稱用酒紅強調，LINE 維持中性 */
.fab--app .fab-label { color: var(--fab-wine); }

/* LINE 每 15 秒一次的提醒：圖示外圈擴散 */
.fab--line .fab-icon::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
}

.fab--line.is-pulsing .fab-icon::after {
  animation: fab-ring 1.6s ease-out;
}

@keyframes fab-ring {
  0% { box-shadow: 0 0 0 0 rgba(6, 199, 85, 0.5); }
  100% { box-shadow: 0 0 0 14px rgba(6, 199, 85, 0); }
}

/* ── 手機：只留圓形圖示 ── */
@media (max-width: 640px) {
  .fab-stack {
    right: 14px;
    bottom: 18px;
    align-items: flex-end;
    gap: 12px;
  }

  .fab {
    padding: 4px;
    gap: 0;
  }

  .fab-copy,
  .fab-arrow {
    display: none;
  }

  .fab-icon {
    width: 46px;
    height: 46px;
  }

  .fab--app .fab-icon img {
    width: 46px;
    height: 46px;
  }

  .fab-badge--app {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fab,
  .fab-arrow {
    transition: none;
  }

  .fab--line.is-pulsing .fab-icon::after {
    animation: none;
  }
}
</style>
