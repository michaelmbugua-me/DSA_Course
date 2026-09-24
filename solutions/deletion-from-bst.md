# Deletion from BST (Binary Search Tree)

> Source: https://www.techiedelight.com/deletion-from-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST, write an efficient function to delete a given key in it.

> 

There are three possible cases to consider deleting a node from BST:

**Case 1:** Deleting a node with no children: remove the node from the tree.

**Case 2:** Deleting a node with two children: call the node to be deleted `N`. Do not delete `N`. Instead, choose either its [inorder _successor_](https://techiedelight.com/find-inorder-successor-given-key-bst/) node or its inorder _predecessor_ node, `R`. Copy the value of `R` to `N`, then recursively call delete on `R` until reaching one of the first two cases. If we choose the inorder successor of a node, as the right subtree is not NULL (our present case is a node with 2 children), then its inorder successor is a node with the least value in its right subtree, which will have at a maximum of 1 subtree, so deleting it would fall in one of the first 2 cases.

**Case 3:** Deleting a node with one child: remove the node and replace it with its child.

Broadly speaking, nodes with children are harder to delete. As with all binary trees, a node’s inorder successor is its right subtree’s leftmost child, and a node’s inorder predecessor is the left subtree’s rightmost child. In either case, this node will have zero or one child. Delete it according to one of the two simpler cases above.

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

// Function to perform inorder traversal on the BST
void inorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

// Helper function to find minimum value node in the subtree rooted at `curr`
Node* getMinimumKey(Node* curr)
{
    while (curr->left != nullptr) {
        curr = curr->left;
    }
    return curr;
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

// Iterative function to search in the subtree rooted at `curr` and set its parent.
// Note that `curr` and `parent` is passed by reference to the function.
void searchKey(Node* &curr, int key, Node* &parent)
{
    // traverse the tree and search for the key
    while (curr != nullptr && curr->data != key)
    {
        // update the parent to the current node
        parent = curr;

        // if the given key is less than the current node, go to the left subtree;
        // otherwise, go to the right subtree
        if (key < curr->data) {
            curr = curr->left;
        }
        else {
            curr = curr->right;
        }
    }
}

// Function to delete a node from a BST
void deleteNode(Node*& root, int key)
{
    // pointer to store the parent of the current node
    Node* parent = nullptr;

    // start with the root node
    Node* curr = root;

    // search key in the BST and set its parent pointer
    searchKey(curr, key, parent);

    // return if the key is not found in the tree
    if (curr == nullptr) {
        return;
    }

    // Case 1: node to be deleted has no children, i.e., it is a leaf node
    if (curr->left == nullptr && curr->right == nullptr)
    {
        // if the node to be deleted is not a root node, then set its
        // parent left/right child to null
        if (curr != root)
        {
            if (parent->left == curr) {
                parent->left = nullptr;
            }
            else {
                parent->right = nullptr;
            }
        }
        // if the tree has only a root node, set it to null
        else {
            root = nullptr;
        }

        // deallocate the memory
        free(curr);        // or delete curr;
    }

    // Case 2: node to be deleted has two children
    else if (curr->left && curr->right)
    {
        // find its inorder successor node
        Node* successor = getMinimumKey(curr->right);

        // store successor value
        int val = successor->data;

        // recursively delete the successor. Note that the successor
        // will have at most one child (right child)
        deleteNode(root, successor->data);

        // copy value of the successor to the current node
        curr->data = val;
    }

    // Case 3: node to be deleted has only one child
    else {
        // choose a child node
        Node* child = (curr->left)? curr->left: curr->right;

        // if the node to be deleted is not a root node, set its parent
        // to its child
        if (curr != root)
        {
            if (curr == parent->left) {
                parent->left = child;
            }
            else {
                parent->right = child;
            }
        }

        // if the node to be deleted is a root node, then set the root to the child
        else {
            root = child;
        }

        // deallocate the memory
        free(curr);
    }
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16 };

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    deleteNode(root, 16);
    inorder(root);

    return 0;
}
```

**Output:** 8 10 12 15 20

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
    // Function to perform inorder traversal on the BST
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    // Helper function to find minimum value node in the subtree rooted at `curr`
    public static Node getMinimumKey(Node curr)
    {
        while (curr.left != null) {
            curr = curr.left;
        }
        return curr;
    }

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

    // Function to delete a node from a BST
    public static Node deleteNode(Node root, int key)
    {
        // pointer to store the parent of the current node
        Node parent = null;

        // start with the root node
        Node curr = root;

        // search key in the BST and set its parent pointer
        while (curr != null && curr.data != key)
        {
            // update the parent to the current node
            parent = curr;

            // if the given key is less than the current node, go to the left subtree;
            // otherwise, go to the right subtree
            if (key < curr.data) {
                curr = curr.left;
            }
            else {
                curr = curr.right;
            }
        }

        // return if the key is not found in the tree
        if (curr == null) {
            return root;
        }

        // Case 1: node to be deleted has no children, i.e., it is a leaf node
        if (curr.left == null && curr.right == null)
        {
            // if the node to be deleted is not a root node, then set its
            // parent left/right child to null
            if (curr != root)
            {
                if (parent.left == curr) {
                    parent.left = null;
                }
                else {
                    parent.right = null;
                }
            }
            // if the tree has only a root node, set it to null
            else {
                root = null;
            }
        }

        // Case 2: node to be deleted has two children
        else if (curr.left != null && curr.right != null)
        {
            // find its inorder successor node
            Node successor = getMinimumKey(curr.right);

            // store successor value
            int val = successor.data;

            // recursively delete the successor. Note that the successor
            // will have at most one child (right child)
            deleteNode(root, successor.data);

            // copy value of the successor to the current node
            curr.data = val;
        }

        // Case 3: node to be deleted has only one child
        else {
            // choose a child node
            Node child = (curr.left != null)? curr.left: curr.right;

            // if the node to be deleted is not a root node, set its parent
            // to its child
            if (curr != root)
            {
                if (curr == parent.left) {
                    parent.left = child;
                }
                else {
                    parent.right = child;
                }
            }

            // if the node to be deleted is a root node, then set the root to the child
            else {
                root = child;
            }
        }

        return root;
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16 };

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        root = deleteNode(root, 16);
        inorder(root);
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

# Function to perform inorder traversal on the BST
def inorder(root):
    if root is None:
        return

    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Helper function to find minimum value node in the subtree rooted at `curr`
def getMinimumKey(curr):
    while curr.left:
        curr = curr.left
    return curr

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

# Function to delete a node from a BST
def deleteNode(root, key):

    # pointer to store the parent of the current node
    parent = None

    # start with the root node
    curr = root

    # search key in the BST and set its parent pointer
    while curr and curr.data != key:

        # update the parent to the current node
        parent = curr

        # if the given key is less than the current node, go to the left subtree;
        # otherwise, go to the right subtree
        if key < curr.data:
            curr = curr.left
        else:
            curr = curr.right

    # return if the key is not found in the tree
    if curr is None:
        return root

    # Case 1: node to be deleted has no children, i.e., it is a leaf node
    if curr.left is None and curr.right is None:

        # if the node to be deleted is not a root node, then set its
        # parent left/right child to None
        if curr != root:
            if parent.left == curr:
                parent.left = None
            else:
                parent.right = None

        # if the tree has only a root node, set it to None
        else:
            root = None

    # Case 2: node to be deleted has two children
    elif curr.left and curr.right:

        # find its inorder successor node
        successor = getMinimumKey(curr.right)

        # store successor value
        val = successor.data

        # recursively delete the successor. Note that the successor
        # will have at most one child (right child)
        deleteNode(root, successor.data)

        # copy value of the successor to the current node
        curr.data = val

    # Case 3: node to be deleted has only one child
    else:

        # choose a child node
        if curr.left:
            child = curr.left
        else:
            child = curr.right

        # if the node to be deleted is not a root node, set its parent
        # to its child
        if curr != root:
            if curr == parent.left:
                parent.left = child
            else:
                parent.right = child

        # if the node to be deleted is a root node, then set the root to the child
        else:
            root = child

    return root

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16]

    root = None
    for key in keys:
        root = insert(root, key)

    root = deleteNode(root, 16)
    inorder(root)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST. The auxiliary space required by the program is O(n) for recursion (call stack).

The above solution initially searches the key in the BST and also find its parent pointer. We can easily modify the code to recursively search the key in the deletion procedure itself and let recursion take care of updating the parent pointer.

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

// Function to perform inorder traversal on the BST
void inorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

// Helper function to find the maximum value node in the subtree rooted at `ptr`
Node* findMaximumKey(Node* ptr)
{
    while (ptr->right != nullptr) {
        ptr = ptr->right;
    }
    return ptr;
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

// Function to delete a node from a BST. Note that root is passed by
// reference to the function
void deleteNode(Node* &root, int key)
{
    // base case: the key is not found in the tree
    if (root == nullptr) {
        return;
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root->data) {
        deleteNode(root->left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else if (key > root->data) {
        deleteNode(root->right, key);
    }

    // key found
    else {
        // Case 1: node to be deleted has no children (it is a leaf node)
        if (root->left == nullptr && root->right == nullptr)
        {
            // deallocate the memory and update root to null
            delete root;
            root = nullptr;
        }

        // Case 2: node to be deleted has two children
        else if (root->left && root->right)
        {
            // find its inorder predecessor node
            Node* predecessor = findMaximumKey(root->left);

            // copy value of the predecessor to the current node
            root->data = predecessor->data;

            // recursively delete the predecessor. Note that the
            // predecessor will have at most one child (left child)
            deleteNode(root->left, predecessor->data);
        }

        // Case 3: node to be deleted has only one child
        else {
            // choose a child node
            Node* child = (root->left)? root->left: root->right;
            Node* curr = root;

            root = child;

            // deallocate the memory
            delete curr;
        }
    }
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 25 };

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    deleteNode(root, 12);
    inorder(root);

    return 0;
}
```

**Output:** 8 10 15 20 25

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
    // Function to perform inorder traversal on the BST
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    // Helper function to find the maximum value node in the subtree rooted at `ptr`
    public static Node findMaximumKey(Node ptr)
    {
        while (ptr.right != null) {
            ptr = ptr.right;
        }
        return ptr;
    }

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

    // Function to delete a node from a BST
    public static Node deleteNode(Node root, int key)
    {
        // base case: the key is not found in the tree
        if (root == null) {
            return null;
        }

        // if the given key is less than the root node, recur for the left subtree
        if (key < root.data) {
            root.left = deleteNode(root.left, key);
        }

        // if the given key is more than the root node, recur for the right subtree
        else if (key > root.data) {
            root.right = deleteNode(root.right, key);
        }

        // key found
        else {
            // Case 1: node to be deleted has no children (it is a leaf node)
            if (root.left == null && root.right == null)
            {
                // update root to null
                return null;
            }

            // Case 2: node to be deleted has two children
            else if (root.left != null && root.right != null)
            {
                // find its inorder predecessor node
                Node predecessor = findMaximumKey(root.left);

                // copy value of the predecessor to the current node
                root.data = predecessor.data;

                // recursively delete the predecessor. Note that the
                // predecessor will have at most one child (left child)
                root.left = deleteNode(root.left, predecessor.data);
            }

            // Case 3: node to be deleted has only one child
            else {
                // choose a child node
                Node child = (root.left != null) ? root.left: root.right;
                root = child;
            }
        }

        return root;
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 25 };

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        root = deleteNode(root, 12);
        inorder(root);
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

# Function to perform inorder traversal on the BST
def inorder(root):
    if root is None:
        return
    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Function to find the maximum value node in the subtree rooted at `ptr`
def findMaximumKey(ptr):
    while ptr.right:
        ptr = ptr.right
    return ptr

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

# Function to delete a node from a BST
def deleteNode(root, key):

    # base case: the key is not found in the tree
    if root is None:
        return root

    # if the given key is less than the root node, recur for the left subtree
    if key < root.data:
        root.left = deleteNode(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    elif key > root.data:
        root.right = deleteNode(root.right, key)

    # key found
    else:

        # Case 1: node to be deleted has no children (it is a leaf node)
        if root.left is None and root.right is None:
            # update root to None
            return None

        # Case 2: node to be deleted has two children
        elif root.left and root.right:
            # find its inorder predecessor node
            predecessor = findMaximumKey(root.left)

            # copy value of the predecessor to the current node
            root.data = predecessor.data

            # recursively delete the predecessor. Note that the
            # predecessor will have at most one child (left child)
            root.left = deleteNode(root.left, predecessor.data)

        # Case 3: node to be deleted has only one child
        else:
            # choose a child node
            child = root.left if root.left else root.right
            root = child

    return root

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 25]

    root = None
    for key in keys:
        root = insert(root, key)

    root = deleteNode(root, 12)
    inorder(root)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

**Also See:**

> [Insertion in a BST – Iterative and Recursive Solution](https://techiedelight.com/insertion-in-bst/)

> [Search a given key in BST – Iterative and Recursive Solution](https://techiedelight.com/search-given-key-in-bst/)

**References:** <https://en.wikipedia.org/wiki/Binary_search_tree>
