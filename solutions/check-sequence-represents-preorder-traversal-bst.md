# Check if a given sequence represents the preorder traversal of a BST

> Source: https://www.techiedelight.com/check-sequence-represents-preorder-traversal-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a distinct sequence of keys, check if it represents a [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) of a binary search tree (BST).

For example, the following BST can be constructed from the sequence `{15, 10, 8, 12, 20, 16, 25}` and it has the same preorder traversal:

> 

The idea is first to [construct a BST from the given sequence](https://techiedelight.com/insertion-in-bst/) by inserting keys into the BST one at a time and then compare the preorder traversal of the constructed BST with the given sequence. If the order matches, we can say that the given sequence represents the preorder traversal of a BST.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Data structure to store a binary tree node
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

// Recursive function to build a BST from the given sequence
Node* buildTree(vector<int> const &seq)
{
    // construct a BST by inserting keys from the given sequence
    Node* root = nullptr;
    for (int key: seq) {
        root = insert(root, key);
    }

    // return root node
    return root;
}

// Function to compare the preorder traversal of a BST with the given sequence
bool comparePreOrder(Node* root, vector<int> const &seq, int &index)
{
    // base case
    if (root == nullptr) {
        return true;
    }

    // return false if the next element in the given sequence doesn't match
    // with the next element in the preorder traversal of BST
    if (seq[index] != root->data) {
        return false;
    }

    // increment index
    index++;

    // compare the left and right subtrees
    return comparePreOrder(root->left, seq, index) &&
        comparePreOrder(root->right, seq, index);
}

// Function to check if a given sequence represents the preorder traversal of a BST
bool isBST(vector<int> const &seq)
{
    /* 1. Construct the BST from the given sequence */

    Node* root = buildTree(seq);

    /* 2. Compare the preorder traversal of BST with the given sequence */

    // `index` stores the index of the next unprocessed node in the preorder sequence
    int index = 0;
    return comparePreOrder(root, seq, index) && index == seq.size();
}

int main()
{
    vector<int> seq = { 15, 10, 8, 12, 20, 16, 25 };

    if (isBST(seq)) {
        cout << "Sequence represents preorder traversal of a BST";
    }
    else {
        cout << "Sequence doesn't represent preorder traversal of a BST";
    }

    return 0;
}
```

**Output:** Given sequence represents preorder traversal of a BST

##

```java
import java.util.concurrent.atomic.AtomicInteger;

// A class to store a binary tree node
class Node
{
    int data;
    Node left, right;

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

    // Recursive function to build a BST from the given sequence
    public static Node buildTree(int[] seq)
    {
        // construct a BST by inserting keys from the given sequence
        Node root = null;
        for (int key: seq) {
            root = insert(root, key);
        }

        // return root node
        return root;
    }

    // Function to compare the preorder traversal of a BST with the given sequence
    public static boolean comparePreOrder(Node root, int[] seq, AtomicInteger index)
    {
        // base case
        if (root == null) {
            return true;
        }

        // return false if the next element in the given sequence doesn't match
        // with the next element in the preorder traversal of BST
        if (seq[index.get()] != root.data) {
            return false;
        }

        // increment index
        index.incrementAndGet();

        // compare the left and right subtrees
        return comparePreOrder(root.left, seq, index) &&
                comparePreOrder(root.right, seq, index);
    }

    // Function to check if a given sequence represents the preorder traversal of a BST
    public static boolean isBST(int[] seq)
    {
        /* 1. Construct the BST from the given sequence */

        Node root = buildTree(seq);

        /* 2. Compare the preorder traversal of BST with the given sequence */

        // `index` stores the index of the next unprocessed node in preorder
        // `AtomicInteger` is used here since `Integer` is passed by value in Java
        AtomicInteger index = new AtomicInteger(0);

        return comparePreOrder(root, seq, index) && (index.get() == seq.length);
    }

    public static void main(String[] args)
    {
        int[] seq = { 15, 10, 8, 12, 20, 16, 25 };

        if (isBST(seq)) {
            System.out.println("Sequence represents preorder traversal of a BST");
        }
        else {
            System.out.println("Sequence doesn't represent preorder traversal of a BST");
        }
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

# Recursive function to build a BST from the given sequence
def buildTree(seq):

    # construct a BST by inserting keys from the given sequence
    root = None
    for key in seq:
        root = insert(root, key)

    # return root node
    return root

# Function to compare the preorder traversal of a BST with the given sequence
def comparePreOrder(root, seq, index):

    # base case
    if root is None:
        return True, index

    # return false if the next element in the given sequence doesn't match
    # with the next element in the preorder traversal of BST
    if seq[index] is not root.data:
        return False, index

    # increment index
    index = index + 1

    # compare the left and right subtrees
    left, index = comparePreOrder(root.left, seq, index)
    right, index = comparePreOrder(root.right, seq, index)

    return (left and right), index

# Function to check if a given sequence represents the preorder traversal of a BST
def isBST(seq):

    ''' 1. Construct the BST from the given sequence '''

    root = buildTree(seq)

    ''' 2. Compare the preorder traversal of BST with the given sequence '''

    # `index` stores the index of the next unprocessed node in the preorder sequence
    success, index = comparePreOrder(root, seq, 0)
    return success and (index == len(seq))

if __name__ == '__main__':

    seq = [15, 10, 8, 12, 20, 16, 25]

    if isBST(seq):
        print('Sequence represents preorder traversal of a BST')
    else:
        print('Sequence doesn\'t represent preorder traversal of a BST')
```

The time complexity of the above solution is O(n.log(n)), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

We can reduce the time complexity to O(n) by [constructing a BST from the given sequence in a preorder fashion](https://techiedelight.com/build-binary-search-tree-from-preorder-sequence/). Now the problem reduces to just validating if the whole sequence is traversed or not while constructing the BST. If the whole sequence is traversed, we can say that the given sequence represents the preorder traversal of a BST.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Recursive function to build a BST from the given sequence in a preorder fashion
Node* buildTree(vector<int> const &seq, int &index, int min, int max)
{
    // Base case
    if (index == seq.size()) {
        return nullptr;
    }

    // Return if the next element of the given sequence is within the invalid range
    int val = seq[index];
    if (val < min || val > max) {
        return nullptr;
    }

    // Construct the root node and increment index
    Node* root = new Node(val);
    index++;

    // Since all elements in the left subtree of a BST must be less
    // than the root node's value, set range as `[min, val-1]` and recur
    root->left = buildTree(seq, index, min, val - 1);

    // Since all elements in the right subtree of a BST must be greater
    // than the root node's value, set range as `[val+1…max]` and recur
    root->right = buildTree(seq, index, val + 1, max);

    // return root node
    return root;
}

// Function to check if a given sequence represents the preorder traversal of a BST
bool isBST(vector<int> const &seq)
{
    /* 1. Construct the BST from the given sequence in a preorder fashion */

    // stores index of the next unprocessed node in the sequence
    int index = 0;

    // set the root node's range as [-INFINITY, INFINITY] and recur
    Node* root = buildTree(seq, index, INT_MIN, INT_MAX);

    /* 2. Just check if the whole sequence is traversed or not */
    return index == seq.size();
}

int main()
{
    vector<int> seq = { 15, 10, 8, 12, 20, 16, 25 };

    if (isBST(seq)) {
        cout << "Sequence represents preorder traversal of a BST";
    }
    else {
        cout << "Sequence doesn't represent preorder traversal of a BST";
    }

    return 0;
}
```

**Output:** Given sequence represents preorder traversal of a BST

##

```java
import java.util.concurrent.atomic.AtomicInteger;

// A class to store a binary tree node
class Node
{
    int data;
    Node left, right;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Recursive function to build a BST from the given sequence in a preorder fashion
    public static Node buildTree(int[] seq, AtomicInteger index, int min, int max)
    {
        // Base case
        if (index.get() == seq.length) {
            return null;
        }

        // Return if the next element of the given sequence is within the invalid range
        int val = seq[index.get()];
        if (val < min || val > max) {
            return null;
        }

        // Construct the root node and increment index
        Node root = new Node(val);
        index.incrementAndGet();

        // Since all elements in the left subtree of a BST must be less
        // than the root node's value, set range as `[min, val-1]` and recur
        root.left = buildTree(seq, index, min, val - 1);

        // Since all elements in the right subtree of a BST must be greater
        // than the root node's value, set range as `[val+1…max]` and recur
        root.right = buildTree(seq, index, val + 1, max);

        // return root node
        return root;
    }

    // Function to check if a given sequence represents the preorder traversal of a BST
    public static boolean isBST(int[] seq)
    {
        /* 1. Construct the BST from the given sequence in a preorder fashion */

        // `index` stores the index of the next unprocessed node in the sequence
        // `AtomicInteger` is used here since `Integer` is passed by value in Java
        AtomicInteger index = new AtomicInteger(0);

        // set the root node's range as [-INFINITY, INFINITY] and recur
        buildTree(seq, index, Integer.MIN_VALUE, Integer.MAX_VALUE);

        /* 2. Just check if the whole sequence is traversed or not */
        return index.get() == seq.length;
    }

    public static void main(String[] args)
    {
        int[] seq = {15, 10, 8, 12, 20, 16, 25};

        if (isBST(seq)) {
            System.out.println("Sequence represents preorder traversal of a BST");
        }
        else {
            System.out.println("Sequence doesn't represent preorder traversal of a BST");
        }
    }
}
```

##

```python3
import sys

# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to build a BST from the given sequence in a preorder fashion
def buildTree(seq, index, min, max):

    # Base case
    if index == len(seq):
        return None, index

    # Return if the next element of the given sequence is within the invalid range
    val = seq[index]
    if val < min or val > max:
        return None, index

    # Construct the root node and increment index
    root = Node(val)
    index = index + 1

    # Since all elements in the left subtree of a BST must be less
    # than the root node's value, set range as `[min, val-1]` and recur
    root.left, index = buildTree(seq, index, min, val - 1)

    # Since all elements in the right subtree of a BST must be greater
    # than the root node's value, set range as `[val+1…max]` and recur
    root.right, index = buildTree(seq, index, val + 1, max)

    # return root node
    return root, index

# Function to check if a given sequence represents the preorder traversal of a BST
def isBST(seq):

    ''' 1. Construct the BST from the given sequence in a preorder fashion '''

    # stores index of the next unprocessed node in the sequence
    index = 0

    # set the root node's range as [-INFINITY, INFINITY] and recur
    index = buildTree(seq, index, -sys.maxsize, sys.maxsize)[1]

    ''' 2. Just check if the whole sequence is traversed or not '''
    return index == len(seq)

if __name__ == '__main__':

    seq = [15, 10, 8, 12, 20, 16, 25]

    if isBST(seq):
        print('Sequence represents preorder traversal of a BST')
    else:
        print('Sequence doesn\'t represent preorder traversal of a BST')
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.
