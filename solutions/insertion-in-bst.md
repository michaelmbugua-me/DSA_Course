# Insertion in a BST – Iterative and Recursive Solution

> Source: https://www.techiedelight.com/insertion-in-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

A **Binary Search Tree (BST)** is a rooted binary tree, whose nodes each store a key (and optionally, an associated value), and each has two distinguished subtrees, commonly denoted left and right. The tree should satisfy the BST property, which states that each node’s key must be greater than all keys stored in the left subtree and not greater than all keys in the right subtree. Ideally, unique values should be present in the tree.

Binary search trees are a fundamental data structure used to construct more abstract data structures such as sets, multisets, and associative arrays (maps, multimaps, etc.).

> 

## Recursive Version

When looking for a place to insert a new key, traverse the tree from root-to-leaf, making comparisons to keys stored in the tree’s nodes and deciding based on the comparison to continue searching in the left or right subtrees. In other words, we examine the root and recursively insert the new node to the left subtree if its key is less than that of the root or the right subtree if its key is greater than or equal to the root.

Following is the implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Function to perform inorder traversal on the tree
void inorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

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

// Function to construct a BST from given keys
Node* constructBST(vector<int> const &keys)
{
    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }
    return root;
}

int main()
{
    vector<int> keys = { 15, 10, 20, 8, 12, 16, 25 };

    Node* root = constructBST(keys);
    inorder(root);

    return 0;
}
```

**Output:** 8 10 12 15 16 20 25

##

```java
// A class to store a BST node
class Node
{
    int data;
    Node left, right;

    // Function to create a new binary tree node having a given key
    Node(int key)
    {
        data = key;
        left = right = null;
    }
}

class Main
{
    // Function to perform inorder traversal on the tree
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    // Recursive function to insert a key into a BST
    public static Node insert(Node root, int key)
    {
        // if the root is null, create a new node and return it
        if (root == null) {
            return new Node(key);
        }

        // if the given key is less than the root node,
        // recur for the left subtree
        if (key < root.data) {
            root.left = insert(root.left, key);
        }

        // otherwise, recur for the right subtree
        else {
            // key >= root.data
            root.right = insert(root.right, key);
        }

        return root;
    }

    // Function to construct a BST from given keys
    public static Node constructBST(int[] keys)
    {
        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }
        return root;
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        Node root = constructBST(keys);
        inorder(root);
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    left = right = None

    # Function to create a new binary tree node having a given key
    def __init__(self, data):
        self.data = data

# Function to perform inorder traversal on the tree
def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Recursive function to insert a key into a BST
def insert(root, key):

    # if the root is None, create a new node and return it
    if root is None:
        return Node(key)

    # if the given key is less than the root node,
    # recur for the left subtree
    if key < root.data:
        root.left = insert(root.left, key)

    # otherwise, recur for the right subtree
    else:
        # key >= root.data
        root.right = insert(root.right, key)

