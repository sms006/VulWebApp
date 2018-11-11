'use strict';
var express = require('express');
var router = express.Router();
var https = require('https')
var check = require('validator').check,
    sanitize = require('validator').sanitize

/* GET users listing. */
router.get('/', function (req, res) {

    var q = sanitize(req.query.q).xss(); // use a sanitization library and sanitizse the input
    var link= 'https://newsapi.org/v2/everything?q='+q+'&apiKey=86fc9c0271c644b48503f544b4569bda';
    var prodbody='';

    https.get(link, function(response){

      response.on('data', function (data) {

                 prodbody += data;
             });

             response.on('end', function () {

                   var prodobj = '';
                   var obj = JSON.parse(prodbody);
                   for (var i = 0; i < obj.articles.length; i++) {
                      prodobj+= obj.articles[i].url + '<br>';
                   }

                  res.write('<!DOCTYPE html><html lang="en"><body><p>Here are the results for<br><br>'+q+'<br><br>'+prodobj+'</p></body></html>');
                  res.end();   
             });
            });
          });
module.exports = router;
