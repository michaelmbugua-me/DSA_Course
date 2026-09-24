# Perform vertical traversal of a binary tree

> Source: https://www.techiedelight.com/vertical-traversal-binary-tree/

Given a binary tree, perform vertical traversal on it. In a vertical traversal, nodes of a binary tree are processed in vertical order from left to right. Assume that the left and right child makes a 45–degree angle with the parent.

For example, a vertical traversal of the following binary tree is

2, 7 1, 5 3, 8 6

> 

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). This post provides an overview of some available alternatives to accomplish this using hashing.

## 1\. Using Preorder Traversal

The idea is to create an empty map where each key represents the relative horizontal distance of a node from the root node, and the value in the map maintains all nodes present at the same horizontal distance. Then perform a [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) of the tree, and update the map. For each node, recur for its left subtree by decreasing horizontal distance by 1 and recur for the right subtree by increasing horizontal distance by 1. For the above binary tree, the final values in the map will be:

(horizontal distance —> Nodes) -1 —> [2, 7] 0 —> [1, 5] 1 —> [3, 8] 2 —> [6]

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <map>
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

// Recursive function to perform preorder traversal on the tree and fill the map.
// Here, the node has `dist` horizontal distance from the tree's root
void printVertical(Node* node, int dist, auto &map)
{
    // base case: empty tree
    if (node == nullptr) {
        return;
    }

    // insert nodes present at a current horizontal distance into the map
    map.insert(make_pair(dist, node->data));

    // recur for the left subtree by decreasing horizontal distance by 1
    printVertical(node->left, dist - 1, map);

    // recur for the right subtree by increasing horizontal distance by 1
    printVertical(node->right, dist + 1, map);
}

// Function to perform vertical traversal on a given binary tree
void printVertical(Node* root)
{
    // create an empty map where
    // key —> relative horizontal distance of the node from the root node, and
    // value —> nodes present at the same horizontal distance
    multimap<int, int> map;

    /* We can also use `map<int, vector<int>>` instead of `multimap<int, int>` */

    // perform preorder traversal on the tree and fill the map
    printVertical(root, 0, map);

    // traverse the map and print the vertical nodes
    int temp = 0;
    for (auto it = map.begin(); it != map.end(); it++)
    {
        if (temp != it->first)
        {
            cout << endl;
            temp = it->first;
        }
        cout << it->second << " ";
    }
}

