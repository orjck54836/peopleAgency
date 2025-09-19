<script setup lang="ts"></script>

<template>
  <footer class="site-footer">
    <!-- 底部版權或備註 -->
    <div class="footer-bottom">
      <p>Copyright © Forma台湾人材紹介 All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style lang="scss">
:root {
  --primary: 215, 169, 140;    /* 淺楓木色 */
  --secondary: 199, 146, 91;   /* 蜂蜜棕 */
  --background: 242, 232, 218; /* 米白色 */
  --contrast: 165, 124, 101;   /* 暖灰木色 */
  --accent: 227, 183, 120;     /* 淺金棕 */
}

.site-footer {
  background-color: #e7bc87;
  color: rgb(var(--contrast));
  padding: 2rem 1rem 1rem;
  
  .footer-bottom {
    text-align: center;
    p {
      font-size: 0.85rem;
      color: rgba(var(--contrast), 1);
    }
  }
}
</style>
