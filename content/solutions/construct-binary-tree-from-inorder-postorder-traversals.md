# Construct a binary tree from inorder and postorder traversals

> Source: https://www.techiedelight.com/construct-binary-tree-from-inorder-postorder-traversals/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient algorithm to construct a binary tree from the given [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) traversals.

For example,

**Input:** Inorder Traversal : { 4, 2, 1, 7, 5, 8, 3, 6 } Postorder Traversal : { 4, 2, 7, 8, 5, 6, 3, 1 } **Output:** Below binary tree

> 

The idea is to start with the root node, which would be the last item in the postorder sequence, and find the boundary of its left and right subtree in the inorder sequence. To find the boundary, search for the index of the root node in the inorder sequence. All keys before the root node in the inorder sequence become part of the left subtree, and all keys after the root node become part of the right subtree. Repeat this recursively for all nodes in the tree and construct the tree in the process.

To illustrate, consider the following inorder and postorder sequence:

Inorder : { 4, 2, 1, 7, 5, 8, 3, 6 } Postorder : { 4, 2, 7, 8, 5, 6, 3, 1 }

Root would be the last element in the postorder sequence, i.e., `1`. Next, locate the index of the root node in the inorder sequence. Now since `1` is the root node, all nodes before `1` in the inorder sequence must be included in the left subtree of the root node, i.e., `{4, 2}` and all the nodes after `1` must be included in the right subtree, i.e., `{7, 5, 8, 3, 6}`. Now the problem is reduced to building the left and right subtrees and linking them to the root node.

**Left subtree:** Inorder : {4, 2} Postorder : {4, 2} **Right subtree:** Inorder : {7, 5, 8, 3, 6} Postorder : {7, 8, 5, 6, 3}

The idea is to recursively follow the above approach until the complete tree is constructed. This is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class Node {
    key: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(key: number, left: Node | null = null, right: Node | null = null) {
        this.key = key;
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
    output.push(root.key);
    inorderTraversal(root.right, output);
}

// Recursive function to perform postorder traversal on a given binary tree
function postorderTraversal(root: Node | null, output: number[] = []): void {

    if (root === null) {
        return;
    }

    postorderTraversal(root.left, output);
    postorderTraversal(root.right, output);
    output.push(root.key);
}

// Recursive function to construct a binary tree from a given
// inorder and postorder traversals
function construct(start: number, end: number, postorder: number[], pIndex: number, d: Map<number, number>): [Node | null, number] {

    // base case
    if (start > end) {
        return [null, pIndex];
    }

    // Consider the next item from the end of a given postorder sequence.
    // This value would be the root node of a subtree formed by sequence
    // inorder[start, end].
    const root = new Node(postorder[pIndex]);
    pIndex = pIndex - 1;

    // search the current node index in inorder sequence to determine
    // the boundary of the left and right subtree of the current node
    const index = d.get(root.key)!;

    // recursively construct the right subtree
    [root.right, pIndex] = construct(index + 1, end, postorder, pIndex, d);

    // recursively construct the left subtree
    [root.left, pIndex] = construct(start, index - 1, postorder, pIndex, d);

    // return the root node
    return [root, pIndex];
}

// Construct a binary tree from inorder and postorder traversals.
// This function assumes that the input is valid, i.e., given
// inorder and postorder sequences forming a binary tree.
function constructTree(inorder: number[], postorder: number[]): Node | null {

    // get size
    const n = inorder.length;

    // dictionary is used to efficiently find the index of any element in
    // a given inorder sequence
    const d = new Map<number, number>();
    for (let i = 0; i < n; i++) {
        d.set(inorder[i], i);
    }

    // `pIndex` stores the index of the next unprocessed node from the end
    // of the postorder sequence
    let pIndex = n - 1;
    return construct(0, n - 1, postorder, pIndex, d)[0]!;
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
const postorder = [4, 2, 7, 8, 5, 6, 3, 1];

const root = constructTree(inorder, postorder);

// traverse the constructed tree
const output: number[] = [];
inorderTraversal(root, output);
console.log(`Inorder traversal is ${output.join(' ')}`);

const outputPost: number[] = [];
postorderTraversal(root, outputPost);
console.log(`Postorder traversal is ${outputPost.join(' ')}`);
```

**Output:** Inorder traversal is 4 2 1 7 5 8 3 6 Postorder traversal is 4 2 7 8 5 6 3 1

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(n) extra space for hashing and recursion.

Also See:

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

> [Find preorder traversal of a binary tree from its inorder and postorder sequence](https://www.techiedelight.com/find-preorder-traversal-binary-tree-from-inorder-postorder/ "Find preorder traversal of a binary tree from its inorder and postorder sequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 198

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
