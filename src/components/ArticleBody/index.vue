<script setup lang="ts">
import type { ArticleDetail } from '~/types/article';

const router = useRouter();

const props = defineProps<{
  data: ArticleDetail | undefined;
  showDialog: () => void;
}>();
// const { data } = props;
</script>

<template>
  <div class="h-full w-full">
    <div
      v-if="props.data"
      class="articleBody_box m-[3rem_auto] border-default box-border min-h-40 w-180 border-3 p-3"
    >
      <div class="relative">
        <!-- 举报操作 -->
        <div class="report absolute -right-2 -top-2">
          <svg-icon
            name="report"
            class="relative h-7 w-7 cursor-pointer"
            @click="props.showDialog()"
          ></svg-icon>
          <div
            class="tip absolute h-6 w-12 bg-black text-center leading-6 opacity-0 transition-all -bottom-5 -left-2"
          >
            <span class="text-white">举报</span>
            <div
              class="absolute left-1/2 top-0 rotate-45 bg-inherit p-1 -translate-x-1/2 -translate-y-1/2"
            ></div>
          </div>
        </div>
        <!-- 标题 -->
        <div class="text-center text-2xl font-semibold">
          <span>{{ props.data.article_title }}</span>
        </div>
        <!-- 作者的信息 -->
        <div class="my-2 text-center font-semibold">
          <span class="mx-1">作者：{{ props.data.author.user_name }}</span>
          <span class="mx-1">发布时间：{{ props.data.created_time }}</span>
        </div>
        <!-- 文章的内容 -->
        <div class="content_box">
          <div v-html="props.data.article_content"></div>
        </div>
      </div>
    </div>
    <div v-else class="mt-10 h-full flex-default flex-col">
      <div class="text-3xl font-600">找不到内容了~</div>
      <div class="mt-4"><NotStatus></NotStatus></div>
      <div>
        <button
          class="mt-10 button-default w-auto px-4 text-xl font-600"
          @click="router.push('/home')"
        >
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.report {
  &:hover .tip {
    @apply -bottom-7 opacity-100;
  }
}
</style>
