db.connect(db.MODE_PRODUCTION, function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1)
    } else {
        app.listen(3000, function() {
            console.log('Listening on port 3000... DB')
        })
    }
})