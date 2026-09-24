# Find all nodes at a given distance from leaf nodes in a binary tree

> Source: https://www.techiedelight.com/find-all-nodes-at-given-distance-from-leaf-nodes-in-a-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to find all nodes present at a given distance from any leaf node. We need to find only those nodes that are present in the root-to-leaf path for that leaf.

For example, consider the following binary tree:

The nodes present at a distance of 1 from any leaf node are 10, 16, 20 The nodes present at a distance of 2 from any leaf node are 15, 20 The nodes present at a distance of 3 from any leaf node is 15

> 

The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and use a list to store the current node’s ancestors in the preorder traversal. If we encounter a leaf node, print the ancestor present at a given distance from it. To avoid printing duplicates, insert the nodes into a set and print it later.

Following is the implementation of the idea in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>
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

// Function to check if a given node is a leaf node or not
bool isLeaf(Node* node) {
    return (node->left == nullptr && node->right == nullptr);
}

// Recursive function to find all nodes at a given distance from leaf nodes
void leafNodeDistance(Node* node, vector<Node*> path,
                    unordered_set<Node*> &set, int dist)
{
    // base case: empty tree
    if (node == nullptr) {
        return;
    }

    // if a leaf node is found, insert the node at a distance `dist` from the
    // leaf node into the set
    if (isLeaf(node) && path.size() >= dist)
    {
        set.insert(path.at(path.size() - dist));
        return;
    }

    // include the current node in the current path
    path.push_back(node);

    // recur for the left and right subtree
    leafNodeDistance(node->left, path, set, dist);
    leafNodeDistance(node->right, path, set, dist);
}

// Find all distinct nodes at a given distance from leaf nodes
void leafNodeDistance(Node* node, int dist)
{
    // vector to store root-to-leaf path
    vector<Node*> path;

    // create an empty set to store distinct nodes at a given
    // distance from leaf nodes
    unordered_set<Node*> set;

    // find all nodes
    leafNodeDistance(node, path, set, dist);

    // print output
    for (Node* node: set) {
        cout << node->data << " ";
    }
}

int main()
{
    /* Construct the following tree
              15
            /    \
           /      \
          10       20
         / \      /  \
        8   12   16  25
                /
               18
    */

    Node* root = new Node(15);
    root->left = new Node(10);
    root->right = new Node(20);
    root->left->left = new Node(8);
    root->left->right = new Node(12);
    root->right->left = new Node(16);
    root->right->right = new Node(25);
    root->right->left->left = new Node(18);

    int dist = 1;
    leafNodeDistance(root, dist);

    return 0;
}
```

**Output:** 10 16 20

##

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    // Function to check if a given node is a leaf node or not
    public static boolean isLeaf(Node node) {
        return (node.left == null && node.right == null);
    }

    // Recursive function to find all nodes at a given distance from leaf nodes
    public static void leafNodeDistance(Node node, List<Node> path,
                                        Set<Node> set, int dist)
    {
        // base case: empty tree
        if (node == null) {
            return;
        }

        // if a leaf node is found, insert the node at a distance `dist` from the
        // leaf node into the set
        if (isLeaf(node) && path.size() >= dist)
        {
            set.add(path.get(path.size() - dist));
            return;
        }

        // include the current node in the current path
        path.add(node);

        // recur for the left and right subtree
        leafNodeDistance(node.left, path, set, dist);
        leafNodeDistance(node.right, path, set, dist);

        // remove the current node from the current path
        path.remove(node);
    }

    // Find all distinct nodes at a given distance from leaf nodes
    public static void leafNodeDistance(Node node, int dist)
    {
        // list to store root-to-leaf path
        List<Node> path = new ArrayList<>();

        // create an empty set to store distinct nodes at a given
        // distance from leaf nodes
        Set<Node> set = new HashSet<>();

        // find all nodes
        leafNodeDistance(node, path, set, dist);

        // print output
        for (Node e: set) {
            System.out.print(e.data + " ");
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  15
                /    \
               /      \
              10       20
             / \      /  \
            8   12   16  25
                    /
                   18
        */

        Node root = new Node(15);
        root.left = new Node(10);
        root.right = new Node(20);
        root.left.left = new Node(8);
        root.left.right = new Node(12);
        root.right.left = new Node(16);
        root.right.right = new Node(25);
        root.right.left.left = new Node(18);

        int dist = 1;
        leafNodeDistance(root, dist);
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

# Function to check if a given node is a leaf node or not
def isLeaf(node):
    return node.left is None and node.right is None

# Recursive function to find all nodes at a given distance from leaf nodes
def leafNodeDistance(node, path, set, dist):

    # base case: empty tree
    if node is None:
        return

    # if a leaf node is found, insert the node at a distance `dist` from the
    # leaf node into the set
    if isLeaf(node) and len(path) >= dist:
        set.add(path[-dist])
        return

    # include the current node in the current path
    path.append(node)

    # recur for the left and right subtree
    leafNodeDistance(node.left, path, set, dist)
    leafNodeDistance(node.right, path, set, dist)

    # remove the current node from the current path
    path.remove(node)

# Find all distinct nodes at a given distance from leaf nodes
def printLeafNodeDistance(node, dist):

    # list to store root-to-leaf path
    path = []

    # create an empty set to store distinct nodes at a given
    # distance from leaf nodes
    s = set()

    # find all nodes
    leafNodeDistance(node, path, s, dist)

    # print output
    print([e.data for e in s])

if __name__ == '__main__':

    ''' Construct the following tree
               15
             /    \
            /      \
          10       20
         / \      /  \
        8   12   16  25
                /
               18
    '''

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)
    root.right.left.left = Node(18)

    dist = 1
    printLeafNodeDistance(root, dist)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

Also See:

> [Print all paths from leaf to root node of a binary tree](https://www.techiedelight.com/print-all-paths-from-leaf-to-root-binary-tree/ "Print all paths from leaf to root node of a binary tree")

> [Find distance between given pairs of nodes in a binary tree](https://www.techiedelight.com/distance-between-given-pairs-of-nodes-binary-tree/ "Find distance between given pairs of nodes in a binary tree")

> [Print all paths from the root to leaf nodes of a binary tree](https://www.techiedelight.com/print-all-paths-from-root-to-leaf-nodes-binary-tree/ "Print all paths from the root to leaf nodes of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 154

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
