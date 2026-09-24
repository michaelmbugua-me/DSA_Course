# Invert Binary Tree – Iterative and Recursive Solution

> Source: https://www.techiedelight.com/invert-binary-tree-recursive-iterative/

Given a binary tree, write an efficient algorithm to invert it.

For example,

> 

## Recursive Solution

This is one of the most famous interview questions and can be easily solved recursively. The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), and for every node encountered, swap its left and right child before recursively inverting its left and right subtree. We can also traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/).

The algorithm can be implemented as follows in C++, Java, and Python:

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

// Function to perform preorder traversal on a given binary tree
void preorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

// Function to invert a given binary tree using preorder traversal
void invertBinaryTree(Node* root)
{
    // base case: if the tree is empty
    if (root == nullptr) {
        return;
    }

    // swap left subtree with right subtree
    swap(root->left, root->right);

    // invert left subtree
    invertBinaryTree(root->left);

    // invert right subtree
    invertBinaryTree(root->right);
}

int main()
{
    /* Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    invertBinaryTree(root);
    preorder(root);

    return 0;
}
```

**Output:** 1 3 7 6 2 5 4

##

```java
// A class to store a binary tree node
class Node
{
    int data;
    Node left = null, right = null;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Function to perform preorder traversal on a given binary tree
    public static void preorder(Node root)
    {
        if (root == null) {
            return;
        }

        System.out.print(root.data + " ");
        preorder(root.left);
        preorder(root.right);
    }

    // Utility function to swap left subtree with right subtree
    public static void swap(Node root)
    {
        if (root == null) {
            return;
        }

        Node temp = root.left;
        root.left = root.right;
        root.right = temp;
    }

    // Function to invert a given binary tree using preorder traversal
    public static void invertBinaryTree(Node root)
    {
        // base case: if the tree is empty
        if (root == null) {
            return;
        }

        // swap left subtree with right subtree
        swap(root);

        // invert left subtree
        invertBinaryTree(root.left);

        // invert right subtree
        invertBinaryTree(root.right);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
               /     \
              2       3
             / \     / \
            4   5   6   7
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        invertBinaryTree(root);
        preorder(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to perform preorder traversal on a given binary tree
def preorder(root):

    if root is None:
        return

    print(root.data, end=' ')
    preorder(root.left)
    preorder(root.right)

# Utility function to swap left subtree with right subtree
def swap(root):

    if root is None:
        return

    temp = root.left
    root.left = root.right
    root.right = temp

# Function to invert a given binary tree using preorder traversal
def invertBinaryTree(root):

    # base case: if the tree is empty
    if root is None:
        return

    # swap left subtree with right subtree
    swap(root)

    # invert left subtree
    invertBinaryTree(root.left)

    # invert right subtree
    invertBinaryTree(root.right)

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    invertBinaryTree(root)
    preorder(root)
```

The time complexity of the above recursive solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

## Iterative Solution

We can easily convert the above recursive solution into an iterative one using a [queue](https://techiedelight.com/circular-queue-implementation-c/) or [stack](https://techiedelight.com/stack-implementation/) to store tree nodes.

### 1\. Using Queue:

The code is almost similar to the [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) of a binary tree. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
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

// Function to perform preorder traversal on a given binary tree
void preorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

// Iterative function to invert a given binary tree using a queue
void invertBinaryTree(Node* root)
{
    // base case: if the tree is empty
    if (root == nullptr) {
        return;
    }

    // maintain a queue and push the root node
    queue<Node*> q;
    q.push(root);

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node
        Node* curr = q.front();
        q.pop();

        // swap the left child with the right child
        swap(curr->left, curr->right);

        // enqueue left child of the popped node
        if (curr->left) {
            q.push(curr->left);
        }

        // enqueue right child of the popped node
        if (curr->right) {
            q.push(curr->right);
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
         / \     / \
        4   5   6   7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    invertBinaryTree(root);
    preorder(root);

    return 0;
}
```

**Output:** 1 3 7 6 2 5 4

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// A class to store a binary tree node
class Node
{
    int data;
    Node left = null, right = null;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Function to perform preorder traversal on a given binary tree
    public static void preorder(Node root)
    {
        if (root == null) {
            return;
        }

        System.out.print(root.data + " ");
        preorder(root.left);
        preorder(root.right);
    }

    // Utility function to swap left subtree with right subtree
    public static void swap(Node root)
    {
        if (root == null) {
            return;
        }

        Node temp = root.left;
        root.left = root.right;
        root.right = temp;
    }

    // Iterative function to invert a given binary tree using a queue
    public static void invertBinaryTree(Node root)
    {
        // base case: if the tree is empty
        if (root == null) {
            return;
        }

        // maintain a queue and push the root node
        Queue<Node> q = new ArrayDeque<>();
        q.add(root);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node
            Node curr = q.poll();

            // swap the left child with the right child
            swap(curr);

            // enqueue left child of the popped node
            if (curr.left != null) {
                q.add(curr.left);
            }

            // enqueue right child of the popped node
            if (curr.right != null) {
                q.add(curr.right);
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
             / \     / \
            4   5   6   7
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        invertBinaryTree(root);
        preorder(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to perform preorder traversal on a given binary tree
def preorder(root):

    if root is None:
        return

    print(root.data, end=' ')
    preorder(root.left)
    preorder(root.right)

# Utility function to swap left subtree with right subtree
def swap(root):

    if root is None:
        return

    temp = root.left
    root.left = root.right
    root.right = temp

# Iterative function to invert a given binary tree using a queue
def invertBinaryTree(root):

    # base case: if the tree is empty
    if root is None:
        return

    # maintain a queue and push the root node
    q = deque()
    q.append(root)

    # loop till queue is empty
    while q:

        # dequeue front node
        curr = q.popleft()

        # swap the left child with the right child
        swap(curr)

        # enqueue left child of the popped node
        if curr.left:
            q.append(curr.left)

        # enqueue right child of the popped node
        if curr.right:
            q.append(curr.right)

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    invertBinaryTree(root)
    preorder(root)
```

### 2\. Using Stack:

The code is almost similar to the [iterative preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) of a binary tree. This is demonstrated below in C++, Java, and Python:

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

// Function to perform preorder traversal on a given binary tree
void preorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

// Iterative function to invert a given binary tree using stack
void invertBinaryTree(Node* root)
{
    // base case: if the tree is empty
    if (root == nullptr) {
        return;
    }

    // create an empty stack and push the root node
    stack<Node*> s;
    s.push(root);

    // loop till stack is empty
    while (!s.empty())
    {
        // pop the top node from the stack
        Node* curr = s.top();
        s.pop();

        // swap the left child with the right child
        swap(curr->left, curr->right);

        // enqueue right child of the popped node
        if (curr->right) {
            s.push(curr->right);
        }

        // push the left child of the popped node into the stack
        if (curr->left) {
            s.push(curr->left);
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
         / \     / \
        4   5   6   7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    invertBinaryTree(root);
    preorder(root);

    return 0;
}
```

**Output:** 1 3 7 6 2 5 4
