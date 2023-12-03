const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

  const app = express();
  const server = createServer(app);


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// let name = localStorage.getItem("name");
// const { availableParallelism } = require('node:os');
// const cluster = require('node:cluster');
// const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');

// if (cluster.isPrimary) {
//   const numCPUs = availableParallelism();
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork({
//       PORT: 3000 + i
//     });
//   }

//   return setupPrimary();
// }

app.get('/', (req, res) => {
  res.render("chatUser");
});


async function main() {
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT,
      name TEXT,
      time TEXT,
      spam INTEGER DEFAULT 0
    );
  `);


  const io = new Server(server, {
    connectionStateRecovery: {},
    // adapter: createAdapter()
  });

  app.use(bodyParser.urlencoded({ extended: true })); 
  
  // var name = "";
  // app.post('/chat', (req, res) => {
  //   name = req.body.fname;
  //   console.log(name);
  //   res.redirect('/chat');
  // });
var name;

  app.post('/chat', (req, res) => {
    var body = req.body;  name = body.fname;console.log(name);
    res.redirect('/chat/'+name);
    // res.render('index');
  });

  app.get('/chat/'+name, (req, res) => {
    res.render('chat');
  });

  app.use((req, res) => {
    res.render('chat');
  });


 
  io.on('connection', async (socket) => {
    socket.on('chat message', async (msg, user, time, clientOffset, callback) => {
      let result;
      try {
        result = await db.run('INSERT INTO messages (content, client_offset, name, time) VALUES (?, ?, ?, ?)', msg, clientOffset, user, time);
      } catch (e) {
        if (e.errno === 19 /* SQLITE_CONSTRAINT */ ) {
          callback();
        } else {
          // nothing to do, just let the client retry
        }
        return;
      }
      io.emit('chat message', msg, user,time, result.lastID);
      callback();
    });

    if (!socket.recovered) {
      try {
        await db.each('SELECT id, content FROM messages WHERE id > ?',
          [socket.handshake.auth.serverOffset || 0],
          (_err, row) => {
            socket.emit('chat message', row.content, row.name, row.time, row.id);
          }
        )
      } catch (e) {
        // something went wrong
      }
    }
  });

  // const port = process.env.PORT;
const port = 8080;
  server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
}

main();