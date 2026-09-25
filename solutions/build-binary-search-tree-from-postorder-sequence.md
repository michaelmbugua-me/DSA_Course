# Build a Binary Search Tree from a postorder sequence

> Source: https://www.techiedelight.com/build-binary-search-tree-from-postorder-sequence/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a distinct sequence of keys representing the [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) of a binary search tree, construct a BST from it.

For example, the following BST should be constructed for postorder traversal `{8, 12, 10, 16, 25, 20, 15}`:

> 

We can easily build a BST for a given postorder sequence by recursively repeating the following steps for all keys in it, starting from the right.

  1. Construct the root node of BST, which would be the last key in the postorder sequence.
  2. Find index `i` of the last key in the postorder sequence, which is smaller than the root node.
  3. Recur for right subtree with keys in the postorder sequence that appears after the `i'th` index (excluding the last index).
  4. Recur for left subtree with keys in the postorder sequence that appears before the `i'th` index (including `i'th` index).

Let’s consider the postorder traversal `{8, 12, 10, 16, 25, 20, 15}` to make the context more clear.

  1. The last item in the postorder sequence `15` becomes the root node.
  2. Since `10` is the last key in the postorder sequence, which smaller than the root node, the left subtree consists of keys `{8, 12, 10}` and the right subtree consists of keys `{16, 25, 20}`.
  3. To construct the complete binary search tree, recursively repeat the above steps for postorder sequence `{8, 12, 10}` and `{16, 25, 20}`.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    key: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(key: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to perform inorder traversal on a given binary tree
let output: string = '';
const inorder = (root: TreeNode | null): void => {

    if (root === null) {
        return;
    }

    inorder(root.left);
    output += `${root.key} `;
    inorder(root.right);
};

// Recursive function to build a binary search tree from
// its postorder sequence
const constructBST = (postorder: number[], start: number, end: number): TreeNode | null => {

    // base case
    if (start > end) {
        return null;
    }

    // Construct the root node of the subtree formed by keys of the
    // postorder sequence in range `[start, end]`
    const node = new TreeNode(postorder[end]);

    // search the index of the last element in the current range of postorder
    // sequence, which is smaller than the root node's value
    let i = end;
    while (i >= start) {
        if (postorder[i] < node.key) {
            break;
        }
        i--;
    }

    // Build the right subtree before the left subtree since the values are
    // being read from the end of the postorder sequence.

    // recursively construct the right subtree
    node.right = constructBST(postorder, i + 1, end - 1);

    // recursively construct the left subtree
    node.left = constructBST(postorder, start, i);

    // return current node
    return node;
};

/* Construct the following BST
          15
        /    \
       /      \
      10       20
     /  \     /  \
    /    \   /    \
   8     12 16    25
*/

const postorder = [8, 12, 10, 16, 25, 20, 15];

// construct the BST
const root = constructBST(postorder, 0, postorder.length - 1);

// print the BST
process.stdout.write('Inorder traversal of BST is ');

// inorder on the BST always returns a sorted sequence
inorder(root);
console.log(output);
```

**Output:** Inorder traversal of BST is 8 10 12 15 16 20 25

The time complexity of the above solution is O(n2), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack. We can reduce the time complexity to O(n) by following a different approach that doesn’t involve searching for an index that separates the left and right subtree keys in a postorder sequence.

We know that each node has a key that is greater than all keys present in its left subtree and less than the keys present in the right subtree in the BST. The idea to pass the information regarding the valid range of keys for the current root node and its children in the recursion itself.

We start by setting the range as `[-INFINITY, INFINITY]` for the root node. It means that the root node and any of its children can have keys ranging between `-INFINITY` and `INFINITY`. Like the previous approach, construct BST’s root node from the last item in the postorder sequence. Suppose the root node has value `x`, recur for the right subtree with range `(x, INFINITY)` and recur for the left subtree with range `[-INFINITY, x)`. To construct the complete binary search tree, recursively set the range for each recursive call and return if the next element of the postorder traversal is out of the valid range.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    data: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

let output: string = '';

// Function to print the inorder traversal on a given binary tree
const inorder = (root: TreeNode | null): void => {

    if (root === null) {
        return;
    }

    inorder(root.left);
    output += `${root.data} `;
    inorder(root.right);
};

// Recursive function to build a binary search tree from
// its postorder sequence
const buildBST = (postorder: number[], pIndex: number, min: number, max: number): [TreeNode | null, number] => {

    // Base case
    if (pIndex < 0) {
        return [null, pIndex];
    }

    // Return if the next element of postorder traversal from the end
    // is not in the valid range
    const curr = postorder[pIndex];
    if (curr < min || curr > max) {
        return [null, pIndex];
    }

    // Construct the root node and decrement `pIndex`
    const root = new TreeNode(curr);
    pIndex--;

    /* Construct the left and right subtree of the root node.
       Build the right subtree before the left subtree since the values
       are being read from the end of the postorder sequence. */

    // Since all elements in the right subtree of a BST must be greater
    // than the root node's value, set range as `[curr+1…max]` and recur
    [root.right, pIndex] = buildBST(postorder, pIndex, curr + 1, max);

    // Since all elements in the left subtree of a BST must be less
    // than the root node's value, set range as `[min, curr-1]` and recur
    [root.left, pIndex] = buildBST(postorder, pIndex, min, curr - 1);

    return [root, pIndex];
};

// Build a binary search tree from its postorder sequence
const buildTree = (postorder: number[]): TreeNode | null => {

    // start from the root node (last element in postorder sequence)
    const postIndex = postorder.length - 1;

    // set the root node's range as [-INFINITY, INFINITY] and recur
    return buildBST(postorder, postIndex, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)[0];
};

/* Construct the following BST
          15
        /    \
       /      \
      10       20
     /  \     /  \
    /    \   /    \
   8     12 16    25
*/

// postorder traversal of BST
const postorder = [8, 12, 10, 16, 25, 20, 15];

// construct the BST
const root = buildTree(postorder);

// print the BST
process.stdout.write('Inorder traversal of BST is ');

// inorder on the BST always returns a sorted sequence
inorder(root);
console.log(output);
```
