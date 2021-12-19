const handleGetPosts = (req, res, db) => {
    const userID = req.params.id

    if (!userID) return res.status(400)

    db.promise()
    .query('SELECT `postID`, `postText`, `postImage`, `name`, `userID`, `photoURL`, `postTimestamp` FROM  `post` NATURAL JOIN `user` WHERE `userID` = ?', [userID])
    .then((output) => {
        const [results, fields] = output
        results.sort((a,b) => {
           return b.postTimestamp - a.postTimestamp
        })
        return res.status(200).json({results})
    })
    .catch(() => res.status(500))
}

export default handleGetPosts