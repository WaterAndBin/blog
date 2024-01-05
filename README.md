## 安装
1. 输入 pnpm i 或者 pnpm install 
2. 输入 pnpm run dev 即可运行
3. 不太推荐用 npm或者yarn 进行下载，会出现一些问题（比如加载卡顿等）

## 相关方法
1. 安装包之后或者其他问题，输入 pnpm store prune 清除缓存

## 安装问题
1. Running postinstall script...或者Running postinstall script, done in 92ms
相关问题 github 地址：（看了之后暂时未发现怎么处理，好像是说是nuxt的问题，目前只能忽略，跳过），本人技术问题，望后续有人能解决
https://github.com/antfu/vitesse-nuxt3/issues/99
https://github.com/simoneb/fast-folder-size/issues/60
忽略代码位置：package.json
相关代码：  "pnpm": {
                "neverBuiltDependencies": [
                "fast-folder-size"
                ]
            }

## 开发注意事项
1. 当想使用"@nuxt/img"的使用，发现报错，证明你的电脑或者包并没有成功下载 sharp，该包是用于处理图片操作，这时候需要配置一些东西
    1. 在 .npmrc 下 配置这两个选项：（注意：.npmrc一般在该文件下面：Administrator 或者 C:\Users\Administrator）
        sharp_binary_host=https://npm.taobao.org/mirrors/sharp
        sharp_libvips_binary_host=https://npm.taobao.org/mirrors/sharp-libvips
    2. win+R输入cmd，下载全局 npm i -g sharp
    3. 将node_modules删掉，而后重新下载即可
2. 当出现 某个定义的参数 未读值（或者出现 Cannot redeclare block-scoped variable 'xxx'）,如果在代码都正常的情况，并且定义的参数并不是在 setup（语法糖）中使用，而是在 <>

## 项目规则
1. 能组件化开始就组件化开发，创建的每一个值都必须要有类型限制（注意：非特殊情况请不要使用 any ）
2. 命名都使用大驼峰写法，组件命名统一大写（除非 index.vue ），请勿使用中文拼英进行命名（比如，名字写name，不可以写mingzi）
3. 当发现使用了 props 的时候，发现报错（已声明“props”，但从未读取其值。ts(6133)）的时候，确保 props 里面的值仅用在 template 中，语法糖里面并未使用该props的时候，可以使用 // @ts-ignore 来避免 ts 的语法检查
