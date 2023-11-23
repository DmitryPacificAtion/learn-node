const main = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <h1>Enter a username</h1>
    <form action="/create-user" method="POST">
      <input type="text" name="username"/>
      <button type="submit">Create</button>
    </form>
  </body>
  </html>
`;

const renderUserpage = (userList) => {
  const users = userList.map((user) => `<li>${user}</li>`).join('');
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <h1>List of users</h1>
        <ul>${users}</ul>
      </body>
    </html>
  `;
};

const userList = [];

module.exports = {
  requestHandler: (req, res) => {
    if (req.url === '/users') {
      res.write(renderUserpage(userList));
      return res.end();
    }
    if (req.url === '/create-user' && req.method.toUpperCase() === 'POST') {
      const usernameBuffer = [];
      req.on('data', (chunk) => {
        usernameBuffer.push(chunk);
      });

      return req.on('end', () => {
        const newUser = Buffer.concat(usernameBuffer).toString().split('=')[1];
        userList.push(newUser);

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    }
    res.write(main);
    res.end();
  },
};
