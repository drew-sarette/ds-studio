const fs = require("fs");
const matter = require("gray-matter");

module.exports = function() {
  const philFile = fs.readFileSync("src/about/philosophy.md", "utf8");
  const philData = matter(philFile).data;
  return philData;
};