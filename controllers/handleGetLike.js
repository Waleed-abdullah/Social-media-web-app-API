const handleGetLike = (req, res, db) => {
    let {userID, postID} = req.query
    //console.log(userID, postID)

    db.promise()
    .query('SELECT `userID`, `postID` FROM `liked` WHERE `userID` = ? AND `postID` = ?', [userID, postID])
    .then((output) => {
        const [results, fields] = output
        return res.status(200).json({results})
    })
    .catch(() => res.status(500))
}

export default handleGetLike