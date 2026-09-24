# Construct a full binary tree from the preorder sequence with leaf node information

> Source: https://www.techiedelight.com/construct-full-binary-tree-from-preorder-sequence-with-leaf-information/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient algorithm to construct a full binary tree from a sequence of keys representing [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and a boolean array that determines if the value at the corresponding index in the preorder sequence is a leaf node or an internal node. A full binary tree is a tree in which every node has either 0 or 2 children.

For example,

**Input:** Preorder traversal : { 1, 2, 4, 5, 3, 6, 8, 9, 7 } Boolean array : { 0, 0, 1, 1, 0, 0, 1, 1, 1 } (1 represents a leaf node, and 0 represents an internal node) **Output:** Below full binary tree

> 

The idea is first to construct the full binary tree’s root node using the first key in the preorder sequence and then using the given boolean array, check if the root node is an internal node or a leaf node. If the root node is an internal node, recursively construct its left and right subtrees.

To construct the complete full binary tree, recursively repeat the above steps with subsequent keys in the preorder sequence. Following is the implementation of this approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node *left, *right;

    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Function to print the preorder traversal on a given binary tree
void preorderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    cout << root->data << ' ';
    preorderTraversal(root->left);
    preorderTraversal(root->right);
}

// Recursive function to construct a full binary tree from a given
// preorder sequence with extra information about leaf nodes
Node *construct(vector<int> const &preorder, vector<bool> const &isLeaf, int &pIndex)
{
    // base case
    if (pIndex == preorder.size()) {
        return nullptr;
    }

    // construct the current node, check if it is an internal node,
    // and increment `pIndex`
    Node* node = new Node(preorder[pIndex]);
    bool isInternalNode = !isLeaf[pIndex];
    pIndex++;

    // if the current node is an internal node, construct its 2 children
    if (isInternalNode)
    {
        node->left = construct(preorder, isLeaf, pIndex);
        node->right = construct(preorder, isLeaf, pIndex);
    }

    // return current node
    return node;
}

// Construct a full binary tree from the preorder sequence with
// leaf node information
Node* constructTree(vector<int> const &preorder,
                vector<bool> const &isLeaf)
{
    // `pIndex` stores the index of the next unprocessed key in a preorder sequence;
    // start with the root node (at 0th index).
    int pIndex = 0;

    return construct(preorder, isLeaf, pIndex);
}

int main()
{
    /* Construct the following tree
               1
             /   \
            /     \
           2       3
          / \     / \
         /   \   /   \
        4     5 6     7
               / \
              /   \
             8     9
    */

    // preorder traversal
    vector<int> preorder = { 1, 2, 4, 5, 3, 6, 8, 9, 7 };

    // 1 represents a leaf node, and 0 represents an internal node
    // in the preorder traversal
    vector<bool> isLeaf = { 0, 0, 1, 1, 0, 0, 1, 1, 1 };

    // construct the tree
    Node* root = constructTree(preorder, isLeaf);

    // print the tree in a preorder fashion
    cout << "Preorder traversal of the constructed tree is ";
    preorderTraversal(root);

    return 0;
}
```

**Output:** Preorder traversal of the constructed tree is 1 2 4 5 3 6 8 9 7

##

```java
import java.util.concurrent.atomic.AtomicInteger;

// A class to store a binary tree node
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
    // Function to print the preorder traversal on a given binary tree
    public static void preorderTraversal(Node root)
    {
        if (root == null) {
            return;
        }

        System.out.print(root.data + " ");
        preorderTraversal(root.left);
        preorderTraversal(root.right);
    }

    // Recursive function to construct a full binary tree from a given
    // preorder sequence with extra information about leaf nodes
    public static Node construct(int[] preorder, int[] isLeaf, AtomicInteger pIndex)
    {
        // base case
        if (pIndex.get() == preorder.length) {
            return null;
        }

        // construct the current node, check if it is an internal node,
        // and increment `pIndex`
        Node node = new Node(preorder[pIndex.get()]);
        boolean isInternalNode = (isLeaf[pIndex.get()] == 0);
        pIndex.incrementAndGet();

        // if the current node is an internal node, construct its 2 children
        if (isInternalNode)
        {
            node.left = construct(preorder, isLeaf, pIndex);
            node.right = construct(preorder, isLeaf, pIndex);
        }

        // return current node
        return node;
    }

    // Construct a full binary tree from the preorder sequence with leaf node
    // information
    public static Node constructTree(int[] preorder, int[] isLeaf)
    {
        // `pIndex` stores the index of the next unprocessed key in a preorder
        // sequence; We start with the root node (at 0th index). `AtomicInteger`
        // is used here since `Integer` is passed by value in Java.

        AtomicInteger pIndex = new AtomicInteger(0);
        return construct(preorder, isLeaf, pIndex);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                   1
                 /   \
                /     \
               2       3
              / \     / \
             /   \   /   \
            4     5 6     7
                   / \
                  /   \
                 8     9
        */

        int[] preorder = { 1, 2, 4, 5, 3, 6, 8, 9, 7 };
        int[] isLeaf    = { 0, 0, 1, 1, 0, 0, 1, 1, 1 };

        // construct the tree
        Node root = constructTree(preorder, isLeaf);

        // print the tree in a preorder fashion
        System.out.print("Preorder traversal of the constructed tree is ");
        preorderTraversal(root);
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

# Function to print the preorder traversal on a given binary tree
def preorderTraversal(root):
    if root is None:
        return

    print(root.data, end=' ')
    preorderTraversal(root.left)
    preorderTraversal(root.right)

# Recursive function to construct a full binary tree from a given
# preorder sequence with extra information about leaf nodes
def construct(preorder, isLeaf, pIndex):

    # base case
    if pIndex == len(preorder):
        return None, pIndex

    # construct the current node, check if it is an internal node,
    # and increment `pIndex`
    node = Node(preorder[pIndex])
    isInternalNode = (isLeaf[pIndex] == 0)
    pIndex = pIndex + 1

    # if the current node is an internal node, construct its 2 children
    if isInternalNode:
        node.left, pIndex = construct(preorder, isLeaf, pIndex)
        node.right, pIndex = construct(preorder, isLeaf, pIndex)

    # return current node
    return node, pIndex

# Construct a full binary tree from the preorder sequence with leaf node information
def constructTree(preorder, isLeaf):

    # `pIndex` stores the index of the next unprocessed key in a preorder sequence;
    # start with the root node (at 0th index).
    pIndex = 0
    return construct(preorder, isLeaf, pIndex)[0]

if __name__ == '__main__':

    ''' Construct the following tree
               1
             /   \
            /     \
           2       3
          / \     / \
         /   \   /   \
        4     5 6     7
               / \
              /   \
             8     9
    '''

    preorder = [1, 2, 4, 5, 3, 6, 8, 9, 7]
    isLeaf    = [0, 0, 1, 1, 0, 0, 1, 1, 1]

    # construct the tree
    root = constructTree(preorder, isLeaf)

    # print the tree in a preorder fashion
    print('Preorder traversal of the constructed tree is', end=' ')
    preorderTraversal(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

Also See:

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Find postorder traversal of a binary tree from its inorder and preorder sequence](https://www.techiedelight.com/find-postorder-traversal-binary-tree-from-inorder-preorder-sequence/ "Find postorder traversal of a binary tree from its inorder and preorder sequence")

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
