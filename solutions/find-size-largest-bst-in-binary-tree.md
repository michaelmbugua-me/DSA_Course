# Find the size of the largest BST in a binary tree

> Source: https://www.techiedelight.com/find-size-largest-bst-in-binary-tree/

Given a binary tree, find the size of the largest BST (Binary Search Tree) in it.

The largest BST in the following binary tree is formed by the subtree rooted at node 15, having size 3:

> 

A simple solution is to traverse the binary tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and for each encountered node, check whether the subtree rooted at the node is a BST or not. If the subtree is a BST, calculate and return the subtree’s size rooted at the node. Otherwise, return the maximum size BST returned by the left and right subtrees.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <climits>
using namespace std;

// Data structure to store a BST node
struct Node
{
    // stores value of this node
    int data;

    // stores left and right child pointer for this node
    Node *left, *right;

    // constructor
    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Recursive function to calculate the size of a given binary tree
int size(Node* root)
{
    // base case: empty tree has size 0
    if (root == nullptr) {
        return 0;
    }

    // recursively calculate the size of the left and right subtrees and
    // return the sum of their sizes + 1 (for root node)
    return size(root->left) + 1 + size(root->right);
}

// Recursive function to determine if a given binary tree is a BST or not
// by keeping a valid range (starting from [-INFINITY, INFINITY]) and
// keep shrinking it down for each node as we go down recursively
bool isBST(Node* node, int min, int max)
{
    // base case
    if (node == nullptr) {
        return true;
    }

    // if the node's value falls outside the valid range
    if (node->data < min || node->data > max) {
        return false;
    }

    // recursively check left and right subtrees with updated range
    return isBST(node->left, min, node->data) &&
        isBST(node->right, node->data, max);
}

// Recursive function to find the size of the largest BST in a given binary tree
int findLargestBST(Node* root)
{
    if (isBST(root, INT_MIN, INT_MAX)) {
        return size(root);
    }

    return max(findLargestBST(root->left), findLargestBST(root->right));
}

int main()
{
    /* Construct the following tree

              10
            /    \
           /      \
          15       8
         /  \     / \
        /    \   /   \
       12    20 5     2
    */

    Node* root = new Node(10);

    root->left = new Node(15);
    root->right = new Node(8);

    root->left->left = new Node(12);
    root->left->right = new Node(20);

    root->right->left = new Node(5);
    root->right->right = new Node(2);

    cout << "The size of the largest BST is " << findLargestBST(root);

    return 0;
}
```

**Output:** The size of the largest BST is 3

##

```java
// A class to store a BST node
class Node
{
    // stores value of this node
    int data;

    // stores left and right child for this node
    Node left, right;

    // constructor
    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Recursive function to calculate the size of a given binary tree
    public static int size(Node root)
    {
        // base case: empty tree has size 0
        if (root == null) {
            return 0;
        }

        // recursively calculate the size of the left and right subtrees and
        // return the sum of their sizes + 1 (for root node)
        return size(root.left) + 1 + size(root.right);
    }

    // Recursive function to determine if a given binary tree is a BST or not
    // by keeping a valid range (starting from [-INFINITY, INFINITY]) and
    // keep shrinking it down for each node as we go down recursively
    public static boolean isBST(Node node, int min, int max)
    {
        // base case
        if (node == null) {
            return true;
        }

        // if the node's value falls outside the valid range
        if (node.data < min || node.data > max) {
            return false;
        }

        // recursively check left and right subtrees with updated range
        return isBST(node.left, min, node.data) &&
            isBST(node.right, node.data, max);
    }

    // Recursive function to find the size of the largest BST in a given binary tree
    public static int findLargestBST(Node root)
    {
        if (isBST(root, Integer.MIN_VALUE, Integer.MAX_VALUE)) {
            return size(root);
        }

        return Math.max(findLargestBST(root.left), findLargestBST(root.right));
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  10
                /    \
               /      \
              15       8
             /  \     / \
            /    \   /   \
           12    20 5     2
        */

        Node root = new Node(10);

        root.left = new Node(15);
        root.right = new Node(8);

        root.left.left = new Node(12);
        root.left.right = new Node(20);

        root.right.left = new Node(5);
        root.right.right = new Node(2);

        System.out.println("The size of the largest BST is " + findLargestBST(root));
    }
}
```

##

```python3
import sys

# A class to store a BST node
class Node:
    # constructor
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to calculate the size of a given binary tree
def size(root):

    # base case: empty tree has size 0
    if root is None:
        return 0

    # recursively calculate the size of the left and right subtrees and
    # return the sum of their sizes + 1 (for root node)
    return size(root.left) + 1 + size(root.right)

# Recursive function to determine if a given binary tree is a BST or not
# by keeping a valid range (starting from [-INFINITY, INFINITY]) and
# keep shrinking it down for each node as we go down recursively
def isBST(node, min, max):

