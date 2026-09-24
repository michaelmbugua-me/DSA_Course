# Merge two BSTs into a doubly-linked list in sorted order

> Source: https://www.techiedelight.com/merge-two-bsts-into-doubly-linked-list-sorted-order/

Given two binary search trees, merge them into a doubly-linked list in sorted order.

For example,

**Input:** Below BSTs 20 / \ 10 30 / \ 25 100 50 / \ 5 70 **Output:** Below DDL 5 —> 10 —> 20 —> 25 —> 30 —> 50 —> 70 —> 100 —> null

> 

The idea is to convert each binary search tree into a doubly-linked list first in sorted order and then merge both lists into a single doubly linked list in sorted order.

To convert a binary search tree into a doubly-linked list in sorted order, perform reverse [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) on the BST. In the reverse inorder traversal, the right child for a node is processed before its left child. We insert the node at the front of the doubly linked list for each encountered node in the reverse inorder traversal. The reverse inorder traversal is used to ensure the correct insertion order in the doubly linked list since the reverse inorder traversal visits the nodes of a BST in the decreasing order.

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node* left, *right;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Helper function to print a doubly linked list
void printDoublyLinkedList(Node* head)
{
    while (head)
    {
        cout << head->data << " —> ";
        head = head->right;
    }

    cout << "null" << endl;
}

// Function to insert a BST node at the front of a doubly linked list
void push(Node* root, Node* &headRef)
{
    // insert the given node at the front of a DDL
    root->right = headRef;

    // update the left pointer of the existing head node of the DDL
    // to point to the BST node
    if (headRef != nullptr) {
        headRef->left = root;
    }

    // update the head pointer of DDL
    headRef = root;
}

/*
    Recursive function to convert a binary search tree into a doubly linked list
    root    ——> Pointer to the root node of the binary search tree
    headRef ——> Reference to the head node of the doubly linked list
*/
Node* convertBSTtoDLL(Node* root, Node* &headRef)
{
    // Base case
    if (root == nullptr) {
        return nullptr;
    }

    // recursively convert the right subtree
    convertBSTtoDLL(root->right, headRef);

    // push the current node at the front of the doubly linked list
    push(root, headRef);

    // recursively convert the left subtree
    convertBSTtoDLL(root->left, headRef);
}

// Recursive function to merge two doubly-linked lists into a
// single doubly linked list in sorted order
Node* mergeDDLs(Node* a, Node* b)
{
    // if the first list is empty, return the second list
    if (a == nullptr) {
        return b;
    }

    // if the second list is empty, return the first list
    if (b == nullptr) {
        return a;
    }

    // if the head node of the first list is smaller
    if (a->data < b->data)
    {
        a->right = mergeDDLs(a->right, b);
        a->right->left = a;

        return a;
    }

    // if a head node of the second list is smaller
    else {
        b->right = mergeDDLs(a, b->right);
        b->right->left = b;

        return b;
    }
}

// Function to merge two binary search trees into a doubly-linked list
// in sorted order
Node* merge(Node* a, Node* b)
{
    // convert the first binary search tree into a doubly-linked list
    Node* first = nullptr;
    convertBSTtoDLL(a, first);

    // convert the second binary search tree into a doubly-linked list
    Node* second = nullptr;
    convertBSTtoDLL(b, second);

    // merge both doubly-linked lists
    return mergeDDLs(first, second);
}

int main()
{
    /* Construct the following BST
          20
         /  \
       10    30
            /  \
           25  100
    */

    Node* a = new Node(20);
    a->left = new Node(10);
    a->right = new Node(30);
    a->right->left = new Node(25);
    a->right->right = new Node(100);

    /* Construct the following BST
          50
         /  \
        5   70
    */

    Node* b = new Node(50);
    b->left = new Node(5);
    b->right = new Node(70);

    // merge both BSTs into a doubly-linked list
    Node* root = merge(a, b);
    printDoublyLinkedList(root);

    return 0;
}
```

**Output:** 5 —> 10 —> 20 —> 25 —> 30 —> 50 —> 70 —> 100 —> null

##

```java
// A class to store a BST node
class Node
{
    int data;
    Node left, right;

    // Constructor
    Node(int data)
    {
        this.data = data;
        this.left = this.right = null;
    }
}

class Main
{
    // Helper function to print a doubly linked list
    public static void printDoublyLinkedList(Node head)
    {
        while (head != null)
        {
            System.out.print(head.data + " —> ");
            head = head.right;
        }
        System.out.println("null");
    }

    // Function to insert a BST node at the front of a doubly linked list
    public static Node push(Node root, Node head)
    {
        // insert the given node at the front of a DDL
        root.right = head;

        // update the left child of the existing head node of the DDL
        // to point to the BST node
        if (head != null) {
            head.left = root;
        }

        // update the head pointer of DDL
        head = root;
        return head;
    }

    // Recursive function to convert a BST into a doubly-linked list. It takes
    // the BST's root node and the head node of the doubly linked list as an argument
    public static Node convertBSTtoDLL(Node root, Node head)
    {
        // Base case
        if (root == null) {
            return head;
        }

        // recursively convert the right subtree
        head = convertBSTtoDLL(root.right, head);

        // push the current node at the front of the doubly linked list
        head = push(root, head);

        // recursively convert the left subtree
        head = convertBSTtoDLL(root.left, head);

        return head;
    }

