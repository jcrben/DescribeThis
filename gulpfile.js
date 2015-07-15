var gulp = require('gulp');
var taskList = require('gulp-task-listing');
var spawn = require('child_process').spawn;

gulp.task('dev', function() {
  spawn('nodemon', ['./server/app.js'], {stdio: [0, 1, 2]});
  
})
gulp.task('default', taskList.withFilters(/:/, 'default'));