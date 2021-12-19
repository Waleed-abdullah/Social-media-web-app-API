const handleGetFriends = (req, res, db) => {
  const { userID, email } = req.body;
  if (!userID) return res.status(400);
  let friendList = [];
  //console.log('uwu');
  db.promise()
    .query(
      'SELECT `name`, `userID` FROM `user` WHERE userID IN (SELECT `friendID` FROM friend WHERE `userID` = ?) ',
      [userID]
    )
    .then((output) => {
      const [results, fields] = output;
      return res.status(200).json(results);
    })
    .catch((error) => {
      console.log(error);
      return res.stats(500).json('Internal server Error');
    });
};

export default handleGetFriends;
