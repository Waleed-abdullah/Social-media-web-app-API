const handleGetInterests = (req, res, db) => {
    let userID = req.params.id

    db.promise()
    .query(`SELECT interestName FROM user NATURAL JOIN user_interest NATURAL JOIN interest WHERE userID = ?`, [userID])
    .then((output) => {
        const [results, fields] = output
        const interests = results.map(r => r.interestName)
        return res.status(200).json({interests})
    })
    .catch(() => {res.status(500)})
}

export default handleGetInterests