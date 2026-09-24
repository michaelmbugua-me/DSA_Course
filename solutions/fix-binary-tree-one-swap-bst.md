# Fix a binary tree that is only one swap away from becoming a BST

> Source: https://www.techiedelight.com/fix-binary-tree-one-swap-bst/

Given a binary tree that is only one swap away from becoming a BST, convert it into a BST in a single traversal.

For example, consider the binary tree shown on the left below. The solution should convert it into a BST shown on the right by swapping nodes 2 and 4.

> 

We know that an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) of a binary search tree returns the nodes in sorted order. The idea is to perform inorder traversal on a given binary tree and keep track of the last visited node while traversing the tree. Check whether its key is smaller compared to the current key or not and mark the nodes where this property is violated and later swap them.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <climits>
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

// Recursive function to fix a binary tree that is only one swap
// away from becoming a BST. Here, `prev` is the previously processed node
// in inorder traversal, and `x` & `y` stores node to be swapped (if any).
void correctBST(Node* root, Node* &x, Node* &y, Node* &prev)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // recur for the left subtree
    correctBST(root->left, x, y, prev);

    // if the current node is less than the previous node
    if (root->data < prev->data)
    {
        // if this is the first occurrence, update `x` and `y` to the previous
        // and current node, respectively
        if (x == nullptr) {
            x = prev;
        }

        // if this is a second occurrence, update `y` to the current node
        y = root;
    }

    // update the previous node and recur for the right subtree
    prev = root;
    correctBST(root->right, x, y, prev);
}

// Fix given binary tree that is only one swap away from becoming a BST
void correctBST(Node* root)
{
    // `x` and `y` stores node to be swapped
    Node *x = nullptr, *y = nullptr;

    // stores previously processed node in the inorder traversal
    // initialize it by -INFINITY
    Node* prev = new Node(INT_MIN);

    // fix the binary tree
    correctBST(root, x, y, prev);

    // swap the nodes
    if (x && y) {
        swap(x->data, y->data);
    }
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16, 25 };

    /* Construct the following tree
              15
            /    \
           /      \
          10       20
         /  \     /  \
        /    \   /    \
       8     12 16    25
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    // swap any two nodes' values
    swap(root->left->data, root->right->right->data);

    // fix the BST
    correctBST(root);

    // print the BST after fixing it
    inorder(root);

    return 0;
}
```

**Output:** 8 10 12 15 16 20 25

##

```java
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
    // Wrapper over `Node` class
    static class NodeWrapper
    {
        public Node node;

        NodeWrapper() {
            this.node = null;
        }

        NodeWrapper(int data) {
            this.node = new Node(data);
        }
    }

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

    // Function to exchange data of given tree nodes
    public static void swapData(Node first, Node second)
    {
        int data = first.data;
        first.data = second.data;
        second.data = data;
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

    // Recursive function to fix a binary tree that is only one swap
    // away from becoming a BST. Here, `prev` is the previously processed node
    // in inorder traversal, and `x` & `y` stores node to be swapped (if any).
    public static void correctBST(Node root, NodeWrapper x, NodeWrapper y,
            NodeWrapper prev)
    {
        // base case
        if (root == null) {
            return;
        }

        // recur for the left subtree
        correctBST(root.left, x, y, prev);

        // if the current node is less than the previous node
        if (root.data < prev.node.data)
        {
            // if this is the first occurrence, update `x` and `y` to the previous
            // and current node, respectively
            if (x.node == null) {
                x.node = prev.node;
            }

            // if this is a second occurrence, update `y` to the current node
            y.node = root;
        }

        // update the previous node and recur for the right subtree
        prev.node = root;
        correctBST(root.right, x, y, prev);
    }

    // Fix given binary tree that is only one swap away from becoming a BST
    public static void correctBST(Node root)
    {
        // wrap `x`, `y`, and `prev` nodes, so their reference can be changed
        // inside the `correctBST()` method

        // `x` and `y` stores node to be swapped
        NodeWrapper x = new NodeWrapper();
        NodeWrapper y = new NodeWrapper();

        // stores previously processed node in the inorder traversal
        // initialize it by -INFINITY
        NodeWrapper prev = new NodeWrapper(Integer.MIN_VALUE);

        // fix the binary tree
        correctBST(root, x, y, prev);

        // swap the nodes
        if (x.node != null && y.node != null ) {
            swapData(x.node, y.node);
        }
    }

    public static void main(String[] args)
    {
        int[] keys = {15, 10, 20, 8, 12, 16, 25};

        /* Construct the following BST
                  15
                /    \
               /      \
              10       20
             /  \     /  \
            /    \   /    \
           8     12 16    25
        */

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        // swap any two nodes' values
        swapData(root.left, root.right.right);

        // fix the BST
        correctBST(root);

        // print the BST after fixing it
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

# Function to perform inorder traversal on the tree
def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Function to exchange data of given tree nodes
def swapData(first, second):

    data = first.data
    first.data = second.data
    second.data = data

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

# Recursive function to fix a binary tree that is only one swap
# away from becoming a BST. Here, `prev` is the previously processed node
# in inorder traversal, and `x` & `y` stores node to be swapped (if any).
def correctBST(root, x, y, prev):

    # base case
    if root is None:
        return x, y, prev

    # recur for the left subtree
    x, y, prev = correctBST(root.left, x, y, prev)

    # if the current node is less than the previous node
    if root.data < prev.data:
        # if this is the first occurrence, update `x` and `y` to the previous
        # and current node, respectively
        if x is None:
            x = prev

        # if this is a second occurrence, update `y` to the current node
        y = root

    # update the previous node and recur for the right subtree
    prev = root
    return correctBST(root.right, x, y, prev)

# Fix given binary tree that is only one swap away from becoming a BST
def fixBST(root):

    # `x` and `y` stores node to be swapped

    # stores previously processed node in the inorder traversal
    # initialize it by -INFINITY
    prev = Node(-sys.maxsize)

    # fix the binary tree
    x, y, prev = correctBST(root, None, None, prev)

    # swap the nodes' data
    if x and y:
        swapData(x, y)

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    ''' Construct the following BST
              15
            /    \
           /      \
          10       20
         /  \     /  \
        /    \   /    \
       8     12 16    25
    '''

    root = None
    for key in keys:
        root = insert(root, key)

    # swap any two nodes' values
    swapData(root.left, root.right.right)

    # fix the BST
    fixBST(root)

    # print the BST after fixing it
    inorder(root)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

Also See:

> [Determine whether a given binary tree is a BST or not](https://www.techiedelight.com/determine-given-binary-tree-is-a-bst-or-not/ "Determine whether a given binary tree is a BST or not")

> [Sink nodes containing zero to the bottom of a binary tree](https://www.techiedelight.com/sink-nodes-containing-zero-bottom-binary-tree/ "Sink nodes containing zero to the bottom of a binary tree")

> [Set next pointer to the inorder successor of all nodes in a binary tree](https://www.techiedelight.com/set-next-pointer-inorder-successor-binary-tree/ "Set next pointer to the inorder successor of all nodes in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.6/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
