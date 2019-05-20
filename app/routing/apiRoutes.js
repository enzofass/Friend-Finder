const friendsData = require("../data/friends");

module.exports = function(app) {
  // Basic route that send user the json object
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    friendsData.push(req.body);

    const userInput = res.body;
    console.log(userInput);
    res.json({ ok: true });

    // friend-finder logic goes here
  });
};
