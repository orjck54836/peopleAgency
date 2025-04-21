<template>
    <transition name="fade">
      <div v-if="show" class="error-message">
        <div class="message-box">
          <h3>{{ title }}</h3>
          <p>{{ subtitle }}</p>
          <button class="confirm-btn" @click="handleConfirm">{{ $t("confirm") }}</button>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from "vue-router";
  
  defineProps<{
    show: boolean;
    title: string;
    subtitle: string;
  }>();
  
  const emit = defineEmits(["close"]);
  const router = useRouter();
  
  const handleConfirm = () => {
    emit("close");
  };
  </script>
  
  <style scoped>
  .error-message {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    background: rgb(248, 243, 235);
    border: 2px solid rgba(190, 106, 16, 0.3);
    border-radius: 16px;
    padding: 3rem 2rem;
    width: 45vw;
    max-width: 600px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    animation: pop 0.3s ease-out;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .message-box h3 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    color: #ff0000;
  }
  
  .message-box p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 2rem;
  }
  
  .confirm-btn {
    padding: 0.8rem 2rem;
    background-color: rgb(var(--primary));
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .confirm-btn:hover {
    background-color: #be6a10;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  @keyframes pop {
    from {
      transform: translate(-50%, -10px);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
  </style>
  