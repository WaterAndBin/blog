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
    'button-default':
      'px-6 py-2.5 text-base rounded-full mr-3 my-1 bg-transparent tracking-[2px] border-solid border-1 text-[#061a69]'
  },
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
  // ...UnoCSS 选项
});
