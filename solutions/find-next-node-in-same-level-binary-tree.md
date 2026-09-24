# Find the next node at the same level as the given node in a binary tree

> Source: https://www.techiedelight.com/find-next-node-in-same-level-binary-tree/

Given a binary tree and a node in it, write an efficient algorithm to find its next node at the same level as the node.

For example, consider the following binary tree:

The next node of 2 is 3 The next node of 5 is 6 The next node of 7 is 8 The next node of 8 is null

> 

A simple solution is to perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. The idea is to modify the level order traversal to maintain the level number of each node, and if the given node is found, we return its immediate right node, present at the same level.

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <list>
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

// Function to find the next node of a given node in the same level
// in a given binary tree
Node* findRightNode(Node* root, Node* node)
{
    // return null if a tree is empty
    if (root == nullptr) {
        return nullptr;
    }

    // create an empty queue and enqueue the root node
    list<Node*> queue;
    queue.push_back(root);

    // pointer to store the current node
    Node* front = nullptr;

    // loop till queue is empty
    while (!queue.empty())
    {
        // calculate the total number of nodes at the current level
        int size = queue.size();

        // process every node of the current level and enqueue their
        // non-empty left and right child
        while (size--)
        {
            front = queue.front();
            queue.pop_front();

            // if the desired node is found, return its next right node
            if (front == node)
            {
                // if the next right node doesn't exist, return null
                if (size == 0) {
                    return nullptr;
                }

                return queue.front();
            }

            if (front->left) {
                queue.push_back(front->left);
            }

            if (front->right) {
                queue.push_back(front->right);
            }
        }
    }

    return nullptr;
}

