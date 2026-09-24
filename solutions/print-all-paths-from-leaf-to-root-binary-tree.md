# Print all paths from leaf to root node of a binary tree

> Source: https://www.techiedelight.com/print-all-paths-from-leaf-to-root-binary-tree/

Given a binary tree, write a recursive algorithm to print all paths from every leaf node to root node in the binary tree.

For example, consider the following binary tree:

There are five leaf-to-root paths in the above binary tree:

4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

> 

The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store every encountered node in the current path from the root-to-leaf in a list. If we encounter a leaf node, print all nodes present in the list in reverse order.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
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

// Print path present in the vector in reverse order (leaf to the root node)
void printPath(vector<int> const &path)
{
    for (int i = path.size() - 1; i > 0; i--) {
        cout << path.at(i) << " —> ";
    }

    cout << path.at(0) << endl;
}

// Recursive function to print all paths from leaf-to-root node
void printLeafToRootPaths(Node* node, vector<int> &path)
{
    // base case
    if (node == nullptr) {
        return;
    }

    // include the current node to the path
    path.push_back(node->data);

    // if a leaf node is found, print the path
    if (isLeaf(node)) {
        printPath(path);
    }

    // recur for the left and right subtree
    printLeafToRootPaths(node->left, path);
    printLeafToRootPaths(node->right, path);

    // backtrack: remove the current node after the left, and right subtree are done
    path.pop_back();
}

// The main function to print all paths from leaf-to-root node
void printLeafToRootPaths(Node* node)
{
    // vector to store leaf-to-root path
    vector<int> path;

    // call recursive function
    printLeafToRootPaths(node, path);
}

int main()
{
    /* Construct the following tree
               1
             /   \
            /     \
           /       \
          2         3
         / \       / \
        /   \     /   \
       4     5   6     7
                / \
               /   \
              8     9
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);
    root->right->left->left = new Node(8);
    root->right->left->right = new Node(9);

    // print all leaf-to-root paths
    printLeafToRootPaths(root);

    return 0;
}
```

**Output:** 4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

##

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Iterator;

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

    // Print path present in the list in reverse order (leaf to the root node)
    public static void printPath(Deque<Integer> path)
    {
        Iterator<Integer> itr = path.descendingIterator();
        while (itr.hasNext())
        {
            System.out.print(itr.next());

            if (itr.hasNext()) {
                System.out.print(" —> ");
            }
        }
        System.out.println();
    }

    // Recursive function to print all paths from leaf-to-root node
    public static void printLeafToRootPaths(Node node, Deque<Integer> path)
    {
        // base case
        if (node == null) {
            return;
        }

        // include the current node to the path
        path.addLast(node.data);

        // if a leaf node is found, print the path
        if (isLeaf(node)) {
            printPath(path);
        }

        // recur for the left and right subtree
        printLeafToRootPaths(node.left, path);
        printLeafToRootPaths(node.right, path);

        // backtrack: remove the current node after the left, and right subtree are done
        path.removeLast();
    }

    // The main function to print all paths from leaf-to-root node
    public static void printLeafToRootPaths(Node node)
    {
        // Deque to store leaf-to-root path
        Deque<Integer> path = new ArrayDeque<>();

        // call recursive function
        printLeafToRootPaths(node, path);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                   1
                 /   \
                /     \
               /       \
              2         3
             / \       / \
            /   \     /   \
           4     5   6     7
                    / \
                   /   \
                  8     9
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);
        root.right.left.left = new Node(8);
        root.right.left.right = new Node(9);

        // print all leaf-to-root paths
        printLeafToRootPaths(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to check if a given node is a leaf node or not
def isLeaf(node):
    return node.left is None and node.right is None

# Recursive function to print all paths from leaf-to-root node
def printLeafToRootPaths(node, path):

    # base case
    if node is None:
        return

    # include the current node to the path
    path.append(node.data)

    # if a leaf node is found, print the path present in the list
    # in reverse order (leaf to the root node)
    if isLeaf(node):
        print(list(reversed(path)))

    # recur for the left and right subtree
    printLeafToRootPaths(node.left, path)
    printLeafToRootPaths(node.right, path)

    # backtrack: remove the current node after the left, and right subtree are done
    path.pop()

# The main function to print all paths from leaf-to-root node
def findLeafToRootPaths(node):

    # Deque to store leaf-to-root path
    path = deque()

    # call recursive function
    printLeafToRootPaths(node, path)

if __name__ == '__main__':

    ''' Construct the following tree
               1
             /   \
            /     \
           /       \
          2         3
         / \       / \
        /   \     /   \
       4     5   6     7
                / \
               /   \
              8     9
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)
    root.right.left.left = Node(8)
    root.right.left.right = Node(9)

    # print all leaf-to-root paths
    findLeafToRootPaths(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

**Exercise:**

1\. Write an [iterative implementation](https://techiedelight.com/print-leaf-to-root-path-binary-tree/) of the above problem.

2\. Modify the solution to print leaf-to-root path, having the sum of nodes equal to a given number.

Also See:

> [Iteratively print the leaf to root path for every leaf node in a binary tree](https://www.techiedelight.com/print-leaf-to-root-path-binary-tree/ "Iteratively print the leaf to root path for every leaf node in a binary tree")

> [Print all paths from the root to leaf nodes of a binary tree](https://www.techiedelight.com/print-all-paths-from-root-to-leaf-nodes-binary-tree/ "Print all paths from the root to leaf nodes of a binary tree")

> [Find maximum sum root to leaf path in a binary tree](https://www.techiedelight.com/find-maximum-sum-root-to-leaf-path-binary-tree/ "Find maximum sum root to leaf path in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.92/5. Vote count: 167

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
