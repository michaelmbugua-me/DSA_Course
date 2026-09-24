# Efficiently print all nodes between two given levels in a binary tree

> Source: https://www.techiedelight.com/print-nodes-between-two-levels-binary-tree/

Given a binary tree, efficiently print all nodes in it between two given levels. The nodes for any level should be printed from left and right.

For example, if the starting level is 2 and the ending level is 3, the solution should print nodes in order `[2, 3, 4, 5, 6, 7]`.

> 

A simple solution would be to print all nodes of given levels one by one. We can print all nodes present in a level by modifying the [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) of the tree. The time complexity of this solution is O(n2), where `n` is the total number of nodes in the binary tree.

We can reduce the time complexity to O(n) by modifying the [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/). Following is a pseudocode for a modified level order traversal, which maintains the level of each node:

**levelorder(root, start, end)** q —> empty queue q.enqueue(root) level —> 0 while (not q.isEmpty()) size —> q.size() level = level + 1 while (size) node —> q.dequeue() if (level between start and end) print(node) if (node.left <> null) q.enqueue(node.left) if (node.right <> null) q.enqueue(node.right) size = size – 1

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

// Iterative function to print all nodes between two given
// levels in a binary tree
void printNodes(Node* root, int start, int end)
{
    if (root == nullptr) {
        return;
    }

    // create an empty queue and enqueue the root node
    list<Node*> queue;
    queue.push_back(root);

    // pointer to store the current node
    Node* curr = nullptr;

    // maintains the level of the current node
    int level = 0;

    // loop till queue is empty
    while (!queue.empty())
    {
        // increment level by 1
        level++;

        // calculate the total number of nodes at the current level
        int size = queue.size();

        // process every node of the current level and enqueue their
        // non-empty left and right child
        while (size--)
        {
            curr = queue.front();
            queue.pop_front();

            // print the node if its level is between given levels
            if (level >= start && level <= end) {
                cout << curr->key << " ";
            }

            if (curr->left) {
                queue.push_back(curr->left);
            }

            if (curr->right) {
                queue.push_back(curr->right);
            }
        }

        if (level >= start && level <= end) {
            cout << endl;
        }
    }
}

int main()
{
    Node* root = new Node(15);
    root->left = new Node(10);
    root->right = new Node(20);
    root->left->left = new Node(8);
    root->left->right = new Node(12);
    root->right->left = new Node(16);
    root->right->right = new Node(25);
    root->right->right->right = new Node(30);

    int start = 2, end = 3;
    printNodes(root, start, end);

    return 0;
}
```

**Output:** 10 20 8 12 16 25

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
    // Iterative function to print all nodes between two given
    // levels in a binary tree
    public static void printNodes(Node root, int start, int end)
    {
        if (root == null) {
            return;
        }

        // create an empty queue and enqueue the root node
        Queue<Node> queue = new ArrayDeque<>();
        queue.add(root);

        // to store the current node
        Node curr = null;

        // maintains the level of the current node
        int level = 0;

        // loop till queue is empty
        while (!queue.isEmpty())
        {
            // increment level by 1
            level++;

            // calculate the total number of nodes at the current level
            int size = queue.size();

            // process every node of the current level and enqueue their
            // non-empty left and right child
            while (size-- > 0)
            {
                curr = queue.poll();

                // print the node if its level is between given levels
                if (level >= start && level <= end) {
                    System.out.print(curr.key + " ");
                }

                if (curr.left != null) {
                    queue.add(curr.left);
                }

                if (curr.right != null) {
                    queue.add(curr.right);
                }
            }

            if (level >= start && level <= end) {
                System.out.println();
            }
        }
    }

    public static void main(String[] args)
    {
        Node root = new Node(15);
        root.left = new Node(10);
        root.right = new Node(20);
        root.left.left = new Node(8);
        root.left.right = new Node(12);
        root.right.left = new Node(16);
        root.right.right = new Node(25);
        root.right.right.right = new Node(30);

        int start = 2, end = 3;
        printNodes(root, start, end);
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

# Iterative function to print all nodes between two given
# levels in a binary tree
def printNodes(root, start, end):

    if root is None:
        return

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    # maintains the level of the current node
    level = 0

    # loop till queue is empty
    while queue:

        # increment level by 1
        level = level + 1

        # calculate the total number of nodes at the current level
        size = len(queue)

        # process every node of the current level and enqueue their
        # non-empty left and right child
        while size > 0:
            size = size - 1
            curr = queue.popleft()

            # print the node if its level is between given levels
            if start <= level <= end:
                print(curr.key, end=' ')

            if curr.left:
                queue.append(curr.left)

            if curr.right:
                queue.append(curr.right)

        if start <= level <= end:
            print()

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)
    root.right.right.right = Node(30)

    start = 2
    end = 3

    printNodes(root, start, end)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store every node and its level in a [multimap](https://techiedelight.com/implement-multimap-java/) using the level number as a key. Finally, print all nodes corresponding to every level between given levels. Following is the C++, Java, and Python implementation of it:

```cpp
#include <iostream>
#include <vector>
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

