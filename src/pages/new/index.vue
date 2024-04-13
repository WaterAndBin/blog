<template>
  <div class="h-full flex flex-col items-center overflow-hidden">
    <h2>编辑属于你的文章</h2>
    <div>
      <div><TextEditor v-model="state.article_content"></TextEditor></div>
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
      <div class="flex-default flex-col">
        <div class="text-3xl">文章标签选择</div>
        <div class="mb-4 mt-2 flex">
          <div
            v-for="(items, index) in tabs"
            :key="index + items.id"
            class="mx-1 flex items-center"
          >
            <label for="fruit1">{{ items.tab_name }}</label>
            <input
              :id="items.tab_name"
              v-model="state.tabs_id"
              type="checkbox"
              :name="items.tab_name"
              :value="items.id"
            />
          </div>
        </div>
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
import { publishArticle } from '~/server/api/article';
import { getAllTabs } from '~/server/api/tab';
import { picUpload } from '~/server/api/upload';

// import { publishArticle } from '~/server/api/article';

const coverRef = ref();

const imageSrc = ref(''); // 用于存储 Base64 编码的图片数据

const initState = {
  article_title: '', // 文章标题
  article_cover: '', // 文章封面
  article_content: '', // 文章内容
  coverFile: '' as any,
  tabs_id: []
};
const state = reactive({ ...initState });

const onFileChange = (event: Event): void => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    state.coverFile = file;
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

const sure = async (): Promise<void> => {
  /* 看是否有封面 */
  if (state.coverFile.name !== '' && state.coverFile.size !== 0) {
    const picData = new FormData();
    picData.append('file', state.coverFile);
    const res = await picUpload(picData);
    if (res.code == 200) {
      state.article_cover = res.data;
    }
  }
  const timerData = Object.assign({}, state, { coverFile: undefined });
  const res = await publishArticle({ ...timerData, tabs_id: JSON.stringify(timerData.tabs_id) });
  if (res.code == 200) {
    useMessage({
      message: '发布文章成功',
      type: 'success'
    });
  } else {
    useMessage({
      message: res.message,
      type: 'error'
    });
  }
};

const tabs = ref<any[]>([]);

const getData = async (): Promise<void> => {
  const res = await getAllTabs();
  if (res.code == 200) {
    tabs.value = res.data;
  }
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.clearButton {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
