# Find inorder predecessor for the given key in a BST

> Source: https://www.techiedelight.com/find-inorder-predecessor-given-key-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST, find the [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) predecessor of a given key in it. If the key does not lie in the BST, return the previous greater node (if any) present in the BST.

An inorder predecessor of a node in the BST is the previous node in the inorder traversal of it. For example, consider the following tree:

The inorder predecessor of 8 does not exist. The inorder predecessor of 10 is 8 The inorder predecessor of 12 is 10 The inorder predecessor of 20 is 16

> 

A node’s inorder predecessor is a node with maximum value in its left subtree, i.e., its left subtree’s right-most child. If the left subtree of the node doesn’t exist, then the inorder predecessor is one of its ancestors. To find which ancestors are the predecessor, move up the tree towards the root until we encounter a node that is the right child of its parent. If any such node is found, then the inorder predecessor is its parent; otherwise, the inorder predecessor does not exist for the node.

## Recursive Version

We can recursively check the above conditions. The idea is to search for the given node in the tree and update the predecessor to the current node before visiting its right subtree. If the node is found in the BST, return the maximum value node in its left subtree. If the left subtree of the node doesn’t exist, then the inorder predecessor is one of its ancestors, which is already being updated while searching for the given key.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Recursive function to insert a key into a BST
Node* insert(Node* root, int key)
{
    // if the root is null, create a new node and return it
    if (root == nullptr) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root->data) {
        root->left = insert(root->left, key);
    }
    // if the given key is more than the root node, recur for the right subtree
    else {
        root->right = insert(root->right, key);
    }

    return root;
}

// Helper function to find the maximum value node in a given BST
Node* findMaximum(Node* root)
{
    while (root->right) {
        root = root->right;
    }

    return root;
}

