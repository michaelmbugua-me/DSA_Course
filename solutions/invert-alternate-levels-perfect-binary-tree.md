# Invert alternate levels of a perfect binary tree

> Source: https://www.techiedelight.com/invert-alternate-levels-perfect-binary-tree/

Write an efficient algorithm to invert alternate levels of a perfect binary tree.

For example, consider the following tree:

We should convert it into the following tree:

> 

## 1\. Using Level Order Traversal

The idea is to perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) of the perfect binary tree and traverse its nodes level-by-level. Then for each odd level, push all nodes present in that level into a [stack](https://techiedelight.com/stack-implementation/). Finally, at the end of each odd level, we put nodes present in the stack into their correct position. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <utility>
#include <queue>
#include <stack>
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

// Function to print level order traversal of a perfect binary tree
void levelOrderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    // create an empty queue and enqueue the root node
    queue<Node*> queue;
    queue.push(root);

    // pointer to store the current node
    Node* curr = nullptr;

    // loop till queue is empty
    while (queue.size())
    {
        // process each node in the queue and enqueue their
        // non-empty left and right child
        curr = queue.front();
        queue.pop();

        cout << curr->data << " ";

        if (curr->left) {
            queue.push(curr->left);
        }

        if (curr->right) {
            queue.push(curr->right);
        }
    }
}

// Iterative function to invert alternate levels of a perfect binary tree
// using level order traversal
void invertBinaryTree(Node* root)
{
    // base case: if the tree is empty
    if (root == nullptr) {
        return;
    }

    // maintain a queue and enqueue the root node
    queue<Node*> q;
    q.push(root);

    // to store current level information
    bool level = false;

    // maintain another queue to store nodes present at an odd level
    queue<Node*> level_nodes;

    // maintain a stack to store node's data on an odd level
    stack<int> level_data;

    // loop till queue is empty
    while (!q.empty())
    {
        // get the size of the current level
        int n = q.size();

        // process all nodes present at the current level
        while (n--)
        {
            // dequeue front node
            Node* curr = q.front();
            q.pop();

            // if the level is odd
            if (level)
            {
                // enqueue current node
                level_nodes.push(curr);

                // push the current node data into the stack
                level_data.push(curr->data);
            }

            // if the current node is the last node of the level
            if (n == 0)
            {
                // flip the level
                level = !level;

                // put elements present in the `level_data` into their correct
                // position using `level_nodes`
                while (!level_nodes.empty())
                {
                    Node* front = level_nodes.front();
                    front->data = level_data.top();

                    level_nodes.pop();
                    level_data.pop();
                }
            }

            // enqueue left child of the current node
            if (curr->left) {
                q.push(curr->left);
            }

            // enqueue right child of the current node
            if (curr->right) {
                q.push(curr->right);
            }
        }
    }
}

