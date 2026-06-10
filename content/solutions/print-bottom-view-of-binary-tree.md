# Print bottom view of a binary tree

> Source: https://www.techiedelight.com/print-bottom-view-of-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, print the bottom view of it. Assume the left and right child of a node makes a 45–degree angle with the parent.

For example, the bottom view of the following tree is `7, 5, 8, 6`:

> 

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to create an empty map where each key represents the relative horizontal distance of the node from the root node, and the value in the map maintains a pair containing the node’s value and its level number. Then perform [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree. Suppose the current node’s level is more than or equal to the maximum level seen so far for the same horizontal distance as the current node’s or current horizontal distance is seen for the first time. In that case, update the value and the level for the current horizontal distance in the map. For each node, recur for its left subtree by decreasing horizontal distance and increasing level by one, and recur for right subtree by increasing both level and horizontal distance by one.

The following figure shows the horizontal distance and level of each node in the above binary tree. The final values in the map will be:

(horizontal distance —> (node’s value, node’s level)) -1 —> (7, 4) 0 —> (5, 3) 1 —> (8, 4) 2 —> (6, 3)

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to perform preorder traversal on the tree and fill the map.
// Here, the node has `dist` horizontal distance from the tree's root,
// and the `level` represents the node's level.
function printBottom(root: TreeNode | null, dist: number, level: number, d: Map<number, [number, number]>): void {

    // base case: empty tree
    if (root === null) {
        return;
    }

    // if the current level is more than or equal to the maximum level seen so far
    // for the same horizontal distance or horizontal distance is seen for
    // the first time, update the dictionary
    const entry = d.get(dist);
    if (entry === undefined || level >= entry[1]) {
        // update value and level for the current distance
        d.set(dist, [root.val, level]);
    }

    // recur for the left subtree by decreasing horizontal distance and
    // increasing level by 1
    printBottom(root.left, dist - 1, level + 1, d);

    // recur for the right subtree by increasing both level and
    // horizontal distance by 1
    printBottom(root.right, dist + 1, level + 1, d);
}

// Function to print the bottom view of a given binary tree
function printBottomView(root: TreeNode | null): void {

    // create a dictionary where
    // key —> relative horizontal distance of the node from the root node, and
    // value —> pair containing the node's value and its level
    const d = new Map<number, [number, number]>();

    // perform preorder traversal on the tree and fill the dictionary
    printBottom(root, 0, 0, d);

    // traverse the dictionary in sorted order of their keys and
    // print the bottom view
    for (const key of [...d.keys()].sort((a, b) => a - b)) {
        const entry = d.get(key);
        if (entry !== undefined) {
            process.stdout.write(entry[0] + ' ');
        }
    }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

printBottomView(root);
```

**Output:** 7 5 8 6

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:**

1\. Reduce time complexity to linear using `std::unordered_map`/`HashMap`.

2\. Modify the solution to print the [top view of a binary tree.](https://techiedelight.com/print-top-view-binary-tree/)

Also See:

> [Print top view of a binary tree](https://www.techiedelight.com/print-top-view-binary-tree/ "Print top view of a binary tree")

> [Perform vertical traversal of a binary tree](https://www.techiedelight.com/vertical-traversal-binary-tree/ "Perform vertical traversal of a binary tree")

> [Print right view of a binary tree](https://www.techiedelight.com/print-right-view-binary-tree/ "Print right view of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 193

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
