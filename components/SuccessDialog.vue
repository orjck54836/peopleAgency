<template>
  <transition name="fade">
    <div v-if="show" class="success-overlay">
      <div class="success-box">
        <h3 class="success-title">{{ title }}</h3>
        <p class="success-sub">{{ subtitle }}</p>
        <button class="success-btn" @click="handleConfirm">
          {{ $t("confirm") }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

defineProps<{
  show: boolean
  title: string
  subtitle: string
}>()

const emit = defineEmits(["close"])
const router = useRouter()

const handleConfirm = () => {
  emit("close")
  router.push("/")
}
</script>

<style scoped>
/* ── 遮罩層 ── */
.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
}

/* ── 對話框 ── */
.success-box {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
  animation: pop 0.3s ease-out;
}

.success-title {
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.75rem;
}

.success-sub {
  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0 0 2rem;
}

.success-btn {
  display: inline-block;
  background: var(--c-primary);
  color: var(--c-text-on-primary);
  border: none;
  border-radius: var(--radius-full);
  padding: 0.85rem 2.4rem;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.success-btn:hover {
  background: var(--c-primary-light);
}

/* ── 動畫 ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pop {
  from {
    transform: translateY(-12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>