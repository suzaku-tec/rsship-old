export class nav {
  getNavULElement() {
    var navUl = document.getElementById("nav-ul");
    return navUl;
  }

  createDirNode(title) {}

  createNode(title) {
    var childNode = document.createElement("li");
    childNode.textContent = title;
    return childNode;
  }
}
