const handleGetFriends = (req, res, db) => {
  const { userID, email } = req.query;
  console.log(userID)
  if (!userID) return res.status(400).json('Invalid input');
  db.promise()
    .query(
      'SELECT `name`, `userID` FROM `user` WHERE userID IN (SELECT `friendID` FROM friend WHERE `userID` = ?)',
      [userID]
    )
    .then((output) => {
      const [results, fields] = output;
      console.log(results)
      return res.status(200).json(results);
    })
    .catch((error) => {
      console.log(error);
      return res.stats(500).json('Internal server Error');
    });
};

export default handleGetFriends;
