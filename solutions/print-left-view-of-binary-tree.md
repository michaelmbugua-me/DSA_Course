# Print left view of a binary tree

> Source: https://www.techiedelight.com/print-left-view-of-binary-tree/

Given a binary tree, write an efficient algorithm to print its left view.

For example, the left view of the following binary tree is `1, 2, 4, 7`:

> 

## 1\. Iterative Implementation

In the iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. We can modify level order traversal to maintain nodes at the current level. Then if the current node is the first node of the current level, print it.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Iterative function to print the left view of a given binary tree
function leftView(root: TreeNode | null): void {

    // return if the tree is empty
    if (root === null) {
        return;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [root];

    // loop till queue is empty
    while (queue.length > 0) {

        // calculate the total number of nodes at the current level
        const size = queue.length;
        let i = 0;

        // process every node of the current level and enqueue their
        // non-empty left and right child
        while (i < size) {
            // pointer to store the current node
            const curr = queue.shift()!;
            i = i + 1;

            // if this is the first node of the current level, print it
            if (i === 1) {
                process.stdout.write(curr.key + ' ');
            }

            if (curr.left) {
                queue.push(curr.left);
            }

            if (curr.right) {
                queue.push(curr.right);
            }
        }
    }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

leftView(root);
```

**Output:** 1 2 4 7

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 2\. Recursive implementation using hashing

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and pass level information in [function arguments](https://techiedelight.com/difference-between-argument-parameter/#Argument). If the level is visited for the first time, insert the current node and level information into the map. Finally, when all nodes are processed, traverse the map and print the left view.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Recursive function to traverse the nodes in a preorder fashion
function leftView(root: TreeNode | null, level: number, d: Map<number, number>): void {

    // base case
    if (root === null) {
        return;
    }

    // if the level is visited for the first time, insert the current node
    // and level information into the dictionary
    if (!d.has(level)) {
        d.set(level, root.key);
    }

    leftView(root.left, level + 1, d);
    leftView(root.right, level + 1, d);
}

// Function to print the left view of a given binary tree
function printLeftView(root: TreeNode | null): void {

    // create an empty dictionary to store the first node for each level
    const d = new Map<number, number>();

    // traverse the tree and fill the dictionary
    leftView(root, 1, d);

    // iterate through the dictionary in sorted order of its keys
    // and print the left view
    for (let i = 1; i <= d.size; i++) {
        process.stdout.write(d.get(i) + ' ');
    }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

printLeftView(root);
```

**Output:** 1 2 4 7

We can also traverse nodes in reverse preorder fashion, as shown below:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

function leftView(root: TreeNode | null, level: number, d: Map<number, number>): void {
    if (root === null) {
        return;
    }

    // insert the current node and level information into the map
    d.set(level, root.key);

    // recur for the right subtree before the left subtree
    leftView(root.right, level + 1, d);
    leftView(root.left, level + 1, d);
}
```
