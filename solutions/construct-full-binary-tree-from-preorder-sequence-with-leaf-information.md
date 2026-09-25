# Construct a full binary tree from the preorder sequence with leaf node information

> Source: https://www.techiedelight.com/construct-full-binary-tree-from-preorder-sequence-with-leaf-information/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient algorithm to construct a full binary tree from a sequence of keys representing [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and a boolean array that determines if the value at the corresponding index in the preorder sequence is a leaf node or an internal node. A full binary tree is a tree in which every node has either 0 or 2 children.

For example,

**Input:** Preorder traversal : { 1, 2, 4, 5, 3, 6, 8, 9, 7 } Boolean array : { 0, 0, 1, 1, 0, 0, 1, 1, 1 } (1 represents a leaf node, and 0 represents an internal node) **Output:** Below full binary tree

> 

The idea is first to construct the full binary tree’s root node using the first key in the preorder sequence and then using the given boolean array, check if the root node is an internal node or a leaf node. If the root node is an internal node, recursively construct its left and right subtrees.

To construct the complete full binary tree, recursively repeat the above steps with subsequent keys in the preorder sequence. Following is a TypeScript implementation of this approach:

```ts
// A class to store a binary tree node
class Node {
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
    }
}

// Function to print the preorder traversal on a given binary tree
function preorderTraversal(root: Node | null, output: number[] = []): void {
    if (root === null) {
        return;
    }

    output.push(root.data);
    preorderTraversal(root.left, output);
    preorderTraversal(root.right, output);
}

// Recursive function to construct a full binary tree from a given
// preorder sequence with extra information about leaf nodes
function construct(preorder: number[], isLeaf: number[], pIndex: number): [Node | null, number] {

    // base case
    if (pIndex === preorder.length) {
        return [null, pIndex];
    }

    // construct the current node, check if it is an internal node,
    // and increment `pIndex`
    const node = new Node(preorder[pIndex]);
    const isInternalNode = (isLeaf[pIndex] === 0);
    pIndex = pIndex + 1;

    // if the current node is an internal node, construct its 2 children
    if (isInternalNode) {
        [node.left, pIndex] = construct(preorder, isLeaf, pIndex);
        [node.right, pIndex] = construct(preorder, isLeaf, pIndex);
    }

    // return current node
    return [node, pIndex];
}

// Construct a full binary tree from the preorder sequence with leaf node information
function constructTree(preorder: number[], isLeaf: number[]): Node | null {

    // `pIndex` stores the index of the next unprocessed key in a preorder sequence;
    // start with the root node (at 0th index).
    const pIndex = 0;
    return construct(preorder, isLeaf, pIndex)[0];
}

/* Construct the following tree
           1
         /   \
        /     \
       2       3
      / \     / \
     /   \   /   \
    4     5 6     7
           / \
          /   \
         8     9
    */

const preorder = [1, 2, 4, 5, 3, 6, 8, 9, 7];
const isLeaf = [0, 0, 1, 1, 0, 0, 1, 1, 1];

// construct the tree
const root = constructTree(preorder, isLeaf);

// print the tree in a preorder fashion
const output: number[] = [];
preorderTraversal(root, output);
console.log(`Preorder traversal of the constructed tree is ${output.join(' ')}`);
```

**Output:** Preorder traversal of the constructed tree is 1 2 4 5 3 6 8 9 7

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

Also See:

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Find postorder traversal of a binary tree from its inorder and preorder sequence](https://www.techiedelight.com/find-postorder-traversal-binary-tree-from-inorder-preorder-sequence/ "Find postorder traversal of a binary tree from its inorder and preorder sequence")

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
