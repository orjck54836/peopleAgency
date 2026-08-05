<template>
    <div class="login-shell">
        <div class="login-card">
            <div class="login-brand">
                <span class="login-logo">皓學</span>
                <span class="login-label">後台管理系統</span>
            </div>

            <div class="form-field">
                <label>管理員密碼</label>
                <div class="input-wrap">
                    <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="請輸入密碼"
                        @keyup.enter="login" />
                    <button class="toggle-pw" type="button" @click="showPassword = !showPassword">
                        {{ showPassword ? '隱藏' : '顯示' }}
                    </button>
                </div>
            </div>

            <button class="btn-login" :disabled="loading" @click="login">
                {{ loading ? '驗證中...' : '登入' }}
            </button>

            <div v-if="error" class="login-error">{{ error }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const showPassword = ref(false)

const password = ref('')
const loading = ref(false)
const error = ref('')

async function login() {
    if (!password.value) return
    loading.value = true
    error.value = ''

    try {
        await $fetch('/api/admin/auth/login', {
            method: 'POST',
            body: { password: password.value },
        })
        await navigateTo('/admin', { replace: true })
    } catch {
        error.value = '密碼錯誤，請再試一次'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-shell {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e5e5e5;
    padding: 40px 36px;
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.login-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
}

.login-logo {
    font-size: 28px;
    font-weight: 700;
    color: #1a1a2e;
}

.login-label {
    font-size: 12px;
    color: #888;
    letter-spacing: 0.05em;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-field label {
    font-size: 12px;
    font-weight: 600;
    color: #555;
}

.form-field input {
    padding: 10px 14px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s;
}

.form-field input:focus {
    border-color: #1a1a2e;
}

.btn-login {
    width: 100%;
    padding: 10px;
    background: #1a1a2e;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.15s;
}

.btn-login:hover:not(:disabled) {
    background: #2e2e4e;
}

.btn-login:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.login-error {
    padding: 10px 14px;
    background: #fde8e8;
    color: #e53e3e;
    border-radius: 6px;
    font-size: 13px;
    text-align: center;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrap input {
  width: 100%;
  padding-right: 56px;
}

.toggle-pw {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  font-size: 12px;
  color: #888;
  cursor: pointer;
  padding: 0;
}

.toggle-pw:hover { color: #333; }
</style>