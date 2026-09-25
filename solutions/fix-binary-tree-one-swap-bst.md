# Fix a binary tree that is only one swap away from becoming a BST

> Source: https://www.techiedelight.com/fix-binary-tree-one-swap-bst/

Given a binary tree that is only one swap away from becoming a BST, convert it into a BST in a single traversal.

For example, consider the binary tree shown on the left below. The solution should convert it into a BST shown on the right by swapping nodes 2 and 4.

> 

We know that an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) of a binary search tree returns the nodes in sorted order. The idea is to perform inorder traversal on a given binary tree and keep track of the last visited node while traversing the tree. Check whether its key is smaller compared to the current key or not and mark the nodes where this property is violated and later swap them.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    data: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Function to perform inorder traversal on the tree
const inorder = (root: TreeNode | null): void => {
    if (root === null) {
        return;
    }

    inorder(root.left);
    console.log(root.data, '');
    inorder(root.right);
};

// Function to exchange data of given tree nodes
const swapData = (first: TreeNode, second: TreeNode): void => {
    const data = first.data;
    first.data = second.data;
    second.data = data;
};

// Recursive function to insert a key into a BST
const insert = (root: TreeNode | null, key: number): TreeNode => {
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
};

// Recursive function to fix a binary tree that is only one swap
// away from becoming a BST. Here, `prev` is the previously processed node
// in inorder traversal, and `x` & `y` stores node to be swapped (if any).
const correctBST = (root: TreeNode | null, x: TreeNode | null, y: TreeNode | null, prev: TreeNode | null):
    [TreeNode | null, TreeNode | null, TreeNode | null] => {
    // base case
    if (root === null) {
        return [x, y, prev];
    }

    // recur for the left subtree
    [x, y, prev] = correctBST(root.left, x, y, prev);

    // if the current node is less than the previous node
    if (prev !== null && root.data < prev.data) {
        // if this is the first occurrence, update `x` and `y` to the previous
        // and current node, respectively
        if (x === null) {
            x = prev;
        }

        // if this is a second occurrence, update `y` to the current node
        y = root;
    }

    // update the previous node and recur for the right subtree
    prev = root;
    return correctBST(root.right, x, y, prev);
};

// Fix given binary tree that is only one swap away from becoming a BST
const fixBST = (root: TreeNode | null): void => {
    // `x` and `y` stores node to be swapped

    // stores previously processed node in the inorder traversal
    // initialize it by -INFINITY
    let prev = new TreeNode(Number.MIN_SAFE_INTEGER);

    // fix the binary tree
    const [x, y] = correctBST(root, null, null, prev);

    // swap the nodes' data
    if (x && y) {
        swapData(x, y);
    }
};

const keys = [15, 10, 20, 8, 12, 16, 25];

/* Construct the following BST
          15
        /    \
       /      \
      10       20
     /  \     /  \
    /    \   /    \
   8     12 16    25
*/

let root: TreeNode | null = null;
for (const key of keys) {
    root = insert(root, key);
}

// swap any two nodes' values
swapData(root!.left!, root!.right!.right!);

// fix the BST
fixBST(root);

// print the BST after fixing it
inorder(root);
```

**Output:** 8 10 12 15 16 20 25

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

Also See:

> [Determine whether a given binary tree is a BST or not](https://www.techiedelight.com/determine-given-binary-tree-is-a-bst-or-not/ "Determine whether a given binary tree is a BST or not")

> [Sink nodes containing zero to the bottom of a binary tree](https://www.techiedelight.com/sink-nodes-containing-zero-bottom-binary-tree/ "Sink nodes containing zero to the bottom of a binary tree")

> [Set next pointer to the inorder successor of all nodes in a binary tree](https://www.techiedelight.com/set-next-pointer-inorder-successor-binary-tree/ "Set next pointer to the inorder successor of all nodes in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.6/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
