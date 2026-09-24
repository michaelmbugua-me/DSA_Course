# Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`

> Source: https://www.techiedelight.com/truncate-given-binary-tree-remove-nodes-lie-path-sum-less-k/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree and a number `k`, remove nodes from the tree which lie on a complete path having a sum less than `k`. A complete path in a binary tree is defined as a path from the root to a leaf. The sum of all nodes on that path is defined as the sum of that path.

A node can be part of multiple paths. So, we have to delete it only if all paths from it have a sum less than `k`. For example, consider the binary tree shown on the left below. Convert it into the binary tree shown on the right. Note that the deletion should be done in a bottom-up manner until the path has a root-to-leaf sum greater than or equal to `k`.

> 

The problem might look complex at first look, but its solution is simple. The idea is to traverse the tree in a [bottom-up fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and truncate the left and right subtree before processing its parent. Since we are doing a postorder traversal, the subtree rooted at the current node may be truncated, and the current node becomes a leaf node now. So, for each node, check

  * If the sum of nodes in the path from the root node to the current node is more than or equal to `k`, nothing needs to be done.
  * If it is a leaf node and its path from the root node has a sum less than `k`, remove it.

Following is the C++, Java, and Python implementation based on the above idea:

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

// Function to check if a given node is a leaf node or not
bool isLeaf(Node* node) {
    return (node->left == nullptr && node->right == nullptr);
}

// The main function to truncate a given binary tree to remove nodes
// that lie on a path having a sum less than `k`
void trunc(Node* &curr, int k, int target)
{
    // base case: empty tree
    if (curr == nullptr) {
        return;
    }

    // update sum of nodes in the path from the root node to the current node
    target = target + (curr->data);

    // Recursively truncate left and right subtrees
    trunc(curr->left, k, target);
    trunc(curr->right, k, target);

    // Since we are doing postorder traversal, the subtree rooted at the current
    // node may be already truncated, and the current node is a leaf

    // if the current node is a leaf node and its path from the root node has a sum
    // less than the required sum, remove it
    if (target < k && isLeaf(curr))
    {
        // free the memory allocated to the current node
        delete(curr);

        // set current node to null (node is passed by reference)
        curr = nullptr;
    }
};

// Function to truncate a given binary tree to remove nodes which lie on
// a path having sum less than `k`
void truncate(Node* &root, int k)
{
    int target = 0;
    trunc(root, k, target);
}

int main()
{
    /* Construct the following tree
             6
           /   \
          /     \
         3       8
               /   \
              /     \
             4       2
           /   \      \
          /     \      \
         1       7      3
    */

    Node* root = new Node(6);
    root->left = new Node(3);
    root->right = new Node(8);
    root->right->left = new Node(4);
    root->right->right = new Node(2);
    root->right->left->left = new Node(1);
    root->right->left->right = new Node(7);
    root->right->right->right = new Node(3);

    int k = 20;
    truncate(root, k);
    inorder(root);

    return 0;
}
```

**Output:** 6 4 7 8

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

    // Function to check if a given node is a leaf node or not
    public static boolean isLeaf(Node node) {
        return (node.left == null && node.right == null);
    }

    // The main function to truncate a given binary tree to remove nodes
    // that lie on a path having a sum less than `k`
    public static Node trunc(Node curr, int k, int target)
    {
        // base case: empty tree
        if (curr == null) {
            return null;
        }

        // update sum of nodes in the path from the root node to the current node
        target = target + (curr.data);

        // Recursively truncate left and right subtrees
        curr.left = trunc(curr.left, k, target);
        curr.right = trunc(curr.right, k, target);

        // Since we are doing postorder traversal, the subtree rooted at the current
        // node may be already truncated, and the current node is a leaf

        // if the current node is a leaf node and its path from the root node has a sum
        // less than the required sum, remove it
        if (target < k && isLeaf(curr))
        {
            // set the current node as null
            return null;
        }

        return curr;
    }

    // Function to truncate a given binary tree to remove nodes which lie on
    // a path having sum less than `k`
    public static Node truncate(Node root, int k)
    {
        int target = 0;
        return trunc(root, k, target);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  6
                /   \
               /     \
              3       8
                    /   \
                   /     \
                  4       2
                /   \      \
               /     \      \
              1       7      3
        */

        Node root = new Node(6);
        root.left = new Node(3);
        root.right = new Node(8);
        root.right.left = new Node(4);
        root.right.right = new Node(2);
        root.right.left.left = new Node(1);
        root.right.left.right = new Node(7);
        root.right.right.right = new Node(3);

        int k = 20;
        root = truncate(root, k);
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

# Function to perform inorder traversal on the tree
def inorder(root):
    if root is None:
        return

    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Function to check if a given node is a leaf node or not
def isLeaf(node):
    return node.left is None and node.right is None

# Function to truncate a given binary tree to remove nodes which lie on
# a path having sum less than `k`
def truncate(curr, k, target=0):

    # base case: empty tree
    if curr is None:
        return None

    # update sum of nodes in the path from the root node to the current node
    target = target + curr.data

    # Recursively truncate left and right subtrees
    curr.left = truncate(curr.left, k, target)
    curr.right = truncate(curr.right, k, target)

    # Since we are doing postorder traversal, the subtree rooted at the current
    # node may be already truncated, and the current node is a leaf

    # if the current node is a leaf node and its path from the root node has a sum
    # less than the required sum, remove it
    if target < k and isLeaf(curr):
        # set current node as None
        return None

    return curr

if __name__ == '__main__':

    ''' Construct the following tree
              6
            /   \
           /     \
          3       8
                /   \
               /     \
              4       2
            /   \      \
           /     \      \
          1       7      3
    '''

    root = Node(6)
    root.left = Node(3)
    root.right = Node(8)
    root.right.left = Node(4)
    root.right.right = Node(2)
    root.right.left.left = Node(1)
    root.right.left.right = Node(7)
    root.right.right.right = Node(3)

    k = 20
    root = truncate(root, k)
    inorder(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

> [Find maximum sum root to leaf path in a binary tree](https://www.techiedelight.com/find-maximum-sum-root-to-leaf-path-binary-tree/ "Find maximum sum root to leaf path in a binary tree")

> [Set next pointer to the inorder successor of all nodes in a binary tree](https://www.techiedelight.com/set-next-pointer-inorder-successor-binary-tree/ "Set next pointer to the inorder successor of all nodes in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 227

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
