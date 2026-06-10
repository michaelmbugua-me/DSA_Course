# Efficiently print all nodes between two given levels in a binary tree

> Source: https://www.techiedelight.com/print-nodes-between-two-levels-binary-tree/

Given a binary tree, efficiently print all nodes in it between two given levels. The nodes for any level should be printed from left and right.

For example, if the starting level is 2 and the ending level is 3, the solution should print nodes in order `[2, 3, 4, 5, 6, 7]`.

> 

A simple solution would be to print all nodes of given levels one by one. We can print all nodes present in a level by modifying the [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) of the tree. The time complexity of this solution is O(n2), where `n` is the total number of nodes in the binary tree.

We can reduce the time complexity to O(n) by modifying the [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/). Following is a pseudocode for a modified level order traversal, which maintains the level of each node:

**levelorder(root, start, end)** q —> empty queue q.enqueue(root) level —> 0 while (not q.isEmpty()) size —> q.size() level = level + 1 while (size) node —> q.dequeue() if (level between start and end) print(node) if (node.left <> null) q.enqueue(node.left) if (node.right <> null) q.enqueue(node.right) size = size – 1

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

// Iterative function to print all nodes between two given
// levels in a binary tree
function printNodes(root: TreeNode | null, start: number, end: number): void {

    if (root === null) {
        return;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [root];

    // maintains the level of the current node
    let level = 0;

    // loop till queue is empty
    while (queue.length > 0) {

        // increment level by 1
        level = level + 1;

        // calculate the total number of nodes at the current level
        let size = queue.length;

        // process every node of the current level and enqueue their
        // non-empty left and right child
        while (size > 0) {
            size = size - 1;
            const curr = queue.shift();
            if (curr === undefined) {
                break;
            }

            // print the node if its level is between given levels
            if (level >= start && level <= end) {
                process.stdout.write(curr.key + ' ');
            }

            if (curr.left) {
                queue.push(curr.left);
            }

            if (curr.right) {
                queue.push(curr.right);
            }
        }

        if (level >= start && level <= end) {
            console.log();
        }
    }
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);
root.right.right.right = new TreeNode(30);

const start = 2;
const end = 3;

printNodes(root, start, end);
```

**Output:** 10 20 8 12 16 25

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store every node and its level in a [multimap](https://techiedelight.com/implement-multimap-java/) using the level number as a key. Finally, print all nodes corresponding to every level between given levels. Following is a TypeScript implementation of it:

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

// Traverse the tree in a preorder fashion and store nodes in a dictionary
// corresponding to their level
function findNodes(root: TreeNode | null, start: number, end: number, level: number, d: Map<number, number[]>): void {

    // base case: empty tree
    if (root === null) {
        return;
    }

    // push the current node into the dictionary corresponding to their level
    if (level >= start && level <= end) {
        const values = d.get(level) ?? [];
        d.set(level, values);
        values.push(root.key);
    }

    // recur for the left and right subtree by increasing the level by 1
    findNodes(root.left, start, end, level + 1, d);
    findNodes(root.right, start, end, level + 1, d);
}

// Recursive function to print all nodes between two given
// levels in a binary tree
function printNodes(root: TreeNode | null, start: number, end: number): void {

    // create an empty dictionary to store nodes between given levels
    const d = new Map<number, number[]>();

    // traverse the tree and insert its nodes into the dictionary
    // corresponding to their level
    findNodes(root, start, end, 1, d);

    // iterate through the dictionary and print all nodes between given levels
    for (let i = start; i <= end; i++) {
        if (d.has(i)) {
            console.log(`Level ${i}: ${d.get(i)}`);
        }
    }
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);
root.right.right.right = new TreeNode(30);

const start = 2;
const end = 3;

printNodes(root, start, end);
```

**Output:** Level 2: 10 20 Level 3: 8 12 16 25

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.
