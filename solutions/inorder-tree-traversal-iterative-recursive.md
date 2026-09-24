# Inorder Tree Traversal – Iterative and Recursive

> Source: https://www.techiedelight.com/inorder-tree-traversal-iterative-recursive/

Given a binary tree, write an iterative and recursive solution to traverse the tree using inorder traversal in C++, Java, and Python.

Unlike linked lists, one-dimensional arrays, and other linear data structures, which are traversed in linear order, trees can be traversed in multiple ways in [depth–first order](https://techiedelight.com/depth-first-search/) ([preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/)) or [breadth–first order](https://techiedelight.com/breadth-first-search/) ([level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/)). Beyond these basic traversals, various more complex or hybrid schemes are possible, such as depth-limited searches like iterative deepening depth–first search. In this post, inorder tree traversal is discussed in detail.

Traversing a tree involves iterating over all nodes in some manner. As the tree is not a linear data structure, there can be more than one possible next node from a given node, so some nodes must be deferred, i.e., stored in some way for later visiting. The traversal can be done iteratively where the deferred nodes are stored in the [stack](https://techiedelight.com/stack-implementation/), or it can be done by [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/), where the deferred nodes are stored implicitly in the [call stack](https://en.wikipedia.org/wiki/Call_stack).

For traversing a (non-empty) binary tree in an inorder fashion, we must do these three things for every node `n` starting from the tree’s root:

**`(L)`** Recursively traverse its left subtree. When this step is finished, we are back at `n` again. **`(N)`** Process `n` itself. **`(R)`** Recursively traverse its right subtree. When this step is finished, we are back at `n` again.

In normal inorder traversal, we visit the left subtree before the right subtree. If we visit the right subtree before visiting the left subtree, it is referred to as reverse inorder traversal.

> 

## Recursive Implementation

As we can see, before processing any node, the left subtree is processed first, followed by the node, and the right subtree is processed at last. These operations can be defined recursively for each node. The recursive implementation is referred to as a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/), as the search tree is deepened as much as possible on each child before going to the next sibling.

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

// Recursive function to perform inorder traversal on the tree
void inorder(Node* root)
{
    // return if the current node is empty
    if (root == nullptr) {
        return;
    }

    // Traverse the left subtree
    inorder(root->left);

    // Display the data part of the root (or current node)
    cout << root->data << " ";

    // Traverse the right subtree
    inorder(root->right);
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

    inorder(root);

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
    // Recursive function to perform inorder traversal on the tree
    public static void inorder(Node root)
    {
        // return if the current node is empty
        if (root == null) {
            return;
        }

        // Traverse the left subtree
        inorder(root.left);

        // Display the data part of the root (or current node)
        System.out.print(root.data + " ");

        // Traverse the right subtree
        inorder(root.right);
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

        inorder(root);
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

# Recursive function to perform inorder traversal on the tree
def inorder(root):

    # return if the current node is empty
    if root is None:
        return

    # Traverse the left subtree
    inorder(root.left)

    # Display the data part of the root (or current node)
    print(root.data, end=' ')

    # Traverse the right subtree
    inorder(root.right)

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

    inorder(root)
```

## Iterative Implementation

To convert the above recursive procedure into an iterative one, we need an explicit stack. Following is a simple stack-based iterative algorithm to perform inorder traversal:

**iterativeInorder(node)** s —> empty stack while (not s.isEmpty() or node != null) if (node != null) s.push(node) node —> node.left else node —> s.pop() visit(node) node —> node.right

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

// Iterative function to perform inorder traversal on the tree
void inorderIterative(Node* root)
{
    // create an empty stack
    stack<Node*> stack;

    // start from the root node (set current node to the root node)
    Node* curr = root;

    // if the current node is null and the stack is also empty, we are done
    while (!stack.empty() || curr != nullptr)
    {
        // if the current node exists, push it into the stack (defer it)
        // and move to its left child
        if (curr != nullptr)
        {
            stack.push(curr);
            curr = curr->left;
        }
        else {
            // otherwise, if the current node is null, pop an element from the stack,
            // print it, and finally set the current node to its right child
            curr = stack.top();
            stack.pop();
            cout << curr->data << " ";

            curr = curr->right;
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

    inorderIterative(root);

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
    // Iterative function to perform inorder traversal on the tree
    public static void inorderIterative(Node root)
    {
        // create an empty stack
        Stack<Node> stack = new Stack<>();

        // start from the root node (set current node to the root node)
        Node curr = root;

        // if the current node is null and the stack is also empty, we are done
        while (!stack.empty() || curr != null)
        {
            // if the current node exists, push it into the stack (defer it)
            // and move to its left child
            if (curr != null)
            {
                stack.push(curr);
                curr = curr.left;
            }
            else {
                // otherwise, if the current node is null, pop an element from
                // the stack, print it, and finally set the current node to its
                // right child
                curr = stack.pop();
                System.out.print(curr.data + " ");

                curr = curr.right;
            }
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

        inorderIterative(root);
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

# Iterative function to perform inorder traversal on the tree
def inorderIterative(root):

    # create an empty stack
    stack = deque()

    # start from the root node (set current node to the root node)
    curr = root

    # if the current node is None and the stack is also empty, we are done
    while stack or curr:

        # if the current node exists, push it into the stack (defer it)
        # and move to its left child
        if curr:
            stack.append(curr)
            curr = curr.left
        else:
            # otherwise, if the current node is None, pop an element from the stack,
            # print it, and finally set the current node to its right child
            curr = stack.pop()
            print(curr.data, end=' ')

            curr = curr.right

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

    inorderIterative(root)
```

The time complexity of the above solutions is O(n), where `n` is the total number of nodes in the binary tree. The space complexity of the program is O(n) as the space required is proportional to the height of the tree, which can be equal to the total number of nodes in the tree in worst-case for skewed trees.

**References:** <https://en.wikipedia.org/wiki/Tree_traversal>
