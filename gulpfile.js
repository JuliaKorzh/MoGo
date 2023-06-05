const {src, dest, watch, parallel, series} = require('gulp');               // series отвечает за последовательное выполнение задач

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');                            //  переименоввает фаили и делает из нескольктх один
const uglify = require('gulp-uglify-es').default;                   //  соединяет фаили js в один     
const browserSync = require('browser-sync').create();       
const autoprefixer = require('gulp-autoprefixer');                    // дописывает необходимые префиксы, чтобы всё работало независимо от версий
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');


function fonts(){
   return src('app/fonts/src/*.*')
   .pipe(fonter({
      formats: ['woff', 'ttf']                                     // любые форматы шрифтов будут конвертироваться в  woff  и ttf
   }))
   .pipe(src('app/fonts/*.ttf'))
   .pipe(ttf2woff2())
   .pipe(dest('app/fonts'))
}

function images () {
   return src(['app/images/src/**/*.*', '!app/images/src/**/*.svg'])
      .pipe(newer('app/images/dist'))                                  //проверяет какие картинки уже конвертировались чтобы не повторяться и не нугружать память
      .pipe(avif({quality: 50}))

      .pipe(src('app/images/src/*.*'))
      .pipe(newer('app/images/dist')) 
      .pipe(webp())

      .pipe(src('app/images/src/*.*'))
      .pipe(newer('app/images/dist')) 
      .pipe(imagemin())

      .pipe(dest('app/images/dist'))
}

function sprite(){
   return src(['app/images/dist/*.svg'])
      .pipe(svgSprite({
         mode:{
            stack: {
               sprite: '../sprite.svg',
               example: true
            }
         } 
      }))
      .pipe(dest('app/images/dist'))
}

function scripts(){ 
   return src(
      [  'node_modules/jquery/dist/jquery.js',
         'node_modules/slick-carousel/slick/slick.js',
         'node_modules/mixitup/dist/mixitup.js',
         'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
         'app/js/main.js']
      )                                   // чтобф подключить большое число js фаилов Можно писать так 'app/js/*.js', '!app/js/main.min.js'
   .pipe(concat('main.min.js'))
   .pipe(uglify())
   .pipe(dest('app/js'))
   .pipe(browserSync.stream())
}

function styles() {
   return src('app/scss/style.scss')  
   .pipe(autoprefixer({overriderBrowserslist: ['last 10 version']}))                                             //находим фаил
   .pipe(concat('style.min.css'))
   .pipe(scss({outputStyle: 'compressed'}))                                  //применяем к нему gulp sass  и минимизируем
   .pipe(dest('app/css'))  
   .pipe(browserSync.stream())                                               // куда его отправляем
}

function watching(){
   browserSync.init({
      server: {
         baseDir: "app/"
      }
   })
   watch(['app/scss/style.scss'], styles)
   watch(['app/images/src'], images)
   watch(['app/js/main.js'], scripts)
   watch(['app/**/*.html']).on('change', browserSync.reload)            // *:html  озгачает, что будут отслеживаться   изменения во всех html фаилах
}

function cleanDist (){
   return src('dist')
   .pipe(clean())
}

function building(){
   return src([
      'app/css/style.min.css',                         // переносим нужные фвилы для продакшен 
      'app/js/main.min.js',
      'app/fonts/*.*',
      'app/*.html',
      'app/images/dist/*.*',
      '!app/images/dist/*.svg',
      'app/images/dist/sprite.svg',
   ], {base: 'app'})                                       //означает что мы сохраняем базовую структуру
      .pipe(dest('dist'))                                 // загружаем всё в дист   
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts;
exports.building = building;



exports.build =  series(cleanDist, building);

exports.default = parallel(styles, images, scripts, watching) ;              // запуск всего одновременно . Благодаря default ненужно 
                                                                                      // указывать  конкретную команду в консооли. Пишем просто gulp 
                                                                                      