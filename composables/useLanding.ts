/**
 * 入口頁（/、/study、/work）共用的互動行為。
 * 樣式在 assets/css/landing.css。
 */

/**
 * 捲動進場動畫。
 * 在頁面根元素綁 :class="{ 'reveal-on': revealReady }"，
 * 要進場的元素加 data-reveal（可選 "left" / "right"）。
 * revealReady 在 mounted 後才打開：沒有 JS（或爬蟲）時內容維持可見。
 */
export function useScrollReveal(rootSelector = '.lp') {
  const revealReady = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    // 已經在畫面內的先標記，避免打開 revealReady 的瞬間閃一下
    document.querySelectorAll<HTMLElement>(`${rootSelector} [data-reveal]`).forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('is-in')
      else observer!.observe(el)
    })
    revealReady.value = true
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { revealReady }
}

/**
 * Hero 圖片輪播的計時與暫停。
 * 淡入淡出由 CSS 處理；第一張在 SSR 就輸出，LCP 不用等 JS。
 */
export function useHeroSlider(count: number, interval = 6000) {
  const index = ref(0)
  const paused = ref(false)
  const reducedMotion = ref(false)
  let timer: ReturnType<typeof setInterval> | null = null

  function stop() {
    if (timer) clearInterval(timer)
    timer = null
  }
  function start() {
    stop()
    if (reducedMotion.value || count < 2) return
    timer = setInterval(() => {
      index.value = (index.value + 1) % count
    }, interval)
  }
  function go(i: number) {
    index.value = i
    if (!paused.value) start()
  }
  function pause() {
    paused.value = true
    stop()
  }
  function resume() {
    paused.value = false
    start()
  }

  onMounted(() => {
    reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    start()
  })
  onBeforeUnmount(stop)

  return { index, paused, reducedMotion, go, pause, resume }
}
