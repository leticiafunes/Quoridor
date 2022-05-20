const client = require("../connection/connections");
let {
  connectError,
  connectOk

} = require("../controllers/controllers");

client.on("connectFailed", connectError);

client.on("connect", connectOk);