    # base case
    if node is None:
        return True

    # if the node's value falls outside the valid range
    if node.data < min or node.data > max:
        return False

    # recursively check left and right subtrees with updated range
    return isBST(node.left, min, node.data) and isBST(node.right, node.data, max)

# Recursive function to find the size of the largest BST in a given binary tree
def findLargestBST(root):

    if isBST(root, -sys.maxsize, sys.maxsize):
        return size(root)

    return max(findLargestBST(root.left), findLargestBST(root.right))

if __name__ == '__main__':

    ''' Construct the following tree
              10
            /    \
           /      \
          15       8
         /  \     / \
        /    \   /   \
       12    20 5     2
    '''

    root = Node(10)

    root.left = Node(15)
    root.right = Node(8)

    root.left.left = Node(12)
    root.left.right = Node(20)

    root.right.left = Node(5)
    root.right.right = Node(2)

    print('The size of the largest BST is', findLargestBST(root))
```

The time complexity of this approach is O(n2), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack. We can improve time complexity to O(n) by traversing the tree in a bottom-up manner where information is exchanged between the child nodes and parent node, which helps determine if the subtree rooted under any node is a BST in constant time.

We know that a binary tree is a BST if the following properties hold for every tree node:

  1. The left and right subtrees of every tree node are BST.
  2. A node’s value should be more than the largest value in the left subtree and less than the smallest value in the right subtree.

To determine if a subtree rooted under a node is a BST or not, the left subtree should provide information about the maximum value in it. The right subtree should provide information about the minimum value in it. Also, the parent node should be notified when both left and right child are also BST.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <climits>
using namespace std;

// Data structure to store a BST node
struct Node
{
    // stores value of this node
    int data;

    // stores left and right child pointer for this node
    Node *left, *right;

    // constructor
    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Data structure to store information about a binary tree
struct SubTreeInfo
{
    // stores the minimum and the maximum value in the binary tree rooted under the
    // current node. They are relevant only if the `isBST` flag is true
    int min, max;

    // stores size of the largest BST in the binary tree rooted under
    // the current node
    int size;

    // true if a binary tree rooted under the current node is a BST
    bool isBST;

    // constructor
    SubTreeInfo(int min, int max, int size, bool isBST)
    {
        this->min = min;
        this->max = max;
        this->size = size;
        this->isBST = isBST;
    }
};

// Recursive function to find the size of the largest BST in a given binary tree
SubTreeInfo* findLargestBST(Node* root)
{
    // Base case: empty tree
    if (root == nullptr) {
        return new SubTreeInfo(INT_MAX, INT_MIN, 0, true);
    }

    // Recur for the left and right subtrees
    SubTreeInfo* left = findLargestBST(root->left);
    SubTreeInfo* right = findLargestBST(root->right);

    SubTreeInfo* info = nullptr;

    // Check if a binary tree rooted under the current root is a BST

    // 1. Left and right subtree are also BST
    // 2. The value of the root node should be more than the largest value
    //    in the left subtree
    // 3. The value of the root node should be less than the smallest value
    //    in the right subtree
    if (left->isBST && right->isBST &&
        (root->data > left->max && root->data < right->min))
    {
        info = new SubTreeInfo(min(root->data, min(left->min, right->min)),
                        max(root->data, max(left->max, right->max)),
                        left->size + 1 + right->size,
                        true);
    }
    else {
        // If a binary tree rooted under the current root is not a BST,
        // return the largest BST size in its left and right subtree

        info = new SubTreeInfo(0, 0,
                        max(left->size, right->size),
                        false);
    }

    // deallocate the memory for the left and right subtrees info node
    delete(left), delete(right);

    return info;
}

int main()
{
    /* Construct the following binary tree
                  10
                /    \
               /      \
              15       8
             / \      / \
            /   \    /   \
           12   20  5     9
          / \      / \     \
         /   \    /   \     \
        2    14  4    7     10
    */

    Node* root = new Node(10);

    root->left = new Node(15);
    root->right = new Node(8);

    root->left->left = new Node(12);
    root->left->right = new Node(20);
    root->right->left = new Node(5);
    root->right->right = new Node(9);

    root->left->left->left = new Node(2);
    root->left->left->right = new Node(14);
    root->right->left->left = new Node(4);
    root->right->left->right = new Node(7);

    root->right->right->right = new Node(10);

    cout << "The size of the largest BST is " << findLargestBST(root)->size;

    return 0;
}
```

**Output:** The size of the largest BST is 6

##

```java
// A class to store a BST node
class Node
{
    // stores value of this node
    int data;

    // stores left and right child for this node
    Node left, right;

    // constructor
    Node(int data)
    {
        this.data = data;
        this.left = this.right = null;
    }
}

// A class to store information about a binary tree
class SubTreeInfo
{
    // `min`, `max` stores the minimum and the maximum value in the binary tree rooted
    // under the current node. They are relevant only if the `isBST` flag is true.
    int min, max;

    // stores size of the largest BST in the binary tree rooted under the current node
    int size;

    // true if a binary tree rooted under the current node is a BST
    boolean isBST;

    // constructor
    SubTreeInfo(int min, int max, int size, boolean isBST)
    {
        this.min = min;
        this.max = max;
        this.size = size;
        this.isBST = isBST;
    }
}

class Main
{
    // Recursive function to find the size of the largest BST in a given binary tree
    public static SubTreeInfo findLargestBST(Node root)
    {
        // Base case: empty tree
        if (root == null) {
            return new SubTreeInfo(Integer.MAX_VALUE, Integer.MIN_VALUE, 0, true);
        }

        // Recur for the left and right subtrees
        SubTreeInfo left = findLargestBST(root.left);
        SubTreeInfo right = findLargestBST(root.right);

        SubTreeInfo info = null;

        // Check if a binary tree rooted under the current root is a BST

        // 1. Left and right subtree are also BST
        // 2. The value of the root node should be more than the largest value
        //    in the left subtree
        // 3. The value of the root node should be less than the smallest value
        //    in the right subtree
        if (left.isBST && right.isBST &&
            (root.data > left.max && root.data < right.min))
        {
            info = new SubTreeInfo(Math.min(root.data, Math.min(left.min, right.min)),
                                Math.max(root.data, Math.max(left.max, right.max)),
                                left.size + 1 + right.size,
                                true);
        }
        else {
            // If a binary tree rooted under the current root is not a BST,
            // return the largest BST size in its left and right subtree

            info = new SubTreeInfo(0, 0, Math.max(left.size, right.size), false);
        }

        return info;
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                      10
                    /    \
                   /      \
                  15       8
                 / \      / \
                /   \    /   \
               12   20  5     9
              / \      / \     \
             /   \    /   \     \
            2    14  4    7     10
        */

        Node root = new Node(10);

        root.left = new Node(15);
        root.right = new Node(8);

        root.left.left = new Node(12);
        root.left.right = new Node(20);
        root.right.left = new Node(5);
        root.right.right = new Node(9);

        root.left.left.left = new Node(2);
        root.left.left.right = new Node(14);
        root.right.left.left = new Node(4);
        root.right.left.right = new Node(7);

        root.right.right.right = new Node(10);

        System.out.println("The size of the largest BST is " +
                                findLargestBST(root).size);
    }
}
```

##

```python3
import sys

# A class to store a BST node
class Node:
    # constructor
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# A class to store information about a binary tree
class SubTreeInfo:

    # min, max: stores the minimum and the maximum value rooted under the current node
    # `min`, `max` fields are relevant only if `isBST` flag is true
    # size: stores size of the largest BST rooted under the current node
    # isBST: true if the binary tree rooted under the current node is a BST

    def __init__(self, min, max, size, isBST):
        self.min = min
        self.max = max
        self.size = size
        self.isBST = isBST

# Recursive function to find the size of the largest BST in a given binary tree
def findLargestBST(root):

    # Base case: empty tree
    if root is None:
        return SubTreeInfo(sys.maxsize, -sys.maxsize, 0, True)

    # Recur for the left and right subtrees
    left = findLargestBST(root.left)
    right = findLargestBST(root.right)

    # Check if a binary tree rooted under the current root is a BST

    # 1. Left and right subtree are also BST
    # 2. The value of the root node should be more than the largest value
    #    in the left subtree
    # 3. The value of the root node should be less than the smallest value
    #    in the right subtree
    if left.isBST and right.isBST and (left.max < root.data < right.min):
        info = SubTreeInfo(min(root.data, min(left.min, right.min)),
                        max(root.data, max(left.max, right.max)),
                        left.size + 1 + right.size, True)
    else:

        # If a binary tree rooted under the current root is not a BST,
        # return the largest BST size in its left and right subtree

        info = SubTreeInfo(0, 0, max(left.size, right.size), False)

    return info

if __name__ == '__main__':

    ''' Construct the following tree
                  10
                /    \
               /      \
              15       8
             / \      / \
            /   \    /   \
           12   20  5     9
          / \      / \     \
         /   \    /   \     \
        2    14  4    7     10
    '''

    root = Node(10)

    root.left = Node(15)
    root.right = Node(8)

    root.left.left = Node(12)
    root.left.right = Node(20)
    root.right.left = Node(5)
    root.right.right = Node(9)

    root.left.left.left = Node(2)
    root.left.left.right = Node(14)
    root.right.left.left = Node(4)
    root.right.left.right = Node(7)

    root.right.right.right = Node(10)

    print('The size of the largest BST is', findLargestBST(root).size)
```
