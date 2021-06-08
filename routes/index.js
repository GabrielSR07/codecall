var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { Mailer } = require('./controller/mailer');
const passport = require('passport');
const TaskModel = require('../models/task_model');


/* GET home page. */
router.get('/', async function(req, res, next) {
  
  var tasks = [];
  if(req.isAuthenticated()){
    tasks = await TaskModel.find({creator: req.user.email.trim()});
  }
  
  res.render('index', { title: 'Express', tasks: tasks });
});

router.get('/about', function(req, res, next){
   res.render('about', {title: "About Page"})
})


router.get('/contact', (req, res) => {
  res.render('contact', {title: "Contact Us"})
})

router.post('/contact', [
  body('name').not().isEmpty().withMessage("You must input your name"),
  body('email').isEmail().withMessage("Invalid or empty email"),
  body('message').not().isEmpty().withMessage("You must input a message"),
],
async (req, res) => {
    
  var errors = validationResult(req);
  if(!errors.isEmpty()){
    res.render('contact', {
      title: 'Contact me!',
      'name': req.body.name,
      'email': req.body.email,
      'message': req.body.message,
      'errorMessages': errors.array()
    })
  }
  else{

    try{
      await Mailer("demo.codecall@gmail.com", req.body.message);
      await Mailer(req.body.email, `Hi ${req.body.name}, \n Thanks for your message. \n\n I'll get back to you soon!`)
      res.render('thankyou', {title: "Thank you for contacting me!"})
    }
    catch(e){
      //res.render('contact', {title: 'Contact us'});
      res.render('error');
    }
  }
    
  
});

router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
 
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;
