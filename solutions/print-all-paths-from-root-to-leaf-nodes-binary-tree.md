# Print all paths from the root to leaf nodes of a binary tree

> Source: https://www.techiedelight.com/print-all-paths-from-root-to-leaf-nodes-binary-tree/

Given a binary tree, write an efficient algorithm to print all paths from the root node to every leaf node in it.

For example, consider the following binary tree:

The binary tree has four root-to-leaf paths: 1 —> 2 —> 4 1 —> 2 —> 5 1 —> 3 —> 6 —> 8 1 —> 3 —> 7 —> 9

> 

The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store every encountered node in the current path from the root-to-leaf in a vector. If we encounter a leaf node, print all nodes present in the vector. Following is the C++, Java, and Python implementation of the idea:

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

// Recursive function to find paths from the root node to every leaf node
void printRootToLeafPaths(Node* node, vector<int> &path)
{
    // base case
    if (node == nullptr) {
        return;
    }

    // include the current node to the path
    path.push_back(node->data);

    // if a leaf node is found, print the path
    if (isLeaf(node))
    {
        for (int data: path) {
            cout << data << " ";
        }
        cout << endl;
    }

    // recur for the left and right subtree
    printRootToLeafPaths(node->left, path);
    printRootToLeafPaths(node->right, path);

    // backtrack: remove the current node after the left, and right subtree are done
    path.pop_back();
}

// The main function to print paths from the root node to every leaf node
void printRootToLeafPaths(Node* node)
{
    // vector to store root-to-leaf path
    vector<int> path;

    printRootToLeafPaths(node, path);
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
               /     \
              8       9
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);
    root->right->left->left = new Node(8);
    root->right->right->right = new Node(9);

    // print all root-to-leaf paths
    printRootToLeafPaths(root);

    return 0;
}
```

**Output:** 1 2 4 1 2 5 1 3 6 8 1 3 7 9

##

```java
import java.util.ArrayDeque;
import java.util.Deque;

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

    // Recursive function to find paths from the root node to every leaf node
    public static void printRootToLeafPaths(Node node, Deque<Integer> path)
    {
        // base case
        if (node == null) {
            return;
        }

        // include the current node to the path
        path.addLast(node.data);

        // if a leaf node is found, print the path
        if (isLeaf(node)) {
            System.out.println(path);
        }

        // recur for the left and right subtree
        printRootToLeafPaths(node.left, path);
        printRootToLeafPaths(node.right, path);

        // backtrack: remove the current node after the left, and right subtree are done
        path.removeLast();
    }

    // The main function to print paths from the root node to every leaf node
    public static void printRootToLeafPaths(Node node)
    {
        // list to store root-to-leaf path
        Deque<Integer> path = new ArrayDeque<>();
        printRootToLeafPaths(node, path);
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
                   /     \
                  8       9
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);
        root.right.left.left = new Node(8);
        root.right.right.right = new Node(9);

        // print all root-to-leaf paths
        printRootToLeafPaths(root);
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

# Recursive function to find paths from the root node to every leaf node
def printRootToLeafPaths(node, path):

    # base case
    if node is None:
        return

    # include the current node to the path
    path.append(node.data)

    # if a leaf node is found, print the path
    if isLeaf(node):
        print(list(path))

    # recur for the left and right subtree
    printRootToLeafPaths(node.left, path)
    printRootToLeafPaths(node.right, path)

    # backtrack: remove the current node after the left, and right subtree are done
    path.pop()

