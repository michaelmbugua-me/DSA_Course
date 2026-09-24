# Check if a binary tree is a complete binary tree or not

> Source: https://www.techiedelight.com/check-given-binary-tree-complete-binary-tree-not/

Given a binary tree, check if it is a complete binary tree or not.

A complete binary tree is a binary tree in which every level, except possibly the last, is filled, and all nodes are as far left as possible. For example, the following binary trees are complete:

> 

## 1\. Level Order Traversal (BFS)

We can modify [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) to check if a given binary tree is a complete binary tree or not. The idea is for every dequeued node, check if it is a full node (have both left and right children). If a node is found that is not a full node, i.e., either it has no children or only one child, then all the remaining nodes in the queue should not have any children. If anyone has a child, then it’s not a complete binary tree; otherwise, it is.

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

// Function to check if a given binary tree is complete or not
bool isComplete(Node* root)
{
    // return if the tree is empty
    if (root == nullptr) {
        return true;
    }

    // create an empty queue and enqueue the root node
    list<Node*> queue;
    queue.push_back(root);

    // pointer to store the current node
    Node* front = nullptr;

    // flag to mark the end of full nodes
    bool flag = false;

    // loop till queue is empty
    while (queue.size())
    {
        // dequeue front node
        front = queue.front();
        queue.pop_front();

        // if we have encountered a non-full node before and the current node
        // is not a leaf, a tree cannot be complete
        if (flag && (front->left || front->right)) {
            return false;
        }

        // if the left child is empty and the right child exists,
        // a tree cannot be complete
        if (front->left == nullptr && front->right) {
            return false;
        }

        // if the left child exists, enqueue it
        if (front->left) {
            queue.push_back(front->left);
        }
        // if the current node is a non-full node, set the flag to true
        else {
            flag = true;
        }

        // if the right child exists, enqueue it
        if (front->right) {
            queue.push_back(front->right);
        }
        // if the current node is a non-full node, set the flag to true
        else {
            flag = true;
        }
    }

    return true;
}

