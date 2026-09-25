# Check if a binary tree is a min-heap or not

> Source: https://www.techiedelight.com/check-binary-tree-is-min-heap/

Given a binary tree, check if it is a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) or not. In order words, the binary tree must be a complete binary tree where each node has a higher value than its parent’s value.

For example, the following binary tree is a min-heap:

On the other hand, the following binary tree is not a min-heap:

> 

## 1\. Recursive Solution

The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/). The value of each encountered node should be less than its left or right child. If that is not the case for every internal node, the binary tree is not a min-heap.

To check for a complete binary tree, the left and right child’s index for any node is less than the total number of nodes for every node. We can pass the index as a recursion parameter and check for every node that their left and right child’s index is within the correct range.

The algorithm can be implemented in a way that both these properties can be checked in a single tree traversal. This is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public data: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Function to find the total number of nodes in a binary tree
const size = (root: TreeNode | null): number => {

    if (root === null) {
        return 0;
    }

    return 1 + size(root.left) + size(root.right);
};

// Function to check if a given binary tree is a complete binary tree
// and each node has a higher value than its parent
const isMinHeap = (root: TreeNode | null, i: number, n: number): boolean => {

    // base case
    if (root === null) {
        return true;
    }

    // not complete binary tree: out of valid index range
    if (i >= n) {
        return false;
    }

    // current node has a higher value than its left or right child
    if ((root.left !== null && root.left.data <= root.data) ||
            (root.right !== null && root.right.data <= root.data)) {
        return false;
    }

    // check for left and right subtree
    return isMinHeap(root.left, 2 * i + 1, n) && isMinHeap(root.right, 2 * i + 2, n);
};

// Function to check if a given binary tree is a min-heap or not
const isHeap = (root: TreeNode | null): boolean => {
    const i = 0;
    return isMinHeap(root, i, size(root));
};

/* Construct the following tree
           2
         /   \
        /     \
       3       4
      / \     / \
     /   \   /   \
    5     6 8    10
*/

const root = new TreeNode(2);
root.left = new TreeNode(3);
root.right = new TreeNode(4);
root.left.left = new TreeNode(5);
root.left.right = new TreeNode(6);
root.right.left = new TreeNode(8);
root.right.right = new TreeNode(10);

if (isHeap(root)) {
    console.log('The given binary tree is a min-heap');
}
else {
    console.log('The given binary tree is not a min-heap');
}
```

**Output:** The given binary tree is a min-heap

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

## 2\. Iterative Solution

The idea is to perform [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) for the given binary tree to check both structural and heap properties of a min-heap.

  1. To check for the structural property, simply check that no non-empty child is encountered for any node once an empty child is seen.
  2. To check for the heap property, check that both left and right children are greater than the parent node. This can be easily done while inserting the children into the queue.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public data: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Function to check if a given binary tree is a min-heap or not
const isHeap = (root: TreeNode | null): boolean => {

    // base case
    if (root === null) {
        return true;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [];
    queue.push(root);

    // take a boolean flag, which becomes true when an empty left or right
    // child is seen for a node
    let isNullSeen = false;

    // loop till queue is empty
    while (queue.length > 0) {

        // process front node in the queue
        const curr = queue.shift()!;

        // left child is non-empty
        if (curr.left !== null) {
            // if either heap property is violated
            if (isNullSeen || curr.left.data <= curr.data) {
                return false;
            }

            // enqueue left child
            queue.push(curr.left);
        }
        // left child is empty
        else {
            isNullSeen = true;
        }

        // right child is non-empty
        if (curr.right !== null) {
            // if either heap property is violated
            if (isNullSeen || curr.right.data <= curr.data) {
                return false;
            }

            // enqueue left child
            queue.push(curr.right);
        }
        // right child is empty
        else {
            isNullSeen = true;
        }
    }

    // we reach here only when the given binary tree is a min-heap
    return true;
};

/* Construct the following tree
           2
         /   \
        /     \
       3       4
      / \     / \
     /   \   /   \
    5     6 8    10
*/

const root = new TreeNode(2);
root.left = new TreeNode(3);
root.right = new TreeNode(4);
root.left.left = new TreeNode(5);
root.left.right = new TreeNode(6);
root.right.left = new TreeNode(8);
root.right.right = new TreeNode(10);

if (isHeap(root)) {
    console.log('The given binary tree is a min-heap');
}
else {
    console.log('The given binary tree is not a min-heap');
}
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for level order traversal, where `n` is the total number of nodes in the binary tree.

**Exercise:** Modify the solution to check the binary tree for max-heap.
