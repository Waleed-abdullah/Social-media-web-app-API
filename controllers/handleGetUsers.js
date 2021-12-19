const handleGetUsers = (req, res, db) => {
    let search = req.params.search

    db.promise()
    .query(`SELECT name, userID, photoURL, region FROM user WHERE name LIKE '%${search}%'`, [search])
    .then((output) => {
        const [results, fields] = output
        return res.status(200).json({results})
    })
    .catch(() => {res.status(500)})
}

export default handleGetUsers