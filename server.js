const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//Getting a random quote
app.get('/api/quotes/random', (req, res, next)=>{
  const randomQuote = getRandomElement(quotes);
  res.send({quote: randomQuote});
});

//Getting all quotes or all quotes from a specific author
app.get('/api/quotes', (req, res, next) =>{

    if(req.query.person){
      const quoteResults = quotes.filter(author => {
      return author.person === req.query.person;
      });
      res.status(200).send({quotes: quoteResults});
    }else{
      res.status(401).send({quotes: quotes});
  }
});

//Adding new quotes
app.post('/api/quotes', (req,res,next) =>{
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person
  };
  if (newQuote.quote && newQuote.person){
    quotes.push(newQuote);
    res.status(201).send({quote: newQuote});
  }else{
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});