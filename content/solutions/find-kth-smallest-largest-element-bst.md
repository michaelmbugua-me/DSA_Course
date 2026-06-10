# Find k’th largest node in a BST

> Source: https://www.techiedelight.com/find-kth-smallest-largest-element-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST and a positive number `k`, find the `k'th` largest node in the BST.

For example, consider the following binary search tree. If `k = 2`, the `k'th` largest node is 20.

> 

We know that an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) of a binary search tree returns the nodes in ascending order. To find the `k'th` smallest node, we can perform inorder traversal and store the inorder sequence in an array. Then the `k'th` largest node would be the `(n-k)'th` smallest node, where `n` is the total number of nodes present in the BST.

The problem with this approach is that it requires two traversals of the array. We can solve this problem in a single traversal of the array by using reverse inorder traversal (traverse the right subtree before the left subtree for every node). Then the reverse inorder traversal of a binary search tree will process the nodes in descending order.

Following is a TypeScript implementation of the idea:

```ts
// A class to store a BST node
class TreeNode {
    data: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to insert a key into a BST
function insert(root: TreeNode | null, key: number): TreeNode {

    // if the root is null, create a new node and return it
    if (root === null) {
        return new TreeNode(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root.data) {
        root.left = insert(root.left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        root.right = insert(root.right, key);
    }

    return root;
}

// Function to find the k'th largest node in a BST.
// Here, `i` denotes the total number of nodes processed so far
function kthLargest(root: TreeNode | null, i: { value: number }, k: number): TreeNode | null {

    // base case
    if (root === null) {
        return null;
    }

    // search in the right subtree
    const left = kthLargest(root.right, i, k);

    // if k'th largest is found in the left subtree, return it
    if (left) {
        return left;
    }

    i.value = i.value + 1;

    // if the current node is k'th largest, return its value
    if (i.value === k) {
        return root;
    }

    // otherwise, search in the left subtree
    return kthLargest(root.left, i, k);
}

// Function to find the k'th largest node in a BST
function findKthLargest(root: TreeNode | null, k: number): TreeNode | null {

    // maintain index to count the total number of nodes processed so far
    const i = { value: 0 };

    // traverse the tree in an inorder fashion and return k'th node
    return kthLargest(root, i, k);
}

const keys = [15, 10, 20, 8, 12, 16, 25];

let root: TreeNode | null = null;
for (const key of keys) {
    root = insert(root, key);
}

const k = 2;
const node = findKthLargest(root, k);

if (node !== null) {
    console.log(node.data);
}
else {
    console.log('Invalid Input');
}
```

**Output:** 20

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

Also See:

> [Fix a binary tree that is only one swap away from becoming a BST](https://www.techiedelight.com/fix-binary-tree-one-swap-bst/ "Fix a binary tree that is only one swap away from becoming a BST")

> [Update every key in a BST to contain the sum of all greater keys](https://www.techiedelight.com/update-every-key-bst-contain-sum-greater-keys/ "Update every key in a BST to contain the sum of all greater keys")

> [Remove nodes from a BST that have keys outside a valid range](https://www.techiedelight.com/remove-nodes-bst-keys-outside-valid-range/ "Remove nodes from a BST that have keys outside a valid range")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 161

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
