const { shell } = require("electron");

export class card {
  /**
   * Card形式のエレメントを作成する
   *
   * @param {string} title タイトル
   * @param {string} description 詳細・説明
   * @param {string} url
   * @memberof card
   */
  createCardElement(title, description, url) {
    var dl = document.createElement("dl");
    var dt = document.createElement("dt");
    var dd = document.createElement("dd");

    dt.textContent = title;
    dd.textContent = description;
    dl.appendChild(dt);
    dl.appendChild(dd);
    dl.className = "card";
    dl.onclick = () => {
      shell.openExternal(url);
      dl.parentNode.removeChild(dl);
    };

    return dl;
  }
}
