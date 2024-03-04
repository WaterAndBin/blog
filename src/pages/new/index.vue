<template>
  <div class="h-full flex flex-col items-center overflow-hidden">
    <h2>编辑属于你的文章</h2>
    <div>
      <div><TextEditor></TextEditor></div>
      <div>
        <div class="w-40 h-40 border-default border-4 cursor-pointer">
          <div>
            <input
              class="hidden"
              ref="coverRef"
              type="file"
              accept="image/*"
              @change="onFileChange"
            />
          </div>
          <div
            class="text-2xl font-semibold flex-default h-full"
            v-show="imageSrc == ''"
            @click="coverRef.click()"
          >
            上传图片
          </div>
          <div class="w-full h-full relative">
            <img class="w-full h-full" v-if="imageSrc" :src="imageSrc" alt="Uploaded Image" />
            <button class="absolute clearButton" v-if="imageSrc" @click="clearImage">
              <Icon icon="mdi:rubbish-bin-outline" />
            </button>
            ~
          </div>
        </div>
      </div>
      <div>文章标题</div>
      <div>私有还是共有的</div>
      <div>提交文章</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const coverRef = ref();

const imageSrc = ref(''); // 用于存储 Base64 编码的图片数据

const onFileChange = (event: Event): void => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
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
</script>

<style lang="scss" scoped>
.clearButton {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
