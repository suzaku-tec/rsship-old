const RsshipFeed = require("../src/rsshipFeed");
let Nedb = require("nedb");

test("load feed list", async () => {
  let currentWorkingDirectory = process.cwd();
  let db = new RsshipFeed(
    new Nedb({
      filename: currentWorkingDirectory + "/test/test.db",
      autoload: true,
    })
  );

  let result = await db.loadFeedList();
  expect(result).toStrictEqual([
    {
      _id: "vlWvyfeeVhaszlxj",
      title: "test",
      url: "https://www.reddit.com/.rss",
    },
  ]);
});
