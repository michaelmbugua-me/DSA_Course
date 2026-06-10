# Find the next node at the same level as the given node in a binary tree

> Source: https://www.techiedelight.com/find-next-node-in-same-level-binary-tree/

Given a binary tree and a node in it, write an efficient algorithm to find its next node at the same level as the node.

For example, consider the following binary tree:

The next node of 2 is 3 The next node of 5 is 6 The next node of 7 is 8 The next node of 8 is null

> 

A simple solution is to perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. The idea is to modify the level order traversal to maintain the level number of each node, and if the given node is found, we return its immediate right node, present at the same level.

The implementation can be seen below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Function to find the next node of a given node in the same level
// in a given binary tree
const findRightNode = (root: TreeNode | null, node: TreeNode | null): TreeNode | null => {

    // return null if a tree is empty
    if (root === null) {
        return null;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [];
    queue.push(root);

    // loop till queue is empty
    while (queue.length) {

        // calculate the total number of nodes at the current level
        let size = queue.length;

        // process every node of the current level and enqueue their
        // non-empty left and right child
        while (size > 0) {
            size = size - 1;
            const front = queue.shift();
            if (front === undefined) {
                return null;
            }

            // if the desired node is found, return its next right node
            if (front === node) {
                // if the next right node doesn't exist, return null
                if (size === 0) {
                    return null;
                }

                const right = queue[0];
                return right === undefined ? null : right;
            }

            if (front.left) {
                queue.push(front.left);
            }

            if (front.right) {
                queue.push(front.right);
            }
        }
    }

    return null;
};

/* Construct the following tree
          1
        /  \
       /    \
      2      3
     / \      \
    4   5      6
              / \
             7   8
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

const right = findRightNode(root, root.left.right);
if (right !== null) {
    console.log(`Right node is ${right.val}`);
}
else {
    console.log("Right node doesn't exist");
}
```

**Output:** Right node is 6

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

We can also solve this problem by using constant auxiliary space and linear time. The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and search for the given node. Once the node is found, mark its level number. Then the first node encountered at the same level is the next right node.

Following is the implementation of the above approach in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Function to find the next node for a given node in the same level in a
// binary tree by using preorder traversal
const findRightNode = (root: TreeNode | null, node: TreeNode | null, level: number,
                        node_level: { value: number }): TreeNode | null => {

    // return null if a tree is empty
    if (root === null) {
        return null;
    }

    // if the desired node is found, set `node_level` to the current level
    if (root === node) {
        node_level.value = level;
        return null;
    }

    // if `node_level` is already set, then the current node is the next
    // right node
    else if (node_level.value !== 0 && level === node_level.value) {
        return root;
    }

    // recur for the left subtree by increasing level by 1
    const left = findRightNode(root.left, node, level + 1, node_level);

    // if the node is found in the left subtree, return it
    if (left !== null) {
        return left;
    }

    // recur for the right subtree by increasing the level by 1
    return findRightNode(root.right, node, level + 1, node_level);
};

// Function to find the next node of a given node in the same level
// in a given binary tree
const findRightNodeBT = (root: TreeNode | null, node: TreeNode | null): TreeNode | null => {
    const node_level = { value: 0 };
    return findRightNode(root, node, 1, node_level);
};

/* Construct the following tree
          1
        /  \
       /    \
      2      3
     / \      \
    4   5      6
              / \
             7   8
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

const right = findRightNodeBT(root, root.left.right);
if (right !== null) {
    console.log(`Right node is ${right.val}`);
}
else {
    console.log("Right node doesn't exist");
}
```

**Output:** Right node is 6

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.
