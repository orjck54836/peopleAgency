<script setup lang="ts"></script>

<template>
  <section id="about_me" class="about section">
    <ClientOnly>
      <!-- Section Overlay -->
      <SectionOverlayText text="About Me" />
      <!-- Section Title -->
      <SectionTitle subtitle="Some Word About Me" title="Know Me More" />
    </ClientOnly>
    <!-- About Content -->
    <div class="row mb-4 mb-lg-5 align-items-center">
      <!-- About Description -->
      <div class="col-lg-7 col-xl-8 about-desc">
        <h2>I'm Emily Davis, a Web Developer</h2>
        <p class="desc">I'm a designer & developer with a passion for web design. I enjoy developing simple, clean and slick websites that provide real value to the end user. Thousands of clients have procured exceptional results while working with me. Delivering work within time and budget which meets client's requirements is our motto.</p>
        <div class="row about-contact mb-4 mb-lg-0">
          <div class="col-sm-4 about-contact-item">
            <p>Email:</p>
            <a href="mailto:chat@portify.com">chat@portify.com</a>
          </div>
          <div class="col-sm-4 about-contact-item">
            <p>Date of Birth:</p>
            <span>11 November, 1987</span>
          </div>
          <div class="col-sm-4 about-contact-item">
            <p>Location:</p>
            <span>Los Angeles, California</span>
          </div>
        </div>
      </div>

      <!-- Experience Card -->
      <div class="col-lg-5 col-xl-4">
        <div class="experience-card">
          <div class="card-inner"></div>
          <div>
            <div class="numbers">
              <span class="number-outline-one">10</span>
              <span class="number-outline-two">10</span>
              <span class="number-main">10</span>
            </div>
            <p>Years of experience</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Next Chapter Link -->
    <div class="col-12">
      <a href="#services" class="d-flex gap-4 align-items-center next-chapter">
        <span class="page">02/11</span>
        <span class="next">Next Chapter</span>
        <span class="icon">
          <PhosphorIconArrowElbowRightDown />
        </span>
      </a>
    </div>
  </section>
</template>

<style lang="scss">
.about {
  .section-title-overlay-text {
    top: 80px;
  }
  position: relative;
  padding-top: 60px;
  @media (min-width: 1200px) {
    padding-top: 120px;
  }
  padding-bottom: 40px;
  z-index: 3;
  .about-desc {
    h2 {
      font-size: 32px;
      @media (min-width: 768px) {
        font-size: 40px;
      }
      margin-bottom: 28px;
    }
    p.desc {
      @media (min-width: 1200px) {
        font-size: 20px;
      }
      margin-bottom: 40px;
    }
  }
  .about-contact {
    p {
      font-size: 18px;
      font-weight: 500;
    }
    a,
    span {
      font-size: 20px;
      font-weight: 500;
    }
  }
  .experience-card {
    border: 1px solid rgb(var(--black));
    width: 100%;
    padding: 40px;
    text-align: center;
    transition-duration: 500ms;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(var(--primary));
    position: relative;
    z-index: 3;
    &::before {
      content: "";
      position: absolute;
      transition-duration: 500ms;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid rgb(var(--black));
      transform: rotate(2.5deg);
      z-index: -1;
    }
    &::after {
      content: "";
      position: absolute;
      transition-duration: 500ms;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid rgb(var(--black));
      transform: rotate(-2.5deg);
      z-index: -1;
    }
    .card-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(var(--primary));
      z-index: 0;
    }
    &:hover {
      &::before,
      &::after {
        transform: rotate(0);
        opacity: 0;
      }
      .numbers .number-outline-one,
      .numbers .number-outline-two {
        transform: rotate(0);
        opacity: 0;
      }
    }
    p {
      font-size: 20px;
      font-weight: 500;
      position: relative;
      z-index: 1;
    }
    .numbers {
      z-index: 1;
      position: relative;
      span {
        font-size: 200px;
        font-weight: 700;
        line-height: 120%;
      }
      .number-outline-one,
      .number-outline-two {
        position: absolute;
        top: 0;
        -webkit-text-stroke: 1px #000;
        -webkit-text-fill-color: transparent;
        display: flex;
        justify-content: center;
        transition-duration: 500ms;
      }
      .number-outline-one {
        transform: rotate(6deg);
      }
      .number-outline-two {
        transform: rotate(-6deg);
      }
    }
  }
  .next-chapter {
    padding-top: 100px;
  }
}
</style>
