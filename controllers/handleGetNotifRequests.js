const handleGetNotifRequests = (req, res, db) => {
  const { userID, email } = req.query;
  if (!userID) return res.status(400);

  db.promise()
    .query(
      'SELECT `name`, `userID`, `requestTimestamp` FROM `user` JOIN `requests` ON `userID` = `requestedBy` WHERE  `requestedTo` = ?',
      [userID]
    )
    .then((output) => {
      const [result, fields] = output;
      console.log(result);
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json('Internal server Error');
    });
};

export default handleGetNotifRequests;
