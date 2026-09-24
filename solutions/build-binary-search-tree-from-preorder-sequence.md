# Build a Binary Search Tree from a preorder sequence

> Source: https://www.techiedelight.com/build-binary-search-tree-from-preorder-sequence/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a distinct sequence of keys representing the [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) sequence of a binary search tree (BST), construct a BST from it.

For example, the following BST corresponds to the [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) { 15, 10, 8, 12, 20, 16, 25 }.

> 

We can easily build a BST for a given preorder sequence by recursively repeating the following steps for all keys in it:

  1. Construct the root node of BST, which would be the first key in the preorder sequence.
  2. Find index `i` of the first key in the preorder sequence, which is greater than the root node.
  3. Recur for the left subtree with keys in the preorder sequence that appears before the `i'th` index (excluding the first index).
  4. Recur for the right subtree with keys in the preorder sequence that appears after the `i'th` index (including the `i'th` index).

Let’s consider the preorder traversal `{15, 10, 8, 12, 20, 16, 25}` to make the context more clear.

  1. The first item in the preorder sequence 15 becomes the root node.
  2. Since 20 is the first key in the preorder sequence, which greater than the root node, the left subtree consists of keys `{10, 8, 12}` and the right subtree consists of keys `{20, 16, 25}`.
  3. To construct the complete BST, recursively repeat the above steps for preorder sequence `{10, 8, 12}` and `{20, 16, 25}`.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// Data structure to store a binary tree node
struct Node
{
    int key;
    struct Node *left, *right;
};

// Function to create a new binary tree node having a given key
struct Node* newNode(int key)
{
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->key = key;
    node->left = node->right = NULL;

    return node;
}

// Recursive function to perform inorder traversal on a given binary tree
void inorder(struct Node* root)
{
    if (root == NULL) {
        return;
    }

    inorder(root->left);
    printf("%d ", root->key);
    inorder(root->right);
}

// Recursive function to build a BST from a preorder sequence.
struct Node* constructBST(int preorder[], int start, int end)
{
    // base case
    if (start > end) {
        return NULL;
    }

    // Construct the root node of the subtree formed by keys of the
    // preorder sequence in range `[start, end]`
    struct Node* node = newNode(preorder[start]);

    // search the index of the first element in the current range of preorder
    // sequence larger than the root node's value
    int i;
    for (i = start; i <= end; i++)
    {
        if (preorder[i] > node->key) {
            break;
        }
    }

    // recursively construct the left subtree
    node->left = constructBST(preorder, start + 1, i - 1);

    // recursively construct the right subtree
    node->right = constructBST(preorder, i, end);

    // return current node
    return node;
}

int main(void)
{
    /* Construct the following BST
              15
            /    \
           /      \
          10       20
         /  \     /  \
        /    \   /    \
       8     12 16    25
    */

    int preorder[] = { 15, 10, 8, 12, 20, 16, 25 };
    int n = sizeof(preorder)/sizeof(preorder[0]);

    // construct the BST
    struct Node* root = constructBST(preorder, 0, n - 1);

    // print the BST
    printf("Inorder traversal of BST is ");

    // inorder on the BST always returns a sorted sequence
    inorder(root);

    return 0;
}
```

**Output:** Inorder traversal of BST is 8 10 12 15 16 20 25

##

```java
// A class to store a binary tree node
class Node
{
    int key;
    Node left, right;

    Node(int key) {
        this.key = key;
    }
}