# The main function to print paths from the root node to every leaf node
def printRootToLeafPath(root):

    # list to store root-to-leaf path
    path = deque()
    printRootToLeafPaths(root, path)

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
               /     \
              8       9
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)
    root.right.left.left = Node(8)
    root.right.right.right = Node(9)

    # print all root-to-leaf paths
    printRootToLeafPath(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

The problem seems a bit difficult to solve without recursion. There is one workaround where we store the path from the root-to-leaf in a string as we traverse the tree iteratively and print the path whenever we encounter any leaf node. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
#include <string>
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

void printRootToleafPathIterative(Node* root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // create an empty stack to store a pair of tree nodes and
    // its path from the root node
    stack<pair<Node*, string>> stack;

    // push the root node
    stack.push(make_pair(root, ""));

    // loop till stack is empty
    while (!stack.empty())
    {
        // pop a node from the stack and push the data into the output stack
        pair<Node*, string> p = stack.top();
        stack.pop();

        // fetch current node
        Node* curr = p.first;
        string path = p.second;

        // add the current node to the existing path
        string delim = (path == "") ? "\n" : " —> ";
        path += (delim + to_string(curr->data));

        // print the path if the node is a leaf
        if (curr->left == nullptr && curr->right == nullptr) {
            cout << path;
        }

        // push the left and right child of the popped node into the stack
        if (curr->right) {
            stack.push(make_pair(curr->right, path));
        }

        if (curr->left) {
            stack.push(make_pair(curr->left, path));
        }
    }
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
           /     \
          8       9
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);
    root->right->left->left = new Node(8);
    root->right->right->right = new Node(9);

    printRootToleafPathIterative(root);

    return 0;
}
```

**Output:** 1 —> 2 —> 4 1 —> 2 —> 5 1 —> 3 —> 6 —> 8 1 —> 3 —> 7 —> 9

##

```java
import java.util.ArrayDeque;
import java.util.Deque;

// A class to store a binary tree node
class Node
{
    int data;
    Node left = null, right = null;

    Node(int data) {
        this.data = data;
    }
}

// A Pair class
class Pair<U, V>
{
    public final U first;       // first field of a pair
    public final V second;      // second field of a pair

    // Constructs a new Pair with specified values
    private Pair(U first, V second)
    {
        this.first = first;
        this.second = second;
    }

    // Factory method for creating a Typed Pair immutable instance
    public static <U, V> Pair <U, V> of(U a, V b)
    {
        // calls private constructor
        return new Pair<>(a, b);
    }
}

class Main
{
    public static void printRootToleafPathIterative(Node root)
    {
        // base case
        if (root == null) {
            return;
        }

        // create an empty stack to store a pair of tree nodes and
        // its path from the root node
        Deque<Pair<Node, String>> stack = new ArrayDeque<>();

        // push the root node
        stack.add(Pair.of(root, ""));

        // loop till stack is empty
        while (!stack.isEmpty())
        {
            // pop a node from the stack and push the data into the output stack
            Pair<Node, String> pair = stack.pollLast();

            // fetch current node
            Node curr = pair.first;
            String path = pair.second;

            // add the current node to the existing path
            String separator = (path.equals("")) ? "\n" : " —> ";
            path += (separator + curr.data);

            // print the path if the node is a leaf
            if (curr.left == null && curr.right == null) {
                System.out.print(path);
            }

            // push the left and right child of the popped node into the stack
            if (curr.right != null) {
                stack.add(Pair.of(curr.right, path));
            }

            if (curr.left != null) {
                stack.add(Pair.of(curr.left, path));
            }
        }
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
                   /     \
                  8       9
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);
        root.right.left.left = new Node(8);
        root.right.right.right = new Node(9);

        printRootToleafPathIterative(root);
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

def printRootToLeafPathIterative(root):

    # base case
    if not root:
        return

    # create an empty stack to store a pair of tree nodes and
    # its path from the root node
    stack = deque()

    # push the root node
    stack.append((root, ""))

    # loop till stack is empty
    while stack:

        # pop a node from the stack and push the data into the output stack
        curr, path = stack.pop()

        # add the current node to the existing path
        path += (" —> " if path else "\n") + str(curr.data)

        # print the path if the node is a leaf
        if curr.left is None and curr.right is None:
            print(path, end='')

        # push the left and right child of the popped node into the stack
        if curr.right:
            stack.append((curr.right, path))

        if curr.left:
            stack.append((curr.left, path))

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
               /     \
              8       9
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)
    root.right.left.left = Node(8)
    root.right.right.right = Node(9)

    printRootToLeafPathIterative(root)
```

**Exercise:**

1\. Write an iterative solution to the above problem.

2\. Modify the solution to print root-to-leaf paths having the sum of nodes equal to a given number.
