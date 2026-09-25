# Perform vertical traversal of a binary tree

> Source: https://www.techiedelight.com/vertical-traversal-binary-tree/

Given a binary tree, perform vertical traversal on it. In a vertical traversal, nodes of a binary tree are processed in vertical order from left to right. Assume that the left and right child makes a 45–degree angle with the parent.

For example, a vertical traversal of the following binary tree is

2, 7 1, 5 3, 8 6

> 

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). This post provides an overview of some available alternatives to accomplish this using hashing.

## 1\. Using Preorder Traversal

The idea is to create an empty map where each key represents the relative horizontal distance of a node from the root node, and the value in the map maintains all nodes present at the same horizontal distance. Then perform a [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) of the tree, and update the map. For each node, recur for its left subtree by decreasing horizontal distance by 1 and recur for the right subtree by increasing horizontal distance by 1. For the above binary tree, the final values in the map will be:

(horizontal distance —> Nodes) -1 —> [2, 7] 0 —> [1, 5] 1 —> [3, 8] 2 —> [6]

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class Node {
    constructor(public key: number, public left: Node | null = null, public right: Node | null = null) {}
}

// Recursive function to perform preorder traversal on the tree and fill the map.
// Here, the node has `dist` horizontal distance from the tree's root
function printVertical(node: Node | null, dist: number, map: Map<number, number[]>): void {
    // base case: empty tree
    if (node === null) {
        return;
    }

    // insert nodes present at a current horizontal distance into the map
    if (!map.has(dist)) {
        map.set(dist, []);
    }
    map.get(dist).push(node.key);

    // recur for the left subtree by decreasing horizontal distance by 1
    printVertical(node.left, dist - 1, map);

    // recur for the right subtree by increasing horizontal distance by 1
    printVertical(node.right, dist + 1, map);
}

// Function to perform vertical traversal on a given binary tree
function printVerticalTree(root: Node | null): void {
    // create an empty map where
    // key —> relative horizontal distance of the node from the root node, and
    // value —> nodes present at the same horizontal distance
    const map = new Map<number, number[]>();

    // perform preorder traversal on the tree and fill the map
    printVertical(root, 0, map);

    // traverse the map and print vertical nodes
    for (const dist of [...map.keys()].sort((a, b) => a - b)) {
        console.log(map.get(dist));
    }
}

/*
 Construct the following tree
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
           /   \
          /     \
         9      10
 */

const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.right.left = new Node(5);
root.right.right = new Node(6);
root.right.left.left = new Node(7);
root.right.left.right = new Node(8);
root.right.left.right.left = new Node(9);
root.right.left.right.right = new Node(10);

printVerticalTree(root);
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

## 2\. Using Level Order Traversal

Since the above solution uses preorder traversal to traverse the tree, the nodes might not get processed in the same order as they appear in the binary tree from top to bottom. For instance, node 10 is printed before node 6 in the above solution.

We can perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) to ensure that nodes are processed in the same order as they appear in the binary tree. The idea remains the same as the previous approach – create an empty map whose each key represents the relative horizontal distance of a node from the root node, and the value in the map maintains all nodes present at the same horizontal distance. The only difference is that the binary tree is traversed using level order traversal instead of the preorder traversal.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class Node {
    constructor(public key: number, public left: Node | null = null, public right: Node | null = null) {}
}

// Function to perform vertical traversal on a given binary tree
function printVertical(root: Node | null): void {
    // base case
    if (root === null) {
        return;
    }

    // create a map to store the vertical order of binary tree nodes
    const map = new Map<number, number[]>();

    // create an empty queue for level order traversal.
    // `It` stores binary tree nodes and their horizontal distance from the root.
    const q: [Node, number][] = [];

    // enqueue root node with horizontal distance as 0
    q.push([root, 0]);

    // loop till queue is empty
    while (q.length > 0) {
        // dequeue front node
        const [node, dist] = q.shift();

        // insert front node value into the map using its horizontal distance
        // as the key
        if (!map.has(dist)) {
            map.set(dist, []);
        }
        map.get(dist).push(node.key);

        // enqueue non-empty left and right child of the front node
        // with their corresponding horizontal distance
        if (node.left) {
            q.push([node.left, dist - 1]);
        }

        if (node.right) {
            q.push([node.right, dist + 1]);
        }
    }

    // print the map
    for (const dist of [...map.keys()].sort((a, b) => a - b)) {
        console.log(map.get(dist));
    }
}

/*
 Construct the following tree
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
           /   \
          /     \
         9      10
 */

const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.right.left = new Node(5);
root.right.right = new Node(6);
root.right.left.left = new Node(7);
root.right.left.right = new Node(8);
root.right.left.right.left = new Node(9);
root.right.left.right.right = new Node(10);

printVertical(root);
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

**Linear Time Solution:**

> [Print nodes of a binary tree in vertical order](https://techiedelight.com/print-nodes-binary-tree-vertical-order/)

**Exercise:** Reduce time complexity to linear using `std::unordered_map`/`HashMap`.
