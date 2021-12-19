const handleSaveProfile = (req, res, db) => {
  const { uid, name, email, region, interests, photoURL } = req.body;
  //check for invalid input
  if (!uid || !email || !name || !region || !interests)
    return res.status(400).json('invalid input');

  //update the new values for region and name
  try {
    db.execute('INSERT INTO `user` VALUES(?, ?, ?, ?, ?)', [
      uid,
      email,
      name,
      region,
      photoURL,
    ]);
  } 
  catch (error) {
    return res.status(500).json('unable to save data');
  }

  //add the interests to the interests table
  for (const interest of interests) {
    try {
      db.execute(
        'INSERT INTO `user_interest` VALUES((SELECT `userID` FROM `user` WHERE `email` = ?), (SELECT `interestID` FROM `interest` WHERE `interestName` = ?))',
        [email, interest]
      );
    } catch (error) {
      res.status(500).json('unable to register');
    }
  }

  return res.status(200).json({ uid });
};

export default handleSaveProfile;
