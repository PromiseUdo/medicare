if (process.env.NODE_ENV === "development") {
  module.exports = require("./key_dev");
} else {
  module.exports = require("./key_prod");
}
