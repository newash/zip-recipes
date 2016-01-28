var gulp = require("gulp");
var del = require("del");
var rename = require("gulp-rename");
var filter = require("gulp-filter");

gulp.task("build", ["clean"], function () {
  gulp.src(["src/*", "!src/composer.*", "LICENSE"])
    .pipe(gulp.dest("build/premium"))
    // .pipe(filter(["*", "!src/plugins/*", "src/plugins/index.php"]))
    .pipe(gulp.dest("build/free"));
});

gulp.task("clean", function () {
  return del("build");
});
