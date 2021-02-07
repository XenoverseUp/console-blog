require("dotenv").config();

const app = require("./app");

(() => {
  app.listen(app.get("port"), () => {
    console.log(`Server is up and running on port ${app.get("port")}...`);
  });
})();
