# Find the Lowest Common Ancestor (LCA) of two nodes in a binary tree

> Source: https://www.techiedelight.com/find-lowest-common-ancestor-lca-two-nodes-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree and two nodes, `x` and `y`, find the lowest common ancestor (LCA) of `x` and `y` in it. The solution should return null if either `x` or `y` is not the actual node in the tree.

The lowest common ancestor (LCA) of two nodes `x` and `y` in a binary tree is the lowest (i.e., deepest) node that has both `x` and `y` as descendants, where each node can be a descendant of itself (so if `x` is reachable from `w`, `w` is the LCA). In other words, the LCA of `x` and `y` is the shared ancestor of `x` and `y` that is located farthest from the root.

For example, consider the following binary tree. Let `x = 6` and `y = 7`. The common ancestors of nodes `x` and `y` are 1 and 3. Out of nodes 1 and 3, the LCA is 3 as it is farthest from the root.

> 

A simple solution would be to store the path from root to `x` and the path from the root to `y` in two auxiliary arrays. Then traverse both arrays simultaneously till the values in the arrays match. The last matched value will be the LCA. If the end of one array is reached, then the last seen value is LCA. The time complexity of this solution is O(n), where `n` is the total number of nodes in the binary tree. But the auxiliary space used by it is O(n) required for storing two arrays.

We can recursively find the lowest common ancestor of nodes `x` and `y` present in the binary tree. The trick is to find the node in a binary tree with one key present in its left subtree and the other key present in the right subtree. If any such node is present in the tree, then it is LCA; if `y` lies in the subtree rooted at node `x`, then `x` is the LCA; otherwise, if `x` lies in the subtree rooted at node `y`, then `y` is the LCA.

The algorithm can be implemented as follows in C++, Java, and Python:

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

// Function to check if a given node is present in a binary tree or not
bool isNodePresent(Node* root, Node* node)
{
    // base case
    if (root == nullptr) {
        return false;
    }

    // if the node is found, return true
    if (root == node) {
        return true;
    }

    // return true if a given node is found in the left or right subtree
    return isNodePresent(root->left, node) || isNodePresent(root->right, node);
}

// Function to find the lowest common ancestor of given nodes `x` and `y`, where
// both `x` and `y` are present in a binary tree.
// The function returns true if `x` or `y` is found in a subtree rooted at the root.
// `lca` —> stores `LCA(x, y)`, and it is passed by reference to the function
bool findLCA(Node* root, Node* &lca, Node* x, Node* y)
{
    // base case 1: return false if the tree is empty
    if (root == nullptr) {
        return false;
    }

    // base case 2: return true if either `x` or `y` is found
    if (root == x || root == y)
    {
        // set lca to the current node
        lca = root;
        return true;
    }

    // recursively check if `x` or `y` exists in the left subtree
    bool left = findLCA(root->left, lca, x, y);

    // recursively check if `x` or `y` exists in the right subtree
    bool right = findLCA(root->right, lca, x, y);

    // if `x` is found in one subtree and `y` is found in the other subtree,
    // update lca to the current node
    if (left && right) {
        lca = root;
    }

    // return true if `x` or `y` is found in either left or right subtree
    return left || right;
}

// Function to find the lowest common ancestor of nodes `x` and `y`
void findLCA(Node* root, Node* x, Node* y)
{
    // `lca` stores the lowest common ancestor
    Node* lca = nullptr;

    // call LCA procedure only if both `x` and `y` are present in the tree
    if (isNodePresent(root, y) && isNodePresent(root, x)) {
        findLCA(root, lca, x, y);
    }

    // if LCA exists, print it
    if (lca != nullptr) {
        cout << "LCA is " << lca->data << endl;
    }
    else {
        cout << "LCA does not exist\n";
    }
}

