# Find ancestors of a given node in a binary tree

> Source: https://www.techiedelight.com/find-ancestors-of-given-node-binary-tree/

Given a binary tree, find all ancestors of a given node in it.

For example, consider the following binary tree:

The ancestor of node 9 are 7, 3 and 1 The ancestor of node 6 is 3 and 1 The ancestor of node 5 is 2 and 1 … …

> 

## Recursive Solution

The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and search for a given node in the tree. For any node, if the given node is found in either its left subtree or its right subtree, then the current node is an ancestor of it. The algorithm can be implemented as follows in C++, Java, and Python:

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

// Recursive function to print all ancestors of a given node in a binary tree.
// The function returns true if the node is found in the subtree rooted at the
// given root node.
bool printAncestors(Node* root, Node* node)
{
    // base case
    if (root == nullptr) {
        return false;
    }

    // return true if a given node is found
    if (root == node) {
        return true;
    }

    // search node in the left subtree
    bool left = printAncestors(root->left, node);

    // search node in the right subtree
    bool right = false;
    if (!left) {
        right = printAncestors(root->right, node);
    }

    // if the given node is found in either left or right subtree,
    // the current node is an ancestor of a given node
    if (left || right) {
        cout << root->data << " ";
    }

    // return true if a node is found
    return left || right;
}

