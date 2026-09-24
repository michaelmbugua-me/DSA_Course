# Preorder Tree Traversal – Iterative and Recursive

> Source: https://www.techiedelight.com/preorder-tree-traversal-iterative-recursive/

Given a binary tree, write an iterative and recursive solution to traverse the tree using preorder traversal in C++, Java, and Python.

Unlike linked lists, one-dimensional arrays, and other linear data structures, which are traversed in linear order, trees can be traversed in multiple ways in [depth–first order](https://techiedelight.com/depth-first-search/) ([preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/)) or [breadth–first order](https://techiedelight.com/breadth-first-search/) ([level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/)). Beyond these basic traversals, various more complex or hybrid schemes are possible, such as depth-limited searches like iterative deepening depth–first search. In this post, preorder tree traversal is discussed in detail.

Traversing a tree involves iterating over all nodes in some manner. As the tree is not a linear data structure, there can be more than one possible next node from a given node, so some nodes must be deferred, i.e., stored in some way for later visiting. The traversal can be done iteratively where the deferred nodes are stored in the [stack](https://techiedelight.com/stack-implementation/), or it can be done by [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/), where the deferred nodes are stored implicitly in the [call stack](https://en.wikipedia.org/wiki/Call_stack).

For traversing a (non-empty) binary tree in a preorder fashion, we must do these three things for every node `n` starting from the tree’s root:

**`(N)`** Process `n` itself. **`(L)`** Recursively traverse its left subtree. When this step is finished, we are back at `n` again. **`(R)`** Recursively traverse its right subtree. When this step is finished, we are back at `n` again.

In normal preorder traversal, visit the left subtree before the right subtree. If we visit the right subtree before visiting the left subtree, it is referred to as reverse preorder traversal.

> 

## Recursive Implementation

As we can see, only after processing any node, the left subtree is processed, followed by the right subtree. These operations can be defined recursively for each node. The recursive implementation is referred to as a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/), as the search tree is deepened as much as possible on each child before going to the next sibling.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node *left, *right;

    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Recursive function to perform preorder traversal on the tree
void preorder(Node* root)
{
    // if the current node is empty
    if (root == nullptr) {
        return;
    }

    // Display the data part of the root (or current node)
    cout << root->data << " ";

    // Traverse the left subtree
    preorder(root->left);

    // Traverse the right subtree
    preorder(root->right);
}

int main()
{
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

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    preorder(root);

    return 0;
}
```

##

```java
// Data structure to store a binary tree node
class Node
{
    int data;
    Node left, right;

    // Function to create a new binary tree node having a given key
    public Node(int key)
    {
        data = key;
        left = right = null;
    }
}

class Main
{
    // Recursive function to perform preorder traversal on the tree
    public static void preorder(Node root)
    {
        // return if the current node is empty
        if (root == null) {
            return;
        }

        // Display the data part of the root (or current node)
        System.out.print(root.data + " ");

        // Traverse the left subtree
        preorder(root.left);

        // Traverse the right subtree
        preorder(root.right);
    }

    public static void main(String[] args)
    {
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

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        preorder(root);
    }
}
```

##

```python3
# Data structure to store a binary tree node
class Node:
    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to perform preorder traversal on the tree
def preorder(root):

    # return if the current node is empty
    if root is None:
        return

    # Display the data part of the root (or current node)
    print(root.data, end=' ')

    # Traverse the left subtree
    preorder(root.left)

    # Traverse the right subtree
    preorder(root.right)

if __name__ == '__main__':

    ''' Construct the following tree
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
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    preorder(root)
```

## Iterative Implementation

To convert the above recursive procedure into an iterative one, we need an explicit stack. Following is a simple stack-based iterative algorithm to perform preorder traversal:

**iterativePreorder(node)** if (node = null) return s —> empty stack s.push(node) while (not s.isEmpty()) node —> s.pop() visit(node) if (node.right != null) s.push(node.right) if (node.left != null) s.push(node.left)

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node *left, *right;

    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Iterative function to perform preorder traversal on the tree
void preorderIterative(Node* root)
{
    // return if the tree is empty
    if (root == nullptr)
    return;

    // create an empty stack and push the root node
    stack<Node*> stack;
    stack.push(root);

    // loop till stack is empty
    while (!stack.empty())
    {
        // pop a node from the stack and print it
        Node* curr = stack.top();
        stack.pop();

        cout << curr->data << " ";

        // push the right child of the popped node into the stack
        if (curr->right) {
            stack.push(curr->right);
        }

        // push the left child of the popped node into the stack
        if (curr->left) {
            stack.push(curr->left);
        }

        // the right child must be pushed first so that the left child
        // is processed first (LIFO order)
    }
}

int main()
{
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

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    preorderIterative(root);

    return 0;
}
```

##

```java
import java.util.Stack;

// Data structure to store a binary tree node
class Node
{
    int data;
    Node left, right;

    // Function to create a new binary tree node having a given key
    public Node(int key)
    {
        data = key;
        left = right = null;
    }
}

class Main
{
    // Iterative function to perform preorder traversal on the tree
    public static void preorderIterative(Node root)
    {
        // return if the tree is empty
        if (root == null) {
            return;
        }

        // create an empty stack and push the root node
        Stack<Node> stack = new Stack<>();
        stack.push(root);

        // loop till stack is empty
        while (!stack.empty())
        {
            // pop a node from the stack and print it
            Node curr = stack.pop();

            System.out.print(curr.data + " ");

            // push the right child of the popped node into the stack
            if (curr.right != null) {
                stack.push(curr.right);
            }

            // push the left child of the popped node into the stack
            if (curr.left != null) {
                stack.push(curr.left);
            }

            // the right child must be pushed first so that the left child
            // is processed first (LIFO order)
        }
    }

    public static void main(String[] args)
    {
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

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        preorderIterative(root);
    }
}
```

##

```python3
from collections import deque

# Data structure to store a binary tree node
class Node:
    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Iterative function to perform preorder traversal on the tree
def preorderIterative(root):

    # return if the tree is empty
    if root is None:
        return

    # create an empty stack and push the root node
    stack = deque()
    stack.append(root)

    # loop till stack is empty
    while stack:

        # pop a node from the stack and print it
        curr = stack.pop()

        print(curr.data, end=' ')

        # push the right child of the popped node into the stack
        if curr.right:
            stack.append(curr.right)

        # push the left child of the popped node into the stack
        if curr.left:
            stack.append(curr.left)

    # the right child must be pushed first so that the left child
    # is processed first (LIFO order)

if __name__ == '__main__':

    ''' Construct the following tree
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
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    preorderIterative(root)
```

The above solution can be further optimized by pushing only the right children to the stack.

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node *left, *right;

    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Iterative function to perform preorder traversal on the tree
void preorderIterative(Node* root)
{
    // return if the tree is empty
    if (root == nullptr) {
        return;
    }

    // create an empty stack and push the root node
    stack<Node*> stack;
    stack.push(root);

    // start from the root node (set current node to the root node)
    Node* curr = root;

    // loop till stack is empty
    while (!stack.empty())
    {
        // if the current node exists, print it and push its right child
        // to the stack before moving to its left child
        if (curr != nullptr)
        {
            cout << curr->data << " ";

            if (curr->right) {
                stack.push(curr->right);
            }

            curr = curr->left;
        }
        // if the current node is null, pop a node from the stack
        // set the current node to the popped node
        else {
            curr = stack.top();
            stack.pop();
        }
    }
}

int main()
{
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

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    preorderIterative(root);

    return 0;
}
```
