const handleGetPosts = (req, res, db) => {
    const userID = req.params.id
    console.log(userID)

    if (!userID) return res.status(400)
    console.log('In handleGetPosts')

    db.promise()
    .query('SELECT `postID`, `postText`, `postImage`, `name`, `userID`, `photoURL`, `postTimestamp` FROM  `post` NATURAL JOIN `user` WHERE `userID` = ?', [userID])
    .then((output) => {
        const [results, fields] = output
        console.log(results)
        return res.status(200).json({results})
    })
    .catch(() => res.status(500))
}

export default handleGetPosts