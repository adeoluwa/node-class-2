const { createServer } = require('http');

const { createReadStream } = require('fs');

const sendFile = (res, status, type, file) => {
  res.writeHead(status, { 'Content-Type': type });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  switch (req.url) {
    case '/':
      return sendFile(res, 200, 'text/html', './home-page.html');
    case 'https://cdn.britannica.com/57/151657-131-A74A72C8/Camel-caravan-desert-sand-dunes-Sahara-North.jpg':
      return sendFile(
        res,
        200,
        'image/jpg',
        'https://cdn.britannica.com/57/151657-131-A74A72C8/Camel-caravan-desert-sand-dunes-Sahara-North.jpg'
      );

    case '/styles.css':
      return sendFile(res, 200, 'text/css', './styles.css');

    default:
      return sendFile(res, 404, 'text/html', './404.html');
  }
}).listen(3000);

console.log('web server at 3000');
