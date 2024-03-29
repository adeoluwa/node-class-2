import express from 'express';

import skiTerms from './ski-terms.json' assert { type: 'json' };

import bodyParser from 'body-parser';

import fs from 'fs';

const app = express();

app.use('/', express.static('./client'));

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log(req.body);
  }
  next();
});

app.get('/dictionary', (req, res) => {
  res.json(skiTerms);
});

app.post('/dictionary', bodyParser.json(), (req, res) => {
  skiTerms.push(req.body);
  res.json({
    status: 'Success',
    term: req.body,
  });
});

app.delete('/dictionary/:term', (req, res) => {
  skiTerms.filter(({ term }) => term !== req.params.term);
  save();
  res.json({
    status: 'success',
    removed: req.params.term,
    newLength: skiTerms.length,
  });
});

const save = () => {
  fs.writeFile(
    './data/ski-terms.json',
    JSON.stringify(skiTerms, null, 2),
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
};

app.listen(3000, () => {
  console.log('ski dictionary running at 3000');
});
