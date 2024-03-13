<script setup lang="ts">
import { getArticleDetail } from '~/server/api/article';
import type { ArticleDetail } from '~/types/article';

const router = useRouter();
const route = useRoute();
const { id } = route.params;

/* dom */
const ReportDialogRef = ref();

const timerData = ref<ArticleDetail>();

/**
 * 获取文章的详细数据
 * @returns
 */
const getData = async (): Promise<void> => {
  if (id) {
    console.log(id);
    const res = await getArticleDetail(Number(id));
    if (res.code == 200) {
      timerData.value = res.data;
    }
    console.log(timerData.value);
  } else {
    router.push('/home');
  }
};

const show = (): void => {
  ReportDialogRef.value.show();
};

// await getData();
onMounted(() => {
  nextTick(() => {
    getData();
  });
});
</script>

<template>
  <div>
    <ArticleBody :data="timerData" :show-dialog="show"></ArticleBody>
    <!-- 举报弹窗 -->
    <ReportDialog ref="ReportDialogRef"></ReportDialog>
  </div>
</template>