int main()
{
    /* Construct the following tree
          1
        /   \
       /     \
      2       3
       \     / \
        4   5   6
           / \
          7   8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->right = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    findLCA(root, root->right->left->left, root->right->right);
    findLCA(root, root->right->left->left, new Node(10));
    findLCA(root, root->right->left->left, root->right->left->left);
    findLCA(root, root->right->left->left, root->right->left);
    findLCA(root, root->left, root->right->left);

    return 0;
}
```

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
    // Wrapper over `Node` class
    static class NodeWrapper
    {
        public Node node;

        NodeWrapper(Node node) {
            this.node = node;
        }
    }

    // Function to check if a given node is present in a binary tree or not
    public static boolean isNodePresent(Node root, Node node)
    {
        // base case
        if (root == null) {
            return false;
        }

        // if the node is found, return true
        if (root == node) {
            return true;
        }

        // return true if a given node is found in the left or right subtree
        return isNodePresent(root.left, node) || isNodePresent(root.right, node);
    }

    // Function to find the lowest common ancestor of given nodes `x` and `y`, where
    // both `x` and `y` are present in the binary tree.
    // The function returns true if `x` or `y` is found in a subtree rooted at the root
    // `lca` —> stores `LCA(x, y)`
    public static boolean findLCA(Node root, NodeWrapper lca, Node x, Node y)
    {
        // base case 1: return false if the tree is empty
        if (root == null) {
            return false;
        }

        // base case 2: return true if either `x` or `y` is found
        if (root == x || root == y)
        {
            // set lca to the current node
            lca.node = root;
            return true;
        }

        // recursively check if `x` or `y` exists in the left subtree
        boolean left = findLCA(root.left, lca, x, y);

        // recursively check if `x` or `y` exists in the right subtree
        boolean right = findLCA(root.right, lca, x, y);

        // if `x` is found in one subtree and `y` is found in the other subtree,
        // update lca to the current node
        if (left && right) {
            lca.node = root;
        }

        // return true if `x` or `y` is found in either left or right subtree
        return left || right;
    }

    // Function to find the lowest common ancestor of nodes `x` and `y`
    public static void findLCA(Node root, Node x, Node y)
    {
        // `lca` stores the lowest common ancestor
        Node lca = null;

        // Wrap the `lca` node, so its reference can be changed inside the
        // `findLCA()` method
        NodeWrapper LCA = new NodeWrapper(lca);

        // call LCA procedure only if both `x` and `y` are present in the tree
        if (isNodePresent(root, y) && isNodePresent(root, x))
        {
            findLCA(root, LCA, x, y);
            lca = LCA.node;
        }

        // if LCA exists, print it
        if (lca != null) {
            System.out.println("LCA is " + lca.data);
        }
        else {
            System.out.println("LCA does not exist");
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
              1
            /   \
           /     \
          2       3
           \     / \
            4   5   6
               / \
              7   8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.right = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        findLCA(root, root.right.left.left, root.right.right);
        findLCA(root, root.right.left.left, new Node(10));
        findLCA(root, root.right.left.left, root.right.left.left);
        findLCA(root, root.right.left.left, root.right.left);
        findLCA(root, root.left, root.right.left);
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

# Function to check if a given node is present in a binary tree or not
def isNodePresent(root, node):

    # base case
    if root is None:
        return False

    # if the node is found, return true
    if root == node:
        return True

    # return true if a given node is found in the left or right subtree
    return isNodePresent(root.left, node) or isNodePresent(root.right, node)

# Function to find the lowest common ancestor of given nodes `x` and `y`, where
# both `x` and `y` are present in a binary tree.
# The function returns true if `x` or `y` is found in a subtree rooted at the root.
# `lca` —> stores `LCA(x, y)`
def findlca(root, lca, x, y):

    # base case 1: return false if the tree is empty
    if root is None:
        return False, lca

    # base case 2: return true if either `x` or `y` is found
    # with lca set to the current node
    if root == x or root == y:
        return True, root

    # recursively check if `x` or `y` exists in the left subtree
    left, lca = findlca(root.left, lca, x, y)

    # recursively check if `x` or `y` exists in the right subtree
    right, lca = findlca(root.right, lca, x, y)

    # if `x` is found in one subtree and `y` is found in the other subtree,
    # update lca to the current node
    if left and right:
        lca = root

    # return true if `x` or `y` is found in either left or right subtree
    return (left or right), lca

# Function to find the lowest common ancestor of nodes `x` and `y`
def findLCA(root, x, y):

    # `lca` stores the lowest common ancestor
    lca = None

    # call LCA procedure only if both `x` and `y` are present in the tree
    if isNodePresent(root, y) and isNodePresent(root, x):
        lca = findlca(root, lca, x, y)[1]

    # if LCA exists, print it
    if lca:
        print('LCA is', lca.data)
    else:
        print('LCA does not exist')

if __name__ == '__main__':

    ''' Construct the following tree
          1
        /   \
       /     \
      2       3
       \     / \
        4   5   6
           / \
          7   8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.right = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    findLCA(root, root.right.left.left, root.right.right)
    findLCA(root, root.right.left.left, Node(10))
    findLCA(root, root.right.left.left, root.right.left.left)
    findLCA(root, root.right.left.left, root.right.left)
    findLCA(root, root.left, root.right.left)
```

**Output:** LCA is 3 LCA does not exist LCA is 7 LCA is 5 LCA is 1

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

**References:** <https://en.wikipedia.org/wiki/Lowest_common_ancestor>

Also See:

> [Find distance between given pairs of nodes in a binary tree](https://www.techiedelight.com/distance-between-given-pairs-of-nodes-binary-tree/ "Find distance between given pairs of nodes in a binary tree")

> [Construct an ancestor matrix from a binary tree](https://www.techiedelight.com/construct-ancestor-matrix-from-binary-tree/ "Construct an ancestor matrix from a binary tree")

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 187

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
