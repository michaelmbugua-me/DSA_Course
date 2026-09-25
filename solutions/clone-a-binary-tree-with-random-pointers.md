# Clone a binary tree with random pointers

> Source: https://www.techiedelight.com/clone-a-binary-tree-with-random-pointers/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient code to clone a binary tree with each node containing an additional random pointer. The random pointer can point to any node of the binary tree or can be null.

> 

The intuitive solution to clone a binary tree with random pointers is to insert each node into a [hash table](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the binary tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), and for each encountered node, create a new node with the same data and create a mapping from the original node to the duplicate node in the hash table. After creating the mapping, recursively set its left and right pointers. Finally, traverse the original binary tree again and update the duplicate nodes’ random pointers using the hash table.

Following is a TypeScript implementation of the idea:

```ts
// A class to store a special binary tree node with a random pointer
class Node {
    // Constructor
    constructor(
        public data: number,
        public left: Node | null = null,
        public right: Node | null = null,
        public random: Node | null = null
    ) {}
}

// Function to print the preorder traversal on a given binary tree
function preorder(root: Node | null): void {
    if (root === null) {
        return;
    }

    // print the current node's data
    let out = `${root.data} —> (`;

    // print left child's data
    out += `${root.left ? root.left.data : 'X'}, `;

    // print the right child's data
    out += `${root.right ? root.right.data : 'X'}, `;

    // print the random child's data
    out += `${root.random ? root.random.data : 'X'})`;

    console.log(out);

    // recur for the left and right subtree
    preorder(root.left);
    preorder(root.right);
}

// Recursive function to copy random pointers from the original binary tree
// into the cloned binary tree using the map
function updateRandomPointers(root: Node | null, map: Map<Node, Node>): void {
    // base case
    if (root === null || !map.has(root)) {
        return;
    }

    // update the random pointer of the cloned node
    map.get(root)!.random = root.random ? (map.get(root.random) ?? null) : null;

    // recur for the left and right subtree
    updateRandomPointers(root.left, map);
    updateRandomPointers(root.right, map);
}

// Recursive function to clone the data, left, and right children for
// each node of a binary tree into a given map
function cloneLeftRightPointers(root: Node | null, map: Map<Node, Node>): Node | null {
    // base case
    if (root === null) {
        return null;
    }

    // clone all fields of the root node except the random pointer

    // create a new node with the same data as the root node
    map.set(root, new Node(root.data));

    // clone the left and right subtree
    map.get(root)!.left = cloneLeftRightPointers(root.left, map);
    map.get(root)!.right = cloneLeftRightPointers(root.right, map);

    // return cloned root node
    return map.get(root)!;
}

// The main function to clone a special binary tree with random pointers
function cloneSpecialBinaryTree(root: Node | null): Node | null {
    // base case
    if (root === null) {
        return root;
    }

    // create a map to store mappings from a node to its clone
    const map = new Map<Node, Node>();

    // clone data, left, and right children for each node of the original
    // binary tree, and put references into the map
    cloneLeftRightPointers(root, map);

    // update random pointers from the original binary tree in the map
    updateRandomPointers(root, map);

    // return the cloned root node
    return map.get(root)!;
}

// construct the tree
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left!.left = new Node(4);
root.left!.right = new Node(5);
root.right!.left = new Node(6);
root.right!.right = new Node(7);

root.left!.left!.random = root.right;
root.left!.right!.random = root;
root.right!.left!.random = root.left!.left!;
root.random = root.left;

console.log('Preorder traversal of the original tree:');
preorder(root);

const clone = cloneSpecialBinaryTree(root);

console.log('\nPreorder traversal of the cloned tree:');
preorder(clone);
```



**Output:** Preorder traversal of the original tree: 1 ——> (2, 3, 2) 2 ——> (4, 5, X) 4 ——> (X, X, 3) 5 ——> (X, X, 1) 3 ——> (6, 7, X) 6 ——> (X, X, 4) 7 ——> (X, X, X) Preorder traversal of the cloned tree: 1 ——> (2, 3, 2) 2 ——> (4, 5, X) 4 ——> (X, X, 3) 5 ——> (X, X, 1) 3 ——> (6, 7, X) 6 ——> (X, X, 4) 7 ——> (X, X, X)

The time complexity of this solution is O(n), where `n` is the total number of nodes in the binary tree. The extra space used by the solution is O(n) for the map and call stack.

Also See:

> [Clone a Binary Tree](https://www.techiedelight.com/clone-binary-tree/ "Clone a Binary Tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
