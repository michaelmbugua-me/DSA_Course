# Spiral order traversal of a binary tree

> Source: https://www.techiedelight.com/spiral-order-traversal-binary-tree/

Given a binary tree, print its nodes level by level in spiral order, i.e., all nodes present at level 1 should be printed first from left to right, followed by nodes of level 2 from right to left, followed by nodes of level 3 from left to right and so on… In other words, odd levels should be printed from left to right, and even levels should be printed from right to left or vice versa.

For example, the spiral [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) for the following tree is

`(1, 3, 2, 4, 5, 6, 7)` or `(1, 2, 3, 7, 6, 5, 4)`

> 

A simple solution is to print all nodes of level 1 first, followed by level 2, … till level `h`, where `h` is the tree’s height. We can print all nodes present in a level by modifying the [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree. Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Function to print all nodes of a given level from left to right
function printLevelLeftToRight(root: TreeNode | null, level: number): boolean {

    if (root === null) {
        return false;
    }

    if (level === 1) {
        process.stdout.write(`${root.key} `);
        return true;
    }

    // process left child before the right child
    const left = printLevelLeftToRight(root.left, level - 1);
    const right = printLevelLeftToRight(root.right, level - 1);

    return left || right;
}

// Function to print all nodes of a given level from right to left
function printLevelRightToLeft(root: TreeNode | null, level: number): boolean {

    if (root === null) {
        return false;
    }

    if (level === 1) {
        process.stdout.write(`${root.key} `);
        return true;
    }

    // process right child before the left child
    const right = printLevelRightToLeft(root.right, level - 1);
    const left = printLevelRightToLeft(root.left, level - 1);

    return right || left;
}

// Function to print level order traversal of a given binary tree
function spiralOrderTraversal(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    // start from level 1 — till the height of the tree
    let level = 1;

    // run till either function returns false
    let process = true;

    while (process) {
        process = printLevelLeftToRight(root, level);
        level = level + 1;

        if (process) {
            process = printLevelRightToLeft(root, level);
            level = level + 1;
        }
    }
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left!.left = new TreeNode(8);
root.left!.right = new TreeNode(12);
root.right!.left = new TreeNode(16);
root.right!.right = new TreeNode(25);

spiralOrderTraversal(root);
```

**Output:** 15 20 10 8 12 16 25

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree.

We can reduce the time complexity to O(n) by using extra space. Following is a pseudocode for a simple [queue](https://techiedelight.com/circular-queue-implementation-c/)-based spiral order traversal:

**levelorder(root)** q —> empty double ended queue q.push(root) while (not q.isEmpty()) while (level is even) node —> q.popFront() visit(node) if (node.left <> null) q.pushBack(node.left) if (node.right <> null) q.pushBack(node.right) while (level is odd) node —> q.popBack() visit(node) if (node.right <> null) q.pushFront(node.right) if (node.left <> null) q.pushFront(node.left)

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Function to print spiral order traversal of a given binary tree
function spiralOrderTraversal(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    // create an empty double-ended queue and enqueue the root node
    const deque: TreeNode[] = [];       // or use deque
    deque.unshift(root);

    // `flag` is used to differentiate between odd or even level
    let flag = true;

    // loop till deque is empty
    while (deque.length > 0) {

        // calculate the total number of nodes at the current level
        let nodeCount = deque.length;

        // print left to right
        if (flag) {
            // process each node of the current level and enqueue their
            // non-empty left and right child to deque
            while (nodeCount > 0) {
                // pop from the front if `flag` is true
                const curr = deque.shift()!;
                process.stdout.write(`${curr.key} `);

                // it is important to push the left child into the back,
                // followed by the right child

                if (curr.left !== null) {
                    deque.push(curr.left);
                }

                if (curr.right !== null) {
                    deque.push(curr.right);
                }

                nodeCount--;
            }
        }

        // print right to left
        else {
            // process each node of the current level and enqueue their
            // non-empty right and left child
            while (nodeCount > 0) {
                // it is important to pop from the back
                const curr = deque.pop()!;
                process.stdout.write(`${curr.key} `);   // print front node

                // it is important to push the right child at the front,
                // followed by the left child

                if (curr.right !== null) {
                    deque.unshift(curr.right);
                }

                if (curr.left !== null) {
                    deque.unshift(curr.left);
                }

                nodeCount--;
            }
        }

        // flip the flag for the next level
        flag = !flag;
        console.log();
    }
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left!.left = new TreeNode(8);
root.left!.right = new TreeNode(12);
root.right!.left = new TreeNode(16);
root.right!.right = new TreeNode(25);

spiralOrderTraversal(root);
```

**Output:** 15 20 10 8 12 16 25

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The following code traverses the tree in a preorder fashion and uses a map to store every node and its level using the level number as a key. This approach is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Traverse the tree in a preorder fashion and store nodes in a map
// corresponding to their level
function preorder(root: TreeNode | null, level: number, map: Map<number, number[]>): void {

    // base case: empty tree
    if (root === null) {
        return;
    }

    if (!map.has(level)) {
        map.set(level, []);
    }

    // insert the current node and its level into the map

    // if the level is odd, insert at the back; otherwise, insert at front
    if (level & 1) {
        map.get(level)!.push(root.key);
    }
    else {
        map.get(level)!.unshift(root.key);
    }

    // recur for the left and right subtree by increasing the level by 1
    preorder(root.left, level + 1, map);
    preorder(root.right, level + 1, map);
}

// Recursive function to print spiral order traversal of a given binary tree
function levelOrderTraversal(root: TreeNode | null): void {

    // create an empty map to store nodes between given levels
    const map = new Map<number, number[]>();

    // traverse the tree and insert its nodes into the map
    // corresponding to their level
    preorder(root, 1, map);

    // iterate through the map and print all nodes present at every level
    for (let i = 1; map.has(i) && map.get(i)!.length > 0; i++) {
        process.stdout.write(`Level ${i}: `);
        for (const j of map.get(i)!) {
            process.stdout.write(`${j} `);
        }
        console.log();
    }
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left!.left = new TreeNode(8);
root.left!.right = new TreeNode(12);
root.right!.left = new TreeNode(16);
root.right!.right = new TreeNode(25);
root.left!.left!.left = new TreeNode(20);
root.right!.right!.right = new TreeNode(30);

levelOrderTraversal(root);
```

**Output:** Level 1: 15 Level 2: 20 10 Level 3: 8 12 16 25 Level 4: 30 20
