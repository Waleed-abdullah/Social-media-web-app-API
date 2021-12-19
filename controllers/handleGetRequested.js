const handleGetRequested = (req, res, db) => {
    let {requestedBy, requestedTo} = req.query

    db.promise()
    .query('SELECT `requestedBy`, `requestedTo` FROM `requests` WHERE `requestedTo` = ? AND `requestedBy` = ?', [requestedTo, requestedBy])
    .then((output) => {
        const [results, fields] = output
        return res.status(200).json({results})
    })
    .catch(() => res.status(500))
}

export default handleGetRequested