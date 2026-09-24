# Find the Lowest Common Ancestor (LCA) of two nodes in a BST

> Source: https://www.techiedelight.com/find-lowest-common-ancestor-lca-two-nodes-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST and two nodes `x` and `y` in it, find the lowest common ancestor (LCA) of `x` and `y`. The solution should return null if either `x` or `y` is not the actual node in the tree.

The lowest common ancestor (LCA) of two nodes `x` and `y` in the BST is the lowest (i.e., deepest) node that has both `x` and `y` as descendants, where each node can be a descendant of itself (so if `x` is reachable from `w`, `w` is the LCA). In other words, the LCA of `x` and `y` is the shared ancestor of `x` and `y` that is located farthest from the root.

For example, consider the following BST:

> 

A simple solution would be to store the path from root to `x` and the path from the root to `y` in two auxiliary arrays. Then traverse both arrays simultaneously till the values in the arrays match. The last matched value will be the LCA. If the end of one array is reached, then the last seen value is LCA. The time complexity of this solution is O(n) for a binary search tree with `n` nodes. However, it requires O(n) auxiliary space for storing two arrays.

## Recursive Version

We can recursively find the lowest common ancestor of nodes `x` and `y` present in the BST. The trick is to find the BST node, which has one key present in its left subtree and the other key present in the right subtree. If any such node is present in the tree, then it is LCA; if `y` lies in the subtree rooted at node `x`, then `x` is the LCA; otherwise, if `x` lies in the subtree rooted at node `y`, then `y` is the LCA.

The algorithm can be implemented as follows in C++, Java, and Python:

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

// Iterative function to search a given node in a BST
bool search(Node* root, Node* key)
{
    // traverse the tree and search for the key
    while (root)
    {
        // if the given key is less than the current node, go to the left
        // subtree; otherwise, go to the right subtree

        if (key->data < root->data) {
            root = root->left;
        }
        else if (key->data > root->data) {
            root = root->right;
        }
        // if the key is found, return true
        else if (key == root) {
            return true;
        }
        else {
            return false;
        }
    }

    // we reach here if the key is not present in the BST
    return false;
}

// Recursive function to find the lowest common ancestor of given nodes
// `x` and `y`, where both `x` and `y` are present in a BST
Node* LCARecursive(Node* root, Node* x, Node* y)
{
    // base case: empty tree
    if (root == nullptr) {
        return nullptr;
    }

    // if both `x` and `y` is smaller than the root, LCA exists in the left subtree
    if (root->data > max(x->data, y->data)) {
        return LCARecursive(root->left, x, y);
    }

    // if both `x` and `y` are greater than the root, LCA exists in the right subtree
    else if (root->data < min(x->data, y->data)) {
        return LCARecursive(root->right, x, y);
    }

    // if one key is greater (or equal) than the root and one key is smaller
    // (or equal) than the root, then the current node is LCA
    return root;
}

// Print lowest common ancestor of two nodes in a BST
void LCA(Node* root, Node* x, Node* y)
{
    // return if the tree is empty, or `x` or `y` is not present in the tree
    if (root == nullptr || !search(root, x) || !search(root, y)) {
        return;
    }

    // `lca` stores the lowest common ancestor of `x` and `y`
    Node* lca = LCARecursive(root, x, y);

    // if the lowest common ancestor exists, print it
    if (lca != nullptr) {
        cout << "LCA is " << lca->data;
    }
    else {
        cout << "LCA does not exist";
    }
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16, 25 };

    /* Construct the following tree
             15
            /  \
           /    \
          10     20
         / \     / \
        /   \   /   \
       8    12 16   25
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    LCA(root, root->left->left, root->left->right);

    return 0;
}
```

**Output:** LCA is 10

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

    // Iterative function to search a given node in a BST
    public static boolean search(Node root, Node key)
    {
        // traverse the tree and search for the key
        while (root != null)
        {
            // if the given key is less than the current node, go to the left
            // subtree; otherwise, go to the right subtree

            if (key.data < root.data) {
                root = root.left;
            }
            else if (key.data > root.data) {
                root = root.right;
            }
            // if the key is found, return true
            else if (key == root) {
                return true;
            }
            else {
                return false;
            }
        }

        // we reach here if the key is not present in the BST
        return false;
    }

    // Recursive function to find the lowest common ancestor of given nodes
    // `x` and `y`, where both `x` and `y` are present in the BST
    public static Node LCARecursive(Node root, Node x, Node y)
    {
        // base case: empty tree
        if (root == null) {
            return null;
        }

        // if both `x` and `y` is smaller than the root, LCA exists in the
        // left subtree
        if (root.data > Integer.max(x.data, y.data)) {
            return LCARecursive(root.left, x, y);
        }

        // if both `x` and `y` are greater than the root, LCA exists in the
        // right subtree
        else if (root.data < Integer.min(x.data, y.data)) {
            return LCARecursive(root.right, x, y);
        }

        // if one key is greater (or equal) than the root and one key is
        // smaller (or equal) than the root, then the current node is LCA
        return root;
    }

    // Print lowest common ancestor of two nodes in the BST
    public static void LCA(Node root, Node x, Node y)
    {
        // return if the tree is empty or `x` or `y` is not present
        // in the tree
        if (root == null || !search(root, x) || !search(root, y)) {
            return;
        }

        // `lca` stores the lowest common ancestor of `x` and `y`
        Node lca = LCARecursive(root, x, y);

        // if the lowest common ancestor exists, print it
        if (lca != null) {
            System.out.println("LCA is " + lca.data);
        }
        else {
            System.out.println("LCA does not exist");
        }
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        /* Construct the following tree
                  15
                /   \
               /     \
              10     20
             / \     / \
            /   \   /   \
           8    12 16   25
        */

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        LCA(root, root.left.left, root.left.right);
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