int main()
{
    /* Construct the following tree
         1
       /   \
      /     \
     2       3
      \     / \
       4   5   6
          / \
         7   8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->right = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    Node* node = root->right->left->left;    // Node 7
    printAncestors(root, node);

    return 0;
}
```

**Output:** 5 3 1

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
    // Recursive function to print all ancestors of a given node in a binary tree.
    // The function returns true if the node is found in the subtree rooted at the
    // given root node.
    public static boolean printAncestors(Node root, Node node)
    {
        // base case
        if (root == null) {
            return false;
        }

        // return true if a given node is found
        if (root == node) {
            return true;
        }

        // search node in the left subtree
        boolean left = printAncestors(root.left, node);

        // search node in the right subtree
        boolean right = false;
        if (!left) {
            right = printAncestors(root.right, node);
        }

        // if the given node is found in either left or right subtree,
        // the current node is an ancestor of a given node
        if (left || right) {
            System.out.print(root.data + " ");
        }

        // return true if a node is found
        return left || right;
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
               /     \
              2       3
               \     / \
                4   5   6
                   / \
                  7   8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.right = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        Node node = root.right.left.left;    // Node 7
        printAncestors(root, node);
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

# Recursive function to print all ancestors of a given node in a binary tree.
# The function returns true if the node is found in the subtree rooted at the
# given root node.
def printAncestors(root, node):

    # base case
    if root is None:
        return False

    # return true if a given node is found
    if root == node:
        return True

    # search node in the left subtree
    left = printAncestors(root.left, node)

    # search node in the right subtree
    right = False
    if not left:
        right = printAncestors(root.right, node)

    # if the given node is found in either left or right subtree,
    # the current node is an ancestor of a given node
    if left or right:
        print(root.data, end=' ')

    # return true if a node is found
    return left or right

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
           \     / \
            4   5   6
               / \
              7   8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.right = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    node = root.right.left.left        # Node 7
    printAncestors(root, node)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

## Iterative Solution

The idea is to maintain a map to store the parent node of all nodes present in the tree. Then perform an [iterative preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree and set the parent pointer of each node. Finally, print ancestors of the given key by using a parent map.

Following is the implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
#include <unordered_map>
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

// Function to print root-to-leaf paths without using recursion
void printTopToBottomPath(unordered_map<Node*, Node*> parent, Node* node)
{
    while (node = parent[node]) {
        cout << node->data << " ";
    }
    cout << endl;
}

// Iterative function to set parent nodes for all nodes of the binary tree
// in a given map. The function is similar to the iterative preorder traversal
void setParent(Node* root, unordered_map<Node*, Node*> &parent)
{
    // create an empty stack and push the root node
    stack<Node*> stack;
    stack.push(root);

    // loop till stack is empty
    while (!stack.empty())
    {
        // Pop the top item from the stack
        Node* curr = stack.top();
        stack.pop();

        // push its right child into the stack and set its parent on the map
        if (curr->right)
        {
            parent[curr->right] = curr;
            stack.push(curr->right);
        }

        // push its left child into the stack and set its parent on the map
        if (curr->left)
        {
            parent[curr->left] = curr;
            stack.push(curr->left);
        }
    }
}

// Iterative function to print all ancestors of a given node in a binary tree
void printAncestors(Node* root, Node* node)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // create an empty map to store parent pointers of binary tree nodes
    unordered_map<Node*, Node*> parent;

    // set the parent of the root node as nullptr
    parent[root] = nullptr;

    // set parent nodes for all nodes of the binary tree
    setParent(root, parent);

    // print ancestors of a given node using the parent map
    printTopToBottomPath(parent, node);
}

int main()
{
    /* Construct the following tree
            1
          /   \
         /     \
        2       3
         \     / \
          4   5   6
             / \
            7   8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->right = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    Node* node = root->right->left->left;    // Node 7
    printAncestors(root, node);

    return 0;
}
```

**Output:** 5 3 1

##

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

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
    // Function to print root-to-leaf paths without using recursion
    public static void printTopToBottomPath(Map<Node, Node> parent, Node node)
    {
        while ((node = parent.get(node)) != null) {
            System.out.print(node.data + " ");
        }
    }

    // Iterative function to set parent nodes for all nodes of the binary tree
    // in a given map. The function is similar to the iterative preorder traversal
    public static void setParent(Node root, Map<Node, Node> parent)
    {
        // create an empty stack and push the root node
        Deque<Node> stack = new ArrayDeque<>();
        stack.add(root);

        // loop till stack is empty
        while (!stack.isEmpty())
        {
            // Pop the top item from the stack
            Node curr = stack.pollLast();

            // push its right child into the stack and set its parent on the map
            if (curr.right != null)
            {
                parent.put(curr.right, curr);
                stack.add(curr.right);
            }

            // push its left child into the stack and set its parent on the map
            if (curr.left != null)
            {
                parent.put(curr.left, curr);
                stack.add(curr.left);
            }
        }
    }

    // Iterative function to print all ancestors of a given node in a binary tree
    public static void printAncestors(Node root, Node node)
    {
        // base case
        if (root == null) {
            return;
        }

        // create an empty map to store parent pointers of binary tree nodes
        Map<Node, Node> parent = new HashMap<>();

        // set the parent of the root node as null
        parent.put(root, null);

        // set parent nodes for all nodes of the binary tree
        setParent(root, parent);

        // print ancestors of a given node using the parent map
        printTopToBottomPath(parent, node);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                1
              /   \
             /     \
            2       3
             \     / \
              4   5   6
                 / \
                7   8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.right = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        Node node = root.right.left.left;    // Node 7
        printAncestors(root, node);
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

# Function to print root-to-leaf paths without using recursion
def printTopToBottomPath(parent, node):
    while node:
        print(node.data, end=' ')
        node = parent.setdefault(node, None)

# Iterative function to set parent nodes for all nodes of the binary tree
# in a given dict. The function is similar to the iterative preorder traversal
def setParent(root, parent):

    # create an empty stack and push the root node
    stack = deque()
    stack.append(root)

    # loop till stack is empty
    while stack:

        # Pop the top item from the stack
        curr = stack.pop()

        # push its right child into the stack and set its parent on the dictionary
        if curr.right:
            parent[curr.right] = curr
            stack.append(curr.right)

        # push its left child into the stack and set its parent on the dictionary
        if curr.left:
            parent[curr.left] = curr
            stack.append(curr.left)

# Iterative function to print all ancestors of a given node in a binary tree
def printAncestors(root, node):

    # base case
    if root is None:
        return

    # create an empty dictionary to store parent pointers of binary tree nodes.
    # set the parent of the root node as None
    parent = {root: None}

    # set parent nodes for all nodes of the binary tree
    setParent(root, parent)

    # print ancestors of a given node using the parent dictionary
    printTopToBottomPath(parent, parent.setdefault(node, None))

if __name__ == '__main__':

    ''' Construct the following tree
            1
          /   \
         /     \
        2       3
         \     / \
          4   5   6
             / \
            7   8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.right = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    node = root.right.left.left        # Node 7
    printAncestors(root, node)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.
