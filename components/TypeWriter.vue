<template>
  <h1 class="typewriter">
    <span class="typed-text">{{ typeValue }}</span>
    <span class="blinking-cursor">|</span>
    <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
  </h1>
</template>

<script setup>
import { ref, onMounted } from "vue";

const typeValue = ref("");
const typeStatus = ref(false);
const displayTextArray = ["Developer", "Designer"];
const typingSpeed = 120;
const erasingSpeed = 30;
const newTextDelay = 1500;
let displayTextArrayIndex = 0;
let charIndex = 0;

const typeText = () => {
  if (charIndex < displayTextArray[displayTextArrayIndex].length) {
    if (!typeStatus.value) typeStatus.value = true;
    typeValue.value += displayTextArray[displayTextArrayIndex].charAt(charIndex);
    charIndex += 1;
    setTimeout(typeText, typingSpeed);
  } else {
    typeStatus.value = false;
    setTimeout(eraseText, newTextDelay);
  }
};

const eraseText = () => {
  if (charIndex > 0) {
    if (!typeStatus.value) typeStatus.value = true;
    typeValue.value = displayTextArray[displayTextArrayIndex].substring(0, charIndex - 1);
    charIndex -= 1;
    setTimeout(eraseText, erasingSpeed);
  } else {
    typeStatus.value = false;
    displayTextArrayIndex = (displayTextArrayIndex + 1) % displayTextArray.length;
    setTimeout(typeText, typingSpeed + 1000);
  }
};

onMounted(() => {
  setTimeout(typeText, newTextDelay + 200);
});
</script>

<!-- Add "" attribute to limit CSS to this component only -->
<style lang="scss">
// Cursor blinking CSS Starts...
.blinking-cursor {
  color: black;
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -ms-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;
}
@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: black;
  }
}
@-moz-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: black;
  }
}
@-webkit-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: black;
  }
}
@-ms-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: black;
  }
}
@-o-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: black;
  }
}
// Cursor blinking CSS Ends...
</style>
