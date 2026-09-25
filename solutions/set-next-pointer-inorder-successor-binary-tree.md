# Set next pointer to the inorder successor of all nodes in a binary tree

> Source: https://www.techiedelight.com/set-next-pointer-inorder-successor-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree where each node has one extra pointer `next`, set it to the inorder successor for all binary tree nodes.

For example, consider the following tree. Here, the blue dotted line represents the next pointer for each node.

The inorder successor of node 4 is 2 The inorder successor of node 2 is 1 The inorder successor of node 1 is 7 The inorder successor of node 7 is 5 The inorder successor of node 5 is 8 The inorder successor of node 8 is 3 The inorder successor of node 3 is 6 The inorder successor of node 6 is null

> 

The idea is to perform an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) of the tree and maintain the previously processed node for every tree node. Then set the next node to a previously visited node for every node in the inorder traversal. This approach is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    data: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    next: TreeNode | null = null;

    constructor(data: number) {
        this.data = data;
    }
}

// Function to set the next pointer of all nodes in a binary tree.
// curr —> current node
// prev —> previously processed node
function setNextNode(curr: TreeNode | null, prev: TreeNode | null): TreeNode | null {
    // return if the tree is empty
    if (curr === null) {
        return prev;
    }

    // recur for the left subtree
    prev = setNextNode(curr.left, prev);

    // set the previous node's next pointer to the current node
    if (prev !== null) {
        prev.next = curr;
    }

    // update the previous node to the current node
    prev = curr;

    // recur for the right subtree
    return setNextNode(curr.right, prev);
}

// Function to print inorder successor of all nodes of
// binary tree using the next pointer
function printInorderSuccessors(root: TreeNode): void {
    // go to the leftmost node
    let curr: TreeNode | null = root;
    while (curr.left) {
        curr = curr.left;
    }

    // print inorder successor of all nodes
    while (curr.next) {
        console.log(`The inorder successor of ${curr.data} is ${curr.next.data}`);
        curr = curr.next;
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

setNextNode(root, null);
printInorderSuccessors(root);
```

**Output:** The inorder successor of 4 is 2 The inorder successor of 2 is 1 The inorder successor of 1 is 7 The inorder successor of 7 is 5 The inorder successor of 5 is 8 The inorder successor of 8 is 3 The inorder successor of 3 is 6

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for call stack, where `h` is the height of the tree.

Also See:

> [Threaded Binary Tree – Overview and Implementation](https://www.techiedelight.com/threaded-binary-tree-overview-implementation/ "Threaded Binary Tree – Overview and Implementation")

> [Find inorder successor for the given key in a BST](https://www.techiedelight.com/find-inorder-successor-given-key-bst/ "Find inorder successor for the given key in a BST")

> [Fix a binary tree that is only one swap away from becoming a BST](https://www.techiedelight.com/fix-binary-tree-one-swap-bst/ "Fix a binary tree that is only one swap away from becoming a BST")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
