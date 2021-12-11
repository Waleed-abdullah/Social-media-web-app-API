const handleSaveComments = (req, res, db) => {
    let { userID, postID, commentText} = req.body
    console.log('In save')

    try {
        db.query('INSERT INTO `comment` (`userID`, `postID`, `commentText`) VALUES(?,?,?)', [
            userID,
            postID,
            commentText
        ], (err, result) => {
            console.log(result)
            return res.status(200).json({postID: result.insertID})
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json('unable to comment')
    }
}

export default handleSaveComments