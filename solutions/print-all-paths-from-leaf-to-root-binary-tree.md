# Print all paths from leaf to root node of a binary tree

> Source: https://www.techiedelight.com/print-all-paths-from-leaf-to-root-binary-tree/

Given a binary tree, write a recursive algorithm to print all paths from every leaf node to root node in the binary tree.

For example, consider the following binary tree:

There are five leaf-to-root paths in the above binary tree:

4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

> 

The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store every encountered node in the current path from the root-to-leaf in a list. If we encounter a leaf node, print all nodes present in the list in reverse order.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
}

// Function to check if a given node is a leaf node or not
function isLeaf(node: TreeNode): boolean {
    return node.left === null && node.right === null;
}

// Recursive function to print all paths from leaf-to-root node
function printLeafToRootPaths(node: TreeNode | null, path: number[]): void {

    // base case
    if (node === null) {
        return;
    }

    // include the current node to the path
    path.push(node.val);

    // if a leaf node is found, print the path present in the list
    // in reverse order (leaf to the root node)
    if (isLeaf(node)) {
        console.log([...path].reverse());
    }

    // recur for the left and right subtree
    printLeafToRootPaths(node.left, path);
    printLeafToRootPaths(node.right, path);

    // backtrack: remove the current node after the left, and right subtree are done
    path.pop();
}

// The main function to print all paths from leaf-to-root node
function findLeafToRootPaths(node: TreeNode | null): void {

    // list to store leaf-to-root path
    const path: number[] = [];

    // call recursive function
    printLeafToRootPaths(node, path);
}

/* Construct the following tree
           1
         /   \
        /     \
       /       \
      2         3
     / \       / \
    /   \     /   \
   4     5   6     7
            / \
           /   \
          8     9
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
root.right.left.left = new TreeNode(8);
root.right.left.right = new TreeNode(9);

// print all leaf-to-root paths
findLeafToRootPaths(root);
```

**Output:** 4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

**Exercise:**

1\. Write an [iterative implementation](https://techiedelight.com/print-leaf-to-root-path-binary-tree/) of the above problem.

2\. Modify the solution to print leaf-to-root path, having the sum of nodes equal to a given number.

Also See:

> [Iteratively print the leaf to root path for every leaf node in a binary tree](https://www.techiedelight.com/print-leaf-to-root-path-binary-tree/ "Iteratively print the leaf to root path for every leaf node in a binary tree")

> [Print all paths from the root to leaf nodes of a binary tree](https://www.techiedelight.com/print-all-paths-from-root-to-leaf-nodes-binary-tree/ "Print all paths from the root to leaf nodes of a binary tree")

> [Find maximum sum root to leaf path in a binary tree](https://www.techiedelight.com/find-maximum-sum-root-to-leaf-path-binary-tree/ "Find maximum sum root to leaf path in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.92/5. Vote count: 167

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
