<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "~/components/SectionTitle.vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

useSeoMeta({
  title: t('seo.study.title'),
  description: t('seo.study.description'),
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

gsap.registerPlugin(ScrollTrigger);
const showSuccess = ref(false)
const showError = ref(false);

const handleDialogClose = () => {
  showSuccess.value = false;
  showError.value = false;
};
const selectedFormType = ref<'study' | 'recruitment'>('study')

const formData = reactive<Record<string, any>>({})
const formFields = computed(() => {
  return selectedFormType.value === 'recruitment'
    ? [
      { key: 'companyName', label: t('companyName'), required: true },
      { key: 'name', label: t('name'), required: true },
      { key: 'phone', label: t('phone') },
      { key: 'email', label: t('email'), required: true },
      { key: 'cityAddress', label: t('cityAddress') },
      { key: 'workContent', label: t('workContent'), type: 'textarea' },
      {
        key: 'inquiryType', label: t('inquiryType'), type: 'radio', required: true, options: [
          { value: 'job_offer', label: t('inquiryOption1') },
          { value: 'license', label: t('inquiryOption2') },
          { value: 'other', label: t('inquiryOption3') }
        ]
      }
    ]
    : [
      // ── 基本聯絡資料 ──
      { key: 'name', label: t('name'), required: true },
      {
        key: 'gender', label: t('gender'), type: 'select', required: true, options: [
          { value: 'male', label: t('male') },
          { value: 'female', label: t('female') },
          { value: 'other', label: t('other') },
        ]
      },
      { key: 'phone', label: t('phone'), required: true },
      { key: 'age', label: t('age'), type: 'number', required: true },
      { key: 'email', label: t('email'), type: 'email', required: true },
      { key: 'lineId', label: t('lineId') },

      // ── 目前身分 / 學歷 ──
      {
        key: 'education', label: t('education'), type: 'select', required: true, options: [
          { value: 'high_school_student', label: t('highSchoolStudent') },
          { value: 'high_school_grad', label: t('highSchoolGrad') },
          { value: 'college_student', label: t('collegeStudent') },
          { value: 'college_grad', label: t('collegeGrad') },
          { value: 'working', label: t('working') },
          { value: 'other', label: t('other') },
        ]
      },

      // ── 目前日語程度 ──
      {
        key: 'japaneseLevel', label: t('japaneseLevel'), type: 'select', required: true, options: [
          { value: 'none', label: t('noJapanese') },
          { value: 'n5', label: 'N5' },
          { value: 'n4', label: 'N4' },
          { value: 'n3', label: 'N3' },
          { value: 'n2', label: 'N2' },
          { value: 'n1', label: 'N1' },
        ]
      },

      // ── 日本留學意向規劃 ──
      {
        key: 'departureTime', label: t('departureTime'), type: 'select', required: true, options: [
          { value: '2027_first_half', label: t('departure2027First') },
          { value: '2027_second_half', label: t('departure2027Second') },
          { value: '2028_or_later', label: t('departure2028Later') },
        ]
      },
      {
        key: 'studyDuration', label: t('studyDuration'), type: 'select', required: true, options: [
          { value: 'short', label: t('durationShort') },
          { value: 'long', label: t('durationLong') },
          { value: 'undecided', label: t('durationUndecided') },
        ]
      },
      {
        key: 'preferredCity', label: t('preferredCity'), type: 'select', options: [
          { value: 'kanto', label: t('cityKanto') },
          { value: 'kansai', label: t('cityKansai') },
          { value: 'kyushu', label: t('cityKyushu') },
          { value: 'hokkaido_tohoku', label: t('cityHokkaidoTohoku') },
          { value: 'any', label: t('cityAny') },
        ]
      },
      {
        key: 'studyPurpose', label: t('studyPurpose'), type: 'radio', options: [
          { value: 'language', label: t('purposeLanguage') },
          { value: 'academic', label: t('purposeAcademic') },
          { value: 'work', label: t('purposeWork') },
          { value: 'experience', label: t('purposeExperience') },
          { value: 'other', label: t('other') },
        ]
      },
      {
        key: 'budget', label: t('budget'), type: 'select', options: [
          { value: 'under_50', label: t('budgetUnder50') },
          { value: '50_100', label: t('budget50to100') },
          { value: '100_150', label: t('budget100to150') },
          { value: 'over_150', label: t('budgetOver150') },
          { value: 'unknown', label: t('budgetUnknown') },
        ]
      },

      // ── 其他詢問事項 ──
      { key: 'message', label: t('studyMessage'), type: 'textarea' },
    ]
})

const submitBtn = computed(() => t('submit'));
const config = useRuntimeConfig();
// Handle form submission
const form = ref<HTMLFormElement | null>(null);
const handleSubmit = async () => {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      showSuccess.value = true;
      Object.keys(formData).forEach((key) => (formData[key] = ""));
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
    <h1>{{ t('contactMessage') }}</h1>
  </div>
  <section class="contact-wrapper">
    <div class="form-toggle" :class="{ 'study-active': selectedFormType === 'recruitment' }">
      <button :class="{ active: selectedFormType === 'study' }" @click="selectedFormType = 'study'">
        {{ t('studyForm') }}
      </button>
      <button :class="{ active: selectedFormType === 'recruitment' }" @click="selectedFormType = 'recruitment'">
        {{ t('recruitmentForm') }}
      </button>
    </div>
    <form @submit.prevent="handleSubmit" class="contact-card">
      <div>
        <div v-for="field in formFields" :key="field.key" class="form-group"
          :class="{ full: field.type === 'textarea' || field.type === 'radio' }">
          <label :for="field.key">
            {{ field.label }}
            <span v-if="field.required" class="required">{{ t('required') }}</span>
          </label>

          <textarea v-if="field.type === 'textarea'" :id="field.key" :placeholder="field.label"
            v-model="formData[field.key]" rows="5" :required="field.required" />

          <div v-else-if="field.type === 'radio'" class="radio-group">
            <label v-for="option in field.options" :key="option.value" class="radio-option">
              <input type="radio" :name="field.key" :value="option.value" v-model="formData[field.key]"
                :required="field.required" />
              {{ option.label }}
            </label>
          </div>

          <select v-else-if="field.type === 'select'" :id="field.key" v-model="formData[field.key]"
            :required="field.required" class="form-select">
            <option value="" disabled>請選擇</option>
            <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>

          <input v-else :type="field.type || 'text'" :id="field.key" :placeholder="field.label"
            v-model="formData[field.key]" :required="field.required" />
        </div>
      </div>
      <div class="submit-wrapper">
        <button type="submit" class="form-submit-btn">
          {{ submitBtn }}
        </button>
      </div>
    </form>
    <!-- ✅ 成功視窗 -->
    <SuccessDialog :show="showSuccess" :title="$t('formSuccessTitle')" :subtitle="$t('formSuccessSubtitle')"
      @close="handleDialogClose" />
    <ErrorDialog :show="showError" :title="$t('errorTitle')" :subtitle="$t('errorSubtitle')"
      @close="handleDialogClose" />
  </section>
</template>


<style lang="scss" scoped>
/* === Title Section === */
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  padding-bottom: 0;
  margin: 0 auto;
  text-align: center;
}

.form-select {
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-surface);
  color: var(--c-text);
  font-size: var(--text-sm);
  font-family: var(--font-body);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 16 16'%3E%3Cpath fill='%238B1A2F' d='M3 6l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.9rem center;
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.form-select:focus {
  outline: none;
  border-color: var(--c-primary);
}

.contact-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 1rem;

  .form-toggle {
    display: flex;
    justify-content: center;
    position: relative;
    background: linear-gradient(145deg,
        rgba(255, 255, 255, 0.18),
        rgba(255, 255, 255, 0.08));
    border: 1px solid rgba(255, 255, 255, 0.3);
    outline: 1px solid rgba(0, 0, 0, 0.05);
    background-image:
      linear-gradient(145deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08)),
      url('noise-texture.png');
    background-blend-mode: overlay;
    border-radius: 999px;
    overflow: hidden;
    margin: 2rem auto;
    max-width: 500px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    box-shadow:
      inset 0 1px 3px rgba(255, 255, 255, 0.2),
      /* 內亮邊 */
      0 8px 24px rgba(0, 0, 0, 0.1),
      /* 外陰影 */
      0 4px 8px rgba(0, 0, 0, 0.05);
    /* 底層陰影 */


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
      
      &:hover {
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
      background-image:
        linear-gradient(145deg, rgba(var(--primary), 1), rgba(var(--primary), 0.85)),
        url('noise-texture.png');
      background-blend-mode: overlay;
      box-shadow:
        inset 0 2px 6px rgba(255, 255, 255, 0.55),
        /* 上方光線 */
        inset 0 -3px 8px rgba(0, 0, 0, 0.15),
        /* 下方陰影 */
        0 4px 12px rgba(0, 0, 0, 0.15);
      /* 外陰影懸浮感 */
    }

    // 切換位置動畫
    &.study-active::before {
      transform: translateX(50%);
    }
  }

  label .required {
    color: #e63946;

    margin-left: 6px;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;

    .radio-option {
      font-size: var(--text-base);
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
      font-size: var(--text-3xl);
      font-weight: 700;
    }

    .subtitle {
      margin-top: 0.5rem;

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
    padding: 1rem;
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
      font-size: var(--text-base);
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
      background-color: rgba(154, 22, 13, 0.657);
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      font-size: var(--text-lg);
      transition: 0.3s;

      &:hover {
        background-color: rgba(47, 40, 33, 0.276);
      }

      &:active {
        transform: scale(0.97);
      }
    }
  }
}
</style>
