import { nav } from "./navi";
import { card } from "./card";

import { ipcRenderer, shell } from "electron";

const Parser = require("rss-parser");
const parser = new Parser();

const feeds = [];

var navUtil = new nav();
var cardUtil = new card();
var feedList = document.getElementById("feed-list");

ipcRenderer.on("feedList", (event, docs) => {
  docs.forEach((feed) => {
    console.log("feed:", feed);
    var childNode = navUtil.createNode(feed.title);
    childNode.onclick = async () => {
      var tbody = document.getElementById("feed-list-body");

      const items = await parser.parseURL(feed.url);
      items.items.forEach((item) => {
        // var cardItem = cardUtil.createCardElement(
        //   item.title,
        //   item.contentSnippet,
        //   item.link
        // );
        // feedList.appendChild(cardItem);

        var tr = document.createElement("tr");
        var title_td = document.createElement("td");
        title_td.innerText = item.title;
        title_td.onclick = () => {
          shell.openExternal(item.link);
        };
        var pubDate_td = document.createElement("td");
        pubDate_td.innerText = item.pubDate;
        var guid_td = document.createElement("td");
        guid_td.innerText = item.guid;
        tr.appendChild(title_td);
        tr.appendChild(pubDate_td);
        tr.appendChild(guid_td);
        tbody.appendChild(tr);
      });

      // ipcRenderer.send("loadFeed", { id: feed._id });
      // let navInput = document.getElementById("nav-input");
      // navInput.checked = !navInput.checked;
      // document.getElementById("active-feed").value = feed._id;
    };
    // var navUl = navUtil.getNavULElement();
    // navUl.appendChild(childNode);
    var sideMenu = document.getElementById("side-menu-ul");
    sideMenu.appendChild(childNode);

    document.getElementById("active-feed");
  });
});

ipcRenderer.on("loadFeed-reply", (event, arg) => {
  console.log("loadFeed-reply:", arg);

  list = document.getElementById("feed-list");

  li = document.createElement("li");
  li.value = "aaa";

  list.appendChild(li);
});

function init() {
  // let addContents = document.getElementById("addContents");
  // addContents.onclick = () => {
  //   console.log("aaaaaaaaaaaaaa");
  // };

  // let refresh = document.getElementById("refresh");
  // refresh.onclick = () => {
  //   let activefeed = document.getElementById("active-feed").value;

  //   if (activefeed) {
  //     ipcRenderer.send("reload", { id: activefeed });
  //   }
  // };

  ipcRenderer.send("loadComplete");
}

init();
