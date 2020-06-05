let mix = require('laravel-mix');
let build = require('./tasks/build.js');
let webpack = require('webpack');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build');
mix.webpackConfig({
    plugins: [
        build.jigsaw,
        build.browserSync(),
        build.watch(['source/**/*.md', 'source/**/*.php', 'source/**/*.scss', '!source/**/_tmp/*']),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
});

mix.js([
    'source/_assets/js/main.js',
    'source/_assets/js/lazy-loading.polyfill.js',
    'source/_assets/js/contact.js',
    'source/_assets/js/holding.js',
], 'js')
    .extract([
        'jquery'
    ])
    .sass('source/_assets/sass/main.scss', 'css')
    .copy([
        'node_modules/@mdi/font/fonts/**/*'
    ], 'source/assets/build/fonts')
    .options({
        processCssUrls: false,
    }).version();

