// webpack.config.js

// 公式ドキュメントにも有るように、Node.jsにあるパスモジュールを読み込んでいる
// must be an absolute path (use the Node.js path module)
// https://webpack.js.org/configuration/#options
const path = require('path');

// resolve()は、絶対パスを生成するメソッド
// webpack.config.jsファイルが存在している現在のディレクトリ名と、distディレクトリを連結して絶対パスに変換している
const outputPath = path.resolve(__dirname, 'dist');
// HTMLテンプレートファイルを読み込むプラグイン
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CSSファイルを別ファイルへ出力するためのプラグイン
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// プロダクションモードでバンドル時に、console.logを自動的に削除するプラグイン
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// CSSのファイルを圧縮するプラグイン
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// console.log(`これがoutputPathです：${outputPath}`);

// モジュールにオブジェクトを設定する
module.exports = {
  // エントリーポイントの設定：モジュールをバンドルするための対象物を設定している
  entry: './src/index.js',
  output: {
    // 出力するファイル名を設定
    filename: 'main.js',
    // 絶対パスを指定
    path: outputPath,
  },
  // loaderを登録していく
  module: {
    // ruleは配列で登録する
    rules: [
      {
        enforce: 'pre', // この設定を持たないローダーよりも、一番早くローダーが実行される（ローダーの配置を気にしなくて良くなる）
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        // 読み込んだローダーをどういったファイルを登録するのか、正規表現で記述する
        test: /\.(sc|c)ss$/, // scssもしくはcssというファイルに使用するローダーと関連付ける（正規表現に変更）
        // sass-loader:scssファイルを読み込むローダー
        // ローダーは配列内の最後の要素から順番に読み込まれる
        use: [
          MiniCssExtractPlugin.loader, // style-loaderから変更
          'css-loader',
          'sass-loader',
          'import-glob-loader',
        ],
      },
      {
        // 拡張子の大文字も許容するように最後尾に i を加える
        // jpegとjpgの様にeがあるかないかを許容するのに、jpe?gという形式にする
        test: /\.(jpe?g|png|svg|gif|ico)$/i,
        loader: 'url-loader',
        // optionsを指定することで、file-loaderを有効化することが出来る
        options: {
          // 指定のサイズを超過すると、画像が[name]で指定されたファイルに書き換わり独立する
          // あたかもimagesディレクトリ配下に存在しているかのように、別ファイルとして出力できる（Developerツールでも確認済み）
          limit: 1024, // サイズはKB
          name: './images/[name].[ext]',
        },
      },
      // babel-loaderを使用するための設定
      {
        // test: /\.m?js$/, // トランスパイルの対象の拡張子を指定
        test: /\.jsx?$/,
        exclude: /node_modules/, // node_module内のファイルはトランスパイルの対象とはしない。自分でコーディングしたファイルを対象とするため
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  devServer: {
    contentBase: outputPath,
  },
  // プラグインを利用するための設定
  plugins: [
    // プラグインのインスタンスを生成
    new HtmlWebpackPlugin({
      // 雛形ファイルを指定する
      template: './src/index.html', // 雛形ファイルが配置されている場所
      filename: './index.html', // 出力するファイル名
    }),
    new MiniCssExtractPlugin({
      // [name]：デフォルトでmainという名前が使用される
      // [hash]：バンドル時にユニークな名前がつけられる
      filename: '[name].[hash].css',
    }),
  ],
  // 最適化（webpack4から導入された）
  optimization: {
    // optimizationの設定の中のminimizerという設定にUglifyJsPluginインスタンスを渡す
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  devtool: 'eval-source-map',
};
