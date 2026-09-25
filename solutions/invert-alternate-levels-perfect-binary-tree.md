# Invert alternate levels of a perfect binary tree

> Source: https://www.techiedelight.com/invert-alternate-levels-perfect-binary-tree/

Write an efficient algorithm to invert alternate levels of a perfect binary tree.

For example, consider the following tree:

We should convert it into the following tree:

> 

## 1\. Using Level Order Traversal

The idea is to perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) of the perfect binary tree and traverse its nodes level-by-level. Then for each odd level, push all nodes present in that level into a [stack](https://techiedelight.com/stack-implementation/). Finally, at the end of each odd level, we put nodes present in the stack into their correct position. Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to print level order traversal of a perfect binary tree
function levelOrderTraversal(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [];
    queue.push(root);

    // loop till queue is empty
    while (queue.length > 0) {

        // process each node in the queue and enqueue their
        // non-empty left and right child
        const curr = queue.shift()!;

        process.stdout.write(curr.val + ' ');

        if (curr.left !== null) {
            queue.push(curr.left);
        }

        if (curr.right !== null) {
            queue.push(curr.right);
        }
    }
}

// Iterative function to invert alternate levels of a perfect binary tree
// using level order traversal
function invertBinaryTree(root: TreeNode | null): void {

    // base case: if the tree is empty
    if (root === null) {
        return;
    }

    // maintain a queue and enqueue the root node
    const q: TreeNode[] = [];
    q.push(root);

    // to store current level information
    let level = false;

    // maintain another queue to store nodes present at an odd level
    const levelNodes: TreeNode[] = [];

    // maintain a stack to store node's data on an odd level
    const levelData: number[] = [];

    // loop till queue is empty
    while (q.length > 0) {

        // get the size of the current level
        const size = q.length;

        // process all nodes present at the current level
        for (let n = size - 1; n >= 0; n--) {

            // dequeue front node
            const curr = q.shift()!;

            // if the level is odd
            if (level) {
                // enqueue current node
                levelNodes.push(curr);

                // push the current node data into the stack
                levelData.push(curr.val);
            }

            // if the current node is the last node of the level
            if (n === 0) {
                // flip the level
                level = !level;

                // put elements present in the `levelData` into their correct
                // position using `levelNodes`
                while (levelNodes.length > 0) {
                    const front = levelNodes.shift()!;   // use `shift()` for queue
                    front.val = levelData.pop()!;        // use `pop()` for stack
                }
            }

            // enqueue left child of the current node
            if (curr.left !== null) {
                q.push(curr.left);
            }

            // enqueue right child of the current node
            if (curr.right !== null) {
                q.push(curr.right);
            }
        }
    }
}

/* Construct the following tree
              1
           /     \
         /         \
       2             3
     /   \         /   \
    4     5       6     7
  /  \    / \    / \    / \
 8    9  10 11 12  13  14 15
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
root.left.left.left = new TreeNode(8);
root.left.left.right = new TreeNode(9);
root.left.right.left = new TreeNode(10);
root.left.right.right = new TreeNode(11);
root.right.left.left = new TreeNode(12);
root.right.left.right = new TreeNode(13);
root.right.right.left = new TreeNode(14);
root.right.right.right = new TreeNode(15);

invertBinaryTree(root);
levelOrderTraversal(root);
```

**Output:** 1 3 2 4 5 6 7 15 14 13 12 11 10 9 8

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(n) extra space for storing nodes present at odd levels of a binary tree. The stack is preferred over a list for storing nodes since it is a LIFO data structure, and we don’t need to reverse it before assigning value to nodes.

## 2\. Using Inorder Traversal

The idea remains similar to the previous approach, except here we recursively traverse the tree in an [inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), and store nodes present all odd levels in a stack, and replace them later by doing another inorder traversal. This approach is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to print level order traversal of a given binary tree
function levelOrderTraversal(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [];
    queue.push(root);

    // loop till queue is empty
    while (queue.length > 0) {

        // process each node in the queue and enqueue their
        // non-empty left and right child
        const curr = queue.shift()!;
        process.stdout.write(curr.val + ' ');

        if (curr.left !== null) {
            queue.push(curr.left);
        }

        if (curr.right !== null) {
            queue.push(curr.right);
        }
    }
}

// Recursive function to store nodes of odd levels in a stack using inorder traversal
function pushOddLevelNodes(root: TreeNode | null, s: number[], level: boolean): void {

    // base case
    if (root === null) {
        return;
    }

    // store nodes in the left subtree
    pushOddLevelNodes(root.left, s, !level);

    // push the current node's data into the stack only if the level is odd
    if (level) {
        s.push(root.val);
    }

    // store nodes in the right subtree
    pushOddLevelNodes(root.right, s, !level);
}

// Recursive function to invert alternate levels of a perfect binary tree
// using inorder traversal
function invertBinaryTree(root: TreeNode | null, s: number[], level: boolean): void {

    // base case
    if (root === null) {
        return;
    }

    // invert nodes in the left subtree
    invertBinaryTree(root.left, s, !level);

    // if the level is odd
    if (level) {
        // pop an element from the stack and assign it to the current node
        root.val = s.pop()!;
    }

    // invert nodes in the right subtree
    invertBinaryTree(root.right, s, !level);
}

// Invert alternate levels of a perfect binary tree
function invertBT(root: TreeNode | null): void {

    // create a stack and push nodes of odd levels into it
    const s: number[] = [];
    pushOddLevelNodes(root, s, false);

    // put nodes of odd levels at their correct position using stack
    invertBinaryTree(root, s, false);
}

/* Construct the following tree
              1
           /     \
         /         \
       2             3
     /   \         /   \
    4     5       6     7
  /  \    / \    / \    / \
 8    9  10 11 12  13  14 15
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
root.left.left.left = new TreeNode(8);
root.left.left.right = new TreeNode(9);
root.left.right.left = new TreeNode(10);
root.left.right.right = new TreeNode(11);
root.right.left.left = new TreeNode(12);
root.right.left.right = new TreeNode(13);
root.right.right.left = new TreeNode(14);
root.right.right.right = new TreeNode(15);

invertBT(root);
levelOrderTraversal(root);
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(n) extra space for storing nodes of odd levels.

We can replace stack with queue by doing reverse inorder traversal in the `pushOddLevelNodes()` function, i.e., call the right child before the left child. Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to print level order traversal of a given binary tree
function levelOrderTraversal(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [];
    queue.push(root);

    // loop till queue is empty
    while (queue.length > 0) {

        // process each node in the queue and enqueue their
        // non-empty left and right child
        const curr = queue.shift()!;

        process.stdout.write(curr.val + ' ');

        if (curr.left !== null) {
            queue.push(curr.left);
        }

        if (curr.right !== null) {
            queue.push(curr.right);
        }
    }
}

// Recursive function to store nodes of odd levels in a queue
// using inorder traversal
function pushOddLevelNodes(root: TreeNode | null, q: number[], level: boolean): void {

    // base case
    if (root === null) {
        return;
    }

    // store nodes in the right subtree
    pushOddLevelNodes(root.right, q, !level);

    // enqueue current node's data only if the level is odd
    if (level) {
        q.push(root.val);
    }

    // store nodes in the left subtree
    pushOddLevelNodes(root.left, q, !level);
}

// Recursive function to invert alternate levels of a perfect binary tree
// using inorder traversal
function invertBinaryTree(root: TreeNode | null, q: number[], level: boolean): void;
function invertBinaryTree(root: TreeNode | null): void;
function invertBinaryTree(root: TreeNode | null, q?: number[], level?: boolean): void {

    // base case
    if (root === null) {
        return;
    }

    // if called without a queue, create a queue and push nodes of odd levels into it
    if (q === undefined) {
        const queue: number[] = [];
        pushOddLevelNodes(root, queue, false);

        // put nodes of odd levels at their correct position using a queue
        invertBinaryTree(root, queue, false);
        return;
    }

    // invert nodes in the left subtree
    invertBinaryTree(root.left, q, !level);

    // if the level is odd
    if (level) {
        // dequeue front element and assign it to the current node
        root.val = q.shift()!;
    }

    // invert nodes in the right subtree
    invertBinaryTree(root.right, q, !level);
}

/* Construct the following tree
              1
           /     \
         /         \
       2             3
     /   \         /   \
    4     5       6     7
  /  \    / \    / \    / \
 8    9  10 11 12  13  14 15
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
root.left.left.left = new TreeNode(8);
root.left.left.right = new TreeNode(9);
root.left.right.left = new TreeNode(10);
root.left.right.right = new TreeNode(11);
root.right.left.left = new TreeNode(12);
root.right.left.right = new TreeNode(13);
root.right.right.left = new TreeNode(14);
root.right.right.right = new TreeNode(15);

invertBinaryTree(root);
levelOrderTraversal(root);
```

**Output:** 1 3 2 4 5 6 7 15 14 13 12 11 10 9 8
