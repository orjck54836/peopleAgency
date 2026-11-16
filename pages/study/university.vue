<script lang="ts" setup>
// 版面在 components/StudyModePage.vue（短期／長期／升學三頁共用），這裡只放本頁專屬的設定
usePageSeo('university', [
  { name: '日本留遊學', path: '/study' },
  { name: '升學進修', path: '/study/university' },
])

useServiceSchema({
  name: '日本升學進修規劃',
  description:
    '從語言學校銜接日本專門學校、大學與研究所的升學規劃：選校、出願文件與面試準備。',
  path: '/study/university',
  serviceType: ['日本升學', '專門學校申請', '大學申請規劃'],
  freeOfCharge: true,
})

// 本頁有哪些區塊；listCount 是該區塊在語系檔裡的條列數，0 代表只有內文
const sectionMeta = [
  { id: 'whatIs', listCount: 0 },
  { id: 'whoFor', listCount: 4 },
  { id: 'features', listCount: 0 },
  { id: 'process', listCount: 3 },
  { id: 'cost', listCount: 3 },
  { id: 'documents', listCount: 0 },
  { id: 'reminder', listCount: 0 },
]
</script>

<template>
  <StudyModePage
    mode="university"
    :sections="sectionMeta"
    hero-image="/images/study-modes/hero-university.jpg"
    intro-image="/images/education.jpeg"
    features-image="/images/study-modes/features-university.jpg"
    school-tag="升學"
  />
</template>
