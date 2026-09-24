# Update every key in a BST to contain the sum of all greater keys

> Source: https://www.techiedelight.com/update-every-key-bst-contain-sum-greater-keys/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a binary search tree, modify it such that every node is updated to contain the sum of all greater keys present in the BST.

For example, BST shown on the left should be updated to BST on the right.

> 

## 1\. Using Inorder Traversal

We can solve this problem by [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) by calculating the sum of all nodes present in a binary tree in advance. Then for each node, the sum of all greater keys for any node can be updated in constant time using the total sum and sum of nodes visited so far.

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

// Helper function to return the sum of all nodes present in a binary tree
int findSum(Node* root)
{
    if (root == nullptr) {
        return 0;
    }

    return root->data + findSum(root->left) + findSum(root->right);
}

// Function to modify the BST such that every key is updated to
// contain the sum of all greater keys
void transform(Node* root, int &sum)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // update the left subtree
    transform(root->left, sum);

    // modify the sum to contain the sum of all greater keys
    sum = sum - root->data;

    // update the root to contain the sum of all greater keys
    root->data += sum;

    // update the right subtree
    transform(root->right, sum);
}

void transform(Node* root)
{
    int sum = findSum(root);
    transform(root, sum);
}

int main()
{
    int keys[] = { 5, 3, 2, 4, 6, 8, 10 };

    /* Construct the following tree
               5
             /   \
            /     \
           3       8
          / \     / \
         /   \   /   \
        2    4 6     10
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    transform(root);
    inorder(root);

    return 0;
}
```

**Output:** 38 36 33 29 24 18 10

##

```java
// A class to store a BST node
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

    // Helper function to return the sum of all nodes present in a binary tree
    public static int findSum(Node root)
    {
        if (root == null) {
            return 0;
        }

        return root.data + findSum(root.left) + findSum(root.right);
    }

    // Function to modify the BST such that every key is updated to
    // contain the sum of all greater keys
    public static int transform(Node root, int sum)
    {
        // base case
        if (root == null) {
            return sum;
        }

        // update the left subtree
        sum = transform(root.left, sum);

        // modify the sum to contain the sum of all greater keys
        sum = sum - root.data;

        // update the root to contain the sum of all greater keys
        root.data += sum;

        // update the right subtree
        sum = transform(root.right, sum);

        return sum;
    }

    public static void transform(Node root)
    {
        int sum = findSum(root);
        transform(root, sum);
    }

    public static void main(String[] args)
    {
        int[] keys = { 5, 3, 2, 4, 6, 8, 10 };

        /* Construct the following tree
                   5
                 /   \
                /     \
               3       8
              / \     / \
             /   \   /   \
            2    4  6     10
        */

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        transform(root);
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

    # if the given key is less than the root node, recur for the left subtree
    if key < root.data:
        root.left = insert(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        root.right = insert(root.right, key)

    return root

# Function to return the sum of all nodes present in a binary tree
def findSum(root):

    if root is None:
        return 0

    return root.data + findSum(root.left) + findSum(root.right)

# Function to modify the BST such that every key is updated to
# contains the sum of all greater keys
def update(root, total):

    # base case
    if root is None:
        return total

    # update the left subtree
    total = update(root.left, total)

    # modify the sum to contain the sum of all greater keys
    total = total - root.data

    # update the root to contain the sum of all greater keys
    root.data += total

    # update the right subtree
    total = update(root.right, total)

    return total

def transform(root):
    total = findSum(root)
    update(root, total)

if __name__ == '__main__':

    keys = [5, 3, 2, 4, 6, 8, 10]

    ''' Construct the following tree
               5
             /   \
            /     \
           3       8
          / \     / \
         /   \   /   \
        2    4 6     10
    '''

    root = None
    for key in keys:
        root = insert(root, key)

    transform(root)
    inorder(root)
```

## 2\. Using Reverse Inorder Traversal

The above solution traverses the tree two times. We can solve this problem in a single traversal by traversing the tree in reverse inorder. Now, keys will be visited in descending order, and the sum of all greater keys for any node can be updated in constant time by keeping track of the sum of nodes seen so far.

Following is the C++, Java, and Python program that demonstrates it:

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

// Function to modify the BST such that every key is updated to
// contain the sum of all greater keys
int transform(Node*  root, int sum_so_far)
{
    // base case
    if (root == nullptr) {
        return sum_so_far;
    }

    // update the right subtree before the left subtree
    int right = transform(root->right, sum_so_far);

    // update the root to contain the sum of all greater keys
    root->data += right;

    // update the sum to the current node, which is already updated with greater keys
    sum_so_far = root->data;

    // update the left subtree
    return transform(root->left, sum_so_far);
}

int main()
{
    int keys[] = { 5, 3, 2, 4, 6, 8, 10 };

    /* Construct the following tree
               5
             /   \
            /     \
           3       8
          / \     / \
         /   \   /   \
        2    4 6     10
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    transform(root, 0);
    inorder(root);

    return 0;
}
```

**Output:** 38 36 33 29 24 18 10

##

```java
// A class to store a BST node
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

    // Function to modify the BST such that every key is updated to
    // contain the sum of all greater keys
    public static int transform(Node root, int sum_so_far)
    {
        // base case
        if (root == null) {
            return sum_so_far;
        }

        // update the right subtree before the left subtree
        int right = transform(root.right, sum_so_far);

        // update the root to contain the sum of all greater keys
        root.data += right;

        // update the sum to the current node, which is already updated
        // with greater keys
        sum_so_far = root.data;

        // update the left subtree
        return transform(root.left, sum_so_far);
    }

    public static void main(String[] args)
    {
        int[] keys = { 5, 3, 2, 4, 6, 8, 10 };

        /* Construct the following tree
                   5
                 /   \
                /     \
               3       8
              / \     / \
             /   \   /   \
            2     4 6    10
        */

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        transform(root, 0);
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

    # if the given key is less than the root node, recur for the left subtree
    if key < root.data:
        root.left = insert(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        root.right = insert(root.right, key)

    return root

# Function to modify the BST such that every key is updated to
# contain the sum of all greater keys
def transform(root, sum_so_far=0):

    # base case
    if root is None:
        return sum_so_far

    # update the right subtree before the left subtree
    right = transform(root.right, sum_so_far)

    # update the root to contain the sum of all greater keys
    root.data += right

    # update the sum to the current node, which is already updated
    # with greater keys
    sum_so_far = root.data

    # update the left subtree
    return transform(root.left, sum_so_far)

if __name__ == '__main__':

    keys = [5, 3, 2, 4, 6, 8, 10]

    ''' Construct the following tree
               5
             /   \
            /     \
           3       8
          / \     / \
         /   \   /   \
        2    4 6     10
    '''

    root = None
    for key in keys:
        root = insert(root, key)

    transform(root)
    inorder(root)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.
