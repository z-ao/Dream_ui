const webpack    = require('webpack');
const path       = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const project      = 'src';
const name         = 'Dream_ui';
const version      = 'v1';

const TestEntry    = `./src/components/${process.env.path}/demo/index.js`;
const TestOutput   = `./src/components/${process.env.path}/demo`;
const ProductOutput= `./dist/`;
const ProductEntry = `./${project}/index.js`;

const FOLDER_ENTRY  = process.env.path? TestEntry: ProductEntry;
const FOLDER_OUTPUT = process.env.path? TestOutput: ProductOutput;

//处理当前文件夹的相对路径
function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
    entry: FOLDER_ENTRY,
    output: {
        path: path.resolve(__dirname, FOLDER_OUTPUT),
        filename: `${name}_${version}.min.js`
    },
    resolve: {
    extensions: ['.js', '.vue', '.json'],//引入这些文件不需代扩展名
        alias: {//引入模块使用的别名
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            {   //es6
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [ path.resolve(__dirname, './node_modules/')],
                options: {
                    presets: [
                        ["es2015", { "modules": false }]
                    ]
                },
            },
            {   //postcss
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {   //picture
              test: /\.(png|jpg|gif)$/,
              loader: 'url-loader?limit=8192&name=images/[name].[ext]' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
            },
            {   //vue
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {   //file
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
            },
        ]
    },
    plugins: [
        //  编译文件加注释
        new webpack.BannerPlugin("lea出品"), 
        new VueLoaderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),// 压缩
        new ExtractTextPlugin(`${name}_${version}.min.css`)// 分离css
    ]
}