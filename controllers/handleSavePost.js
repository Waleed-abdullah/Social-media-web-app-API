const handleSavePost = (req, res, db) => {
    const { userID, postText, postImage } = req.body
    try {
        db.query('INSERT INTO `post` (`userID`, `postText`, `postImage`) VALUES(?,?,?)', [
            userID,
            postText,
            postImage,
        ], (err, result) => {
            let postID = result.insertId

            db.promise()
            .query('SELECT `postTimestamp`, `postID` FROM  `post` WHERE postID = ?', [postID])
            .then((output) => {
                const [results, fields] = output
                const [result] = results
                console.log(result)
                return res.status(200).json({postID: result.postID, postTimestamp: result.postTimestamp})
            })
            .catch(() => res.status(500))
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json('unable to post')
    }
}

export default handleSavePost