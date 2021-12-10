const handleSavePost = (req, res, db) => {
    const { userID, postText, postImage } = req.body
    try {
        db.query('INSERT INTO `post` (`userID`, `postText`, `postImage`) VALUES(?,?,?)', [
            userID,
            postText,
            postImage,
        ], (err, result) => {
            res.status(200).json({postID: result.insertId})
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json('unable to post')
    }
}

export default handleSavePost