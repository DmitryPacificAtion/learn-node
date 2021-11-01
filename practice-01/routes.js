const main = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <h1>Hello world</h1>
    <form action="/create-user" method="POST">
      <input type="text" name="name"/>
      <button type="submit">Create</button>
    </form>
  </body>
  </html>
`;

const users = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <h1>Users</h1>
    <ul>
      <li>User1</li>
      <li>User2</li>
      <li>User3</li>
      <li>User4</li>
      <li>User5</li>
      <li>User6</li>
      <li>User7</li>
      <li>User8</li>
      <li>User9</li>
      <li>User10</li>
      <li>User11</li>
      <li>User12</li>
      <li>User13</li>
      <li>User14</li>
      <li>User15</li>
    </ul>
  </body>
  </html>
`;

module.exports = {
  requestHandler: (res, req) => {
    if (req.url === '/users') {
      req.write(users);
      req.end();
    }

    // if (req.url === '/create-user' && req.method.toUpperCase() === 'POST') {

    // }
    req.write(main);
    req.end();
  },
}
