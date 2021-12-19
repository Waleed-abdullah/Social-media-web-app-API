const handleGetNotifRequests = (req, res, db) => {
  const { userID, email } = req.body;
  if (!userID) return res.status(400);

  db.promise()
    .query(
      'SELECT `name`, `userID` FROM `user` WHERE userID IN (SELECT `requestedBy` FROM request WHERE `requestedTo` = ?) ',
      [userID]
    )
    .then((output) => {
      const [result, fields] = output;
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json('Internal server Error');
    });
};

export default handleGetNotifRequests;
