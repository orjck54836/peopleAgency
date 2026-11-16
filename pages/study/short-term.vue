<script lang="ts" setup>
// 版面在 components/StudyModePage.vue（短期／長期／升學三頁共用），這裡只放本頁專屬的設定
usePageSeo('shortTerm', [
  { name: '日本留遊學', path: '/study' },
  { name: '短期遊學', path: '/study/short-term' },
])

useServiceSchema({
  name: '日本短期遊學代辦（2 週～3 個月）',
  description:
    '2 週到 3 個月的日本短期遊學安排：語言學校選擇與報名、住宿與行程規劃。持台灣護照觀光免簽入境，不需申請留學簽證，日語零基礎可參加。代辦零手續費。',
  path: '/study/short-term',
  serviceType: ['日本短期遊學', '語言學校短期課程', '遊學行程安排'],
  freeOfCharge: true,
})

// 本頁有哪些區塊；listCount 是該區塊在語系檔裡的條列數，0 代表只有內文
const sectionMeta = [
  { id: 'whatIs', listCount: 0 },
  { id: 'whoFor', listCount: 4 },
  { id: 'features', listCount: 0 },
  { id: 'cost', listCount: 3 },
  { id: 'reminder', listCount: 0 },
]
</script>

<template>
  <StudyModePage
    mode="shortTerm"
    :sections="sectionMeta"
    hero-image="/images/study-modes/hero-short.jpg"
    intro-image="/images/short-term-study.jpeg"
    features-image="/images/study-modes/features-short.jpg"
    school-tag="短期"
  />
</template>
