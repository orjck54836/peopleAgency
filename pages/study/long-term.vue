<script lang="ts" setup>
// 版面在 components/StudyModePage.vue（短期／長期／升學三頁共用），這裡只放本頁專屬的設定
usePageSeo('longTerm', [
  { name: '日本留遊學', path: '/study' },
  { name: '長期留學', path: '/study/long-term' },
])

useServiceSchema({
  name: '日本長期留學代辦（6 個月～2 年）',
  description:
    '6 個月到 2 年的日本語言學校長期留學：選校、在留資格認定證明書（COE）與留學簽證文件代辦，以及抵日後的租屋、開戶與打工支援。代辦零手續費，學費與學校官方收費同步。',
  path: '/study/long-term',
  serviceType: ['日本長期留學', '語言學校申請', '留學簽證申請協助'],
  freeOfCharge: true,
})

// 本頁有哪些區塊；listCount 是該區塊在語系檔裡的條列數，0 代表只有內文
const sectionMeta = [
  { id: 'whatIs', listCount: 0 },
  { id: 'whoFor', listCount: 4 },
  { id: 'features', listCount: 0 },
  { id: 'process', listCount: 4 },
  { id: 'cost', listCount: 3 },
  { id: 'documents', listCount: 3 },
  { id: 'howWeHelp', listCount: 0 },
]
</script>

<template>
  <StudyModePage
    mode="longTerm"
    :sections="sectionMeta"
    hero-image="/images/study-modes/hero-long.jpg"
    intro-image="/images/long-term-study.jpeg"
    features-image="/images/study-modes/features-long.jpg"
    school-tag="長期"
    :school-types="['語言學校', '高等學校']"
  />
</template>
