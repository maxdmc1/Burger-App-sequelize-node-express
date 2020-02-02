var db = require("../models");

module.exports = {
  postBurgerApi: async function(req, res) {
    const dbBurger = await db.Burger.create(req.body);
    res.json(dbBurger);
  },
  api: function(app) {
    // Get all burgers
    app.get("/api/burgers", function(req, res) {
      db.Burger.findAll({}).then(function(dbBurgers) {
        console.log(dbBurgers);
        res.json(dbBurgers);
      });
    });

    // Get a burger
    app.get("/api/burgers/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Burger.findAll({ where: { id: req.params.id } }).then(function(
        dbBurgers
      ) {
        console.log(dbBurgers);
        res.json(dbBurgers[0]);
      });
    });

    // Create a new burger
    app.post("/api/burgers", this.postBurgerApi);

    // eat a burger
    app.put("/api/burgers/:id", async function(req, res) {
      const eatenBurger = await db.Burger.update(
        { isEaten: true },
        { where: { id: req.params.id } }
      );
      console.log(eatenBurger);
      res.json(eatenBurger);
    });
  }
};
