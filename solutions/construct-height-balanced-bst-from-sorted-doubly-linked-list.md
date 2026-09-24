# Construct a height-balanced BST from a sorted doubly linked list

> Source: https://www.techiedelight.com/construct-height-balanced-bst-from-sorted-doubly-linked-list/

Given a sorted doubly linked list, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into a height-balanced binary search tree (BST). The difference between the height of the left and right subtree for every node of a height-balanced BST is never greater than 1.

The conversion should be done such that the previous child pointer of a doubly-linked list node should act as a left pointer for a binary tree node, and the next child pointer should act as the right pointer for a binary tree node. The conversion should also be done by only exchanging the pointers without allocating any memory for the BST nodes.

For example,

> 

A simple solution would be to traverse the doubly linked list, store every node in an array, and then construct a height-balanced BST from nodes in the array. The idea is to make the middle node in the _sorted array_ as the BST’s root node. All nodes before the middle node will go in the left subtree, and all nodes after the middle node will go in the right subtree. If we follow this recursively for the left and right subtree, we will get a height-balanced BST. Following is the pictorial representation of this approach, followed by the C++, Java, and Python implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a Doubly Linked List / BST node
struct Node
{
    // value of node
    int data;

    // The `prev` and `next` pointer of the doubly linked list can act as
    // left and right child pointer for the BST, respectively
    Node *prev, *next;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->prev = this->next = nullptr;
    }
};

// Function to insert a new node at the beginning of the doubly linked list.
// It takes a reference to the head node of the doubly linked list.
void push(Node* &headRef, int data)
{
    // allocate a new node and link it at the beginning
    Node* node = new Node(data);
    node->next = headRef;

    // change `prev` of the existing head node to point to the new node
    if (headRef) {
        headRef->prev = node;
    }

    // update head pointer
    headRef = node;
}

// Function to print nodes of a doubly linked list
void printListNodes(Node* node)
{
    while (node)
    {
        cout << node->data << " ";
        node = node->next;
    }
    cout << endl;
}

// Function to print preorder traversal of the BST
void preorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    cout << root->data << " ";
    preorder(root->prev);
    preorder(root->next);
}

// Function to push nodes of a given doubly linked list in a vector
void pushDDLNodes(Node* node, vector<Node*> &nodes)
{
    while (node)
    {
        nodes.push_back(node);
        node = node->next;
    }
}

// Recursive function to construct a height-balanced BST from
// given nodes in sorted order
Node* buildBalancedBST(vector<Node*> &nodes, int start, int end)
{
    // base case
    if (start > end) {
        return nullptr;
    }

    // find the middle index
    int mid = (start + end) / 2;

    // The root node will be a node present at the mid-index
    Node* root = nodes[mid];

    // recursively construct left and right subtree
    root->prev = buildBalancedBST(nodes, start, mid - 1);
    root->next = buildBalancedBST(nodes, mid + 1, end);

    // return root node
    return root;
}

// Function to construct a height-balanced BST from a sorted doubly linked list.
// It takes a reference to the head node of the doubly linked list.
Node* convertSortedDLLToBalancedBST(Node*& headRef)
{
    // Push nodes of a given doubly linked list into a vector in the original order
    vector<Node*> nodes;
    pushDDLNodes(headRef, nodes);

    // Construct a height-balanced BST from sorted BST nodes
    return buildBalancedBST(nodes, 0, nodes.size() - 1);
}

int main()
{
    // points to the head of a doubly linked list
    Node* head = nullptr;

    // construct a doubly linked list from sorted keys
    int keys[] = { 25, 20, 18, 15, 12, 10, 8 };
    for (int key: keys) {
        push(head, key);
    }

    cout << "Doubly Linked List: ";
    printListNodes(head);

    // construct a height-balanced BST from a sorted doubly linked list
    Node* root = convertSortedDLLToBalancedBST(head);

    cout << "Preorder traversal of the constructed BST: ";
    preorder(root);

    return 0;
}
```

**Output:** Doubly Linked List: 8 10 12 15 18 20 25 Preorder traversal of the constructed BST: 15 10 8 12 20 18 25

##

```java
import java.util.ArrayList;
import java.util.List;

// A class to store a Doubly Linked List / BST node
class Node
{
    // value of node
    int data;

    // The `prev` and `next` pointer of the doubly linked list can act as
    // left and right child for the BST, respectively
    Node prev, next;

    // Constructor
    Node(int data)
    {
        this.data = data;
        this.prev = this.next = null;
    }
}

