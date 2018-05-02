/*
webpack教程地址:http://jspang.com/2017/09/16/webpack3-2/

 npm install style-loader --save-dev 主要用来处理css中的url
 npm install css-loader --save-dev 

 webpack的图片处理:
 npm install --save-dev file-loader 我们在src里面的图片路径和在dist里面的图片路径是不一样的
 file-loader就是解决这个问题的。
 
 npm install --save-dev url-loader 
 url-loader已经自带了file-loader的功能

 file-loader：解决引用路径的问题，拿background样式用url引入背景图来说，
 我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，
 而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，
 file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，
 再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。

url-loader：如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。
url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。
再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。
因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，
大于limit的还会使用file-loader进行copy。

解决img的src属性设置，打包后图片不显示的问题
npm install html-withimg-loader --save-dev
解决的问题就是在hmtl文件中引入<img>标签的问题。

css分离:
npm install extract-text-webpack-plugin --save-dev
利用extract-text-webpack-plugin插件很轻松的就把CSS文件分离了出来，但是CSS路径并不正确，
很多小伙伴就在这里搞个几天还是没有头绪，网上也给出了很多的解决方案，
我觉的最好的解决方案是使用publicPath解决，我也一直在用。

自动处理css3前缀:
npm install --save-dev postcss-loader autoprefixer
和webpack.config.js同级，建立一个postcss.config.js文件。按照github地址填写配置项
https://github.com/postcss/postcss-loader

消除未使用的CSS:
npm install --save-dev purifycss-webpack purify-css

给webpack增加babel支持
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
虽然Babel可以直接在webpack.config.js中进行配置，但是考虑到babel具有非常多的配置选项，
如果卸载webapck.config.js中会非常的雍长不可阅读，所以我们经常把配置卸载.babelrc文件里。
在项目根目录新建.babelrc文件，并把配置写到文件里。

在配置devtool时，webpack给我们提供了四种选项。

source-map:在一个单独文件中产生一个完整且功能完全的文件。这个文件具有最好的source map,
但是它会减慢打包速度；
cheap-module-source-map:在一个单独的文件中产生一个不带列映射的map，不带列映射提高了打包速度，
但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号）,会对调试造成不便。
 eval-source-map:使用eval打包源文件模块，在同一个文件中生产干净的完整版的sourcemap，
 但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，
 在生产阶段则一定要不开启这个选项。
cheap-module-eval-source-map:这是在打包文件时最快的生产source map的方法，
生产的 Source map 会和打包后的JavaScript文件同行显示，没有影射列，
和eval-source-map选项具有相似的缺点。
四种打包模式，有上到下打包速度越来越快，不过同时也具有越来越多的负面作用，
较快的打包速度的后果就是对执行和调试有一定的影响。
个人意见是，如果大型项目可以使用source-map，如果是中小型项目使用eval-source-map就完全可以应对，
需要强调说明的是，source map只适用于开发阶段，上线前记得修改这些调试设置。

一个项目中是有开发环境和生产环境的，这两个环境的依赖也是不同的。

开发依赖：只在开发中用来帮助你进行开发，简化代码或者生成兼容设置的以来包。
你可以打开package.json来查看，devDependencies的下面的这些包为开发使用的包。
这些包在生产环境中并没有用处。
生产依赖：就是比如我们的js使用了jquery，jquery的程序要在浏览器端起作用，
也就是说我们最终的程序也需要这个包，这就是生产依赖。这些包在dependencies中。

有三种安装方法:
npm install jquery
安装完成后，你会发现在package.json中并不存在这个包的依赖。
如果你项目拷贝给别人继续开发，或者别人和你git合作，再次下载项目npm install时就会缺少这个jquery包。
项目就会无法正常运行，所以这也是我们最不赞成的安装方法。
npm install jquery --save
安装完成后，它存在于package.json的dependencies中，也就是说它是生产环境需要依赖的包（上线时需要的以来包）。
npm install jquery --save-dev
安装完成后，它存在于package.json的devDependencies中，也就是说它是开发环境中需要的，上线并不需要这个包的依赖。
npm install
安装全部项目依赖包
npm install --production
安装生产环境依赖包

webpack配置全局使用第三方类库
ProvidePlugin是一个webpack自带的插件,可以实现全局使用第三方类库

watch的正确使用方法:
我们希望的场景是代码发生变化后，只要保存，webpack自动为我们进行打包。这个工具就是watch.
BannerPlugin插件:
再工作中每个人写的代码都要写上版权声明，为的就是在发生问题时可以找到当时写代码的人

webpack优化技能:
import引入方法：引用后不管你在代码中使用不适用该类库，都会把该类库打包起来，这样有时就会让代码产生冗余。
ProvidePlugin引入方法：引用后只有在类库使用时，才按需进行打包，所以建议在工作使用插件的方式进行引入

copy-webpack-plugin
工作中会有一些已经存在但在项目中没有引用的图片资源或者其他静态资源（比如设计图、开发文档），
这些静态资源有可能是文档，也有可能是一些额外的图片。项目组长会要求你打包时保留这些静态资源，
直接打包到制定文件夹。其实打包这些资源只需要用到copy-webpack-plugin。

clean-webpack-plugin:清除dist文件用的插件
*/ 