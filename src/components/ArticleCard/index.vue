<script lang="ts" setup>
import type { ArticleDetail } from '~/types/article';

const props = defineProps<{
  data: ArticleDetail; // 列表数据
}>();
const { data } = props;
const content = ref<string>('内容测试内容测试');
</script>

<template>
  <nuxt-link :to="`/article/details/${data.id}`" target="_blank" class="color-black no-underline">
    <div class="mt-4 border-default h-55 w-180 cursor-pointer border-3 shadow-lg">
      <div class="box-border h-full w-full flex flex-col justify-around px-2 py-2">
        <div class="box-border h-full w-full flex flex-1">
          <!-- 图片 -->
          <div class="mr-2 h-full flex items-center">
            <nuxt-img
              class="h-37 w-65 overflow-hidden"
              :src="'http://127.0.0.1:9090/' + data.article_cover"
            />
          </div>
          <!-- 文字 -->
          <div class="ml-2 w-0 flex flex-grow flex-col">
            <!-- 标题 -->
            <div class="mb-3 w-full truncate text-2xl font-semibold">
              {{ data.article_title }}
            </div>
            <!-- 内容 -->
            <div class="w-full flex-1 overflow-hidden text-ellipsis break-all">
              <div>{{ content }}</div>
            </div>
          </div>
        </div>
        <div class="mt-1 font-semibold">
          <span class="mr-3">作者：{{ data.author.user_name }}</span>
          <span>发布时间：{{ data.created_time }}</span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
