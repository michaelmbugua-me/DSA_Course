# Build a binary tree from a parent array

> Source: https://www.techiedelight.com/build-binary-tree-given-parent-array/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given an integer array representing a binary tree, such that the parent-child relationship is defined by `(A[i], i)` for every index `i` in array `A`, build a binary tree out of it. The root node’s value is `i` if `-1` is present at index `i` in the array. It may be assumed that the input provided to the program is valid.

For example,

**Parent: [-1, 0, 0, 1, 2, 2, 4, 4]** Index : [ 0, 1, 2, 3, 4, 5, 6, 7]

Note that,

  * -1 is present at index 0, which implies that the binary tree root is node 0.
  * 0 is present at index 1 and 2, which implies that the left and right children of node 0 are 1 and 2.
  * 1 is present at index 3, which implies that the left or the right child of node 1 is 3.
  * 2 is present at index 4 and 5, which implies that the left and right children of node 2 are 4 and 5.
  * 4 is present at index 6 and 7, which implies that the left and right children of node 4 are 6 and 7.

The corresponding binary tree is:

> 

The solution is simple and effective – create `n` new tree nodes, each having values from 0 to `n-1`, where `n` is the array’s size, and store them in a map or array for the quick lookup. Then traverse the given parent array and build the tree by setting the parent-child relationship defined by `(A[i], i)` for every index `i` in array `A`. Since several binary trees can be formed from a single input, the solution should build any of them. The solution will always set the left child for a node before setting its right child.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    data: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Function to perform inorder traversal on the tree
let output = '';
const inorder = (root: TreeNode | null): void => {

    if (root === null) {
        return;
    }

    inorder(root.left);
    output += `${root.data} `;
    inorder(root.right);
};

// Function to build a binary tree from the given parent array
const createTree = (parent: number[]): TreeNode | null => {

    // create an empty map
    const map = new Map<number, TreeNode>();

    // create `n` new tree nodes, each having a value from 0 to `n-1`,
    // and store them in a map
    for (let i = 0; i < parent.length; i++) {
        map.set(i, new TreeNode(i));
    }

    // represents the root node of a binary tree
    let root: TreeNode | null = null;

    // traverse the parent array and build the tree
    for (let i = 0; i < parent.length; i++) {
        const current = map.get(i);
        if (current === undefined) {
            return null;
        }

        // if the parent is -1, set the root to the current node having the
        // value `i` (stored in map[i])
        if (parent[i] === -1) {
            root = current;
        }
        else {
            // get the parent for the current node
            const ptr = map.get(parent[i]);
            if (ptr === undefined) {
                return null;
            }

            // if the parent's left child is filled, map the node to its right
            // child
            if (ptr.left) {
                ptr.right = current;
            }
            // if the parent's left child is empty, map the node to it
            else {
                ptr.left = current;
            }
        }
    }

    // return root of the constructed tree
    return root;
};

const parent = [-1, 0, 0, 1, 2, 2, 4, 4];

const root = createTree(parent);
inorder(root);
console.log(output);
```

**Output:** 3 1 0 6 4 7 2 5

The time complexity of the above solution is O(n), where `n` is the total number of nodes in a binary tree (assuming constant-time operations for the hash table). The auxiliary space required by the program is O(n).

Also See:

> [Determine whether the given binary tree nodes are cousins of each other](https://www.techiedelight.com/determine-two-nodes-are-cousins/ "Determine whether the given binary tree nodes are cousins of each other")

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

> [Sink nodes containing zero to the bottom of a binary tree](https://www.techiedelight.com/sink-nodes-containing-zero-bottom-binary-tree/ "Sink nodes containing zero to the bottom of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 179

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
