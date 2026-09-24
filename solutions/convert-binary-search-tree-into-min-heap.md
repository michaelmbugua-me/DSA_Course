# Convert a Binary Search Tree into a Min Heap

> Source: https://www.techiedelight.com/convert-binary-search-tree-into-min-heap/

Given a binary search tree (BST), efficiently convert it into a min-heap. In order words, convert a binary search tree into a complete binary tree where each node has a higher value than its parent’s value.

For example, the solution should convert the BST on the left into the binary tree on the right, or any other binary tree with the same set of keys that satisfies the [structural and heap-ordering property](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) of min-heap data structure.

> 

## CASE 1: BST is a Complete Binary Tree

If the given BST is already a complete binary tree, the min-heap’s structural property is already satisfied, and we need to take care of the only heap-ordering property of the min-heap. Basically, we need to ensure that each node’s value is greater than its parent’s value, with the minimum element present at the root.

The idea is to traverse the binary search tree in an [inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and enqueue all encountered keys. Then traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and for each encountered node, dequeue a key and assign it to the node.

Following is the implementation of the above algorithm in C++, Java, and Python. The logic works since the nodes get visited in the increasing order of their keys inorder traversal. The preorder traversal ensures that each node in the binary tree has a value greater than its parent’s.

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <string>
#include <utility>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Recursive function to insert a key into a BST
Node* insert(Node* root, int key)
{
    // if the root is null, create a new node and return it
    if (root == nullptr) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root->data) {
        root->left = insert(root->left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        root->right = insert(root->right, key);
    }

    return root;
}

// Helper function to perform level order traversal on a binary tree
void printLevelOrderTraversal(Node* root)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    queue<Node*> q;
    q.push(root);

    while (!q.empty())
    {
        int n = q.size();
        while (n--)
        {
            Node* front = q.front();
            q.pop();

            cout << front->data << ' ';

            if (front->left) {
                q.push(front->left);
            }

            if (front->right) {
                q.push(front->right);
            }
        }

        cout << endl;
    }
}

// Function to perform inorder traversal on a given binary tree and
// enqueue all nodes (in encountered order)
void inorder(Node* root, queue<int> &keys)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left, keys);
    keys.push(root->data);
    inorder(root->right, keys);
}

// Function to perform preorder traversal on a given binary tree.
// Assign each encountered node with the next key from the queue
void preorder(Node* root, queue<int> &keys)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // replace the root's key value with the next key from the queue
    root->data = keys.front();
    keys.pop();

    // process left subtree
    preorder(root->left, keys);

    // process right subtree
    preorder(root->right, keys);
}

// Function to convert a BST into a min-heap
void convert(Node* root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // maintain a queue to store inorder traversal on the tree
    queue<int> keys;

    // fill the queue in an inorder fashion
    inorder(root, keys);

    // traverse tree in preorder fashion, and for each encountered node,
    // dequeue a key and assign it to the node
    preorder(root, keys);
}

