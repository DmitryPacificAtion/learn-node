const fs = require('fs');

export const requestHendler = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  const { url, method } = req;
  if (url === '/') {
    res.write(`
      <html>
        <head><title>Enter message</title></head>
        <body>
          <h1>Hello kitty</h1>
          <form action="/message" method="POST">
            <input type="text" name="message"/>
            <button type="submit">Send</button>
          </form>
        </body>
      </html>
    `);
    return res.end(); // send request
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      fs.writeFile('message.txt', message, (err) => {
        if(err) {
          throw Error(err);
        }

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.write(`
    <html>
      <head><title>Hello me</title></head>
      <body><h1>Bla bla</h1></body>
    </html>
  `);
  res.end(); // send request
  // process.exit(); // to stop watcing mode
}