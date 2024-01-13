## Установка простейшего веб-сервера
-D - девелоперская зависимость
npm i -D http-server

## Инициализация node.js приложения (чтобы создался package.json)
npm init (в директории проекта)

## для автоматического запуска http-server'а добавляем в package.json в блок "scripts"
"start": "http-server"


## для работы с webpack из командной строки
npm i -D webpack webpack-cli

## для автоматического запуска webpack перед стартом добавляем в package.json в блок "scripts"
-w - для динамической пересборки при изменениях в файлах
"webpack": "webpack -w"

## для отключения предупреждений создаем в корне файл
webpack.config.js
с содержимым:
module.exports = {
    mode: 'development',
    devtool: 'source-map'
}

## для сборки в babel нужен лоудер
установим
npm install -D babel-loader @babel/core @babel/preset-env webpack


## сервер от webpack
установим
npm install --save-dev webpack-dev-server
добавим в webbpack.config.js
    devServer: {
        static: './out',
      },

добавляем в package.json в блок "scripts"
    "start": "webpack-dev-server",


## чтобы не подключать скрипт к html через <script src=''>...
установим 
npm i -D html-webpack-plugin
добавим в webbpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
и
plugins: [
      new HtmlWebpackPlugin({
       title: 'Development',
      }),
    ],