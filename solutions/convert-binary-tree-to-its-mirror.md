# Convert a binary tree to its mirror

> Source: https://www.techiedelight.com/convert-binary-tree-to-its-mirror/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to convert the binary tree into its mirror.

For example, the following binary trees are mirrors of each other:

> 

The idea is simple – traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/), and for every node, swap its left and right child pointer after recursively converting its left and right subtree to mirror first. Following is the C++, Java, and Python implementation of the idea:

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

// Function to perform preorder traversal on a given binary tree
void preorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

// Function to convert a given binary tree into its mirror
void convertToMirror(Node* root)
{
    // base case: if the tree is empty
    if (root == nullptr) {
        return;
    }

    // convert left subtree
    convertToMirror(root->left);

    // convert right subtree
    convertToMirror(root->right);

    // swap left subtree with right subtree
    swap(root->left, root->right);
}

int main()
{
    /* Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    convertToMirror(root);
    preorder(root);

    return 0;
}
```

**Output:** 1 3 7 6 2 5 4

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
    // Function to perform preorder traversal on a given binary tree
    public static void preorder(Node root)
    {
        if (root == null) {
            return;
        }

        System.out.print(root.data + " ");
        preorder(root.left);
        preorder(root.right);
    }

    // Utility function to swap left subtree with right subtree
    public static void swap(Node root)
    {
        if (root == null) {
            return;
        }

        Node temp = root.left;
        root.left = root.right;
        root.right = temp;
    }

    // Function to convert a given binary tree into its mirror
    public static void convertToMirror(Node root)
    {
        // base case: if the tree is empty
        if (root == null) {
            return;
        }

        // convert left subtree
        convertToMirror(root.left);

        // convert right subtree
        convertToMirror(root.right);

        // swap left subtree with right subtree
        swap(root);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
               /     \
              2       3
             / \     / \
            4   5   6   7
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        convertToMirror(root);
        preorder(root);
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

# Function to perform preorder traversal on a given binary tree
def preorder(root):
    if root is None:
        return

    print(root.data, end=' ')
    preorder(root.left)
    preorder(root.right)

# Utility function to swap left subtree with right subtree
def swap(root):
    if root is None:
        return

    temp = root.left
    root.left = root.right
    root.right = temp

# Function to convert a given binary tree into its mirror
def convertToMirror(root):

    # base case: if the tree is empty
    if root is None:
        return

    # convert left subtree
    convertToMirror(root.left)

    # convert right subtree
    convertToMirror(root.right)

    # swap left subtree with right subtree
    swap(root)

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    convertToMirror(root)
    preorder(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Iterative version:

> [Invert Binary Tree – Iterative and Recursive Solution](https://techiedelight.com/invert-binary-tree-recursive-iterative/)

Also See:

> [Create a mirror of an m–ary tree](https://www.techiedelight.com/mirror-of-m-ary-tree/ "Create a mirror of an m–ary tree")

> [Convert binary tree to Left-child right-sibling binary tree](https://www.techiedelight.com/convert-normal-binary-tree-left-child-right-sibling-binary-tree/ "Convert binary tree to Left-child right-sibling binary tree")

> [In-place convert a binary tree to its sum tree](https://www.techiedelight.com/inplace-convert-a-tree-sum-tree/ "In-place convert a binary tree to its sum tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
