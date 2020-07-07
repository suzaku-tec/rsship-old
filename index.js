"use strict";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const Parser = require("rss-parser");
const parser = new Parser();

const RsshipFeed = require("./src/rsshipFeed");

let mainWindow;

// 画面準備
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// 終了時
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainWindow = new BrowserWindow({
      width: 400,
      height: 300,
    });
  }
});

let currentWorkingDirectory = process.cwd();
console.log(currentWorkingDirectory);
// let Datastore = require("nedb");
// var db = {};
// db.rsship = new Datastore({
//   filename: currentWorkingDirectory + "/rsship.db",
//   autoload: true,
// });

let rsshipFeed = new RsshipFeed(currentWorkingDirectory + "/rsship.db");

ipcMain.on("loadComplete", (event, arg) => {
  // フィード一覧を渡す
  // db.rsship.find({}, (err, docs) => {
  //   console.log("docs:", docs);
  //   event.sender.send("feedList", docs);
  // });

  rsshipFeed.loadFeedList().then((list) => {
    console.log("docs:", list);
    event.sender.send("feedList", list);
  });
});

ipcMain.on("loadFeed", (event, arg) => {
  // db[arg.id + ".db"].find({}, (err, feeds) => {
  //   if (err) throw err;
  //   event.sender.send("loadFeed-reply", feeds);
  // });

  rsshipFeed.getFeed(arg.id).then((result) => {
    event.sender.send("loadFeed-reply", result);
  });
});

ipcMain.on("reload", (event, arg) => {
  console.log("reload");
  db.rsship.find({ _id: arg.id }, async (err, item) => {
    if (err) throw err;

    if (item.length != 1) return;

    let url = item[0].url;
    const feeds = await parser.parseURL(url);
    console.log("count:", feeds.items.length);

    feeds.items.forEach((feed) => {
      db[arg.id + ".db"].find({ id: { $ne: feed.id } }, (err, docs) => {
        console.log("feed:", feed.id);
        feed.isread = false;
        db[arg.id + ".db"].insert(feed);
      });
    });
  });
});

rsshipFeed.loadFeedFiles(currentWorkingDirectory + "/feed");

// fs.readdir(currentWorkingDirectory + "/feed", (err, files) => {
//   if (err) throw err;
//   console.log("files:", files);
//   files.forEach((file) => {
//     db[file] = new Datastore({
//       filename: currentWorkingDirectory + "/feed/" + file,
//     });
//     db[file].loadDatabase();
//   });
// });

// function getURL(id) {
//   db.rsship.find({ _id: id }, (err, docs) => {
//     if (err) throw err;

//     return docs == null ? null : docs.url;
//   });
// }
