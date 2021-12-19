const handleAcceptRequest = (req, res, db) => {
  let { loggedInUserID, notifUserID } = req.body;

  try {
    db.query('INSERT INTO `friend` (`userID`, `friendID`) VALUES(?,?)', [
      loggedInUserID,
      notifUserID,
    ]);
    db.query('INSERT INTO `friend` (`userID`, `friendID`) VALUES(?,?)', [
      notifUserID,
      loggedInUserID,
    ]);
  } catch (error) {
    console.log(error);
    return res.status(500).json('unable to accept request');
  }

  try {
    db.query(
      'DELETE FROM `requests` WHERE `requestedTo` = ? AND `requestedBy` = ?',
      [loggedInUserID, notifUserID],
      (err, result) => {
        return res.status(200).json();
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json('unable to delete request');
  }
};

export default handleAcceptRequest;
