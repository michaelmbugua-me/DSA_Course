# Find a triplet with the given sum in a BST

> Source: https://www.techiedelight.com/find-triplet-with-given-sum-bst/

Given a binary search tree, find a triplet with a given sum present in it.

For example, consider the following BST. If the given sum is 20, the triplet is `(-40, 10, 50)`.

> 

A simple solution is to [traverse the BST in an inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and store all encountered nodes in an auxiliary array. This array would be already sorted since inorder traversal visits the nodes in increasing order of their values. Then for each element `A[i]` in the array `A`, [check if the triplet is formed](https://techiedelight.com/find-triplet-given-with-given-sum/) by `A[i]` and a pair from subarray `A[i+1…n-1]`.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a BST node
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

// Function to insert a given key at its correct position into the BST
const insert = (root: TreeNode | null, data: number): TreeNode => {
    if (root === null) {
        return new TreeNode(data);
    }

    if (data < root.data) {
        root.left = insert(root.left, data);
    } else {
        root.right = insert(root.right, data);
    }

    return root;
};

// Function to find a triplet in a list with a given sum. If a triplet is found,
// the function stores it in a tuple and returns true.
const findTriplet = (keys: number[], target: number): [number, number, number] | null => {
    // get the total number of nodes in the BST
    const n = keys.length;

    // check if a triplet is formed by `keys[i]` and a pair from `keys[i+1…n-1]`
    for (let i = 0; i <= n - 3; i++) {
        // remaining sum
        const k = target - keys[i];

        // maintain two indices pointing to endpoints of subarray `keys[i+1…n-1]`
        let low = i + 1;
        let high = n - 1;

        // loop till `low` is less than `high`
        while (low < high) {
            // increment `low` index if the total is less than the remaining sum
            if (keys[low] + keys[high] < k) {
                low = low + 1;
            }

            // decrement `high` index if the total is more than the remaining sum
            else if (keys[low] + keys[high] > k) {
                high = high - 1;
            }

            // triplet with the given sum found
            else {
                // create a tuple of the found triplet and return it
                return [keys[i], keys[low], keys[high]];
            }
        }
    }

    // no triplet found
    return null;
};

// Recursive function to push keys of a given BST into a list in an inorder fashion
const pushTreeNodes = (root: TreeNode | null, keys: number[]): void => {
    // base case
    if (root === null) {
        return;
    }

    pushTreeNodes(root.left, keys);
    keys.push(root.data);
    pushTreeNodes(root.right, keys);
};

// Function to print a triplet with the given sum in a given BST
const printTriplet = (root: TreeNode | null, target: number): void => {
    /* 1. Push keys of a given BST into a list in sorted order */

    const keys: number[] = [];
    pushTreeNodes(root, keys);

    /* 2: Find a triplet with the given sum in the List */

    // find triplet
    const triplet = findTriplet(keys, target);

    if (triplet !== null) {
        console.log(`Triplet found: (${triplet[0]}, ${triplet[1]}, ${triplet[2]})`);
    } else {
        console.log('Triplet not found');
    }
};

// input keys to construct a BST
const keys = [10, -15, 3, -40, 20, 15, 50];

// construct a BST from keys
let root: TreeNode | null = null;
for (const key of keys) {
    root = insert(root, key);
}

// triplet sum
const target = 20;

// print a triplet with the given sum
printTriplet(root, target);
```

**Output:** Triplet found: (-40, 10, 50)

The time complexity of the above solution is O(n2), where `n` is the size of the BST. The auxiliary space required by the program is O(n) for storing BST keys and for call stack.

We can avoid the extra space used for storing BST keys if we are allowed to modify the BST. The idea is to convert the given BST into a sorted doubly linked list and follow a similar routine to find a triplet as seen in the previous approach.

```ts
// A class to store a BST node
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

// Function to insert a given key at its correct position into the BST
const insert = (root: TreeNode | null, data: number): TreeNode => {
    if (root === null) {
        return new TreeNode(data);
    }

    if (data < root.data) {
        root.left = insert(root.left, data);
    } else {
        root.right = insert(root.right, data);
    }

    return root;
};

// Helper class holding the head and tail pointers of the doubly linked list
class Nodes {
    head: TreeNode | null = null;
    tail: TreeNode | null = null;
}

// Function to insert a BST node at the front of a doubly linked list
const push = (node: TreeNode, nodes: Nodes): void => {
    // update the right child of the given node to point to the current head
    node.right = nodes.head;

    // update the left child of the existing head node of the doubly linked list
    // to point to the new node
    if (nodes.head !== null) {
        nodes.head.left = node;
    }

    // update the tail pointer of the doubly linked list (updated only for the
    // first node)
    if (nodes.tail === null) {
        nodes.tail = node;
    }

    // finally, update the head pointer of the doubly linked list
    nodes.head = node;
};

/*
Recursive function to construct a sorted doubly linked list from a given BST
*/
const convertBSTtoDLL = (root: TreeNode | null, nodes: Nodes): void => {
    // Base case
    if (root === null) {
        return;
    }

    // recursively convert the right subtree
    convertBSTtoDLL(root.right, nodes);

    // push the current node at the front of the doubly linked list
    push(root, nodes);

    // recursively convert the left subtree
    convertBSTtoDLL(root.left, nodes);
};

// Returns true if a triplet with a given sum is found in the given BST
const findTriplet = (root: TreeNode | null, target: number): [number, number, number] | null => {
    /* 1. Convert the given BST into a sorted doubly linked list */

    const nodes = new Nodes();
    convertBSTtoDLL(root, nodes);
    let head = nodes.head;
    const tail = nodes.tail;

    /* 2: Find triplet with the given sum in doubly linked list */

    // loop till only 2 nodes are left
    while (head !== null && head.right !== tail) {
        // Assuming the current head node is part of the triplet, find the other
        // two nodes of the triplet in search space `[head.right, tail]`

        // maintain two pointers pointing to endpoints of the search space
        let start = head.right;
        let end = tail;

        // calculate the remaining sum
        const pair_sum = target - head.data;

        // reduce the search space `[start, end]` at each iteration of the loop
        while (start !== null && end !== null && start !== end) {
            // get the sum of the current start and end nodes
            const curr_sum = start.data + end.data;

            // if a pair with the desired sum is found in the BST
            if (curr_sum === pair_sum) {
                // create a tuple from the triplet and return true
                return [head.data, start.data, end.data];
            }

            // if the current sum is more than the desired sum, move left in the list
            else if (curr_sum > pair_sum) {
                end = end.left;
            }

            // if the current sum is less than the desired sum, move right in the list
            else {
                start = start.right;
            }
        }

        // move to the next node
        head = head.right;
    }

    // no triplet found
    return null;
};

// input keys to construct a BST
const keys = [10, -15, 3, -40, 20, 15, 50];

// construct a BST from keys
let root: TreeNode | null = null;
for (const key of keys) {
    root = insert(root, key);
}

// triplet sum
const target = 20;

// find triplet
const triplet = findTriplet(root, target);

// print the triplet
if (triplet !== null) {
    console.log(`Triplet found: (${triplet[0]}, ${triplet[1]}, ${triplet[2]})`);
} else {
    console.log('Triplet not found');
}
```

**Output:** Triplet found: (-40, 10, 50)

The time complexity of the above solution is O(n2), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

**Also See:**

> [Find a pair with the given sum in a BST](https://techiedelight.com/find-pair-with-given-sum-bst/)
