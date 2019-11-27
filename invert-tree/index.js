const invert = function (tree) {
  if (tree === null) {
    return tree;
  }

  if (tree.left || tree.right) {
    var tempTree = tree.left;
    tree.left = tree.right;
    tree.right = tempTree;
  }

  if (tree.left) {
    invert(tree.left);
  }

  if (tree.right) {
    invert(tree.right);
  }
};

module.exports = function (root) {
  invert(root);
}
