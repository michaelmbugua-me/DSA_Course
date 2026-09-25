# Check if a binary tree is a complete binary tree or not

> Source: https://www.techiedelight.com/check-given-binary-tree-complete-binary-tree-not/

Given a binary tree, check if it is a complete binary tree or not.

A complete binary tree is a binary tree in which every level, except possibly the last, is filled, and all nodes are as far left as possible. For example, the following binary trees are complete:

> 

## 1\. Level Order Traversal (BFS)

We can modify [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) to check if a given binary tree is a complete binary tree or not. The idea is for every dequeued node, check if it is a full node (have both left and right children). If a node is found that is not a full node, i.e., either it has no children or only one child, then all the remaining nodes in the queue should not have any children. If anyone has a child, then it’s not a complete binary tree; otherwise, it is.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Function to check if a given binary tree is complete or not
const isComplete = (root: TreeNode | null): boolean => {

    // return if the tree is empty
    if (root === null) {
        return true;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [];
    queue.push(root);

    // flag to mark the end of full nodes
    let flag = false;

    // loop till queue is empty
    while (queue.length > 0) {

        // dequeue front node
        const front = queue.shift()!;

        // if we have encountered a non-full node before and the current node
        // is not a leaf, a tree cannot be complete
        if (flag && (front.left || front.right)) {
            return false;
        }

        // if the left child is empty and the right child exists,
        // a tree cannot be complete
        if (front.left === null && front.right) {
            return false;
        }

        // if the left child exists, enqueue it
        if (front.left) {
            queue.push(front.left);
        }
        // if the current node is a non-full node, set the flag to true
        else {
            flag = true;
        }

        // if the right child exists, enqueue it
        if (front.right) {
            queue.push(front.right);
        }
        // if the current node is a non-full node, set the flag to true
        else {
            flag = true;
        }
    }

    return true;
};

/* Construct the following tree
          1
       /    \
      2      3
     / \    / \
    4   5  6   7
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

if (isComplete(root)) {
    console.log('Complete binary tree');
}
else {
    console.log('Not a complete binary tree');
}
```

**Output:** Complete binary tree

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 2\. Array representation of a complete tree

We can solve this problem by using the properties of a complete binary tree. We know that in the array representation of a binary tree, the left child for a node at index `i` is present at index `2i+1`, and the right child is present at index `2i+2`. If we construct an array with all the tree elements at the corresponding positions, then the elements will hold consecutive positions for a complete binary tree. If any vacant position is found, then the tree cannot be complete.

Following is a TypeScript implementation based on the above idea:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Utility function to calculate the total number of nodes in a binary tree
const size = (root: TreeNode | null): number => {
    if (root === null) {
        return 0;
    }
    return 1 + size(root.left) + size(root.right);
};

// Perform inorder traversal on the binary tree and fill list `A`
const inorder = (root: TreeNode | null, A: boolean[], i: number): void => {

    if (root === null || i >= A.length) {
        return;
    }

    // recur with index `2i+1` for left node
    inorder(root.left, A, 2 * i + 1);

    // mark index `i` as visited
    A[i] = true;

    // recur with index `2i+2` for the right node
    inorder(root.right, A, 2 * i + 2);
};

// Function to check if a given binary tree is a complete binary tree or not
const isComplete = (root: TreeNode | null, n: number): boolean => {

    // return if the tree is empty
    if (root === null) {
        return true;
    }

    // construct an auxiliary space of size `n`
    const A: boolean[] = new Array(n).fill(false);

    // fill list `A`
    inorder(root, A, 0);

    // check if all positions in the list are filled or not
    for (const e of A) {
        if (!e) {
            return false;
        }
    }

    return true;
};

/* Construct the following tree
          1
       /    \
      2      3
     / \    / \
    4   5  6   7
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

if (isComplete(root, size(root))) {
    console.log('Complete binary tree');
}
else {
    console.log('Not a complete binary tree');
}
```

**Output:** Complete binary tree

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 3\. Space-optimized previous Approach

The above approach takes extra space for storage of the boolean array. As discussed for a complete binary tree, the left and right child’s index for any node is less than the total number of nodes for every node. We can avoid using extra space by passing the index as a recursion parameter and checking for every node that their left and right child’s index are within the correct range.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public key: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Recursive function to check if a given binary tree is a complete tree or not
const isComplete = (root: TreeNode | null, i: number, n: number): boolean => {

    // return if the tree is empty
    if (root === null) {
        return true;
    }

    if ((root.left && 2 * i + 1 >= n) || !isComplete(root.left, 2 * i + 1, n)) {
        return false;
    }

    if ((root.right && 2 * i + 2 >= n) || !isComplete(root.right, 2 * i + 2, n)) {
        return false;
    }

    return true;
};

// Utility function to calculate the total number of nodes in a binary tree
const size = (root: TreeNode | null): number => {

    // base case
    if (root === null) {
        return 0;
    }

    return 1 + size(root.left) + size(root.right);
};

/* Construct the following tree
          1
       /    \
      2      3
     / \    / \
    4   5  6   7
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

if (isComplete(root, 0, size(root))) {
    console.log('Complete binary tree');
}
else {
    console.log('Not a complete binary tree');
}
```

**Output:** Complete binary tree
