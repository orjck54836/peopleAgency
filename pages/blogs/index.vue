<script setup lang="ts">
import logo from "/images/logo.png";
import fb from "/images/fb.png";
import tt from "/images/tt.png";
import x from "/images/x.png";
import sp from "/images/sp.png";
import hero from "/images/hero.png";
const topics = [
  {
    id: 1,
    title: "Fundamentals",
    articles: ["Web dev basics", "Getting Started in web dev", "Key web concepts", "Clean code tips", "First web app guide"],
  },
  {
    id: 2,
    title: "HTML",
    articles: ["Introduction to HTML", "Semantic HTML Guide", "HTML Form Best Practices", "HTML for SEO & Access", "Responsive HTML Layouts"],
  },
  {
    id: 3,
    title: "CSS",
    articles: ["Master CSS Grid", "Responsive Flexbox Tips", "CSS Animations Guide", "Scalable CSS Practices", "Advanced CSS Tricks"],
  },
  {
    id: 4,
    title: "JavaScript",
    articles: ["JavaScript ES6 Features You Should Know", "JavaScript Functions: A Brief Guide", "JavaScript Design Patterns: Writing More Efficient Code", "DOM Manipulation with JavaScript", "Asynchronous JavaScript: Understanding Promises"],
  },
  {
    id: 5,
    title: "Databases",
    articles: ["Basic SQL Queries for Beginners", "NoSQL vs SQL: Key Differences", "Understanding Database Indexing Techniques", "Database Normalization Simplified", "Integrating Databases with Your Web Application"],
  },
  {
    id: 6,
    title: "Deployment",
    articles: ["Deploying Web Applications: A Guide", "Introduction to Continuous Deployment", "Deploying with Git and GitHub", "Best Practices for Secure Deployment", "Automating Deployments with CI/CD"],
  },
];
const opened = ref(null);
import AnimateHeight from "vue-animate-height";
import { blogData } from "~/public/serviceType";
import { formatString } from "~/utils/formatString";
</script>
<template>
  <header class="header-blog">
    <div class="container d-flex flex-wrap gap-4 align-items-center justify-content-between">
      <NuxtLink to="/">
        <img :src="logo" alt="logo" />
      </NuxtLink>
      <NuxtLink to="/" class="d-flex align-items-center gap-2"> <PhosphorIconArrowLeft /> Back to Home </NuxtLink>
    </div>
  </header>

  <!-- main content -->
  <main>

  </main>

  <footer>
    <div class="contaner">
      <div class="d-flex justify-content-center gap-3">
        <p>Copyright @ <span id="year"></span> Portify</p>
        <p>|</p>
        <p>Designed By <a href="#">Pixelaxis</a></p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.topics-inner {
  padding: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  border: 1px solid rgba(var(--black), 0.1);
  @media (min-width: 1200px) {
    margin-bottom: 60px;
    padding: 40px 60px;
    gap: 40px;
  }
  .topic-box {
    padding: 16px;
    border-radius: 12px;
    width: 196px;
    border: 1px solid rgba(var(--black), 0.1);
    @media (min-width: 1200px) {
      padding: 24px;
    }
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    background-color: rgba(var(--white), 0.1);
    transition-duration: 300ms;
    &:hover {
      background-color: rgba(var(--black), 0.05);
    }
    .icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: rgb(var(--black));
      svg {
        font-size: 2rem;
        color: rgb(var(--primary));
      }
      span {
        position: absolute;
        top: 0;
        right: -13px;
        display: flex;
        transform: translate(-50%, -50%);
        background-color: rgb(var(--primary));
        font-size: 14px;
        width: 24px;
        height: 24px;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
      }
    }
    p {
      font-size: 20px;
      font-weight: 500;
    }
  }
}

.topic-index {
  padding: 16px;
  top: 80px;
  border-radius: 12px;
  background-color: rgba(var(--white), 0.1);
  border: 1px solid rgba(var(--black), 0.1);
  @media (min-width: 1200px) {
    padding: 20px;
  }
  .blog-topic {
    border: 1px solid rgba(var(--black), 0.1);
    padding: 12px;
    cursor: pointer;
    border-radius: 12px;
    transition-duration: 300ms;
    &:hover {
      background-color: rgba(var(--black), 0.05);
    }
    .title {
      display: flex;
      align-items: center;
      gap: 12px;
      span {
        width: 28px;
        height: 28px;
        display: flex;
        border-radius: 4px;
        align-items: center;
        justify-content: center;
        background-color: rgb(var(--black));
        color: rgb(var(--white));
      }
      p {
        font-size: 18px;
      }
    }
    &.active {
      .list {
        max-height: 500px;
      }
    }
    .list {
      .list-inner {
        display: flex;
        border-left: 1px solid rgba(var(--black), 0.1);
        list-style-type: none;
        padding-left: 20px;
        margin-top: 20px;
        margin-left: 12px;
        flex-direction: column;
        gap: 8px;
        li a {
          font-size: 14px;
        }
      }
    }
  }
}

.pagination {
  margin-top: 40px;
  margin-bottom: 60px;
  @media (min-width: 1200px) {
    margin-top: 50px;
    margin-bottom: 100px;
  }
  display: flex;
  justify-content: center;
  gap: 12px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgb(var(--white));
    color: rgb(var(--white));
    font-size: 18px;
    font-weight: 500;
    transition-duration: 300ms;
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &:hover {
      background-color: rgb(var(--black));
      color: #fff;
    }
  }
}
.connect {
  border: 1px solid rgba(var(--black), 0.2);
  padding: 4px;
  display: flex;
  margin-bottom: 40px;
  border-radius: 4px;
  gap: 12px;
  input {
    width: 100%;
    padding: 12px;
    background-color: transparent;
    border-radius: 4px;
    border: none;
    &:focus {
      outline: none;
    }
  }
  button {
    background-color: rgb(var(--black));
    color: rgb(var(--white));
    padding: 12px 20px;
    border-radius: 4px;
    border: none;
    flex-shrink: 0;
  }
}
</style>
