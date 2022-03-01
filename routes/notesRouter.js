const notes = require('express').Router();
const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.static('public'));
const path = require('path');
const { title } = require('process');

// const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) => {

  console.info(`\n${req.method} request received for notes\n`);


  var fileData = fs.readFileSync(path.resolve(__dirname, "../db/database.json"), {encoding:'utf8', flag:'r'}, (data) => console.log(data));
  // console.log(fileData);

  var getResponse = {
    status: 'success',
    text: fileData
  };

  console.info(getResponse);

  res.json(fileData);

  // // .then((data) => res.json(JSON.parse(data)));

  // res.json(data);

});

notes.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`\n${req.method} request received to submit note\n`);

  
    // Destructuring assignment for the items in req.body
    // const { email, feedbackType, feedback } = req.body;
  
    const body = req.body;
    console.log(body);

   
  
    // If all the required properties are present
    if (body) {
      // Variable for the object we will save
      var array = [];
      console.info('ABOUT TO PRINT THE ARRAY');
      array = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../db/database.json"), {encoding:'utf8', flag:'r'}, (data) => console.log(data)));
      console.log(array);

      
      var obj = {};
      
      const {title, text} = body;

      obj.title = body.title;
      obj.text = body.text;

      console.log(`going to print object`);
      console.log(obj);


      array.push({title , text});
      console.info('ABOUT TO PRINT THE ARRAY with next index');
      console.log(array);


      fs.writeFileSync((path.resolve(__dirname, "../db/database.json")), JSON.stringify(array, null, 4), (err) => {
        if (err){
          throw err;
        }
        else{
          console.log(`\nthe data was written to the file\n`);
        }
      });
  
      const response = {
        status: 'success',
        body: body
      };
        console.log('response is');
        console.info(response);

      res.json(response);


    } 
    else {
      res.json('Error in posting feedback, (no body)');
    }
  });

module.exports = notes;