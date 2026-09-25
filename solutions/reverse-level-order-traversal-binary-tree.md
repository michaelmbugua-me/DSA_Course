# Reverse level order traversal of a binary tree

> Source: https://www.techiedelight.com/reverse-level-order-traversal-binary-tree/

Given a binary tree, print its nodes level by level in reverse order, i.e., print all nodes present at the last level first, followed by nodes of the second last level, and so on… Print nodes at any level from left to right.

For example, the reverse [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) for the following tree is `4, 5, 6, 7, 2, 3, 1`:

> 

A simple solution would be to print all nodes of level `h` first, followed by level `h-1`, until level 1, where `h` is the tree’s height. We can print all nodes present in a level by modifying the [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree. The time complexity of this solution is O(n2), where `n` is the total number of nodes in the binary tree.

We can reduce the time complexity to O(n) by using extra space. Following is a pseudocode for a simple [queue](https://techiedelight.com/circular-queue-implementation-c/)-based reverse level order traversal, which requires space proportional to the maximum number of nodes at a given depth. It can be as much as half of the total number of nodes.

**levelorder(root)** q —> empty queue s —> empty stack q.enqueue(root) while (not q.isEmpty()) node —> q.dequeue() s.push(node) if (node.right <> null) q.enqueue(node.right) if (node.left <> null) q.enqueue(node.left) while (not s.isEmpty()) node —> s.pop() print(node)

The algorithm can be implemented as follows in TypeScript:

```ts
class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to print reverse level order traversal of a given binary tree
function reverseLevelOrderTraversal(root: TreeNode | null): void {
    if (root === null) {
        return;
    }

    // create an empty queue and enqueue the root node
    const queue: TreeNode[] = [root];

    // create a stack to reverse level order nodes
    const stack: number[] = [];

    // loop till queue is empty
    while (queue.length) {

        // process each node in the queue and enqueue their children
        const curr = queue.shift()!;

        // push the current node into the stack
        stack.push(curr.key);

        // it is important to process the right node before the left node
        if (curr.right) {
            queue.push(curr.right);
        }

        if (curr.left) {
            queue.push(curr.left);
        }
    }

    // pop all nodes from the stack and print them
    while (stack.length) {
        process.stdout.write(stack.pop() + ' ');
    }
}

// demo
const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);

reverseLevelOrderTraversal(root);
```

**Output:** 8 12 16 25 10 20 15

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a preorder fashion and store every node and its level in a [multimap](https://techiedelight.com/implement-multimap-java/) using the level number as a key. Finally, print all nodes corresponding to every level starting from the last level. We can also traverse the tree in [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) or [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/).

Following is a TypeScript implementation based on the above idea:

```ts
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

// Recursive function to perform reverse level order traversal on a binary tree
function levelOrderTraversal(root: TreeNode | null): void {
    // create an empty map to store nodes between given levels
    const map = new Map<number, number[]>();

    // traverse the tree and insert its nodes into the map
    // corresponding to their level
    preorder(root, 1, map);

    // iterate through the map in reverse order and
    // print all nodes present at every level
    for (let i = map.size; i > 0; i--) {
        console.log(`Level ${i}:`, map.get(i));
    }
}

// demo
const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);
root.right.right.right = new TreeNode(30);

levelOrderTraversal(root);
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:** Modify the solution to print nodes of different levels in separate lines.
