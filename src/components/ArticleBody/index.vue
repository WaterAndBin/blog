<script setup lang="ts">
import type { ArticleDetail } from '~/types/article';

const router = useRouter();

const props = defineProps<{
  data: ArticleDetail | undefined;
}>();
const { data } = props;
console.log(data);
console.log(props);
</script>

<template>
  <div class="h-full w-full">
    {{ data }}
    <div v-if="data" class="m-[3rem_auto] border-default box-border min-h-40 w-200 border-3 p-3">
      <div>
        <!-- 标题 -->
        <div class="text-2xl font-semibold">
          <span>{{ data.article_title }}</span>
        </div>
        <!-- 作者的信息 -->
        <div class="my-2 text-center font-semibold">
          <span class="mx-1">作者名称：未必</span>
          <span class="mx-1">发布时间：2024-2-18</span>
        </div>
        <!-- 文章的内容 -->
        <div>内容</div>
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
