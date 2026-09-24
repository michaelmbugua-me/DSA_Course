# Spiral order traversal of a binary tree

> Source: https://www.techiedelight.com/spiral-order-traversal-binary-tree/

Given a binary tree, print its nodes level by level in spiral order, i.e., all nodes present at level 1 should be printed first from left to right, followed by nodes of level 2 from right to left, followed by nodes of level 3 from left to right and so on… In other words, odd levels should be printed from left to right, and even levels should be printed from right to left or vice versa.

For example, the spiral [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) for the following tree is

`(1, 3, 2, 4, 5, 6, 7)` or `(1, 2, 3, 7, 6, 5, 4)`

> 

A simple solution is to print all nodes of level 1 first, followed by level 2, … till level `h`, where `h` is the tree’s height. We can print all nodes present in a level by modifying the [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree. Following is the C++, Java, and Python program that demonstrates it:

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

// Function to print all nodes of a given level from left to right
bool printLevelLeftToRight(Node* root, int level)
{
    if (root == nullptr) {
        return false;
    }

    if (level == 1)
    {
        cout << root->key << " ";
        return true;
    }

    // process left child before the right child
    bool left = printLevelLeftToRight(root->left, level - 1);
    bool right = printLevelLeftToRight(root->right, level - 1);

    return left || right;
}

// Function to print all nodes of a given level from right to left
bool printLevelRightToLeft(Node* root, int level)
{
    if (root == nullptr) {
        return false;
    }

    if (level == 1)
    {
        cout << root->key << " ";
        return true;
    }

    // process right child before the left child
    bool right = printLevelRightToLeft(root->right, level - 1);
    bool left = printLevelRightToLeft(root->left, level - 1);

    return right || left;
}

// Function to print level order traversal of a given binary tree
void spiralOrderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    // start from level 1 — till the height of the tree
    int level = 1;

    // run till either function returns false
    while (printLevelLeftToRight(root, level++) &&
        printLevelRightToLeft(root, level++));
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

    spiralOrderTraversal(root);

    return 0;
}
```

**Output:** 15 20 10 8 12 16 25

##

```java
// A class to store a binary tree node
class Node
{
    int key;
    Node left = null, right = null;

    Node(int data) {
        this.key = data;
    }
}

class Main
{
    // Function to print all nodes of a given level from left to right
    public static boolean printLevelLeftToRight(Node root, int level)
    {
        if (root == null) {
            return false;
        }

        if (level == 1)
        {
            System.out.print(root.key + " ");
            return true;
        }

        // process left child before the right child
        boolean left = printLevelLeftToRight(root.left, level - 1);
        boolean right = printLevelLeftToRight(root.right, level - 1);

        return left || right;
    }

    // Function to print all nodes of a given level from right to left
    public static boolean printLevelRightToLeft(Node root, int level)
    {
        if (root == null) {
            return false;
        }

        if (level == 1)
        {
            System.out.print(root.key + " ");
            return true;
        }

        // process right child before the left child
        boolean right = printLevelRightToLeft(root.right, level - 1);
        boolean left = printLevelRightToLeft(root.left, level - 1);

        return right || left;
    }

