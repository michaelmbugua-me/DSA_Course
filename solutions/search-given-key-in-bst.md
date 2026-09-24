# Search a given key in BST –  Iterative and Recursive Solution

> Source: https://www.techiedelight.com/search-given-key-in-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST, write an efficient function to search a given key in it. The algorithm should return the parent node of the key and print if the key is the left or right node of the parent node. If the key is not present in the BST, the algorithm should be able to determine that.

Searching a binary search tree for a specific key can be programmed recursively or iteratively.

> 

We begin by examining the root node. If the tree is null, the key we are searching for does not exist in the tree. Otherwise, if the key equals that of the root, the search is successful, we return the node. If the key is less than that of the root, we search the left subtree. Similarly, if the key is greater than that of the root, we search the right subtree. This process is repeated until the key is found or the remaining subtree is null. If the searched key is not found after a null subtree is reached, then the key is not present in the tree.

This can be easily expressed as a recursive algorithm. The implementation can be seen below in C++, Java, and Python:

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

// Recursive function to search in a given BST
void search(Node* root, int key, Node* parent)
{
    // if the key is not present in the key
    if (root == nullptr)
    {
        cout << "Key not found";
        return;
    }

    // if the key is found
    if (root->data == key)
    {
        if (parent == nullptr) {
            cout << "The node with key " << key << " is root node";
        }
        else if (key < parent->data)
        {
            cout << "The given key is the left node of the node with key "
                 << parent->data;
        }
        else  {
            cout << "The given key is the right node of the node with key "
                 << parent->data;
        }

        return;
    }

    // if the given key is less than the root node, recur for the left subtree;
    // otherwise, recur for the right subtree

    if (key < root->data) {
        search(root->left, key, root);
    } else {
        search(root->right, key, root);
    }
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16, 25 };

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    search(root, 25, nullptr);

    return 0;
}
```

**Output:** The given key is the right node of the node with key 20

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

    // Recursive function to search in a given BST
    public static void search(Node root, int key, Node parent)
    {
        // if the key is not present in the key
        if (root == null)
        {
            System.out.println("Key not found");
            return;
        }

        // if the key is found
        if (root.data == key)
        {
            if (parent == null) {
                System.out.println("The node with key " + key + " is root node");
            }

            else if (key < parent.data)
            {
                System.out.println("The given key is the left node of the node " +
                            "with key " + parent.data);
            }
            else {
                System.out.println("The given key is the right node of the node " +
                            "with key " + parent.data);
            }

            return;
        }

        // if the given key is less than the root node, recur for the left subtree;
        // otherwise, recur for the right subtree

        if (key < root.data) {
            search(root.left, key, root);
        }
        else {
            search(root.right, key, root);
        }
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        search(root, 25, null);
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

# Recursive function to search in a given BST
def search(root, key, parent):

    # if the key is not present in the key
    if root is None:
        print('Key not found')
        return

    # if the key is found
    if root.data == key:

        if parent is None:
            print(f'The node with key {key} is root node')
        elif key < parent.data:
            print('The given key is the left node of the node with key', parent.data)
        else:
            print('The given key is the right node of the node with key', parent.data)

        return

    # if the given key is less than the root node, recur for the left subtree;
    # otherwise, recur for the right subtree

    if key < root.data:
        search(root.left, key, root)
    else:
        search(root.right, key, root)

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    root = None
    for key in keys:
        root = insert(root, key)

    search(root, 25, None)
```

This algorithm searches from the tree’s root to the leaf farthest from the root in the worst-case. The search operation takes time proportional to the tree’s height. On average, binary search trees with `n` nodes have O(log(n)) height. However, in the worst case, binary search trees can have O(n) height (for skewed trees where all the nodes except the leaf have one and only one child) when the unbalanced tree resembles a [linked list](https://techiedelight.com/introduction-linked-lists/).

The space used by the [call stack](https://en.wikipedia.org/wiki/Call_stack) is also proportional to the tree’s height. The algorithm can be implemented iteratively to avoid use of extra space.

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

// Iterative function to search in a given BST
void searchIterative(Node* root, int key)
{
    // start with the root node
    Node* curr = root;

    // pointer to store the parent of the current node
    Node* parent = nullptr;

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

    // if the key is not present in the key
    if (curr == nullptr)
    {
        cout << "Key not found";
        return;
    }

    if (parent == nullptr) {
        cout << "The node with key " << key << " is root node";
    }

    else if (key < parent->data) {
        cout << "The given key is the left node of the node with key "
             << parent->data;
    }

    else {
        cout << "The given key is the right node of the node with key "
             << parent->data;
    }
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16, 25 };

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    searchIterative(root, 25);

    return 0;
}
```

**Output:** The given key is the right node of the node with key 20

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

    // Iterative function to search in a given BST
    public static void searchIterative(Node root, int key)
    {
        // start with the root node
        Node curr = root;

        // pointer to store the parent of the current node
        Node parent = null;

        // traverse the tree and search for the key
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

        // if the key is not present in the key
        if (curr == null)
        {
            System.out.println("Key not found");
            return;
        }

        if (parent == null) {
            System.out.println("The node with key " + key + " is root node");
        }
        else if (key < parent.data)
        {
            System.out.println("The given key is the left node of the node with key "
                            + parent.data);
        }
        else {
            System.out.println("The given key is the right node of the node with key "
                            + parent.data);
        }
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        searchIterative(root, 25);
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

# Iterative function to search in a given BST
def searchIterative(root, key):

    # start with the root node
    curr = root

    # pointer to store the parent of the current node
    parent = None

    # traverse the tree and search for the key
    while curr and curr.data != key:

        # update the parent to the current node
        parent = curr

        # if the given key is less than the current node, go to the left subtree;
        # otherwise, go to the right subtree
        if key < curr.data:
            curr = curr.left
        else:
            curr = curr.right

    # if the key is not present in the key
    if curr is None:
        print('Key not found')
        return

    if parent is None:
        print(f'The node with key {key} is root node')
    elif key < parent.data:
        print('The given key is the left node of the node with key', parent.data)
    else:
        print('The given key is the right node of the node with key', parent.data)

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    root = None
    for key in keys:
        root = insert(root, key)

    searchIterative(root, 25)
```

**Also See:**

> [Insertion in a BST – Iterative and Recursive Solution](https://techiedelight.com/insertion-in-bst)

> [Deletion from BST (Binary Search Tree)](https://techiedelight.com/deletion-from-bst/)

**References:** <https://en.wikipedia.org/wiki/Binary_search_tree>
