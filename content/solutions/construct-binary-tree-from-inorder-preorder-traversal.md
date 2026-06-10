# Construct a binary tree from inorder and preorder traversal

> Source: https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient algorithm to construct a binary tree from the given [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) sequence.

For example,

**Input:** Inorder Traversal : { 4, 2, 1, 7, 5, 8, 3, 6 } Preorder Traversal: { 1, 2, 4, 3, 5, 7, 8, 6 } **Output:** Below binary tree

> 

The idea is to start with the root node, which would be the first item in the preorder sequence, and find the boundary of its left and right subtree in the inorder sequence. To find the boundary, search for the index of the root node in the inorder sequence. All keys before the root node in the inorder sequence become part of the left subtree, and all keys after the root node become part of the right subtree. Repeat this recursively for all nodes in the tree and construct the tree in the process.

To illustrate, consider the following inorder and preorder sequence:

Inorder : { 4, 2, 1, 7, 5, 8, 3, 6 } Preorder : { 1, 2, 4, 3, 5, 7, 8, 6 }

The root will be the first element in the preorder sequence, i.e., `1`. Next, locate the index of the root node in the inorder sequence. Since `1` is the root node, all nodes before `1` in the inorder sequence must be included in the left subtree, i.e., `{4, 2}` and all the nodes after `1` must be included in the right subtree, i.e., `{7, 5, 8, 3, 6}`. Now the problem is reduced to building the left and right subtrees and linking them to the root node.

**Left subtree:** Inorder : {4, 2} Preorder : {2, 4} **Right subtree:** Inorder : {7, 5, 8, 3, 6} Preorder : {3, 5, 7, 8, 6}

The idea is to recursively follow the above approach until the complete tree is constructed. This is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class Node {
    // Constructor
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to perform inorder traversal on a given binary tree
function inorderTraversal(root: Node | null, output: number[] = []): void {
    if (root === null) {
        return;
    }

    inorderTraversal(root.left, output);
    output.push(root.data);
    inorderTraversal(root.right, output);
}

// Recursive function to perform postorder traversal on a given binary tree
function preorderTraversal(root: Node | null, output: number[] = []): void {
    if (root === null) {
        return;
    }

    output.push(root.data);
    preorderTraversal(root.left, output);
    preorderTraversal(root.right, output);
}

// Recursive function to construct a binary tree from a given
// inorder and preorder sequence
function construct(start: number, end: number, preorder: number[], pIndex: number, d: Map<number, number>): [Node | null, number] {

    // base case
    if (start > end) {
        return [null, pIndex];
    }

    // The next element in `preorder[]` will be the root node of subtree
    // formed by sequence represented by `inorder[start, end]`
    const root = new Node(preorder[pIndex]);
    pIndex = pIndex + 1;

    // get the index of the root node in inorder to determine the
    // left and right subtree boundary
    const index = d.get(root.data)!;

    // recursively construct the left subtree
    [root.left, pIndex] = construct(start, index - 1, preorder, pIndex, d);

    // recursively construct the right subtree
    [root.right, pIndex] = construct(index + 1, end, preorder, pIndex, d);

    // return current node
    return [root, pIndex];
}

// Construct a binary tree from inorder and preorder traversals.
// This function assumes that the input is valid
// i.e., given inorder and preorder sequence forms a binary tree
function constructTree(inorder: number[], preorder: number[]): Node | null {

    // create a dictionary to efficiently find the index of any element in
    // a given inorder sequence
    const d = new Map<number, number>();
    for (let i = 0; i < inorder.length; i++) {
        d.set(inorder[i], i);
    }

    // `pIndex` stores the index of the next unprocessed node in a preorder sequence;
    // start with the root node (present at 0th index)
    let pIndex = 0;

    return construct(0, inorder.length - 1, preorder, pIndex, d)[0]!;
}

/* Construct the following tree
           1
         /   \
        /     \
       2       3
      /       / \
     /       /   \
    4       5     6
           / \
          /   \
         7     8
    */

const inorder = [4, 2, 1, 7, 5, 8, 3, 6];
const preorder = [1, 2, 4, 3, 5, 7, 8, 6];

const root = constructTree(inorder, preorder);

// traverse the constructed tree
const output: number[] = [];
inorderTraversal(root, output);
console.log(`The inorder traversal is ${output.join(' ')}`);

const outputPre: number[] = [];
preorderTraversal(root, outputPre);
console.log(`The preorder traversal is ${outputPre.join(' ')}`);
```

**Output:** The inorder traversal is 4 2 1 7 5 8 3 6 The preorder traversal is 1 2 4 3 5 7 8 6

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. It requires O(n) extra space for hashing and recursion.

Also See:

> [Find postorder traversal of a binary tree from its inorder and preorder sequence](https://www.techiedelight.com/find-postorder-traversal-binary-tree-from-inorder-preorder-sequence/ "Find postorder traversal of a binary tree from its inorder and preorder sequence")

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Find preorder traversal of a binary tree from its inorder and postorder sequence](https://www.techiedelight.com/find-preorder-traversal-binary-tree-from-inorder-postorder/ "Find preorder traversal of a binary tree from its inorder and postorder sequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.5/5. Vote count: 210

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
