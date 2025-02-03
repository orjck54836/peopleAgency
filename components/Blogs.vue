<script setup lang="ts">
import { blogData } from "~/public/blogdata";
</script>
<template>
  <section id="blogs" class="section blogs position-relative">
    <span class="section-title-overlay-text">My Blogs</span>
    <ClientOnly>
      <SectionTitle subtitle="Explore My Blog" title="Latest Articles" />
    </ClientOnly>
    <div class="pb-60 d-flex flex-column gap-4">
      <NuxtLink v-for="{ id, title, date, time, desc, tags, image } in blogData.slice(0, 2)" :key="id" to="/blog-details" class="blog-card">
        <div class="rounded-4 overflow-hidden img-wrapper">
          <img :src="image" class="img-fluid" alt="" />
        </div>
        <div>
          <h4 class="fw-medium mb-3">{{ title }}</h4>
          <div class="d-flex align-items-center gap-4 flex-wrap mb-3">
            <div class="d-flex gap-2 align-items-center fs-5">
              <PhosphorIconCalendar />
              <p>{{ date }}</p>
            </div>
            --
            <div class="d-flex gap-2 align-items-center fs-5">
              <PhosphorIconClock />
              <p>{{ time }}</p>
            </div>
          </div>
          <p class="details">{{ desc }}</p>
          <div class="d-flex align-items-center gap-3">
            <div v-for="tag in tags" :key="tag" class="d-flex align-items-center gap-2">
              <span class="fs-3">•</span>
              <p>{{ tag }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="more-info d-flex flex-wrap align-items-center gap-5 gap-md-3">
      <NuxtLink to="/blogs" class="fs-5 fw-medium"> View All Articles </NuxtLink>
      <span class="line"></span>
      <NuxtLink to="/blogs" class="arrow-down position-relative">
        <div class="waves-top-md">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <svg width="45" height="54" viewBox="0 0 45 54" class="rotate-90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44 31.449L22.5 52.949L1 31.449L8.98204 23.3382L16.8353 31.449V0.550781H28.1647V31.449L36.018 23.3382L44 31.449Z" stroke="currentColor" />
        </svg>
        <div class="waves-bottom-md">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </NuxtLink>
    </div>
    <div class="col-12">
      <a href="#testimonials" class="d-flex gap-4 align-items-center next-chapter">
        <span class="page">09/11</span>
        <span class="next">Next Chapter</span>
        <PhosphorIconArrowElbowRightDown />
      </a>
    </div>
  </section>
</template>
