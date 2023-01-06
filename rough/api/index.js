const { createServer } = require('http');

const data = require('./cat.json');

createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });
  if (req.url.toLowerCase() === '/biscuit') {
    let biscuit = data.filter((cat) => cat.name === 'Biscuit');
    res.end(JSON.stringify(biscuit));
  } else if (req.url.toLowerCase() === '/jungle') {
    let jungle = data.filter((cat) => cat.name === 'jungle');
    res.end(JSON.stringify(jungle));
  } else {
    res.end(JSON.stringify(data));
  }
}).listen(3000);
