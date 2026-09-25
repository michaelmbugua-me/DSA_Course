# Preorder Tree Traversal – Iterative and Recursive

> Source: https://www.techiedelight.com/preorder-tree-traversal-iterative-recursive/

Given a binary tree, write an iterative and recursive solution to traverse the tree using preorder traversal in TypeScript.

Unlike linked lists, one-dimensional arrays, and other linear data structures, which are traversed in linear order, trees can be traversed in multiple ways in [depth–first order](https://techiedelight.com/depth-first-search/) ([preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/)) or [breadth–first order](https://techiedelight.com/breadth-first-search/) ([level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/)). Beyond these basic traversals, various more complex or hybrid schemes are possible, such as depth-limited searches like iterative deepening depth–first search. In this post, preorder tree traversal is discussed in detail.

Traversing a tree involves iterating over all nodes in some manner. As the tree is not a linear data structure, there can be more than one possible next node from a given node, so some nodes must be deferred, i.e., stored in some way for later visiting. The traversal can be done iteratively where the deferred nodes are stored in the [stack](https://techiedelight.com/stack-implementation/), or it can be done by [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/), where the deferred nodes are stored implicitly in the [call stack](https://en.wikipedia.org/wiki/Call_stack).

For traversing a (non-empty) binary tree in a preorder fashion, we must do these three things for every node `n` starting from the tree’s root:

**`(N)`** Process `n` itself. **`(L)`** Recursively traverse its left subtree. When this step is finished, we are back at `n` again. **`(R)`** Recursively traverse its right subtree. When this step is finished, we are back at `n` again.

In normal preorder traversal, visit the left subtree before the right subtree. If we visit the right subtree before visiting the left subtree, it is referred to as reverse preorder traversal.

> 

## Recursive Implementation

As we can see, only after processing any node, the left subtree is processed, followed by the right subtree. These operations can be defined recursively for each node. The recursive implementation is referred to as a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/), as the search tree is deepened as much as possible on each child before going to the next sibling.

Following is a TypeScript program that demonstrates it:

```ts
// Data structure to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Recursive function to perform preorder traversal on the tree
function preorder(root: TreeNode | null): void {

    // return if the current node is empty
    if (root === null) {
        return;
    }

    // Display the data part of the root (or current node)
    process.stdout.write(root.val + ' ');

    // Traverse the left subtree
    preorder(root.left);

    // Traverse the right subtree
    preorder(root.right);
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

preorder(root);
```

## Iterative Implementation

To convert the above recursive procedure into an iterative one, we need an explicit stack. Following is a simple stack-based iterative algorithm to perform preorder traversal:

**iterativePreorder(node)** if (node = null) return s —> empty stack s.push(node) while (not s.isEmpty()) node —> s.pop() visit(node) if (node.right != null) s.push(node.right) if (node.left != null) s.push(node.left)

The algorithm can be implemented as follows in TypeScript:

```ts
// Data structure to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Iterative function to perform preorder traversal on the tree
function preorderIterative(root: TreeNode | null): void {

    // return if the tree is empty
    if (root === null) {
        return;
    }

    // create an empty stack and push the root node
    const stack: TreeNode[] = [root];

    // loop till stack is empty
    while (stack.length > 0) {

        // pop a node from the stack and print it
        const curr = stack.pop()!;

        process.stdout.write(curr.val + ' ');

        // push the right child of the popped node into the stack
        if (curr.right) {
            stack.push(curr.right);
        }

        // push the left child of the popped node into the stack
        if (curr.left) {
            stack.push(curr.left);
        }

        // the right child must be pushed first so that the left child
        // is processed first (LIFO order)
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

preorderIterative(root);
```

The above solution can be further optimized by pushing only the right children to the stack.

```ts
// Data structure to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Iterative function to perform preorder traversal on the tree
function preorderIterative(root: TreeNode | null): void {

    // return if the tree is empty
    if (root === null) {
        return;
    }

    // create an empty stack and push the root node
    const stack: TreeNode[] = [root];

    // start from the root node (set current node to the root node)
    let curr: TreeNode | null = root;

    // loop till stack is empty
    while (stack.length > 0) {

        // if the current node exists, print it and push its right child
        // to the stack before moving to its left child
        if (curr !== null) {
            process.stdout.write(curr.val + ' ');

            if (curr.right) {
                stack.push(curr.right);
            }

            curr = curr.left;
        }
        // if the current node is null, pop a node from the stack
        // set the current node to the popped node
        else {
            curr = stack.pop()!;
        }
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

preorderIterative(root);
```
