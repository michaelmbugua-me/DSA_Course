# Iteratively print the leaf to root path for every leaf node in a binary tree

> Source: https://www.techiedelight.com/print-leaf-to-root-path-binary-tree/

Given a binary tree, write an iterative algorithm to print the leaf-to-root path for every leaf node. Use of recursion is prohibited.

For example, consider the following binary tree:

There are five leaf-to-root paths in the above binary tree:

4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

> 

Since use of recursion is not allowed, we can do [postorder iterative traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) of the tree and, while doing so, maintain a map that contains (child, parent) pair for every encountered node. Now, if a leaf node is encountered, we can easily print the leaf-to-root path using that map, as shown below in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
#include <unordered_map>
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

// Recursive function to print the root-to-leaf path for a given leaf
void printPathRecursive(Node* curr, unordered_map<Node*, Node*> map)
{
    // base case: `curr` is the root node (parent of the root node is null)
    if (curr == nullptr) {
        return;
    }

    // recursively call the parent node
    printPathRecursive(map[curr], map);
    cout << curr->data << (isLeaf(curr) ? "\n" : " —> ");
}

// Iterative function to print the leaf-to-root path for a given leaf.
// For printing root-to-leaf path, we can use `printPathRecursive()` or a stack
void printPathIterative(Node* leafNode, unordered_map<Node*, Node*> map)
{
    // start from the leaf node
    Node* curr = leafNode;

    // loop till the root node is reached and print each node in the path
    while (map[curr] != nullptr)
    {
        cout << curr->data << " —> ";
        curr = map[curr];
    }

    cout << curr->data << endl;
}

// Iterative function to print the leaf-to-root path for every leaf node
void postorderIterative(Node* root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // create an empty stack
    stack<Node*> s;

    // create an empty map to store (child, parent) pairs
    unordered_map<Node*, Node*> map;

    // parent of the root node is null
    map[root] = nullptr;

    // push the root node
    s.push(root);

    // loop till stack is empty
    while (!s.empty())
    {
        // pop the top node from the stack
        Node* curr = s.top();
        s.pop();

        // if a leaf node is found, print the path
        if (isLeaf(curr))
        {
            // print the leaf-to-root path for the current leaf
            printPathIterative(curr, map);

            // print root-to-leaf path for the current leaf
            // printPathRecursive(curr, map);
        }

        // Push the left and right child of the popped node into the stack.
        // Include the current node's left and right child on a map.
        if (curr->right)
        {
            s.push(curr->right);
            map[curr->right] = curr;
        }

        if (curr->left)
        {
            s.push(curr->left);
            map[curr->left] = curr;
        }
    }
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

    postorderIterative(root);

    return 0;
}
```

##

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

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

    // Recursive function to print the root-to-leaf path for a given leaf
    public static void printPathRecursive(Node curr, Map<Node, Node> map)
    {
        // base case: `curr` is the root node (parent of the root node is null)
        if (curr == null) {
            return;
        }

        // recursively call the parent node
        printPathRecursive(map.get(curr), map);
        System.out.print(curr.data + (isLeaf(curr) ? "\n" : " —> "));
    }

    // Iterative function to print the leaf-to-root path for a given leaf.
    // For printing root-to-leaf path, we can use `printPathRecursive()` or a stack
    public static void printPathIterative(Node leafNode, Map<Node, Node> map)
    {
        // start from the leaf node
        Node curr = leafNode;

        // loop till the root node is reached and print each node in the path
        while (map.get(curr) != null)
        {
            System.out.print(curr.data + " —> ");
            curr = map.get(curr);
        }

        System.out.println(curr.data);
    }

    // Iterative function to print the leaf-to-root path for every leaf node
    public static void postorderIterative(Node root)
    {
        // base case
        if (root == null) {
            return;
        }

        // create an empty stack
        Deque<Node> stack = new ArrayDeque<>();

        // create an empty map to store (child, parent) pairs
        Map<Node, Node> map = new HashMap<>();

        // parent of the root node is null
        map.put(root, null);

        // push the root node
        stack.add(root);

        // loop till stack is empty
        while (!stack.isEmpty())
        {
            // pop the top node from the stack
            Node curr = stack.pollLast();

            // if a leaf node is found, print the path
            if (isLeaf(curr))
            {
                // print the leaf-to-root path for the current leaf
                printPathIterative(curr, map);

                // print root-to-leaf path for the current leaf
                // printPathRecursive(curr, map);
            }

            // Push the left and right child of the popped node into the stack.
            // Include the current node's left and right child on a map.
            if (curr.right != null)
            {
                stack.add(curr.right);
                map.put(curr.right, curr);
            }

            if (curr.left != null)
            {
                stack.add(curr.left);
                map.put(curr.left, curr);
            }
        }
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

        postorderIterative(root);
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

# Recursive function to print the root-to-leaf path for a given leaf
def printPathRecursive(curr, d):

    # base case: `curr` is the root node (parent of the root node is None)
    if curr is None:
        return

    # recursively call the parent node
    printPathRecursive(d[curr], d)
    print(curr.data, end=' —> ')

# Iterative function to print the leaf-to-root path for a given leaf.
# For printing root-to-leaf path, we can use `printPathRecursive()` or a stack
def printPathIterative(leafNode, d):

    # start from the leaf node
    curr = leafNode

    # loop till the root node is reached and print each node in the path
    while d[curr]:
        print(curr.data, end=' —> ')
        curr = d[curr]

    print(curr.data)

# Iterative function to print the leaf-to-root path for every leaf node
def postorderIterative(root):

    # base case
    if not root:
        return

    # create an empty stack
    s = deque()

    # create an empty dictionary to store (child, parent) pairs
    d = {}

    # parent of the root node is None
    d[root] = None

    # push the root node
    s.append(root)

    # loop till stack is empty
    while s:

        # pop the top node from the stack
        curr = s.pop()

        # if a leaf node is found, print the path
        if isLeaf(curr):
            # print the leaf-to-root path for the current leaf
            printPathIterative(curr, d)

        # print root-to-leaf path for the current leaf
        # printPathRecursive(curr, d)

        # Push the left and right child of the popped node into the stack.
        # Include the current node's left and right child in a dictionary
        if curr.right:
            s.append(curr.right)
            d[curr.right] = curr

        if curr.left:
            s.append(curr.left)
            d[curr.left] = curr

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

    postorderIterative(root)
```

