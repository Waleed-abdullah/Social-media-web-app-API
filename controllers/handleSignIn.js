const handleSignIn = (req, res, db) => {
  const { uid, email } = req.body;
  //check for data from front - end
  if (!email || !uid) return res.status(400);

  //check if user exists, if not then route to save profile and save the user data
  db.promise()
    .query('SELECT * FROM `user` WHERE `email` = ?', [email])
    .then((output) => {
      const [results, fields] = output;
      const [user] = results;
      console.log(user);
      if (!user) {
        //respond with the user object
        console.log('User is null');
        return res.status(404).json({ user: null });
      } else {
        return res.status(200).json({ user });
      }
    })
    .catch(() => res.status(500));
};

export default handleSignIn;
