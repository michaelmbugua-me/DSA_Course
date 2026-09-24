# Implementation of Treap Data Structure (Insert, Search, and Delete)

> Source: https://www.techiedelight.com/implementation-treap-data-structure-cpp-java-insert-search-delete/

This post will implement treap data structure and perform basic operations like insert, search, and delete on it.

In the [previous post](https://techiedelight.com/Treap-data-structure/), we have discussed treap data structure, a combination of a [binary search tree](https://techiedelight.com/binary-search-tree-bst-interview-questions/) and a [heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). This post will implement it and perform basic operations like insert, search, and delete on it. Following are the algorithms for basic operations on treap:

## 1\. Insertion in Treap

To insert a new key `x` into the treap, generate a random priority `y` for `x`. Binary search for `x` in the tree, and create a new node at the leaf position where the binary search determines a node for `x` should exist. Then as long as `x` is not the root of the tree and has a larger priority number than its parent `z`, perform a tree rotation that reverses the parent-child relation between `x` and `z`.

## 2\. Deletion in Treap

To delete a node `x` from the treap, remove it if it is a leaf of the tree. If `x` has a single child, `z`, remove `x` from the tree and make `z` be the child of the parent of `x` (or make `z` the root of the tree if `x` had no parent). Finally, if `x` has two children, swap its position in the tree with its immediate successor `z` in the sorted order, resulting in one of the previous cases. In this last case, the swap may violate the heap-ordering property for `z`, so additional rotations may need to be performed to restore this property.

## 3\. Searching in Treap

To search for a given key value, apply a [standard search algorithm](https://techiedelight.com/search-given-key-in-bst/) in a binary search tree, ignoring the priorities.

Following is the implementation of a treap data structure in C++, Java, and Python demonstrating the above operations:

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

// A Treap Node
struct TreapNode
{
    int data;
    int priority;
    TreapNode* left, *right;

    // Constructor
    TreapNode(int data)
    {
        this->data = data;
        this->priority = rand() % 100;
        this->left = this->right = nullptr;
    }
};

/* Function to left-rotate a given treap

      r                         R
     / \      Left Rotate      / \
    L   R        ———>         r   Y
       / \                   / \
      X   Y                 L   X
*/

void rotateLeft(TreapNode* &root)
{
    TreapNode* R = root->right;
    TreapNode* X = root->right->left;

    // rotate
    R->left = root;
    root->right = X;

    // set a new root
    root = R;
}

/* Function to right-rotate a given treap

        r                        L
       / \     Right Rotate     / \
      L   R       ———>         X   r
     / \                          / \
    X   Y                        Y   R
*/

void rotateRight(TreapNode* &root)
{
    TreapNode* L = root->left;
    TreapNode* Y = root->left->right;

    // rotate
    L->right = root;
    root->left = Y;

    // set a new root
    root = L;
}

// Recursive function to insert a given key with a priority into treap
// using a reference parameter
void insertNode(TreapNode* &root, int data)
{
    // base case
    if (root == nullptr)
    {
        root = new TreapNode(data);
        return;
    }

    // if the given data is less than the root node, insert in the left subtree;
    // otherwise, insert in the right subtree
    if (data < root->data)
    {
        insertNode(root->left, data);

        // rotate right if heap property is violated
        if (root->left != nullptr && root->left->priority > root->priority) {
            rotateRight(root);
        }
    }
    else {
        insertNode(root->right, data);

        // rotate left if heap property is violated
        if (root->right != nullptr && root->right->priority > root->priority) {
            rotateLeft(root);
        }
    }
}

// Recursive function to search for a key in a given treap
bool searchNode(TreapNode* root, int key)
{
    // if the key is not present in the tree
    if (root == nullptr) {
        return false;
    }

    // if the key is found
    if (root->data == key) {
        return true;
    }

    // if the key is less than the root node, search in the left subtree
    if (key < root->data) {
        return searchNode(root->left, key);
    }

    // otherwise, search in the right subtree
    return searchNode(root->right, key);
}

// Recursive function to delete a key from a given treap
void deleteNode(TreapNode* &root, int key)
{
    // base case: the key is not found in the tree
    if (root == nullptr) {
        return;
    }

    // if the key is less than the root node, recur for the left subtree
    if (key < root->data) {
        deleteNode(root->left, key);
    }

    // if the key is more than the root node, recur for the right subtree
    else if (key > root->data) {
        deleteNode(root->right, key);
    }

    // if the key is found
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
            // if the left child has less priority than the right child
            if (root->left->priority < root->right->priority)
            {
                // call `rotateLeft()` on the root
                rotateLeft(root);

                // recursively delete the left child
                deleteNode(root->left, key);
            }
            else {
                // call `rotateRight()` on the root
                rotateRight(root);

                // recursively delete the right child
                deleteNode(root->right, key);
            }
        }

        // Case 3: node to be deleted has only one child
        else {
            // choose a child node
            TreapNode* child = (root->left)? root->left: root->right;
            TreapNode* curr = root;

            root = child;

            // deallocate the memory
            delete curr;
        }
    }
}

