# Determine if a binary tree satisfies the height-balanced property of a red–black tree

> Source: https://www.techiedelight.com/determine-binary-tree-satisfy-height-balanced-property-red-black-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient algorithm to determine if a binary tree satisfies the height-balanced property of the red–black tree or not.

The red–black tree’s height-balanced property states that the path from the root to the farthest leaf is no more than twice as long as a path from the root to the nearest leaf. In other words, the maximum height of any node in a tree is not greater than twice its minimum height.

For example, the following tree is height-balanced:

In contrast, the following tree violates the red–black tree property at node 3:

> 

A simple solution would be to calculate the maximum and minimum height of every node in the tree and determine if the subtree rooted at that node is balanced or not. If the height-balanced property is satisfied for every subtree, the binary tree enforces the red–black tree’s height-balanced property. For a tree containing `n` elements, this solution takes O(n2) time since, for every node, we are traversing the whole subtree rooted at that node.

The main challenge is to perform this in a single tree traversal, i.e., in O(n) time. The idea is to perform a [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) on the binary tree and calculate the maximum and minimum height for every node in a bottom-up fashion. Then we can easily check if the height-balanced property of the red–black tree is satisfied for every node in the tree or not.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
  constructor(public data: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

class MutableInt {
  constructor(public value: number) {}

  set(data: number): void {
    this.value = data;
  }

  get(): number {
    return this.value;
  }
}

// Recursive function to determine if the given binary tree
// satisfies the height-balanced property of the red–black tree or not
function isHeightBalanced(root: TreeNode | null, rootMax = new MutableInt(0)): boolean {
  // Base case
  if (root === null) {
    return true;
  }

  // to hold the maximum height of the left and right subtree
  const leftMax = new MutableInt(0);
  const rightMax = new MutableInt(0);

  // proceed only if both left and right subtrees are balanced
  if (isHeightBalanced(root.left, leftMax) && isHeightBalanced(root.right, rightMax)) {
    // calculate the minimum and maximum height of the left and right subtree
    const rootMin = Math.min(leftMax.get(), rightMax.get()) + 1;
    rootMax.set(Math.max(leftMax.get(), rightMax.get()) + 1);

    // return true if the root node is height-balanced
    return rootMax.get() <= 2 * rootMin;
  }

  // return false if either left or right subtree is unbalanced
  return false;
}

/* Construct the following tree
           1
        /     \
       2       3
     /       /   \
    4       5     6
          /   \
         7     8
       /   \
      9    10
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);
root.right.left.left.left = new TreeNode(9);
root.right.left.left.right = new TreeNode(10);

if (isHeightBalanced(root)) {
  console.log("Height-balanced");
} else {
  console.log("Not height-balanced");
}
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

Also See:

> [Check if a binary tree is height-balanced or not](https://www.techiedelight.com/check-given-binary-tree-is-height-balanced-not/ "Check if a binary tree is height-balanced or not")

> [Calculate the height of a binary tree with leaf nodes forming a circular doubly linked list](https://www.techiedelight.com/calculate-height-binary-tree-leaf-nodes-forming-circular-doubly-linked-list/ "Calculate the height of a binary tree with leaf nodes forming a circular doubly linked list")

> [Check children-sum property in a binary tree](https://www.techiedelight.com/check-children-sum-property-binary-tree/ "Check children-sum property in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
