const handleDeleteLike = (req, res, db) => {
    let {userID, postID} = req.body
    console.log(req.body)

    try {
        db.query('DELETE FROM `liked` WHERE `userID` = ? AND `postID` = ?', [
            userID,
            postID
        ], (err, result) => {
            return res.status(200).json()
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json('unable to delete like')
    }
}

export default handleDeleteLike