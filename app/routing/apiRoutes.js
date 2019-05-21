const friendsData = require("../data/friends");

module.exports = function(app) {
  // Basic route that send user the json object
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // post to API
  app.post("/api/friends", function(req, res) {
    // current user object
    const userInput = req.body;
    // array to store differences
    const arrayDifferences = [];
    // outter loop to loop through all friends in API
    for (let i = 0; i < friendsData.length; i++) {
      let totalDifference = 0;
      // inner loop to compare scores and find difference
      for (let j = 0; j < userInput.scores.length; j++) {
        totalDifference += Math.abs(
          parseInt(friendsData[i].scores[j]) - parseInt(userInput.scores[j])
        );
      }
      // push total difference into array for each friend
      arrayDifferences.push(totalDifference);
    }
    // best match is determined by lowest difference during compare
    // grab index of lowest value
    const bestMatchIndex = arrayDifferences.indexOf(
      Math.min(...arrayDifferences)
    );
    // return best match json
    res.json(friendsData[bestMatchIndex]);
    // push current user to API
    friendsData.push(req.body);
  });
};