class Main
{
    // Recursive function to perform inorder traversal on a given binary tree
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);
        System.out.print(root.key + " ");
        inorder(root.right);
    }

    // Recursive function to build a BST from a preorder sequence.
    public static Node constructBST(int[] preorder, int start, int end)
    {
        // base case
        if (start > end) {
            return null;
        }

        // Construct the root node of the subtree formed by keys of the
        // preorder sequence in range `[start, end]`
        Node node = new Node(preorder[start]);

        // search the index of the first element in the current range of preorder
        // sequence larger than the root node's value
        int i;
        for (i = start; i <= end; i++)
        {
            if (preorder[i] > node.key) {
                break;
            }
        }

        // recursively construct the left subtree
        node.left = constructBST(preorder, start + 1, i - 1);

        // recursively construct the right subtree
        node.right = constructBST(preorder, i, end);

        // return current node
        return node;
    }

    public static void main(String[] args)
    {
        /* Construct the following BST
                  15
                /    \
               /      \
              10       20
             /  \     /  \
            /    \   /    \
           8     12 16    25
        */

        int[] preorder = { 15, 10, 8, 12, 20, 16, 25 };

        // construct the BST
        Node root = constructBST(preorder, 0, preorder.length - 1);

        // print the BST
        System.out.print("Inorder traversal of BST is ");

        // inorder on the BST always returns a sorted sequence
        inorder(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, key):
        self.key = key

# Recursive function to perform inorder traversal on a given binary tree
def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.key, end=' ')
    inorder(root.right)

# Recursive function to build a BST from a preorder sequence.
def constructBST(preorder, start, end):

    # base case
    if start > end:
        return None

    # Construct the root node of the subtree formed by keys of the
    # preorder sequence in range `[start, end]`
    node = Node(preorder[start])

    # search the index of the first element in the current range of preorder
    # sequence larger than the root node's value
    i = start
    while i <= end:
        if preorder[i] > node.key:
            break
        i = i + 1

    # recursively construct the left subtree
    node.left = constructBST(preorder, start + 1, i - 1)

    # recursively construct the right subtree
    node.right = constructBST(preorder, i, end)

    # return current node
    return node

if __name__ == '__main__':

    ''' Construct the following BST
              15
            /    \
           /      \
          10       20
         /  \     /  \
        /    \   /    \
       8     12 16    25
    '''

    preorder = [15, 10, 8, 12, 20, 16, 25]

    # construct the BST
    root = constructBST(preorder, 0, len(preorder) - 1)

    # print the BST
    print('Inorder traversal of BST is ', end='')

    # inorder on the BST always returns a sorted sequence
    inorder(root)
```

The time complexity of the above solution is O(n2), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack. We can reduce the time complexity to O(n) by following a different approach that doesn’t involve searching for an index that separates the left and right subtree keys in a preorder sequence:

We know that each node has a key that is greater than all keys present in its left subtree, but less than the keys present in the right subtree of a BST. The idea to pass the information regarding the valid range of keys for the current root node and its children in the recursion itself.

We start by setting the range as `[-INFINITY, INFINITY]` for the root node. It means that the root node and any of its children can have keys ranging between `-INFINITY` and `INFINITY`. Like the previous approach, construct BST’s root node from the first item in the preorder sequence. Suppose the root node has value `x`, recur for the right subtree with range `(x, INFINITY)` and recur for the left subtree with range `[-INFINITY, x)`. To construct the complete BST, recursively set the range for each recursive call and return if the next element in preorder traversal is out of the valid range.

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

// Function to print the inorder traversal on a given binary tree
void inorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left);
    cout << root->data << ' ';
    inorder(root->right);
}

// Recursive function to build a BST from a preorder sequence.
Node* buildTree(vector<int> const &preorder, int &pIndex,
                int min, int max)
{
    // Base case
    if (pIndex == preorder.size()) {
        return nullptr;
    }

    // Return if the next element of preorder traversal is not in the valid range
    int val = preorder[pIndex];
    if (val < min || val > max) {
        return nullptr;
    }

    // Construct the root node and increment `pIndex`
    Node* root = new Node(val);
    pIndex++;

    // Since all elements in the left subtree of a BST must be less
    // than the root node's value, set range as `[min, val-1]` and recur
    root->left = buildTree(preorder, pIndex, min, val - 1);

    // Since all elements in the right subtree of a BST must be greater
    // than the root node's value, set range as `[val+1…max]` and recur
    root->right = buildTree(preorder, pIndex, val + 1, max);

    return root;
}

// Build a BST from a preorder sequence
Node* buildTree(vector<int> const &preorder)
{
    // start from the root node (the first element in a preorder sequence)
    int pIndex = 0;

    // set the root node's range as [-INFINITY, INFINITY] and recur
    return buildTree(preorder, pIndex, INT_MIN, INT_MAX);
}

int main()
{
    /* Construct the following BST
              15
            /    \
           /      \
          10       20
         /  \     /  \
        /    \   /    \
       8     12 16    25
    */

    // preorder traversal of BST
    vector<int> preorder = { 15, 10, 8, 12, 20, 16, 25 };

    // construct the BST
    Node* root = buildTree(preorder);

    // print the BST
    cout << "Inorder traversal of BST is ";

    // inorder on the BST always returns a sorted sequence
    inorder(root);

    return 0;
}
```

