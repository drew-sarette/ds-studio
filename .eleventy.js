const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy({ "./src/favicon": "/" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addShortcode("currentYear", () => new Date().getFullYear());

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("vimeoEmbed", (vimeoId, title) => {
    return `<figure style="padding:56.25% 0 0 0;position:relative;" class="vimeo-embed">
    <iframe loading="lazy" src="https://player.vimeo.com/video/${vimeoId}?h=16f6a7ef75&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="allowfullscreen" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="${title}"></iframe>
</figure>
<script src="https://player.vimeo.com/api/player.js"></script>`;
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
