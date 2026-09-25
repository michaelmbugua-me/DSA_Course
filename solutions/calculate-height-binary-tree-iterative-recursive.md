# Calculate the height of a binary tree – Iterative and Recursive

> Source: https://www.techiedelight.com/calculate-height-binary-tree-iterative-recursive/

Write an efficient algorithm to compute the binary tree’s height. The height or depth of a binary tree is the total number of edges or nodes on the longest path from the root node to the leaf node.

The program should consider the total number of nodes in the longest path. For example, an empty tree’s height is 0, and the tree’s height with only one node is 1.

> 

## Recursive Solution

The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and calculate the height of the left and right subtree. The height of a subtree rooted at any node will be one more than the maximum height of its left and right subtree. Recursively apply this property to all tree nodes in a bottom-up manner (postorder fashion) and return the subtree’s maximum height rooted at that node.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Recursive function to calculate the height of a given binary tree
const height = (root: TreeNode | null): number => {

    // base case: empty tree has a height of 0
    if (root === null) {
        return 0;
    }

    // recur for the left and right subtree and consider maximum depth
    return 1 + Math.max(height(root.left), height(root.right));
};

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);

console.log(`The height of the binary tree is ${height(root)}`);
```

The time complexity of the above recursive solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

## Iterative Solution

In an iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. Then the height of a tree is equal to the total number of levels in it. Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Iterative function to calculate the height of a given binary tree
// by doing level order traversal on the tree
const height = (root: TreeNode | null): number => {

    // empty tree has a height of 0
    if (root === null) {
        return 0;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [];
    queue.push(root);

    let height = 0;

    // loop till queue is empty
    while (queue.length > 0) {

        // calculate the total number of nodes at the current level
        const size = queue.length;

        // process each node of the current level and enqueue their
        // non-empty left and right child
        for (let i = 0; i < size; i++) {
            const front = queue.shift()!;

            if (front.left) {
                queue.push(front.left);
            }

            if (front.right) {
                queue.push(front.right);
            }
        }

        // increment height by 1 for each level
        height++;
    }

    return height;
};

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);

console.log(`The height of the binary tree is ${height(root)}`);
```

The time complexity of the above iterative solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for the queue data structure.
