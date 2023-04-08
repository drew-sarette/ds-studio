const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");

  eleventyConfig.addShortcode('currentYear', () => new Date().getFullYear());
 

  //Add filter for luxon 
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Define the "posts" collection
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("./blog/*.md");
  });

  // Define the "tutorials" collection
  eleventyConfig.addCollection("tutorials", function(collection) {
    return collection.getFilteredByGlob(".tutorials/*.md");
  });

    
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};