int main()
{
    /* Construct the following tree
                1
              /   \
            /       \
          2           3
        /   \       /   \
       4     5     6     7
      / \   / \   / \   / \
     8   9 10 11 12 13 14 15
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);
    root->left->left->left = new Node(8);
    root->left->left->right = new Node(9);
    root->left->right->left = new Node(10);
    root->left->right->right = new Node(11);
    root->right->left->left = new Node(12);
    root->right->left->right = new Node(13);
    root->right->right->left = new Node(14);
    root->right->right->right = new Node(15);

    invertBinaryTree(root);
    levelOrderTraversal(root);

    return 0;
}
```

**Output:** 1 3 2 4 5 6 7 15 14 13 12 11 10 9 8

##

```java
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.Stack;

// A class to store a binary tree node
class Node
{
    int data;
    Node left, right;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Function to print level order traversal of a perfect binary tree
    public static void levelOrderTraversal(Node root)
    {
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
            // process each node in the queue and enqueue their
            // non-empty left and right child
            curr = queue.poll();

            System.out.print(curr.data + " ");

            if (curr.left != null) {
                queue.add(curr.left);
            }

            if (curr.right != null) {
                queue.add(curr.right);
            }
        }
    }

    // Iterative function to invert alternate levels of a perfect binary tree
    // using level order traversal
    public static void invertBinaryTree(Node root)
    {
        // base case: if the tree is empty
        if (root == null) {
            return;
        }

        // maintain a queue and enqueue the root node
        Queue<Node> q = new ArrayDeque<>();
        q.add(root);

        // to store current level information
        boolean level = false;

        // maintain another queue to store nodes present at an odd level
        Queue<Node> level_nodes = new ArrayDeque<>();

        // maintain a stack to store node's data on an odd level
        Stack<Integer> level_data = new Stack<>();

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // get the size of the current level
            int n = q.size();

            // process all nodes present at the current level
            while (n-- > 0)
            {
                // dequeue front node
                Node curr = q.poll();

                // if the level is odd
                if (level)
                {
                    // enqueue current node
                    level_nodes.add(curr);

                    // push the current node data into the stack
                    level_data.add(curr.data);
                }

                // if the current node is the last node of the level
                if (n == 0)
                {
                    // flip the level
                    level = !level;

                    // put elements present in the `level_data` into their correct
                    // position using `level_nodes`
                    while (!level_nodes.isEmpty())
                    {
                        Node front = level_nodes.poll();
                        front.data = level_data.pop();
                    }
                }

                // enqueue left child of the current node
                if (curr.left != null) {
                    q.add(curr.left);
                }

                // enqueue right child of the current node
                if (curr.right != null) {
                    q.add(curr.right);
                }
            }
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                    1
                  /   \
                /       \
              2           3
            /   \       /   \
           4     5     6     7
          / \   / \   / \   / \
         8   9 10 11 12 13 14 15
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);
        root.left.left.left = new Node(8);
        root.left.left.right = new Node(9);
        root.left.right.left = new Node(10);
        root.left.right.right = new Node(11);
        root.right.left.left = new Node(12);
        root.right.left.right = new Node(13);
        root.right.right.left = new Node(14);
        root.right.right.right = new Node(15);

        invertBinaryTree(root);
        levelOrderTraversal(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to print level order traversal of a perfect binary tree
def levelOrderTraversal(root):

    if root is None:
        return

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    # loop till queue is empty
    while queue:

        # process each node in the queue and enqueue their
        # non-empty left and right child
        curr = queue.popleft()

        print(curr.data, end=' ')

        if curr.left:
            queue.append(curr.left)

        if curr.right:
            queue.append(curr.right)

# Iterative function to invert alternate levels of a perfect binary tree
# using level order traversal
def invertBinaryTree(root):

    # base case: if the tree is empty
    if root is None:
        return

    # maintain a queue and enqueue the root node
    q = deque()
    q.append(root)

    # to store current level information
    level = False

    # maintain another queue to store nodes present at an odd level
    level_nodes = deque()

    # maintain a stack to store node's data on an odd level
    level_data = deque()

    # loop till queue is empty
    while q:

        # get the size of the current level
        size = len(q)

        # process all nodes present at the current level
        for n in reversed(range(size)):

            # dequeue front node
            curr = q.popleft()

            # if the level is odd
            if level:
                # enqueue current node
                level_nodes.append(curr)

                # push the current node data into the stack
                level_data.append(curr.data)

            # if the current node is the last node of the level
            if n == 0:
                # flip the level
                level = not level

                # put elements present in the `level_data` into their correct
                # position using `level_nodes`
                while level_nodes:
                    front = level_nodes.popleft()        # use `popleft()` for queue
                    front.data = level_data.pop()        # use `pop()` for stack

            # enqueue left child of the current node
            if curr.left:
                q.append(curr.left)

            # enqueue right child of the current node
            if curr.right:
                q.append(curr.right)

if __name__ == '__main__':

    ''' Construct the following tree
                  1
               /     \
             /         \
           2             3
         /   \         /   \
        4     5       6     7
      /  \    / \    / \    / \
     8    9  10 11 12  13  14 15
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)
    root.left.left.left = Node(8)
    root.left.left.right = Node(9)
    root.left.right.left = Node(10)
    root.left.right.right = Node(11)
    root.right.left.left = Node(12)
    root.right.left.right = Node(13)
    root.right.right.left = Node(14)
    root.right.right.right = Node(15)

    invertBinaryTree(root)
    levelOrderTraversal(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(n) extra space for storing nodes present at odd levels of a binary tree. The stack is preferred over a list for storing nodes since it is a LIFO data structure, and we don’t need to reverse it before assigning value to nodes.

## 2\. Using Inorder Traversal

The idea remains similar to the previous approach, except here we recursively traverse the tree in an [inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), and store nodes present all odd levels in a stack, and replace them later by doing another inorder traversal. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <string>
#include <utility>
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

// Function to print level order traversal of a given binary tree
void levelOrderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    // create an empty queue and enqueue the root node
    queue<Node*> queue;
    queue.push(root);

    // pointer to store the current node
    Node* curr = nullptr;

    // loop till queue is empty
    while (queue.size())
    {
        // process each node in the queue and enqueue their
        // non-empty left and right child
        curr = queue.front();
        queue.pop();

        cout << curr->data << " ";

        if (curr->left) {
            queue.push(curr->left);
        }

        if (curr->right) {
            queue.push(curr->right);
        }
    }
}

// Recursive function to store nodes of odd levels in a stack using inorder traversal
void pushOddLevelNodes(Node* root, stack<int> &s, bool level)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // store nodes in the left subtree
    pushOddLevelNodes(root->left, s, !level);

    // push the current node's data into the stack only if the level is odd
    if (level) {
        s.push(root->data);
    }

    // store nodes in the right subtree
    pushOddLevelNodes(root->right, s, !level);
}

// Recursive function to invert alternate levels of a perfect binary tree
// using inorder traversal
void invertBinaryTree(Node* root, stack<int> &s, bool level)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // invert nodes in the left subtree
    invertBinaryTree(root->left, s, !level);

    // if the level is odd
    if (level)
    {
        // pop an element from the stack and assign it to the current node
        root->data = s.top();
        s.pop();
    }

    // invert nodes in the right subtree
    invertBinaryTree(root->right, s, !level);
}

// Invert alternate levels of a perfect binary tree
void invertBinaryTree(Node* root)
{
    // create a stack and push nodes of odd levels into it
    stack<int> s;
    pushOddLevelNodes(root, s, false);

    // put nodes of odd levels at their correct position using stack
    invertBinaryTree(root, s, false);
}

int main()
{
    /* Construct the following tree
                  1
               /     \
             /         \
           2             3
         /   \         /   \
        4     5       6     7
      /  \    / \    / \    / \
     8    9  10 11 12  13  14 15

    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);
    root->left->left->left = new Node(8);
    root->left->left->right = new Node(9);
    root->left->right->left = new Node(10);
    root->left->right->right = new Node(11);
    root->right->left->left = new Node(12);
    root->right->left->right = new Node(13);
    root->right->right->left = new Node(14);
    root->right->right->right = new Node(15);

    invertBinaryTree(root);
    levelOrderTraversal(root);

    return 0;
}
```

**Output:** 1 3 2 4 5 6 7 15 14 13 12 11 10 9 8

##

```java
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.Stack;

// A class to store a binary tree node
class Node
{
    int data;
    Node left, right;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Function to print level order traversal of a given binary tree
    public static void levelOrderTraversal(Node root)
    {
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
            // process each node in the queue and enqueue their
            // non-empty left and right child
            curr = queue.poll();

            System.out.print(curr.data + " ");

            if (curr.left != null) {
                queue.add(curr.left);
            }

            if (curr.right != null) {
                queue.add(curr.right);
            }
        }
    }

    // Recursive function to store nodes of odd levels in a stack using
    // inorder traversal
    public static void pushOddLevelNodes(Node root, Stack<Integer> s, boolean level)
    {
        // base case
        if (root == null) {
            return;
        }

        // store nodes in the left subtree
        pushOddLevelNodes(root.left, s, !level);

        // push the current node's data into the stack only if the level is odd
        if (level) {
            s.add(root.data);
        }

        // store nodes in the right subtree
        pushOddLevelNodes(root.right, s, !level);
    }

    // Recursive function to invert alternate levels of a perfect binary tree
    // using inorder traversal
    public static void invertBinaryTree(Node root, Stack<Integer> s, boolean level)
    {
        // base case
        if (root == null) {
            return;
        }

        // invert nodes in the left subtree
        invertBinaryTree(root.left, s, !level);

        // if the level is odd
        if (level)
        {
            // pop an element from the stack and assign it to the current node
            root.data = s.pop();
        }

        // invert nodes in the right subtree
        invertBinaryTree(root.right, s, !level);
    }

    // Invert alternate levels of a perfect binary tree
    public static void invertBinaryTree(Node root)
    {
        // create a stack and push nodes of odd levels into it
        Stack<Integer> s = new Stack<>();
        pushOddLevelNodes(root, s, false);

        // put nodes of odd levels at their correct position using stack
        invertBinaryTree(root, s, false);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                    1
                  /   \
                /       \
              2           3
            /   \       /   \
           4     5     6     7
          / \   / \   / \   / \
         8   9 10 11 12 13 14 15

        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);
        root.left.left.left = new Node(8);
        root.left.left.right = new Node(9);
        root.left.right.left = new Node(10);
        root.left.right.right = new Node(11);
        root.right.left.left = new Node(12);
        root.right.left.right = new Node(13);
        root.right.right.left = new Node(14);
        root.right.right.right = new Node(15);

        invertBinaryTree(root);
        levelOrderTraversal(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to print level order traversal of a given binary tree
def levelOrderTraversal(root):

    if root is None:
        return

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    # loop till queue is empty
    while queue:

        # process each node in the queue and enqueue their
        # non-empty left and right child
        curr = queue.popleft()
        print(curr.data, end=' ')

        if curr.left:
            queue.append(curr.left)

        if curr.right:
            queue.append(curr.right)

# Recursive function to store nodes of odd levels in a stack using inorder traversal
def pushOddLevelNodes(root, s, level):

    # base case
    if root is None:
        return

    # store nodes in the left subtree
    pushOddLevelNodes(root.left, s, not level)

    # push the current node's data into the stack only if the level is odd
    if level:
        s.append(root.data)

    # store nodes in the right subtree
    pushOddLevelNodes(root.right, s, not level)

# Recursive function to invert alternate levels of a perfect binary tree
# using inorder traversal
def invertBinaryTree(root, s, level):

    # base case
    if root is None:
        return

    # invert nodes in the left subtree
    invertBinaryTree(root.left, s, not level)

    # if the level is odd
    if level:
        # pop an element from the stack and assign it to the current node
        root.data = s.pop()

    # invert nodes in the right subtree
    invertBinaryTree(root.right, s, not level)

# Invert alternate levels of a perfect binary tree
def invertBT(root):

    # create a stack and push nodes of odd levels into it
    s = deque()
    pushOddLevelNodes(root, s, False)

    # put nodes of odd levels at their correct position using stack
    invertBinaryTree(root, s, False)

if __name__ == '__main__':

    ''' Construct the following tree
                  1
               /     \
             /         \
           2             3
         /   \         /   \
        4     5       6     7
      /  \    / \    / \    / \
     8    9  10 11 12  13  14 15

    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)
    root.left.left.left = Node(8)
    root.left.left.right = Node(9)
    root.left.right.left = Node(10)
    root.left.right.right = Node(11)
    root.right.left.left = Node(12)
    root.right.left.right = Node(13)
    root.right.right.left = Node(14)
    root.right.right.right = Node(15)

    invertBT(root)
    levelOrderTraversal(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(n) extra space for storing nodes of odd levels.

We can replace stack with queue by doing reverse inorder traversal in the `pushOddLevelNodes()` function, i.e., call the right child before the left child. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <utility>
#include <queue>
#include <stack>
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

// Function to print level order traversal of a given binary tree
void levelOrderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    // create an empty queue and enqueue the root node
    queue<Node*> queue;
    queue.push(root);

    // pointer to store the current node
    Node* curr = nullptr;

    // loop till queue is empty
    while (queue.size())
    {
        // process each node in the queue and enqueue their
        // non-empty left and right child
        curr = queue.front();
        queue.pop();

        cout << curr->data << " ";

        if (curr->left) {
            queue.push(curr->left);
        }

        if (curr->right) {
            queue.push(curr->right);
        }
    }
}

// Recursive function to store nodes of odd levels in a queue
// using inorder traversal
void pushOddLevelNodes(Node* root, queue<int> &q, bool level)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // store nodes in the right subtree
    pushOddLevelNodes(root->right, q, !level);

    // enqueue current node's data only if the level is odd
    if (level) {
        q.push(root->data);
    }

    // store nodes in the left subtree
    pushOddLevelNodes(root->left, q, !level);
}

// Recursive function to invert alternate levels of a perfect binary tree
// using inorder traversal
void invertBinaryTree(Node* root, queue<int> &q, bool level)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // invert nodes in the left subtree
    invertBinaryTree(root->left, q, !level);

    // if the level is odd
    if (level)
    {
        // dequeue front element and assign it to the current node
        root->data = q.front();
        q.pop();
    }

    // invert nodes in the right subtree
    invertBinaryTree(root->right, q, !level);
}

// Invert alternate levels of a perfect binary tree
void invertBinaryTree(Node* root)
{
    // create a queue and push nodes of odd levels into it
    queue<int> q;
    pushOddLevelNodes(root, q, false);

    // put nodes of odd levels at their correct position using a queue
    invertBinaryTree(root, q, false);
}

int main()
{
    /* Construct the following tree
                  1
               /     \
             /         \
           2             3
         /   \         /   \
        4     5       6     7
      /  \    / \    / \    / \
     8    9  10 11 12  13  14 15
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);
    root->left->left->left = new Node(8);
    root->left->left->right = new Node(9);
    root->left->right->left = new Node(10);
    root->left->right->right = new Node(11);
    root->right->left->left = new Node(12);
    root->right->left->right = new Node(13);
    root->right->right->left = new Node(14);
    root->right->right->right = new Node(15);

    invertBinaryTree(root);
    levelOrderTraversal(root);

    return 0;
}
```

**Output:** 1 3 2 4 5 6 7 15 14 13 12 11 10 9 8