// Utility function to print two-dimensional view of a treap using
// reverse inorder traversal
void printTreap(TreapNode *root, int space = 0, int height = 10)
{
    // Base case
    if (root == nullptr) {
        return;
    }

    // increase distance between levels
    space += height;

    // print the right child first
    printTreap(root->right, space);
    cout << endl;

    // print the current node after padding with spaces
    for (int i = height; i < space; i++) {
        cout << ' ';
    }
    cout << root->data << "(" << root->priority << ")\n";

    // print the left child
    cout << endl;
    printTreap(root->left, space);
}

int main()
{
    // Treap keys
    int keys[] = { 5, 2, 1, 4, 9, 8, 10 };

    int n = sizeof(keys)/sizeof(int);

    // Construct a treap
    TreapNode* root = nullptr;
    srand(time(nullptr));

    for (int key: keys) {
        insertNode(root, key);
    }

    cout << "Constructed treap:\n\n";
    printTreap(root);

    cout << "\nDeleting node 1:\n\n";
    deleteNode(root, 1);
    printTreap(root);

    cout << "\nDeleting node 5:\n\n";
    deleteNode(root, 5);
    printTreap(root);

    cout << "\nDeleting node 9:\n\n";
    deleteNode(root, 9);
    printTreap(root);

    return 0;
}
```

**Output:** The output varies every time we run the program.

##

```java
import java.util.Random;

// A Treap Node
class TreapNode
{
    int data;
    int priority;
    TreapNode left, right;

    // constructor
    TreapNode(int data)
    {
        this.data = data;
        this.priority = new Random().nextInt(100);
        this.left = this.right = null;
    }
}

class Main
{
    /* Function to left-rotate a given treap

          r                         R
         / \      Left Rotate      / \
        L   R        ———>         r   Y
           / \                   / \
          X   Y                 L   X
    */
    public static TreapNode rotateLeft(TreapNode root)
    {
        TreapNode R = root.right;
        TreapNode X = root.right.left;

        // rotate
        R.left = root;
        root.right = X;

        // set a new root
        return R;
    }

    /* Function to right-rotate a given treap

            r                        L
           / \     Right Rotate     / \
          L   R        ———>        X   r
         / \                          / \
        X   Y                        Y   R
    */
    public static TreapNode rotateRight(TreapNode root)
    {
        TreapNode L = root.left;
        TreapNode Y = root.left.right;

        // rotate
        L.right = root;
        root.left = Y;

        // set a new root
        return L;
    }

    // Recursive function to insert a given key with a priority into treap
    public static TreapNode insertNode(TreapNode root, int data)
    {
        // base case
        if (root == null) {
            return new TreapNode(data);
        }

        // if data is less than the root node, insert in the left subtree;
        // otherwise, insert in the right subtree
        if (data < root.data)
        {
            root.left = insertNode(root.left, data);

            // rotate right if heap property is violated
            if (root.left != null && root.left.priority > root.priority) {
                root = rotateRight(root);
            }
        }
        else {
            root.right = insertNode(root.right, data);

            // rotate left if heap property is violated
            if (root.right != null && root.right.priority > root.priority) {
                root = rotateLeft(root);
            }
        }

        return root;
    }

