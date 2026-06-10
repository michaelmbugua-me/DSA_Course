# Find ancestors of a given node in a binary tree

> Source: https://www.techiedelight.com/find-ancestors-of-given-node-binary-tree/

Given a binary tree, find all ancestors of a given node in it.

For example, consider the following binary tree:

The ancestor of node 9 are 7, 3 and 1 The ancestor of node 6 is 3 and 1 The ancestor of node 5 is 2 and 1 … …

> 

## Recursive Solution

The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and search for a given node in the tree. For any node, if the given node is found in either its left subtree or its right subtree, then the current node is an ancestor of it. The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to print all ancestors of a given node in a binary tree.
// The function returns true if the node is found in the subtree rooted at the
// given root node.
function printAncestors(root: TreeNode | null, node: TreeNode): boolean {

    // base case
    if (root === null) {
        return false;
    }

    // return true if a given node is found
    if (root === node) {
        return true;
    }

    // search node in the left subtree
    const left = printAncestors(root.left, node);

    // search node in the right subtree
    let right = false;
    if (!left) {
        right = printAncestors(root.right, node);
    }

    // if the given node is found in either left or right subtree,
    // the current node is an ancestor of a given node
    if (left || right) {
        process.stdout.write(`${root.val} `);
    }

    // return true if a node is found
    return left || right;
}

/* Construct the following tree
      1
    /   \
   /     \
  2       3
   \     / \
    4   5   6
       / \
      7   8
*/

const root = new TreeNode(1);
const left = new TreeNode(2);
const right = new TreeNode(3);
const rightLeft = new TreeNode(5);
const rightLeftLeft = new TreeNode(7);
root.left = left;
root.right = right;
left.right = new TreeNode(4);
right.left = rightLeft;
right.right = new TreeNode(6);
rightLeft.left = rightLeftLeft;
rightLeft.right = new TreeNode(8);

const node = rightLeftLeft;    // Node 7
printAncestors(root, node);
```

**Output:** 5 3 1

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

## Iterative Solution

The idea is to maintain a map to store the parent node of all nodes present in the tree. Then perform an [iterative preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree and set the parent pointer of each node. Finally, print ancestors of the given key by using a parent map.

Following is the implementation of the above approach in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Function to print root-to-leaf paths without using recursion
function printTopToBottomPath(parent: Map<TreeNode, TreeNode | null>, node: TreeNode | null | undefined): void {
    while (node) {
        process.stdout.write(`${node.val} `);
        node = parent.get(node);
    }
    console.log('');
}

// Iterative function to set parent nodes for all nodes of the binary tree
// in a given map. The function is similar to the iterative preorder traversal
function setParent(root: TreeNode, parent: Map<TreeNode, TreeNode | null>): void {

    // create an empty stack and push the root node
    const stack: TreeNode[] = [root];

    // loop till stack is empty
    while (stack.length) {

        // Pop the top item from the stack
        const curr = stack.pop();
        if (curr === undefined) {
            break;
        }

        // push its right child into the stack and set its parent on the map
        if (curr.right) {
            parent.set(curr.right, curr);
            stack.push(curr.right);
        }

        // push its left child into the stack and set its parent on the map
        if (curr.left) {
            parent.set(curr.left, curr);
            stack.push(curr.left);
        }
    }
}

// Iterative function to print all ancestors of a given node in a binary tree
function printAncestors(root: TreeNode | null, node: TreeNode): void {

    // base case
    if (root === null) {
        return;
    }

    // create an empty map to store parent pointers of binary tree nodes.
    // set the parent of the root node as null
    const parent = new Map<TreeNode, TreeNode | null>([[root, null]]);

    // set parent nodes for all nodes of the binary tree
    setParent(root, parent);

    // print ancestors of a given node using the parent map
    printTopToBottomPath(parent, parent.get(node));
}

/* Construct the following tree
        1
      /   \
     /     \
    2       3
     \     / \
      4   5   6
         / \
        7   8
*/

const root = new TreeNode(1);
const left = new TreeNode(2);
const right = new TreeNode(3);
const rightLeft = new TreeNode(5);
const rightLeftLeft = new TreeNode(7);
root.left = left;
root.right = right;
left.right = new TreeNode(4);
right.left = rightLeft;
right.right = new TreeNode(6);
rightLeft.left = rightLeftLeft;
rightLeft.right = new TreeNode(8);

const node = rightLeftLeft;    // Node 7
printAncestors(root, node);
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.
