# Construct a Cartesian tree from an inorder traversal

> Source: https://www.techiedelight.com/construct-cartesian-tree-from-inorder-traversal/

Write an efficient algorithm to construct a [Cartesian tree](https://en.wikipedia.org/wiki/Cartesian_tree) from [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/). A Cartesian tree is a [binary tree](https://techiedelight.com/binary-tree-interview-questions/) with the [heap property](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap): the parent of any node has a smaller value than the node itself.

For example, the following figure shows an example of a Cartesian tree derived from the sequence of numbers in inorder order:

> 

Based on the heap property, the Cartesian tree root is the smallest number of the inorder sequence. The idea is to find the minimum element index in the inorder sequence and construct the root node from it. The left subtree consists of the values earlier than the root in the inorder sequence, while the right subtree consists of the values later than the root. Recursively follow this pattern for all nodes in the tree to construct the complete Cartesian tree.

Following is a TypeScript implementation of the above algorithm:

```ts
// Cartesian Tree Node
class Node {
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {}
}

// Recursive function to perform inorder traversal on a Cartesian tree
function inorderTraversal(root: Node | null, output: number[] = []): void {
    if (root === null) {
        return;
    }

    inorderTraversal(root.left, output);
    output.push(root.data);
    inorderTraversal(root.right, output);
}

// Function to find the minimum element index in sequence represented by
// `inorder[start, end]`
function findMinElementIndex(inorder: number[], start: number, end: number): number {
    let minIndex = start;
    for (let i = start + 1; i <= end; i++) {
        if (inorder[minIndex] > inorder[i]) {
            minIndex = i;
        }
    }
    return minIndex;
}

// Recursive function to construct a Cartesian tree from a given inorder sequence
function constructTree(inorder: number[], start: number, end: number): Node | null {

    // base case
    if (start > end) {
        return null;
    }

    // Find the index of the minimum element in sequence `inorder[start, end]`
    const index = findMinElementIndex(inorder, start, end);

    // The minimum element in a given range of inorder sequence becomes the root
    const root = new Node(inorder[index]);

    // recursively construct the left subtree
    root.left = constructTree(inorder, start, index - 1);

    // recursively construct the right subtree
    root.right = constructTree(inorder, index + 1, end);

    // return the current node
    return root;
}

// input sequence of numbers representing the inorder sequence
const inorder = [9, 3, 7, 1, 8, 12, 10, 20, 15, 18, 5];

// construct the Cartesian tree
const root = constructTree(inorder, 0, inorder.length - 1);

// print the Cartesian tree
const output: number[] = [];
inorderTraversal(root, output);
console.log(`Inorder traversal of the constructed Cartesian tree is ${output.join(' ')}`);
```

**Output:** Inorder traversal of the constructed Cartesian tree is 9 3 7 1 8 12 10 20 15 18 5

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the Cartesian tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

Also See:

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

> [Construct a binary tree from inorder and level order sequence](https://www.techiedelight.com/construct-binary-tree-from-inorder-level-order-traversals/ "Construct a binary tree from inorder and level order sequence")

> [Construct a binary tree from inorder and postorder traversals](https://www.techiedelight.com/construct-binary-tree-from-inorder-postorder-traversals/ "Construct a binary tree from inorder and postorder traversals")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 185

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
