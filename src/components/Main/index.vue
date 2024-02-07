<template>
  <div>
    <!-- 文章卡片 -->
    <div class="flex-default flex-col">
      <div v-for="index in 5" :key="index">
        <ArticleCard></ArticleCard>
      </div>
    </div>
  </div>
</template>