int main()
{
    vector<int> keys = { 5, 3, 2, 4, 8, 6, 10 };

    /* Construct the following BST
               5
             /   \
            /     \
           3       8
          / \     / \
         /   \   /   \
        2     4 6    10
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    convert(root);
    printLevelOrderTraversal(root);

    return 0;
}
```

**Output:** 2 3 6 4 5 8 10

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// A class to store a binary tree node
class Node
{
    int key;
    Node left, right;

    Node(int key) {
        this.key = key;
    }
}

class Main
{
    // Recursive function to insert a key into a BST
    public static Node insert(Node root, int key)
    {
        // if the root is null, create a new node and return it
        if (root == null) {
            return new Node(key);
        }

        // if the given key is less than the root node, recur for the left subtree
        if (key < root.key) {
            root.left = insert(root.left, key);
        }
        // if the given key is more than the root node, recur for the right subtree
        else {
            root.right = insert(root.right, key);
        }

        return root;
    }

    // Helper function to perform level order traversal on a binary tree
    public static void printLevelOrderTraversal(Node root)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }

        Queue<Node> q = new ArrayDeque<>();
        q.add(root);

        while (!q.isEmpty())
        {
            int n = q.size();
            while (n-- > 0)
            {
                Node front = q.poll();
                System.out.print(front.key + " ");

                if (front.left != null) {
                    q.add(front.left);
                }

                if (front.right != null) {
                    q.add(front.right);
                }
            }

            System.out.println();
        }
    }

    // Function to perform inorder traversal on a given binary tree and
    // enqueue all nodes (in encountered order)
    public static void inorder(Node root, Queue<Integer> keys)
    {
        if (root == null) {
            return;
        }

        inorder(root.left, keys);
        keys.add(root.key);
        inorder(root.right, keys);
    }

    // Function to perform preorder traversal on a given binary tree.
    // Assign each encountered node with the next key from the queue
    public static void preorder(Node root, Queue<Integer> keys)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }

        // replace the root's key value with the next key from the queue
        root.key = keys.poll();

        // process left subtree
        preorder(root.left, keys);

        // process right subtree
        preorder(root.right, keys);
    }

    // Function to convert a BST into a min-heap
    public static void convert(Node root)
    {
        // base case
        if (root == null) {
            return;
        }

        // maintain a queue to store inorder traversal on the tree
        Queue<Integer> keys = new ArrayDeque<>();

        // fill the queue in an inorder fashion
        inorder(root, keys);

        // traverse tree in preorder fashion, and for each encountered node,
        // dequeue a key and assign it to the node
        preorder(root, keys);
    }

    public static void main(String[] args)
    {
        int[] keys = { 5, 3, 2, 4, 8, 6, 10 };

        /* Construct the following BST
                   5
                 /   \
                /     \
               3       8
              / \     / \
             /   \   /   \
            2     4 6    10
        */

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        convert(root);
        printLevelOrderTraversal(root);
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

# Recursive function to insert a key into a BST
def insert(root, key):

    # if the root is None, create a new node and return it
    if root is None:
        return Node(key)

    # if the given key is less than the root node, recur for the left subtree
    if key < root.key:
        root.left = insert(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        root.right = insert(root.right, key)

    return root

# Helper function to perform level order traversal on a binary tree
def printLevelOrderTraversal(root):
    # base case: empty tree
    if root is None:
        return

    q = deque()
    q.append(root)

    while q:
        n = len(q)
        for _ in range(n):
            front = q.popleft()
            print(front.key, end=' ')
            if front.left:
                q.append(front.left)
            if front.right:
                q.append(front.right)
        print()

# Function to perform inorder traversal on a given binary tree and
# enqueue all nodes (in encountered order)
def inorder(root, keys):
    if root is None:
        return
    inorder(root.left, keys)
    keys.append(root.key)
    inorder(root.right, keys)

# Function to perform preorder traversal on a given binary tree.
# Assign each encountered node with the next key from the queue
def preorder(root, keys):

    # base case: empty tree
    if root is None:
        return

    # replace the root's key value with the next key from the queue
    root.key = keys.popleft()

    # process left subtree
    preorder(root.left, keys)

    # process right subtree
    preorder(root.right, keys)

# Function to convert a BST into a min-heap
def convert(root):

    # maintain a queue to store inorder traversal on the tree
    keys = deque()

    # fill the queue in an inorder fashion
    inorder(root, keys)

    # traverse tree in preorder fashion, and for each encountered node,
    # dequeue a key and assign it to the node
    preorder(root, keys)

if __name__ == '__main__':

    keys = [5, 3, 2, 4, 8, 6, 10]

    ''' Construct the following BST
               5
             /   \
            /     \
           3       8
          / \     / \
         /   \   /   \
        2     4 6    10
    '''

    root = None
    for key in keys:
        root = insert(root, key)

    convert(root)
    printLevelOrderTraversal(root)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST. The program also requires O(n) extra space for the queue.

## CASE 2: BST is not a Complete Binary Tree

For normal BST, we need to take care of both the structural and heap-ordering property of min-heap. We need to ensure that the final tree is a complete binary tree and the value of each node is greater than the value of its parent.

The idea is to traverse the BST in an inorder fashion and store all encountered keys in a queue. Then construct a complete binary tree from sorted keys in the queue. If the binary tree is built level-by-level with nodes having keys in increasing order, the resultant tree will be a min-heap.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <utility>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Recursive function to insert a key into a BST
Node* insert(Node* root, int key)
{
    // if the root is null, create a new node and return it
    if (root == nullptr) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root->data) {
        root->left = insert(root->left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        root->right = insert(root->right, key);
    }

    return root;
}

// Helper function to perform level order traversal on a binary tree
void printLevelOrderTraversal(Node* root)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    queue<Node*> q;
    q.push(root);

    while (!q.empty())
    {
        int n = q.size();
        while (n--)
        {
            Node* front = q.front();
            q.pop();

            cout << front->data << ' ';

            if (front->left) {
                q.push(front->left);
            }

            if (front->right) {
                q.push(front->right);
            }
        }

        cout << endl;
    }
}

// Function to construct a complete binary tree from sorted keys in a queue
Node* construct(queue<int> &keys)
{
    // construct a queue to store the parent nodes
    queue<Node*> q;

    // initialize the root node of the complete binary tree
    Node* root = new Node(keys.front());
    keys.pop();

    // enqueue root node
    q.push(root);

    // loop till all keys are processed
    while (!keys.empty())
    {
        // dequeue front node
        Node* parent = q.front();
        q.pop();

        // allocate the left child of the parent node with the next key
        parent->left = new Node(keys.front());
        keys.pop();

        // enqueue left child node
        q.push(parent->left);

        // if the next key exists
        if (!keys.empty())
        {
            // allocate the right child of the parent node with the next key
            parent->right = new Node(keys.front());
            keys.pop();

            // enqueue right child node
            q.push(parent->right);
        }
    }

    // return the root node of the complete binary tree
    return root;
}

// Function to perform inorder traversal on a given binary tree and
// enqueue all nodes (in encountered order)
void inorder(Node* root, queue<int> &keys)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left, keys);
    keys.push(root->data);
    inorder(root->right, keys);
}

