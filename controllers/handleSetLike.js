const handleSetLike = (req, res, db) => {
    let {userID, postID} = req.body

    try {
        db.query('INSERT INTO `liked` (`userID`, `postID`) VALUES(?,?)', [
            userID,
            postID
        ], (err, result) => {
            return res.status(200).json()
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json('unable to like')
    }
}

export default handleSetLike