    // Function to print level order traversal of a given binary tree
    public static void spiralOrderTraversal(Node root)
    {
        if (root == null) {
            return;
        }

        // start from level 1 — till the height of the tree
        int level = 1;

        // run till either function returns false
        while (printLevelLeftToRight(root, level++) &&
                    printLevelRightToLeft(root, level++));
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

        spiralOrderTraversal(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.key = data
        self.left = left
        self.right = right

# Function to print all nodes of a given level from left to right
def printLevelLeftToRight(root, level):

    if root is None:
        return False

    if level == 1:
        print(root.key, end=' ')
        return True

    # process left child before the right child
    left = printLevelLeftToRight(root.left, level - 1)
    right = printLevelLeftToRight(root.right, level - 1)

    return left or right

# Function to print all nodes of a given level from right to left
def printLevelRightToLeft(root, level):

    if root is None:
        return False

    if level == 1:
        print(root.key, end=' ')
        return True

    # process right child before the left child
    right = printLevelRightToLeft(root.right, level - 1)
    left = printLevelRightToLeft(root.left, level - 1)

    return right or left

# Function to print level order traversal of a given binary tree
def spiralOrderTraversal(root):

    if root is None:
        return

    # start from level 1 — till the height of the tree
    level = 1

    # run till either function returns false
    process = True

    while process:
        process = printLevelLeftToRight(root, level)
        level = level + 1

        if process:
            process = printLevelRightToLeft(root, level)
            level = level + 1

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)

    spiralOrderTraversal(root)
```

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree.

We can reduce the time complexity to O(n) by using extra space. Following is a pseudocode for a simple [queue](https://techiedelight.com/circular-queue-implementation-c/)-based spiral order traversal:

**levelorder(root)** q —> empty double ended queue q.push(root) while (not q.isEmpty()) while (level is even) node —> q.popFront() visit(node) if (node.left <> null) q.pushBack(node.left) if (node.right <> null) q.pushBack(node.right) while (level is odd) node —> q.popBack() visit(node) if (node.right <> null) q.pushFront(node.right) if (node.left <> null) q.pushFront(node.left)

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

// Function to print spiral order traversal of a given binary tree
void spiralOrderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    // create an empty double-ended queue and enqueue the root node
    list<Node*> deque;        // or use deque
    deque.push_front(root);

    // `flag` is used to differentiate between odd or even level
    bool flag = true;

    // loop till deque is empty
    while (!deque.empty())
    {
        // calculate the total number of nodes at the current level
        int nodeCount = deque.size();

        // print left to right
        if (flag)
        {
            // process each node of the current level and enqueue their
            // non-empty left and right child to deque
            while (nodeCount)
            {
                    // pop from the front if `flag` is true
                    Node* curr = deque.front();
                    deque.pop_front();

                    cout << curr->key << " ";

                    // it is important to push the left child into the back,
                    // followed by the right child

                    if (curr->left != nullptr) {
                        deque.push_back(curr->left);
                    }

                    if (curr->right != nullptr) {
                        deque.push_back(curr->right);
                    }

                    nodeCount--;
            }
        }

        // print right to left
        else {
            // process each node of the current level and enqueue their
            // non-empty right and left child
            while (nodeCount)
            {
                    // it is important to pop from the back
                    Node* curr = deque.back();
                    deque.pop_back();

                    cout << curr->key << " ";    // print front node

                    // it is important to push the right child at the front,
                    // followed by the left child

                    if (curr->right != nullptr) {
                        deque.push_front(curr->right);
                    }

                    if (curr->left != nullptr) {
                        deque.push_front(curr->left);
                    }

                    nodeCount--;
            }
        }

        // flip the flag for the next level
        flag = !flag;
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

    spiralOrderTraversal(root);

    return 0;
}
```

**Output:** 15 20 10 8 12 16 25

##

```java
import java.util.ArrayDeque;
import java.util.Deque;

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
    // Function to print spiral order traversal of a given binary tree
    public static void spiralOrderTraversal(Node root)
    {
        if (root == null) {
            return;
        }

        // create an empty double-ended queue and enqueue the root node
        Deque<Node> deque = new ArrayDeque<>();        // or use deque
        deque.addFirst(root);

        // `flag` is used to differentiate between odd or even level
        boolean flag = true;

        // loop till deque is empty
        while (!deque.isEmpty())
        {
            // calculate the total number of nodes at the current level
            int nodeCount = deque.size();

            // print left to right
            if (flag)
            {
                // process each node of the current level and enqueue their
                // non-empty left and right child to deque
                while (nodeCount > 0)
                {
                    // pop from the front if `flag` is true
                    Node curr = deque.pollFirst();
                    System.out.print(curr.key + " ");

                    // it is important to push the left child into the back,
                    // followed by the right child

                    if (curr.left != null) {
                        deque.addLast(curr.left);
                    }

                    if (curr.right != null) {
                        deque.addLast(curr.right);
                    }

                    nodeCount--;
                }
            }

            // print right to left
            else {
                // process each node of the current level and enqueue their
                // non-empty right and left child
                while (nodeCount > 0)
                {
                    // it is important to pop from the back
                    Node curr = deque.pollLast();
                    System.out.print(curr.key + " ");    // print front node

                    // it is important to push the right child at the front,
                    // followed by the left child

                    if (curr.right != null) {
                        deque.addFirst(curr.right);
                    }

                    if (curr.left != null) {
                        deque.addFirst(curr.left);
                    }

                    nodeCount--;
                }
            }

            // flip the flag for the next level
            flag = !flag;
            System.out.println();
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

        spiralOrderTraversal(root);
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

# Function to print spiral order traversal of a given binary tree
def spiralOrderTraversal(root):

    if root is None:
        return

    # create an empty double-ended queue and enqueue the root node
    q = deque()         # or use deque
    q.appendleft(root)

    # `flag` is used to differentiate between odd or even level
    flag = True

    # loop till deque is empty
    while q:

        # calculate the total number of nodes at the current level
        nodeCount = len(q)

        # print left to right
        if flag:
            # process each node of the current level and enqueue their
            # non-empty left and right child to deque
            while nodeCount > 0:
                # pop from the front if `flag` is true
                curr = q.popleft()
                print(curr.key, end=' ')

                # it is important to push the left child into the back,
                # followed by the right child

                if curr.left:
                    q.append(curr.left)

                if curr.right:
                    q.append(curr.right)

                nodeCount = nodeCount - 1

        # print right to left
        else:
            # process each node of the current level and enqueue their
            # non-empty right and left child
            while nodeCount > 0:
                # it is important to pop from the back
                curr = q.pop()
                print(curr.key, end=' ')    # print front node

                # it is important to push the right child at the front,
                # followed by the left child

                if curr.right:
                    q.appendleft(curr.right)

                if curr.left:
                    q.appendleft(curr.left)

                nodeCount = nodeCount - 1

        # flip the flag for the next level
        flag = not flag
        print()

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)

    spiralOrderTraversal(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

We can also solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The following code traverses the tree in a preorder fashion and uses a map to store every node and its level using the level number as a key. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <list>
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

    // if the level is odd, insert at the back; otherwise, search at front
    if (level & 1) {
        map[level].push_back(root->key);
    }
    else {
        map[level].push_front(root->key);
    }

    // recur for the left and right subtree by increasing the level by 1
    preorder(root->left, level + 1, map);
    preorder(root->right, level + 1, map);
}

// Recursive function to print spiral order traversal of a given binary tree
void levelOrderTraversal(Node* root)
{
    // create an empty map to store nodes between given levels
    unordered_map<int, list<int>> map;

    // traverse the tree and insert its nodes into the map
    // corresponding to their level
    preorder(root, 1, map);

    // iterate through the map and print all nodes present at every level
    for (int i = 1; map[i].size() > 0; i++)
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
    root->left->left->left = new Node(20);
    root->right->right->right = new Node(30);

    levelOrderTraversal(root);

    return 0;
}
```

**Output:** Level 1: 15 Level 2: 20 10 Level 3: 8 12 16 25 Level 4: 30 20
