<script setup lang="ts">
import { getAllArticleList } from '~/server/api/article';
import type { ArticleDetail } from '~/types/article';

const initState = {
  page: 1 as number, // 页码,当前页面
  pageSize: 10 as number, // 单页面需要展示多少数据
  tableData: [] as ArticleDetail[]
};
const state = reactive({ ...initState });

const getData = async (): Promise<void> => {
  const res = await getAllArticleList(state.page, state.pageSize);
  if (res.code == 200) {
    state.tableData = res.data.list;
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div>
    <!-- 文章卡片 -->
    <div class="flex-default flex-col">
      <div v-for="(items, index) in state.tableData" :key="index">
        <ArticleCard :data="items"></ArticleCard>
      </div>
    </div>
  </div>
</template>
