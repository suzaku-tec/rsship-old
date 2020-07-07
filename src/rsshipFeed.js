let Nedb = require("nedb");
const { doc } = require("prettier");
const fs = require("fs");

class RsshipFeed {
  feeds = [];

  /**
   * 初期化を行う
   * @param {Nedb} nedbFile
   */
  constructor(filepath) {
    this.nedbFile = new Nedb({
      filename: filepath,
      autoload: true,
    });
  }

  loadFeedList() {
    return new Promise((resolve, reject) => {
      console.log(this.nedbFile);
      this.nedbFile.find({}, (err, docs) => {
        if (err) {
          reject("load nedbfile error");
        }
        console.log(docs);
        resolve(docs);
      });
    });
  }

  loadFeedFiles(dir) {
    fs.readdir(dir, (err, files) => {
      if (err) throw err;
      console.log("files:", files);
      files.forEach((file) => {
        this.feeds[file] = new Nedb({
          filename: dir + "/" + file,
          autoload: true,
        });
      });
    });
  }

  getFeed(id) {
    feed = feeds[id];
    return new Promise((resolve, reject) => {
      feed.find({}, (err, docs) => {
        if (err) {
          reject(err);
        }

        resolve(docs);
      });
    });
  }
}

module.exports = RsshipFeed;
