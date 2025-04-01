<script setup lang="ts">
import logo from "/images/logo.png";
import fb from "/images/fb.png";
import tt from "/images/tt.png";
import x from "/images/x.png";
import sp from "/images/sp.png";
import blogVideo from "/images/blog-video.png";
import youtube from "/images/youtube.png";
import blogDetails from "/images/blog-details.png";

const videoOpen = ref(false);
</script>

<template>
  <header>
    <div class="container d-flex flex-wrap gap-4 align-items-center justify-content-between">
      <NuxtLink to="/">
        <img :src="logo" alt="logo" />
      </NuxtLink>
      <NuxtLink to="/" class="d-flex align-items-center gap-2"> <PhosphorIconArrowLeft /> Back to Home </NuxtLink>
    </div>
  </header>

  <!-- main content -->
  <main>
    <!-- Blog Details -->
    <div class="container">
      <div class="row">
        <!-- Contact -->
        <section id="contact" class="contact section position-relative">
          <ClientOnly>
            <Contact />
          </ClientOnly>
        </section>
      </div>
    </div>
  </main>
  <footer>
    <div class="contaner">
      <div class="d-flex justify-content-center gap-3">
        <p>
          Copyright @ <span>{{ new Date().getFullYear() }}</span> Portify
        </p>
        <p>|</p>
        <p>Designed By <a href="#">Pixelaxis</a></p>
      </div>
    </div>
  </footer>
  <ModalVideo channel="youtube" :is-open.sync="videoOpen" video-id="crDWEskuPII" @update:isOpen="videoOpen = $event" />
</template>

<style lang="scss">
.blog-details {
  padding-bottom: 60px;
  @media (min-width: 1200px) {
    padding-bottom: 100px;
  }
}

.details-left {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .info-box {
    border-radius: 12px;
    padding: 16px;
    @media (min-width: 1400px) {
      padding: 24px;
    }
    background-color: rgba(var(--white), 0.1);
    border: 1px solid rgba(var(--black), 0.1);
    h4 {
      padding-bottom: 16px;
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(var(--black), 0.6);
    }
  }
}
.table-of-content {
  padding-left: 16px;
  border-left: 1px solid rgba(var(--black), 0.2);
  a.active {
    position: relative;
    font-weight: 500;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -17px;
      width: 2px;
      height: 100%;
      background-color: rgb(var(--black));
    }
  }
}
.details-container {
  max-width: 856px;
  margin: 0 auto;
}
.details-content {
  margin-top: 80px;
  padding: 12px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(var(--black), 0.15);
  @media (min-width: 1200px) {
    padding: 24px;
  }
  @media (min-width: 1400px) {
    padding: 40px;
  }
}
.blog-video {
  .youtube {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    background-color: rgb(var(--white));
  }
}

.quote {
  padding: 32px 0;
  margin-bottom: 32px;
  border-top: 1px solid rgba(var(--black), 0.6);
  border-bottom: 1px solid rgba(var(--black), 0.6);
  p {
    font-size: 24px;
    font-weight: 500;
  }
}
.share {
  border-top: 1px solid rgba(var(--black), 0.3);
  border-bottom: 1px solid rgba(var(--black), 0.3);
  form {
    border-radius: 4px;
    padding: 4px;
    display: flex;
    border: 1px solid rgba(var(--black), 0.2);
    justify-content: space-between;
    input {
      width: 100%;
      background-color: transparent;
      border: none;
      padding: 10px;
      &:focus {
        outline: none;
      }
    }
    button {
      flex-shrink: 0;
      background-color: rgb(var(--black));
      padding: 12px 20px;
      border-radius: 4px;
      color: rgb(var(--white));
      font-weight: 500;
      font-size: 20px;
    }
  }
}

.next-prev {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  @media (min-width: 1200px) {
    gap: 60px;
  }
  .divider {
    height: 66px;
    width: 1px;
    background-color: rgba(var(--black), 0.2);
  }
  .article-card {
    display: flex;
    align-items: center;
    max-width: 360px;
    gap: 16px;
    padding: 20px 20px 20px 0;
    p {
      opacity: 0.6;
    }
    &.right {
      padding: 20px 0 20px 20px;
      button {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
    }
    transition-duration: 300ms;
    &:hover {
      background-color: rgb(var(--black));
      p,
      h5 {
        color: rgb(var(--white));
      }
    }
    border-radius: 12px;
    border: 1px solid rgba(var(--black), 0.15);
    background-color: rgba(var(--white), 0.1);
    button {
      height: 62px;
      width: 62px;
      border: none;
      font-size: 1.5rem;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }
  }
}
</style>