class Main
{
    // Function to insert a new node at the beginning of the doubly linked list.
    public static Node push(Node head, int data)
    {
        // allocate a new node and link it at the beginning
        Node node = new Node(data);
        node.next = head;

        // change `prev` of the existing head node to point to the new node
        if (head != null) {
            head.prev = node;
        }

        // update head pointer
        head = node;
        return head;
    }

    // Function to print nodes of a doubly linked list
    public static void printListNodes(Node node)
    {
        while (node != null)
        {
            System.out.print(node.data + " ");
            node = node.next;
        }

        System.out.println();
    }

    // Function to print preorder traversal of the BST
    public static void preorder(Node root)
    {
        if (root == null) {
            return;
        }

        System.out.print(root.data + " ");
        preorder(root.prev);
        preorder(root.next);
    }

    // Function to push nodes of a given BST in a list
    public static void pushDDLNodes(Node node, List<Node> nodes)
    {
        while (node != null)
        {
            nodes.add(node);
            node = node.next;
        }
    }

    // Recursive function to construct a height-balanced BST from
    // given nodes in sorted order
    public static Node buildBalancedBST(List<Node> nodes, int start, int end)
    {
        // base case
        if (start > end) {
            return null;
        }

        // find the middle index
        int mid = (start + end) / 2;

        // The root node will be a node present at the mid-index
        Node root = nodes.get(mid);

        // recursively construct left and right subtree
        root.prev = buildBalancedBST(nodes, start, mid - 1);
        root.next = buildBalancedBST(nodes, mid + 1, end);

        // return root node
        return root;
    }

    // Function to construct a height-balanced BST from a sorted doubly linked list.
    public static Node convertSortedDLLToBalancedBST(Node head)
    {
        // Push nodes of a given BST into a list in the original order
        List<Node> nodes = new ArrayList<>();
        pushDDLNodes(head, nodes);

        // Construct a height-balanced BST from sorted BST nodes
        return buildBalancedBST(nodes, 0, nodes.size() - 1);
    }

    public static void main(String[] args)
    {
        // points to the head of a doubly linked list
        Node head = null;

        // construct a doubly linked list from sorted keys
        int[] keys = { 25, 20, 18, 15, 12, 10, 8 };
        for (int key: keys) {
            head = push(head, key);
        }

        System.out.print("Doubly Linked List: ");
        printListNodes(head);

        // construct a height-balanced BST from a sorted doubly linked list
        Node root = convertSortedDLLToBalancedBST(head);

        System.out.print("Preorder traversal of the constructed BST: ");
        preorder(root);
    }
}
```

##

```python3
# A class to store a Doubly Linked List / BST node
class Node:
    # The `prev` and `next` pointer of the doubly linked list can act as
    # left and right child for the BST, respectively
    def __init__(self, data, prev=None, next=None):
        self.data = data
        self.prev = prev
        self.next = next

# Function to insert a new node at the beginning of the doubly linked list
def push(head, data):

    # allocate a new node and link it at the beginning
    node = Node(data)
    node.next = head

    # change `prev` of the existing head node to point to the new node
    if head:
        head.prev = node

    # update head pointer
    head = node
    return head

# Function to print nodes of a doubly linked list
def printListNodes(node):

    while node:
        print(node.data, end=' ')
        node = node.next
    print()

# Function to print preorder traversal of the BST
def preorder(root):

    if root is None:
        return

    print(root.data, end=' ')
    preorder(root.prev)
    preorder(root.next)

# Function to push nodes of a given BST in a list
def pushDDLNodes(node, nodes):

    while node:
        nodes.append(node)
        node = node.next

# Recursive function to construct a height-balanced BST from
# given nodes in sorted order
def buildBalancedBST(nodes, start, end):

    # base case
    if start > end:
        return None

    # find the middle index
    mid = (start + end) // 2

    # The root node will be a node present at the mid-index
    root = nodes[mid]

    # recursively construct left and right subtree
    root.prev = buildBalancedBST(nodes, start, mid - 1)
    root.next = buildBalancedBST(nodes, mid + 1, end)

    # return root node
    return root

# Function to construct a height-balanced BST from a sorted doubly linked list.
def convertSortedDLLToBalancedBST(head):

    # Push nodes of a given BST into a list in the original order
    nodes = []
    pushDDLNodes(head, nodes)

    # Construct a height-balanced BST from sorted BST nodes
    return buildBalancedBST(nodes, 0, len(nodes) - 1)

