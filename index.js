const app = require("./app");
const http = require("http");

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Fangraphs API has started on port ${PORT}`);
});