**Output:** Inorder traversal of BST is 8 10 12 15 16 20 25

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
    // Function to print the inorder traversal on a given binary tree
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    // Recursive function to build a BST from a preorder sequence
    public static Node buildTree(int[] preorder, AtomicInteger pIndex,
                                int min, int max)
    {
        // Base case
        if (pIndex.get() == preorder.length) {
            return null;
        }

        // Return if the next element of preorder traversal is not in the valid range
        int val = preorder[pIndex.get()];
        if (val < min || val > max) {
            return null;
        }

        // Construct the root node and increment `pIndex`
        Node root = new Node(val);
        pIndex.incrementAndGet();

        // Since all elements in the left subtree of a BST must be less
        // than the root node's value, set range as `[min, val-1]` and recur
        root.left = buildTree(preorder, pIndex, min, val - 1);

        // Since all elements in the right subtree of a BST must be greater
        // than the root node's value, set range as `[val+1…max]` and recur
        root.right = buildTree(preorder, pIndex, val + 1, max);

        return root;
    }

    // Build a BST from a preorder sequence
    public static Node buildTree(int[] preorder)
    {
        // start from the root node (the first element in a preorder sequence)
        // `AtomicInteger` is used here since `Integer` is passed by value in Java
        AtomicInteger pIndex = new AtomicInteger(0);

        // set the root node's range as [-INFINITY, INFINITY] and recur
        return buildTree(preorder, pIndex, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }

    public static void main(String[] args)
    {
        /* Construct the following BST
                  15
                /    \
               /      \
              10       20
             /  \     /  \
            /    \   /    \
           8     12 16    25
        */

        // preorder traversal of BST
        int[] preorder = { 15, 10, 8, 12, 20, 16, 25 };

        // construct the BST
        Node root = buildTree(preorder);

        // print the BST
        System.out.print("Inorder traversal of BST is ");

        // inorder on the BST always returns a sorted sequence
        inorder(root);
    }
}
```

##

```python3
import sys

# A class to store a binary tree node
class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Function to print the inorder traversal on a given binary tree
def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.key, end=' ')
    inorder(root.right)

# Recursive function to build a BST from a preorder sequence.
# start from the root node (the first element in a preorder sequence)
# set the root node's range as [-INFINITY, INFINITY]
def buildBST(preorder, pIndex=0, min=-sys.maxsize, max=sys.maxsize):

    # Base case
    if pIndex == len(preorder):
        return None, pIndex

    # Return if the next element of preorder traversal is not in the valid range
    val = preorder[pIndex]
    if val < min or val > max:
        return None, pIndex

    # Construct the root node and increment `pIndex`
    root = Node(val)
    pIndex = pIndex + 1

    # Since all elements in the left subtree of a BST must be less
    # than the root node's value, set range as `[min, val-1]` and recur
    root.left, pIndex = buildBST(preorder, pIndex, min, val - 1)

    # Since all elements in the right subtree of a BST must be greater
    # than the root node's value, set range as `[val+1…max]` and recur
    root.right, pIndex = buildBST(preorder, pIndex, val + 1, max)

    return root, pIndex

if __name__ == '__main__':

    ''' Construct the following BST
              15
            /    \
           /      \
          10       20
         /  \     /  \
        /    \   /    \
       8     12 16    25
    '''

    # preorder traversal of BST
    preorder = [15, 10, 8, 12, 20, 16, 25]

    # construct the BST
    root = buildBST(preorder)[0]

    # print the BST
    print('Inorder traversal of BST is:', end=' ')

    # inorder on the BST always returns a sorted sequence
    inorder(root)
```
