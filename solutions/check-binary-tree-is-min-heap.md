# Check if a binary tree is a min-heap or not

> Source: https://www.techiedelight.com/check-binary-tree-is-min-heap/

Given a binary tree, check if it is a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) or not. In order words, the binary tree must be a complete binary tree where each node has a higher value than its parent’s value.

For example, the following binary tree is a min-heap:

On the other hand, the following binary tree is not a min-heap:

> 

## 1\. Recursive Solution

The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/). The value of each encountered node should be less than its left or right child. If that is not the case for every internal node, the binary tree is not a min-heap.

To check for a complete binary tree, the left and right child’s index for any node is less than the total number of nodes for every node. We can pass the index as a recursion parameter and check for every node that their left and right child’s index is within the correct range.

The algorithm can be implemented in a way that both these properties can be checked in a single tree traversal. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
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

// Function to find the total number of nodes in a binary tree
int size(Node* root)
{
    if (root == nullptr) {
        return 0;
    }

    return 1 + size(root->left) + size(root->right);
}

// Function to check if a given binary tree is a complete binary tree
// and each node has a higher value than its parent
bool isHeap(Node* root, int i, int n)
{
    // base case
    if (root == nullptr) {
        return true;
    }

    // not complete binary tree: out of valid index range
    if (i >= n) {
        return false;
    }

    // current node has a higher value than its left or right child
    if ((root->left && root->left->data <= root->data) ||
            (root->right && root->right->data <= root->data)) {
        return false;
    }

    // check for left and right subtree
    return isHeap(root->left, 2*i + 1, n) && isHeap(root->right, 2*i + 2, n);
}

// Function to check if a given binary tree is a min-heap or not
bool isHeap(Node* root)
{
    int i = 0;
    return isHeap(root, i, size(root));
}

