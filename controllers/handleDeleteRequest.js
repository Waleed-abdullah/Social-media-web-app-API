const handleDeleteRequest = (req, res, db) => {
    let { requestedTo, requestedBy} = req.body

    try {
        db.query('DELETE FROM `requests` WHERE `requestedTo` = ? AND `requestedBy` = ?', [
            requestedTo,
            requestedBy
        ], (err, result) => {
            return res.status(200).json()
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json('unable to delete request')
    }
}

export default handleDeleteRequest