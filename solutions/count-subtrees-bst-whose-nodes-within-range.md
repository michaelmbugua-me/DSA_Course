# Count subtrees in a BST whose nodes lie within a given range

> Source: https://www.techiedelight.com/count-subtrees-bst-whose-nodes-within-range/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST, count subtrees in it whose nodes lie within a given range.

For example, consider the following BST. The total number of subtrees with nodes in range `[5, 20]` is `6`.

The subtrees are:

6 9 8 10 12 18 / \ / \ 6 9 8 12 / \ 6 9

> 

A simple solution would be to traverse the tree and, for each encountered node, check if all nodes under the subtree rooted under the node are within the given range or not. The time complexity of this solution is O(n2) for a binary search tree with `n` nodes. We can improve time complexity to linear by traversing the tree in a bottom-up manner and transfer some information from children to the parent node.

The idea is to perform a [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) on the given BST. Then for any node, if both its left and right subtrees are within the range along with the node itself, we can say that the subtree rooted with this node is also within the range.

The algorithm can be implemented as follows in TypeScript, where a tuple is used to return multiple values from the function.

```ts
// A class to store a BST node
class Node {
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
    }
}

// Recursive function to insert a key into a BST
function insert(root: Node | null, key: number): Node {
    // if the root is null, create a new node and return it
    if (root === null) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root.data) {
        root.left = insert(root.left, key);
    }
    // otherwise, recur for the right subtree
    else {
        root.right = insert(root.right, key);
    }

    // return root node
    return root;
}

// Function to count subtrees in a BST whose nodes lie within a given range.
// It returns true if the whole subtree rooted at the given node is within range
function findSubTrees(root: Node | null, low: number, high: number, count = 0): [boolean, number] {
    // base case
    if (root === null) {
        return [true, count];
    }

    // increment the subtree count by 1 and return true if the root node,
    // both left and right subtrees are within the range
    const [left, leftCount] = findSubTrees(root.left, low, high, count);
    const [right, rightCount] = findSubTrees(root.right, low, high, leftCount);

    if (left && right && low <= root.data && root.data <= high) {
        return [true, rightCount + 1];
    }

    return [false, rightCount];
}

// input range
const low = 5, high = 20;

// BST keys to construct BST shown in the diagram
const keys = [15, 25, 20, 22, 30, 18, 10, 8, 9, 12, 6];

// construct BST
let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

// get count of subtrees
const [, count] = findSubTrees(root, low, high);
console.log('The total number of subtrees is', count);
```

**Output:** The total number of subtrees is 6

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

Also See:

> [Count nodes in a BST that lies within a given range](https://www.techiedelight.com/count-nodes-bst-that-lies-within-given-range/ "Count nodes in a BST that lies within a given range")

> [Remove nodes from a BST that have keys outside a valid range](https://www.techiedelight.com/remove-nodes-bst-keys-outside-valid-range/ "Remove nodes from a BST that have keys outside a valid range")

> [Find k’th largest node in a BST](https://www.techiedelight.com/find-kth-smallest-largest-element-bst/ "Find k’th largest node in a BST")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.67/5. Vote count: 174

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
