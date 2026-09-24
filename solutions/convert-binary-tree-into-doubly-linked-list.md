# Convert a binary tree into a doubly-linked list in spiral order

> Source: https://www.techiedelight.com/convert-binary-tree-into-doubly-linked-list/

Given a binary tree, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into a doubly-linked list following the spiral order.

The conversion should be done so that the left child pointer of a binary tree node should act as a previous pointer for a doubly-linked list node, and the right child pointer should act as the next pointer for a doubly-linked list node. The conversion should also be done by only exchanging the pointers without allocating any memory for the doubly linked list’s nodes.

For example,

> 

## 1\. Using Hashing

We can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to convert the binary tree into a doubly-linked list. The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store each node and its level number in a map using the level number as a key. Finally, iterate through the map and push each level node into the doubly linked list in spiral order.

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>
#include <list>
#include <string>
#include <utility>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int key;
    Node *left, *right;

    Node(int key): key(key) {}
};

// Helper function to print a doubly linked list
void printDoublyLinkedList(Node* ptr)
{
    while (ptr)
    {
        cout << ptr->key << " —> ";
        ptr = ptr->right;
    }
    cout << "nullptr";
}

// Insert a tree node at the front of the doubly linked list
void push(Node* node, Node* &headRef)
{
    // initialize head pointer of the doubly linked list
    if (headRef == nullptr)
    {
        headRef = node;
        headRef->left = headRef->right = nullptr;
        return;
    }

    // insert the given node at the front of the doubly linked list
    headRef->left = node;
    node->right = headRef;

    // update left child pointer to be null
    node->left = nullptr;

    // update head pointer to point to the given node
    headRef = node;
}

// Traverse the tree in a preorder fashion and store nodes in a map
// corresponding to their level
void preorder(Node* root, int level, auto &map)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // insert the current node and its level into the map

    // if the level is odd, insert at front; otherwise, search at the back
    if (level & 1) {
        map[level].push_front(root);
    }
    else {
        map[level].push_back(root);
    }

    // recur for the left and right subtree with a level increased by 1
    preorder(root->left, level + 1, map);
    preorder(root->right, level + 1, map);
}

// Recursive function to convert a binary tree into a doubly-linked list
// using hashing
void convert(Node* root)
{
    // create an empty map to store nodes between given levels
    unordered_map<int, list<Node*>> map;

    // traverse the tree and insert its nodes into the map
    // corresponding to their level
    preorder(root, 0, map);

    // iterate through the map in decreasing order of level and
    // push nodes of each level into the doubly linked list
    int n = map.size();
    Node* head = nullptr;
    for (int i = n - 1; i >=0; i--)
    {
        for (Node* node: map[i]) {
            push(node, head);
        }
    }
}

