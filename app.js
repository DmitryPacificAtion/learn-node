const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);
  const { url, method } = req;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body>');
    res.write('<h1>Hello kitty</h1>');
    res.write('<form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end(); // send request
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.write('<html>');
  res.write('<head>');
  res.write('<title>Hello me</title>');
  res.write('</head>');
  res.write('<body>');
  res.write('<h1>Bla bla</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end(); // send request
  // process.exit(); // to stop watcing mode
});

server.listen(3000);
