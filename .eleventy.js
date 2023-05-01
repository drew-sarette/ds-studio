const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");


module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy({ "./src/favicon" : "/" });

  eleventyConfig.addShortcode('currentYear', () => new Date().getFullYear());
 
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // eleventyConfig.addCollection("posts", function(collection) {
  //   return collection.getFilteredByGlob("./blog/*.md");
  // });

  // eleventyConfig.addCollection("tutorials", function(collection) {
  //   return collection.getFilteredByGlob(".tutorials/*.md");
  // });
    
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};