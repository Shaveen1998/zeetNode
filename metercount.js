const express = require('express');
const snowflake = require('snowflake-sdk');

const connection = snowflake.createConnection({ 
  account: 'ND64012.ap-south-1.aws',
  username: 'FYP',
  password: '$Tarwars123',
  database: 'COAPDATA',
  schema: 'PUBLIC',
  warehouse: 'COMPUTE_WH',
});

const app = express();
const port = 3000;

connection.connect((err, conn) => {
  if (err) {
    console.error('Unable to connect: ', err.message);
  } else {
    console.log('Connected to Snowflake!');
    app.get('/api/count', (req, res) => {
      connection.execute({
        sqlText: 'SELECT COUNT(DISTINCT id) AS count FROM my_table',
        complete: (err, stmt, rows) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
          }
          const count = rows[0].COUNT;
          res.json({ count });
        },
      });
    });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});