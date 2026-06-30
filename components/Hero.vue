<template>
  <section class="hero">

    <div class="hero-photo">
      <img :src="heroPhoto" alt="日本街景" loading="eager">
    </div>

    <div class="hero-eyebrow">
      <span class="eyebrow-dot"></span>
      <span class="eyebrow-text">FORMA &ensp;·&ensp; 台中・日本</span>
    </div>

    <div class="hero-body">
      <h1 class="hero-title">踏上<em>日本</em></h1>
      <p class="hero-desc">
        遊學代辦 &ensp;·&ensp; 就業仲介 &ensp;·&ensp; 特定技能<br>
        N1 顧問　台中在地　日本直接接軌
      </p>
    </div>

    <div class="hero-bottom">
      <div class="tags-left">
        <span
          v-for="(tag, i) in tags"
          :key="tag"
          class="tag"
          :class="{ active: activeTag === i }"
          @mouseenter="activeTag = i"
          @mouseleave="activeTag = 0"
        >{{ tag }}</span>
      </div>

      <div class="cta-center">
        <button class="btn-fill" @click="$emit('contact')">即刻諮詢</button>
        <button class="btn-outline" @click="$emit('explore')">探索服務</button>
      </div>

      <div class="creds-right">
        <span class="cred">JLPT N1</span>
        <span class="cred">就業服務乙級</span>
        <span class="cred">台中在地服務</span>
      </div>
    </div>

    <div class="scroll-indicator" aria-hidden="true">
      <div class="scroll-bar"></div>
      <span class="scroll-label">Scroll</span>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import heroPhoto from '../img/hero.jpg'
defineEmits(['contact', 'explore'])
defineProps({
  photoUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1800&q=80&auto=format&fit=crop'
  }
})

const activeTag = ref(0)
const tags = ['日本特色遊學', '就業仲介・特定技能', '台灣華語教育']
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap');

.hero {
  --red:   #bc002d;
  --dark:  #1a1410;
  --mid:   rgba(26,20,16,0.5);
  --light: rgba(26,20,16,0.28);

  position: relative;
  /* Fit inside your existing layout — adjust nav height if needed */
  height: calc(100svh - var(--nav-height, 64px));
  min-height: 520px;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

.hero-photo { position: absolute; inset: 0; }
.hero-photo img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 55%;
  filter: saturate(0.68) brightness(1.02);
  animation: slowZoom 18s ease-out both;
}
.hero-photo::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to bottom,
    rgba(245,238,221,.72) 0%,
    rgba(245,238,221,.12) 28%,
    rgba(245,238,221,.0)  50%,
    rgba(245,238,221,.18) 72%,
    rgba(245,238,221,.82) 100%);
}
@keyframes slowZoom {
  from { transform: scale(1.05); }
  to   { transform: scale(1.0); }
}

.hero-eyebrow {
  position: absolute; top: 2.5rem; left: 3rem; z-index: 5;
  display: flex; align-items: center; gap: 10px;
  animation: fadeUp .6s ease .2s both;
}
.eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); }
.eyebrow-text { font-size: .6rem; font-weight: 400; letter-spacing: .25em; text-transform: uppercase; color: var(--mid); }

.hero-body {
  position: absolute; inset: 0; z-index: 5;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 0 2rem; padding-bottom: 8%;
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(4rem, 9.5vw, 9.5rem);
  line-height: .94; letter-spacing: -.02em; color: var(--dark); margin: 0;
  animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .35s both;
}
.hero-title em { font-style: italic; }

.hero-desc {
  font-size: .78rem; font-weight: 300; letter-spacing: .1em; color: var(--mid);
  line-height: 2; margin-top: 1.5rem;
  animation: fadeUp .7s ease .55s both;
}

.hero-bottom {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 10;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: end;
  padding: 1.5rem 3rem 2.2rem;
  animation: fadeUp .7s ease .75s both;
}

.tags-left { display: flex; flex-direction: column; gap: .35rem; }
.tag {
  font-size: .58rem; font-weight: 400; letter-spacing: .18em; text-transform: uppercase;
  color: var(--light); transition: color .2s; cursor: default;
}
.tag:hover, .tag.active { color: var(--red); }

.cta-center { display: flex; align-items: center; gap: 1.4rem; justify-content: center; }

.btn-fill {
  padding: 11px 28px; background: var(--dark); color: #fff; border: none;
  font-family: 'DM Sans', sans-serif; font-size: .7rem; font-weight: 400;
  letter-spacing: .18em; text-transform: uppercase; cursor: pointer;
  transition: background .2s; border-radius: 1px;
}
.btn-fill:hover { background: var(--red); }

.btn-outline {
  padding: 10px 24px; background: none; color: var(--mid);
  border: 1px solid rgba(26,20,16,.22); font-family: 'DM Sans', sans-serif;
  font-size: .7rem; font-weight: 400; letter-spacing: .18em; text-transform: uppercase;
  cursor: pointer; transition: border-color .2s, color .2s; border-radius: 1px;
}
.btn-outline:hover { border-color: var(--dark); color: var(--dark); }

.creds-right { display: flex; flex-direction: column; align-items: flex-end; gap: .35rem; }
.cred { font-size: .58rem; font-weight: 400; letter-spacing: .18em; text-transform: uppercase; color: var(--light); }

.scroll-indicator {
  position: absolute; bottom: 2.4rem; left: 50%; transform: translateX(-50%);
  z-index: 8; display: flex; flex-direction: column; align-items: center; gap: 5px;
  pointer-events: none; animation: fadeUp .7s ease 1s both;
}
.scroll-bar {
  width: 1px; height: 36px;
  background: linear-gradient(to bottom, rgba(26,20,16,.35), transparent);
  animation: pulse 2.2s ease-in-out infinite;
}
.scroll-label { font-size: .5rem; letter-spacing: .22em; text-transform: uppercase; color: rgba(26,20,16,.28); }

@keyframes pulse { 0%,100% { opacity: .35; } 50% { opacity: .8; } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .hero-eyebrow { top: 1.5rem; left: 5vw; }
  .hero-body { padding-bottom: 14%; }
  .hero-title { font-size: clamp(3.5rem, 13vw, 5.5rem); }
  .hero-bottom { grid-template-columns: 1fr; gap: 1rem; padding: 1.2rem 5vw 1.8rem; }
  .tags-left, .creds-right { flex-direction: row; flex-wrap: wrap; gap: .4rem .8rem; }
  .cta-center { order: -1; }
  .scroll-indicator { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-photo img, .scroll-bar { animation: none; }
  .hero-eyebrow, .hero-title, .hero-desc, .hero-bottom { animation: none; opacity: 1; transform: none; }
}
</style>