int main()
{
    /* Construct the following tree
            1
          /   \
         /     \
        2       3
              /   \
             /     \
            5       6
          /   \
         /     \
        7       8
              /   \
             /     \
            9      10
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);
    root->right->left->right->left = new Node(9);
    root->right->left->right->right = new Node(10);

    printVertical(root);

    return 0;
}
```

**Output:** 2 7 1 5 9 3 8 10 6

##

```java
import java.util.*;

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
    // Utility function to add an element to the list corresponding to the given
    // key in `Map<Integer, List<Integer>>`.
    public static void insertIntoMultiMap(Map<Integer, List<Integer>> map,
                                        Integer key, Integer value) {
        map.putIfAbsent(key, new ArrayList<>());
        map.get(key).add(value);
    }

    // Recursive function to perform preorder traversal on the tree and fill the map.
    // Here, the node has `dist` horizontal distance from the tree's root
    public static void printVertical(Node node, int dist,
                                    Map<Integer, List<Integer>> map)
    {
        // base case: empty tree
        if (node == null) {
            return;
        }

        // insert nodes present at a current horizontal distance into the map
        insertIntoMultiMap(map, dist, node.key);

        // recur for the left subtree by decreasing horizontal distance by 1
        printVertical(node.left, dist - 1, map);

        // recur for the right subtree by increasing horizontal distance by 1
        printVertical(node.right, dist + 1, map);
    }

    // Function to perform vertical traversal on a given binary tree
    public static void printVertical(Node root)
    {
        // create an empty `TreeMap` where
        // key —> relative horizontal distance of the node from the root node, and
        // value —> nodes present at the same horizontal distance
        Map<Integer, List<Integer>> map = new TreeMap<>();

        // perform preorder traversal on the tree and fill the map
        printVertical(root, 0, map);

        // traverse the `TreeMap` and print vertical nodes
        for (Collection<Integer> collection: map.values()) {
            System.out.println(collection);
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                1
              /   \
             /     \
            2       3
                  /   \
                 /     \
                5       6
              /   \
             /     \
            7       8
                  /   \
                 /     \
                9      10
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);
        root.right.left.right.left = new Node(9);
        root.right.left.right.right = new Node(10);

        printVertical(root);
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

# Recursive function to perform preorder traversal on the tree and fill the dictionary.
# Here, the node has `dist` horizontal distance from the tree's root
def printVertical(node, dist, d):

    # base case: empty tree
    if node is None:
        return

    # insert nodes present at a current horizontal distance into the dictionary
    d.setdefault(dist, []).append(node.key)

    # recur for the left subtree by decreasing horizontal distance by 1
    printVertical(node.left, dist - 1, d)

    # recur for the right subtree by increasing horizontal distance by 1
    printVertical(node.right, dist + 1, d)

# Function to perform vertical traversal on a given binary tree
def printVerticalTree(root):

    # create an empty dictionary where
    # key —> relative horizontal distance of the node from the root node, and
    # value —> nodes present at the same horizontal distance
    d = {}

    # perform preorder traversal on the tree and fill the dictionary
    printVertical(root, 0, d)

    # traverse the dictionary and print vertical nodes
    for value in d.values():
        print(value)

if __name__ == '__main__':

    ''' Construct the following tree
            1
          /   \
         /     \
        2       3
              /   \
             /     \
            5       6
          /   \
         /     \
        7       8
              /   \
             /     \
            9      10
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)
    root.right.left.right.left = Node(9)
    root.right.left.right.right = Node(10)

    printVerticalTree(root)
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

## 2\. Using Level Order Traversal

Since the above solution uses preorder traversal to traverse the tree, the nodes might not get processed in the same order as they appear in the binary tree from top to bottom. For instance, node 10 is printed before node 6 in the above solution.

We can perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) to ensure that nodes are processed in the same order as they appear in the binary tree. The idea remains the same as the previous approach – create an empty map whose each key represents the relative horizontal distance of a node from the root node, and the value in the map maintains all nodes present at the same horizontal distance. The only difference is that the binary tree is traversed using level order traversal instead of the preorder traversal.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <map>
#include <queue>
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

// Function to perform vertical traversal on a given binary tree
void printVertical(Node* root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // create a multimap to store the vertical order of binary tree nodes
    // map<int, vector<int>> can also be used replacing `multimap<int, int>`
    multimap<int, int> map;

    // create an empty queue for level order traversal.
    // `It` stores binary tree nodes and their horizontal distance from the root.
    queue<pair<Node*, int>> q;

    // enqueue root node with horizontal distance as 0
    q.push(make_pair(root, 0));

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node
        Node* node = q.front().first;
        int dist = q.front().second;
        q.pop();

        // insert front node value into the map using its horizontal distance
        // as the key
        map.insert(make_pair(dist, node->data));

        // enqueue non-empty left and right child of the front node
        // with their corresponding horizontal distance
        if (node->left) {
            q.push(make_pair(node->left, dist - 1));
        }

        if (node->right) {
            q.push(make_pair(node->right, dist + 1));
        }
    }

    // print the multimap
    int val = 0;
    for (auto it = map.begin(); it != map.end(); it++)
    {
        if (val != it->first)
        {
            cout << endl;
            val = it->first;
        }
        cout << it->second << " ";
    }
}

int main()
{
    /* Construct the following tree
            1
          /   \
         /     \
        2       3
              /   \
             /     \
            5       6
          /   \
         /     \
        7       8
              /   \
             /     \
            9      10
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);
    root->right->left->right->left = new Node(9);
    root->right->left->right->right = new Node(10);

    printVertical(root);

    return 0;
}
```

**Output:** 2 7 1 5 9 3 8 6 10

##

```java
import java.util.*;

// A class to store a binary tree node
class Node
{
    int key;
    Node left = null, right = null;

    Node(int key) {
        this.key = key;
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
    // Utility function to add an element to the list corresponding to the
    // given key in `Map<Integer, List<Integer>>`.
    public static void insertIntoMultiMap(Map<Integer, List<Integer>> map,
                                        Integer key, Integer value) {
        map.putIfAbsent(key, new ArrayList<>());
        map.get(key).add(value);
    }

    // Function to perform vertical traversal on a given binary tree
    public static void printVertical(Node root)
    {
        // base case
        if (root == null) {
            return;
        }

        // create a `TreeMap` to store the vertical order of binary tree nodes
        Map<Integer, List<Integer>> map = new TreeMap<>();

        // create an empty queue for level order traversal.
        // `It` stores binary tree nodes and their horizontal distance from the root.
        Queue<Pair<Node, Integer>> q = new ArrayDeque<>();

        // enqueue root node with horizontal distance as 0
        q.add(Pair.of(root, 0));

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node
            Node node = q.peek().first;
            int dist = q.peek().second;
            q.poll();

            // insert front node value into the map using its horizontal distance
            // as the key
            insertIntoMultiMap(map, dist, node.key);

            // enqueue non-empty left and right child of the front node
            // with their corresponding horizontal distance
            if (node.left != null) {
                q.add(Pair.of(node.left, dist - 1));
            }

            if (node.right != null) {
                q.add(Pair.of(node.right, dist + 1));
            }
        }

        // print the `TreeMap`
        map.values().stream().forEach(System.out::println);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                1
              /   \
             /     \
            2       3
                  /   \
                 /     \
                5       6
              /   \
             /     \
            7       8
                  /   \
                 /     \
                9      10
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);
        root.right.left.right.left = new Node(9);
        root.right.left.right.right = new Node(10);

        printVertical(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Function to perform vertical traversal on a given binary tree
def printVertical(root):

    # base case
    if root is None:
        return

    # create a dictionary to store the vertical order of binary tree nodes
    d = {}

    # create an empty queue for level order traversal.
    # `It` stores binary tree nodes and their horizontal distance from the root.
    q = deque()

    # enqueue root node with horizontal distance as 0
    q.append((root, 0))

    # loop till queue is empty
    while q:

        # dequeue front node
        node, dist = q.popleft()

        # insert front node value into the dictionary using its horizontal distance
        # as the key
        d.setdefault(dist, []).append(node.key)

        # enqueue non-empty left and right child of the front node
        # with their corresponding horizontal distance
        if node.left:
            q.append((node.left, dist - 1))

        if node.right:
            q.append((node.right, dist + 1))

    # print the dictionary
    for key in sorted(d.keys()):
        print(d.get(key))

if __name__ == '__main__':

    ''' Construct the following tree
            1
          /   \
         /     \
        2       3
              /   \
             /     \
            5       6
          /   \
         /     \
        7       8
              /   \
             /     \
            9      10
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)
    root.right.left.right.left = Node(9)
    root.right.left.right.right = Node(10)

    printVertical(root)
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

**Linear Time Solution:**

> [Print nodes of a binary tree in vertical order](https://techiedelight.com/print-nodes-binary-tree-vertical-order/)

**Exercise:** Reduce time complexity to linear using `std::unordered_map`/`HashMap`.
