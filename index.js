const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// web route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
const server = require("http").createServer(app);

const chromeLauncher = require("chrome-launcher");

chromeLauncher
  .launch({
    startingUrl: `http://${host}:${port}`,
  })
  .then((chrome) => {
    console.log(`Chrome debugging port running on ${chrome.port}`);
    chrome.process._handle.onexit = handleExit;

    process.on("beforeExit", (code) => {
      chrome.kill();
    });
    process.on("exit", (code) => {
      chrome.kill();
    });
    process.on("SIGTERM", (code) => {
      chrome.kill();
    });
  });

function handleExit() {
  process.exit();
}

server.listen(port, host, () => {
  console.log(`HOST`);
  console.log(`http://${host}:${port}`);
});
