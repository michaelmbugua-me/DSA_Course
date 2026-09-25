# Check if two binary trees are identical or not – Iterative and Recursive

> Source: https://www.techiedelight.com/check-if-two-binary-trees-are-identical-not-iterative-recursive/

Write an efficient algorithm to check if two binary trees are identical or not. Two binary trees are identical if they have identical structure and their contents are also the same.

**Input:** 1 1 / \ / \ 2 3 2 3 / \ / \ / \ / \ 4 5 6 7 4 5 6 7 **Output:** True **Explanation:** Both binary trees have the same structure and contents. **Input:** 1 1 / \ / \ 2 3 2 3 / \ / \ / \ / 4 5 6 7 4 5 6 **Output:** False **Explanation:** Both binary trees have different structures. **Input:** 1 1 / \ / \ 2 3 2 3 / \ / \ / \ / \ 4 5 6 7 4 5 6 8 **Output:** False **Explanation:** Both binary trees have the same structure but differ in nodes’ values.

> 

## Recursive Solution

The idea is to traverse both trees and compare values at their root node. If the value matches, recursively check if the first tree’s left subtree is identical to the left subtree of the second tree and the right subtree of the first tree is identical to the right subtree of the second tree. If the value at their root node differs, the trees violate data property. If at any point in the recursion, the first tree is empty and the second tree is non-empty, or the second tree is empty and the first tree is non-empty, the trees violate structural property, and they cannot be identical.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Recursive function to check if two given binary trees are identical or not
const isIdentical = (x: TreeNode | null, y: TreeNode | null): boolean => {

    // if both trees are empty, return true
    if (x === null && y === null) {
        return true;
    }

    // if both trees are non-empty and the value of their root node matches,
    // recur for their left and right subtree
    return x !== null && y !== null && x.key === y.key &&
        isIdentical(x.left, y.left) && isIdentical(x.right, y.right);
};

// demo

// construct the first tree
const x = new TreeNode(15);
x.left = new TreeNode(10);
x.right = new TreeNode(20);
x.left.left = new TreeNode(8);
x.left.right = new TreeNode(12);
x.right.left = new TreeNode(16);
x.right.right = new TreeNode(25);

// construct the second tree
const y = new TreeNode(15);
y.left = new TreeNode(10);
y.right = new TreeNode(20);
y.left.left = new TreeNode(8);
y.left.right = new TreeNode(12);
y.right.left = new TreeNode(16);
y.right.right = new TreeNode(25);

if (isIdentical(x, y)) {
    console.log('The given binary trees are identical');
} else {
    console.log('The given binary trees are not identical');
}
```

## Iterative Solution

In an iterative version, we use the [stack data structure](https://techiedelight.com/stack-implementation/) similar to the implicit recursive stack. The implementation can be seen below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Iterative function to check if two given binary trees are identical or not
const isIdentical = (x: TreeNode | null, y: TreeNode | null): boolean => {

    // if both trees are empty, return true
    if (x === null && y === null) {
        return true;
    }

    // if the first tree is empty (and the second tree is non-empty), return false
    if (x === null) {
        return false;
    }

    // if the second tree is empty (and the first tree is non-empty), return false
    if (y === null) {
        return false;
    }

    // create a stack to hold node pairs
    const stack: [TreeNode, TreeNode][] = [];
    stack.push([x, y]);

    // loop till stack is empty
    while (stack.length > 0) {
        // pop the top pair from the stack and process it
        const [x, y] = stack.pop();

        // if the value of their root node doesn't match, return false
        if (x.key !== y.key) {
            return false;
        }

        // if the left subtree of both `x` and `y` exists, push their addresses
        // to stack; otherwise, return false if only one left child exists
        if (x.left !== null && y.left !== null) {
            stack.push([x.left, y.left]);
        } else if (x.left !== null || y.left !== null) {
            return false;
        }

        // if the right subtree of both `x` and `y` exists, push their addresses
        // to stack; otherwise, return false if only one right child exists
        if (x.right !== null && y.right !== null) {
            stack.push([x.right, y.right]);
        } else if (x.right !== null || y.right !== null) {
            return false;
        }
    }

    // we reach here if both binary trees are identical
    return true;
};

// demo

// construct the first tree
const x = new TreeNode(15);
x.left = new TreeNode(10);
x.right = new TreeNode(20);
x.left.left = new TreeNode(8);
x.left.right = new TreeNode(12);
x.right.left = new TreeNode(16);
x.right.right = new TreeNode(25);

// construct the second tree
const y = new TreeNode(15);
y.left = new TreeNode(10);
y.right = new TreeNode(20);
y.left.left = new TreeNode(8);
y.left.right = new TreeNode(12);
y.right.left = new TreeNode(16);
y.right.right = new TreeNode(25);

if (isIdentical(x, y)) {
    console.log('The given binary trees are identical');
} else {
    console.log('The given binary trees are not identical');
}
```

The time and space complexity of both recursive and iterative solutions are linear in terms of the total number of nodes in two trees. The space used by the recursive routine is also proportional to the tree’s height, whereas the iterative version use O(n) space for the stack data structure.
