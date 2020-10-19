import express from "express";
import {watch} from "fs";
import { createConnection } from "typeorm";
import { createAppRouter } from "./createAppRouter";
import { Session } from "./entities/Session";
import { User } from "./entities/User";
import getReload from "reload";

const app = express();
getReload(app).then(reload=>{
  watch('./bundle',()=>{
    reload()
  })
});

app.use('/bundle', express.static("bundle"))
app.use('/', (req, res, next)=>{
  res.setHeader('Content-Type','text/html');
  res.send(`<html>
<head>
<script src="/bundle/vendor.js"></script>
<script src="/bundle/browser.js"></script>
<script src="/bundle/runtime.js"></script>
<script src="/reload/reload.js"></script>

</head>
<body>
<div id="app" />
</body>
</html>`)
})
app.use(createAppRouter());

if (module === require.main)
  (async () => {
    await Promise.all([
      // listen to server
      new Promise((resolve, reject) => {
        app.listen(8080, "0.0.0.0", () => {
          resolve();
        });
      }).catch((becauseServer) => {
        throw { becauseServer };
      }),
      // connect to dabase
      createConnection({
        type: "sqlite",
        name: "default",
        database: "db.sqlite3",
        synchronize: true,
        entities: [User, Session],
      }).catch((becauseConnection) => {
        throw { becauseConnection };
      }),
    ]).catch((error) => {
      console.error(error);
    });
  })();
