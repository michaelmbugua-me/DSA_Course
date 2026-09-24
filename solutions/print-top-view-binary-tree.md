# Print top view of a binary tree

> Source: https://www.techiedelight.com/print-top-view-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, print the top view of it. Assume the left and right child of a node makes a 45–degree angle with the parent.

For example, the top view of the following tree is `2, 1, 3, 6`:

> 

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to create an empty map where each key represents the relative horizontal distance of the node from the root node, and the value in the map maintains a pair containing the node’s value and its level number. Then perform [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree. Suppose the current node’s level is less than the maximum level seen so far for the same horizontal distance as the current node or current horizontal distance is seen for the first time. In that case, update the value and the level for the current horizontal distance in the map. For each node, recur for its left subtree by decreasing horizontal distance and increasing level by one, and recur for right subtree by increasing both level and horizontal distance by one.

The following figure shows the horizontal distance and level of each node in the above binary tree:

The final values in the map will be:

horizontal distance —> (node’s value, node’s level) -1 —> (2, 2) 0 —> (1, 1) 1 —> (3, 2) 2 —> (6, 3)

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <map>
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

// Recursive function to perform preorder traversal on the tree and fill the map.
// Here, the node has `dist` horizontal distance from the tree's root,
// and the level represents the node's level.
void printTop(Node* root, int dist, int level, auto &map)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // if the current level is less than the maximum level seen so far
    // for the same horizontal distance, or if the horizontal distance
    // is seen for the first time, update the map
    if (map.find(dist) == map.end() || level < map[dist].second)
    {
        // update value and level for current distance
        map[dist] = { root->key, level };
    }

    // recur for the left subtree by decreasing horizontal distance and
    // increasing level by 1
    printTop(root->left, dist - 1, level + 1, map);

    // recur for the right subtree by increasing both level and
    // horizontal distance by 1
    printTop(root->right, dist + 1, level + 1, map);
}

// Function to print the top view of a given binary tree
void printTop(Node* root)
{
    // create an empty map where
    // key —> relative horizontal distance of the node from the root node, and
    // value —> pair containing the node's value and its level
    map<int, pair<int, int>> map;

    // perform preorder traversal on the tree and fill the map
    printTop(root, 0, 0, map);

    // traverse the map and print the top view
    for (auto it: map) {
        cout << it.second.first << " ";
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

    printTop(root);

    return 0;
}
```

**Output:** 2 1 3 6

##

```java
import java.util.Map;
import java.util.TreeMap;

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
    // Recursive function to perform preorder traversal on the tree and fill the map.
    // Here, the node has `dist` horizontal distance from the tree's root,
    // and the level represents the node's level.
    public static void printTop(Node root, int dist, int level,
                                Map<Integer, Pair<Integer, Integer>> map)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }
        // if the current level is less than the maximum level seen so far
        // for the same horizontal distance, or if the horizontal distance
        // is seen for the first time, update the map
        if (!map.containsKey(dist) || level < map.get(dist).second)
        {
            // update value and level for current distance
            map.put(dist, Pair.of(root.key, level));
        }

        // recur for the left subtree by decreasing horizontal distance and
        // increasing level by 1
        printTop(root.left, dist - 1, level + 1, map);

        // recur for the right subtree by increasing both level and
        // horizontal distance by 1
        printTop(root.right, dist + 1, level + 1, map);
    }

    // Function to print the top view of a given binary tree
    public static void printTop(Node root)
    {
        // create a `TreeMap` where
        // key —> relative horizontal distance of the node from the root node, and
        // value —> pair containing the node's value and its level
        Map<Integer, Pair<Integer, Integer>> map = new TreeMap<>();

        // perform preorder traversal on the tree and fill the map
        printTop(root, 0, 0, map);

        // traverse the `TreeMap` and print the top view
        for (Pair<Integer, Integer> it: map.values()) {
            System.out.print(it.first + " ");
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

        printTop(root);
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

# Recursive function to perform preorder traversal on the tree and fill the dictionary.
# Here, the node has `dist` horizontal distance from the tree's root,
# and the level represents the node's level.
def printTop(root, dist, level, d):

    # base case: empty tree
    if root is None:
        return

    # if the current level is less than the maximum level seen so far
    # for the same horizontal distance, or if the horizontal distance
    # is seen for the first time, update the dictionary
    if dist not in d or level < d[dist][1]:
        # update value and level for current distance
        d[dist] = (root.key, level)

    # recur for the left subtree by decreasing horizontal distance and
    # increasing level by 1
    printTop(root.left, dist - 1, level + 1, d)

    # recur for the right subtree by increasing both level and
    # horizontal distance by 1
    printTop(root.right, dist + 1, level + 1, d)

# Function to print the top view of a given binary tree
def printTopView(root):

    # create a dictionary where
    # key —> relative horizontal distance of the node from the root node, and
    # value —> pair containing the node's value and its level
    d = {}

    # perform preorder traversal on the tree and fill the dictionary
    printTop(root, 0, 0, d)

    # traverse the dictionary in sorted order of keys and print the top view
    for key in sorted(d.keys()):
        print(d.get(key)[0], end=' ')

if __name__ == '__main__':

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.right = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    printTopView(root)
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:**

1\. Reduce time complexity to linear using `std::unordered_map`/`HashMap`.

2\. Modify the solution to print the [bottom view of a binary tree](https://techiedelight.com/print-bottom-view-of-binary-tree/).

Also See:

> [Print bottom view of a binary tree](https://www.techiedelight.com/print-bottom-view-of-binary-tree/ "Print bottom view of a binary tree")

> [Perform vertical traversal of a binary tree](https://www.techiedelight.com/vertical-traversal-binary-tree/ "Perform vertical traversal of a binary tree")

> [Print right view of a binary tree](https://www.techiedelight.com/print-right-view-binary-tree/ "Print right view of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 171

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
