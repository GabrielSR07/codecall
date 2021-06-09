
'use strict';

module.exports = {
    'env': 'dev',
    url: {
        //'prod': 'https://code-call.herokuapp.com/',
        'prod': 'http://localhost:3000',
        'dev': 'http://localhost:3000'
    },
    db: {
        'prod': process.env.DB_CONN,
        'dev': 'mongodb://localhost/codecall'
        //'dev': 'mongodb+srv://admin:pass1234@cluster0.se27h.mongodb.net/Codecall?retryWrites=true&w=majority'
    },
    mailer: {
        service: 'Gmail',
        host: "smtp.gmail.com",
        port: 25,
        //secure: true, // true for 465, false for other ports
        auth: {
            user: "demo.codecall@gmail.com", // user email.
           // pass: process.env.EMAIL_PASSWORD, // user password
            pass: 'codecall123'
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    dbConnstring: 'mongodb://127.0.0.1:27017/codecall',
   //dbConnstring: 'mongodb+srv://admin:pass1234@cluster0.se27h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    'sessionKey': 'HelloCodeCall',
}  


/*
'use strict'

module.exports = {
    mailer: {
        service: 'Gmail',
        host:'smtp.gmail.com',
        port: 25,
        auth: {
            user: 'demo.codecall@gmail.com',
            pass: 'codecall123'
        }
        /*tls: {
            rejectUnauthorized: false
        }

    }
    ,
        dbConnstring: 'mongodb://127.0.0.1:27017/codecall',
        sessionKey: 'HaloCodeCall'
}

*/