// Traverse the tree in a preorder fashion and store nodes in a map
// corresponding to their level
void printNodes(Node* root, int start, int end, int level, auto &map)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // push the current node into the map corresponding to their level
    if (level >= start && level <= end) {
        map[level].push_back(root->key);
    }

    // recur for the left and right subtree by increasing the level by 1
    printNodes(root->left, start, end, level + 1, map);
    printNodes(root->right, start, end, level + 1, map);
}

// Recursive function to print all nodes between two given
// levels in a binary tree
void printNodes(Node* root, int start, int end)
{
    // create an empty map to store nodes between given levels
    unordered_map<int, vector<int>> map;

    // traverse the tree and insert its nodes into the map
    // corresponding to their level
    printNodes(root, start, end, 1, map);

    // iterate through the map and print all nodes between given levels
    for (int i = start; i <= end; i++)
    {
        if (map[i].size() > 0) {
            cout << "Level " << i << ": ";
            for (int j: map[i]) {
                cout << j << " ";
            }
        }
        cout << endl;
    }
}

int main()
{
    Node* root = new Node(15);
    root->left = new Node(10);
    root->right = new Node(20);
    root->left->left = new Node(8);
    root->left->right = new Node(12);
    root->right->left = new Node(16);
    root->right->right = new Node(25);
    root->right->right->right = new Node(30);

    int start = 2, end = 3;
    printNodes(root, start, end);

    return 0;
}
```

**Output:** Level 2: 10 20 Level 3: 8 12 16 25

##

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
    // Traverse the tree in a preorder fashion and store nodes in a map
    // corresponding to their level
    public static void printNodes(Node root, int start, int end, int level,
                                  Map<Integer, List<Integer>> map)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }

        // push the current node into the map corresponding to their level
        if (level >= start && level <= end)
        {
            map.putIfAbsent(level, new ArrayList<>());
            map.get(level).add(root.key);
        }

        // recur for the left and right subtree by increasing the level by 1
        printNodes(root.left, start, end, level + 1, map);
        printNodes(root.right, start, end, level + 1, map);
    }

    // Recursive function to print all nodes between two given
    // levels in a binary tree
    public static void printNodes(Node root, int start, int end)
    {
        // create an empty map to store nodes between given levels
        Map<Integer, List<Integer>> map = new HashMap<>();

        // traverse the tree and insert its nodes into the map
        // corresponding to their level
        printNodes(root, start, end, 1, map);

        // iterate through the map and print all nodes between given levels
        for (int i = start; i <= end; i++) {
            if (map.containsKey(i)) {
                System.out.println("Level " + i + ": " + map.get(i));
            }
        }
    }

    public static void main(String[] args)
    {
        Node root = new Node(15);
        root.left = new Node(10);
        root.right = new Node(20);
        root.left.left = new Node(8);
        root.left.right = new Node(12);
        root.right.left = new Node(16);
        root.right.right = new Node(25);
        root.right.right.right = new Node(30);

        int start = 2, end = 3;
        printNodes(root, start, end);
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

# Traverse the tree in a preorder fashion and store nodes in a dictionary
# corresponding to their level
def findNodes(root, start, end, level, d):

    # base case: empty tree
    if root is None:
        return

    # push the current node into the dictionary corresponding to their level
    if start <= level <= end:
        d.setdefault(level, []).append(root.key)

    # recur for the left and right subtree by increasing the level by 1
    findNodes(root.left, start, end, level + 1, d)
    findNodes(root.right, start, end, level + 1, d)

# Recursive function to print all nodes between two given
# levels in a binary tree
def printNodes(root, start, end):

    # create an empty dictionary to store nodes between given levels
    d = {}

    # traverse the tree and insert its nodes into the dictionary
    # corresponding to their level
    findNodes(root, start, end, 1, d)

    # iterate through the dictionary and print all nodes between given levels
    for i in range(start, end + 1):
        if i in d:
            print(f'Level {i}: {d[i]}')

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)
    root.right.right.right = Node(30)

    start = 2
    end = 3

    printNodes(root, start, end)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.
