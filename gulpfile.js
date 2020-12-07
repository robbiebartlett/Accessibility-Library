// Initialize modules

// Importing specific gulp API functions lets you write them below 
// as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
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
    replace = require('gulp-replace'),
    browserSync = require('browser-sync').create();


    

// File path variables
const files = {
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/**/*.js',
    spritePath: 'src/images/**/*.svg'
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
        "open": true,
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
    watch([files.scssPath, files.jsPath],
        series(
            parallel(scssTask, jsTask),
            cacheTask
        )
    );    
}



// Default task
exports.default = series(
    parallel(scssTask, jsTask, spriteTask), 
    cacheTask,
    watchTask
);






