<script setup lang="ts">
import projectOne from "/images/project-one.png";
import projectTwo from "/images/project-two.png";
import projectThree from "/images/project-three.png";
import projectDetailsOne from "/images/project-details-1.png";
import projectDetailsTwo from "/images/project-details-2.png";
import edumasterBig from "/images/edumaster-big.png";
import techshopBig from "/images/techshop-big.png";
import quickbiteBig from "/images/quickbite-big.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    name: "TechShop",
    description: `TechShop is a state-of-the-art e-commerce platform designed to cater to the diverse needs of both businesses and consumers, providing a seamless shopping experience powered by cutting-edge technology and innovative design. The platform's sleek design, characterized by a clean layout and easy navigation, ensures that users can effortlessly browse through products, categories, and deals. TechShop offers a comprehensive product catalog management system, allowing businesses to showcase their products with rich media, detailed descriptions, and customer reviews. The checkout process on TechShop is designed to be smooth and hassle-free, minimizing cart abandonment rates and enhancing customer satisfaction. The platform integrates with multiple payment gateways, offering a variety of payment options, including credit/debit cards, digital wallets, and bank transfers. TechShop leverages advanced data analytics to offer personalized shopping experiences tailored to individual preferences and behaviors. The backend of TechShop is built using modern technologies, ensuring scalability, reliability, and security. The platform is compliant with international data protection regulations, employing industry-standard encryption and security protocols to safeguard user information. Looking ahead, TechShop aims to expand its reach and continue innovating to meet the evolving needs of the e-commerce landscape, with plans to integrate augmented reality for virtual try-ons and expand its global logistics network.`,
    tags: ["design", "frontend", "backend"],
    category: "E-commerce Platform",
    image: projectOne,
    bigImg: techshopBig,
  },
  {
    name: "Edumaster",
    description: `Edumaster is a comprehensive online learning platform that empowers students and educators alike to explore new horizons in education. The platform offers a rich array of courses and educational resources that span multiple disciplines and skill levels. Edumaster's innovative approach to course delivery emphasizes engagement and interactivity, leveraging multimedia elements, including videos, animations, quizzes, and interactive exercises, to create immersive learning experiences. Edumaster offers personalized learning journeys tailored to individual goals, preferences, and learning styles. The platform adapts to the pace and progress of each student, providing targeted recommendations and feedback that support continuous improvement and mastery. The platform also offers a comprehensive suite of features for educators, including course authoring tools, analytics dashboards, and communication channels. Edumaster fosters a vibrant community of learners and educators who collaborate and connect through the platform. Discussion forums, peer reviews, group projects, and live sessions create opportunities for meaningful interaction and knowledge exchange. The platform is optimized for accessibility, offering features such as closed captioning, screen reader compatibility, and multilingual support. Looking to the future, Edumaster is poised to lead the way in shaping the future of education, with plans to incorporate cutting-edge technologies such as virtual reality and artificial intelligence.`,
    tags: ["design", "frontend", "backend"],
    category: "Online Learning Platform",
    image: projectTwo,
    bigImg: edumasterBig,
  },
  {
    name: "QuickBite",
    description: `QuickBite is a groundbreaking mobile app that redefines the food delivery experience, offering users a seamless, user-friendly, and innovative way to satisfy their cravings with just a few taps on their smartphones. The app's intuitive interface allows users to browse a vast selection of restaurants and cuisines, from local favorites to international delicacies. QuickBite offers real-time order tracking, allowing users to monitor the status of their delivery from preparation to arrival. QuickBite has established a highly efficient delivery network, partnering with a wide range of restaurants and local eateries to offer users an extensive selection of options. The app's sophisticated logistics system optimizes delivery routes and dispatches, ensuring that orders are fulfilled promptly and accurately. QuickBite prioritizes user-centric design, making the app accessible and easy to use for everyone. The app's clean and modern interface is complemented by seamless navigation and intuitive controls. To further enhance customer satisfaction and engagement, QuickBite offers a variety of promotions and loyalty programs. Users can take advantage of exclusive discounts, special offers, and rewards that incentivize repeat orders and foster brand loyalty. QuickBite is committed to ensuring the highest standards of quality and sustainability in its operations. The app collaborates with restaurants to ensure that food is delivered fresh and in an eco-friendly manner.`,
    tags: ["ui/ux design", "mobile development"],
    category: "Food Delivery Mobile App",
    image: projectThree,
    bigImg: quickbiteBig,
  },
];
const currentProject = ref(projects[0]);

gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
  gsap.from(".single-project", {
    opacity: 0,
    stagger: 0.2,
    scale: 0,
    scrollTrigger: {
      trigger: ".project-list",
      start: "top 60%",
      end: "top 20%",
    },
  });
});
</script>
<template>
  <!-- 標題區（service Section） -->
  <section class="common-questions-section">
    <h1 class="common-questions-title">{{ $t('commonQuestionTitle') }}</h1>
  </section>
  <div class="row pb-60 project-list g-4">
    <div v-for="(project, i) in projects" key="{project.name}" @click="currentProject = project" class="col-sm-6 col-lg-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <div class="single-project">
        <div class="project-card">
          <div class="card-inner"></div>
          <img :src="project.image" class="img-fluid w-100 card-img h-100" alt="" />
          <div class="card-arrow">
            <div class="arrow-inner">
              <PhosphorIconArrowUpRight :size="26" />
            </div>
          </div>
        </div>
        <div class="project-info">
          <h2>{{ project.name }}</h2>
          <p>{{ project.category }}</p>
          <div class="tags d-flex align-items-center gap-1">
            <template v-for="tag in project.tags">
              <span>{{ tag }}</span> {{ i < project.tags.length - 1 && "-" }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="col-12">
    <a href="#how_i_work" class="d-flex gap-4 align-items-center next-chapter">
      <span class="page">07/11</span>
      <span class="next">Next Chapter</span>
      <PhosphorIconArrowElbowRightDown />
    </a>
  </div> -->

  <Teleport to="body">
    <div class="modal fade" id="exampleModal" :tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="btn-close fs-3" data-bs-dismiss="modal" aria-label="Close">
              <PhosphorIconX />
            </button>
            <img :src="currentProject.bigImg" class="w-100 img-fluid project-details-img rounded-3 mb-3 mb-xl-4" alt="" />
            <div class="row gx-4 gy-4 gy-md-0">
              <div class="col-md-7 col-xl-9">
                <h1 class="mb-3 fw-semibold" id="project-title">{{ currentProject.name }}</h1>
                <p class="mb-4 mb-xl-5">Designed and developed a fully functional e-commerce platform for a startup specializing in handcrafted goods. The project involved creating a visually appealing user interface, and ensuring an overall smooth shopping experience.</p>
                <h2 class="mb-3 fw-semibold">Project Goals</h2>
                <p class="mb-4">Developed a website for a non-profit organization aimed at raising awareness and funds for environmental conservation. The site features educational content, event management, and donation capabilities.</p>
                <ul class="list-plus">
                  <li>Create a visually cohesive blog that aligns with the influencer's personal brand.</li>
                  <li>Implement a secure and reliable payment gateway.</li>
                  <li>Ensure the website is responsive and performs well across all devices.</li>
                  <li>Optimize the site for search engines to increase organic traffic.</li>
                </ul>
              </div>
              <div class="col-md-5 col-xl-3">
                <div class="right-bar">
                  <div>
                    <p class="mb-1">Client</p>
                    <h6 class="fw-semibold">Mashroom</h6>
                  </div>
                  <div>
                    <p class="mb-1">Category</p>
                    <h6 class="fw-semibold">User Experience</h6>
                  </div>
                  <div>
                    <p class="mb-1">Start Date</p>
                    <h6 class="fw-semibold">02/08/2023</h6>
                  </div>
                  <div>
                    <p class="mb-1">End Date</p>
                    <h6 class="fw-semibold">01/03/2024</h6>
                  </div>
                  <div>
                    <p class="mb-1">Tools</p>
                    <h6 class="fw-semibold">Adobe Xd, Figma</h6>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="fw-medium mb-2">Challenges and Solutions</h3>
              <p class="mb-4">One of the main challenges was optimizing the website's load time while maintaining high-quality images of the products. To address this, I implemented lazy loading for images and used optimized image formats, resulting in a faster, smoother browsing experience without compromising visual quality.</p>
              <div class="row gx-4 gy-4 gy-md-0 mb-4 mb-xl-5 pb-3">
                <div class="col-md-6">
                  <img :src="projectDetailsOne" class="w-100 img-fluid rounded-3" alt="" />
                </div>
                <div class="col-md-6">
                  <img :src="projectDetailsTwo" class="w-100 img-fluid rounded-3" alt="" />
                </div>
              </div>
              <h4 class="mb-3">Key Features:</h4>
              <p class="mb-4">Developed a website for a non-profit organization aimed at raising awareness and funds for environmental conservation. The site features educational content, event management, and donation capabilities.</p>
              <ul class="bullet mb-4 pb-3 mb-xl-5">
                <li>Custom Blog Layouts: Designed multiple blog layouts to cater to different content types, including image-heavy posts and long-form articles.</li>
                <li>Content Management System: Integrated WordPress for easy content updates and management, allowing the influencer to focus on creating content without technical hurdles.</li>
                <li>Responsive Design: Ensured the blog is fully responsive, providing a seamless experience on smartphones, tablets, and desktops.</li>
                <li>SEO and Social Media Integration: Implemented SEO best practices and integrated social media sharing buttons, making it easy for readers to share posts across platforms.</li>
                <li>Newsletter Signup: Added a newsletter signup form to help the influencer grow their email list and maintain engagement with followers.</li>
              </ul>
              <div class="outcome">
                <h5 class="mb-3">Outcome:</h5>
                <p>The blog quickly gained traction, attracting a growing audience and enhancing the influencer’s online presence. The user-friendly design and seamless social media integration led to higher engagement rates and increased content sharing.</p>
              </div>
              <form class="contact-form full-width">
                <h3 class="mb-3">Have project in mind? Let's discuss</h3>
                <p class="mb-4 mb-xl-5 pb-2">Get in touch with us to see how we can help you with your project</p>
                <div class="row g-4 g-xl-5">
                  <div class="col-sm-6 contact-input">
                    <label html="name">Name</label>
                    <input type="text" id="name" name="user_name" placeholder="Your name" required />
                  </div>
                  <div class="col-sm-6 contact-input">
                    <label html="email">Email</label>
                    <input type="email" id="email" name="user_email" placeholder="Your e-mail" required />
                  </div>
                  <div class="col-12 contact-input">
                    <label html="service">Service</label>
                    <input name="service" placeholder="Your Serivice" />
                  </div>
                  <div class="col-12 contact-input">
                    <label html="message">Message</label>
                    <textarea name="message" placeholder="Your message"></textarea>
                  </div>
                  <div class="col-12">
                    <button type="submit" class="submit-btn position-relative">
                      <div class="waves-top-md">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      submit
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
// common-questions Section
.common-questions-section {
  text-align: center;
  padding: 2rem 1rem 2rem;
  position: relative;
  background-image: url("../img/about-me/aboutme-title.jpg");
  background-size: cover;
}
// projects
.projects {
  padding-top: 60px;
  padding-bottom: 40px;
  @media (min-width: 1200px) {
    padding-top: 120px;
  }
  .section-title-overlay-text {
    top: 100px;
  }
  .single-project {
    cursor: pointer;
    &:hover {
      .project-card {
        transform: scale(0.97);
      }
    }
  }
  .project-card {
    position: relative;
    transition-duration: 500ms;
    display: flex;
    justify-content: center;
    align-items: center;
    .card-inner {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(var(--primary));
      z-index: 1;
    }
    .card-img {
      position: relative;
      z-index: 2;
      transition-duration: 300ms;
      transform-origin: left;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      transition-duration: 500ms;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      border: 1px solid rgb(var(--black));
    }
    .card-arrow {
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid rgb(var(--black));
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 4;
      transition-duration: 500ms;
      scale: 0;
      opacity: 0;
      .arrow-inner {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgb(var(--primary));
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          font-size: 35px;
        }
      }
    }
    &:hover {
      &::before {
        transform: rotate(3.5deg);
        opacity: 1;
      }
      &::after {
        transform: rotate(-3.5deg);
        opacity: 1;
      }
      .card-arrow {
        scale: 1;
        opacity: 1;
      }
    }
  }
  .project-info {
    margin-top: 32px;
    h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    p {
      margin-bottom: 12px;
    }
    .tags {
      span {
        font-weight: 600;
        font-size: 14px;
        text-transform: uppercase;
      }
    }
  }
  .next-chapter {
    padding-top: 80px;
  }
}
.project-list {
  margin-top: 40px;
  border-left: 1px dashed #999;
  border-right: 1px dashed #999;
}
.right-bar {
  padding: 20px;
  @media (min-width: 1200px) {
    padding: 32px;
    gap: 24px;
  }
  border-radius: 12px;
  border: 1px solid rgba(var(--black), 0.1);
  background-color: rgba(var(--white), 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  h6 {
    font-size: 18px;
  }
}
// modal
.modal-dialog {
  overflow-y: auto;
}
.modal-content {
  background-color: rgba(var(--primary), 0.8);
  .modal-body {
    background-color: rgb(var(--primary));
    max-width: 1296px;
    height: 100%;
    border-radius: 12px;
    margin: 30px auto;
    position: relative;
    padding: 16px;
    @media (min-width: 768px) {
      padding: 32px;
    }
    @media (min-width: 1200px) {
      padding: 48px;
      padding-top: 120px;
    }
    .btn-close {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 24px;
      height: 24px;
      @media (min-width: 1200px) {
        right: 48px;
        width: 36px;
        height: 36px;
      }
      border-radius: 50%;
      color: rgb(var(--white));
      background-color: rgb(var(--black));
      display: flex;
      align-items: center;
      justify-content: center;
      transition-duration: 0.3s;
      &:hover {
        transform: rotate(180deg);
      }
    }
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      &.bullet {
        list-style: disc;
      }
      @media (min-width: 1200px) {
        margin-bottom: 60px;
      }
      gap: 12px;
      &.list-plus {
        li {
          position: relative;
          &::before {
            content: "+"; /* Unicode for plus sign */
            position: absolute;
            left: -20px;
            top: 2px;
            color: #000; /* Change color of the plus icon */
            font-size: 20px; /* Size of the plus icon */
            line-height: 1; /* Align vertically with text */
          }
        }
      }
    }
    .outcome {
      border-bottom: 1px solid rgb(var(--black));
      padding-bottom: 40px;
      margin-bottom: 40px;
      @media (min-width: 1200px) {
        padding-bottom: 60px;
        margin-bottom: 60px;
      }
    }
  }
}
</style>
