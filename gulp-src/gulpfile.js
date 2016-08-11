var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var htmltojson = require('gulp-html-to-json');

gulp.task('template-default', function(){//!!!!!!!!!!!!!UNUSED for now==============
    gulp.src('./src/backend/tempate/dialog/dialog-default.tpl')
	    .pipe( htmltojson({
		filename: 'tpl'
	    }) )
	    .pipe(gulp.dest('../backend/app/'));
});

gulp.task('default', function(){
    return gulp.src(
	    ['./src/backend/lib/biq-widget-structure.js', './src/backend/lib/biq-theme-dialog.js', 
		'./src/backend/lib/biq-theme-manager.js',  './src/backend/lib/biq-widget-element-parser.js',
		//BEGIN BIQ-ANGULAR=============
		'./src/backend/lib/biq-angular/biq-tab/biq-tab.js',
		//END BIQ-ANGULAR***************
		'./src/backend/app.js'//THe main APP
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
gulp.task('watch-backend', function(){
    gulp.watch('./src/backend/**/*.js', ['default']);
    gulp.watch('./src/backend/*.js', ['default']);
});
