# Find the vertical sum of a binary tree

> Source: https://www.techiedelight.com/find-vertical-sum-given-binary-tree/

Given a binary tree, the print vertical sum of it. Assume the left and right child of a node makes a 45–degree angle with the parent.

For example, the vertical sum is shown in the following binary tree:

> 

## 1\. Using Hashing

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to create an empty map where each key represents the relative horizontal distance of a node from the root node, and the value in the map maintains the sum of all nodes present at the same horizontal distance. Then perform [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree, and update the sum for the current horizontal distance in the map. For each node, recur for its left subtree by decreasing horizontal distance by one, and recur for the right subtree by increasing horizontal distance by one.

The following figure shows the horizontal distance and level of each node in the above binary tree. The final values in the map will be:

(horizontal distance —> vertical sum) -1 —> 9 0 —> 6 1 —> 11 2 —> 6

Following is a TypeScript program that demonstrates it:

```ts
// Data structure to store a binary tree node
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

// Recursive function to perform preorder traversal on the tree and fill the dictionary.
// Here, the node has `dist` horizontal distance from the tree's root
const printVerticalSum = (root: TreeNode | null, dist: number, d: Map<number, number>): void => {
    // base case: empty tree
    if (!root) {
        return;
    }

    // update the dictionary
    d.set(dist, (d.get(dist) ?? 0) + root.key);

    // recur for the left subtree by decreasing horizontal distance by 1
    printVerticalSum(root.left, dist - 1, d);

    // recur for the right subtree by increasing horizontal distance by 1
    printVerticalSum(root.right, dist + 1, d);
};

// Function to print the vertical sum of a given binary tree
const printVertical = (root: TreeNode | null): void => {
    // create an empty dictionary where
    // key —> relative horizontal distance of the node from the root node, and
    // value —> sum of all nodes present at the same horizontal distance
    const d = new Map<number, number>();

    // perform preorder traversal on the tree and fill the dictionary
    printVerticalSum(root, 0, d);

    // traverse the dictionary in sorted order of their keys
    // and print vertical sum
    for (const key of [...d.keys()].sort((a, b) => a - b)) {
        console.log(d.get(key));
    }
};

/* Construct the following tree
        1
      /   \
     /     \
    2       3
          /   \
         /     \
        5       6
      /   \
     /     \
    7       8
*/

const root = new TreeNode(1);
const left = new TreeNode(2);
const right = new TreeNode(3);
const rightLeft = new TreeNode(5);
const rightRight = new TreeNode(6);
const rightLeftLeft = new TreeNode(7);
const rightLeftRight = new TreeNode(8);

root.left = left;
root.right = right;
right.left = rightLeft;
right.right = rightRight;
rightLeft.left = rightLeftLeft;
rightLeft.right = rightLeftRight;

printVertical(root);
```

**Output:** 9 6 11 6

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:** Reduce time complexity to linear using a hash map.

## 2\. Using Auxiliary Data Structure

We can improve the time complexity of the above solution to linear by using a doubly-linked list data structure. The idea is to store the vertical sum of the binary tree in a doubly-linked list, where each node of the doubly linked list stores the sum of all nodes corresponding to a vertical line in a binary tree.

We start by constructing a doubly linked list node that stores the sum of nodes present at the vertical line passing through the root node. Then `node->prev` and `node->next` will correspond to the sum of nodes present at the vertical line passing through the root node’s left and right child, respectively. The trick is to recursively construct the linked list and update nodes with the vertical sums as we traverse the tree.

The algorithm can be implemented as follows in TypeScript:

```ts
// Data structure to store a binary tree node
class TreeNode {
    data: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// A Doubly Linked List Node
class ListNode {
    data: number;
    prev: ListNode | null;
    next: ListNode | null;
    constructor(data: number, prev: ListNode | null, next: ListNode | null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

// Function to print the vertical sum stored in a given doubly linked list
const printList = (mid: ListNode | null): void => {
    // find the head node
    while (mid && mid.prev) {
        mid = mid.prev;
    }

    // start with the head node
    let head = mid;
    while (head) {
        console.log(head.data);
        head = head.next;
    }
};

// Recursive function to perform preorder traversal on the tree and calculate
// the vertical sum of the given binary tree.
// Each node of the doubly linked list will store the sum of tree nodes at
// the corresponding vertical line in a binary tree.
const updateDLLwithVerticalSum = (root: TreeNode | null, curr: ListNode | null): void => {
    // base case
    if (!root || curr === null) {
        return;
    }

    // update the linked list node data corresponding to the vertical line
    // passing through the current tree node
    curr.data += root.data;

    // create a new linked list node corresponding to the vertical line passing
    // through the root's left child, if not already.
    // This node would be the `prev` pointer of the current list node

    if (root.left !== null) {
        if (curr.prev === null) {
            curr.prev = new ListNode(0, null, curr);
        }
        updateDLLwithVerticalSum(root.left, curr.prev);
    }

    // create a new linked list node corresponding to the vertical line passing
    // through the root's right child, if not already.
    // This node would be the next pointer of the current list node

    if (root.right !== null) {
        if (curr.next === null) {
            curr.next = new ListNode(0, curr, null);
        }
        updateDLLwithVerticalSum(root.right, curr.next);
    }
};

// Function to find and print the vertical sum of a given binary tree
const printVerticalSum = (root: TreeNode | null): void => {
    // base case
    if (!root) {
        return;
    }

    // create a new linked list node corresponding to the vertical line passing
    // through the root node
    const curr = new ListNode(0, null, null);

    // calculate the vertical sum and store it in a doubly-linked list
    updateDLLwithVerticalSum(root, curr);

    // print the linked list
    printList(curr);
};

/* Construct the following tree
        1
      /   \
     /     \
    2       3
          /   \
         /     \
        5       6
      /   \
     /     \
    7       8
*/

const root = new TreeNode(1);
const left = new TreeNode(2);
const right = new TreeNode(3);
const rightLeft = new TreeNode(5);
const rightRight = new TreeNode(6);
const rightLeftLeft = new TreeNode(7);
const rightLeftRight = new TreeNode(8);

root.left = left;
root.right = right;
right.left = rightLeft;
right.right = rightRight;
rightLeft.left = rightLeftLeft;
rightLeft.right = rightLeftRight;

printVerticalSum(root);
```

**Output:** 9 6 11 6

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for linked list nodes.

**Exercise:** [Extend the solution to print nodes in vertical order](https://techiedelight.com/vertical-traversal-binary-tree/)