**Output:** 4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of nodes in the binary tree. The program requires O(n) extra space for the map. Unless we maintain a parent pointer in each tree node, the problem seems very difficult to solve without using any additional extra space apart from the stack.

One workaround doesn’t involve maintaining a parent pointer or the use of any additional extra space. We can store the path from the root-to-leaf in a string as we traverse the tree iteratively and print the path whenever we encounter any leaf node.

The algorithm can be implemented as follows in C++, Java, and Python:

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

// Function to check if a given node is a leaf node or not
bool isLeaf(Node* node) {
    return (node->left == nullptr && node->right == nullptr);
}

void printLeafToRootPaths(Node* root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // create an empty stack to store a pair of tree nodes and
    // its path from the root node
    stack<pair<Node*, string>> s;

    // push the root node
    s.push(make_pair(root, ""));

    // loop till stack is empty
    while (!s.empty())
    {
        // pop a node from the stack and push the data into the output stack
        pair<Node*, string> p = s.top();
        s.pop();

        // fetch current node
        Node* curr = p.first;
        string path = p.second;

        // add the current node to the existing path
        string delim = (path == "") ? "\n" : " —> ";
        string rootToNodePath = to_string(curr->data) + delim + path;

        // print the path if a leaf node is reached
        if (isLeaf(curr)) {
            cout << rootToNodePath;
        }

        // push the left and right child of the popped node into the stack.
        if (curr->right) {
            s.push(make_pair(curr->right, rootToNodePath));
        }

        if (curr->left) {
            s.push(make_pair(curr->left, rootToNodePath));
        }
    }
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

    printLeafToRootPaths(root);

    return 0;
}
```

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
    // Function to check if a given node is a leaf node or not
    public static boolean isLeaf(Node node) {
        return (node.left == null && node.right == null);
    }

    public static void printLeafToRootPaths(Node root)
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
            Pair<Node, String> p = stack.pollLast();

            // fetch current node
            Node curr = p.first;
            String path = p.second;

            // add the current node to the existing path
            String delim = (path.equals("")) ? "\n" : " —> ";
            String rootToNodePath = curr.data + delim + path;

            // print the path if a leaf node is reached
            if (isLeaf(curr)) {
                System.out.print(rootToNodePath);
            }

            // push the left and right child of the popped node into the stack.
            if (curr.right != null) {
                stack.add(Pair.of(curr.right, rootToNodePath));
            }

            if (curr.left != null) {
                stack.add(Pair.of(curr.left, rootToNodePath));
            }
        }
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

def printLeafToRootPaths(root):

    # base case
    if not root:
        return

    # create an empty stack to store a pair of tree nodes and
    # its path from the root node
    stack = deque()

    # push the root node
    stack.append((root, ''))

    # loop till stack is empty
    while stack:

        # pop a node from the stack and push the data into the output stack
        curr, path = stack.pop()

        # add the current node to the existing path
        delim = ' —> ' if path else '\n'
        rootToNodePath = str(curr.data) + delim + path

        # print the path if a leaf node is reached
        if isLeaf(curr):
            print(rootToNodePath, end='')

        # push the left and right child of the popped node into the stack.
        if curr.right:
            stack.append((curr.right, rootToNodePath))

        if curr.left:
            stack.append((curr.left, rootToNodePath))

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

    printLeafToRootPaths(root)
```

**Output:** 4 —> 2 —> 1 5 —> 2 —> 1 8 —> 6 —> 3 —> 1 9 —> 6 —> 3 —> 1 7 —> 3 —> 1

**Exercise:**

1\. Write a [recursive implementation](https://techiedelight.com/print-all-paths-from-root-to-leaf-nodes-binary-tree/) of the above problem.

2\. Modify the solution to print the leaf-to-root path, having the sum of nodes equal to a given number.