// Function to convert a BST into a min-heap without using
// any auxiliary space
void convert(Node* &root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // maintain a queue to store inorder traversal on the tree
    queue<int> keys;

    // fill the queue in an inorder fashion
    inorder(root, keys);

    // construct a complete binary tree from sorted keys in the queue
    root = construct(keys);
}

int main()
{
    vector<int> keys = { 5, 3, 2, 4, 8, 10 };

    /* Construct the following BST
               5
             /   \
            /     \
           3       8
          / \       \
         /   \       \
        2     4      10
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    convert(root);
    printLevelOrderTraversal(root);

    return 0;
}
```

**Output:** 2 3 4 5 8 10

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// A class to store a binary tree node
class Node
{
    int key;
    Node left, right;

    Node(int key) {
        this.key = key;
    }
}

class Main
{
    // Recursive function to insert a key into a BST
    public static Node insert(Node root, int key)
    {
        // if the root is null, create a new node and return it
        if (root == null) {
            return new Node(key);
        }
        // if the given key is less than the root node, recur for the left subtree
        if (key < root.key) {
            root.left = insert(root.left, key);
        }
        // if the given key is more than the root node, recur for the right subtree
        else {
            root.right = insert(root.right, key);
        }

        return root;
    }

    // Helper function to perform level order traversal on a binary tree
    public static void printLevelOrderTraversal(Node root)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }

        Queue<Node> q = new ArrayDeque<>();
        q.add(root);

        while (!q.isEmpty())
        {
            int n = q.size();
            while (n-- > 0)
            {
                Node front = q.poll();

                System.out.print(front.key + " ");

                if (front.left != null) {
                    q.add(front.left);
                }

                if (front.right != null) {
                    q.add(front.right);
                }
            }

            System.out.println();
        }
    }

    // Function to construct a complete binary tree from sorted keys in a queue
    public static Node construct(Queue<Integer> keys)
    {
        // construct a queue to store the parent nodes
        Queue<Node> q = new ArrayDeque<>();

        // initialize the root node of the complete binary tree
        Node root = new Node(keys.poll());

        // enqueue root node
        q.add(root);

        // loop till all keys are processed
        while (!keys.isEmpty())
        {
            // dequeue front node
            Node parent = q.poll();

            // allocate the left child of the parent node with the next key
            parent.left = new Node(keys.poll());

            // enqueue left child node
            q.add(parent.left);

            // if the next key exists
            if (!keys.isEmpty())
            {
                // allocate the right child of the parent node with the next key
                parent.right = new Node(keys.poll());

                // enqueue right child node
                q.add(parent.right);
            }
        }

        // return the root node of the complete binary tree
        return root;
    }

    // Function to perform inorder traversal on a given binary tree and
    // enqueue all nodes (in encountered order)
    public static void inorder(Node root, Queue<Integer> keys)
    {
        if (root == null) {
            return;
        }

        inorder(root.left, keys);
        keys.add(root.key);
        inorder(root.right, keys);
    }

    // Function to convert a BST into a min-heap without using
    // any auxiliary space
    public static Node convert(Node root)
    {
        // base case
        if (root == null) {
            return null;
        }

        // maintain a queue to store inorder traversal on the tree
        Queue<Integer> keys = new ArrayDeque<>();

        // fill the queue in an inorder fashion
        inorder(root, keys);

        // construct a complete binary tree from sorted keys in the queue
        root = construct(keys);
        return root;
    }

    public static void main(String[] args)
    {
        int[] keys = { 5, 3, 2, 4, 8, 10 };

        /* Construct the following BST
                   5
                 /   \
                /     \
               3       8
              / \       \
             /   \       \
            2     4      10
        */

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        root = convert(root);
        printLevelOrderTraversal(root);
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

# Recursive function to insert a key into a BST
def insert(root, key):

    # if the root is None, create a new node and return it
    if root is None:
        return Node(key)

    # if the given key is less than the root node, recur for the left subtree
    if key < root.key:
        root.left = insert(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        root.right = insert(root.right, key)

    return root

# Helper function to perform level order traversal on a binary tree
def printLevelOrderTraversal(root):

    # base case: empty tree
    if root is None:
        return

    q = deque()
    q.append(root)

    while q:
        n = len(q)
        while n > 0:
            n = n - 1
            front = q.popleft()
            print(front.key, end=' ')
            if front.left:
                q.append(front.left)
            if front.right:
                q.append(front.right)
        print()

# Function to construct a complete binary tree from sorted keys in a queue
def construct(keys):

    # construct a queue to store the parent nodes
    q = deque()

    # initialize the root node of the complete binary tree
    root = Node(keys.pop())

    # enqueue root node
    q.append(root)

    # loop till all keys are processed
    while keys:

        # dequeue front node
        parent = q.popleft()

        # allocate the left child of the parent node with the next key
        parent.left = Node(keys.pop())

        # enqueue left child node
        q.append(parent.left)

        # if the next key exists
        if keys:
            # allocate the right child of the parent node with the next key
            parent.right = Node(keys.pop())

            # enqueue right child node
            q.append(parent.right)

    # return the root node of the complete binary tree
    return root

# Function to perform inorder traversal on a given binary tree and
# enqueue all nodes (in encountered order)
def inorder(root, keys):

    if root is None:
        return

    inorder(root.right, keys)
    keys.append(root.key)
    inorder(root.left, keys)

# Function to convert a BST into a min-heap without using
# any auxiliary space
def convert(root):

    # maintain a collection to store reverse inorder traversal on the tree
    keys = []
    inorder(root, keys)

    # construct a complete binary tree from sorted keys in the queue
    root = construct(keys)
    return root

if __name__ == '__main__':

    keys = [5, 3, 2, 4, 8, 10]

    ''' Construct the following BST
               5
             /   \
            /     \
           3       8
          / \       \
         /   \       \
        2     4      10
    '''

    root = None
    for key in keys:
        root = insert(root, key)

    root = convert(root)
    printLevelOrderTraversal(root)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST. However, the program requires O(n) extra space for the queue, which can be avoided by doing the conversion [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/). The idea is to convert the binary search tree into a sorted linked list and then transform it into a min-heap.

To convert a BST into a sorted linked list, perform reverse inorder traversal on the BST and push the encountered nodes at the front of the linked list. In the reverse inorder traversal, the right subtree is visited first; then the node is processed, followed by the left subtree.

To convert the sorted list into a min-heap, construct the complete binary tree level-wise from left-to-right. The idea is to traverse the linked list and consider two unprocessed nodes at a time from the front. Those two nodes form children of the last leaf node of the partially constructed complete binary tree. Since the linked list is sorted, the min-heap property is preserved by the algorithm. Note that the root node is separately handled as it is the same as the front node in the sorted list.

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <utility>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Recursive function to insert a key into a BST
Node* insert(Node* root, int key)
{
    // if the root is null, create a new node and return it
    if (root == nullptr) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root->data) {
        root->left = insert(root->left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        root->right = insert(root->right, key);
    }

    return root;
}

// Helper function to perform level order traversal on a binary tree
void printLevelOrderTraversal(Node* root)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    queue<Node*> q;
    q.push(root);

    while (!q.empty())
    {
        int n = q.size();
        while (n--)
        {
            Node* front = q.front();
            q.pop();

            cout << front->data << ' ';

            if (front->left) {
                q.push(front->left);
            }

            if (front->right) {
                q.push(front->right);
            }
        }

        cout << endl;
    }
}

// Insert a tree node at the front of a linked list
void push(Node* node, Node* &headRef)
{
    // initialize head pointer of the linked list
    if (headRef == nullptr)
    {
        headRef = node;
        headRef->right = nullptr;
        return;
    }

    // update the right child of the node to point to the current head of the list
    node->right = headRef;

    // update head pointer to point to the given node
    headRef = node;
}

// Function to convert a BST into a sorted linked list
void convertTreeToList(Node* root, Node* &headRef)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // process right child first
    convertTreeToList(root->right, headRef);

    // Insert the current root node at the front of the linked list
    push(root, headRef);

    // process left child
    convertTreeToList(root->left, headRef);

    // set left child as null
    // (since the right child of the linked list acts as a next pointer)
    root->left = nullptr;
}