    // Recursive function to search for a key in a given treap
    public static boolean searchNode(TreapNode root, int key)
    {
        // if the key is not present in the tree
        if (root == null) {
            return false;
        }

        // if the key is found
        if (root.data == key) {
            return true;
        }

        // if the key is less than the root node, search in the left subtree
        if (key < root.data) {
            return searchNode(root.left, key);
        }

        // otherwise, search in the right subtree
        return searchNode(root.right, key);
    }

    // Recursive function to delete a key from a given treap
    public static TreapNode deleteNode(TreapNode root, int key)
    {
        // base case: the key is not found in the tree
        if (root == null) {
            return null;
        }

        // if the key is less than the root node, recur for the left subtree
        if (key < root.data) {
            root.left = deleteNode(root.left, key);
        }

        // if the key is more than the root node, recur for the right subtree
        else if (key > root.data) {
            root.right = deleteNode(root.right, key);
        }

        // if the key is found
        else {
            // Case 1: node to be deleted has no children (it is a leaf node)
            if (root.left == null && root.right == null)
            {
                // deallocate the memory and update root to null
                root = null;
            }

            // Case 2: node to be deleted has two children
            else if (root.left != null && root.right != null)
            {
                // if the left child has less priority than the right child
                if (root.left.priority < root.right.priority)
                {
                    // call `rotateLeft()` on the root
                    root = rotateLeft(root);

                    // recursively delete the left child
                    root.left = deleteNode(root.left, key);
                }
                else {
                    // call `rotateRight()` on the root
                    root = rotateRight(root);

                    // recursively delete the right child
                    root.right = deleteNode(root.right, key);
                }
            }

            // Case 3: node to be deleted has only one child
            else {
                // choose a child node
                TreapNode child = (root.left != null)? root.left: root.right;
                root = child;
            }
        }

        return root;
    }

    // Utility function to print two-dimensional view of a treap using
    // reverse inorder traversal
    public static void printTreap(TreapNode root, int space)
    {
        final int height = 10;

        // Base case
        if (root == null) {
            return;
        }

        // increase distance between levels
        space += height;

        // print the right child first
        printTreap(root.right, space);
        System.lineSeparator();

        // print the current node after padding with spaces
        for (int i = height; i < space; i++) {
            System.out.print(' ');
        }

        System.out.println(root.data + "(" + root.priority + ")");

        // print the left child
        System.lineSeparator();
        printTreap(root.left, space);
    }

    public static void main(String[] args)
    {
        // Treap keys
        int[] keys = { 5, 2, 1, 4, 9, 8, 10 };

        // construct a treap
        TreapNode root = null;
        for (int key: keys) {
            root = insertNode(root, key);
        }

        System.out.println("Constructed treap:\n\n");
        printTreap(root, 0);

        System.out.println("\nDeleting node 1:\n\n");
        root = deleteNode(root, 1);
        printTreap(root, 0);

        System.out.println("\nDeleting node 5:\n\n");
        root = deleteNode(root, 5);
        printTreap(root, 0);

        System.out.println("\nDeleting node 9:\n\n");
        root = deleteNode(root, 9);
        printTreap(root, 0);
    }
}
```

##

```python3
from random import randrange

# A Treap Node
class TreapNode:
    # constructor
    def __init__(self, data, priority=100, left=None, right=None):
        self.data = data
        self.priority = randrange(priority)
        self.left = left
        self.right = right

''' Function to left-rotate a given treap

      r                       R
     / \     Left Rotate     / \
    L   R       ———>        r   Y
       / \                     / \
      X   Y                   L   X
'''

def rotateLeft(root):

    R = root.right
    X = root.right.left

    # rotate
    R.left = root
    root.right = X

    # set a new root
    return R

