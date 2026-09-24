# Compute the maximum number of nodes at any level in a binary tree

> Source: https://www.techiedelight.com/find-maximum-width-given-binary-tree/

Given a binary tree, write an efficient algorithm to compute the maximum number of nodes in any level in the binary tree.

For example, the maximum number of nodes in any level in the binary tree below is 4.

> 

## 1\. Iterative Approach

In an iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. We can easily modify level order traversal to maintain the maximum number of nodes at the current level. Then the result is equal to the maximum number of nodes at any level in the tree.

This is demonstrated below in C++, Java, and Python:

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

// Function to find the maximum width of a binary tree using level order
// traversal of a given binary tree
void findMaxWidth(Node* root)
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

    // stores the maximum width
    int max = 0;

    // loop till queue is empty
    while (!queue.empty())
    {
        // calculate the total number of nodes at the current level.
        // This is equal to the width of the current level.
        int width = queue.size();

        // update maximum width if the total number of nodes at the current level
        // is more than the maximum width found so far
        if (max < width) {
            max = width;
        }

        // process every node of the current level and enqueue their
        // non-empty left and right child
        while (width--)
        {
            curr = queue.front();
            queue.pop_front();

            if (curr->left) {
                queue.push_back(curr->left);
            }

            if (curr->right) {
                queue.push_back(curr->right);
            }
        }
    }

    cout << "The Maximum width is " << max;
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

    findMaxWidth(root);

    return 0;
}
```

**Output:** The maximum width is 4

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
    // Function to find the maximum width of a binary tree using level order
    // traversal of a given binary tree
    public static void findMaxWidth(Node root)
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

        // stores the maximum width
        int max = 0;

        // loop till queue is empty
        while (!queue.isEmpty())
        {
            // calculate the total number of nodes at the current level.
            // This is equal to the width of the current level.
            int width = queue.size();

            // update maximum width if the total number of nodes at the current level
            // is more than the maximum width found so far
            if (max < width) {
                max = width;
            }

            // process every node of the current level and enqueue their
            // non-empty left and right child
            while (width-- > 0)
            {
                curr = queue.poll();

                if (curr.left != null) {
                    queue.add(curr.left);
                }

                if (curr.right != null) {
                    queue.add(curr.right);
                }
            }
        }

        System.out.println("The maximum width is " + max);
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

        findMaxWidth(root);
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

# Function to find the maximum width of a binary tree using level order
# traversal of a given binary tree
def findMaxWidth(root):

    # return if the tree is empty
    if not root:
        return

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    # stores the maximum width
    max = 0

    # loop till queue is empty
    while queue:

        # calculate the total number of nodes at the current level.
        # This is equal to the width of the current level.
        width = len(queue)

        # update maximum width if the total number of nodes at the current level
        # is more than the maximum width found so far
        if max < width:
            max = width

        # process every node of the current level and enqueue their
        # non-empty left and right child
        while width > 0:
            width = width - 1
            curr = queue.popleft()

            if curr.left:
                queue.append(curr.left)

            if curr.right:
                queue.append(curr.right)

    print('The maximum width is', max)

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)

    findMaxWidth(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for the queue.

## 2\. Recursive Approach

We can also solve this problem recursively by using [hashing](https://techiedelight.com/hashing-in-data-structure/). We traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store the count of nodes present in each level in a map. Finally, traverse the map and return the maximum value found.

Please note that we can also traverse the tree in an [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) or [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/). The implementation can be seen below in C++, Java, and Python:

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

// Traverse the tree in a preorder fashion and store the count of nodes
// in each level
void preorder(Node* root, int level, auto &map)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // increment count of nodes at the current level
    map[level]++;

    // recur for the left and right subtree by increasing the level by 1
    preorder(root->left, level + 1, map);
    preorder(root->right, level + 1, map);
}

// Recursive function to find the maximum width of a binary tree
void findMaxWidth(Node* root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // create an empty map to store the count of nodes in each level
    unordered_map<int, int> map;

    // traverse the tree and fill the map
    preorder(root, 1, map);

    // stores the maximum width
    int result = 0;

    // iterate through the map and update maximum width
    for (auto it: map) {
        result = max(result, it.second);
    }

    cout << "The Maximum width is " << result;
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

    findMaxWidth(root);

    return 0;
}
```

**Output:** The maximum width is 4

##

```java
import java.util.Comparator;
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
    // Traverse the tree in a preorder fashion and store the count of nodes
    // in each level
    public static void preorder(Node root, int level, Map<Integer, Integer> map)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }

        // increment count of nodes at the current level
        map.put(level, map.getOrDefault(level, 0) + 1);

        // recur for the left and right subtree by increasing the level by 1
        preorder(root.left, level + 1, map);
        preorder(root.right, level + 1, map);
    }

    // Recursive function to find the maximum width of a binary tree
    public static void findMaxWidth(Node root)
    {
        // base case
        if (root == null) {
            return;
        }

        // create an empty map to store the count of nodes in each level
        Map<Integer, Integer> map = new HashMap<>();

        // traverse the tree and fill the map
        preorder(root, 1, map);

        // iterate through the map and find maximum width
        int maxWidth = map.values().stream().max(Comparator.naturalOrder()).get();
        System.out.println("The maximum width is " + maxWidth);
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

        findMaxWidth(root);
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

# Traverse the tree in a preorder fashion and store the count of nodes
# in each level
def preorder(root, level, dict):

    # base case: empty tree
    if not root:
        return

    # increment count of nodes at the current level
    dict[level] = dict.get(level, 0) + 1

    # recur for the left and right subtree by increasing the level by 1
    preorder(root.left, level + 1, dict)
    preorder(root.right, level + 1, dict)

# Recursive function to find the maximum width of a binary tree
def findMaxWidth(root):

    # base case
    if not root:
        return 0

    # create an empty dictionary to store the count of nodes in each level
    dict = {}

    # traverse the tree and fill the dictionary
    preorder(root, 1, dict)

    # iterate through the dictionary and find maximum width
    print('The maximum width is', max(dict.values()))

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)

    findMaxWidth(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.
