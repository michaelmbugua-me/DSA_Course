# Print left view of a binary tree

> Source: https://www.techiedelight.com/print-left-view-of-binary-tree/

Given a binary tree, write an efficient algorithm to print its left view.

For example, the left view of the following binary tree is `1, 2, 4, 7`:

> 

## 1\. Iterative Implementation

In the iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. We can modify level order traversal to maintain nodes at the current level. Then if the current node is the first node of the current level, print it.

Following is the C++, Java, and Python program that demonstrates it:

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

// Iterative function to print the left view of a given binary tree
void leftView(Node* root)
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
        // non-empty left and right child
        while (i++ < size)
        {
            curr = queue.front();
            queue.pop_front();

            // if this is the first node of the current level, print it
            if (i == 1) {
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

    leftView(root);

    return 0;
}
```

**Output:** 1 2 4 7

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
    // Iterative function to print the left view of a given binary tree
    public static void leftView(Node root)
    {
        // return if the tree is empty
        if (root == null) {
            return;
        }

        // create an empty queue and enqueue the root node
        Queue<Node> queue = new ArrayDeque<>();
        queue.add(root);

        // to store the current node
        Node curr;

        // loop till queue is empty
        while (!queue.isEmpty())
        {
            // calculate the total number of nodes at the current level
            int size = queue.size();
            int i = 0;

            // process every node of the current level and enqueue their
            // non-empty left and right child
            while (i++ < size)
            {
                curr = queue.poll();

                // if this is the first node of the current level, print it
                if (i == 1) {
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

        leftView(root);
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

# Iterative function to print the left view of a given binary tree
def leftView(root):

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
        # non-empty left and right child
        while i < size:
            # pointer to store the current node
            curr = queue.popleft()
            i = i + 1

            # if this is the first node of the current level, print it
            if i == 1:
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

    leftView(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 2\. Recursive implementation using hashing

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and pass level information in [function arguments](https://techiedelight.com/difference-between-argument-parameter/#Argument). If the level is visited for the first time, insert the current node and level information into the map. Finally, when all nodes are processed, traverse the map and print the left view.

The algorithm can be implemented as follows in C++, Java, and Python:

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

// Recursive function to traverse the nodes in a preorder fashion
void leftView(Node* root, int level, auto &map)
{
    if (root == nullptr) {
        return;
    }

    // if the level is visited for the first time, insert the current node
    // and level information into the map
    if (map.find(level) == map.end()) {
        map[level] = root->key;
    }

    leftView(root->left, level + 1, map);
    leftView(root->right, level + 1, map);
}

// Function to print the left view of a given binary tree
int leftView(Node* root)
{
    // create an empty map to store the first node for each level
    unordered_map<int, int> map;

    // traverse the tree and fill the map
    leftView(root, 1, map);

    // iterate through the map and print left view
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

    leftView(root);

    return 0;
}
```

**Output:** 1 2 4 7

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
    // Recursive function to traverse the nodes in a preorder fashion
    public static void leftView(Node root, int level, Map<Integer, Integer> map)
    {
        // base case
        if (root == null) {
            return;
        }

        // if the level is visited for the first time, insert the current node
        // and level information into the map
        map.putIfAbsent(level, root.key);

        leftView(root.left, level + 1, map);
        leftView(root.right, level + 1, map);
    }

    // Function to print the left view of a given binary tree
    public static void leftView(Node root)
    {
        // create an empty HashMap to store the first node for each level
        Map<Integer, Integer> map = new HashMap<>();

        // traverse the tree and fill the map
        leftView(root, 1, map);

        // iterate through the HashMap in sorted order of its keys
        // and print the left view
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

        leftView(root);
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

# Recursive function to traverse the nodes in a preorder fashion
def leftView(root, level, d):

    # base case
    if root is None:
        return

    # if the level is visited for the first time, insert the current node
    # and level information into the dictionary
    if level not in d:
        d[level] = root.key

    leftView(root.left, level + 1, d)
    leftView(root.right, level + 1, d)

# Function to print the left view of a given binary tree
def printLeftView(root):

    # create an empty dictionary to store the first node for each level
    d = {}

    # traverse the tree and fill the dictionary
    leftView(root, 1, d)

    # iterate through the dictionary in sorted order of its keys
    # and print the left view
    for i in range(1, len(d) + 1):
        print(d[i], end=' ')

if __name__ == '__main__':

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.right = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    printLeftView(root)
```

We can also traverse nodes in reverse preorder fashion, as shown below:

```cpp
void leftView(Node* root, int level, auto &map)
{
    if (root == nullptr) {
        return;
    }

    // insert the current node and level information into the map
    map[level] = root->key;

    // recur for the right subtree before the left subtree
    leftView(root->right, level + 1, map);
    leftView(root->left, level + 1, map);
}
```
