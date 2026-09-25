# Print right view of a binary tree

> Source: https://www.techiedelight.com/print-right-view-binary-tree/

Given a binary tree, write an efficient algorithm to print its right view.

For example, the right view of the following binary tree is `1, 3, 6, 8`:

> 

## 1\. Iterative Implementation using Queue

In an iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. The idea is to modify level order traversal to maintain nodes at the current level. Then if the current node is the last node of the current level, print it.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Iterative function to print the right view of a given binary tree
function printRightView(root: TreeNode | null): void {

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
        // non-empty right and right child
        while (i < size) {
            i = i + 1;

            // pointer to store the current node
            const curr = queue.shift()!;

            // if this is the last node of the current level, print it
            if (i === size) {
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

printRightView(root);
```

**Output:** 1 3 6 8

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 2\. Recursive Implementation using Hashing

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and pass level information in [function arguments](https://techiedelight.com/difference-between-argument-parameter/#Argument). For every node encountered, insert the node and level information into the map. Finally, when all nodes are processed, traverse the map and print the right view.

Following is a TypeScript implementation based on the above idea:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Traverse nodes in reverse preorder fashion
function printRightView(root: TreeNode | null, level: number, d: Map<number, number>): void {

    if (root === null) {
        return;
    }

    // insert the current node and level information into the dictionary
    d.set(level, root.key);

    // recur for the left subtree before the right subtree
    printRightView(root.left, level + 1, d);
    printRightView(root.right, level + 1, d);
}

// Function to print the right view of a given binary tree
function printRightViewTree(root: TreeNode | null): void {

    // create an empty dictionary to store the last node for each level
    const d = new Map<number, number>();

    // traverse the tree and fill the dictionary
    printRightView(root, 1, d);

    // iterate through the dictionary in sorted order of its keys and print
    // the right view
    console.log([...d.values()]);
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

printRightViewTree(root);
```

**Output:** 1 3 6 8

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 3\. Recursive Implementation (using Preorder Traversal)

We can also solve this problem by using constant space and linear time. The idea is to traverse the tree in reverse preorder fashion (visit the right subtree before the left subtree) and maintain the maximum level visited so far. If the current level is more than the maximum level visited so far, then the current node is the last node of the current level, and we print it and update the last level to the current level.

Following is a TypeScript implementation of the idea:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to print the right view of a given binary tree
function printRightView(root: TreeNode | null): void {
    let last_level = 0;

    // Recursive function to print the right view of a given binary tree
    function print(root: TreeNode | null, level: number): void {
        // base case: empty tree
        if (root === null) {
            return;
        }

        // if the current node is the last node of the current level
        if (last_level < level) {
            // print the node's data
            process.stdout.write(root.key + ' ');

            // update the last level to the current level
            last_level = level;
        }

        // recur for the right and left subtree by increasing level by 1
        print(root.right, level + 1);
        print(root.left, level + 1);
    }

    print(root, 1);
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

printRightView(root);
```

**Output:** 1 3 6 8
