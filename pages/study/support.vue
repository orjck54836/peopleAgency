<script lang="ts" setup>
/**
 * 技術支援（皓學日語 App）。
 *
 * 版面與樣式都在 components/LegalPage.vue，這裡只放內容。
 * 條文內容與 App 端原本的靜態頁一致，搬站時未改寫任何條款文字。
 */
const localePath = useLocalePath()

useSeoMeta({
  title: '技術支援',
  description: '皓學日語 App 的技術支援頁：聯絡方式、常見問題（免費範圍、AI 額度、訂閱取消、還原購買、刪除帳號）。',
  ogTitle: '技術支援',
  ogDescription: '皓學日語 App 的技術支援頁：聯絡方式、常見問題（免費範圍、AI 額度、訂閱取消、還原購買、刪除帳號）。',
})
</script>

<template>
  <LegalPage title="技術支援" meta="這裡是皓學日語 App 的支援頁，使用上遇到問題可以先看常見問題，或直接聯絡我們。">
    <h2>聯絡方式</h2>
    <p>平日會在一到兩個工作日內回覆。LINE 通常最快。</p>
    <ul>
      <li>LINE 官方帳號：<a href="https://line.me/R/ti/p/@forma_global" target="_blank" rel="noopener">@forma_global</a></li>
      <li>Email：<a href="mailto:info@forma-global.com">info@forma-global.com</a></li>
      <li>官方網站：<a href="https://www.forma-global.com/study" target="_blank" rel="noopener">www.forma-global.com/study</a></li>
    </ul>

    <h2>常見問題</h2>

    <h3>課程是免費的嗎？</h3>
    <p>是。情境主題課程、原創短篇讀物、五十音練習、單字本與複習、排行榜、等級與學習統計，全部免費使用。</p>
    <p>需要付費購買的只有「AI 文字對話」與「語音朗讀」的使用額度。</p>

    <h3>AI 額度用完了怎麼辦？</h3>
    <p>AI 文字對話會暫停到隔日，額度重置後即可繼續使用。</p>
    <p>語音朗讀則會自動改用裝置內建的語音，音質較低但仍然可以朗讀，學習不會中斷。</p>

    <h3>怎麼取消訂閱？</h3>
    <p>訂閱由 Apple 管理，請在裝置上開啟「設定 → Apple 帳號 → 訂閱」，選擇皓學日語後取消。</p>
    <p>取消後當期權益仍可使用到期末，不會立刻失效。請注意：<strong>刪除 App 並不會自動取消訂閱</strong>。</p>

    <h3>換手機後付費不見了？</h3>
    <p>請用原本購買時的 Apple 帳號登入，然後到 App 內的購買頁按「還原購買」，額度與訂閱狀態就會回來。</p>
    <p>若還原後仍然沒有恢復，請透過上方的 LINE 或 Email 聯絡我們，並附上購買時使用的 Apple 帳號 email。</p>

    <h3>怎麼刪除帳號？</h3>
    <p>App 內可以自行刪除，步驟與會刪掉哪些資料都寫在<NuxtLink :to="localePath('/study/delete-account')">刪除帳號說明頁</NuxtLink>。</p>
  </LegalPage>
</template>
