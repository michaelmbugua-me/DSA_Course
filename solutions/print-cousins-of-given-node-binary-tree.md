# Print cousins of a given node in a binary tree

> Source: https://www.techiedelight.com/print-cousins-of-given-node-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, print all cousins of a given node. Two nodes of a binary tree are cousins of each other only if they have different parents, but they are at the same level.

For example, consider the following tree:

6, 7 are cousins of node 4 or 5 4, 5 are cousins of node 6 or 7

> 

The idea is to find the level of the given node in the binary tree by doing a [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on it. Once the level is found, print all nodes present in that level, which is not a sibling of the node or the node itself. Following is the implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int key;
    Node *left, *right;

    Node(int key)
    {
        this->key = key;
        this->left = this->right = nullptr;
    }
};

// Function to find the level of the given node `x`
void findLevel(Node* root, Node* x, int index, int &level)
{
    // return if the tree is empty or level is already found
    if (root == nullptr || level) {
        return;
    }

    // if the given node is found, update its level
    if (root == x) {
        level = index;
    }

    // recur for the left and right subtree
    findLevel(root->left, x, index + 1, level);
    findLevel(root->right, x, index + 1, level);
}

void printLevel(Node* root, Node* node, int level)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // print cousins
    if (level == 1)
    {
        cout << root->key << " ";
        return;
    }

    // recur for the left and right subtree if the given node
    // is not a child of the root
    if (!(root->left && root->left == node || root->right && root->right == node))
    {
        printLevel(root->left, node, level - 1);
        printLevel(root->right, node, level - 1);
    }
}

// Function to print all cousins of a given node
void printAllCousins(Node* root, Node* node)
{
    // base case
    if (root == nullptr || root == node) {
        return;
    }

    int level = 0;

    // find the level of the given node
    findLevel(root, node, 1, level);

    // print all cousins of a given node using its level number
    printLevel(root, node, level);
}

int main()
{
    /* Construct the following tree
             1
           /   \
          2     3
         / \   / \
        4   5 6   7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    printAllCousins(root, root->right->left);

    return 0;
}
```

**Output:** 4 5

##

```java
// A class to store a binary tree node
class Node
{
    int key;
    Node left = null, right = null;

    Node(int key) {
        this.key = key;
    }
}

class Main
{
    // Function to find the level of the given node `x`
    public static int findLevel(Node root, Node x, int index, int level)
    {
        // return if the tree is empty or level is already found
        if (root == null || level != 0) {
            return level;
        }

        // if the given node is found, update its level
        if (root == x) {
            level = index;
        }

        // recur for the left and right subtree
        level = findLevel(root.left, x, index + 1, level);
        level = findLevel(root.right, x, index + 1, level);

        return level;
    }

    public static void printLevel(Node root, Node node, int level)
    {
        // base case
        if (root == null) {
            return;
        }

        // print cousins
        if (level == 1)
        {
            System.out.print(root.key + " ");
            return;
        }

        // recur for the left and right subtree if the given node
        // is not a child of the root
        if (!(root.left != null && root.left == node ||
                root.right != null && root.right == node))
        {
            printLevel(root.left, node, level - 1);
            printLevel(root.right, node, level - 1);
        }
    }

    // Function to print all cousins of a given node
    public static void printAllCousins(Node root, Node node)
    {
        // base case
        if (root == null || root == node) {
            return;
        }

        // find the level of the given node
        int level = findLevel(root, node, 1, 0);

        // print all cousins of a given node using its level number
        printLevel(root, node, level);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                 1
               /   \
              2     3
             / \   / \
            4   5 6   7
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        printAllCousins(root, root.right.left);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Function to find the level of the given node `x`
def findLevel(root, x, index=1, level=0):

    # return if the tree is empty or level is already found
    if root is None or level != 0:
        return level

    # if the given node is found, update its level
    if root == x:
        level = index

    # recur for the left and right subtree
    level = findLevel(root.left, x, index + 1, level)
    level = findLevel(root.right, x, index + 1, level)

    return level

def printLevel(root, node, level):

    # base case
    if root is None:
        return

    # print cousins
    if level == 1:
        print(root.key, end=' ')
        return

    # recur for the left and right subtree if the given node
    # is not a child of the root
    if (not (root.left is not None and root.left == node or
            root.right is not None and root.right == node)):
        printLevel(root.left, node, level - 1)
        printLevel(root.right, node, level - 1)

# Function to print all cousins of a given node
def printAllCousins(root, node):

    # base case
    if not root or root == node:
        return

    # find the level of the given node
    level = findLevel(root, node)

    # print all cousins of the given node using its level number
    printLevel(root, node, level)

if __name__ == '__main__':

    ''' Construct the following tree
             1
           /   \
          2     3
         / \   / \
        4   5 6   7
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    printAllCousins(root, root.right.left)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Determine whether the given binary tree nodes are cousins of each other](https://www.techiedelight.com/determine-two-nodes-are-cousins/ "Determine whether the given binary tree nodes are cousins of each other")

> [Find distance between given pairs of nodes in a binary tree](https://www.techiedelight.com/distance-between-given-pairs-of-nodes-binary-tree/ "Find distance between given pairs of nodes in a binary tree")

> [Level order traversal of a binary tree](https://www.techiedelight.com/level-order-traversal-binary-tree/ "Level order traversal of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
