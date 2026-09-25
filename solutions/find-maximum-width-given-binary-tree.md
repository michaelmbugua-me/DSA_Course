# Compute the maximum number of nodes at any level in a binary tree

> Source: https://www.techiedelight.com/find-maximum-width-given-binary-tree/

Given a binary tree, write an efficient algorithm to compute the maximum number of nodes in any level in the binary tree.

For example, the maximum number of nodes in any level in the binary tree below is 4.

> 

## 1\. Iterative Approach

In an iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. We can easily modify level order traversal to maintain the maximum number of nodes at the current level. Then the result is equal to the maximum number of nodes at any level in the tree.

This is demonstrated below in TypeScript:

**Output:** The maximum width is 4

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Function to find the maximum width of a binary tree using level order
// traversal of a given binary tree
function findMaxWidth(root: TreeNode | null): void {

    // return if the tree is empty
    if (!root) {
        return;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [];
    queue.push(root);

    // stores the maximum width
    let max = 0;

    // loop till queue is empty
    while (queue.length) {

        // calculate the total number of nodes at the current level.
        // This is equal to the width of the current level.
        let width = queue.length;

        // update maximum width if the total number of nodes at the current level
        // is more than the maximum width found so far
        if (max < width) {
            max = width;
        }

        // process every node of the current level and enqueue their
        // non-empty left and right child
        while (width > 0) {
            width--;
            const curr = queue.shift();

            if (curr.left) {
                queue.push(curr.left);
            }

            if (curr.right) {
                queue.push(curr.right);
            }
        }
    }

    console.log(`The maximum width is ${max}`);
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);

findMaxWidth(root);
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for the queue.

## 2\. Recursive Approach

We can also solve this problem recursively by using [hashing](https://techiedelight.com/hashing-in-data-structure/). We traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store the count of nodes present in each level in a map. Finally, traverse the map and return the maximum value found.

Please note that we can also traverse the tree in an [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) or [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/). The implementation can be seen below in TypeScript:

**Output:** The maximum width is 4

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Traverse the tree in a preorder fashion and store the count of nodes
// in each level
function preorder(root: TreeNode | null, level: number, dict: Map<number, number>): void {

    // base case: empty tree
    if (!root) {
        return;
    }

    // increment count of nodes at the current level
    dict.set(level, (dict.get(level) ?? 0) + 1);

    // recur for the left and right subtree by increasing the level by 1
    preorder(root.left, level + 1, dict);
    preorder(root.right, level + 1, dict);
}

// Recursive function to find the maximum width of a binary tree
function findMaxWidth(root: TreeNode | null): void {

    // base case
    if (!root) {
        return 0;
    }

    // create an empty map to store the count of nodes in each level
    const dict = new Map<number, number>();

    // traverse the tree and fill the map
    preorder(root, 1, dict);

    // iterate through the map and find maximum width
    console.log(`The maximum width is ${Math.max(...dict.values())}`);
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);

findMaxWidth(root);
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.