if __name__ == '__main__':

    # points to the head of a doubly linked list
    head = None

    # construct a doubly linked list from sorted keys
    keys = [25, 20, 18, 15, 12, 10, 8]
    for key in keys:
        head = push(head, key)

    print('Doubly Linked List: ', end='')
    printListNodes(head)

    # construct a height-balanced BST from a sorted doubly linked list
    root = convertSortedDLLToBalancedBST(head)

    print('Preorder traversal of the constructed BST: ', end='')
    preorder(root)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST. However, it requires O(n) extra space for storing the BST nodes. We can do the conversion in-place without any auxiliary data structure.

The idea is to build the BST in an [inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), i.e., the same order as nodes appear in the doubly linked list. We start by counting the total number of nodes in the doubly linked list. Then recursively construct the left subtree with the first half of nodes in a doubly-linked list, assign the middle node of the doubly linked list to the BST’s root node, and set the constructed left subtree as the left child of the root node. To get the middle node in constant time, move the head pointer of the doubly linked list to the next node after setting the BST’s root node. Finally, recursively construct the right subtree with remaining nodes in the doubly linked list and set it as the root node’s right child.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Data structure to store a Doubly Linked List / BST node
struct Node
{
    // value of node
    int data;

    // The `prev` and `next` pointer of the doubly linked list can act as
    // left and right child pointer for the BST, respectively
    Node *prev, *next;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->prev = this->next = nullptr;
    }
};

// Function to insert a new node at the beginning of the doubly linked list.
// It takes a reference to the head node of the doubly linked list.
void push(Node* &headRef, int data)
{
    // allocate a new node and link it at the beginning
    Node* node = new Node(data);
    node->next = headRef;

    // change `prev` of the existing head node to point to the new node
    if (headRef) {
        headRef->prev = node;
    }

    // update head pointer
    headRef = node;
}

// Function to print and count the total number of nodes in a doubly-linked list
int printAndCountNodes(Node* node)
{
    int counter = 0;

    while (node)
    {
        cout << node->data << " ";
        node = node->next;
        counter++;
    }

    cout << endl;
    return counter;
}

// Function to print preorder traversal of the BST
void preorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    cout << root->data << " ";
    preorder(root->prev);
    preorder(root->next);
}

// Recursive function to construct a height-balanced BST from a sorted doubly
// linked list. It takes a reference to the head node of the doubly linked
// list and the total number of nodes in it as an argument
Node* convertSortedDLLToBalancedBST(Node* &headRef, int n)
{
    // base case
    if (n <= 0) {
        return nullptr;
    }

    // recursively convert the left subtree
    Node* leftSubTree = convertSortedDLLToBalancedBST(headRef, n/2);

    // `headRef` now points to the middle node of the sorted list

    // make the middle node of the sorted list as the root node of the BST
    Node* root = headRef;

    // update left child of the root node
    root->prev = leftSubTree;

    // update the head reference of the doubly linked List
    headRef = headRef->next;

    // recursively convert the right subtree with the remaining nodes
    root->next = convertSortedDLLToBalancedBST(headRef, n - (n/2 + 1));
                                            /* +1 for the root node */

    // return the root node
    return root;
}

int main()
{
    // points to the head of a doubly linked list
    Node* head = nullptr;

    // construct a doubly linked list from sorted keys
    int keys[] = { 25, 20, 18, 15, 12, 10, 8 };
    for (int key: keys) {
        push(head, key);
    }

    // print the list and count the total number of nodes
    cout << "Doubly Linked List: ";
    int n = printAndCountNodes(head);

    // construct a height-balanced BST from a sorted doubly linked list
    Node* root = convertSortedDLLToBalancedBST(head, n);

    cout << "Preorder traversal of the constructed BST: ";
    preorder(root);

    return 0;
}
```

**Output:** Doubly Linked List: 8 10 12 15 18 20 25 Preorder traversal of the constructed BST: 15 10 8 12 20 18 25

##

```java
// A class to store a Doubly Linked List / BST node
class Node
{
    // value of node
    int data;

    // The `prev` and `next` pointer of the doubly linked list can act as
    // left and right child for the BST, respectively
    Node prev, next;

    // Constructor
    Node(int data)
    {
        this.data = data;
        this.prev = this.next = null;
    }
}

// Wrapper over `Node` class
class NodeWrapper
{
    public Node node;

    NodeWrapper(Node node) {
        this.node = node;
    }
}

class Main
{
    // Function to insert a new node at the beginning of the doubly linked list.
    public static Node push(Node head, int data)
    {
        // allocate a new node and link it at the beginning
        Node node = new Node(data);
        node.next = head;

        // change `prev` of the existing head node to point to the new node
        if (head != null) {
            head.prev = node;
        }

        // update head pointer
        head = node;
        return head;
    }

