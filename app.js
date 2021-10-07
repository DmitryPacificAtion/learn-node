const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  const { url } = req;
  if (url === '/') {
    res.setHeader('Content-Type', 'type/html');
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body>');
    res.write('<h1>Hello kitty</h1>');
    res.write('<form action="/message" method="POST"><input type="text"/><button type="submit">Send</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end(); // send request
  }
  res.setHeader('Content-Type', 'type/html');
  res.write('<!DOCUMENT><html>');
  res.write('<head>');
  res.write('<title>Hello me</title>');
  res.write('</head>');
  res.write('<body>');
  res.write('<h1>Hello kitty</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end(); // send request
  // process.exit(); // to stop watcing mode
});

server.listen(3000);
