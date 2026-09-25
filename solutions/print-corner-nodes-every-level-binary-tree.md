# Print corner nodes of every level in a binary tree

> Source: https://www.techiedelight.com/print-corner-nodes-every-level-binary-tree/

Given a binary tree, print corner nodes of every level in it.

For example, consider the following tree:

**Output:** 6 3 8 4 2 1 3

> 

The idea is simple. First, modify the [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on a given binary tree to maintain the level of each node. Then while doing level order traversal, if the current node happens to be the first or last node at the current level, print it.

Following is the implementation in TypeScript based on the above idea:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
}

// Iterative function to print corner nodes of every level in a binary tree
function printTree(root: TreeNode | null): void {

    // return if the tree is empty
    if (root === null) {
        return;
    }

    // create an empty queue to store tree nodes
    const q: TreeNode[] = [];

    // enqueue root node
    q.push(root);

    // loop till queue is empty
    while (q.length > 0) {

        // get the size of the current level
        const size = q.length;
        let n = size;

        // process all nodes present in the current level
        while (n > 0) {
            n = n - 1;
            const node = q.shift()!;

            // if the corner node is found, print it
            if (n === size - 1 || n === 0) {
                process.stdout.write(node.val + ' ');
            }

            // enqueue left and right child of the current node
            if (node.left) {
                q.push(node.left);
            }

            if (node.right) {
                q.push(node.right);
            }
        }

        // terminate level by printing an empty line
        console.log();
    }
}

/* Construct the following tree
             1
           /   \
          2     3
        /     /   \
       4     5     6
     /     /   \     \
    7     8     9     10
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.left.left.left = new TreeNode(7);
root.right.left.left = new TreeNode(8);
root.right.left.right = new TreeNode(9);
root.right.right.right = new TreeNode(10);

printTree(root);
```

**Output:** 1 2 3 4 6 7 10

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

Also See:

> [Efficiently print all nodes between two given levels in a binary tree](https://www.techiedelight.com/print-nodes-between-two-levels-binary-tree/ "Efficiently print all nodes between two given levels in a binary tree")

> [Compute the maximum number of nodes at any level in a binary tree](https://www.techiedelight.com/find-maximum-width-given-binary-tree/ "Compute the maximum number of nodes at any level in a binary tree")

> [Print all nodes of a perfect binary tree in a specific order](https://www.techiedelight.com/print-nodes-binary-tree-specific-order/ "Print all nodes of a perfect binary tree in a specific order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 179

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
