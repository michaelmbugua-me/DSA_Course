# Count all subtrees having the same value of nodes in a binary tree

> Source: https://www.techiedelight.com/count-subtrees-value-nodes-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, count all subtrees in it such that every node in the subtree has the same value.

For example, consider the following tree:

Six subtrees have the same data.

> 

A simple solution would be to consider every node and check if all nodes present in the subtree rooted at the current node have the same values or not. The time complexity of this solution is O(n2), where `n` is the total number of nodes in the binary tree.

We can solve this problem in linear time. The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/). Then by comparing return values of the left and right subtree, we can easily check if the subtree rooted at any node has the same values or not. Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class Node {
    constructor(public data: number, public left: Node | null = null, public right: Node | null = null) {}
}

// The helper function to count all subtrees having the same value of nodes.
// The function returns the root node's value if all nodes in the subtree
// rooted at root have the same values; otherwise, it returns infinity
function countSubtrees(root: Node | null, count = 0): [number, number] {
    // base case: empty tree
    if (root === null) {
        return [Number.MIN_SAFE_INTEGER, count];
    }

    // if the root is a leaf node, increase the count and return root node data
    if (root.left === null && root.right === null) {
        count = count + 1;
        return [root.data, count];
    }

    // recur for the left and right subtree
    let res = countSubtrees(root.left, count);
    const left = res[0];
    res = countSubtrees(root.right, res[1]);
    const right = res[0];
    count = res[1];

    // 1. The left subtree is empty, and the right subtree data matches the root
    // 2. The right subtree is empty, and the left subtree data matches the root
    // 3. Both left and right subtrees are non-empty, and their data matches the root
    if ((left === Number.MIN_SAFE_INTEGER && right === root.data) ||
        (right === Number.MIN_SAFE_INTEGER && left === root.data) ||
        (left === right && left === root.data)) {
        // increase the count and return root node data
        count = count + 1;
        return [root.data, count];
    }

    // return infinity if root's data doesn't match with left or right subtree
    return [Number.MAX_SAFE_INTEGER, count];
}

/* Construct the following tree
             1
           /   \
          2     3
        /     /   \
       4     5     6
     /     /   \     \
    4     5     5     7
*/

const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left!.left = new Node(4);
root.right!.left = new Node(5);
root.right!.right = new Node(6);
root.left!.left!.left = new Node(4);
root.right!.left!.left = new Node(5);
root.right!.left!.right = new Node(5);
root.right!.right!.right = new Node(7);

console.log(countSubtrees(root)[1]);
```

**Output:** 6

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for call stack, where `h` is the height of the tree.

Also See:

> [Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`](https://www.techiedelight.com/truncate-given-binary-tree-remove-nodes-lie-path-sum-less-k/ "Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`")

> [Sink nodes containing zero to the bottom of a binary tree](https://www.techiedelight.com/sink-nodes-containing-zero-bottom-binary-tree/ "Sink nodes containing zero to the bottom of a binary tree")

> [Check if removing an edge can split a binary tree into two equal size trees](https://www.techiedelight.com/split-binary-tree-into-two-trees/ "Check if removing an edge can split a binary tree into two equal size trees")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 184

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
