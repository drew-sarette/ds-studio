const fs = require("fs");
const matter = require("gray-matter");

module.exports = function() {
  const bioFile = fs.readFileSync("src/about/me.md", "utf8");
  const bioData = matter(bioFile).data;
  return bioData;
};