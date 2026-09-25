# Level order traversal of a binary tree

> Source: https://www.techiedelight.com/level-order-traversal-binary-tree/

Given a binary tree, print its nodes level by level, i.e., print all nodes of level 1 first, followed by nodes of level 2 and so on… Print nodes for any level from left to right.

For example, the level order traversal for the following tree is `1, 2, 3, 4, 5, 6, 7`:

> 

We have already discussed [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) traversals of the binary tree, which are nothing but variations of [Depth–first search](https://techiedelight.com/depth-first-search/) of a Tree. Trees can also be traversed in level order, where we visit every node on a level before going to a lower level. This search is referred to as level order traversal or [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/), as the search tree is broadened as much as possible on each depth before going to the next depth.

A simple solution is to print all nodes of level 1 first, followed by level 2, until level `h`, where `h` is the tree’s height. We can print all nodes present in a level by modifying the preorder traversal on the tree. This is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
  constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to print all nodes of a given level from left to right
function printLevel(root: TreeNode | null, level: number): boolean {
  // base case
  if (root === null) {
    return false;
  }

  if (level === 1) {
    process.stdout.write(`${root.key} `);

    // return true if at least one node is present at a given level
    return true;
  }

  const left = printLevel(root.left, level - 1);
  const right = printLevel(root.right, level - 1);

  return left || right;
}

// Function to print level order traversal of a given binary tree
function levelOrderTraversal(root: TreeNode | null): void {
  // start from level 1 — till the height of the tree
  let level = 1;

  // run till printLevel() returns false
  while (printLevel(root, level)) {
    level = level + 1;
  }
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left!.left = new TreeNode(8);
root.left!.right = new TreeNode(12);
root.right!.left = new TreeNode(16);
root.right!.right = new TreeNode(25);

levelOrderTraversal(root);
```

**Output:** 15 10 20 8 12 16 25

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

We can reduce the time complexity to O(n) by using extra space. Following is a pseudocode for a simple [queue](https://techiedelight.com/circular-queue-implementation-c/)-based level order traversal, which requires space proportional to the maximum number of nodes at a given depth. It can be as much as half the total number of nodes.

**levelorder(root)** q —> empty queue q.enqueue(root) while (not q.isEmpty()) node —> q.dequeue() visit(node) if (node.left <> null) q.enqueue(node.left) if (node.right <> null) q.enqueue(node.right)

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
  constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to print level order traversal of a given binary tree
function levelOrderTraversal(root: TreeNode | null): void {
  // base case
  if (root === null) {
    return;
  }

  // create an empty queue and enqueue the root node
  const queue: TreeNode[] = [];
  queue.push(root);

  // loop till queue is empty
  while (queue.length > 0) {
    // process each node in the queue and enqueue their
    // non-empty left and right child
    const curr = queue.shift()!;

    process.stdout.write(`${curr.key} `);

    if (curr.left) {
      queue.push(curr.left);
    }

    if (curr.right) {
      queue.push(curr.right);
    }
  }
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left!.left = new TreeNode(8);
root.left!.right = new TreeNode(12);
root.right!.left = new TreeNode(16);
root.right!.right = new TreeNode(25);

levelOrderTraversal(root);
```

**Output:** 15 10 20 8 12 16 25

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a preorder fashion and store every node and its level in a [multimap](https://techiedelight.com/implement-multimap-java/) using the level number as a key. Finally, print all nodes corresponding to every level starting from the first level. We can also traverse the tree in inorder or postorder fashion.

Following is the implementation of the above approach in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
  constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Traverse the tree in a preorder fashion and store nodes in a map
// corresponding to their level
function preorder(root: TreeNode | null, level: number, map: Map<number, number[]>): void {
  // base case: empty tree
  if (root === null) {
    return;
  }

  // insert the current node and its level into the map
  if (!map.has(level)) {
    map.set(level, []);
  }
  map.get(level)!.push(root.key);

  // recur for the left and right subtree by increasing the level by 1
  preorder(root.left, level + 1, map);
  preorder(root.right, level + 1, map);
}

// Recursive function to print level order traversal of a given binary tree
function levelOrderTraversal(root: TreeNode | null): void {
  // create an empty map to store nodes between given levels
  const map = new Map<number, number[]>();

  // traverse the tree and insert its nodes into the map
  // corresponding to their level
  preorder(root, 1, map);

  // iterate through the map and print all nodes between given levels
  for (let i = 1; (map.get(i)?.length ?? 0) > 0; i++) {
    process.stdout.write(`Level ${i}: `);
    for (const j of map.get(i)!) {
      process.stdout.write(`${j} `);
    }
    console.log();
  }
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left!.left = new TreeNode(8);
root.left!.right = new TreeNode(12);
root.right!.left = new TreeNode(16);
root.right!.right = new TreeNode(25);
root.right!.right!.right = new TreeNode(30);

levelOrderTraversal(root);
```

**Output:** Level 1: 15 Level 2: 10 20 Level 3: 8 12 16 25 Level 4: 30
