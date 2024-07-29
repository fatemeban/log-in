const express = require('express');
const app = express();
const MiniSearch = require('minisearch')
const mysql=require("mysql");
const bodyparser =require('body-parser');
var request = require('request');
const con=mysql.createConnection({
    host: 'localhost',
    user: 'pezotom_database',
    password: 'r5U4nlR1s',
    database: 'pezotom_database'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});



const server = app.listen(35654 ,()=>{
    console.log('server is started on');
});


app.use(bodyparser.urlencoded({extended : false}));

app.use(bodyparser.json({type : 'application/json'}));




app.get('/search',(req , res)=> {
    if (req.query.text != null)
    {
        con.query('SELECT * FROM products', (err,rows) => {
            if(err) throw err;
            console.log('Data received from Db:');
            name = rows
            var text = req.query.text;

            let miniSearch = new MiniSearch({
                fields: ['title', 'description'], // fields to index for full-text search
                storeFields: ['id','title', 'description'] // fields to return with search results
            })



            // Index all documents
            miniSearch.addAll(rows)

            // Search with default options
            let results = miniSearch.search(text, { fuzzy: 0,boost: { name: 1.5 } })
            res.json(results);
        });

    }
    else
    {
        res.json('empty');
    }

})

app.get('/sendsms/requestproduct',(req , res)=> {
    console.log('test')
    console.log(req.query.number)
    var numbersend =req.query.number;
    var namesend =req.query.name;
    res.status(200).json('ok')
    if (numbersend != null)
    {
        const sUrl = 'https://api.kavenegar.com/v1/634E2F616E704968663855714B752B31636758586944637866544C384B4264485855786F62506830644D413D/verify/lookup.json';

        request.post(
            sUrl, {
                form: {
                    receptor: numbersend,
                    token : numbersend,
                    template : 'arequest'

                },
            },
            (err, res, body) => {
                if (err) {
                    console.log('ERROR WHEN CALLING SMS API', err);
                }

            }
        )
        request.post(
            sUrl, {
                form: {
                    receptor: '09174099467',
                    token : numbersend,
                    token20 :namesend ,
                    template : 'aadminrequest'

                },
            },
            (err, res, body) => {
                if (err) {
                    console.log('ERROR WHEN CALLING SMS API', err);
                }

            }
        )
        // request.post(
        //     sUrl, {
        //         form: {
        //             receptor: '09306976036',
        //             token : numbersend,
        //             token20 :namesend ,
        //             template : 'aadminrequest'
        //
        //         },
        //     },
        //     (err, res, body) => {
        //         if (err) {
        //             console.log('ERROR WHEN CALLING SMS API', err);
        //         }
        //
        //     }
        // )


        res.status(200).json('ok')


    }
    else
    {
        res.json('empty');
    }

})