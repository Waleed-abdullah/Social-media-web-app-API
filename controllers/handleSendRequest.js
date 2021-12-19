const handleSendRequest = (req, res, db) => {
    let { requestedTo, requestedBy} = req.body

    try {
        db.query('INSERT INTO `requests` (`requestedTo`, `requestedBy`) VALUES(?,?)', [
            requestedTo,
            requestedBy,
        ], (err, result) => {
            return res.status(200).json()
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json('unable to request')
    }
}

export default handleSendRequest