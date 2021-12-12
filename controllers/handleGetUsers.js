const handleGetUsers = (req, res, db) => {
    let search = req.params.search
    console.log(search)
    console.log('In search')    

    db.promise()
    .query(`SELECT name FROM user WHERE name LIKE '%${search}%'`, [search])
    .then((output) => {
        const [results, fields] = output
        console.log(output)
        console.log(results)
        return res.status(200).json({results})
    })
    .catch(() => {res.status(500)})
}

export default handleGetUsers