int main()
{
    /* Construct the following tree
              1
            /  \
           /    \
          2      3
         / \      \
        4   5      6
                  / \
                 7   8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    Node* right = findRightNode(root, root->left->right);

    if (right) {
        cout << "Right node is " << right->data;
    }
    else {
        cout << "Right node doesn't exist";
    }

    return 0;
}
```

**Output:** Right node is 6

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

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
    // Function to find the next node of a given node in the same level
    // in a given binary tree
    public static Node findRightNode(Node root, Node node)
    {
        // return null if a tree is empty
        if (root == null) {
            return null;
        }

        // create an empty queue and enqueue the root node
        Queue<Node> queue = new ArrayDeque<>();
        queue.add(root);

        // to store the current node
        Node front;

        // loop till queue is empty
        while (!queue.isEmpty())
        {
            // calculate the total number of nodes at the current level
            int size = queue.size();

            // process every node of the current level and enqueue their
            // non-empty left and right child
            while (size-- > 0)
            {
                front = queue.poll();

                // if the desired node is found, return its next right node
                if (front == node)
                {
                    // if the next right node doesn't exist, return null
                    if (size == 0) {
                        return null;
                    }

                    return queue.peek();
                }

                if (front.left != null) {
                    queue.add(front.left);
                }

                if (front.right != null) {
                    queue.add(front.right);
                }
            }
        }

        return null;
    }

    public static void main(String[] args) {
        /* Construct the following tree
                  1
                /  \
               /    \
              2      3
             / \      \
            4   5      6
                      / \
                     7   8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        Node right = findRightNode(root, root.left.right);
        if (right != null) {
            System.out.print("Right node is " + right.data);
        }
        else {
            System.out.print("Right node doesn't exist");
        }
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to find the next node of a given node in the same level
# in a given binary tree
def findRightNode(root, node):

    # return None if the tree is empty
    if root is None:
        return None

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    # loop till queue is empty
    while queue:

        # calculate the total number of nodes at the current level
        size = len(queue)

        # process every node of the current level and enqueue their
        # non-empty left and right child
        while size > 0:
            size = size - 1
            front = queue.popleft()

            # if the desired node is found, return its next right node
            if front == node:
                # if the next right node doesn't exist, return None
                if size == 0:
                    return None

                return queue[0]

            if front.left:
                queue.append(front.left)

            if front.right:
                queue.append(front.right)

    return None

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /  \
           /    \
          2      3
         / \      \
        4   5      6
                  / \
                 7   8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    right = findRightNode(root, 5)
    if right:
        print('Right node is', right.data)
    else:
        print('Right node doesn\'t exist')
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

We can also solve this problem by using constant auxiliary space and linear time. The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and search for the given node. Once the node is found, mark its level number. Then the first node encountered at the same level is the next right node.

Following is the implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
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

// Function to find the next node for a given node in the same level in a binary tree
// by using preorder traversal
Node* findRightNode(Node* root, Node* node, int level, int &node_level)
{
    // return null if a tree is empty
    if (root == nullptr) {
        return nullptr;
    }

    // if the desired node is found, set `node_level` to the current level
    if (root == node)
    {
        node_level = level;
        return nullptr;
    }

    // if `node_level` is already set, then the current node is the next right node
    else if (node_level && level == node_level) {
        return root;
    }

    // recur for the left subtree by increasing level by 1
    Node* left = findRightNode(root->left, node, level + 1, node_level);

    // if the node is found in the left subtree, return it
    if (left) {
        return left;
    }

    // recur for the right subtree by increasing the level by 1
    return findRightNode(root->right, node, level + 1, node_level);
}

// Function to find the next node of a given node in the same level
// in a given binary tree
Node* findRightNode(Node* root, Node* node)
{
    int node_level = 0;
    return findRightNode(root, node, 1, node_level);
}

int main()
{
    /* Construct the following tree
              1
            /  \
           /    \
          2      3
         / \      \
        4   5      6
                  / \
                 7   8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    Node* right = findRightNode(root, root->left->right);

    if (right) {
        cout << "Right node is " << right->data;
    }
    else {
        cout << "Right node doesn't exist";
    }

    return 0;
}
```

**Output:** Right node is 6

##

```java
import java.util.concurrent.atomic.AtomicInteger;

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
    // Function to find the next node for a given node in the same level in a
    // binary tree by using preorder traversal
    public static Node findRightNode(Node root, Node node, int level,
                                    AtomicInteger node_level)
    {
        // return null if a tree is empty
        if (root == null) {
            return null;
        }

        // if the desired node is found, set `node_level` to the current level
        if (root == node)
        {
            node_level.set(level);
            return null;
        }

        // if `node_level` is already set, then the current node is the next
        // right node
        else if (node_level.get() != 0 && level == node_level.get()) {
            return root;
        }

        // recur for the left subtree by increasing level by 1
        Node left = findRightNode(root.left, node, level + 1, node_level);

        // if the node is found in the left subtree, return it
        if (left != null) {
            return left;
        }

        // recur for the right subtree by increasing the level by 1
        return findRightNode(root.right, node, level + 1, node_level);
    }

    // Function to find the next node of a given node in the same level
    // in a given binary tree
    public static Node findRightNode(Node root, Node node)
    {
        AtomicInteger node_level = new AtomicInteger(0);
        return findRightNode(root, node, 1, node_level);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /  \
               /    \
              2      3
             / \      \
            4   5      6
                      / \
                     7   8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        Node right = findRightNode(root, root.left.right);
        if (right != null) {
            System.out.print("Right node is " + right.data);
        }
        else {
            System.out.print("Right node doesn't exist");
        }
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to find the next node for a given node in the same level in a binary tree
# by using preorder traversal
def findRightNode(root, node, level, node_level):

    # return None if the tree is empty
    if root is None:
        return None, node_level

    # if the desired node is found, set `node_level` to the current level
    if root == node:
        return None, level

    # if `node_level` is already set, then the current node is the next right node
    elif node_level and level == node_level:
        return root, level

    # recur for the left subtree by increasing level by 1
    left, node_level = findRightNode(root.left, node, level + 1, node_level)

    # if the node is found in the left subtree, return it
    if left:
        return left, node_level

    # recur for the right subtree by increasing the level by 1
    return findRightNode(root.right, node, level + 1, node_level)

# Function to find the next node of a given node in the same level
# in a given binary tree
def findRightNodeBT(root, node):

    node_level = 0
    return findRightNode(root, node, 1, node_level)[0]

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /  \
           /    \
          2      3
         / \      \
        4   5      6
                  / \
                 7   8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    right = findRightNodeBT(root, 5)
    if right:
        print('Right node is', right.data)
    else:
        print('Right node doesn\'t exist')
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.
