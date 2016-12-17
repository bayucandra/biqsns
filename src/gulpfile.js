var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var compass = require('gulp-compass');

//var htmltojson = require('gulp-html-to-json');
//gulp.task('template-default', function(){//!!!!!!!!!!!!!UNUSED for now==============
//    gulp.src('./src/backend/tempate/dialog/dialog-default.tpl')
//	    .pipe( htmltojson({
//		filename: 'tpl'
//	    }) )
//	    .pipe(gulp.dest('../backend/app/'));
//});
var config ={
    dev_mode : true
};

var compass_config = {
    sourcemap: config.dev_mode ? false : true,
    style: config.dev_mode ? 'expanded' : 'compressed',
    require: ['susy', 'breakpoint']
};

gulp.task('compass-frontend', function(){
    var config = biqExtend(compass_config, {sass : 'sass/frontend', css: '../frontend/css'});
    return gulp.src('sass/frontend/style.scss')
            .pipe(
                compass(config)
            )
            .on('error', function(err){
                console.log('Error: ', err.message);
            });
});
gulp.task('compass', ['compass-frontend']);

gulp.task('JS-backend', function(){
    return gulp.src(
	    ['./js/backend/lib/biq-widget-structure.js', './js/backend/lib/biq-theme-dialog.js', 
		'./js/backend/lib/biq-theme-manager.js',  './js/backend/lib/biq-widget-element-parser.js',
		//BEGIN BIQ-ANGULAR=============
		'./js/backend/lib/biq-angular/biq-tab/biq-tab.js',
		//END BIQ-ANGULAR***************
		'./js/backend/app.js'//THe main APP
	    ]
	)
	.pipe(sourcemaps.init())
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest('../backend'))
    
	    .pipe(uglify({ preserveComments: 'license' }))
	    .pipe(rename({extname:'.min.js'}))
	.pipe(sourcemaps.write('app'))	
	.pipe(gulp.dest('../backend'));
});

gulp.task('JS',['JS-backend']);

gulp.task('watch', function(){
    gulp.watch('./js/backend/**/*.js', ['JS']);
    gulp.watch('./sass/frontend/**/*.scss', ['compass']);
});

gulp.task('default',['watch', 'JS', 'compass']);

function biqExtend(p_one, p_two){
    var ret = {};
    for(var key in p_one){
        ret[key] = p_one[key];
    }
    for(var key in p_two){
        ret[key] = p_two[key];
    }
    return ret;
}