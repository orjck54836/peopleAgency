<template>
  <div class="skill" ref="skillRef">
    <div class="d-flex justify-content-between align-items-center">
      <span>{{ skill }}</span>
      <span>{{ percentage }}%</span>
    </div>
    <div class="progress">
      <div class="progress-bar" :style="{ width: `${width}%`, transition: 'width 1s ease-in-out' }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

interface SkillBarProps {
  skill: string;
  percentage: number;
}

const props = defineProps<SkillBarProps>();

// References to DOM elements
const skillRef = ref<HTMLElement | null>(null);
const width = ref<number>(0);

// IntersectionObserver setup
onMounted(() => {
  if (typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If the skill bar is in view, update the width
            width.value = props.percentage;
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    // Start observing the skillRef element
    if (skillRef.value) {
      observer.observe(skillRef.value);
    }

    // Cleanup the observer when the component is unmounted
    onBeforeUnmount(() => {
      if (skillRef.value) {
        observer.unobserve(skillRef.value);
      }
    });
  }
});
</script>

<style lang="scss">
.skill {
  .progress {
    height: 3px;
    margin-top: 8px;
    background-color: rgb(var(--white));
    .progress-bar {
      background-color: rgb(var(--black));
      transition-duration: 4s;
      width: 0;
      animation-timing-function: ease-in-out;
    }
  }
}
</style>
