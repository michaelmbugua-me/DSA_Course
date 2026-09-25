# Print diagonal traversal of a binary tree

> Source: https://www.techiedelight.com/print-diagonal-traversal-binary-tree/

Given a binary tree, print all nodes for each diagonal having negative slope `(\)`. Assume that the left and right child of a node makes a 45–degree angle with the parent.

For example, consider the following binary tree having three diagonals. The diagonal’s traversal is:

1 3 6 2 5 8 4 7

> 

## Recursive Version

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to create an empty map where each key in the map represents a diagonal in the binary tree, and its value maintains all nodes present in the diagonal. Then perform [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree and update the map. For each node, recur for its left subtree by increasing the diagonal by one and recur for the right subtree with the same diagonal.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Recursive function to perform preorder traversal on the tree and
// fill the map with diagonal elements
function printDiagonal(node: TreeNode | null, diagonal: number, d: Map<number, number[]>): void {

    // base case: empty tree
    if (node === null) {
        return;
    }

    // insert the current node into the current diagonal
    if (!d.has(diagonal)) {
        d.set(diagonal, []);
    }
    d.get(diagonal)!.push(node.val);

    // recur for the left subtree by increasing diagonal by 1
    printDiagonal(node.left, diagonal + 1, d);

    // recur for the right subtree with the same diagonal
    printDiagonal(node.right, diagonal, d);
}

// Function to print the diagonal elements of a given binary tree
function printDiagonalElements(root: TreeNode | null): void {

    // create an empty map to store the diagonal element in every slope
    const d = new Map<number, number[]>();

    // perform preorder traversal on the tree and fill the map
    printDiagonal(root, 0, d);

    // traverse the map and print the diagonal elements
    for (let i = 0; i < d.size; i++) {
        console.log(d.get(i));
    }
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     /      /  \
    /      /    \
   4      5      6
         / \
        /   \
       7     8
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

printDiagonalElements(root);
```

**Output:** 1 3 6 2 5 8 4 7

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## Iterative Version

We can also use a [queue](https://techiedelight.com/queue-implementation-cpp/) to solve this problem. The idea is similar to [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/), but instead of storing nodes of a level, we enqueue nodes in a diagonal.

This approach is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Iterative function to print the diagonal elements of a given binary tree
function diagonalPrint(root: TreeNode | null): void {

    // create an empty queue
    const q: TreeNode[] = [];

    // create a sentinel (dummy) node to denote the end of a diagonal
    const sentinel = new TreeNode(-1);

    // enqueue all nodes of the first diagonal in the binary tree
    while (root !== null) {
        q.push(root);
        root = root.right;
    }

    // enqueue sentinel node at the end of each diagonal
    q.push(sentinel);

    // run till the only sentinel is left
    while (q.length !== 1) {

        // dequeue front node
        const front = q.shift()!;

        if (front !== sentinel) {
            // print the current node
            process.stdout.write(front.val + ' ');

            // enqueue nodes of the next diagonal in the binary tree
            let node = front.left;
            while (node !== null) {
                q.push(node);
                node = node.right;
            }
        }
        else {
            // If the current diagonal end is reached, enqueue the sentinel node
            // and print an empty line
            q.push(sentinel);
            console.log();
        }
    }
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     /      /  \
    /      /    \
   4      5      6
         / \
        /   \
       7     8
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

diagonalPrint(root);
```

**Output:** 1 3 6 2 5 8 4 7

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:** Modify the solution to print diagonal elements for diagonals having positive slope `/`.
