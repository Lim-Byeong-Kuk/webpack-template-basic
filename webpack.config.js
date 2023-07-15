
// node.js 전역 모듈 : path
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// export
module.exports = {
  
  // parcel main.js 처럼
  // 파일을 읽어들이기 시작하는 진입점 설정(webpack 은 .js 를 진입점으로 사용)
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // __dirname 경로(현재 파일이 있는 경로)와 'dist' 를 합침
    // path: path.resolve(__dirname, 'dist'), // 절대 경로를 지정해 줘야함
    // filename: 'main.js',
    clean: true
  },

  module: {
    rules: [
      {       // s 는 있을 수도 없을수도 있음 scss or css
        test: /\.s?css$/,  // 정규표현식 ( .css확장자로 끝나는것 찾기 )
        use: [  // 순서 중요! : 밑에부터 실행
          'style-loader',  // style-loader : 삽입역할,
          'css-loader',    // css-loader :  css 해석역할
          'postcss-loader',
          'sass-loader'
        ]
      },
      { // babel 을 위한 설정
        test: /\.js$/, // .js 로 끝나는 파일
        use: [
          'babel-loader'  // babel-loader 패키지 사용 
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 프러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),

    // copyPlugin 을 통해서 static 안의 내용을 dist 폴더로
    new CopyPlugin({
      patterns: [
        { from: 'static' } 
      ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}