# Iterative function to search a given node in a BST
def search(root, key):

    # traverse the tree and search for the key
    while root:

        # if the given key is less than the current node, go to the left
        # subtree; otherwise, go to the right subtree

        if key.data < root.data:
            root = root.left
        elif key.data > root.data:
            root = root.right
        # if the key is found, return true
        elif key == root:
            return True
        else:
            return False

    # we reach here if the key is not present in the BST
    return False

# Recursive function to find the lowest common ancestor of given nodes
# `x` and `y`, where both `x` and `y` are present in a BST
def LCARecursive(root, x, y):

    # base case: empty tree
    if root is None:
        return None

    # if both `x` and `y` is smaller than the root, LCA exists in the left subtree
    if root.data > max(x.data, y.data):
        return LCARecursive(root.left, x, y)

    # if both `x` and `y` are greater than the root, LCA exists in the right subtree
    elif root.data < min(x.data, y.data):
        return LCARecursive(root.right, x, y)

    # if one key is greater (or equal) than the root and one key is smaller
    # (or equal) than the root, then the current node is LCA
    return root

# Print lowest common ancestor of two nodes in a BST
def LCA(root, x, y):

    # return if the tree is empty, or `x` or `y` is not present in the tree
    if not root or not search(root, x) or not search(root, y):
        return

    # `lca` stores the lowest common ancestor of `x` and `y`
    lca = LCARecursive(root, x, y)

    # if the lowest common ancestor exists, print it
    if lca:
        print('LCA is', lca.data)
    else:
        print('LCA does not exist')

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    ''' Construct the following tree
             15
            /  \
           /    \
          10     20
         / \     / \
        /   \   /   \
       8    12 16   25
    '''

    root = None
    for key in keys:
        root = insert(root, key)

    LCA(root, root.left.left, root.left.right)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

## Iterative Version

The same algorithm can be easily implemented iteratively. Following is the C++, Java, and Python program that demonstrates it:

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

// Iterative function to search a given node in a BST
bool search(Node* root, Node* key)
{
    // traverse the tree and search for the key
    while (root)
    {
        // if the given key is less than the current node, go to the left subtree;
        // otherwise, go to the right subtree

        if (key->data < root->data) {
            root = root->left;
        }
        else if (key->data > root->data) {
            root = root->right;
        }
        // if the key is found, return true
        else if (key == root) {
            return true;
        }
        else {
            return false;
        }
    }

    // we reach here if the key is not present in the BST
    return false;
}

