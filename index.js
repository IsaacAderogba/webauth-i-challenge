const server = require("./api/server");

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
