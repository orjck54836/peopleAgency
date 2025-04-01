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

// Reactive form data and button state
const formData = ref({
  companyName: "",
  name: "",
  phone: "",
  workContent: "",
  cityAddress: "",
  detailAddress: "",
  email: "",
  message: "",
});

const submitBtn = computed(() => t('submit'));
const config = useRuntimeConfig();
// Handle form submission
const form = ref<HTMLFormElement | null>(null);
const handleSubmit = async () => {
  submitBtn.value = "Sending...";
  try {
    await emailjs.sendForm(config.public.SERVICE_ID as string, config.public.TEMPLATE_ID as string, form.value!, { publicKey: config.public.PUBLIC_KEY as string });
    console.log("SUCCESS!");
    formData.value = { 
      companyName: "", 
      name: "", phone: "", 
      workContent: "", 
      cityAddress: "", 
      detailAddress: "", 
      email: "", 
      message: "",
    };
    submitBtn.value = "Success";
    setTimeout(() => {
      submitBtn.value = "Submit";
    }, 3000);
  } catch (error) {
    console.log("FAILED...", error);
    submitBtn.value = "Submit";
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
  <form ref="form" @submit.prevent="handleSubmit" id="contact-form" class="contact-form ">
    <h4>{{ $t('contactMessage') }}</h4>
    <div class="row g-4 g-xl-5">
      <div class="col-12 contact-input">
        <label for="companyName">{{ $t('companyName') }}</label>
        <input type="text" id="companyName" name="companyName" v-model="formData.companyName" placeholder="Your company name" required />
      </div>
      <div class="col-12 contact-input">
        <label for="name">{{ $t('name') }}</label>
        <input type="text" id="name" name="name" v-model="formData.name" placeholder="Your name" required />
      </div>
      <div class="col-12 contact-input">
        <label for="phone">{{ $t('phone') }}</label>
        <input type="number" id="phone" name="phone" v-model="formData.phone" placeholder="Your phone"></input>
      </div>
      <div class="col-12 contact-input">
        <label for="workContent">{{ $t('workContent') }}</label>
        <input type="text" id="workContent" name="workContent" v-model="formData.workContent" placeholder="Your bussiness details"></input>
      </div>
      <div class="col-12 contact-input">
        <label for="cityAddress">{{ $t('cityAddress') }}</label>
        <input type="text" id="cityAddress" name="cityAddress" v-model="formData.cityAddress" placeholder="Your city"></input>
      </div>
      <div class="col-12 contact-input">
        <label for="detailAddress">{{ $t('detailAddress') }}</label>
        <input type="text" id="detailAddress" name="detailAddress" v-model="formData.detailAddress" placeholder="Your detailed address"></input>
      </div>
      <div class="col-12 contact-input">
        <label for="email">{{ $t('email') }}</label>
        <input type="email" id="user_email" name="email" v-model="formData.email" placeholder="Your e-mail" required />
      </div>
      <div class="col-12 contact-input">
        <label for="message">{{ $t('message') }}</label>
        <textarea id="message" name="message" v-model="formData.message" placeholder="Your message"></textarea>
      </div>
      <div class="col-12">
        <button type="submit" class="submit-btn position-relative">
          <div class="waves-top-md">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {{ submitBtn }}
          <div class="waves-bottom-md">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
// contact section
.contact {
  padding-top: 60px 0;
  @media (min-width: 1200px) {
    padding-top: 120px 0;
  }
  padding-bottom: 40px;
  .contact-item {
    display: flex;
    align-items: center;
    gap: 16px;
    @media (min-width: 992px) {
      gap: 24px;
    }
    .icon-box {
      height: 60px;
      width: 60px;
      @media (min-width: 992px) {
        width: 80px;
        height: 80px;
        svg {
          font-size: 2.2rem;
        }
      }
      border-radius: 50%;
      border: 1px solid rgb(var(--black));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      svg {
        font-size: 1.6rem;
      }
    }
    p {
      @media (min-width: 992px) {
        font-size: 20px;
      }
      font-weight: 500;
    }
  }
  .social-icons {
    a {
      width: 42px;
      height: 42px;
      @media (min-width: 992px) {
        width: 60px;
        height: 60px;
        svg {
          font-size: 32px;
        }
      }
      border-radius: 50%;
      border: 1px solid rgb(var(--black));
      display: flex;
      align-items: center;
      justify-content: center;
      transition-duration: 400ms;
      &:hover {
        background-color: #000;
        color: #fff;
      }
      svg {
        font-size: 24px;
      }
    }
  }
}
.contact-form {
  max-width: 856px;
  h4 {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 50px;
    @media (min-width: 992px) {
      font-weight: 700;
      font-size: 40px;
      margin-bottom: 80px;
    }
  }
  label {
    font-size: 20px;
    font-weight: 500;
    color: rgb(var(--black));
  }
  input,
  textarea {
    border-radius: 8px;
    margin-top: 20px;
    display: block;
    background-color: rgb(var(--background)); 
    border: 2px solid rgb(var(--primary));
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }
  textarea {
    height: auto;
    @media (min-width: 992px) {
      margin-bottom: 60px;
    }
  }
  .submit-btn {
    width: 40vw;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(145deg, rgba(var(--primary), 0.95), rgba(var(--secondary), 0.9)); 
    border: 2px solid rgba(var(--contrast), 0.8); /* 增加細緻感 */
    color: rgb(var(--background)); /* 文字與背景形成對比 */
    padding: 12px 18px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: 4px 4px 10px rgba(var(--contrast), 0.2), -4px -4px 10px rgba(var(--background), 0.2);
    
    /* 添加光暈效果 */
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: 300%;
        height: 300%;
        background: radial-gradient(circle, rgba(var(--accent), 0.3) 0%, transparent 80%);
        transition: all 0.4s ease-in-out;
        transform: translate(-50%, -75%);
        opacity: 0;
    }

    &:hover::before {
        transform: translate(-50%, 0%);
        opacity: 1;
    }

    &:hover {
        background-color: #be6a10; /* 更明亮的木色 */
        color: white;
        box-shadow: 2px 2px 8px rgba(190, 106, 16, 0.5);
    }

    &:active {
        transform: scale(0.97); /* 輕微按壓效果 */
    }

    /* 🔹 SVG 變色 */
    svg {
        transition: all 0.3s ease-in-out;
    }

    &:hover svg {
        filter: brightness(0) invert(1);
    }

    /* 🔹 流動波紋動畫 */
    .waves-top-md,
    .waves-bottom-md {
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(var(--accent), 0.1) 0%, transparent 70%);
        top: 0;
        left: 0;
        opacity: 0.3;
        transition: opacity 0.3s ease-in-out;
    }

    &:hover .waves-top-md,
    &:hover .waves-bottom-md {
        opacity: 0;
    }
  }
}
</style>
