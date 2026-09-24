# Build a Binary Search Tree from a postorder sequence

> Source: https://www.techiedelight.com/build-binary-search-tree-from-postorder-sequence/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a distinct sequence of keys representing the [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) of a binary search tree, construct a BST from it.

For example, the following BST should be constructed for postorder traversal `{8, 12, 10, 16, 25, 20, 15}`:

> 

We can easily build a BST for a given postorder sequence by recursively repeating the following steps for all keys in it, starting from the right.

  1. Construct the root node of BST, which would be the last key in the postorder sequence.
  2. Find index `i` of the last key in the postorder sequence, which is smaller than the root node.
  3. Recur for right subtree with keys in the postorder sequence that appears after the `i'th` index (excluding the last index).
  4. Recur for left subtree with keys in the postorder sequence that appears before the `i'th` index (including `i'th` index).

Let’s consider the postorder traversal `{8, 12, 10, 16, 25, 20, 15}` to make the context more clear.

  1. The last item in the postorder sequence `15` becomes the root node.
  2. Since `10` is the last key in the postorder sequence, which smaller than the root node, the left subtree consists of keys `{8, 12, 10}` and the right subtree consists of keys `{16, 25, 20}`.
  3. To construct the complete binary search tree, recursively repeat the above steps for postorder sequence `{8, 12, 10}` and `{16, 25, 20}`.

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

// Recursive function to build a binary search tree from
// its postorder sequence
struct Node* constructBST(int postorder[], int start, int end)
{
    // base case
    if (start > end) {
        return NULL;
    }

    // Construct the root node of the subtree formed by keys of the
    // postorder sequence in range `[start, end]`
    struct Node* node = newNode(postorder[end]);

    // search the index of the last element in the current range of postorder
    // sequence, which is smaller than the root node's value
    int i;
    for (i = end; i >=start; i--)
    {
        if (postorder[i] < node->key) {
            break;
        }
    }

    // Build the right subtree before the left subtree since the values are
    // being read from the end of the postorder sequence.

    // recursively construct the right subtree
    node->right = constructBST(postorder, i + 1, end - 1);

    // recursively construct the left subtree
    node->left = constructBST(postorder, start, i);

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

    int postorder[] = { 8, 12, 10, 16, 25, 20, 15 };
    int n = sizeof(postorder)/sizeof(postorder[0]);

    // construct the BST
    struct Node* root = constructBST(postorder, 0, n - 1);

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

