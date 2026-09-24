# Reverse level order traversal of a binary tree

> Source: https://www.techiedelight.com/reverse-level-order-traversal-binary-tree/

Given a binary tree, print its nodes level by level in reverse order, i.e., print all nodes present at the last level first, followed by nodes of the second last level, and so on… Print nodes at any level from left to right.

For example, the reverse [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) for the following tree is `4, 5, 6, 7, 2, 3, 1`:

> 

A simple solution would be to print all nodes of level `h` first, followed by level `h-1`, until level 1, where `h` is the tree’s height. We can print all nodes present in a level by modifying the [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree. The time complexity of this solution is O(n2), where `n` is the total number of nodes in the binary tree.

We can reduce the time complexity to O(n) by using extra space. Following is a pseudocode for a simple [queue](https://techiedelight.com/circular-queue-implementation-c/)-based reverse level order traversal, which requires space proportional to the maximum number of nodes at a given depth. It can be as much as half of the total number of nodes.

**levelorder(root)** q —> empty queue s —> empty stack q.enqueue(root) while (not q.isEmpty()) node —> q.dequeue() s.push(node) if (node.right <> null) q.enqueue(node.right) if (node.left <> null) q.enqueue(node.left) while (not s.isEmpty()) node —> s.pop() print(node)

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <list>
#include <stack>
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

// Function to print reverse level order traversal of a given binary tree
void reverseLevelOrderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    // create an empty queue and enqueue the root node
    list<Node*> queue;
    queue.push_back(root);

    // create a stack to reverse level order nodes
    stack<int> stack;

    // pointer to store the current node
    Node* curr = nullptr;

    // loop till queue is empty
    while (queue.size())
    {
        // process each node in the queue and enqueue their children
        curr = queue.front();
        queue.pop_front();

        // push the current node into the stack
        stack.push(curr->key);

        // it is important to process the right node before the left node
        if (curr->right) {
            queue.push_back(curr->right);
        }

        if (curr->left) {
            queue.push_back(curr->left);
        }
    }

    // pop all nodes from the stack and print them
    while (!stack.empty())
    {
        cout << stack.top() << " ";
        stack.pop();
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

    reverseLevelOrderTraversal(root);

    return 0;
}
```

**Output:** 8 12 16 25 10 20 15

##

```java
import java.util.ArrayDeque;
import java.util.Deque;
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
    // Function to print reverse level order traversal of a given binary tree
    public static void reverseLevelOrderTraversal(Node root)
    {
        if (root == null) {
            return;
        }

        // create an empty queue and enqueue the root node
        Queue<Node> queue = new ArrayDeque<>();
        queue.add(root);

        // create a stack to reverse level order nodes
        Deque<Integer> stack = new ArrayDeque<>();

        // to store the current node
        Node curr;

        // loop till queue is empty
        while (!queue.isEmpty())
        {
            // process each node in the queue and enqueue their children
            curr = queue.poll();

            // push the current node into the stack
            stack.push(curr.key);

            // it is important to process the right node before the left node
            if (curr.right != null) {
                queue.add(curr.right);
            }

            if (curr.left != null) {
                queue.add(curr.left);
            }
        }

        // pop all nodes from the stack and print them
        while (!stack.isEmpty()) {
            System.out.print(stack.poll() + " ");
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

        reverseLevelOrderTraversal(root);
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

# Function to print reverse level order traversal of a given binary tree
def reverseLevelOrderTraversal(root):

    if root is None:
        return

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    # create a stack to reverse level order nodes
    stack = deque()

    # loop till queue is empty
    while queue:

        # process each node in the queue and enqueue their children
        curr = queue.popleft()

        # push the current node into the stack
        stack.append(curr.key)

        # it is important to process the right node before the left node
        if curr.right:
            queue.append(curr.right)

        if curr.left:
            queue.append(curr.left)

    # pop all nodes from the stack and print them
    while stack:
        print(stack.pop(), end=' ')

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)

    reverseLevelOrderTraversal(root)
```

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a preorder fashion and store every node and its level in a [multimap](https://techiedelight.com/implement-multimap-java/) using the level number as a key. Finally, print all nodes corresponding to every level starting from the last level. We can also traverse the tree in [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) or [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/).

Following is the implementation in C++, Java, and Python based on the above idea:

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
void preorder(Node* root, int level, auto &map)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // insert the current node and its level into the map
    map[level].push_back(root->key);

    // recur for the left and right subtree by increasing the level by 1
    preorder(root->left, level + 1, map);
    preorder(root->right, level + 1, map);
}

// Recursive function to perform reverse level order traversal on a binary tree
void levelOrderTraversal(Node* root)
{
    // create an empty map to store nodes between given levels
    unordered_map<int, vector<int>> map;

    // traverse the tree and insert its nodes into the map
    // corresponding to their level
    preorder(root, 1, map);

    // iterate through the map using reverse iterator and print all nodes
    // present in every level
    for (int i = map.size(); i > 0; i--)
    {
        cout << "Level " << i << ": ";
        for (int j: map[i]) {
            cout << j << " ";
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

    levelOrderTraversal(root);

    return 0;
}
```

**Output:** Level 4: 30 Level 3: 8 12 16 25 Level 2: 10 20 Level 1: 15

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
    // Utility function to add an element to the list corresponding to the given key
    // in `Map<Integer, List<Integer>>`.
    public static void insertIntoMultiMap(Map<Integer, List<Integer>> map,
                                        Integer key, Integer value) {
        map.putIfAbsent(key, new ArrayList<>());
        map.get(key).add(value);
    }

    // Traverse the tree in a preorder fashion and store nodes in a map
    // corresponding to their level
    public static void preorder(Node root, int level, Map<Integer, List<Integer>> map)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }

        // insert the current node and its level into the map
        insertIntoMultiMap(map, level, root.key);

        // recur for the left and right subtree by increasing the level by 1
        preorder(root.left, level + 1, map);
        preorder(root.right, level + 1, map);
    }

    // Recursive function to perform reverse level order traversal on a binary tree
    public static void levelOrderTraversal(Node root)
    {
        // create an empty map to store nodes between given levels
        Map<Integer, List<Integer>> map = new HashMap<>();

        // traverse the tree and insert its nodes into the map
        // corresponding to their level
        preorder(root, 1, map);

        // iterate through the map in reverse order and
        // print all nodes present at every level
        for (int i = map.size(); i > 0; i--) {
            System.out.println("Level " + i + ": " + map.get(i));
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

        levelOrderTraversal(root);
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

# Traverse the tree in a preorder fashion and store nodes in a dictionary
# corresponding to their level
def preorder(root, level, d):

    # base case: empty tree
    if root is None:
        return

    # insert the current node and its level into the dictionary
    d.setdefault(level, []).append(root.key)

    # recur for the left and right subtree by increasing the level by 1
    preorder(root.left, level + 1, d)
    preorder(root.right, level + 1, d)

# Recursive function to perform reverse level order traversal on a binary tree
def levelOrderTraversal(root):

    # create an empty dictionary to store nodes between given levels
    d = {}

    # traverse the tree and insert its nodes into the dictionary
    # corresponding to their level
    preorder(root, 1, d)

    # iterate through the dictionary in reverse order and
    # print all nodes present at every level
    for i in range(len(d), 0, -1):
        print(f'Level {i}:', d.get(i))

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)
    root.right.right.right = Node(30)

    levelOrderTraversal(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:** Modify the solution to print nodes of different levels in separate lines.