    // Function to print and count the total number of nodes in a doubly-linked list
    public static int printAndCountNodes(Node node)
    {
        int counter = 0;

        while (node != null)
        {
            System.out.print(node.data + " ");
            node = node.next;
            counter++;
        }

        System.out.println();
        return counter;
    }

    // Function to print preorder traversal of the BST
    public static void preorder(Node root)
    {
        if (root == null) {
            return;
        }

        System.out.print(root.data + " ");
        preorder(root.prev);
        preorder(root.next);
    }

    // Recursive function to construct a height-balanced BST from a sorted doubly
    // linked list. It takes a reference to the head node of the doubly linked
    // list and the total number of nodes in it as an argument
    public static Node convertSortedDLLToBalancedBST(NodeWrapper head, int n)
    {
        // base case
        if (n <= 0) {
            return null;
        }

        // recursively construct the left subtree
        Node leftSubTree = convertSortedDLLToBalancedBST(head, n/2);

        // `head` now points to the middle node of the sorted DDL

        // make the middle node of the sorted DDL as the root node of the BST
        Node root = head.node;

        // update left child of the root node
        root.prev = leftSubTree;

        // update the head reference of the doubly linked list
        head.node = head.node.next;

        // recursively construct the right subtree with the remaining nodes
        root.next = convertSortedDLLToBalancedBST(head, n - (n/2 + 1));
                                                /* +1 for the root node */

        // return the root node
        return root;
    }

    public static void main(String[] args)
    {
        // points to the head of a doubly linked list
        Node head = null;

        // construct a doubly linked list from sorted keys
        int[] keys = { 25, 20, 18, 15, 12, 10, 8 };
        for (int key: keys) {
            head = push(head, key);
        }

        // print the list and count the total number of nodes
        System.out.print("Doubly Linked List: ");
        int n = printAndCountNodes(head);

        // construct a height-balanced BST from a sorted doubly linked list

        // wrap the `head` node, so its reference can be changed
        Node root = convertSortedDLLToBalancedBST(new NodeWrapper(head), n);

        System.out.print("Preorder traversal of the constructed BST: ");
        preorder(root);
    }
}
```

##

```python3
# A class to store a Doubly Linked List / BST node
class Node:
    # The `prev` and `next` pointer of the doubly linked list can act as
    # left and right child for the BST, respectively
    def __init__(self, data, prev=None, next=None):
        self.data = data
        self.prev = prev
        self.next = next

# Function to insert a new node at the beginning of the doubly linked list
def push(head, data):

    # allocate a new node and link it at the beginning
    node = Node(data)
    node.next = head

    # change `prev` of the existing head node to point to the new node
    if head:
        head.prev = node

    # update head pointer
    head = node
    return head

# Function to print and count the total number of nodes in a doubly-linked list
def printAndCountNodes(node):
    counter = 0
    while node:
        print(node.data, end=' ')
        node = node.next
        counter = counter + 1
    print()
    return counter

# Function to print preorder traversal of the BST
def preorder(root):
    if root is None:
        return
    print(root.data, end=' ')
    preorder(root.prev)
    preorder(root.next)

# Recursive function to construct a height-balanced BST from a sorted doubly
# linked list. It takes the head node of the doubly linked list. and the
# total number of nodes in it as an argument
def convertSortedDLLToBalancedBST(head, n):

    # base case
    if n <= 0:
        return None, head

    # recursively construct the left subtree
    leftSubTree, head = convertSortedDLLToBalancedBST(head, n // 2)

    # `head` now points to the middle node of the sorted DDL

    # make the middle node of the sorted DDL as the root node of the BST
    root = head

    # update left child of the root node
    root.prev = leftSubTree

    # update the head reference of the doubly linked list
    head = head.next

    # recursively construct the right subtree with the remaining nodes
    root.next, head = convertSortedDLLToBalancedBST(head, n - (n // 2 + 1))
                                                        # +1 for the root

    # return the root node
    return root, head

if __name__ == '__main__':

    # points to the head of a doubly linked list
    head = None

    # construct a doubly linked list from sorted keys
    keys = [25, 20, 18, 15, 12, 10, 8]
    for key in keys:
        head = push(head, key)

    # print the list and count the total number of nodes
    print('Doubly Linked List: ', end='')
    n = printAndCountNodes(head)

    # construct a height-balanced BST from a sorted doubly linked list
    root, head = convertSortedDLLToBalancedBST(head, n)

    print('Preorder traversal of the constructed BST: ', end='')
    preorder(root)
```
