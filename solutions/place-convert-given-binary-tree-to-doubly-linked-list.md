# In-place convert a binary tree to a doubly-linked list

> Source: https://www.techiedelight.com/place-convert-given-binary-tree-to-doubly-linked-list/

Given a binary tree, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into a doubly linked list.

The conversion should be done such that the left and right pointers of binary tree nodes should act as previous and next pointers in a doubly-linked list, and the doubly linked list nodes should follow the same order of nodes as inorder traversal on the tree.

For example,

> 

## 1\. Using Inorder Traversal

The idea is to perform an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) on the tree, and for every node encountered, insert it at the beginning of a doubly linked list. Since we are inserting nodes at the beginning of the doubly linked list, reverse the linked list to follow the same order of nodes as in the inorder traversal.

Following is the implementation in C++, Java, and Python based on the above idea:

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

// Helper function to print a given doubly linked list
void printDLL(Node* &head)
{
    Node* curr = head;
    while (curr != nullptr)
    {
        cout << curr->data << " ";
        curr = curr->right;
    }
}

// Function to in-place convert a given binary tree into a doubly linked list
// by doing normal inorder traversal
void convert(Node* root, Node* &head)
{
    // base case: tree is empty
    if (root == nullptr) {
        return;
    }

    // recursively convert the left subtree first
    convert(root->left, head);
    root->left = nullptr;

    // store right child
    Node* right = root->right;

    // insert the current node at the beginning of a doubly linked list
    root->right = head;
    if (head != nullptr) {
        head->left = root;
    }

    head = root;

    // recursively convert the right subtree
    convert(right, head);
}

// Function to reverse a doubly-linked list
void reverse(Node*& head)
{
    Node* prev = nullptr;
    Node* current = head;

    while (current)
    {
        swap(current->left, current->right);
        prev = current;
        current = current->left;
    }

    if (prev != nullptr) {
        head = prev;
    }
}