// Function to convert a sorted linked list into a min-heap
void convertListToMinHeap(Node* &heapRef, Node* head)
{
    // base case: empty linked list
    if (head == nullptr) {
        return;
    }

    // construct a queue to store the parent nodes
    queue<Node*> q;

    // root node of the min-heap would be the front node in the sorted list
    heapRef = head;

    // enqueue root node
    q.push(heapRef);

    // advance the linked list to the next node
    head = head->right;

    // unlink the root node from the unprocessed linked list by
    // setting its right child as null
    heapRef->right = nullptr;

    // loop till the end of the list is reached
    while (head != nullptr)
    {
        // dequeue next node
        Node* parent = q.front();
        q.pop();

        /* Assign the next node of the linked list to the left child of the
           parent node */

        // process next node in the linked list
        Node* next = head;

        // enqueue next node
        q.push(next);

        // advance the linked list to the next node
        head = head->right;

        // unlink the next node from the unprocessed linked list by
        // setting its right child as null
        next->right = nullptr;

        // set the next node as the left child of the parent
        parent->left = next;

        /* Assign the next node of the linked list to the right child of the
           parent node (if any) */

        if (head != nullptr)
        {
            // process next node in the linked list
            next = head;

            // enqueue next node
            q.push(next);

            // advance the linked list to the next node
            head = head->right;

            // unlink the next node from the unprocessed linked list by
            // setting its right child as null
            next->right = nullptr;

            // set the next node as the right child of the parent
            parent->right = next;
        }
    }
}

// Function to convert a BST into a min-heap without using
// any auxiliary space
void convert(Node* &root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // points to the head of the linked list
    Node* head = nullptr;

    // Convert the BST into a sorted linked list
    convertTreeToList(root, head);

    // Convert the sorted list into a min-heap
    convertListToMinHeap(root, head);
}

int main()
{
    vector<int> keys = { 5, 3, 2, 4, 8, 10 };

    /* Construct the following BST
               5
             /   \
            /     \
           3       8
          / \       \
         /   \       \
        2     4      10
    */

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    convert(root);
    printLevelOrderTraversal(root);

    return 0;
}
```

**Output:** 2 3 4 5 8 10