// Iterative function to find the lowest common ancestor of given nodes
// in the BST
Node* LCA(Node* root, Node* x, Node* y)
{
    // return if the tree is empty, or `x` or `y` is not present in the tree
    if (root == nullptr || !search(root, x) || !search(root, y)) {
        return nullptr;
    }

    // start from the root node
    Node* curr = root;

    // traverse the tree
    while (curr)
    {
        // if both `x` and `y` is smaller than the root, LCA exists in the
        // left subtree
        if (curr->data > max(x->data, y->data)) {
            curr = curr->left;
        }
        // if both `x` and `y` are greater than the root, LCA exists in the
        // right subtree
        else if (curr->data < min(x->data, y->data)) {
            curr = curr->right;
        }
        // if one key is greater (or equal) than the root and one key is
        // smaller (or equal) than the root, then the current node is LCA
        else {
            return curr;
        }
    }
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16, 25 };

    /* Construct the following tree
             15
            /  \
           /    \
          10     20
         / \     / \
        /   \   /   \
       8    12 16   25
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    // `lca` stores the lowest common ancestor of 8 and 12
    Node* lca = LCA(root, root->left->left, root->left->right);

    // if the lowest common ancestor exists, print it
    if (lca != nullptr) {
        cout << "LCA is " << lca->data;
    }
    else {
        cout << "LCA does not exist";
    }

    return 0;
}
```

**Output:** LCA is 10

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

        // if the given key is less than the root node, recur for the
        // left subtree
        if (key < root.data) {
            root.left = insert(root.left, key);
        }

        // if the given key is more than the root node, recur for the
        // right subtree
        else {
            root.right = insert(root.right, key);
        }

        return root;
    }

    // Iterative function to search a given node in a BST
    public static boolean search(Node root, Node key)
    {
        // traverse the tree and search for the key
        while (root != null)
        {
            // if the given key is less than the current node, go to the left
            // subtree; otherwise, go to the right subtree

            if (key.data < root.data) {
                root = root.left;
            }
            else if (key.data > root.data) {
                root = root.right;
            }
            // if the key is found, return true
            else if (key == root) {
                return true;
            }
            else {
                return false;
            }
        }

        // we reach here if the key is not present in the BST
        return false;
    }

    // Iterative function to find the lowest common ancestor of given nodes
    // in the BST
    public static Node LCA(Node root, Node x, Node y)
    {
        // return if the tree is empty or `x` or `y` is not present
        // in the tree
        if (root == null || !search(root, x) || !search(root, y)) {
            return null;
        }

        // start from the root node
        Node curr = root;

        // traverse the tree
        while (curr != null)
        {
            // if both `x` and `y` is smaller than the root, LCA exists in the
            // left subtree
            if (curr.data > Integer.max(x.data, y.data)) {
                curr = curr.left;
            }

            // if both `x` and `y` are greater than the root, LCA exists in the
            // right subtree
            else if (curr.data < Integer.min(x.data, y.data)) {
                curr = curr.right;
            }

            // if one key is greater (or equal) than the root and one key is
            // smaller (or equal) than the root, then the current node is LCA
            else {
                return curr;
            }
        }
        return curr;
    }

    public static void main(String[] args)
    {
        int[] keys = {15, 10, 20, 8, 12, 16, 25};

        /* Construct the following tree
                  15
                /   \
               /     \
              10     20
             / \     / \
            /   \   /   \
           8    12 16   25
        */

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        // `lca` stores the lowest common ancestor of 8 and 12
        Node lca = LCA(root, root.left.left, root.left.right);

        // if the lowest common ancestor exists, print it
        if (lca != null) {
            System.out.println("LCA is " + lca.data);
        }
        else {
            System.out.println("LCA does not exist");
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

# Iterative function to search a given node in a BST
def search(root, key):

    # traverse the tree and search for the key
    while root:

        # if the given key is less than the current node, go to the left
        # subtree; otherwise, go to the right subtree

        if key.data < root.data:
            root = root.left
        elif key.data > root.data:
            root = root.right
        # if the key is found, return true
        elif key == root:
            return True
        else:
            return False

    # we reach here if the key is not present in the BST
    return False

# Iterative function to find the lowest common ancestor of given nodes
# in the BST
def LCA(root, x, y):

    # return if the tree is empty, or `x` or `y` is not present in the tree
    if not root or not search(root, x) or not search(root, y):
        return None

    # start from the root node
    curr = root

    # traverse the tree
    while curr:

        # if both `x` and `y` is smaller than the root, LCA exists in the
        # left subtree
        if curr.data > max(x.data, y.data):
            curr = curr.left

        # if both `x` and `y` are greater than the root, LCA exists in the
        # right subtree
        elif curr.data < min(x.data, y.data):
            curr = curr.right

        # if one key is greater (or equal) than the root and one key is
        # smaller (or equal) than the root, then the current node is LCA
        else:
            return curr

    return curr

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    ''' Construct the following tree
             15
            /  \
           /    \
          10     20
         / \     / \
        /   \   /   \
       8    12 16   25
    '''

    root = None
    for key in keys:
        root = insert(root, key)

    # `lca` stores the lowest common ancestor of 8 and 12
    lca = LCA(root, root.left.left, root.left.right)

    # if the lowest common ancestor exists, print it
    if lca:
        print('LCA is', lca.data)
    else:
        print('LCA does not exist')
```

The time complexity of the above solution is O(n), where `n` is the size of the BST. The auxiliary space required by the program is O(1).

**References:** <https://en.wikipedia.org/wiki/Lowest_common_ancestor>