    return root

# Function to construct a BST from given keys
def constructBST(keys):
    root = None
    for key in keys:
        root = insert(root, key)
    return root

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    root = constructBST(keys)
    inorder(root)
```

We can modify the above C++ solution to pass the root node by reference instead of returning it from the function.

```
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Function to perform inorder traversal on the tree
void inorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

// Recursive function to insert a key into a BST using a reference parameter
// call as insert(root, key);
void insert(Node* &root, int key)
{
    // if the root is null, create a new node and return it
    if (root == nullptr)
    {
        root = new Node(key);
        return;
    }

    // if the given key is less than the root node, recur for the left subtree;
    // otherwise, recur for the right subtree
    if (key < root->data) {
        insert(root->left, key);
    }
    // key >= root->data
    else {
        insert(root->right, key);
    }
}

// Function to construct a BST from given keys
Node* constructBST(vector<int> const &keys)
{
    Node* root = nullptr;
    for (int key: keys) {
        insert(root, key);
    }
    return root;
}

int main()
{
    vector<int> keys = { 15, 10, 20, 8, 12, 16, 25 };

    Node* root = constructBST(keys);
    inorder(root);

    return 0;
}
```

## Iterative Version

Another way to explain the insertion is to insert a new node into the tree. Initially, the key is compared with that of the root. If its key is less than the root’s, it is then compared with the root’s left child’s key. If its key is greater, it is compared with the root’s right child. This process continues until the new node is compared with a leaf node, and then it is added as this node’s right or left child, depending on its key: if the key is less than the leaf’s key, then it is inserted as the leaf’s left child; otherwise, as to the leaf’s right child.

The iterative version is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Function to perform inorder traversal on the tree
void inorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

// Iterative function to insert a key into a BST.
// Root is passed by reference to the function
void insertIterative(Node*& root, int key)
{
    // start with the root node
    Node *curr = root;

    // pointer to store the parent of the current node
    Node *parent = nullptr;

    // if the tree is empty, create a new node and set it as root
    if (root == nullptr)
    {
        root = new Node(key);
        return;
    }

    // traverse the tree and find the parent node of the given key
    while (curr != nullptr)
    {
        // update the parent to the current node
        parent = curr;

        // if the given key is less than the current node, go to the
        // left subtree; otherwise, go to the right subtree.
        if (key < curr->data) {
            curr = curr->left;
        }
        else {
            curr = curr->right;
        }
    }

    // construct a node and assign it to the appropriate parent pointer
    if (key < parent->data) {
        parent->left = new Node(key);
    }
    else {
        parent->right = new Node(key);
    }
}

// Function to construct a BST from given keys
Node* constructBST(vector<int> const &keys)
{
    Node* root = nullptr;
    for (int key: keys) {
        insertIterative(root, key);
    }
    return root;
}

int main()
{
    vector<int> keys = { 15, 10, 20, 8, 12, 16, 25 };

    Node* root = constructBST(keys);
    inorder(root);

    return 0;
}
```

**Output:** 8 10 12 15 16 20 25

##

```java
// A class to store a BST node
class Node
{
    int data;
    Node left, right;

    // Function to create a new binary tree node having a given key
    Node(int key)
    {
        data = key;
        left = right = null;
    }
}

class Main
{
    // Function to perform inorder traversal on the tree
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    // Iterative function to insert a key into a BST
    public static Node insertIterative(Node root, int key)
    {
        // start with the root node
        Node curr = root;

        // pointer to store the parent of the current node
        Node parent = null;

        // if the tree is empty, create a new node and set it as root
        if (root == null) {
            return new Node(key);
        }

        // traverse the tree and find the parent node of the given key
        while (curr != null)
        {
            // update the parent to the current node
            parent = curr;

            // if the given key is less than the current node,
            // go to the left subtree; otherwise, go to the right subtree.
            if (key < curr.data) {
                curr = curr.left;
            }
            else {
                curr = curr.right;
            }
        }

        // construct a node and assign it to the appropriate parent pointer
        if (key < parent.data) {
            parent.left = new Node(key);
        }
        else {
            parent.right = new Node(key);
        }

        return root;
    }

    // Function to construct a BST from given keys
    public static Node constructBST(int[] keys)
    {
        Node root = null;
        for (int key: keys) {
            root = insertIterative(root, key);
        }
        return root;
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        Node root = constructBST(keys);
        inorder(root);
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    # Function to create a new binary tree node having a given key
    def __init__(self, key):
        self.data = key
        self.left = self.right = None

# Function to perform inorder traversal on the tree
def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Iterative function to insert a key into a BST
def insertIterative(root, key):

    # start with the root node
    curr = root

    # pointer to store the parent of the current node
    parent = None

    # if the tree is empty, create a new node and set it as root
    if root is None:
        return Node(key)

    # traverse the tree and find the parent node of the given key
    while curr:

        # update the parent to the current node
        parent = curr

        # if the given key is less than the current node,
        # go to the left subtree; otherwise, go to the right subtree.
        if key < curr.data:
            curr = curr.left
        else:
            curr = curr.right

    # construct a node and assign it to the appropriate parent pointer
    if key < parent.data:
        parent.left = Node(key)
    else:
        parent.right = Node(key)

    return root

# Function to construct a BST from given keys
def constructBST(keys):
    root = None
    for key in keys:
        root = insertIterative(root, key)
    return root

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    root = constructBST(keys)
    inorder(root)
```

The time complexity of the above solution is O(h), where `h` is the BST height. The BST height in the worst-case is as much as the total number of keys in the BST. The worst case happens when given keys are sorted in ascending or descending order, and we get a skewed tree (all the nodes except the leaf have one and only one child).

For height-balanced BSTs, with each comparison, skip about half of the tree so that each insertion operation takes time proportional to the logarithm of the total number of items `n` stored in the tree, i.e., `log2n`. This is much better than the linear time required to find items by key in an (unsorted) array but slower than the corresponding operations on hash tables.

The space used by the recursive routine is also proportional to the tree’s height, whereas the iterative version doesn’t require any extra space.

**Also See:**

> [Search a given key in BST – Iterative and Recursive Solution](https://techiedelight.com/search-given-key-in-bst/)

> [Deletion from BST (Binary Search Tree)](https://techiedelight.com/deletion-from-bst/)

**Exercise:** Modify the solution to [construct a height-balanced BST](https://techiedelight.com/construct-balanced-bst-given-keys/).

**References:** <https://en.wikipedia.org/wiki/Binary_search_tree>
