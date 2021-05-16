module.exports = app => {
  const controllers = require("../controllers");
  // Create a new Customer
  app.post("/updateBooks", controllers.addNewBook);
  app.post("/delete", controllers.delete);
  app.get("/getAllBooks", controllers.getAll);



};