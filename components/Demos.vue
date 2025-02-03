<script lang="ts" setup>
import clean from "/images/versions/clean-bg.png";
import dotsBg from "/images/versions/dots-bg.png";
import gradientBg from "/images/versions/gradiant-bg.png";
import leftBar from "/images/versions/left-bar.png";
import shapeBg from "/images/versions/shape-bg.png";
import snowfallBg from "/images/versions/snowfall-bg.png";
import stickyMenu from "/images/versions/sticky-menu.png";
import topBar from "/images/versions/top-bar.png";
import triangleBg from "/images/versions/traingle-bg.png";
import videoBg from "/images/versions/video-bg.png";

// State
const opened = ref(false);

// Demo items data
const demoItems = [
  { path: "/", image: clean, text: "Clean Background" },
  { path: "/bg-dots", image: dotsBg, text: "Dots Background" },
  { path: "/bg-gradiant", image: gradientBg, text: "Gradient Background" },
  { path: "/bg-shape", image: shapeBg, text: "Shape Background" },
  { path: "/bg-snow", image: snowfallBg, text: "Snowfall Background" },
  { path: "/bg-triangle", image: triangleBg, text: "Triangle Background" },
  { path: "/bg-video", image: videoBg, text: "Video Background" },
  { path: "/sticky-menu", image: stickyMenu, text: "Sticky Menu" },
  { path: "/top-bar", image: topBar, text: "Top Bar Menu" },
  { path: "/left-bar", image: leftBar, text: "Left Bar Menu" },
];

// Close the menu when clicked outside
const handleOutsideClick = (event: MouseEvent) => {
  const demosElement = document.querySelector(".demos");
  if (demosElement && !demosElement.contains(event.target as Node)) {
    opened.value = false;
  }
};

watch(opened, (newValue) => {
  if (newValue) {
    document.addEventListener("click", handleOutsideClick);
  } else {
    document.removeEventListener("click", handleOutsideClick);
  }
});
</script>

<template>
  <div :class="`demos ${opened ? 'opened' : ''}`">
    <div class="d-flex align-items-center">
      <button @click="opened = !opened" class="demo-btn">Demos</button>
      <div class="demo-list" v-if="opened">
        <div class="d-flex justify-content-between gap-2 align-items-center">
          <h3>Bg & Menu Styles</h3>
          <button class="bg-transparent border-0 d-flex align-items-center justify-content-center fs-4" @click="opened = false">
            <phosphor-icon-x />
          </button>
        </div>
        <nuxt-link v-for="item in demoItems" :key="item.path" @click="opened = false" :to="item.path" class="col">
          <img :src="item.image" alt="" />
          <p>{{ item.text }}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.demos {
  max-width: 450px;
  transform: translateX(100%);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 117;
  height: 100vh;
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  &.opened {
    transform: translateX(0);
    z-index: 122;
    .demo-btn {
      z-index: 122;
    }
  }
  .demo-btn {
    padding: 12px 24px;
    border: none;
    position: fixed;
    transition-duration: 300ms;
    z-index: 101;
    background-color: white;
    transform: translateX(-99%);
    left: 0;
    top: 52%;
  }
  .demo-list {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    gap: 20px;
    background-color: white;
    padding: 20px;
    a {
      display: block;
      background-color: rgba($color: #ffdb67, $alpha: 0.15);
      padding: 12px;
      border-radius: 12px;
      transition-duration: 200ms;
      &:hover {
        background-color: rgba($color: #ffdb67, $alpha: 0.5);
      }
      img {
        max-width: 100%;
        height: auto;
        border-radius: 12px;
      }
      p {
        text-align: center;
        margin-top: 12px;
      }
    }
  }
}
</style>
