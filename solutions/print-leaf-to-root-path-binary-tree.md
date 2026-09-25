# Iteratively print the leaf to root path for every leaf node in a binary tree

> Source: https://www.techiedelight.com/print-leaf-to-root-path-binary-tree/

Given a binary tree, write an iterative algorithm to print the leaf-to-root path for every leaf node. Use of recursion is prohibited.

For example, consider the following binary tree:

There are five leaf-to-root paths in the above binary tree:

4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

> 

Since use of recursion is not allowed, we can do [postorder iterative traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) of the tree and, while doing so, maintain a map that contains (child, parent) pair for every encountered node. Now, if a leaf node is encountered, we can easily print the leaf-to-root path using that map, as shown below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to check if a given node is a leaf node or not
function isLeaf(node: TreeNode): boolean {
    return node.left === null && node.right === null;
}

// Recursive function to print the root-to-leaf path for a given leaf
function printPathRecursive(curr: TreeNode | null, d: Map<TreeNode, TreeNode | null>): void {

    // base case: `curr` is the root node (parent of the root node is None)
    if (curr === null) {
        return;
    }

    // recursively call the parent node
    printPathRecursive(d.get(curr)!, d);
    process.stdout.write(curr.val + ' —> ');
}

// Iterative function to print the leaf-to-root path for a given leaf.
// For printing root-to-leaf path, we can use `printPathRecursive()` or a stack
function printPathIterative(leafNode: TreeNode, d: Map<TreeNode, TreeNode | null>): void {

    // start from the leaf node
    let curr: TreeNode = leafNode;

    // loop till the root node is reached and print each node in the path
    while (d.get(curr)! !== null) {
        process.stdout.write(curr.val + ' —> ');
        curr = d.get(curr)!;
    }

    console.log(curr.val);
}

// Iterative function to print the leaf-to-root path for every leaf node
function postorderIterative(root: TreeNode | null): void {

    // base case
    if (root === null) {
        return;
    }

    // create an empty stack
    const s: TreeNode[] = [];

    // create an empty dictionary to store (child, parent) pairs
    const d = new Map<TreeNode, TreeNode | null>();

    // parent of the root node is None
    d.set(root, null);

    // push the root node
    s.push(root);

    // loop till stack is empty
    while (s.length > 0) {

        // pop the top node from the stack
        const curr = s.pop()!;

        // if a leaf node is found, print the path
        if (isLeaf(curr)) {
            // print the leaf-to-root path for the current leaf
            printPathIterative(curr, d);
        }

        // print root-to-leaf path for the current leaf
        // printPathRecursive(curr, d)

        // Push the left and right child of the popped node into the stack.
        // Include the current node's left and right child in a dictionary
        if (curr.right) {
            s.push(curr.right);
            d.set(curr.right, curr);
        }

        if (curr.left) {
            s.push(curr.left);
            d.set(curr.left, curr);
        }
    }
}

/* Construct the following tree
            1
          /   \
         /     \
        /       \
       2         3
      / \       / \
     /   \     /   \
    4     5   6     7
             / \
            /   \
           8     9
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
root.right.left.left = new TreeNode(8);
root.right.left.right = new TreeNode(9);

postorderIterative(root);
```

**Output:** 4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of nodes in the binary tree. The program requires O(n) extra space for the map. Unless we maintain a parent pointer in each tree node, the problem seems very difficult to solve without using any additional extra space apart from the stack.

One workaround doesn’t involve maintaining a parent pointer or the use of any additional extra space. We can store the path from the root-to-leaf in a string as we traverse the tree iteratively and print the path whenever we encounter any leaf node.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to check if a given node is a leaf node or not
function isLeaf(node: TreeNode): boolean {
    return node.left === null && node.right === null;
}

function printLeafToRootPaths(root: TreeNode | null): void {

    // base case
    if (!root) {
        return;
    }

    // create an empty stack to store a pair of tree nodes and
    // its path from the root node
    const stack: [TreeNode, string][] = [];

    // push the root node
    stack.push([root, '']);

    // loop till stack is empty
    while (stack.length > 0) {

        // pop a node from the stack and push the data into the output stack
        const [curr, path] = stack.pop()!;

        // add the current node to the existing path
        const delim = path ? ' —> ' : '\n';
        const rootToNodePath = curr.val + delim + path;

        // print the path if a leaf node is reached
        if (isLeaf(curr)) {
            process.stdout.write(rootToNodePath);
        }

        // push the left and right child of the popped node into the stack.
        if (curr.right) {
            stack.push([curr.right, rootToNodePath]);
        }

        if (curr.left) {
            stack.push([curr.left, rootToNodePath]);
        }
    }
}

/* Construct the following tree
            1
          /   \
         /     \
        /       \
       2         3
      / \       / \
     /   \     /   \
    4     5   6     7
             / \
            /   \
           8     9
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
root.right.left.left = new TreeNode(8);
root.right.left.right = new TreeNode(9);

printLeafToRootPaths(root);
```

**Output:** 4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

**Exercise:**

1\. Write a [recursive implementation](https://techiedelight.com/print-all-paths-from-root-to-leaf-nodes-binary-tree/) of the above problem.

2\. Modify the solution to print the leaf-to-root path, having the sum of nodes equal to a given number.