    // Recursive function to merge two doubly-linked lists into a
    // single doubly linked list in sorted order
    public static Node mergeDDLs(Node a, Node b)
    {
        // if the first list is empty, return the second list
        if (a == null) {
            return b;
        }

        // if the second list is empty, return the first list
        if (b == null) {
            return a;
        }

        // if the head node of the first list is smaller
        if (a.data < b.data)
        {
            a.right = mergeDDLs(a.right, b);
            a.right.left = a;
            return a;
        }

        // if the head node of the second list is smaller
        else {
            b.right = mergeDDLs(a, b.right);
            b.right.left = b;
            return b;
        }
    }

    // Function to merge two binary search trees into a doubly-linked list
    // in sorted order
    public static Node merge(Node a, Node b)
    {
        // convert the first binary search tree into a doubly-linked list
        Node first = null;
        first = convertBSTtoDLL(a, first);

        // convert the second binary search tree into a doubly-linked list
        Node second = null;
        second = convertBSTtoDLL(b, second);

        // merge both doubly-linked lists
        return mergeDDLs(first, second);
    }

    public static void main(String[] args)
    {
        /*
        Construct the first BST
              20
             /  \
            10  30
               /  \
              25  100
        */

        Node a = new Node(20);
        a.left = new Node(10);
        a.right = new Node(30);
        a.right.left = new Node(25);
        a.right.right = new Node(100);

        /*
        Construct the second BST
              50
             /  \
            5   70
        */

        Node b = new Node(50);
        b.left = new Node(5);
        b.right = new Node(70);

        // merge both BSTs into a doubly-linked list
        Node root = merge(a, b);
        printDoublyLinkedList(root);
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    # Constructor
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Helper function to print a doubly linked list
def printDoublyLinkedList(head):
    while head:
        print(head.data, end=' —> ')
        head = head.right
    print('None')

# Function to insert a BST node at the front of a doubly linked list
def push(root, head):

    # insert the given node at the front of a DDL
    root.right = head

    # update the left child of the existing head node of the DDL
    # to point to the BST node
    if head:
        head.left = root

    # update the head pointer of DDL
    head = root
    return head

# Recursive function to convert a BST into a doubly-linked list. It takes
# the BST's root node and the head node of the doubly linked list as an argument
def convertBSTtoDLL(root, head):

    # Base case
    if root is None:
        return head

    # recursively convert the right subtree
    head = convertBSTtoDLL(root.right, head)

    # push the current node at the front of the doubly linked list
    head = push(root, head)

    # recursively convert the left subtree
    head = convertBSTtoDLL(root.left, head)

    return head

# Recursive function to merge two doubly-linked lists into a
# single doubly linked list in sorted order
def mergeDDLs(a, b):

    # if the first list is empty, return the second list
    if a is None:
        return b

    # if the second list is empty, return the first list
    if b is None:
        return a

    # if the head node of the first list is smaller
    if a.data < b.data:
        a.right = mergeDDLs(a.right, b)
        a.right.left = a
        return a

    # if the head node of the second list is smaller
    else:
        b.right = mergeDDLs(a, b.right)
        b.right.left = b
        return b

# Function to merge two binary search trees into a doubly-linked list
# in sorted order
def merge(a, b):

    # convert the first binary search tree into a doubly-linked list
    first = convertBSTtoDLL(a, None)

    # convert the second binary search tree into a doubly-linked list
    second = convertBSTtoDLL(b, None)

    # merge both doubly-linked lists
    return mergeDDLs(first, second)

if __name__ == '__main__':

    '''
    Construct the first BST
          20
         /  \
       10    30
            /  \
           25  100
    '''

    a = Node(20)
    a.left = Node(10)
    a.right = Node(30)
    a.right.left = Node(25)
    a.right.right = Node(100)

    '''
    Construct the second BST
          50
         /  \
        5   70
    '''

    b = Node(50)
    b.left = Node(5)
    b.right = Node(70)

    # merge both BSTs into a doubly-linked list
    root = merge(a, b)
    printDoublyLinkedList(root)
```

The time complexity of the above solution is O(m + n), where `m` is the total number of nodes in the first BST and `n` is the total number of nodes in the second BST. The additional space used by the program is O(x + y), where `x` is the height of the first tree, and `y` is the height of the second tree.

Also See:

> [In-place merge two height-balanced BSTs](https://www.techiedelight.com/in-place-merge-two-height-balanced-bsts/ "In-place merge two height-balanced BSTs")

> [Construct a height-balanced BST from a sorted doubly linked list](https://www.techiedelight.com/construct-height-balanced-bst-from-sorted-doubly-linked-list/ "Construct a height-balanced BST from a sorted doubly linked list")

> [Convert a ternary tree to a doubly-linked list](https://www.techiedelight.com/convert-ternary-tree-doubly-linked-list/ "Convert a ternary tree to a doubly-linked list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 192

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
