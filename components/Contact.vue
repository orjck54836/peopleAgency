<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "~/components/SectionTitle.vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

gsap.registerPlugin(ScrollTrigger);
const showSuccess = ref(false)
const showError = ref(false);

const handleDialogClose = () => {
  showSuccess.value = false;
  showError.value = false;
};
const selectedFormType = ref<'recruitment' | 'study'>('recruitment')

const formData = reactive<Record<string, any>>({})
const formTitle = computed(() =>
  selectedFormType.value === 'recruitment'
    ? t('recruitmentTitle')
    : t('studyTitle')
)
const formFields = computed(() => {
  return selectedFormType.value === 'recruitment'
    ? [
        { key: 'companyName', label: t('companyName'), required: true },
        { key: 'name', label: t('name'), required: true },
        { key: 'phone', label: t('phone') },
        { key: 'email', label: t('email'), required: true },
        { key: 'cityAddress', label: t('cityAddress') },
        { key: 'workContent', label: t('workContent'), type: 'textarea' },
        { key: 'inquiryType', label: t('inquiryType'), type: 'radio', required: true, options: [
          { value: 'job_offer', label: t('inquiryOption1') },
          { value: 'license', label: t('inquiryOption2') },
          { value: 'other', label: t('inquiryOption3') }
        ]}
      ]
    : [
        { key: 'name', label: t('name'), required: true },
        { key: 'email', label: t('email'), required: true },
        { key: 'phone', label: t('phone') },
        { key: 'message', label: t('studyMessage'), type: 'textarea' }
      ]
})

const submitBtn = computed(() => t('submit'));
const config = useRuntimeConfig();
// Handle form submission
const form = ref<HTMLFormElement | null>(null);
const handleSubmit = async () => {
  try {
    const res = await fetch("https://api.forma-global.com/api/SendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData), // ✅ 改這裡
    });

    const result = await res.json();
    if (result.success) {
      showSuccess.value = true;
      Object.keys(formData).forEach((key) => (formData[key] = "")); // ✅ 改這裡
    } else {
      showError.value = true;
    }
  } catch (err) {
    console.error("前端送出錯誤", err);
    showError.value = true;
  }
};


// 根據表單欄位自動初始化 formData，每次切換表單時清空內容
watch(
  formFields,
  (newFields) => {
    Object.keys(formData).forEach((key) => delete formData[key])
    for (const field of newFields) {
      formData[field.key] = ''
    }
  },
  { immediate: true }
)
</script>
<template>
  <div class="title">
    <h1>{{ formTitle }}</h1>
  </div>
  <section class="contact-wrapper">
    <div
      class="form-toggle"
      :class="{ 'study-active': selectedFormType === 'study' }"
    >
      <button
        :class="{ active: selectedFormType === 'recruitment' }"
        @click="selectedFormType = 'recruitment'"
      >
        {{ t('recruitmentForm') }}
      </button>
      <button
        :class="{ active: selectedFormType === 'study' }"
        @click="selectedFormType = 'study'"
      >
        {{ t('studyForm') }}
      </button>
    </div>
    <form @submit.prevent="handleSubmit" class="contact-card">
      <div>
        <div
          v-for="field in formFields"
          :key="field.key"
          class="form-group"
          :class="{ full: field.type === 'textarea' || field.type === 'radio' }"
        >
          <label :for="field.key">
            {{ field.label }}
            <span v-if="field.required" class="required">{{ t('required') }}</span>
          </label>

          <textarea
            v-if="field.type === 'textarea'"
            :id="field.key"
            :placeholder="field.label"
            v-model="formData[field.key]"
            rows="5"
            :required="field.required"
          />
          
          <div v-else-if="field.type === 'radio'" class="radio-group">
            <label
              v-for="option in field.options"
              :key="option.value"
              class="radio-option"
            >
              <input
                type="radio"
                :name="field.key"
                :value="option.value"
                v-model="formData[field.key]"
                :required="field.required"
              />
              {{ option.label }}
            </label>
          </div>
          <input
            v-else
            :type="field.type || 'text'"
            :id="field.key"
            :placeholder="field.label"
            v-model="formData[field.key]"
            :required="field.required"
          />
        </div>
      </div>
      <div class="submit-wrapper">
        <button type="submit" class="form-submit-btn">
          {{ submitBtn }}
        </button>
      </div>
    </form>
    <!-- ✅ 成功視窗 -->
    <SuccessDialog
      :show="showSuccess"
      :title="$t('formSuccessTitle')"
      :subtitle="$t('formSuccessSubtitle')"
      @close="handleDialogClose"
    />
    <ErrorDialog
      :show="showError"
      :title="$t('errorTitle')"
      :subtitle="$t('errorSubtitle')"
      @close="handleDialogClose"
    />
  </section>
</template>


<style lang="scss" scoped>
/* === Title Section === */
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9e5010;
  font-weight: bolder;
  width: 50%;
  padding: 30px;
  padding-bottom: 0;
  margin: 0 auto;
  text-align: center;
}

.title::before,
.title::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: #9e5010;
  margin: 0 1rem;
}

.contact-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 1rem;

  .form-toggle {
    display: flex;
    justify-content: center;
    position: relative;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    overflow: hidden;
    margin: 2rem auto;
    max-width: 360px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    button {
      flex: 1;
      padding: 0.75rem 1rem;
      font-weight: bold;
      border: none;
      background: transparent;
      color: #555;
      cursor: pointer;
      z-index: 1;
      position: relative;
      transition: color 0.3s ease;

      &.active {
        color: #fff;
      }

      &:hover {
        color: #fff;
        transform: scale(1.05);
      }
    }

    // 背後滑動效果
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
      border-radius: 999px;
      transition: transform 0.3s ease;
      z-index: 0;
      transform: translateX(-50%);
      background: rgba(var(--primary), 1);
      box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
    }

    // 切換位置動畫
    &.study-active::before {
      transform: translateX(50%);
    }
  }

  label .required {
    color: #e63946;
    font-size: 0.875rem;
    margin-left: 6px;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;

    .radio-option {
      font-size: 1rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      input[type="radio"] {
        accent-color: rgb(var(--primary));
        transform: scale(1.2);
      }
    }
  }

  .contact-header {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      font-size: 2rem;
      font-weight: 700;
    }

    .subtitle {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: #333;
      line-height: 1.6;
      letter-spacing: 0.25px;
      padding-left: 0.25rem;
      text-align: center;
      text-wrap: balance;
    }
  }

  .contact-card {
    background: rgba(var(--white), 0.9);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    label {
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }

    input,
    textarea {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      background: #f9f9f9;
      transition: border-color 0.3s;

      &:focus {
        border-color: rgb(var(--primary));
        outline: none;
      }
    }

    &.full {
      grid-column: span 2;

      @media (max-width: 768px) {
        grid-column: span 1;
      }
    }
  }

  .submit-wrapper {
    margin-top: 2rem;
    text-align: center;

    .form-submit-btn {
      padding: 0.75rem 2rem;
      background-color: rgb(var(--primary));
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      font-size: 1.1rem;
      transition: 0.3s;

      &:hover {
        // background-color: darken(rgb(var(--primary)), 10%);
      }

      &:active {
        transform: scale(0.97);
      }
    }
  }
}

</style>