''' Function to right-rotate a given treap

        r                        L
       / \     Right Rotate     / \
      L   R       ———>         X   r
     / \                          / \
    X   Y                        Y   R
'''

def rotateRight(root):

    L = root.left
    Y = root.left.right

    # rotate
    L.right = root
    root.left = Y

    # set a new root
    return L

# Recursive function to insert a given key with a priority into treap
def insertNode(root, data):

    # base case
    if root is None:
        return TreapNode(data)

    # if the given data is less than the root node, insert in the left subtree;
    # otherwise, insert in the right subtree
    if data < root.data:
        root.left = insertNode(root.left, data)

        # rotate right if heap property is violated
        if root.left and root.left.priority > root.priority:
            root = rotateRight(root)
    else:
        root.right = insertNode(root.right, data)

        # rotate left if heap property is violated
        if root.right and root.right.priority > root.priority:
            root = rotateLeft(root)

    return root

# Recursive function to search for a key in a given treap
def searchNode(root, key):

    # if the key is not present in the tree
    if root is None:
        return False

    # if the key is found
    if root.data == key:
        return True

    # if the key is less than the root node, search in the left subtree
    if key < root.data:
        return searchNode(root.left, key)

    # otherwise, search in the right subtree
    return searchNode(root.right, key)

# Recursive function to delete a key from a given treap
def deleteNode(root, key):

    # base case: the key is not found in the tree
    if root is None:
        return None

    # if the key is less than the root node, recur for the left subtree
    if key < root.data:
        root.left = deleteNode(root.left, key)

    # if the key is more than the root node, recur for the right subtree
    elif key > root.data:
        root.right = deleteNode(root.right, key)

    # if the key is found
    else:

        # Case 1: node to be deleted has no children (it is a leaf node)
        if root.left is None and root.right is None:
            # deallocate the memory and update root to None
            root = None

        # Case 2: node to be deleted has two children
        elif root.left and root.right:
            # if the left child has less priority than the right child
            if root.left.priority < root.right.priority:
                # call `rotateLeft()` on the root
                root = rotateLeft(root)

                # recursively delete the left child
                root.left = deleteNode(root.left, key)
            else:
                # call `rotateRight()` on the root
                root = rotateRight(root)

                # recursively delete the right child
                root.right = deleteNode(root.right, key)

        # Case 3: node to be deleted has only one child
        else:
            # choose a child node
            child = root.left if (root.left) else root.right
            root = child

    return root

# Utility function to print two-dimensional view of a treap using
# reverse inorder traversal
def printTreap(root, space):

    height = 10

    # Base case
    if root is None:
        return

    # increase distance between levels
    space += height

    # print the right child first
    printTreap(root.right, space)

    # print the current node after padding with spaces
    for i in range(height, space):
        print(' ', end='')

    print((root.data, root.priority))

    # print the left child
    printTreap(root.left, space)

if __name__ == '__main__':

    # Treap keys
    keys = [5, 2, 1, 4, 9, 8, 10]

    # construct a treap
    root = None
    for key in keys:
        root = insertNode(root, key)

    print("Constructed :\n\n")
    printTreap(root, 0)

    print("\nDeleting node 1:\n\n")
    root = deleteNode(root, 1)
    printTreap(root, 0)

    print("\nDeleting node 5:\n\n")
    root = deleteNode(root, 5)
    printTreap(root, 0)

    print("\nDeleting node 9:\n\n")
    root = deleteNode(root, 9)

    printTreap(root, 0)
```

**References:** [Treap – Wikipedia](https://en.wikipedia.org/wiki/Treap)

Also See:

> [Deletion from BST (Binary Search Tree)](https://www.techiedelight.com/deletion-from-bst/ "Deletion from BST \(Binary Search Tree\)")

> [Treap Data Structure](https://www.techiedelight.com/treap-data-structure/ "Treap Data Structure")

> [Search a given key in BST – Iterative and Recursive Solution](https://www.techiedelight.com/search-given-key-in-bst/ "Search a given key in BST –  Iterative and Recursive Solution")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 93

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
