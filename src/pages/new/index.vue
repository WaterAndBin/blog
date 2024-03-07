<template>
  <div class="h-full flex flex-col items-center overflow-hidden">
    <h2>编辑属于你的文章</h2>
    <div>
      <div><TextEditor v-model="state.article_cover"></TextEditor></div>
      <div class="mt-4 flex-default flex-col">
        <div class="text-3xl">封面</div>
        <div class="my-4 border-default h-50 w-110 cursor-pointer border-3">
          <div>
            <input
              ref="coverRef"
              class="hidden"
              type="file"
              accept="image/*"
              @change="onFileChange"
            />
          </div>
          <div
            v-show="imageSrc == ''"
            class="h-full flex-default text-2xl font-semibold"
            @click="coverRef.click()"
          >
            上传图片
          </div>
          <div v-show="imageSrc" class="relative h-full w-full">
            <img class="h-full w-full" :src="imageSrc" alt="Uploaded Image" />
            <div
              class="absolute top-0 z-12 h-full w-full bg-gray-600/70 opacity-0 hover:opacity-100"
            >
              <button
                class="clearButton absolute z-11 h-12 w-12 bg-transparent"
                @click="clearImage"
              >
                <Icon name="mdi:rubbish-bin-outline" class="h-full w-full text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-default flex-col">
        <div class="text-3xl">文章标题</div>
        <DefaultInput
          v-model="state.article_title"
          type="test"
          :title-require="false"
          class="w-110"
        ></DefaultInput>
      </div>
      <!-- <div>私有还是共有的</div> -->
      <div class="mb-5 flex-default">
        <button class="border-default h-10 w-40 border-3 bg-transparent text-2xl" @click="sure">
          提交文章
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { picUpload } from '~/server/api/upload';

// import { publishArticle } from '~/server/api/article';

const coverRef = ref();

const imageSrc = ref(''); // 用于存储 Base64 编码的图片数据

const initState = {
  article_title: '', // 文章标题
  article_cover: '', // 文章封面
  article_content: '' // 文章内容
};
const state = reactive({ ...initState });

const onFileChange = async (event: Event): Promise<void> => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const res = await picUpload(file);
    console.log(res);

    const reader = new FileReader();

    reader.onload = (e: any) => {
      imageSrc.value = e.target.result; // 这里是 Base64 编码的图片数据
    };

    reader.readAsDataURL(file); // 读取文件为 Data URL（Base64 编码）
  }
};

const clearImage = (): void => {
  imageSrc.value = ''; // 清除图片数据
};

const sure = (): void => {
  // const formData = new FormData();
  // formData.append('article_title', state.article_title); // 文章标题
  // formData.append('article_content', state.article_content); // 文章内容
  // formData.append('article_title', state.article_title);

  // const res = await publishArticle(formData);
  // console.log(res);
  console.log();
};
</script>

<style lang="scss" scoped>
.clearButton {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
