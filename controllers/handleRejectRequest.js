const handleRejectRequest = (req, res, db) => {
  const { userID, reqSentByID } = req.body;
  if (!userID || !reqSentByID) return res.status(400).json('Invalid input');
  try {
    db.execute(
      'DELETE FROM `requests` WHERE `requestedTo` = ? AND `requestedBy` = ?',
      [userID, reqSentByID]
    );
    return res.status(200).json('Successfuly deleted');
  } catch (err) {
    console.log(err);
    return res.status(500).json('Server error');
  }
};

export default handleRejectRequest;