// The main function to in-place convert a given binary tree into a
// doubly linked list
void convert(Node* root)
{
    // head of the doubly linked list
    Node* head = nullptr;

    // convert the above binary tree into doubly linked list
    convert(root, head);

    // reverse the linked list
    reverse(head);

    // print the list
    printDLL(head);
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

    convert(root);

    return 0;
}
```

**Output:** 4 2 5 1 6 3 7

##

```java
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
    // Helper function to print a given doubly linked list
    public static void printDLL(Node head)
    {
        Node curr = head;
        while (curr != null)
        {
            System.out.print(curr.data + " ");
            curr = curr.right;
        }
    }

    // Function to in-place convert a given binary tree into a doubly linked list
    // by doing normal inorder traversal
    public static Node convert(Node root, Node head)
    {
        // base case: tree is empty
        if (root == null) {
            return head;
        }

        // recursively convert the left subtree first
        head = convert(root.left, head);
        root.left = null;

        // store right child
        Node right = root.right;

        // insert the current node at the beginning of a doubly linked list
        root.right = head;
        if (head != null) {
            head.left = root;
        }

        head = root;

        // recursively convert the right subtree
        return convert(right, head);
    }

    // Function to reverse a doubly-linked list
    public static Node reverse(Node head)
    {
        Node prev = null;
        Node current = head;

        while (current != null)
        {
            // swap current.left with current.right
            Node temp = current.left;
            current.left = current.right;
            current.right = temp;

            prev = current;
            current = current.left;
        }

        return prev;
    }

    // The main function to in-place convert a given binary tree into a
    // doubly linked list
    public static void convert(Node root)
    {
        // head of the doubly linked list
        Node head = null;

        // convert the above binary tree into doubly linked list
        head = convert(root, head);

        // reverse the linked list
        head = reverse(head);

        // print the list
        printDLL(head);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
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

        convert(root);
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

# Function to print a given doubly linked list
def printDLL(head):

    curr = head
    while curr:
        print(curr.data, end=' ')
        curr = curr.right

# Function to in-place convert a given binary tree into a doubly linked list
# by doing normal inorder traversal
def convert(root, head):

    # base case: tree is empty
    if root is None:
        return head

    # recursively convert the left subtree first
    head = convert(root.left, head)
    root.left = None;

    # store right child
    right = root.right

    # insert the current node at the beginning of a doubly linked list
    root.right = head
    if head:
        head.left = root

    head = root

    # recursively convert the right subtree
    return convert(right, head)

# Function to reverse a doubly-linked list
def reverse(head):

    prev = None
    current = head

    while current:
        # swap current.left with current.right
        temp = current.left
        current.left = current.right
        current.right = temp

        prev = current
        current = current.left

    return prev

# The main function to in-place convert a given binary tree into a
# doubly linked list
def convertBinaryTreeToDDL(root):

    # head of the doubly linked list
    head = None

    # convert the above binary tree into doubly linked list
    head = convert(root, head)

    # reverse the linked list
    head = reverse(head)

    # print the list
    printDLL(head)

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
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

    convertBinaryTreeToDDL(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

## 2\. Using Reverse Inorder Traversal

The above approach requires two passes – one pass for converting a binary tree into a doubly linked list and one pass to reverse the DDL. We can solve this problem in a single traversal of the tree using reverse inorder traversal instead of normal inorder traversal. In reverse inorder traversal, we process the right subtree before the left subtree. Now, the nodes will follow the order of inorder traversal.

The algorithm can be implemented as follows in C++, Java, and Python:

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

// Helper function to print a given doubly linked list
void printDLL(Node* &head)
{
    Node* curr = head;
    while (curr != nullptr)
    {
        cout << curr->data << " ";
        curr = curr->right;
    }
}

// Function to in-place convert a given binary tree into a doubly linked list
// by doing reverse inorder traversal
void convert(Node* root, Node* &head)
{
    // base case: tree is empty
    if (root == nullptr) {
        return;
    }

    // recursively convert the right subtree first
    convert(root->right, head);

    // insert the current node at the beginning of a doubly linked list
    root->right = head;

    if (head != nullptr) {
        head->left = root;
    }

    head = root;

    // recursively convert the left subtree
    convert(root->left, head);
}

// In-place convert a given binary tree into a doubly linked list
void convert(Node* root)
{
    // head of the doubly linked list
    Node* head = nullptr;

    // convert the above binary tree into doubly linked list
    convert(root, head);

    // print the list
    printDLL(head);
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

    convert(root);

    return 0;
}
```

**Output:** 4 2 5 1 6 3 7

##

```java
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
    // Helper function to print a given doubly linked list
    public static void printDLL(Node head)
    {
        Node curr = head;
        while (curr != null)
        {
            System.out.print(curr.data + " ");
            curr = curr.right;
        }
    }

    // Function to in-place convert a given binary tree into a doubly linked list
    // by doing reverse inorder traversal
    public static Node convert(Node root, Node head)
    {
        // base case: tree is empty
        if (root == null) {
            return head;
        }

        // recursively convert the right subtree first
        head = convert(root.right, head);

        // insert the current node at the beginning of a doubly linked list
        root.right = head;

        if (head != null) {
            head.left = root;
        }

        head = root;

        // recursively convert the left subtree
        return convert(root.left, head);
    }

    // In-place convert a given binary tree into a doubly linked list
    public static Node convert(Node root)
    {
        // head of the doubly linked list
        Node head = null;

        // convert the above binary tree into doubly linked list
        return convert(root, head);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
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

        root = convert(root);

        // print the list
        printDLL(root);
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

# Helper function to print a given doubly linked list
def printDLL(head):

    curr = head
    while curr:
        print(curr.data, end=' ')
        curr = curr.right

# Function to in-place convert a given binary tree into a doubly linked list
# by doing reverse inorder traversal
def convert(root, head):

    # base case: tree is empty
    if root is None:
        return head

    # recursively convert the right subtree first
    head = convert(root.right, head)

    # insert the current node at the beginning of a doubly linked list
    root.right = head

    if head:
        head.left = root

    head = root

    # recursively convert the left subtree
    return convert(root.left, head)

# In-place convert a given binary tree into a doubly linked list
def convertBT(root):

    # head of the doubly linked list
    head = None

    # convert the above binary tree into doubly linked list
    return convert(root, head)

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
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

    root = convertBT(root)

    # print the list
    printDLL(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

## 3\. Keeping track of previously processed node in the inorder traversal

We can solve this problem in a single traversal by doing inorder traversal only. The idea is to keep track of the previously processed node in the inorder traversal, and for every encountered node, set its left child to prev and prev’s right child to the current node.

Following is the C++, Java, and Python implementation of the idea:

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

// Helper function to print a given doubly linked list
void printDLL(Node* &head)
{
    Node* curr = head;
    while (curr != nullptr)
    {
        cout << curr->data << " ";
        curr = curr->right;
    }
}

// Function to in-place convert a given binary tree into a doubly linked list

// root —> current node
// head —> head of the doubly linked list (Passed by reference)
// prev —> previously processed node (Passed by reference)
void convert(Node* curr, Node*& head, Node* &prev)
{
    // base case: tree is empty
    if (curr == nullptr) {
        return;
    }

    // recursively convert the left subtree first
    convert(curr->left, head, prev);

    // adjust pointers
    if (prev != nullptr)
    {
        // set the current node's left child to `prev`
        curr->left = prev;

        // make the previous node's right child as `curr`
        prev->right = curr;
    }

    // if `prev` is null, then update the head of doubly linked list
    // as this is the first node in inorder
    else {
        head = curr;
    }

    // after the current node is visited, update the previous pointer
    // to the current node
    prev = curr;

    // recursively convert the right subtree
    convert(curr->right, head, prev);
}

// In-place convert a given binary tree into a doubly linked list
void convert(Node* root)
{
    // `prev` keeps track of the previously processed node in the
    // inorder traversal
    Node* prev = nullptr;

    // convert the above binary tree into doubly linked list
    // (using inorder traversal)
    convert(root, root, prev);

    // root is now head of the doubly linked list

    // print the list
    printDLL(root);
}

int main()
{
    /* Construct the following tree
              1
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

    convert(root);

    return 0;
}
```

**Output:** 4 2 5 1 6 3 7
