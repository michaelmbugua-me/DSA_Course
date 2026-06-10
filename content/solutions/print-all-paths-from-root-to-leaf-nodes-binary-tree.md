# Print all paths from the root to leaf nodes of a binary tree

> Source: https://www.techiedelight.com/print-all-paths-from-root-to-leaf-nodes-binary-tree/

Given a binary tree, write an efficient algorithm to print all paths from the root node to every leaf node in it.

For example, consider the following binary tree:

The binary tree has four root-to-leaf paths: 1 —> 2 —> 4 1 —> 2 —> 5 1 —> 3 —> 6 —> 8 1 —> 3 —> 7 —> 9

> 

The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store every encountered node in the current path from the root-to-leaf in a vector. If we encounter a leaf node, print all nodes present in the vector. Following is a TypeScript implementation of the idea:

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

// Function to check if a given node is a leaf node or not
function isLeaf(node: TreeNode): boolean {
    return node.left === null && node.right === null;
}

// Recursive function to find paths from the root node to every leaf node
function printRootToLeafPaths(node: TreeNode | null, path: number[]): void {

    // base case
    if (node === null) {
        return;
    }

    // include the current node to the path
    path.push(node.val);

    // if a leaf node is found, print the path
    if (isLeaf(node)) {
        console.log([...path]);
    }

    // recur for the left and right subtree
    printRootToLeafPaths(node.left, path);
    printRootToLeafPaths(node.right, path);

    // backtrack: remove the current node after the left, and right subtree are done
    path.pop();
}

// The main function to print paths from the root node to every leaf node
function printRootToLeafPath(root: TreeNode | null): void {

    // list to store root-to-leaf path
    const path: number[] = [];
    printRootToLeafPaths(root, path);
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     / \     / \
    4   5   6   7
           /     \
          8       9
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
root.right.left.left = new TreeNode(8);
root.right.right.right = new TreeNode(9);

// print all root-to-leaf paths
printRootToLeafPath(root);
```

**Output:** 1 2 4 1 2 5 1 3 6 8 1 3 7 9

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

The problem seems a bit difficult to solve without recursion. There is one workaround where we store the path from the root-to-leaf in a string as we traverse the tree iteratively and print the path whenever we encounter any leaf node. This is demonstrated below in TypeScript:

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

function printRootToLeafPathIterative(root: TreeNode | null): void {

    // base case
    if (root === null) {
        return;
    }

    // create an empty stack to store a pair of tree nodes and
    // its path from the root node
    const stack: [TreeNode, string][] = [];

    // push the root node
    stack.push([root, ""]);

    // loop till stack is empty
    while (stack.length > 0) {

        // pop a node from the stack and push the data into the output stack
        const entry = stack.pop();
        if (entry === undefined) {
            break;
        }
        const [curr, prev] = entry;

        // add the current node to the existing path
        const path = prev + (prev ? " —> " : "\n") + curr.val;

        // print the path if the node is a leaf
        if (curr.left === null && curr.right === null) {
            process.stdout.write(path);
        }

        // push the left and right child of the popped node into the stack
        if (curr.right) {
            stack.push([curr.right, path]);
        }

        if (curr.left) {
            stack.push([curr.left, path]);
        }
    }
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     / \     / \
    4   5   6   7
           /     \
          8       9
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
root.right.left.left = new TreeNode(8);
root.right.right.right = new TreeNode(9);

printRootToLeafPathIterative(root);
```

**Output:** 1 —> 2 —> 4 1 —> 2 —> 5 1 —> 3 —> 6 —> 8 1 —> 3 —> 7 —> 9

**Exercise:**

1\. Write an iterative solution to the above problem.

2\. Modify the solution to print root-to-leaf paths having the sum of nodes equal to a given number.
