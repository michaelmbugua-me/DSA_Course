# Construct a binary tree from inorder and level order sequence

> Source: https://www.techiedelight.com/construct-binary-tree-from-inorder-level-order-traversals/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient algorithm to construct a binary tree from the given [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [level order](https://techiedelight.com/level-order-traversal-binary-tree/) sequence.

For example,

**Input:** Inorder Traversal : { 4, 2, 5, 1, 6, 3, 7 } level order traversal : { 1, 2, 3, 4, 5, 6, 7 } **Output:** Below binary tree

> 

The idea is to start with the root node, which would be the node with the minimum index in the level order sequence, and partition the inorder sequence for the left and right subtree. To find the left and right subtree boundary, search for the root node index in the inorder sequence. All keys before the root node in the inorder sequence will become part of the left subtree, and all keys after the root node will become part of the right subtree. Repeat this recursively for all nodes in the tree and construct the tree in the process.

To illustrate, consider the following in order and level order sequence:

Inorder : { 4, 2, 5, 1, 6, 3, 7 } Level-order : { 1, 2, 3, 4, 5, 6, 7 }

The root node is present at the first index in the level order sequence, i.e., node `1` is the root node. Now since node `1` is the root, all nodes before node `1`, i.e., `{4, 2, 5}`, must be included in the inorder sequence in the left subtree of the root node and all the nodes after node `1`, i.e., `{6, 3, 7}`, must be included in the right subtree. This logic reduces the problem of building the left and right subtrees and linking them to the root node.

**Left subtree:** Inorder : { 4, 2, 5 } Level-order : { 1, 2, 3, 4, 5, 6, 7 } **Right subtree:** Inorder : { 6, 3, 7 } Level-order : { 1, 2, 3, 4, 5, 6, 7 }

In the respective inorder sequence, the key which appears first in the level order traversal becomes the root node for the corresponding left or right subtree. This is demonstrated below in TypeScript:

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

// Recursive function to perform inorder traversal on a given binary tree
function inorderTraversal(root: Node | null, output: number[] = []): void {

    if (root === null) {
        return;
    }

    inorderTraversal(root.left, output);
    output.push(root.data);
    inorderTraversal(root.right, output);
}

// Recursive function to construct a binary tree from a given inorder and
// level order traversals
function buildTree(inorder: number[], start: number, end: number, d: Map<number, number>): Node | null {

    // base case
    if (start > end) {
        return null;
    }

    // find the root node index in sequence `inorder[]` to determine the
    // left and right subtree boundary
    let index = start;
    for (let j = start + 1; j <= end; j++) {
        // Find node with minimum index in level order traversal.
        // That would be the root node of the sequence inorder[start, end]
        const currentLevel = d.get(inorder[j]);
        const selectedLevel = d.get(inorder[index]);
        if (currentLevel !== undefined && selectedLevel !== undefined && currentLevel < selectedLevel) {
            index = j;
        }
    }

    // construct the root node
    const root = new Node(inorder[index]);

    // recursively construct the left subtree
    root.left = buildTree(inorder, start, index - 1, d);

    // recursively construct the right subtree
    root.right = buildTree(inorder, index + 1, end, d);

    // return the root node
    return root;
}

// Construct a binary tree from inorder and level order traversals
function buildBT(inorder: number[], level: number[]): Node | null {

    // create a dictionary to efficiently find the index of an element in a
    // level order sequence
    const d = new Map<number, number>();
    for (let i = 0; i < level.length; i++) {
        d.set(level[i], i);
    }

    // construct the tree and return it
    return buildTree(inorder, 0, inorder.length - 1, d);
}

const inorderArr = [4, 2, 5, 1, 6, 3, 7];
const level = [1, 2, 3, 4, 5, 6, 7];

const root = buildBT(inorderArr, level);

const output: number[] = [];
inorderTraversal(root, output);
console.log(`Inorder traversal of the constructed tree is ${output.join(' ')}`);
```

**Output:** Inorder traversal of the constructed tree is 4 2 5 1 6 3 7

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. It also requires O(n) extra space for map and call stack.

Also See:

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Construct a binary tree from inorder and postorder traversals](https://www.techiedelight.com/construct-binary-tree-from-inorder-postorder-traversals/ "Construct a binary tree from inorder and postorder traversals")

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
