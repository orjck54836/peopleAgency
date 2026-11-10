<script lang="ts" setup>
/**
 * 刪除帳號（皓學日語 App）。
 *
 * 版面與樣式都在 components/LegalPage.vue，這裡只放內容。
 * 條文內容與 App 端原本的靜態頁一致，搬站時未改寫任何條款文字。
 */
useSeoMeta({
  title: '刪除帳號',
  description: '皓學日語 App 的帳號刪除說明：App 內的操作步驟、會永久刪除哪些資料，以及無法操作 App 時的替代途徑。',
  ogTitle: '刪除帳號',
  ogDescription: '皓學日語 App 的帳號刪除說明：App 內的操作步驟、會永久刪除哪些資料，以及無法操作 App 時的替代途徑。',
})
</script>

<template>
  <LegalPage title="刪除帳號" meta="你可以隨時在皓學日語 App 內自行刪除帳號。本頁說明操作步驟，以及刪除後會移除哪些資料。">
    <h2>App 內的操作步驟</h2>
    <ul>
      <li>開啟皓學日語 App</li>
      <li>切換到「我的」分頁</li>
      <li>往下滑到頁面最底</li>
      <li>點選「刪除帳號」</li>
      <li>依畫面指示確認</li>
    </ul>

    <h2>會永久刪除的資料</h2>
    <ul>
      <li>帳號本身</li>
      <li>所有學習紀錄與完成進度</li>
      <li>XP 與段位</li>
      <li>單字本與複習排程</li>
      <li>排行榜上的名次與公開資料（暱稱、自我介紹等）</li>
      <li>AI 會話紀錄</li>
    </ul>

    <div class="note">
      <p>帳號刪除後<strong>無法復原</strong>，請在確認前自行保存需要的資料。</p>
      <p>若你有有效的訂閱，刪除帳號<strong>不會</strong>取消訂閱。訂閱由 Apple 管理，需要另外在裝置上的「設定 → Apple 帳號 → 訂閱」取消。</p>
    </div>

    <h2>無法操作 App 時的替代途徑</h2>
    <p>如果你已經無法開啟或登入 App，可以透過下列方式聯絡我們，由我們代為刪除。請附上你註冊時使用的 email，以便我們確認身分。</p>
    <ul>
      <li>LINE 官方帳號：<a href="https://line.me/R/ti/p/@forma_global" target="_blank" rel="noopener">@forma_global</a></li>
      <li>Email：<a href="mailto:info@forma-global.com">info@forma-global.com</a></li>
    </ul>
  </LegalPage>
</template>