int main()
{
    /* Construct the following tree
              1
           /    \
          2      3
         / \    / \
        4   5  6   7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    if (isComplete(root)) {
        cout << "Complete binary tree";
    }
    else {
        cout << "Not a complete binary tree";
    }

    return 0;
}
```

**Output:** Complete binary tree

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
    // Function to check if a given binary tree is complete or not
    public static boolean isComplete(Node root)
    {
        // return if the tree is empty
        if (root == null) {
            return true;
        }

        // create an empty queue and enqueue the root node
        Queue<Node> queue = new ArrayDeque<>();
        queue.add(root);

        // to store the current node
        Node front;

        // flag to mark the end of full nodes
        boolean flag = false;

        // loop till queue is empty
        while (!queue.isEmpty())
        {
            // dequeue front node
            front = queue.poll();

            // if we have encountered a non-full node before and the current node
            // is not a leaf, a tree cannot be complete
            if (flag && (front.left != null || front.right != null)) {
                return false;
            }

            // if the left child is empty and the right child exists,
            // a tree cannot be complete
            if (front.left == null && front.right != null) {
                return false;
            }

            // if the left child exists, enqueue it
            if (front.left != null) {
                queue.add(front.left);
            }
            // if the current node is a non-full node, set the flag to true
            else {
                flag = true;
            }

            // if the right child exists, enqueue it
            if (front.right != null) {
                queue.add(front.right);
            }
            // if the current node is a non-full node, set the flag to true
            else {
                flag = true;
            }
        }

        return true;
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
               /     \
              2       3
             / \     / \
            4   5   6   7
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        if (isComplete(root)) {
            System.out.println("Complete binary tree");
        }
        else {
            System.out.println("Not a complete binary tree");
        }
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

# Function to check if a given binary tree is complete or not
def isComplete(root):

    # return if the tree is empty
    if root is None:
        return True

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    # flag to mark the end of full nodes
    flag = False

    # loop till queue is empty
    while queue:

        # dequeue front node
        front = queue.popleft()

        # if we have encountered a non-full node before and the current node
        # is not a leaf, a tree cannot be complete
        if flag and (front.left or front.right):
            return False

        # if the left child is empty and the right child exists,
        # a tree cannot be complete
        if front.left is None and front.right:
            return False

        # if the left child exists, enqueue it
        if front.left:
            queue.append(front.left)

        # if the current node is a non-full node, set the flag to true
        else:
            flag = True

        # if the right child exists, enqueue it
        if front.right:
            queue.append(front.right)

        # if the current node is a non-full node, set the flag to true
        else:
            flag = True

    return True

if __name__ == '__main__':

    ''' Construct the following tree
              1
           /     \
          2       3
         / \     / \
        4   5   6   7
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    if isComplete(root):
        print('Complete binary tree')
    else:
        print('Not a complete binary tree')
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 2\. Array representation of a complete tree

We can solve this problem by using the properties of a complete binary tree. We know that in the array representation of a binary tree, the left child for a node at index `i` is present at index `2i+1`, and the right child is present at index `2i+2`. If we construct an array with all the tree elements at the corresponding positions, then the elements will hold consecutive positions for a complete binary tree. If any vacant position is found, then the tree cannot be complete.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
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

// Utility function to calculate the total number of nodes in a binary tree
int size(Node* root)
{
    // base case
    if (root == nullptr) {
        return 0;
    }

    return 1 + size(root->left) + size(root->right);
}

// Perform inorder traversal on the binary tree and fill array `A[]`
void inorder(Node* root, vector<bool> &A, int i)
{
    if (root == nullptr) {
        return;
    }

    // recur with index `2i+1` for left node
    inorder(root->left, A, 2*i + 1);

    // mark index `i` as visited
    A[i] = true;

    // recur with index `2i+2` for the right node
    inorder(root->right, A, 2*i + 2);
}

// Function to check if a given binary tree is a complete binary tree or not
bool isComplete(Node* root, int n)
{
    // return if the tree is empty
    if (root == nullptr) {
        return true;
    }

    // construct an auxiliary boolean array of size `n`
    vector<bool> A(n, false);

    // fill array `A[]`
    inorder(root, A, 0);

    // check if all positions in the array are filled or not
    for (int i = 0; i < n; i++)
    {
        if (!A[i]) {
            return false;
        }
    }

    return true;
}

int main()
{
    /* Construct the following tree
             1
           /   \
          /     \
         2       3
        / \     / \
       4   5   6   7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    if (isComplete(root, size(root))) {
        cout << "Complete binary tree";
    }
    else {
        cout << "Not a complete binary tree";
    }

    return 0;
}
```

**Output:** Complete binary tree

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
    // Utility function to calculate the total number of nodes in a binary tree
    private static int size(Node root)
    {
        if (root == null) {
            return 0;
        }
        return 1 + size(root.left) + size(root.right);
    }

    // Perform inorder traversal on the binary tree and fill array `A[]`
    public static void inorder(Node root, boolean[] A, int i)
    {
        if (root == null || i >= A.length) {
            return;
        }

        // recur with index `2i+1` for left node
        inorder(root.left, A, 2*i + 1);

        // mark index `i` as visited
        A[i] = true;

        // recur with index `2i+2` for the right node
        inorder(root.right, A, 2*i + 2);
    }

    // Function to check if a given binary tree is a complete binary tree or not
    public static boolean isComplete(Node root, int n)
    {
        // return if the tree is empty
        if (root == null) {
            return true;
        }

        // construct an auxiliary boolean array of size `n`
        boolean[] A = new boolean[n];

        // fill array `A[]`
        inorder(root, A, 0);

        // check if all positions in the array are filled or not
        for (boolean e: A)
        {
            if (!e) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
               /     \
              2       3
             / \     / \
            4   5   6   7
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        if (isComplete(root, size(root))) {
            System.out.println("Complete binary tree");
        }
        else {
            System.out.println("Not a complete binary tree");
        }
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

# Utility function to calculate the total number of nodes in a binary tree
def size(root):
    if root is None:
        return 0
    return 1 + size(root.left) + size(root.right)

# Perform inorder traversal on the binary tree and fill list `A`
def inorder(root, A, i):

    if root is None or i >= len(A):
        return

    # recur with index `2i+1` for left node
    inorder(root.left, A, 2*i + 1)

    # mark index `i` as visited
    A[i] = True

    # recur with index `2i+2` for the right node
    inorder(root.right, A, 2*i + 2)

# Function to check if a given binary tree is a complete binary tree or not
def isComplete(root, n):

    # return if the tree is empty
    if root is None:
        return True

    # construct an auxiliary space of size `n`
    A = [False] * n

    # fill list `A`
    inorder(root, A, 0)

    # check if all positions in the list are filled or not
    for e in A:
        if not e:
            return False

    return True

if __name__ == '__main__':

    ''' Construct the following tree
              1
           /     \
          2       3
         / \     / \
        4   5   6   7
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    if isComplete(root, size(root)):
        print('Complete binary tree')
    else:
        print('Not a complete binary tree')
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## 3\. Space-optimized previous Approach

The above approach takes extra space for storage of the boolean array. As discussed for a complete binary tree, the left and right child’s index for any node is less than the total number of nodes for every node. We can avoid using extra space by passing the index as a recursion parameter and checking for every node that their left and right child’s index are within the correct range.

Following is the C++, Java, and Python program that demonstrates it:

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

// Recursive function to check if a given binary tree is a complete tree or not
bool isComplete(Node* root, int i, int n)
{
    // return if the tree is empty
    if (root == nullptr) {
        return true;
    }

    if ((root->left && 2*i + 1 >= n) || !isComplete(root->left, 2*i + 1, n)) {
        return false;
    }

    if ((root->right && 2*i + 2 >= n) || !isComplete(root->right, 2*i + 2, n)) {
        return false;
    }

    return true;
}

// Utility function to calculate the total number of nodes in a binary tree
int size(Node* root)
{
    // base case
    if (root == nullptr) {
        return 0;
    }

    return 1 + size(root->left) + size(root->right);
}

int main()
{
    /* Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    if (isComplete(root, 0, size(root))) {
        cout << "Complete binary tree";
    }
    else {
        cout << "Not a complete binary tree";
    }

    return 0;
}
```

**Output:** Complete binary tree
