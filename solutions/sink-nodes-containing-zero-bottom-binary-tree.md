# Sink nodes containing zero to the bottom of a binary tree

> Source: https://www.techiedelight.com/sink-nodes-containing-zero-bottom-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree containing many zero nodes, sink nodes having zero value at the bottom of the subtree rooted at that node. In other words, the output binary tree should not contain any node having zero value that is the parent of the node having a non-zero value.

For example, a binary tree shown on the left can be converted into a binary tree shown on the right.

> 

The idea is to process the tree nodes in a [postorder manner](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/), i.e., after fixing the left and right subtrees of a node, fix the node if it is zero. To fix a node, do something similar to the [Heapify procedure](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heapify) of [Heapsort algorithm](https://techiedelight.com/heap-sort-place-place-implementation-c-c/). As the left and right subtree are already fixed, we can fix the binary tree rooted at the current node by moving the current node (containing zero) down the tree. We do so by comparing the node with its left and right child, swapping it with the non-zero child, and then recursively calling the procedure on the corresponding child. Repeat the process until a leaf node is reached or the subtree rooted at the current node contains all zeros.

The algorithm can be implemented as follows in C++, Java, and Python. As several binary trees can be constructed from one input, the solution would construct anyone.

```cpp
#include <iostream>
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

// Function to perform inorder traversal on a given binary tree
void inorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

// Function to sink root node having value 0 at the bottom of the tree.
// The left and right subtree (if any) of the root node are already sinked
void sink(Node* root)
{
    // base case: tree is empty
    if (root == nullptr) {
        return;
    }

    // if the left child exists and has a non-zero value
    if (root->left && root->left->data != 0)
    {
        // swap the current node data with its left child
        swap(root->data, root->left->data);

        // recur for the left subtree
        sink(root->left);
    }

    // if the right child exists and has a non-zero value
    else if (root->right && root->right->data != 0)
    {
        // swap the current node data with its right child
        swap(root->data, root->right->data);

        // recur for the right subtree
        sink(root->right);
    }
}

// The main function to sink nodes having zero value at the bottom
// of the binary tree
void sinkNodes(Node* &root)
{
    // base case: tree is empty
    if (root == nullptr) {
        return;
    }

    // fix left and right subtree first
    sinkNodes(root->left);
    sinkNodes(root->right);

    // sink the current node if it has a value of 0
    if (root->data == 0) {
        sink(root);
    }
}

int main()
{
    /* Construct the following tree
              0
            /   \
           /     \
          1       0
                /   \
               /     \
              0       2
            /   \
           /     \
          3       4
    */

    Node* root = new Node(0);
    root->left = new Node(1);
    root->right = new Node(0);
    root->right->left = new Node(0);
    root->right->right = new Node(2);
    root->right->left->left = new Node(3);
    root->right->left->right = new Node(4);

    sinkNodes(root);
    inorder(root);

    return 0;
}
```

**Output:** 0 1 0 4 0 3 2

##

```java
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
    // Function to perform inorder traversal on a given binary tree
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    // Function to sink root node having value 0 at the bottom of the tree.
    // The left and right subtree (if any) of the root node are already sinked
    public static void sink(Node root)
    {
        // base case: tree is empty
        if (root == null) {
            return;
        }

        // if the left child exists and has a non-zero value
        if (root.left != null && root.left.data != 0)
        {
            // swap the current node data with its left child
            int temp = root.data;
            root.data = root.left.data;
            root.left.data = temp;

            // recur for the left subtree
            sink(root.left);
        }

        // if the right child exists and has a non-zero value
        else if (root.right != null && root.right.data != 0)
        {
            // swap the current node data with its right child
            int temp = root.data;
            root.data = root.right.data;
            root.right.data = temp;

            // recur for the right subtree
            sink(root.right);
        }
    }

    // The main function to sink nodes having zero value at the bottom
    // of the binary tree
    public static void sinkNodes(Node root)
    {
        // base case: tree is empty
        if (root == null) {
            return;
        }

        // fix left and right subtree first
        sinkNodes(root.left);
        sinkNodes(root.right);

        // sink the current node if it has a value of 0
        if (root.data == 0) {
            sink(root);
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  0
                /   \
               /     \
              1       0
                    /   \
                   /     \
                  0       2
                /   \
               /     \
              3       4
        */

        Node root = new Node(0);
        root.left = new Node(1);
        root.right = new Node(0);
        root.right.left = new Node(0);
        root.right.right = new Node(2);
        root.right.left.left = new Node(3);
        root.right.left.right = new Node(4);

        sinkNodes(root);

        inorder(root);
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

# Function to perform inorder traversal on a given binary tree
def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Function to sink root node having value 0 at the bottom of the tree.
# The left and right subtree (if any) of the root node are already sinked
def sink(root):

    # base case: tree is empty
    if root is None:
        return

    # if the left child exists and has a non-zero value
    if root.left and root.left.data:

        # swap the current node data with its left child
        temp = root.data
        root.data = root.left.data
        root.left.data = temp

        # recur for the left subtree
        sink(root.left)

    # if the right child exists and has a non-zero value
    elif root.right and root.right.data:

        # swap the current node data with its right child
        temp = root.data
        root.data = root.right.data
        root.right.data = temp

        # recur for the right subtree
        sink(root.right)

# The main function to sink nodes having zero value at the bottom
# of the binary tree
def sinkNodes(root):

    # base case: tree is empty
    if root is None:
        return

    # fix left and right subtree first
    sinkNodes(root.left)
    sinkNodes(root.right)

    # sink the current node if it has a value of 0
    if root.data == 0:
        sink(root)

if __name__ == '__main__':

    ''' Construct the following tree
              0
            /   \
           /     \
          1       0
                /   \
               /     \
              0       2
            /   \
           /     \
          3       4
    '''

    root = Node(0)
    root.left = Node(1)
    root.right = Node(0)
    root.right.left = Node(0)
    root.right.right = Node(2)
    root.right.left.left = Node(3)
    root.right.left.right = Node(4)

    sinkNodes(root)
    inorder(root)
```

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

> [Set next pointer to the inorder successor of all nodes in a binary tree](https://www.techiedelight.com/set-next-pointer-inorder-successor-binary-tree/ "Set next pointer to the inorder successor of all nodes in a binary tree")

> [Fix a binary tree that is only one swap away from becoming a BST](https://www.techiedelight.com/fix-binary-tree-one-swap-bst/ "Fix a binary tree that is only one swap away from becoming a BST")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