int main()
{
    /* Construct the following tree
               1
             /   \
            /     \
           2       3
          / \     / \
         /   \   /   \
        4     5 6     7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    convert(root);
    printDoublyLinkedList(root);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 7 —> 6 —> 5 —> 4 —> nullptr

##

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

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
    // Helper function to print a doubly linked list
    public static void printDoublyLinkedList(Node node)
    {
        while (node != null)
        {
            System.out.print(node.key + " —> ");
            node = node.right;
        }
        System.out.println("null");
    }

    // Insert a tree node at the front of the doubly linked list
    public static Node push(Node node, Node head)
    {
        // initialize head pointer of the doubly linked list
        if (head == null)
        {
            head = node;
            head.left = head.right = null;
            return head;
        }

        // insert the given node at the front of the doubly linked list
        head.left = node;
        node.right = head;

        // update left child pointer to be null
        node.left = null;

        // update head pointer to point to the given node
        head = node;
        return head;
    }

    // Traverse the tree in a preorder fashion and store nodes in a map
    // corresponding to their level
    public static void preorder(Node root, int level, Map<Integer, Deque<Node>> map)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }

        // insert the current node and its level into the map
        map.putIfAbsent(level, new ArrayDeque<>());

        // if the level is odd, insert at front; otherwise, search at the back
        if ((level & 1) == 1) {
            map.get(level).addFirst(root);
        }
        else {
            map.get(level).addLast(root);
        }

        // recur for the left and right subtree with a level increased by 1
        preorder(root.left, level + 1, map);
        preorder(root.right, level + 1, map);
    }

    // Recursive function to convert a binary tree into a doubly-linked list
    // using hashing
    public static void convert(Node root)
    {
        // create an empty map to store nodes between given levels
        Map<Integer, Deque<Node>> map = new HashMap<>();

        // traverse the tree and insert its nodes into the map
        // corresponding to their level
        preorder(root, 0, map);

        // iterate through the map in decreasing order of level and
        // push nodes of each level into the doubly linked list
        int n = map.size();
        Node head = null;
        for (int i = n - 1; i >=0; i--)
        {
            for (Node node: map.get(i)) {
                head = push(node, head);
            }
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                   1
                 /   \
                /     \
               2       3
              / \     / \
             /   \   /   \
            4     5 6     7
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        convert(root);
        printDoublyLinkedList(root);
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

# Helper function to print a doubly linked list
def printDoublyLinkedList(node):

    while node:
        print(node.key, end=' —> ')
        node = node.right
    print('None')

# Insert a tree node at the front of the doubly linked list
def push(node, head):

    # initialize head pointer of the doubly linked list
    if head is None:
        head = node
        head.left = head.right = None
        return head

    # insert the given node at the front of the doubly linked list
    head.left = node
    node.right = head

    # update left child pointer to be None
    node.left = None

    # update head pointer to point to the given node
    head = node
    return head

# Traverse the tree in a preorder fashion and store nodes in a dictionary
# corresponding to their level
def preorder(root, level, d):

    # base case: empty tree
    if root is None:
        return

    # insert the current node and its level into the dictionary
    # if the level is odd, insert at front; otherwise, search at the back
    if (level & 1) == 1:
        d.setdefault(level, deque()).appendleft(root)
    else:
        d.setdefault(level, deque()).append(root)

    # recur for the left and right subtree with a level increased by 1
    preorder(root.left, level + 1, d)
    preorder(root.right, level + 1, d)

# Recursive function to convert a binary tree into a doubly-linked list
# using hashing
def convert(root):

    # create an empty dictionary to store nodes between given levels
    d = {}

    # traverse the tree and insert its nodes into the dictionary
    # corresponding to their level
    preorder(root, 0, d)

    # iterate through the dictionary in decreasing order of level and
    # push nodes of each level into the doubly linked list
    n = len(d)
    head = None
    for i in reversed(range(n)):
        for node in d[i]:
            head = push(node, head)

    return head

if __name__ == '__main__':

    ''' Construct the following tree
               1
             /   \
            /     \
           2       3
          / \     / \
         /   \   /   \
        4     5 6     7
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    convert(root)
    printDoublyLinkedList(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for map and call stack.

## 2\. By Traversing the Tree in Spiral Order

We can also perform [spiral order traversal](https://techiedelight.com/spiral-order-traversal-binary-tree/) of the binary tree using deque (Double-ended queue), similar to the standard [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/). However, odd level nodes are processed from left to right, and even level nodes are processed from right to left. The deque is used to facilitate traversal in both directions.

Now to convert the binary tree into a doubly-linked list, store all nodes that were popped from the deque during spiral order traversal and later insert those nodes into the doubly linked list in the correct order. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <utility>
#include <list>
#include <stack>
#include <vector>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int key;
    Node *left, *right;

    Node(int key): key(key) {}
};

// Helper function to print a doubly linked list
void printDoublyLinkedList(Node* ptr)
{
    while (ptr)
    {
        cout << ptr->key << " —> ";
        ptr = ptr->right;
    }
    cout << "nullptr";
}

// Insert a tree node at the front of the doubly linked list
void push(Node* node, Node* &headRef)
{
    // initialize head pointer of the doubly linked list
    if (headRef == nullptr)
    {
        headRef = node;
        headRef->left = headRef->right = nullptr;
        return;
    }

    // insert the given node at the front of the doubly linked list
    headRef->left = node;
    node->right = headRef;

    // update left child pointer to be null
    node->left = nullptr;

    // update head pointer to point to the given node
    headRef = node;
}

// Function to convert a binary tree into a doubly-linked list
// using spiral order traversal
void convert(Node* root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // create an empty double-ended queue and enqueue the root node
    list<Node*> deque;
    deque.push_front(root);

    // `flag` is used to differentiate between odd or even level
    bool flag = false;

    // create a stack for storing binary tree nodes in spiral order
    stack<Node*> s;

    // loop till deque is empty
    while (!deque.empty())
    {
        // calculate the total number of nodes at the current level
        int nodeCount = deque.size();

        // process level left to right
        if (flag)
        {
            // process each node of the current level and enqueue their
            // non-empty left and right child to deque
            while (nodeCount)
            {
                // pop from the front when `flag` is true
                Node* curr = deque.front();
                deque.pop_front();

                // push the left child into the back, followed by the right child
                if (curr->left != nullptr) {
                    deque.push_back(curr->left);
                }

                if (curr->right != nullptr) {
                    deque.push_back(curr->right);
                }

                // push the current node into the stack
                s.push(curr);
                nodeCount--;
            }
        }

        // process level right to left
        else {
            // process each node of the current level and enqueue their
            // non-empty right and left child
            while (nodeCount)
            {
                // pop from the back when `flag` is false
                Node* curr = deque.back();
                deque.pop_back();

                // push the right child at the front, followed by the left child
                if (curr->right != nullptr) {
                    deque.push_front(curr->right);
                }

                if (curr->left != nullptr) {
                    deque.push_front(curr->left);
                }

                // push the current node into the stack
                s.push(curr);
                nodeCount--;
            }
        }

        // flip `flag` for the next level
        flag = !flag;
    }

    // Insert all nodes from the stack at the beginning of the doubly linked list
    Node* head = nullptr;
    while (!s.empty())
    {
        push(s.top(), head);
        s.pop();
    }
}

int main()
{
    /* Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        /   \   /   \
       4     5 6     7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    convert(root);
    printDoublyLinkedList(root);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 7 —> 6 —> 5 —> 4 —> nullptr

##

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Stack;

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
    // Helper function to print a doubly linked list
    public static void printDoublyLinkedList(Node node)
    {
        while (node != null)
        {
            System.out.print(node.key + " —> ");
            node = node.right;
        }

        System.out.println("null");
    }

    // Insert a tree node at the front of the doubly linked list
    public static Node push(Node node, Node head)
    {
        // initialize head pointer of the doubly linked list
        if (head == null)
        {
            head = node;
            head.left = head.right = null;
            return head;
        }

        // insert the given node at the front of the doubly linked list
        head.left = node;
        node.right = head;

        // update left child pointer to be null
        node.left = null;

        // update head pointer to point to the given node
        head = node;
        return head;
    }

    // Function to convert a binary tree into a doubly-linked list
    // using spiral order traversal
    public static void convert(Node root)
    {
        // base case
        if (root == null) {
            return;
        }

        // create an empty double-ended queue and enqueue the root node
        Deque<Node> deque = new ArrayDeque<>();
        deque.addFirst(root);

        // `flag` is used to differentiate between odd or even level
        boolean flag = false;

        // create a stack for storing binary tree nodes in spiral order
        Stack<Node> s = new Stack<>();

        // loop till deque is empty
        while (!deque.isEmpty())
        {
            // calculate the total number of nodes at the current level
            int nodeCount = deque.size();

            // process level left to right
            if (flag)
            {
                // process each node of the current level and enqueue their
                // non-empty left and right child to deque
                while (nodeCount > 0)
                {
                    // pop from the front when `flag` is true
                    Node curr = deque.pollFirst();

                    // push the left child into the back, followed by the right child
                    if (curr.left != null) {
                        deque.addLast(curr.left);
                    }

                    if (curr.right != null) {
                        deque.addLast(curr.right);
                    }

                    // push the current node into the stack
                    s.push(curr);
                    nodeCount--;
                }
            }

            // process level right to left
            else {
                // process each node of the current level and enqueue their
                // non-empty right and left child
                while (nodeCount > 0)
                {
                    // pop from the back when `flag` is false
                    Node curr = deque.pollLast();

                    // push the right child at the front, followed by the left child
                    if (curr.right != null) {
                        deque.addFirst(curr.right);
                    }

                    if (curr.left != null) {
                        deque.addFirst(curr.left);
                    }

                    // push the current node into the stack
                    s.push(curr);
                    nodeCount--;
                }
            }

            // flip `flag` for the next level
            flag = !flag;
        }

        // insert all nodes into the stack at the beginning of the
        // doubly linked list
        Node head = null;
        while (!s.empty()) {
            head = push(s.pop(), head);
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
               /     \
              2       3
             / \     / \
            /   \   /   \
           4     5 6     7
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        convert(root);
        printDoublyLinkedList(root);
    }
}
```

##

```python3
import collections

# A class to store a binary tree node
class Node:
    # Constructor
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Helper function to print a doubly linked list
def printDoublyLinkedList(node):

    while node:
        print(node.key, end=' —> ')
        node = node.right
    print('None')

# Insert a tree node at the front of the doubly linked list
def push(node, head):

    # initialize head pointer of the doubly linked list
    if head is None:
        head = node
        head.left = head.right = None
        return head

    # insert the given node at the front of the doubly linked list
    head.left = node
    node.right = head

    # update left child pointer to be None
    node.left = None

    # update head pointer to point to the given node
    head = node
    return head

# Function to convert a binary tree into a doubly-linked list
# using spiral order traversal
def convert(root):

    # base case
    if root is None:
        return

    # create an empty double-ended queue and enqueue the root node
    deque = collections.deque()
    deque.appendleft(root)

    # `flag` is used to differentiate between odd or even level
    flag = False

    # create a stack for storing binary tree nodes in spiral order
    s = collections.deque()

    # loop till deque is empty
    while deque:

        # calculate the total number of nodes at the current level
        nodeCount = len(deque)

        # process level left to right
        if flag:
            # process each node of the current level and enqueue their
            # non-empty left and right child to deque
            while nodeCount > 0:
                # pop from the front when `flag` is true
                curr = deque.popleft()

                # push the left child into back, followed by the right child

                if curr.left:
                    deque.append(curr.left)

                if curr.right:
                    deque.append(curr.right)

                # push the current node into the stack
                s.append(curr)
                nodeCount = nodeCount - 1

        # process level right to left
        else:
            # process each node of the current level and enqueue their
            # non-empty right and left child
            while nodeCount > 0:
                # pop from the back when `flag` is false
                curr = deque.pop()

                # push the right child at the front, followed by the left child
                if curr.right:
                    deque.appendleft(curr.right)

                if curr.left:
                    deque.appendleft(curr.left)

                # push the current node into the stack
                s.append(curr)
                nodeCount = nodeCount - 1

        # flip `flag` for the next level
        flag = not flag

    # insert all nodes into the stack at the beginning of the
    # doubly linked list
    head = None
    while s:
        head = push(s.pop(), head)

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        /   \   /   \
       4     5 6     7
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    convert(root)
    printDoublyLinkedList(root)
```

The time complexity of the above approach is O(n), where `n` is the total number of nodes in the binary tree. It uses O(n) extra space for the stack.
