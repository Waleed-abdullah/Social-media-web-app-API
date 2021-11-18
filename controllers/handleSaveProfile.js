const handleSaveProfile = (req, res, db) => {
  const { name, email, region, interests } = req.body;

  //check for invalid input
  if (!name || !region || !interests) return res.status(400);

  //update the new values for region and name
  db.execute('UPDATE `user` SET `name` = ?, `region` = ? WHERE `email` = ?', [
    name,
    region,
    email,
  ]);

  //add the interests to the interests table
  for (const interest of interests) {
    db.execute(
      'INSERT INTO `user_interset` VALUES((SELECT `userID` FROM `user` WHERE `email` = ?), (SELECT `interestID` FROM `interest` WHERE `interestName` = ?))',
      [email, interest]
    );
  }

  return res.status(200).json({ setRoute: 'Homepage' });
};

export default handleSaveProfile;
