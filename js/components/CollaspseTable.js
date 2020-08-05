import CollapseTableItem from "./CollapseTableItem.js";

export default class ColapseTable {
  constructor(root, data) {
    this.rawData = data;
    this.items = null;
    this.root = root;

    this.data = this.prepareData(data);

    this.init();
  }

  init = () => {
    this.renderItems(this.data);
  };

  prepareData(data) {
    function recurTreeBuild(data, id = 0) {
      return data
        .filter((item) => item["parentId"] === id)
        .map((item) => {
          if (!item["children"]) {
            item["children"] = [];
          }
          item["children"] = recurTreeBuild(data, item.id);
          return item;
        });
    }

    let tree = recurTreeBuild(data);
    return tree;
  }

  renderItems = (data) => {
    this.items = BuildTable(data, this.root);

    function BuildTable(tree, node) {
      return tree.map((item) => {
        let insertedNode = new CollapseTableItem(node, item);
        if (item.children) {
          insertedNode.addChild(BuildTable(item.children, node));
        }
        return insertedNode;
      });
    }
  };

  filter = async (e) => {
    await this.items.map((item) => item.destroy());
    this.items = [];

    const param = e.target.getAttribute("name");
    const value = e.target.value;
    this.filteredData = this.rawData.filter((item) => {
      if (value === "any") return true;
      return "" + item[param] === value;
    });

    this.renderItems(this.prepareData(this.filteredData));
  };
}
