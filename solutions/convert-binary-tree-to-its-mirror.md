# Convert a binary tree to its mirror

> Source: https://www.techiedelight.com/convert-binary-tree-to-its-mirror/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to convert the binary tree into its mirror.

For example, the following binary trees are mirrors of each other:

> 

The idea is simple – traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/), and for every node, swap its left and right child pointer after recursively converting its left and right subtree to mirror first. Following is a TypeScript implementation of the idea:

```ts
// A class to store a binary tree node
class Node {
    constructor(public data: number,
                public left: Node | null = null,
                public right: Node | null = null) {}
}

// Function to perform preorder traversal on a given binary tree
function preorder(root: Node | null, output: number[] = []): void {
    if (root === null) {
        return;
    }

    output.push(root.data);
    preorder(root.left, output);
    preorder(root.right, output);
}

// Function to convert a given binary tree into its mirror
function convertToMirror(root: Node | null): void {

    // base case: if the tree is empty
    if (root === null) {
        return;
    }

    // convert left subtree
    convertToMirror(root.left);

    // convert right subtree
    convertToMirror(root.right);

    // swap left subtree with right subtree
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     / \     / \
    4   5   6   7
*/

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left!.left = new Node(4);
root.left!.right = new Node(5);
root.right!.left = new Node(6);
root.right!.right = new Node(7);

convertToMirror(root);
const output: number[] = [];
preorder(root, output);
console.log(output.join(' '));
```

**Output:** 1 3 7 6 2 5 4

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Iterative version:

> [Invert Binary Tree – Iterative and Recursive Solution](https://techiedelight.com/invert-binary-tree-recursive-iterative/)

Also See:

> [Create a mirror of an m–ary tree](https://www.techiedelight.com/mirror-of-m-ary-tree/ "Create a mirror of an m–ary tree")

> [Convert binary tree to Left-child right-sibling binary tree](https://www.techiedelight.com/convert-normal-binary-tree-left-child-right-sibling-binary-tree/ "Convert binary tree to Left-child right-sibling binary tree")

> [In-place convert a binary tree to its sum tree](https://www.techiedelight.com/inplace-convert-a-tree-sum-tree/ "In-place convert a binary tree to its sum tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
