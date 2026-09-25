# Inorder Tree Traversal – Iterative and Recursive

> Source: https://www.techiedelight.com/inorder-tree-traversal-iterative-recursive/

Given a binary tree, write an iterative and recursive solution to traverse the tree using inorder traversal in TypeScript.

Unlike linked lists, one-dimensional arrays, and other linear data structures, which are traversed in linear order, trees can be traversed in multiple ways in [depth–first order](https://techiedelight.com/depth-first-search/) ([preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/)) or [breadth–first order](https://techiedelight.com/breadth-first-search/) ([level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/)). Beyond these basic traversals, various more complex or hybrid schemes are possible, such as depth-limited searches like iterative deepening depth–first search. In this post, inorder tree traversal is discussed in detail.

Traversing a tree involves iterating over all nodes in some manner. As the tree is not a linear data structure, there can be more than one possible next node from a given node, so some nodes must be deferred, i.e., stored in some way for later visiting. The traversal can be done iteratively where the deferred nodes are stored in the [stack](https://techiedelight.com/stack-implementation/), or it can be done by [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/), where the deferred nodes are stored implicitly in the [call stack](https://en.wikipedia.org/wiki/Call_stack).

For traversing a (non-empty) binary tree in an inorder fashion, we must do these three things for every node `n` starting from the tree’s root:

**`(L)`** Recursively traverse its left subtree. When this step is finished, we are back at `n` again. **`(N)`** Process `n` itself. **`(R)`** Recursively traverse its right subtree. When this step is finished, we are back at `n` again.

In normal inorder traversal, we visit the left subtree before the right subtree. If we visit the right subtree before visiting the left subtree, it is referred to as reverse inorder traversal.

> 

## Recursive Implementation

As we can see, before processing any node, the left subtree is processed first, followed by the node, and the right subtree is processed at last. These operations can be defined recursively for each node. The recursive implementation is referred to as a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/), as the search tree is deepened as much as possible on each child before going to the next sibling.

Following is a TypeScript program that demonstrates it:

```ts
// Data structure to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Recursive function to perform inorder traversal on the tree
function inorder(root: TreeNode | null): void {

    // return if the current node is empty
    if (root === null) {
        return;
    }

    // Traverse the left subtree
    inorder(root.left);

    // Display the data part of the root (or current node)
    process.stdout.write(root.val + ' ');

    // Traverse the right subtree
    inorder(root.right);
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

inorder(root);
```

## Iterative Implementation

To convert the above recursive procedure into an iterative one, we need an explicit stack. Following is a simple stack-based iterative algorithm to perform inorder traversal:

**iterativeInorder(node)** s —> empty stack while (not s.isEmpty() or node != null) if (node != null) s.push(node) node —> node.left else node —> s.pop() visit(node) node —> node.right

The algorithm can be implemented as follows in TypeScript:

```ts
// Data structure to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Iterative function to perform inorder traversal on the tree
function inorderIterative(root: TreeNode | null): void {

    // create an empty stack
    const stack: TreeNode[] = [];

    // start from the root node (set current node to the root node)
    let curr = root;

    // if the current node is null and the stack is also empty, we are done
    while (stack.length > 0 || curr !== null) {

        // if the current node exists, push it into the stack (defer it)
        // and move to its left child
        if (curr !== null) {
            stack.push(curr);
            curr = curr.left;
        } else {
            // otherwise, if the current node is null, pop an element from the stack,
            // print it, and finally set the current node to its right child
            curr = stack.pop()!;
            process.stdout.write(curr.val + ' ');

            curr = curr.right;
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

inorderIterative(root);
```

The time complexity of the above solutions is O(n), where `n` is the total number of nodes in the binary tree. The space complexity of the program is O(n) as the space required is proportional to the height of the tree, which can be equal to the total number of nodes in the tree in worst-case for skewed trees.

**References:** <https://en.wikipedia.org/wiki/Tree_traversal>
