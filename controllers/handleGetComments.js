const handleGetComments = (req, res, db) => {
    const postID = req.params.id
    
    if (!postID) return res.status(400)

    db.promise()
    .query('SELECT `commentTimestamp`, `commentID`, `userID`, `commentText`, `postID`, `name`, `photoURL` FROM comment NATURAL JOIN user where postID = ?', [postID])
    .then((output) => {
        const [results, fields] = output
        results.sort((a,b) => {
            return b.commentID - a.commentID
        })
        return res.status(200).json({results})
    })
    .catch(() => res.status(500))
}

export default handleGetComments
