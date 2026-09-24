# Calculate the height of a binary tree – Iterative and Recursive

> Source: https://www.techiedelight.com/calculate-height-binary-tree-iterative-recursive/

Write an efficient algorithm to compute the binary tree’s height. The height or depth of a binary tree is the total number of edges or nodes on the longest path from the root node to the leaf node.

The program should consider the total number of nodes in the longest path. For example, an empty tree’s height is 0, and the tree’s height with only one node is 1.

> 

## Recursive Solution

The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and calculate the height of the left and right subtree. The height of a subtree rooted at any node will be one more than the maximum height of its left and right subtree. Recursively apply this property to all tree nodes in a bottom-up manner (postorder fashion) and return the subtree’s maximum height rooted at that node.

The algorithm can be implemented as follows in C++, Java, and Python:

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

// Recursive function to calculate the height of a given binary tree
int height(Node* root)
{
    // base case: empty tree has a height of 0
    if (root == nullptr) {
        return 0;
    }

    // recur for the left and right subtree and consider maximum depth
    return 1 + max(height(root->left), height(root->right));
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

    cout << "The height of the binary tree is " << height(root);

    return 0;
}
```

**Output:** The height of the binary tree is 3

##

```java
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
    // Recursive function to calculate the height of a given binary tree
    public static int height(Node root)
    {
        // base case: empty tree has a height of 0
        if (root == null) {
            return 0;
        }

        // recur for the left and right subtree and consider maximum depth
        return 1 + Math.max(height(root.left), height(root.right));
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

        System.out.println("The height of the binary tree is " + height(root));
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

# Recursive function to calculate the height of a given binary tree
def height(root):

    # base case: empty tree has a height of 0
    if root is None:
        return 0

    # recur for the left and right subtree and consider maximum depth
    return 1 + max(height(root.left), height(root.right))

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)

    print('The height of the binary tree is', height(root))
```

The time complexity of the above recursive solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

## Iterative Solution

In an iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. Then the height of a tree is equal to the total number of levels in it. Following is the C++, Java, and Python program that demonstrates it:

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

// Iterative function to calculate the height of a given binary tree
// by doing level order traversal on the tree
int height(Node* root)
{
    // empty tree has a height of 0
    if (root == nullptr) {
        return 0;
    }

    // create an empty queue and enqueue the root node
    list<Node*> queue;
    queue.push_back(root);

    Node* front = nullptr;
    int height = 0;

    // loop till queue is empty
    while (!queue.empty())
    {
        // calculate the total number of nodes at the current level
        int size = queue.size();

        // process each node of the current level and enqueue their
        // non-empty left and right child
        while (size--)
        {
            front = queue.front();
            queue.pop_front();

            if (front->left) {
                queue.push_back(front->left);
            }

            if (front->right) {
                queue.push_back(front->right);
            }
        }

        // increment height by 1 for each level
        height++;
    }

    return height;
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

    cout << "The height of the binary tree is " << height(root);

    return 0;
}
```

**Output:** The height of the binary tree is 3

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

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
    // Iterative function to calculate the height of a given binary tree
    // by doing level order traversal on the tree
    public static int height(Node root)
    {
        // empty tree has a height of 0
        if (root == null) {
            return 0;
        }

        // create an empty queue and enqueue the root node
        Queue<Node> queue = new ArrayDeque<>();
        queue.add(root);

        Node front = null;
        int height = 0;

        // loop till queue is empty
        while (!queue.isEmpty())
        {
            // calculate the total number of nodes at the current level
            int size = queue.size();

            // process each node of the current level and enqueue their
            // non-empty left and right child
            while (size-- > 0)
            {
                front = queue.poll();

                if (front.left != null) {
                    queue.add(front.left);
                }

                if (front.right != null) {
                    queue.add(front.right);
                }
            }

            // increment height by 1 for each level
            height++;
        }

        return height;
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

        System.out.println("The height of the binary tree is " + height(root));
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.key = data
        self.left = left
        self.right = right

# Iterative function to calculate the height of a given binary tree
# by doing level order traversal on the tree
def height(root):

    # empty tree has a height of 0
    if root is None:
        return 0

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    height = 0

    # loop till queue is empty
    while queue:

        # calculate the total number of nodes at the current level
        size = len(queue)

        # process each node of the current level and enqueue their
        # non-empty left and right child
        while size > 0:
            front = queue.popleft()

            if front.left:
                queue.append(front.left)

            if front.right:
                queue.append(front.right)

            size = size - 1

        # increment height by 1 for each level
        height = height + 1

    return height

if __name__ == '__main__':

    root = Node(15)
    root.left = Node(10)
    root.right = Node(20)
    root.left.left = Node(8)
    root.left.right = Node(12)
    root.right.left = Node(16)
    root.right.right = Node(25)

    print('The height of the binary tree is', height(root))
```

The time complexity of the above iterative solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for the queue data structure.
