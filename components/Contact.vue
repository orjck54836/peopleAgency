<script lang="ts" setup>
import { ref, onMounted } from "vue";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "~/components/SectionTitle.vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

gsap.registerPlugin(ScrollTrigger);

// Define the types for the contact items and social links

const formData = {
  companyName: "",
  name: "",
  phone: "",
  workContent: "",
  cityAddress: "",
  email: "",
  inquiryType: "",
  message: "",
};

const submitBtn = computed(() => t('submit'));
const config = useRuntimeConfig();
// Handle form submission
const form = ref<HTMLFormElement | null>(null);
const handleSubmit = async () => {
  try {
    console.log(formData);
    const res = await fetch("https://qedunajx5c.execute-api.ap-northeast-3.amazonaws.com/dev/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: formData.companyName,
        name: formData.name,
        phone: formData.phone,
        workContent: formData.workContent,
        cityAddress: formData.cityAddress,
        email: formData.email,
        message: formData.message,
        inquiryType: formData.inquiryType
      }),
    });

    const result = await res.json();
    if (result.success) {
      alert("已成功送出！");
    } else {
      alert("發送失敗：" + result.error);
    }
  } catch (err) {
    console.error("前端送出錯誤", err);
    alert("發送失敗，請稍後再試");
  }
};


// GSAP animations on mounted
onMounted(() => {
  gsap.fromTo(
    ".section-title-overlay-text",
    { y: "50%" },
    {
      y: "-50%",
      scrollTrigger: {
        trigger: ".contact",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );

  gsap.from(".submit-btn", {
    scale: 0,
    duration: 3.5,
    ease: "elastic",
    delay: 0.2,
    scrollTrigger: {
      trigger: ".submit-btn",
    },
  });

  gsap.from(".contact-item", {
    scale: 0,
    duration: 0.8,
    ease: "back",
    scrollTrigger: {
      trigger: ".contact-items",
    },
  });

  gsap.from(".contact-input", {
    opacity: 0,
    scale: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".contact-input",
    },
  });
});
</script>
<template>
  <section class="contact-wrapper">
    <div class="contact-header">
      <h2>{{ $t('contactMessage') }}</h2>
      <p class="subtitle">{{ $t('contactMessageSubTitle') }}</p>
    </div>

    <form ref="form" @submit.prevent="handleSubmit" id="contact-form" class="contact-card">
      <div class="grid">    
        <div class="form-group">
          <label for="companyName">{{ $t('companyName') }}
            <span class="required">{{ $t('required') }}</span>
          </label>
          <input type="text" id="companyName" name="companyName" v-model="formData.companyName" :placeholder="$t('companyName')" required />
        </div>
        <div class="form-group">
          <label for="name">{{ $t('name') }}
            <span class="required">{{ $t('required') }}</span>
          </label>
          <input type="text" id="name" name="name" v-model="formData.name" :placeholder="$t('name')" required />
        </div>
        <div class="form-group">
          <label for="phone">{{ $t('phone') }}</label>
          <input type="tel" id="phone" name="phone" v-model="formData.phone" :placeholder="$t('phone')" />
        </div>
        <div class="form-group">
          <label for="email">{{ $t('email') }}
            <span class="required">{{ $t('required') }}</span>
          </label>
          <input type="email" id="email" name="email" v-model="formData.email" :placeholder="$t('email')" required />
        </div>
        <div class="form-group">
          <label for="cityAddress">{{ $t('cityAddress') }}</label>
          <input type="text" id="cityAddress" name="cityAddress" v-model="formData.cityAddress" :placeholder="$t('cityAddress')" />
        </div>
        <div class="form-group full">
          <label for="workContent">{{ $t('workContent') }}</label>
          <input type="text" id="workContent" name="workContent" v-model="formData.workContent" :placeholder="$t('workContent')" />
        </div>
        <div class="form-group full">
          <label for="message">{{ $t('message') }}</label>
          <textarea id="message" name="message" rows="5" v-model="formData.message" :placeholder="$t('message')"></textarea>
        </div>
        <!-- お問い合わせ項目 -->
        <div class="form-group full">
          <label>{{ $t('inquiryType') }}
            <span class="required">{{ $t('required') }}</span>
          </label>
          <div class="radio-group">
            <label class="radio-option">
              <input type="radio" name="inquiryType" value="inquiryOption1" v-model="formData.inquiryType" required />
              {{ $t('inquiryOption1') }}
            </label>
            <label class="radio-option">
              <input type="radio" name="inquiryType" value="inquiryOption2" v-model="formData.inquiryType" />
              {{ $t('inquiryOption2') }}
            </label>
            <label class="radio-option">
              <input type="radio" name="inquiryType" value="inquiryOption3" v-model="formData.inquiryType" />
              {{ $t('inquiryOption3') }}
            </label>
          </div>
        </div>
      </div>

      <div class="submit-wrapper">
        <button type="submit" class="form-submit-btn" @click="handleSubmit">
          {{ submitBtn }}
        </button>
      </div>
    </form>
  </section>
</template>


<style lang="scss">
.contact-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 1rem;

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
