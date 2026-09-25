# Construct a full binary tree from a preorder and postorder sequence

> Source: https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

A full binary tree is a tree in which every node has either 0 or 2 children. Write an efficient algorithm to construct a full binary tree from a given [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) sequence.

For example,

**Input:** Preorder traversal : { 1, 2, 4, 5, 3, 6, 8, 9, 7 } Postorder traversal: { 4, 5, 2, 8, 9, 6, 7, 3, 1 } **Output:** Following full binary tree

> 

We can construct a unique binary tree from [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and preorder sequences and the inorder and postorder sequences. But preorder and postorder sequences don’t provide enough information to create a unique binary tree. Several binary trees can be constructed due to ambiguity.

For example, consider the following skewed trees:

a a / \ b b / \ c c / \ d d

For both above trees, the preorder and postorder traversal result in the same sequence of numbers:

preorder : { a, b, c, d } postorder : { d, c, b, a }

Therefore, it is impossible to construct a unique binary tree with preorder and postorder sequences. However, a unique full binary tree can easily be constructed with them. To illustrate, consider the following preorder and postorder sequence:

preorder : { 1, 2, 4, 5, 3, 6, 8, 9, 7 } postorder : { 4, 5, 2, 8, 9, 6, 7, 3, 1 }

We know that the root is the first element in the preorder sequence and the last element in the postorder sequence. Therefore, the root node is 1. Then locate the next element in the preorder sequence, which must be the left child of the root node. In this case, the left child is 2. Now since 2 is the root node of the left subtree, all nodes before 2 in the postorder sequence must be present in the left subtree of the root node, i.e., `{4, 5, 2}` and all the nodes after 2 (except the last) must be present in the right subtree, i.e., `{8, 9, 6, 7, 3}`. Now the problem is reduced to building the left and right subtrees and linking them to the root node.

**Left subtree:** Postorder : {4, 5, 2} Preorder : {2, 4, 5} **Right subtree:** Postorder : {8, 9, 6, 7, 3} Preorder : {3, 6, 8, 9, 7}

The idea is to recursively follow the above approach until the complete tree is constructed. This is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class Node {
    constructor(public data: number,
                public left: Node | null = null,
                public right: Node | null = null) {}
}

// Recursive function to perform inorder traversal on a given binary tree
function inorder(root: Node | null, output: number[] = []): void {

    if (root === null) {
        return;
    }

    inorder(root.left, output);
    output.push(root.data);
    inorder(root.right, output);
}

// A recursive function to construct a full binary tree from the given preorder
// and postorder sequence
function buildTree(preorder: number[], pIndex: number, start: number, end: number, d: Map<number, number>): [Node, number] {

    // Consider the next item from the given preorder sequence.
    // This item would be the root node of the subtree formed by
    // the `postorder[start, end]` and increment `pIndex`
    const root = new Node(preorder[pIndex]);
    pIndex = pIndex + 1;

    // return if all keys are processed
    if (pIndex === preorder.length) {
        return [root, pIndex];
    }

    // find the next key index in the postorder sequence to determine the
    // boundary of the left and right subtree of the current root node
    const index = d.get(preorder[pIndex])!;

    // fill the left and right subtree together
    if (start <= index && index + 1 <= end - 1) {
        // build the left subtree
        [root.left, pIndex] = buildTree(preorder, pIndex, start, index, d);

        // build the right subtree
        [root.right, pIndex] = buildTree(preorder, pIndex, index + 1, end - 1, d);
    }

    return [root, pIndex];
}

// Construct a full binary tree from preorder and postorder sequence
function buildBinaryTree(preorder: number[], postorder: number[]): Node | null {

    // base case
    if (preorder.length === 0) {
        return null;
    }

    // dictionary is used to efficiently find the index of any element in the given
    // postorder sequence
    const d = new Map<number, number>();
    for (let i = 0; i < postorder.length; i++) {
        d.set(postorder[i], i);
    }

    // `pIndex` stores the index of the next node in the preorder sequence
    let pIndex = 0;

    // set range [start, end] for subtree formed by postorder sequence
    const start = 0;
    const end = preorder.length - 1;

    // construct the binary tree and return it
    return buildTree(preorder, pIndex, start, end, d)[0];
}

const preorder = [1, 2, 4, 5, 3, 6, 8, 9, 7];
const postorder = [4, 5, 2, 8, 9, 6, 7, 3, 1];

const root = buildBinaryTree(preorder, postorder);

const output: number[] = [];
inorder(root, output);
console.log(`Inorder traversal is ${output.join(' ')}`);
```

**Output:** Inorder traversal is 4 2 5 1 8 6 9 3 7

Note that the above algorithm will ensure a unique binary tree only when all keys in the given preorder/postorder sequence are distinct. For example, two full binary trees exist for following preorder and postorder sequences whose node keys are not distinct:

The preorder traversal is { 0, 1, 1, 1, 1 } The postorder traversal is { 1, 1, 1, 1, 0 } 0 / \ 1 1 / \ 1 1 0 / \ 1 1 / \ 1 1

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the total number of nodes in the binary tree.

Also See:

> [Find preorder traversal of a binary tree from its inorder and postorder sequence](https://www.techiedelight.com/find-preorder-traversal-binary-tree-from-inorder-postorder/ "Find preorder traversal of a binary tree from its inorder and postorder sequence")

> [Find postorder traversal of a binary tree from its inorder and preorder sequence](https://www.techiedelight.com/find-postorder-traversal-binary-tree-from-inorder-preorder-sequence/ "Find postorder traversal of a binary tree from its inorder and preorder sequence")

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 182

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