// Recursive function to find inorder predecessor for a given key in the BST
Node* findPredecessor(Node* root, Node* prec, int key)
{
    // base case
    if (root == nullptr) {
        return prec;
    }

    // if a node with the desired value is found, the predecessor is the maximum
    // value node in its left subtree (if any)
    if (root->data == key)
    {
        if (root->left != nullptr) {
            return findMaximum(root->left);
        }
    }

    // if the given key is less than the root node, recur for the left subtree
    else if (key < root->data) {
        return findPredecessor(root->left, prec, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        // update predecessor to the current node before recursing
        // in the right subtree
        prec = root;
        return findPredecessor(root->right, prec, key);
    }
    return prec;
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16, 25 };

    /* Construct the following tree
               15
             /    \
            /      \
           10       20
          / \      /  \
         /   \    /    \
        8    12  16    25
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    // find inorder predecessor for each key
    for (int key: keys)
    {
        Node* prec = findPredecessor(root, nullptr, key);

        if (prec != nullptr) {
            cout << "The predecessor of node " << key << " is " << prec->data << endl;
        }
        else {
            cout << "The predecessor doesn't exist for " << key << endl;
        }
    }

    return 0;
}
```

##

```java
// A class to store a BST node
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
    // Recursive function to insert a key into a BST
    public static Node insert(Node root, int key)
    {
        // if the root is null, create a new node and return it
        if (root == null) {
            return new Node(key);
        }

        // if the given key is less than the root node, recur for the left subtree
        if (key < root.data) {
            root.left = insert(root.left, key);
        }

        // if the given key is more than the root node, recur for the right subtree
        else {
            root.right = insert(root.right, key);
        }

        return root;
    }

    // Helper function to find the maximum value node in a given BST
    public static Node findMaximum(Node root)
    {
        while (root.right != null) {
            root = root.right;
        }

        return root;
    }

    // Recursive function to find inorder predecessor for a given key in the BST
    public static Node findPredecessor(Node root, Node prec, int key)
    {
        // base case
        if (root == null) {
            return prec;
        }

        // if a node with the desired value is found, the predecessor is the maximum
        // value node in its left subtree (if any)
        if (root.data == key)
        {
            if (root.left != null) {
                return findMaximum(root.left);
            }
        }

        // if the given key is less than the root node, recur for the left subtree
        else if (key < root.data) {
            return findPredecessor(root.left, prec, key);
        }

        // if the given key is more than the root node, recur for the right subtree
        else {
            // update predecessor to the current node before recursing
            // in the right subtree
            prec = root;
            return findPredecessor(root.right, prec, key);
        }
        return prec;
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        /* Construct the following tree
                   15
                 /    \
                /      \
               10       20
              /  \     /  \
             /    \   /    \
            8     12 16    25
        */

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        // find inorder predecessor for each key
        for (int key: keys)
        {
            Node prec = findPredecessor(root, null, key);

            if (prec != null)
            {
                System.out.println("The predecessor of node " + key + " is "
                                    + prec.data);
            }
            else {
                System.out.println("The predecessor doesn't exist for node "
                                    + key);
            }
        }
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to insert a key into a BST
def insert(root, key):

    # if the root is None, create a new node and return it
    if root is None:
        return Node(key)

    # if the given key is less than the root node, recur for the left subtree
    if key < root.data:
        root.left = insert(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        root.right = insert(root.right, key)

    return root

# Helper function to find the maximum value node in a given BST
def findMaximum(root):
    while root.right:
        root = root.right
    return root

# Recursive function to find inorder predecessor for a given key in a BST
def findPredecessor(root, prec, key):

    # base case
    if root is None:
        return prec

    # if a node with the desired value is found, the predecessor is the maximum value
    # node in its left subtree (if any)
    if root.data == key:
        if root.left:
            return findMaximum(root.left)

    # if the given key is less than the root node, recur for the left subtree
    elif key < root.data:
        return findPredecessor(root.left, prec, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        # update predecessor to the current node before recursing
        # in the right subtree
        prec = root
        return findPredecessor(root.right, prec, key)

    return prec

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    ''' Construct the following tree
               15
             /    \
            /      \
           10       20
          / \      /  \
         /   \    /    \
        8    12  16    25
    '''

    root = None
    for key in keys:
        root = insert(root, key)

    # find inorder predecessor for each key
    for key in keys:
        prec = findPredecessor(root, None, key)

        if prec:
            print(f'Predecessor of node {key} is {prec.data}')
        else:
            print('The predecessor doesn\'t exist for node', key)
```

**Output:** The predecessor of node 15 is 12 The predecessor of node 10 is 8 The predecessor of node 20 is 16 The predecessor doesn’t exist for node 8 The predecessor of node 12 is 10 The predecessor of node 16 is 15 The predecessor of node 25 is 20

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

## Iterative Version

The same algorithm can be easily implemented iteratively as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Recursive function to insert a key into a BST
Node* insert(Node* root, int key)
{
    // if the root is null, create a new node and return it
    if (root == nullptr) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root->data) {
        root->left = insert(root->left, key);
    }
    // if the given key is more than the root node, recur for the right subtree
    else {
        root->right = insert(root->right, key);
    }

    return root;
}

// Helper function to find the maximum value node in a given BST
Node* findMaximum(Node* root)
{
    while (root->right) {
        root = root->right;
    }

    return root;
}

// Iterative function to find inorder predecessor for a given key in a BST
Node* findPredecessor(Node* root, int key)
{
    // base case
    if (root == nullptr) {
        return nullptr;
    }

    Node* prec = nullptr;

    while (1)
    {
        // if the given key is less than the root node, visit the left subtree
        if (key < root->data) {
            root = root->left;
        }

        // if the given key is more than the root node, visit the right subtree
        else if (key > root->data)
        {
            // update predecessor to the current node before visiting
            // right subtree
            prec = root;
            root = root->right;
        }

        // if a node with the desired value is found, the predecessor is the maximum
        // value node in its left subtree (if any)
        else {
            if (root->left) {
                prec = findMaximum(root->left);
            }
            break;
        }

        // if the key doesn't exist in the binary tree, return previous greater node
        if (!root) {
            return prec;
        }
    }

    // return predecessor, if any
    return prec;
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16, 25 };

    /* Construct the following tree
               15
             /    \
            /      \
           10       20
          / \      /  \
         /   \    /    \
        8    12  16    25
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    // find inorder predecessor for each key
    for (int key: keys)
    {
        Node* prec = findPredecessor(root, key);

        if (prec != nullptr) {
            cout << "The predecessor of node " << key << " is " << prec->data << endl;
        }
        else {
            cout << "The predecessor doesn't exist for " << key << endl;
        }
    }

    return 0;
}
```

##

```java
// A class to store a BST node
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
    // Recursive function to insert a key into a BST
    public static Node insert(Node root, int key)
    {
        // if the root is null, create a new node and return it
        if (root == null) {
            return new Node(key);
        }

        // if the given key is less than the root node, recur for the left subtree
        if (key < root.data) {
            root.left = insert(root.left, key);
        }

        // if the given key is more than the root node, recur for the right subtree
        else {
            root.right = insert(root.right, key);
        }

        return root;
    }

    // Helper function to find the maximum value node in a given BST
    public static Node findMaximum(Node root)
    {
        while (root.right != null) {
            root = root.right;
        }

        return root;
    }

    // Iterative function to find inorder predecessor for a given key in the BST
    public static Node findPredecessor(Node root, int key)
    {
        // base case
        if (root == null) {
            return null;
        }

        Node prec = null;

        while (true)
        {
            // if the given key is less than the root node, visit the left subtree
            if (key < root.data) {
                root = root.left;
            }

            // if the given key is more than the root node, visit the right subtree
            else if (key > root.data)
            {
                // update predecessor to the current node before visiting
                // right subtree
                prec = root;
                root = root.right;
            }

            // if a node with the desired value is found, the predecessor is the
            // maximum value node in its left subtree (if any)
            else {
                if (root.left!= null) {
                    prec = findMaximum(root.left);
                }
                break;
            }

            // if the key doesn't exist in the binary tree,
            // return previous greater node
            if (root == null) {
                return prec;
            }
        }

        // return predecessor, if any
        return prec;
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        /* Construct the following tree
                   15
                 /    \
                /      \
               10       20
              /  \     /  \
             /    \   /    \
            8     12 16    25
        */

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        // find inorder predecessor for each key
        for (int key: keys)
        {
            Node prec = findPredecessor(root, key);

            if (prec != null)
            {
                System.out.println("The predecessor of node " + key + " is "
                                    + prec.data);
            }
            else {
                System.out.println("The predecessor doesn't exist for node " + key);
            }
        }
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to insert a key into a BST
def insert(root, key):

    # if the root is None, create a new node and return it
    if root is None:
        return Node(key)

    # if the given key is less than the root node, recur for the left subtree
    if key < root.data:
        root.left = insert(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        root.right = insert(root.right, key)

    return root

# Function to find the maximum value node in a given BST
def findMaximum(root):
    while root.right:
        root = root.right
    return root

# Iterative function to find inorder predecessor for a given key in a BST
def findPredecessor(root, key):

    # base case
    if not root:
        return None

    prec = None

    while True:

        # if the given key is less than the root node, visit the left subtree
        if key < root.data:
            root = root.left

        # if the given key is more than the root node, visit the right subtree
        elif key > root.data:
            # update predecessor to the current node before visiting
            # right subtree
            prec = root
            root = root.right

        # if a node with the desired value is found, the predecessor is the maximum
        # value node in its left subtree (if any)
        else:
            if root.left:
                prec = findMaximum(root.left)
            break

        # if the key doesn't exist in the binary tree, return previous greater node
        if root is None:
            return prec

    # return predecessor, if any
    return prec

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    ''' Construct the following tree
               15
             /    \
            /      \
           10       20
          / \      /  \
         /   \    /    \
        8    12  16    25
    '''

    root = None
    for key in keys:
        root = insert(root, key)

    # find inorder predecessor for each key
    for key in keys:
        prec = findPredecessor(root, key)
        if prec:
            print(f'Predecessor of node {key} is {prec.data}')
        else:
            print('The predecessor doesn\'t exist for node', key)
```

**Output:** The predecessor of node 15 is 12 The predecessor of node 10 is 8 The predecessor of node 20 is 16 The predecessor doesn’t exist for node 8 The predecessor of node 12 is 10 The predecessor of node 16 is 15 The predecessor of node 25 is 20

The time complexity of the above solution is O(n), where `n` is the size of the BST. The auxiliary space required by the program is O(1).
