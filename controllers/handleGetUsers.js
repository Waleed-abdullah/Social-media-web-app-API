const handleGetUsers = (req, res, db) => {
    let search = req.params.search

    db.promise()
    .query(`SELECT DISTINCT userID, name, photoURL, region FROM user NATURAL JOIN user_interest NATURAL JOIN interest WHERE name LIKE '%${search}%' OR interestName LIKE '%${search}%' OR region LIKE '%${search}%'`, [search])
    .then((output) => {
        const [results, fields] = output
        return res.status(200).json({results})
    })
    .catch(() => {res.status(500)})
}

export default handleGetUsers