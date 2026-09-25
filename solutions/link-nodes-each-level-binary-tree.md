# Link nodes present in each level of a binary tree in the form of a linked list

> Source: https://www.techiedelight.com/link-nodes-each-level-binary-tree/

Given the root of a special binary tree with each node containing an additional next pointer, link nodes at the same level using the next pointer in the form of a linked list like structure.

For example, the binary tree on the left should be converted into a binary tree on the right.

> 

We can solve this problem in linear time by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store nodes present at each level in a map from left to right. After every node is processed, iterate through the map, and for each level, set the next node for every node present in it.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class Node {
  data: number;
  left: Node | null = null;
  right: Node | null = null;
  next: Node | null = null;

  constructor(data: number) {
    this.data = data;
  }
}

// Function to print a given linked list
function printList(head: Node | null): void {
  while (head) {
    process.stdout.write(`${head.data} —> `);
    head = head.next;
  }

  console.log('null');
}

// Recursive function to find the first node in the next level of a given root node
function findNextNode(root: Node | null): Node | null {
  // base case
  if (root === null || root.next === null) {
    return null;
  }

  // if the left child of the root's next node exists, return it
  if (root.next.left) {
    return root.next.left;
  }

  // if the right child of the root's next node exists, return it
  if (root.next.right) {
    return root.next.right;
  }

  // if root's next node is a leaf node, recur for root's next node
  return findNextNode(root.next);
}

// Function to traverse the nodes in a preorder fashion and
// insert all nodes into the map corresponding to their level
function linkNodesAtLevel(root: Node | null, level: number, map: Map<number, Node[]>): void {
  // base case: empty subtree
  if (root === null) {
    return;
  }

  // insert the current node and level information into the map
  if (!map.has(level)) {
    map.set(level, []);
  }
  map.get(level)!.push(root);

  // recur for the left and right subtree by increasing the level by 1
  linkNodesAtLevel(root.left, level + 1, map);
  linkNodesAtLevel(root.right, level + 1, map);
}

// Function to link nodes present in each level of a binary tree
// using the next pointer
function linkNodes(root: Node | null): void {
  // create an empty map to store nodes present at each level
  // from left to right
  const map = new Map<number, Node[]>();

  // traverse the tree in a preorder fashion and fill the map
  linkNodesAtLevel(root, 1, map);

  // iterate through the map, and for each level,
  // set the next node for every node in it
  for (const values of map.values()) {
    let prev: Node | null = null;
    for (const curr of values) {
      if (prev) {
        prev.next = curr;
      }
      prev = curr;
    }
    prev!.next = null;
  }
}

/* Construct the following tree
       1
     /   \
    2     3
   / \     \
  4   5     6
   \       /
    7     8
*/

const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left!.left = new Node(4);
root.left!.right = new Node(5);
root.right!.right = new Node(6);
root.left!.left!.right = new Node(7);
root.right!.right!.left = new Node(8);

// link nodes at the same level
linkNodes(root);

// print the nodes
let node = root;
while (node) {
  // print the current level
  printList(node);

  // find the leftmost node in the next level
  if (node.left) {
    node = node.left;
  } else if (node.right) {
    node = node.right;
  } else {
    node = findNextNode(node);
  }
}
```

**Output:** 1 —> null 2 —> 3 —> null 4 —> 5 —> 6 —> null 7 —> 8 —> null

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for the unordered map.

How can we solve this using constant space?

The idea is to traverse the tree in a preorder fashion and ensure that all nodes at the current level are linked before all nodes at the next level, i.e., the next pointer of the parent nodes is set before its children.

Then update the next pointer of the parent’s left child to the parent’s right child. If the right child doesn’t exist, link the parent’s left child to the first node in the next level. Similarly, update the next pointer of the parent’s right child to the first node in the next level. If we follow this recursively for the left and right subtrees, we will end up having connected nodes at each level.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class Node {
  data: number;
  left: Node | null = null;
  right: Node | null = null;
  next: Node | null = null;

  constructor(data: number) {
    this.data = data;
  }
}

// Function to print a given linked list
function printList(head: Node | null): void {
  while (head) {
    process.stdout.write(`${head.data} —> `);
    head = head.next;
  }

  console.log('null');
}

// Recursive function to find the first node in the next level of a given root node
function findNextNode(root: Node | null): Node | null {
  // base case
  if (root === null || root.next === null) {
    return null;
  }

  // if the left child of the root's next node exists, return it
  if (root.next.left) {
    return root.next.left;
  }

  // if the right child of the root's next node exists, return it
  if (root.next.right) {
    return root.next.right;
  }

  // if root's next node is a leaf node, recur for root's next node
  return findNextNode(root.next);
}

// Recursive function to link nodes present in each level of a binary tree
// in the form of a linked list
function linkNodes(root: Node | null): void {
  // base case
  if (root === null) {
    return;
  }

  // ensure that the nodes of the current level are linked before the
  // next level nodes
  linkNodes(root.next);

  // Update the next pointer of root's left child to root's right child.
  // If the right child doesn't exist, link it to the first node in the next level.
  if (root.left) {
    root.left.next = root.right ? root.right : findNextNode(root);
  }

  // update the next pointer of the root's right child to the first node
  // in the next level
  if (root.right) {
    root.right.next = findNextNode(root);
  }

  // recur for the left and right subtree
  linkNodes(root.left);
  linkNodes(root.right);
}

/* Construct the following tree
       1
     /   \
    2     3
   / \     \
  4   5     6
   \       /
    7     8
*/

const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left!.left = new Node(4);
root.left!.right = new Node(5);
root.right!.right = new Node(6);
root.left!.left!.right = new Node(7);
root.right!.right!.left = new Node(8);

// link nodes at the same level
linkNodes(root);

// print the nodes
let node = root;
while (node) {
  // print the current level
  printList(node);

  // find the leftmost node in the next level
  if (node.left) {
    node = node.left;
  } else if (node.right) {
    node = node.right;
  } else {
    node = findNextNode(node);
  }
}
```

**Output:** 1 —> null 2 —> 3 —> null 4 —> 5 —> 6 —> null 7 —> 8 —> null

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. The solution also takes implicit space for the call stack. We can easily convert the above program into a non-recursive one, which takes O(1) space. The iterative version can be seen [here](https://techiedelight.com/compiler/?run=1i5oGn).
