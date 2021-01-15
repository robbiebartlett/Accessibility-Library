// Initialize modules
/*jshint esversion: 6 */

// Importing specific gulp API functions lets you write them below 
// as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
const gulpSVGSprite = require('gulp-svg-sprite');
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync').create();

    
// File path variables
const files = {
    htmlPath: 'src/html/**/*.html',
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/**/*.js',
    imagesPath: 'src/images/**/*',
    spritePath: 'src/images/**/*.svg'
};




// Html task:
function htmlTask() {

  //destination
  const out = 'dist/' + 'html/';

  return src(files.htmlPath)   
      .pipe(replace('../../dist/', '../')) //set dist URLS  
      .pipe(htmlmin({
        removeComments: true, //Clear HTML comments
        collapseWhitespace: false, //Compress HTML for production
        minifyJS: true, //Compressed page JS
        minifyCSS: true, //Compressed page CSS
        minifyURLs: true
      }))
      .pipe(dest('dist/html'))
      .pipe(browserSync.reload({
          stream: true
        })
  ); 
}






// Sass task: 
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) 
        .pipe(sass()) 
        .pipe(postcss([ 
            autoprefixer(), 
            cssnano() 
         ])) 
        .pipe(sourcemaps.write('.')) 
        .pipe(dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
          })
    ); 
}





// JS task
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
          })

    );
}





// SVG task
function spriteTask() {
    return src(files.spritePath)
    // minify svg
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))

    // remove all style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				 $('[stroke]').removeAttr('stroke');
				 $('[style]').removeAttr('style');
			},
            parserOptions: {
                xmlMode: true,
            }
        }))
        // cheerio plugin creates unnecessary string '&gt;'
        .pipe(replace('&gt;', '>'))
        
        // build svg sprite
		.pipe(svgSprite({
            "shape": {
                "spacing": {
                   "padding": 0,
                   "box": 'content' 
                },
                "dest": "images/svgs"
            },
            "svg": {
                "xmlDeclaration": false, 
                "doctypeDeclaration": false,  
                "namespaceIDs": false  
            },
            "mode": {
                "symbol": {
                    "dest": "images/sprites", 
                    "sprite": "sprite.svg", 
                    "inline": true, 
                    "render": {
                            "scss": {
                               "dest":'../../../src/scss/tools/_sprites.scss', 
                               "template":'src/scss/templates/_sprite_template.scss' 
                            }
                          },
                    "example": true 
                }
            }
		}))
    .pipe(dest('dist'))
    .pipe(browserSync.reload({
        stream: true
     })
    ); 
}

 



// Image task
function imageTask() {
    //destination
    const out = 'dist/' + 'images/';

    return src(files.imagesPath)
    .pipe(newer('dist/images'))
    .pipe(imagemin({ optimizationlevel: 5 }))
    .pipe(dest('dist/images'))
    .pipe(browserSync.reload({
        stream: true
      })
    );
}





// Caching task
const cbString = new Date().getTime();
function cacheTask(){
    return src(['*.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))  
        .pipe(dest('.')
    );
}



// Watch task
function watchTask(){
    browserSync.init(null, {
        "open": false,
        "port": 3000,
        "server": {
        "baseDir": ".",
        "directory": "true" //adds directory to select individual html files
        },

        "browser": [
            "chrome",
            "C:\\Program Files\\Firefox Developer Edition\\firefox.exe"
        ]
    });
    watch([files.htmlPath, files.scssPath, files.jsPath, files.imagesPath],
        series(
            parallel(htmlTask, scssTask, jsTask, imageTask),
            cacheTask
        )
    );    
}



// Default task
exports.default = series(
    parallel(htmlTask, scssTask, jsTask, spriteTask, imageTask), 
    cacheTask,
    watchTask
);






