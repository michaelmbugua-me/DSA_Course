# Find the size of the largest BST in a binary tree

> Source: https://www.techiedelight.com/find-size-largest-bst-in-binary-tree/

Given a binary tree, find the size of the largest BST (Binary Search Tree) in it.

The largest BST in the following binary tree is formed by the subtree rooted at node 15, having size 3:

> 

A simple solution is to traverse the binary tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and for each encountered node, check whether the subtree rooted at the node is a BST or not. If the subtree is a BST, calculate and return the subtree’s size rooted at the node. Otherwise, return the maximum size BST returned by the left and right subtrees.

Following is the TypeScript implementation of the idea:

```ts
// A class to store a BST node
class Node {
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to calculate the size of a given binary tree
function size(root: Node | null): number {

    // base case: empty tree has size 0
    if (root === null) {
        return 0;
    }

    // recursively calculate the size of the left and right subtrees and
    // return the sum of their sizes + 1 (for root node)
    return size(root.left) + 1 + size(root.right);
}

// Recursive function to determine if a given binary tree is a BST or not
// by keeping a valid range (starting from [-INFINITY, INFINITY]) and
// keep shrinking it down for each node as we go down recursively
function isBST(node: Node | null, min: number, max: number): boolean {

    // base case
    if (node === null) {
        return true;
    }

    // if the node's value falls outside the valid range
    if (node.data < min || node.data > max) {
        return false;
    }

    // recursively check left and right subtrees with updated range
    return isBST(node.left, min, node.data) && isBST(node.right, node.data, max);
}

// Recursive function to find the size of the largest BST in a given binary tree
function findLargestBST(root: Node | null): number {
    if (root === null) {
        return 0;
    }

    if (isBST(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)) {
        return size(root);
    }

    return Math.max(findLargestBST(root.left), findLargestBST(root.right));
}

/* Construct the following tree
          10
        /    \
       /      \
      15       8
     /  \     / \
    /    \   /   \
   12    20 5     2
*/

const root = new Node(10);

root.left = new Node(15);
root.right = new Node(8);

root.left.left = new Node(12);
root.left.right = new Node(20);

root.right.left = new Node(5);
root.right.right = new Node(2);

console.log('The size of the largest BST is', findLargestBST(root));
```

**Output:** The size of the largest BST is 3

The time complexity of this approach is O(n2), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack. We can improve time complexity to O(n) by traversing the tree in a bottom-up manner where information is exchanged between the child nodes and parent node, which helps determine if the subtree rooted under any node is a BST in constant time.

We know that a binary tree is a BST if the following properties hold for every tree node:

  1. The left and right subtrees of every tree node are BST.
  2. A node’s value should be more than the largest value in the left subtree and less than the smallest value in the right subtree.

To determine if a subtree rooted under a node is a BST or not, the left subtree should provide information about the maximum value in it. The right subtree should provide information about the minimum value in it. Also, the parent node should be notified when both left and right child are also BST.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a BST node
class Node {
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// A class to store information about a binary tree
class SubTreeInfo {
    min: number;
    max: number;
    size: number;
    isBST: boolean;
    constructor(min: number, max: number, size: number, isBST: boolean) {
        this.min = min;
        this.max = max;
        this.size = size;
        this.isBST = isBST;
    }
}

// Recursive function to find the size of the largest BST in a given binary tree
function findLargestBST(root: Node | null): SubTreeInfo {

    // Base case: empty tree
    if (root === null) {
        return new SubTreeInfo(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 0, true);
    }

    // Recur for the left and right subtrees
    const left = findLargestBST(root.left);
    const right = findLargestBST(root.right);

    // Check if a binary tree rooted under the current root is a BST

    // 1. Left and right subtree are also BST
    // 2. The value of the root node should be more than the largest value
    //    in the left subtree
    // 3. The value of the root node should be less than the smallest value
    //    in the right subtree
    if (left.isBST && right.isBST && (left.max < root.data && root.data < right.min)) {
        return new SubTreeInfo(Math.min(root.data, Math.min(left.min, right.min)),
                        Math.max(root.data, Math.max(left.max, right.max)),
                        left.size + 1 + right.size, true);
    } else {

        // If a binary tree rooted under the current root is not a BST,
        // return the largest BST size in its left and right subtree

        return new SubTreeInfo(0, 0, Math.max(left.size, right.size), false);
    }
}

/* Construct the following tree
              10
            /    \
           /      \
          15       8
         / \      / \
        /   \    /   \
       12   20  5     9
      / \      / \     \
     /   \    /   \     \
    2    14  4    7     10
*/

const root = new Node(10);

root.left = new Node(15);
root.right = new Node(8);

root.left.left = new Node(12);
root.left.right = new Node(20);
root.right.left = new Node(5);
root.right.right = new Node(9);

root.left.left.left = new Node(2);
root.left.left.right = new Node(14);
root.right.left.left = new Node(4);
root.right.left.right = new Node(7);

root.right.right.right = new Node(10);

console.log('The size of the largest BST is', findLargestBST(root).size);
```
