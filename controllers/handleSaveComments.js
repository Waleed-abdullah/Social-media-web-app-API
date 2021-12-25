const handleSaveComments = (req, res, db) => {
    let { userID, postID, commentText} = req.body

    try {
        db.query('INSERT INTO `comment` (`userID`, `postID`, `commentText`) VALUES(?,?,?)', [
            userID,
            postID,
            commentText
        ], (err, result) => {
            let commentID = result.insertId
            db.promise()
            .query('SELECT `commentTimestamp`, `commentID` FROM comment WHERE commentID = ?', [commentID])
            .then((output) => {
                const [results, fields] = output
                const [result] = results
                return res.status(200).json({commentID: result.commentID, commentTimestamp: result.commentTimestamp})
            })
            .catch(() => res.status(500))            
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json('unable to comment')
    }
}

export default handleSaveComments