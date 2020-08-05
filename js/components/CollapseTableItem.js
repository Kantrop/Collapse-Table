export default class CollapseTableItem {
  constructor(root, data) {
    this.template = document.querySelector(".table-row");
    this.root = root;
    this.data = data;
    this.children = [];

    this.node = this.create();
    this.addEvents();
  }

  create = () => {
    let itemEntries = Object.entries(this.data);
    let newRow = this.template.content.cloneNode(true);
    let root = newRow.querySelector("tr");

    itemEntries.map((item) => {
      if (item[0] === "parentId" && item[1]) {
        root.classList.add("child");
      }
      if (item[0] === "children") {
        if (item[1].length) root.classList.add("parent");
        return null;
      }
      newRow.querySelector(`.item-${item[0]}`).innerHTML = "" + item[1];
    });

    let node = Array.prototype.slice.call(newRow.childNodes)[0];
    this.root.appendChild(newRow);
    return node;
  };

  addChild = (items) => {
    items.map((child) => {
      this.children.push(child);
    });
  };

  addEvents = () => {
    this.node.addEventListener("click", this.handleClick);
  };

  handleClick = (e) => {
    if (!this.children.length) return;

    if (this.node.classList.contains("open")) {
      this.children.map(this.close);
      this.node.classList.remove("open");
    } else {
      this.node.classList.add("open");
      this.children.map((child) => {
        child.node.classList.add("visible");
      });
    }
  };

  close = (item) => {
    item.node.classList.remove("visible", "open");
    item.children.map(this.close);
  };

  destroy = () => {
    this.node.removeEventListener("click", this.handleClick);
    this.node.remove();
    this.children.map((child) => child.destroy());
  };
}
