const handleGetFriends = (req, res, db) => {
  const { uid, email } = req.body;
  if (!uid || !email) return res.status(400);
  let friendList = [];
  //console.log('uwu');
  db.promise()
    .query(
      'SELECT `name`, `userID` FROM `user` WHERE userID IN (SELECT `friendID` FROM friend WHERE `userID` = ?) ',
      [uid]
    )
    .then((output) => {
      const [results, fields] = output;
      return res.status(200).json(results);
    })
    .catch((error) => console.log(error));
};

export default handleGetFriends;
