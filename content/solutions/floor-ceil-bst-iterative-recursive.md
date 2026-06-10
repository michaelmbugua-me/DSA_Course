# Find Floor and Ceil in a Binary Search Tree

> Source: https://www.techiedelight.com/floor-ceil-bst-iterative-recursive/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST, find the floor and ceil of a given key in it. If the given key lies in the BST, then both floor and ceil are equal to that key; otherwise, the ceil is equal to the next greater key (if any) in the BST, and the floor is equal to the previous greater key (if any) in the BST.

For example, consider the following tree:

The floor of 1 does not exist, ceil of 1 is 2 The floor of 3 is 2, ceil of 3 is 4 The floor of 9 is 9, ceil of 9 is 9 The floor of 7 is 6, ceil of 7 is 8

> 

The idea is simple – search for the given key in the tree and update the ceil to the current node before visiting its left subtree. Similarly, update the floor to the current node before visiting its right subtree. If the key is found in the BST, then the floor and ceil are equal to that key. If the key is not found in the BST, then the floor and ceil were already updated while searching for the key.

Following is the iterative implementation of the above approach in TypeScript:

```ts
// A class to store a BST node
class Node {
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Iterative function to insert a key into a BST
function insert(root: Node | null, key: number): Node {

    // if the root is null, create a new node and return it
    if (root === null) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root.data) {
        root.left = insert(root.left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        root.right = insert(root.right, key);
    }

    return root;
}

// Iterative function to find the floor and ceil of a given key in a BST
function findFloorCeil(root: Node | null, key: number): [Node | null, Node | null] {
    let floor: Node | null = null;
    let ceil: Node | null = null;

    while (root !== null) {
        // if a node with the desired value is found, both floor and ceil is equal
        // to the current node
        if (root.data === key) {
            floor = root;
            ceil = root;
            break;
        }

        // if the given key is less than the root node, visit the left subtree
        else if (key < root.data) {
            // update ceil to the current node before visiting the left subtree
            ceil = root;
            root = root.left;
        }

        // if the given key is more than the root node, visit the right subtree
        else {
            // update floor to the current node before visiting the right subtree
            floor = root;
            root = root.right;
        }
    }

    return [floor, ceil];
}

/* Construct the following tree
           8
         /   \
        /     \
       4       10
      / \     /  \
     /   \   /    \
    2     6 9     12
*/

const keys = [2, 4, 6, 8, 9, 10, 12];

let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

// find the ceil and floor for each key
for (let i = 0; i < 15; i++) {
    const [floor, ceil] = findFloorCeil(root, i);

    console.log(`${i} —> Floor is ${floor ? floor.data : -1} and Ceil is ${ceil ? ceil.data : -1}`);
}
```

**Output:** 0 —> Floor is -1, Ceil is 2 1 —> Floor is -1, Ceil is 2 2 —> Floor is 2, Ceil is 2 3 —> Floor is 2, Ceil is 4 4 —> Floor is 4, Ceil is 4 5 —> Floor is 4, Ceil is 6 6 —> Floor is 6, Ceil is 6 7 —> Floor is 6, Ceil is 8 8 —> Floor is 8, Ceil is 8 9 —> Floor is 9, Ceil is 9 10 —> Floor is 10, Ceil is 10 11 —> Floor is 10, Ceil is 12 12 —> Floor is 12, Ceil is 12 13 —> Floor is 12, Ceil is -1 14 —> Floor is 12, Ceil is -1

The time complexity of the above solution is O(n), where `n` is the size of the BST. The auxiliary space required by the program is O(1).

Following is the recursive TypeScript implementation of the idea:

```ts
// A class to store a BST node
class Node {
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to insert a key into a BST
function insert(root: Node | null, key: number): Node {

    // if the root is null, create a new node and return it
    if (root === null) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root.data) {
        root.left = insert(root.left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        root.right = insert(root.right, key);
    }

    return root;
}

// Recursive function to find the floor and ceil of a given key in a BST
function findFloorCeil(root: Node | null, floor: Node | null, ceil: Node | null, key: number): [Node | null, Node | null] {

    // base case
    if (root === null) {
        return [floor, ceil];
    }

    // if a node with the desired value is found, both floor and ceil is equal
    // to the current node
    if (root.data === key) {
        return [root, root];
    }

    // if the given key is less than the root node, recur for the left subtree
    else if (key < root.data) {
        // update ceil to the current node before visiting the left subtree
        return findFloorCeil(root.left, floor, root, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        // update floor to the current node before visiting the right subtree
        return findFloorCeil(root.right, root, ceil, key);
    }
}

/* Construct the following tree
           8
         /   \
        /     \
       4       10
      / \     /  \
     /   \   /    \
    2     6 9     12
*/

const keys = [2, 4, 6, 8, 9, 10, 12];

let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

// calculate the ceil and floor for each key
for (let i = 0; i < 15; i++) {
    const [floor, ceil] = findFloorCeil(root, null, null, i);

    console.log(`${i} —> Floor is ${floor ? floor.data : -1} and Ceil is ${ceil ? ceil.data : -1}`);
}
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.
