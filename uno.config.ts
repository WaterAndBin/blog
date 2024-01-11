import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  shortcuts: {
    /* 这个按钮的默认是文本编辑器上面的按钮 */
    'button-default':
      'bg-transparent w-15 h-13 rounded-md hover:bg-sky-200 text-center flex-default flex-col',
    /* 弹性盒子默认 */
    'flex-default': 'flex justify-center items-center'
  },
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
  // ...UnoCSS 选项
});
