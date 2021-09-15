const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
MongoClient.connect("mongodb://localhost:27017/expresstest", function (err, db) {
    if (err) throw err

    let database = db.db('expresstest')

    app.put('/userupdate/:id', function (req, res) {
        var query = {id: req.params.id.toString()}
        console.log(req.body)
        let newv = {$set: {name: req.body.name, email: req.body.email}}
        // var qu=(req.params.id).toString()
        database.collection('testtable').updateOne(query, newv, function (err, result) {
            if (err) throw err
            console.log(result)
            res.send(result)

        })
    })

    // let qu = {id:"13"}

    app.get('/user/:id', function (req, res) {
        var qu = {'id': req.params.id.toString()}
        // var qu=(req.params.id).toString()
        database.collection('testtable').find(qu).toArray(function (err, result) {
            if (err) throw err
            console.log(result)
            res.send(result)

        })

    })
    app.post('/adduser', function (req, res) {
        // var qu = {'id':req.params.id.toString()}
        let qu = {
            id: req.body.id.toString(),
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password
        }
        let id = {id: req.body.id.toString()}
        database.collection('testtable').find(id).toArray(function (err, result) {
            if (err) throw err
            console.log(result)
            if (result.length !== 0 ) {
                res.send("user Already exsists")
            } else {


                database.collection('testtable').insertOne(qu, function (err, result) {
                    if (err) throw err
                    console.log(result)
                    res.redirect('/user/' + req.body.id)

                })
            }

        })

    })
    app.get('/user', function (req, res) {
        // var qu = {'id':req.params.id.toString()}
        // var qu=(req.params.id).toString()
        database.collection('testtable').find().toArray(function (err, result) {
            if (err) throw err
            console.log(result)
            res.send(result)

        })

    })

    app.delete('/deleteuser/:id', function (req, res) {
        let qu = {id: req.params.id}
        database.collection('testtable').deleteOne(qu, function (err, result) {
            if (err) throw err
            res.send("user Deleted " + result)
        })
    })
    app.delete('/deleteusers/:id', function (req, res) {
        let qu = {id: req.params.id}
        database.collection('testtable').deleteMany(qu, function (err, result) {
            if (err) throw err
            res.send("user Deleted ").redirect("/user")
        })
    })


    app.listen(port, function () {
        console.log("app listen to the port http://127.0.0.1:" + port)
    })
//
//
})