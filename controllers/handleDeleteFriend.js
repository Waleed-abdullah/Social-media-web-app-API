const handleDeleteFriend = (req, res, db) => {
    let { userID, friendID } = req.body

    try {
        db.query('DELETE FROM `friend` WHERE `userID` = ? AND `friendID` = ?', [userID, friendID]);
        db.query('DELETE FROM `friend` WHERE `userID` = ? AND `friendID` = ?', [friendID, userID]);     
    }
    catch (error) {
        console.log(error)
        return res.status(500).json('unable to delete friend')
    }
}

export default handleDeleteFriend