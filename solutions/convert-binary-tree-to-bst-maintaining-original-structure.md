# Convert a binary tree to BST by maintaining its original structure

> Source: https://www.techiedelight.com/convert-binary-tree-to-bst-maintaining-original-structure/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Convert a given binary tree into a BST (Binary Search Tree) by keeping its original structure intact.

For example, consider a binary tree shown on the left below. The solution should convert it into a BST shown on the right.

> 

The idea is to traverse the binary tree and store its keys in a set. We know that an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) of a binary search tree returns the nodes in sorted order, so traverse the tree again in an inorder fashion and put the keys present in the set (in sorted order) back to their correct position in the BST.

The advantage of using a set over an array is that the keys are always retrieved in sorted order from the set. If an array is used, [sort the keys](https://techiedelight.com/sort-array-ascending-order-cpp/) first before inserting them back.

Following is a TypeScript implementation of the idea:

```ts
// A class to store a BST node
class Node {
    constructor(public data: number,
                public left: Node | null = null,
                public right: Node | null = null) {}
}

// Function to perform inorder traversal on the tree
function inorder(root: Node | null, output: number[] = []): void {
    if (root === null) {
        return;
    }
    inorder(root.left, output);
    output.push(root.data);
    inorder(root.right, output);
}

// Function to traverse the binary tree and store its keys in a set
function extractKeys(root: Node | null, keys: number[]): void {
    // base case
    if (root === null) {
        return;
    }
    extractKeys(root.left, keys);
    keys.push(root.data);
    extractKeys(root.right, keys);
}

// Function to put keys back into a set in their correct order in a BST
// by doing inorder traversal
function convertToBST(root: Node | null, it: Iterator<number>): void {
    if (root === null) {
        return;
    }
    convertToBST(root.left, it);
    root.data = it.next().value;
    convertToBST(root.right, it);
}

// Function to convert a binary tree to BST by maintaining its original structure
function convert(root: Node | null): void {
    // traverse the binary tree and store its keys in a set
    const keys: number[] = [];
    extractKeys(root, keys);

    // put back keys present in the set to their correct order in the BST
    const it = keys.sort((a, b) => a - b)[Symbol.iterator]();
    convertToBST(root, it);
}

/* Construct the following tree
           8
         /   \
        /     \
       3       5
      / \     / \
     /   \   /   \
    10    2 4     6
*/

let root = new Node(8);
root.left = new Node(3);
root.right = new Node(5);
root.left!.left = new Node(10);
root.left!.right = new Node(2);
root.right!.left = new Node(4);
root.right!.right = new Node(6);

convert(root);
const output: number[] = [];
inorder(root, output);
console.log(output.join(' '));
```

**Output:** 2 3 4 5 6 8 10

The time complexity of the above solution is O(n.log(n)), where `n` is the size of the BST, and requires linear space for storing the tree nodes.

Also See:

> [Fix a binary tree that is only one swap away from becoming a BST](https://www.techiedelight.com/fix-binary-tree-one-swap-bst/ "Fix a binary tree that is only one swap away from becoming a BST")

> [Determine whether a given binary tree is a BST or not](https://www.techiedelight.com/determine-given-binary-tree-is-a-bst-or-not/ "Determine whether a given binary tree is a BST or not")

> [Find k’th largest node in a BST](https://www.techiedelight.com/find-kth-smallest-largest-element-bst/ "Find k’th largest node in a BST")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.66/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