int main()
{
    /* Construct the following tree
               2
             /   \
            /     \
           3       4
          / \     / \
         /   \   /   \
        5     6 8    10
    */

    Node* root = new Node(2);
    root->left = new Node(3);
    root->right = new Node(4);
    root->left->left = new Node(5);
    root->left->right = new Node(6);
    root->right->left = new Node(8);
    root->right->right = new Node(10);

    if (isHeap(root)) {
        cout << "The given binary tree is a min-heap";
    }
    else {
        cout << "The given binary tree is not a min-heap";
    }

    return 0;
}
```

**Output:** The given binary tree is a min-heap

##

```java
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
    // Function to find the total number of nodes in the binary tree
    private static int size(Node root)
    {
        if (root == null) {
            return 0;
        }
        return 1 + size(root.left) + size(root.right);
    }

    // Function to check if a given binary tree is a complete binary tree
    // and each node has a higher value than its parent
    private static boolean isHeap(Node root, int i, int n)
    {
        // base case
        if (root == null) {
            return true;
        }

        // not complete binary tree: out of valid index range
        if (i >= n) {
            return false;
        }

        // current node has a higher value than its left or right child
        if ((root.left != null && root.left.data <= root.data) ||
                    (root.right != null && root.right.data <= root.data)) {
            return false;
        }

        // check for left and right subtree
        return isHeap(root.left, 2*i + 1, n) &&
            isHeap(root.right, 2*i + 2, n);
    }

    // Function to check if a given binary tree is a min-heap or not
    public static boolean isHeap(Node root)
    {
        int i = 0;
        return isHeap(root, i, size(root));
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                   2
                 /   \
                /     \
               3       4
              / \     / \
             /   \   /   \
            5     6 8    10
        */

        Node root = new Node(2);
        root.left = new Node(3);
        root.right = new Node(4);
        root.left.left = new Node(5);
        root.left.right = new Node(6);
        root.right.left = new Node(8);
        root.right.right = new Node(10);

        if (isHeap(root)) {
            System.out.print("The given binary tree is a min-heap");
        }
        else {
            System.out.print("The given binary tree is not a min-heap");
        }
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to find the total number of nodes in a binary tree
def size(root):

    if root is None:
        return 0

    return 1 + size(root.left) + size(root.right)

# Function to check if a given binary tree is a complete binary tree
# and each node has a higher value than its parent
def isMinHeap(root, i, n):

    # base case
    if root is None:
        return True

    # complete binary tree: out of valid index range
    if i >= n:
        return False

    # current node has a higher value than its left or right child
    if ((root.left and root.left.data <= root.data) or
            (root.right and root.right.data <= root.data)):
        return False

    # check for left and right subtree
    return isMinHeap(root.left, 2*i + 1, n) and \
        isMinHeap(root.right, 2*i + 2, n)

# Function to check if a given binary tree is a min-heap or not
def isHeap(root):

    i = 0
    return isMinHeap(root, i, size(root))

if __name__ == '__main__':

    ''' Construct the following tree
               2
             /   \
            /     \
           3       4
          / \     / \
         /   \   /   \
        5     6 8    10
    '''

    root = Node(2)
    root.left = Node(3)
    root.right = Node(4)
    root.left.left = Node(5)
    root.left.right = Node(6)
    root.right.left = Node(8)
    root.right.right = Node(10)

    if isHeap(root):
        print('The given binary tree is a min-heap')
    else:
        print('The given binary tree is not a min-heap')
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

## 2\. Iterative Solution

The idea is to perform [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) for the given binary tree to check both structural and heap properties of a min-heap.

  1. To check for the structural property, simply check that no non-empty child is encountered for any node once an empty child is seen.
  2. To check for the heap property, check that both left and right children are greater than the parent node. This can be easily done while inserting the children into the queue.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <queue>
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

// Function to check if a given binary tree is a min-heap or not
bool isHeap(Node* root)
{
    // base case
    if (root == nullptr) {
        return true;
    }

    // create an empty queue and enqueue the root node
    queue<Node*> queue;
    queue.push(root);

    // take a boolean flag, which becomes true when an empty left
    // or right child is seen for a node
    bool isNullSeen = false;

    // loop till queue is empty
    while (queue.size())
    {
        // process front node in the queue
        Node* curr = queue.front();
        queue.pop();

        // left child is non-empty
        if (curr->left)
        {
            // if either heap property is violated
            if (isNullSeen || curr->left->data <= curr->data) {
                return false;
            }

            // enqueue left child
            queue.push(curr->left);
        }
        // left child is empty
        else {
            isNullSeen = true;
        }

        // right child is non-empty
        if (curr->right)
        {
            // if either heap property is violated
            if (isNullSeen || curr->right->data <= curr->data) {
                return false;
            }

            // enqueue left child
            queue.push(curr->right);
        }
        // right child is empty
        else {
            isNullSeen = true;
        }
    }

    // we reach here only when the given binary tree is a min-heap
    return true;
}

int main()
{
    /* Construct the following tree
               2
             /   \
            /     \
           3       4
          / \     / \
         /   \   /   \
        5     6 8    10
    */

    Node* root = new Node(2);
    root->left = new Node(3);
    root->right = new Node(4);
    root->left->left = new Node(5);
    root->left->right = new Node(6);
    root->right->left = new Node(8);
    root->right->right = new Node(10);

    if (isHeap(root)) {
        cout << "The given binary tree is a min-heap";
    }
    else {
        cout << "The given binary tree is not a min-heap";
    }

    return 0;
}
```

**Output:** The given binary tree is a min-heap

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// A class to store a binary tree node
class Node
{
    int data;
    Node left, right;

    Node(int data)
    {
        this.data = data;
        this.left = this.right = null;
    }
}

class Main
{
    // Function to check if a given binary tree is a min-heap or not
    public static boolean isHeap(Node root)
    {
        // base case
        if (root == null) {
            return true;
        }

        // create an empty queue and enqueue the root node
        Queue<Node> queue = new ArrayDeque<>();
        queue.add(root);

        // take a boolean flag, which becomes true when an empty left or right
        // child is seen for a node
        boolean isNullSeen = false;

        // loop till queue is empty
        while (!queue.isEmpty())
        {
            // process front node in the queue
            Node curr = queue.poll();

            // left child is non-empty
            if (curr.left != null)
            {
                // if either heap property is violated
                if (isNullSeen || curr.left.data <= curr.data) {
                    return false;
                }

                // enqueue left child
                queue.add(curr.left);
            }
            // left child is empty
            else {
                isNullSeen = true;
            }

            // right child is non-empty
            if (curr.right != null)
            {
                // if either heap property is violated
                if (isNullSeen || curr.right.data <= curr.data) {
                    return false;
                }

                // enqueue left child
                queue.add(curr.right);
            }
            // right child is empty
            else {
                isNullSeen = true;
            }
        }

        // we reach here only when the given binary tree is a min-heap
        return true;
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                   2
                 /   \
                /     \
               3       4
              / \     / \
             /   \   /   \
            5     6 8    10
        */

        Node root = new Node(2);
        root.left = new Node(3);
        root.right = new Node(4);
        root.left.left = new Node(5);
        root.left.right = new Node(6);
        root.right.left = new Node(8);
        root.right.right = new Node(10);

        if (isHeap(root)) {
            System.out.print("The given binary tree is a min-heap");
        }
        else {
            System.out.print("The given binary tree is not a min-heap");
        }
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

# Function to check if a given binary tree is a min-heap or not
def isHeap(root):

    # base case
    if not root:
        return True

    # create an empty queue and enqueue the root node
    queue = deque()
    queue.append(root)

    # take a boolean flag, which becomes true when an empty left or right
    # child is seen for a node
    is_none_seen = False

    # loop till queue is empty
    while queue:

        # process front node in the queue
        curr = queue.popleft()

        # left child is non-empty
        if curr.left:
            # if either heap property is violated
            if is_none_seen or curr.left.data <= curr.data:
                return False

            # enqueue left child
            queue.append(curr.left)

        # left child is empty
        else:
            is_none_seen = True

        # right child is non-empty
        if curr.right:
            # if either heap property is violated
            if is_none_seen or curr.right.data <= curr.data:
                return False

            # enqueue left child
            queue.append(curr.right)

        # right child is empty
        else:
            is_none_seen = True

    # we reach here only when the given binary tree is a min-heap
    return True

if __name__ == '__main__':

    ''' Construct the following tree
               2
             /   \
            /     \
           3       4
          / \     / \
         /   \   /   \
        5     6 8    10
    '''

    root = Node(2)
    root.left = Node(3)
    root.right = Node(4)
    root.left.left = Node(5)
    root.left.right = Node(6)
    root.right.left = Node(8)
    root.right.right = Node(10)

    if isHeap(root):
        print('The given binary tree is a min-heap')
    else:
        print('The given binary tree is not a min-heap')
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for level order traversal, where `n` is the total number of nodes in the binary tree.

**Exercise:** Modify the solution to check the binary tree for max-heap.
