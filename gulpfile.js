var gulp = require('gulp');
var taskList = require('gulp-task-listing');


gulp.task('default', taskList.withFilters(/:/, 'default'))