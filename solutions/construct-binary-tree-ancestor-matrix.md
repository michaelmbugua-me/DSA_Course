# Construct a binary tree from an ancestor matrix

> Source: https://www.techiedelight.com/construct-binary-tree-ancestor-matrix/

Given an `N × N` ancestor matrix, whose cell `(i, j)` has the value true if `i` is the ancestor of `j` in a binary tree, construct a binary tree from it where binary tree nodes are labeled from 0 to `N-1`.

Please note that there may be several binary trees constructed out of a single matrix since the ancestor matrix doesn’t specify which child is left and which is right.

For example,

**Input:** 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1 1 0 **Output:** Any one of the following trees 4 4 4 / \ / \ / \ 1 2 OR 2 1 OR 1 2 OR … / / / \ \ / 0 3 3 0 0 3

> 

We start by creating an array of pointers to store the binary tree nodes. Since the total number of set values in the `i'th` row indicates the total number of descendants of node `i`, store row numbers corresponding to a given count in a [multimap](https://techiedelight.com/implement-multimap-java/). We then process the multimap entries in sorted order (smallest value first), and for each entry, assign a new node against the current row in the array. If it is a non-leaf node (having non-zero value), set the left/right child to its descendant’s nodes whose parents are not set (there can be at-max two such nodes if the given ancestor matrix is correct). Finally, return the last processed node, which has a maximum value and would be the root of the binary tree.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class Node {
    key: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(key: number, left: Node | null = null, right: Node | null = null) {}
}

// Utility function to print binary tree nodes in an inorder fashion
function inorder(node: Node | null, output: number[] = []): void {
    if (node) {
        inorder(node.left, output);
        output.push(node.key);
        inorder(node.right, output);
    }
}

// Function to construct a binary tree from the specified ancestor matrix
function constructTree(mat: number[][]): Node | null {

    // base case
    if (!mat || mat.length === 0) {
        return null;
    }

    // get the total number of rows in the matrix
    const N = mat.length;

    // create an empty dictionary
    const d = new Map<number, number[]>();

    // Use sum as key and row numbers as values in the dictionary
    for (let i = 0; i < N; i++) {

        // find the sum of the current row
        const total = mat[i].reduce((a, b) => a + b, 0);

        // insert the sum and row number into the dictionary
        if (!d.has(total)) {
            d.set(total, []);
        }
        d.get(total)!.push(i);
    }

    // node[i] will store the node for `i` in the constructed tree
    const node: Node[] = new Array(N);
    let last = 0;

    // value of parent[i] is true if a parent is set for the i'th node
    const parent: boolean[] = new Array(N).fill(false);

    // Traverse the dictionary in sorted order
    for (const key of [...d.keys()].sort((a, b) => a - b)) {
        for (const row of d.get(key)!) {
            last = row;
            // create a new node
            node[row] = new Node(row);

            // if a leaf node is reached, do nothing
            if (key === 0) {
                continue;
            }

            // traverse row
            for (let i = 0; i < N; i++) {
                // do if a parent is not set and ancestor exits
                if (!parent[i] && mat[row][i] === 1) {
                    // check for the unoccupied node
                    if (node[row].left === null) {
                        node[row].left = node[i];
                    }
                    else {
                        node[row].right = node[i];
                    }

                    // set parent for i'th node
                    parent[i] = true;
                }
            }
        }
    }

    // last processed node is the root
    return node[last];
}

const mat = [
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0]
];

const root = constructTree(mat);
const output: number[] = [];
inorder(root, output);
console.log(output.join(' '));
```

**Output:** 0 1 4 3 2

The time complexity of the above solution is O(N2) and requires O(N) extra space, where `N × N` are dimensions of the ancestor matrix.

**Author:** Aditya Goel

Also See:

> [Construct an ancestor matrix from a binary tree](https://www.techiedelight.com/construct-ancestor-matrix-from-binary-tree/ "Construct an ancestor matrix from a binary tree")

> [Determine whether the given binary tree nodes are cousins of each other](https://www.techiedelight.com/determine-two-nodes-are-cousins/ "Determine whether the given binary tree nodes are cousins of each other")

> [Build a binary tree from a parent array](https://www.techiedelight.com/build-binary-tree-given-parent-array/ "Build a binary tree from a parent array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 156

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
