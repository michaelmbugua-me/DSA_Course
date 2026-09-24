# Postorder Tree Traversal – Iterative and Recursive

> Source: https://www.techiedelight.com/postorder-tree-traversal-iterative-recursive/

Given a binary tree, write an iterative and recursive solution to traverse the tree using postorder traversal in C++, Java, and Python.

Unlike linked lists, one-dimensional arrays, and other linear data structures, which are traversed in linear order, trees can be traversed in multiple ways in [depth–first order](https://techiedelight.com/depth-first-search/) ([preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/)) or [breadth–first order](https://techiedelight.com/breadth-first-search/) ([level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/)). Beyond these basic traversals, various more complex or hybrid schemes are possible, such as depth-limited searches like iterative deepening depth–first search. In this post, postorder tree traversal is discussed in detail.

Traversing a tree involves iterating over all nodes in some manner. As the tree is not a linear data structure, there can be more than one possible next node from a given node, so some nodes must be deferred, i.e., stored in some way for later visiting. The traversal can be done iteratively where the deferred nodes are stored in the [stack](https://techiedelight.com/stack-implementation/), or it can be done by [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/), where the deferred nodes are stored implicitly in the [call stack](https://en.wikipedia.org/wiki/Call_stack).

For traversing a (non-empty) binary tree in a postorder fashion, we must do these three things for every node `n` starting from the tree’s root:

**`(L)`** Recursively traverse its left subtree. When this step is finished, we are back at `n` again. **`(R)`** Recursively traverse its right subtree. When this step is finished, we are back at `n` again. **`(N)`** Process `n` itself.

In normal postorder traversal, visit the left subtree before the right subtree. If we visit the right subtree before visiting the left subtree, it is referred to as reverse postorder traversal.

> 

## Recursive Implementation

As we can see, before processing any node, the left subtree is processed first, followed by the right subtree, and the node is processed at last. These operations can be defined recursively for each node. The recursive implementation is referred to as a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/), as the search tree is deepened as much as possible on each child before going to the next sibling.

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

// Recursive function to perform postorder traversal on the tree
void postorder(Node* root)
{
    // if the current node is empty
    if (root == nullptr) {
        return;
    }

    // Traverse the left subtree
    postorder(root->left);

    // Traverse the right subtree
    postorder(root->right);

    // Display the data part of the root (or current node)
    cout << root->data << " ";
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

    postorder(root);

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
    // Recursive function to perform postorder traversal on the tree
    public static void postorder(Node root)
    {
        // return if the current node is empty
        if (root == null) {
            return;
        }

        // Traverse the left subtree
        postorder(root.left);

        // Traverse the right subtree
        postorder(root.right);

        // Display the data part of the root (or current node)
        System.out.print(root.data + " ");
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

        postorder(root);
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

# Recursive function to perform postorder traversal on the tree
def postorder(root):

    # return if the current node is empty
    if root is None:
        return

    # Traverse the left subtree
    postorder(root.left)

    # Traverse the right subtree
    postorder(root.right)

    # Display the data part of the root (or current node)
    print(root.data, end=' ')

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

    postorder(root)
```

## Iterative Implementation

To convert the above recursive procedure into an iterative one, we need an explicit stack. Following is a simple stack-based iterative algorithm to perform postorder traversal:

**iterativePostorder(node)** s —> empty stack t —> output stack while (not s.isEmpty()) node —> s.pop() t.push(node) if (node.left <> null) s.push(node.left) if (node.right <> null) s.push(node.right) while (not t.isEmpty()) node —> t.pop() visit(node)

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

// Iterative function to perform postorder traversal on the tree
void postorderIterative(Node* root)
{
    // return if the tree is empty
    if (root == nullptr) {
        return;
    }

    // create an empty stack and push the root node
    stack<Node*> s;
    s.push(root);

    // create another stack to store postorder traversal
    stack<int> out;

    // loop till stack is empty
    while (!s.empty())
    {
        // pop a node from the stack and push the data into the output stack
        Node* curr = s.top();
        s.pop();

        out.push(curr->data);

        // push the left and right child of the popped node into the stack
        if (curr->left) {
            s.push(curr->left);
        }

        if (curr->right) {
            s.push(curr->right);
        }
    }

    // print postorder traversal
    while (!out.empty())
    {
        cout << out.top() << " ";
        out.pop();
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

    postorderIterative(root);

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
    // Iterative function to perform postorder traversal on the tree
    public static void postorderIterative(Node root)
    {
        // return if the tree is empty
        if (root == null) {
            return;
        }

        // create an empty stack and push the root node
        Stack<Node> stack = new Stack<>();
        stack.push(root);

        // create another stack to store postorder traversal
        Stack<Integer> out = new Stack<>();

        // loop till stack is empty
        while (!stack.empty())
        {
            // pop a node from the stack and push the data into the output stack
            Node curr = stack.pop();
            out.push(curr.data);

            // push the left and right child of the popped node into the stack
            if (curr.left != null) {
                stack.push(curr.left);
            }

            if (curr.right != null) {
                stack.push(curr.right);
            }
        }

        // print postorder traversal
        while (!out.empty()) {
            System.out.print(out.pop() + " ");
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

        postorderIterative(root);
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

# Iterative function to perform postorder traversal on the tree
def postorderIterative(root):

    # return if the tree is empty
    if root is None:
        return

    # create an empty stack and push the root node
    stack = deque()
    stack.append(root)

    # create another stack to store postorder traversal
    out = deque()

    # loop till stack is empty
    while stack:

        # pop a node from the stack and push the data into the output stack
        curr = stack.pop()
        out.append(curr.data)

        # push the left and right child of the popped node into the stack
        if curr.left:
            stack.append(curr.left)

        if curr.right:
            stack.append(curr.right)

    # print postorder traversal
    while out:
        print(out.pop(), end=' ')

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

    postorderIterative(root)
```

The time complexity of the above solutions is O(n), where `n` is the total number of nodes in the binary tree. The space complexity of the program is O(n) as the space required is proportional to the height of the tree, which can be equal to the total number of nodes in the tree in worst-case for skewed trees.

**References:** <https://en.wikipedia.org/wiki/Tree_traversal>

**Exercise:** Do iterative postorder traversal using only one stack.
