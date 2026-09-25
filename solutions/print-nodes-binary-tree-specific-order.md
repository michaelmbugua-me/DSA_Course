# Print all nodes of a perfect binary tree in a specific order

> Source: https://www.techiedelight.com/print-nodes-binary-tree-specific-order/

Given a perfect binary tree, print the values of alternating left and right nodes for each level in a top-down and bottom-up manner.

For example, there are two ways to print the following tree:

Variation 1: Print Top-Down

`(1, 2, 3, 4, 7, 5, 6, 8, 15, 9, 14, 10, 13, 11, 12)`

Variation 2: Print Bottom-Up

`(8, 15, 9, 14, 10, 13, 11, 12, 4, 7, 5, 6, 2, 3, 1)`

## Variation 1: Print Top-Down

> 

The idea is to modify [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) by maintaining two [queues](https://techiedelight.com/circular-queue-implementation-c/). We process two nodes each from one queue and enqueue the left and right child of the first popped node into the first queue and the right and left child of the second popped node into the second queue.

Following is a TypeScript implementation based on the above idea:

```ts
// A class to store a binary tree node
class TreeNode {
    key: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(key: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

// Function to print all nodes of a given binary tree in a specific
// order from top to bottom
function printNodes(root: TreeNode | null): void {

    // return if the tree is empty
    if (root === null) {
        return;
    }

    // print the root node
    process.stdout.write(root.key + ' ');

    // create two empty queues and enqueue root's left and
    // right child, respectively
    const q1: TreeNode[] = [];
    const q2: TreeNode[] = [];

    if (root.left && root.right) {
        q1.push(root.left);
        q2.push(root.right);
    }

    // loop till queue is empty
    while (q1.length > 0) {

        // calculate the total number of nodes at the current level
        const n = q1.length;

        // process every node of the current level
        for (let k = 0; k < n; k++) {

            // dequeue front node from the first queue and print it
            const x = q1.shift();
            if (x === undefined) {
                break;
            }

            process.stdout.write(x.key + ' ');

            // enqueue left and right child of `x` to the first queue
            if (x.left) {
                q1.push(x.left);
            }

            if (x.right) {
                q1.push(x.right);
            }

            // dequeue front node from the second queue and print it
            const y = q2.shift();
            if (y === undefined) {
                break;
            }

            process.stdout.write(y.key + ' ');

            // enqueue right and left child of `y` to the second queue
            if (y.right) {
                q2.push(y.right);
            }

            if (y.left) {
                q2.push(y.left);
            }
        }
    }
}

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

printNodes(root);
```

**Output:** 1 2 3 4 7 5 6 8 15 9 14 10 13 11 12

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## Variation 2: Print Bottom-Up

> 

The idea is to store nodes of every level in the desired order in a map and finally print nodes from the map for each level, starting from the last level to the first level.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    key: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(key: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

// Function to print all nodes of a given binary tree in
// a specific order from bottom to top
function printNodes(root: TreeNode | null): void {

    // return if the tree is empty
    if (root === null) {
        return;
    }

    // start with level 1 (of the root node)
    let level = 1;

    // create an empty dictionary of integers (every key can be
    // associated with multiple values)
    const d = new Map<number, number[]>();

    // insert the root node at the first level
    d.set(level, [root.key]);

    // create two empty queues and enqueue root's left and
    // right child, respectively
    const q1: TreeNode[] = [];
    const q2: TreeNode[] = [];

    if (root.left && root.right) {
        q1.push(root.left);
        q2.push(root.right);
    }

    // loop till queue is empty
    while (q1.length > 0) {

        // increment level by 1
        level = level + 1;

        // calculate the total number of nodes at the current level
        let n = q1.length;

        // process every node of the current level
        while (n > 0) {

            // dequeue front node from the first queue and insert it into the dictionary
            const x = q1.shift();
            if (x === undefined) {
                break;
            }
            const values = d.get(level) ?? [];
            d.set(level, values);
            values.push(x.key);

            // enqueue left and right child of `x` to the first queue
            if (x.left) {
                q1.push(x.left);
            }

            if (x.right) {
                q1.push(x.right);
            }

            // dequeue front node from the second queue
            const y = q2.shift();
            if (y === undefined) {
                break;
            }

            // insert the dequeued node into the dictionary
            values.push(y.key);

            // enqueue right and left child of `y` to the second queue
            if (y.right) {
                q2.push(y.right);
            }

            if (y.left) {
                q2.push(y.left);
            }

            n = n - 1;
        }
    }

    // iterate through the dictionary and print all nodes present at every level
    for (const i of [...d.keys()].reverse()) {
        process.stdout.write(JSON.stringify(d.get(i)));
    }
}

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

printNodes(root);
```

**Output:** 8 15 9 14 10 13 11 12 4 7 5 6 2 3 1

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:** Modify the solution to print using only one queue
