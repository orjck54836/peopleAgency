<script setup lang="ts">
const containerRef = ref(null);
import HeroImg from "/images/hero.png";
import gsap from "gsap";
onMounted(() => {
  setTimeout(() => {
    gsap.fromTo(
      ".section-title-overlay-text",
      { y: "50%" },
      {
        y: "-50%",
        scrollTrigger: {
          trigger: ".testimonials",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    gsap.from(".testimonial-card", {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".testimonial-card",
      },
    });
  }, 100);
});

const reviews = [
  {
    id: 1,
    name: "James Smith",
    role: "Website Owner",
    review: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  },
  {
    id: 2,
    name: "Donald Trump",
    role: "Website Owner",
    review: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  },
  {
    id: 3,
    name: "Omar Ali",
    role: "Website Owner",
    review: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  },
  {
    id: 4,
    name: "Daniel Smith",
    role: "Website Owner",
    review: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  },
  {
    id: 5,
    name: "Kane Smith",
    role: "Website Owner",
    review: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  },
];
</script>
<template>
  <span class="section-title-overlay-text">TESTIMONIALS</span>
  <SectionTitle subtitle="My Clients and Testimonials" title="My Clients Reviews" />
  <div dir="ltr" class="row pb-120 testimonial px-3">
    <Swiper
      slidesPerView="auto"
      :spaceBetween="24"
      loop
      :autoplay="{ delay: 5000 }"
      :scrollbar="{ draggable: true, el: '.s-scrollbar', dragSize: 'auto' }"
      :navigation="{ nextEl: '.testi-next', prevEl: '.testi-prev' }"
      :breakpoints="{ 1024: { slidesPerView: 1.4, spaceBetween: 24 } }"
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperScrollbar]"
      ref="containerRef"
      class="swiper testimonial-swiper pb-60"
    >
      <SwiperSlide v-for="review in reviews" :key="review.id">
        <div class="testimonial-card">
          <div class="img-wrapper">
            <div class="inner">
              <div class="waves-top-sm">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <img :src="HeroImg" width="82" height="82" alt="" />
              <div class="waves-bottom-sm">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div class="content">
            <h3>{{ review.name }}</h3>
            <div class="d-flex align-items-center gap-2 mb-4">
              <p>{{ review.role }}</p>
              <p>--</p>
              <span>www.websites.com</span>
            </div>
            <p class="desc">{{ review.review }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="d-flex justify-content-between gap-4 align-items-center">
      <div class="s-scrollbar flex-grow-1"></div>
      <div class="d-flex gap-3">
        <button class="testi-prev">
          <PhosphorIconArrowLeft />
        </button>
        <button class="testi-next">
          <PhosphorIconArrowRight />
        </button>
      </div>
    </div>
  </div>

  <div class="col-12">
    <a href="#contact" class="d-flex gap-4 align-items-center next-chapter">
      <span class="page">10/11</span>
      <span class="next">Next Chapter</span>
      <PhosphorIconArrowElbowRightDown />
    </a>
  </div>
</template>

<style lang="scss">
// testimonials
.testimonials {
  padding-top: 60px;
  padding-bottom: 40px;
  .section-title-overlay-text {
    top: 100px;
  }
  @media (min-width: 1200px) {
    padding-top: 120px;
  }
  .testimonial {
    .testimonial-card {
      padding: 20px;
      @media (min-width: 992px) {
        padding: 40px 32px;
      }
      border: 1px solid rgb(var(--black));
      display: flex;
      flex-direction: column;
      @media (min-width: 768px) {
        flex-direction: row;
      }
      align-items: flex-start;
      gap: 40px;
      .img-wrapper {
        width: 82px;
        height: 104px;
        position: relative;
        display: flex;
        align-items: center;
        .inner {
          position: relative;
          width: 82px;
          height: 82px;
        }
        img {
          border-radius: 50%;
          border: 1px solid rgb(var(--black));
        }
      }
      .content {
        h3 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        p {
          font-weight: 600;
        }
        .desc {
          font-size: 20px;
          font-weight: 400;
        }
      }
    }
    .testi-prev,
    .testi-next {
      background-color: transparent;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 1px solid rgb(var(--black));
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.3rem;
      transition-duration: 500;
      &:hover {
        background-color: rgb(var(--black));
        color: rgb(var(--white));
      }
    }
    .s-scrollbar {
      height: 5px;
    }
    .s-scrollbar.swiper-scrollbar-horizontal {
      height: 3px;
      background: rgba($color: #000000, $alpha: 0.4);
      position: initial;
      border-radius: 0;
      opacity: 0.4;
    }
    .swiper-scrollbar-drag {
      background: rgb(var(--black)) !important;
      height: 5px !important;
      border-radius: 0;
      opacity: 1;
      top: -1px !important;
    }
  }
}
</style>
