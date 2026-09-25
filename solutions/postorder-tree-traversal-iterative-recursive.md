# Postorder Tree Traversal – Iterative and Recursive

> Source: https://www.techiedelight.com/postorder-tree-traversal-iterative-recursive/

Given a binary tree, write an iterative and recursive solution to traverse the tree using postorder traversal in TypeScript.

Unlike linked lists, one-dimensional arrays, and other linear data structures, which are traversed in linear order, trees can be traversed in multiple ways in [depth–first order](https://techiedelight.com/depth-first-search/) ([preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/)) or [breadth–first order](https://techiedelight.com/breadth-first-search/) ([level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/)). Beyond these basic traversals, various more complex or hybrid schemes are possible, such as depth-limited searches like iterative deepening depth–first search. In this post, postorder tree traversal is discussed in detail.

Traversing a tree involves iterating over all nodes in some manner. As the tree is not a linear data structure, there can be more than one possible next node from a given node, so some nodes must be deferred, i.e., stored in some way for later visiting. The traversal can be done iteratively where the deferred nodes are stored in the [stack](https://techiedelight.com/stack-implementation/), or it can be done by [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/), where the deferred nodes are stored implicitly in the [call stack](https://en.wikipedia.org/wiki/Call_stack).

For traversing a (non-empty) binary tree in a postorder fashion, we must do these three things for every node `n` starting from the tree’s root:

**`(L)`** Recursively traverse its left subtree. When this step is finished, we are back at `n` again. **`(R)`** Recursively traverse its right subtree. When this step is finished, we are back at `n` again. **`(N)`** Process `n` itself.

In normal postorder traversal, visit the left subtree before the right subtree. If we visit the right subtree before visiting the left subtree, it is referred to as reverse postorder traversal.

> 

## Recursive Implementation

As we can see, before processing any node, the left subtree is processed first, followed by the right subtree, and the node is processed at last. These operations can be defined recursively for each node. The recursive implementation is referred to as a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/), as the search tree is deepened as much as possible on each child before going to the next sibling.

Following is the TypeScript program that demonstrates it:

```ts
// Data structure to store a binary tree node
class TreeNode {
    constructor(public data: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Recursive function to perform postorder traversal on the tree
function postorder(root: TreeNode | null): void {

    // return if the current node is empty
    if (root === null) {
        return;
    }

    // Traverse the left subtree
    postorder(root.left);

    // Traverse the right subtree
    postorder(root.right);

    // Display the data part of the root (or current node)
    process.stdout.write(`${root.data} `);
}

/* Construct the following tree
           1
         /   \
        /     \
       2       3
      /      /   \
     /      /     \
    4      5       6
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

postorder(root);
```

## Iterative Implementation

To convert the above recursive procedure into an iterative one, we need an explicit stack. Following is a simple stack-based iterative algorithm to perform postorder traversal:

**iterativePostorder(node)** s —> empty stack t —> output stack while (not s.isEmpty()) node —> s.pop() t.push(node) if (node.left <> null) s.push(node.left) if (node.right <> null) s.push(node.right) while (not t.isEmpty()) node —> t.pop() visit(node)

The algorithm can be implemented as follows in TypeScript:

```ts
// Data structure to store a binary tree node
class TreeNode {
    constructor(public data: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Iterative function to perform postorder traversal on the tree
function postorderIterative(root: TreeNode | null): void {

    // return if the tree is empty
    if (root === null) {
        return;
    }

    // create an empty stack and push the root node
    const stack: TreeNode[] = [root];

    // create another stack to store postorder traversal
    const out: number[] = [];

    // loop till stack is empty
    while (stack.length) {

        // pop a node from the stack and push the data into the output stack
        const curr = stack.pop()!;
        out.push(curr.data);

        // push the left and right child of the popped node into the stack
        if (curr.left) {
            stack.push(curr.left);
        }

        if (curr.right) {
            stack.push(curr.right);
        }
    }

    // print postorder traversal
    while (out.length) {
        process.stdout.write(`${out.pop()} `);
    }
}

/* Construct the following tree
           1
         /   \
        /     \
       2       3
      /      /   \
     /      /     \
    4      5       6
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

postorderIterative(root);
```

The time complexity of the above solutions is O(n), where `n` is the total number of nodes in the binary tree. The space complexity of the program is O(n) as the space required is proportional to the height of the tree, which can be equal to the total number of nodes in the tree in worst-case for skewed trees.

**References:** <https://en.wikipedia.org/wiki/Tree_traversal>

**Exercise:** Do iterative postorder traversal using only one stack.
