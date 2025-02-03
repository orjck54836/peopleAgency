<script setup lang="ts">
const opened = ref(false);
const grain = ref(false);
const currentDir = ref("");

const handleColorChange = (color: string) => {
  localStorage.setItem("color", color);
  document.documentElement.style.setProperty("--primary", color);
};
const changeDirection = (dir: string) => {
  localStorage.setItem("dir", dir);
  document.documentElement.dir = dir;
  currentDir.value = dir;
};
const handleGrain = (e: Event) => {
  const target = e.target as HTMLInputElement;
  grain.value = target.checked;
};
const colors = ["255, 219, 103", "255, 145, 251", "253, 187, 46", "238, 232, 170", "0, 255, 255", "0, 254, 156"];

onMounted(() => {
  const color = localStorage.getItem("color");
  if (color) {
    document.documentElement.style.setProperty("--primary", color);
  }
  const dir = localStorage.getItem("dir");
  if (dir) {
    document.documentElement.dir = dir;
    currentDir.value = dir;
  }
});
const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 400);
</script>
<template>
  <Loader v-if="loading" />
  <div ref="target">
    <div id="grain" :class="grain ? 'grain' : ''"></div>
    <div :class="`color-switcher ${opened ? 'opened' : ''}`">
      <button @click="opened = !opened" class="color-switcher-btn">
        <PhosphorIconGearSix :size="24" />
      </button>
      <div class="pallets d-flex flex-column align-items-center gap-4 justify-content-center">
        <div class="row row-cols-3 g-3">
          <div v-for="color in colors" class="col" :key="color">
            <button @click="handleColorChange(color)" :style="{ backgroundColor: `rgb(${color})` }" class="color-btn w-100"></button>
          </div>
        </div>
        <div class="d-flex gap-3 justify-content-between">
          <button @click="changeDirection('ltr')" :class="`px-3 py-2 ltr border-0 ${currentDir == 'ltr' ? 'active' : ''}`">LTR</button>
          <button @click="changeDirection('rtl')" :class="`px-3 py-2 ltr border-0 ${currentDir == 'rtl' ? 'active' : ''}`">RTL</button>
        </div>
        <div class="d-flex align-items-center gap-3">
          <label htmlFor="grained" class="select-none cursor-pointer"> Grained BG </label>
          <input type="checkbox" @change="handleGrain" id="grained" class="grained-checkbox" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// color switcher
.color-switcher {
  position: fixed;
  right: 0;
  top: 59%;
  z-index: 118;
  display: flex;
  align-items: start;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transform: translate(200px, -50%);
  &.opened {
    transform: translate(0, -50%);
  }
  &:dir(rtl) {
    flex-direction: row-reverse;
    transform: translate(200px, -50%);
    &.opened {
      transform: translate(0, -50%);
    }
  }
  .color-switcher-btn {
    width: 50px;
    height: 50px;
    border: none;
    display: flex;
    transition-duration: 300ms;
    align-items: center;
    justify-content: center;
    background-color: rgb(var(--white));
    svg {
      font-size: 1.5rem;
    }
  }
  .pallets {
    width: 200px;
    background-color: rgb(var(--white));
    padding: 20px;
    // border-radius: 8px;
    .color-btn {
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
    .ltr,
    .rtl {
      border-radius: 4px;
      &.active {
        background-color: rgb(var(--primary));
      }
    }
  }
}
</style>
