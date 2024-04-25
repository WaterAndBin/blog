<script setup lang="ts">
import { getArticleDetail } from '~/server/api/article';
import { deleteComments, getComments, reqComments } from '~/server/api/comments';
import type { ArticleDetail } from '~/types/article';

const router = useRouter();
const route = useRoute();
const { id } = route.params;
const userStore = useUserStore();

/* dom */
const ReportDialogRef = ref();

const timerData = ref<ArticleDetail>();
const commentsTotal = ref<any[]>([]);

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
  } else {
    router.push('/home');
  }
};

const show = (): void => {
  ReportDialogRef.value.show(Number(id));
};

/**
 * 获取评论数据
 */
const getCom = async (): Promise<void> => {
  const result = await getComments(Number(id));
  if (result.code == 200) {
    commentsTotal.value = result.data;
  }
};

const content = ref('');
/**
 * 发送评论
 */
const reqCom = async (): Promise<void> => {
  const res = await reqComments(content.value, Number(id));
  if (res.code == 200) {
    useMessage({
      message: '评论成功',
      type: 'success'
    });
    getCom();
  } else {
    useMessage({
      message: '评论失败',
      type: 'error'
    });
  }
};

const deleteCom = async (id: number): Promise<void> => {
  const res = await deleteComments(id);
  if (res.code == 200) {
    getCom();
    useMessage({
      message: '删除评论成功',
      type: 'success'
    });
  } else {
    useMessage({
      message: '删除评论失败',
      type: 'error'
    });
  }
};

onMounted(() => {
  nextTick(() => {
    getData();
    getCom();
  });
});
// await getData();
// await getCom();
</script>

<template>
  <div>
    <ArticleBody :data="timerData" :show-dialog="show"></ArticleBody>

    <div class="comment-container">
      <div class="comment-form">
        <textarea v-model="content" class="textarea" placeholder="在此输入您的评论..."></textarea>
        <button class="btn submit-btn" @click="reqCom">发布评论</button>
      </div>
      <div class="text-2xl">评论区</div>
      <div
        v-for="(items, index) in commentsTotal"
        :key="index"
        class="comment-list mb-2 border-default border-3 p-2"
      >
        <div class="comment">
          <p class="comment-text">{{ items.reviewer_content }}</p>
          <p class="flex items-center justify-between">
            <span class="font-italic text-gray-500">
              由 {{ items.author.user_name }} 发布于 {{ items.reviewer_time }}
            </span>
            <span>
              <button
                v-if="userStore?.userInfo?.id == items.reviewer_id"
                class="border-default border-2 bg-none"
                @click="deleteCom(items.id)"
              >
                删除
              </button>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- 举报弹窗 -->
    <ReportDialog ref="ReportDialogRef"></ReportDialog>
  </div>
</template>

<style lang="scss" scoped>
/* 评论容器 */
.comment-container {
  max-width: 400px;
  margin: 0 auto;
}

/* 评论表单 */
.comment-form {
  margin-bottom: 2rem;
}

.textarea {
  @apply block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500;
  resize: none;
  height: 80px;
}

.submit-btn {
  @apply block w-full mt-2 py-2 px-4 bg-black text-white font-medium rounded-md cursor-pointer hover:bg-gray-800;
}

/* 评论列表 */
.comment-list {
  @apply list-none;
}

.comment {
  @apply border-b border-gray-200;
}
</style>
