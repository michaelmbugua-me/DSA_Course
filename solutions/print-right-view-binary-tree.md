# Print right view of a binary tree

> Source: https://www.techiedelight.com/print-right-view-binary-tree/

Given a binary tree, write an efficient algorithm to print its right view.

For example, the right view of the following binary tree is `1, 3, 6, 8`:

> 

## 1\. Iterative Implementation using Queue

In an iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. The idea is to modify level order traversal to maintain nodes at the current level. Then if the current node is the last node of the current level, print it.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <list>
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

// Iterative function to print the right view of a given binary tree
void printRightView(Node* root)
{
    // return if the tree is empty
    if (root == nullptr) {
        return;
    }

    // create an empty queue and enqueue the root node
    list<Node*> queue;
    queue.push_back(root);

    // pointer to store the current node
    Node* curr = nullptr;

    // loop till queue is empty
    while (!queue.empty())
    {
        // calculate the total number of nodes at the current level
        int size = queue.size();
        int i = 0;

        // process every node of the current level and enqueue their
        // non-empty right and right child
        while (i++ < size)
        {
            curr = queue.front();
            queue.pop_front();

            // if this is the last node of the current level, print it
            if (i == size) {
                cout << curr->key << " ";
            }

            if (curr->left) {
                queue.push_back(curr->left);
            }

            if (curr->right) {
                queue.push_back(curr->right);
            }
        }
    }
}

int main()
{
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->right = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    printRightView(root);

    return 0;
}
```

**Output:** 1 3 6 8

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

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
    // Iterative function to print the right view of a given binary tree
    public static void printRightView(Node root)
    {
        // return if the tree is empty
        if (root == null) {
            return;
        }

        // create an empty queue and enqueue the root node
        Queue<Node> queue = new ArrayDeque<>();
        queue.add(root);

        // to store the current node
        Node curr = null;

        // loop till queue is empty
        while (!queue.isEmpty())
        {
            // calculate the total number of nodes at the current level
            int size = queue.size();
            int i = 0;

            // process every node of the current level and enqueue their
            // non-empty right and right child
            while (i++ < size)
            {
                curr = queue.poll();

                // if this is the last node of the current level, print it
                if (i == size) {
                    System.out.print(curr.key + " ");
                }

                if (curr.left != null) {
                    queue.add(curr.left);
                }

                if (curr.right != null) {
                    queue.add(curr.right);
                }
            }
        }
    }

    public static void main(String[] args)
    {
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.right = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        printRightView(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, key=None, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Iterative function to print the right view of a given binary tree
def printRightView(root):

    # return if the tree is empty
    if root is None:
        return

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    # loop till queue is empty
    while queue:

        # calculate the total number of nodes at the current level
        size = len(queue)
        i = 0

        # process every node of the current level and enqueue their
        # non-empty right and right child
        while i < size:
            i = i + 1
            curr = queue.popleft()

            # if this is the last node of the current level, print it
            if i == size:
                print(curr.key, end=' ')

            if curr.left:
                queue.append(curr.left)

            if curr.right:
                queue.append(curr.right)

if __name__ == '__main__':

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.right = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    printRightView(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 2\. Recursive Implementation using Hashing

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and pass level information in [function arguments](https://techiedelight.com/difference-between-argument-parameter/#Argument). For every node encountered, insert the node and level information into the map. Finally, when all nodes are processed, traverse the map and print the right view.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <unordered_map>
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

// Traverse nodes in reverse preorder fashion
void printRightView(Node* root, int level, auto &map)
{
    if (root == nullptr) {
        return;
    }

    // insert the current node and level information into the map
    map[level] = root->key;

    // recur for the left subtree before the right subtree
    printRightView(root->left, level + 1, map);
    printRightView(root->right, level + 1, map);
}

// Function to print the right view of a given binary tree
int printRightView(Node* root)
{
    // create an empty map to store the last node for each level
    unordered_map<int, int> map;

    // traverse the tree and fill the map
    printRightView(root, 1, map);

    // iterate through the map and print the right view
    for (int i = 1; i <= map.size(); i++) {
        cout << map[i] << " ";
    }
}

int main()
{
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->right = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    printRightView(root);

    return 0;
}
```

**Output:** 1 3 6 8

##

```java
import java.util.HashMap;
import java.util.Map;

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
    // Traverse nodes in reverse preorder fashion
    public static void printRightView(Node root, int level, Map<Integer, Integer> map)
    {
        if (root == null) {
            return;
        }

        // insert the current node and level information into the map
        map.put(level, root.key);

        // recur for the left subtree before the right subtree
        printRightView(root.left, level + 1, map);
        printRightView(root.right, level + 1, map);
    }

    // Function to print the right view of a given binary tree
    public static void printRightView(Node root)
    {
        // create an empty map to store the last node for each level
        Map<Integer, Integer> map = new HashMap<>();

        // traverse the tree and fill the map
        printRightView(root, 1, map);

        // iterate through the map in sorted order of its keys and print the right view
        for (int i = 1; i <= map.size(); i++) {
            System.out.print(map.get(i) + " ");
        }
    }

    public static void main(String[] args)
    {
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.right = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        printRightView(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, key=None, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Traverse nodes in reverse preorder fashion
def printRightView(root, level, d):

    if root is None:
        return

    # insert the current node and level information into the dictionary
    d[level] = root.key
    # recur for the left subtree before the right subtree
    printRightView(root.left, level + 1, d)
    printRightView(root.right, level + 1, d)

# Function to print the right view of a given binary tree
def printRightViewTree(root):

    # create an empty dictionary to store the last node for each level
    d = {}

    # traverse the tree and fill the dictionary
    printRightView(root, 1, d)

    # iterate through the dictionary in sorted order of its keys and print
    # the right view
    print(list(d.values()))

if __name__ == '__main__':

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.right = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    printRightViewTree(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 3\. Recursive Implementation (using Preorder Traversal)

We can also solve this problem by using constant space and linear time. The idea is to traverse the tree in reverse preorder fashion (visit the right subtree before the left subtree) and maintain the maximum level visited so far. If the current level is more than the maximum level visited so far, then the current node is the last node of the current level, and we print it and update the last level to the current level.

Following is the C++, Java, and Python implementation of the idea:

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

// Recursive function to print the right view of a given binary tree
void printRightView(Node* root, int level, int &last_level)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // if the current node is the last node of the current level
    if (last_level < level)
    {
        // print the node's data
        cout << root->key << " ";

        // update the last level to the current level
        last_level = level;
    }

    // recur for the right and left subtree by increasing level by 1
    printRightView(root->right, level + 1, last_level);
    printRightView(root->left, level + 1, last_level);
}

// Function to print the right view of a given binary tree
void printRightView(Node* root)
{
    int last_level = 0;
    printRightView(root, 1, last_level);
}

int main()
{
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->right = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    printRightView(root);

    return 0;
}
```

**Output:** 1 3 6 8