    // Recursive function to build a binary search tree from
    // its postorder sequence
    public static Node constructBST(int[] postorder, int start, int end)
    {
        // base case
        if (start > end) {
            return null;
        }

        // Construct the root node of the subtree formed by keys of the
        // postorder sequence in range `[start, end]`
        Node node = new Node(postorder[end]);

        // search the index of the last element in the current range of postorder
        // sequence, which is smaller than the root node's value
        int i;
        for (i = end; i >=start; i--)
        {
            if (postorder[i] < node.key) {
                break;
            }
        }

        // Build the right subtree before the left subtree since the values are
        // being read from the end of the postorder sequence.

        // recursively construct the right subtree
        node.right = constructBST(postorder, i + 1, end - 1);

        // recursively construct the left subtree
        node.left = constructBST(postorder, start, i);

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

        int[] postorder = { 8, 12, 10, 16, 25, 20, 15 };

        // construct the BST
        Node root = constructBST(postorder, 0, postorder.length - 1);

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

# Recursive function to build a binary search tree from
# its postorder sequence
def constructBST(postorder, start, end):

    # base case
    if start > end:
        return None

    # Construct the root node of the subtree formed by keys of the
    # postorder sequence in range `[start, end]`
    node = Node(postorder[end])

    # search the index of the last element in the current range of postorder
    # sequence, which is smaller than the root node's value
    i = end
    while i >= start:
        if postorder[i] < node.key:
            break
        i = i - 1

    # Build the right subtree before the left subtree since the values are
    # being read from the end of the postorder sequence.

    # recursively construct the right subtree
    node.right = constructBST(postorder, i + 1, end - 1)

    # recursively construct the left subtree
    node.left = constructBST(postorder, start, i)

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

    postorder = [8, 12, 10, 16, 25, 20, 15]

    # construct the BST
    root = constructBST(postorder, 0, len(postorder) - 1)

    # print the BST
    print('Inorder traversal of BST is ', end='')

    # inorder on the BST always returns a sorted sequence
    inorder(root)
```

The time complexity of the above solution is O(n2), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack. We can reduce the time complexity to O(n) by following a different approach that doesn’t involve searching for an index that separates the left and right subtree keys in a postorder sequence.

We know that each node has a key that is greater than all keys present in its left subtree and less than the keys present in the right subtree in the BST. The idea to pass the information regarding the valid range of keys for the current root node and its children in the recursion itself.

We start by setting the range as `[-INFINITY, INFINITY]` for the root node. It means that the root node and any of its children can have keys ranging between `-INFINITY` and `INFINITY`. Like the previous approach, construct BST’s root node from the last item in the postorder sequence. Suppose the root node has value `x`, recur for the right subtree with range `(x, INFINITY)` and recur for the left subtree with range `[-INFINITY, x)`. To construct the complete binary search tree, recursively set the range for each recursive call and return if the next element of the postorder traversal is out of the valid range.

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

// Recursive function to build a binary search tree from its postorder sequence
Node* buildTree(vector<int> const &postorder, int &pIndex,
                int min, int max)
{
    // Base case
    if (pIndex < 0) {
        return nullptr;
    }

    // Return if the next element of postorder traversal from the end
    // is not in the valid range
    int curr = postorder[pIndex];
    if (curr < min || curr > max) {
        return nullptr;
    }

    // Construct the root node and decrement `pIndex`
    Node* root = new Node(curr);
    pIndex--;

    /* Construct the left and right subtree of the root node.
       Build the right subtree before the left subtree since the values
       are being read from the end of the postorder sequence. */

    // Since all elements in the right subtree of a BST must be greater
    // than the root node's value, set range as `[curr+1…max]` and recur
    root->right = buildTree(postorder, pIndex, curr + 1, max);

    // Since all elements in the left subtree of a BST must be less
    // than the root node's value, set range as `[min, curr-1]` and recur
    root->left = buildTree(postorder, pIndex, min, curr - 1);

    return root;
}

// Build a binary search tree from its postorder sequence
Node* buildTree(vector<int> const &postorder)
{
    // start from the root node (last element in postorder sequence)
    int postIndex = postorder.size() - 1;

    // set the root node's range as [-INFINITY, INFINITY] and recur
    return buildTree(postorder, postIndex, INT_MIN, INT_MAX);
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

    // postorder traversal of BST
    vector<int> postorder = { 8, 12, 10, 16, 25, 20, 15 };

    // construct the BST
    Node* root = buildTree(postorder);

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

    Node(int data)
    {
        this.data = data;
        this.left = this.right = null;
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

    // Recursive function to build a binary search tree from
    // its postorder sequence
    public static Node buildTree(int[] postorder, AtomicInteger pIndex,
                                int min, int max)
    {
        // Base case
        if (pIndex.get() < 0) {
            return null;
        }

        // Return if the next element of postorder traversal from the end
        // is not in the valid range
        int curr = postorder[pIndex.get()];
        if (curr < min || curr > max) {
            return null;
        }

        // Construct the root node and decrement `pIndex`
        Node root = new Node(curr);
        pIndex.decrementAndGet();

        /* Construct the left and right subtree of the root node.
           Build the right subtree before the left subtree since the values
           are being read from the end of the postorder sequence. */

        // Since all elements in the right subtree of a BST must be greater
        // than the root node's value, set range as `[curr+1…max]` and recur
        root.right = buildTree(postorder, pIndex, curr + 1, max);

        // Since all elements in the left subtree of a BST must be less
        // than the root node's value, set range as `[min, curr-1]` and recur
        root.left = buildTree(postorder, pIndex, min, curr - 1);

        return root;
    }

    // Build a binary search tree from its postorder sequence
    public static Node buildTree(int[] postorder)
    {
        // start from the root node (last element in postorder sequence)
        AtomicInteger postIndex = new AtomicInteger(postorder.length - 1);

        // set the root node's range as [-INFINITY, INFINITY] and recur
        return buildTree(postorder, postIndex, Integer.MIN_VALUE, Integer.MAX_VALUE);
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

        // postorder traversal of BST
        int[] postorder = { 8, 12, 10, 16, 25, 20, 15 };

        // construct the BST
        Node root = buildTree(postorder);

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
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to print the inorder traversal on a given binary tree
def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Recursive function to build a binary search tree from
# its postorder sequence
def buildBST(postorder, pIndex, min, max):

    # Base case
    if pIndex < 0:
        return None, pIndex

    # Return if the next element of postorder traversal from the end
    # is not in the valid range
    curr = postorder[pIndex]
    if curr < min or curr > max:
        return None, pIndex

    # Construct the root node and decrement `pIndex`
    root = Node(curr)
    pIndex = pIndex - 1

    ''' Construct the left and right subtree of the root node.
        Build the right subtree before the left subtree since the values
        are being read from the end of the postorder sequence. '''

    # Since all elements in the right subtree of a BST must be greater
    # than the root node's value, set range as `[curr+1…max]` and recur
    root.right, pIndex = buildBST(postorder, pIndex, curr + 1, max)

    # Since all elements in the left subtree of a BST must be less
    # than the root node's value, set range as `[min, curr-1]` and recur
    root.left, pIndex = buildBST(postorder, pIndex, min, curr - 1)

    return root, pIndex

# Build a binary search tree from its postorder sequence
def buildTree(postorder):

    # start from the root node (last element in postorder sequence)
    postIndex = len(postorder) - 1

    # set the root node's range as [-INFINITY, INFINITY] and recur
    return buildBST(postorder, postIndex, -sys.maxsize, sys.maxsize)[0]

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

    # postorder traversal of BST
    postorder = [8, 12, 10, 16, 25, 20, 15]

    # construct the BST
    root = buildTree(postorder)

    # print the BST
    print('Inorder traversal of BST is ', end='')

    # inorder on the BST always returns a sorted sequence
    inorder(root)
```
