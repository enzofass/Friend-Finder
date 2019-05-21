const friendsData = require("../data/friends");

module.exports = function(app) {
  // Basic route that send user the json object
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // post
  app.post("/api/friends", function(req, res) {

    const userInput = req.body;
    const arrayDifferences = [];

    for (let i = 0; i < friendsData.length; i++) {
      let totalDifference = 0;
      for (let j = 0; j < userInput.scores.length; j++) {
        totalDifference += Math.abs(
          parseInt(friendsData[i].scores[j]) - parseInt(userInput.scores[j])
        );
      }
      arrayDifferences.push(totalDifference);

      console.log(arrayDifferences);
    }
    const bestMatchIndex = arrayDifferences.indexOf(
      Math.min(...arrayDifferences)
    );
    console.log(
      friendsData[bestMatchIndex].name,
      friendsData[bestMatchIndex].photo
    );
    res.json(friendsData[bestMatchIndex]);

    friendsData.push(req.body);

  });
};
