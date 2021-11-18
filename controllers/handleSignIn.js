const handleSignIn = (req, res, db) => {
  const { uid, name, email, region } = req.body;

  //check for data from front - end
  if (!email || !uid) return res.status(400);

  //check if user exists, if not then route to save profile and save the user data
  db.promise()
    .query('SELECT * FROM `user` WHERE `email` = ?', [email])
    .then((output) => {
      const [results, fields] = output;
      const [user] = results;
      if (!user) {
        db.execute('INSERT INTO `user` VALUES(?, ?, ?, ?)', [
          uid,
          email,
          name,
          region,
        ]);
        return res.status(404).json({ route: 'saveProfile' });
      } else {
        return res.status(200).json({ route: 'homepage' });
      }
    })
    .catch(() => res.status(500));
};

export default handleSignIn;
