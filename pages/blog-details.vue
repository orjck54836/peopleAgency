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
    <!-- Blog Details -->
    <section class="blog-details">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-xxl-3">
            <div class="details-left">
              <div class="info-box">
                <h4>Article Information</h4>
                <div class="d-flex flex-column gap-3">
                  <div class="d-flex align-items-center gap-2">
                    <PhosphorIconTag class="fs-5" />
                    <p><span class="fw-medium">Category</span>: Inspiration</p>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <PhosphorIconClock class="fs-5" />
                    <p><span class="fw-medium">Updated</span>: March 16, 2024</p>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <PhosphorIconUser class="fs-5" />
                    <p><span class="fw-medium">Author</span>: Jenny Wilson</p>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <PhosphorIconAlarm class="fs-5" />
                    <p><span class="fw-medium">Reading Time</span>: 2 min</p>
                  </div>
                </div>
              </div>
              <div class="info-box">
                <h4>Tabe of Contents</h4>
                <div id="blog-index" class="d-flex flex-column gap-2 table-of-content">
                  <a href="#title">Title</a>
                  <a href="#understanding">Understanding Your Brand Identity</a>
                  <a href="#crafing">Crafting a Compelling About Page</a>
                  <a href="#showcasing">showcasing Your Best Work</a>
                  <a href="#conclusion">Conclusion</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8 col-xxl-9 d-flex flex-column gap-4" data-bs-spy="scroll" data-bs-target="#blog-index" data-bs-smooth-scroll="true">
            <div class="details-container">
              <div class="details-content">
                <div id="title" class="row align-items-center g-4 mb-4 mb-xl-5">
                  <div class="col-md-6">
                    <img src="/images/blog-1.png" class="img-fluid w-100 rounded-3" alt="" />
                  </div>
                  <div class="col-md-6">
                    <h3 class="mb-3 fw-medium">Balancing Creativity and Usability in Web Design</h3>
                    <div class="d-flex align-items-center gap-2">
                      <PhosphorIconCalendar class="fs-4" />
                      <p><span class="fw-medium">Updated</span>: April 15, 2024</p>
                    </div>
                  </div>
                </div>
                <p class="text-lg mb-4 mb-xl-5">
                  In today's digital age, a well-crafted portfolio website is more than just a showcase of your work—it&s a powerful tool for building your personal brand. Whether you&re a designer, developer, writer, or artist, your portfolio can help you stand out in a crowded market and attract the right opportunities. In this blog,
                </p>
                <h4 id="understanding" class="fw-medium mb-3">Understanding Your Brand Identity</h4>
                <p class="text-lg mb-4 mb-xl-5">Before you start building your portfolio, take the time to define your brand identity. What are your core values, strengths, and unique selling points? Your portfolio should reflect who you are as a professional and communicate your story to your audience.</p>

                <div class="mb-4 mb-xl-5 position-relative blog-video">
                  <img :src="blogVideo" class="w-100 img-fluid rounded-3" alt="" />
                  <span @click="videoOpen = true" class="youtube">
                    <img :src="youtube" alt="" />
                  </span>
                </div>
                <div id="crafing" class="mb-4 mb-xl-5">
                  <h5 class="mb-3">Crafting a Compelling About Page</h5>
                  <p class="text-lg">
                    Your About page is one of the most crucial sections of your portfolio. It&s the space where visitors get to know the person behind the work—the story, the journey, and the passion that drives your creativity. Use this opportunity to introduce yourself in a way that resonates with your audience,
                    <br />
                    <br />
                    offering a glimpse into not just what you do, but who you are. Begin by highlighting your background and experiences. Share your professional journey, from how you got started to where you are today. Discuss the skills and expertise you&ve developed over the years, and how they have shaped your approach to your work. If there
                    are any pivotal moments or significant projects that have defined your career, this is the place to share them.
                  </p>
                </div>
                <div id="showcasing" class="mb-4 mb-xl-5">
                  <h5 class="mb-3">Showcasing Your Best Work</h5>
                  <p class="text-lg">
                    Your portfolio should feature a carefully curated selection of your most outstanding work, showcasing your unique skills and expertise in a way that resonates with potential clients or employers. Instead of overwhelming visitors with an exhaustive list of projects, it&s important to focus on a select few that truly represent the
                    breadth and depth of your abilities. These chosen projects should not only highlight your technical skills but also demonstrate your problem-solving abilities, creativity, and the impact your work has had. For each project,
                    <br />
                    <br />
                    provide detailed context to help viewers understand the scope and significance of your contribution. Include descriptions that clearly outline your role in the project—whether you led the design, development, strategy, or a combination of these. Explain the challenges you faced, the solutions you implemented, and how your
                    efforts contributed to the project’s success. Highlight any innovative approaches you used, the technologies you leveraged, and the results achieved, such as improved performance metrics, enhanced user experience, or increased client satisfaction.
                  </p>
                </div>
                <div class="quote">the challenges you faced, and the outcomes you achieved. This not only demonstrates your capabilities but also gives insight into your problem-solving approach.</div>
                <p class="mb-4 mb-xl-5">A blog is a powerful addition to your portfolio website. Regularly publishing blog posts allows you to share your knowledge, insights, and opinions on industry-related topics.</p>
                <div class="mb-4 mb-xl-5">
                  <img :src="blogDetails" class="img-fluid w-100 rounded-3" alt="" />
                </div>
                <div id="conclusion" class="mb-4 mb-xl-5">
                  <h5 class="mb-3">Conclusion</h5>
                  <p class="text-lg">
                    Your portfolio website is more than just a collection of your work; it’s a reflection of your personal brand. By carefully crafting your site, showcasing your best work, and regularly blogging, you can establish yourself as an expert in your field and attract the right opportunities. Remember, your portfolio is an evolving
                    project—continue to update it as you grow and develop in your career.
                  </p>
                </div>
                <div class="share py-4">
                  <div class="d-flex gap-3 align-items-center justify-content-center mb-4">
                    <p>Follow Me</p>
                    <div class="d-flex gap-3">
                      <a href="#">
                        <img :src="fb" alt="" />
                      </a>
                      <a href="#">
                        <img :src="tt" alt="" />
                      </a>
                      <a href="#">
                        <img :src="x" alt="" />
                      </a>
                      <a href="#">
                        <img :src="sp" alt="" />
                      </a>
                    </div>
                  </div>
                  <form>
                    <input type="text" value="Portify-?node-id=0-1&t=3MUWkaOWKQ0TLoKa-0" disabled />
                    <button>Copy Link</button>
                  </form>
                </div>
              </div>
              <div class="next-prev">
                <a href="#" class="article-card">
                  <button>
                    <PhosphorIconArrowLeft />
                  </button>
                  <div>
                    <p class="fw-medium mb-1">Previous Article</p>
                    <h5 class="fw-medium">The Evolution of My Design Style Over Time</h5>
                  </div>
                </a>
                <div class="divider d-none d-md-block"></div>
                <a href="#" class="article-card right">
                  <div>
                    <p class="fw-medium mb-1">Next Article</p>
                    <h5 class="fw-medium">The Evolution of My Design Style Over Time</h5>
                  </div>
                  <button>
                    <PhosphorIconArrowRight />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- newsletter -->
    <section class="newsletter">
      <div class="container">
        <div class="content">
          <h2 class="mb-3 fw-medium">Subscribe our newsletter</h2>
          <p class="mb-4 pb-2">Technology blogging, captivating your audience goes beyond just the written word.</p>
          <form class="mb-3">
            <input type="text" placeholder="Enter your email address" />
            <button>Subscribe</button>
          </form>
          <div>
            <label for="agree" class="d-flex align-items-center gap-2">
              <input type="checkbox" id="agree" />
              <p>
                I agree with
                <a href="#" class="underlined"> Privacy Policy </a>&
                <a href="#" class="underlined"> Terms </a>
              </p>
            </label>
          </div>
        </div>
      </div>
    </section>
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
