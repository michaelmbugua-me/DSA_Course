# Convert a ternary tree to a doubly-linked list

> Source: https://www.techiedelight.com/convert-ternary-tree-doubly-linked-list/

Given a ternary tree, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into a doubly-linked list. A ternary tree is a tree data structure in which each node has three child nodes distinguished as left, mid, and right.

The conversion should be done so that the left child pointer of a ternary tree node should act as a previous pointer for the doubly linked list node, the right child pointer should serve as the next pointer for the doubly linked list node, and the mid-child pointer should point to nothing. The conversion should be done by only exchanging ternary tree node pointers without allocating any extra memory for the nodes of the doubly linked list.

Consider the following ternary tree, which shows the order in which the nodes should be present in a doubly-linked list:

**Input:** Ternary Tree 1 / | \ / | \ / | \ 2 9 12 / | \ / \ | \ 3 6 8 10 11 13 16 | \ / \ | 4 7 14 15 17 \ 5 **Output:** Doubly Linked List 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> 13 —> 14 —> 15 —> 16 —> 17 —> nullptr

As evident from the above example, the ternary tree’s root node is pushed before its children into the doubly linked list. Every node recursively follows this in the subtree rooted at its left child, mid-child, and right child, in that order.

> 

The idea is to perform reverse [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) on a ternary tree. In reverse postorder traversal, before processing a ternary tree node, its right child is processed first, followed by its mid and left child. After traversing all children of a ternary tree node, insert the node at the front of the doubly linked list. The reverse postorder traversal is used to ensure the correct insertion order in a doubly-linked list.

Following is the C++, Java, and Python program that demonstrates the idea:

```cpp
#include <iostream>
#include <string>
#include <utility>
using namespace std;

// Data structure to store a ternary tree node
struct Node
{
    int data;
    Node *left, *mid, *right;

    Node() {}
    Node(int data): data(data) {}
};

// Insert a tree node at the front of the doubly linked list
void push(Node* node, Node* &headRef)
{
    // insert the given node at the front of the doubly linked list
    headRef->left = node;
    node->right = headRef;

    // update left and mid-child pointer to null
    node->left = node->mid = nullptr;

    // update the `head` pointer to point to a given node
    headRef = node;
}

// Convert a ternary tree into a doubly-linked list using
// reverse postorder traversal
void ternaryTreeToDoublyLinkedList(Node* root, Node* &headRef)
{
    // base case: an empty tree
    if (root == nullptr) {
        return;
    }

    // recur for the right, mid, and left child
    ternaryTreeToDoublyLinkedList(root->right, headRef);
    ternaryTreeToDoublyLinkedList(root->mid, headRef);
    ternaryTreeToDoublyLinkedList(root->left, headRef);

    // initialize head pointer of a doubly linked list
    if (headRef == nullptr) {
        headRef = root;
    }
    else {
        // push the current node at the front of the doubly linked list
        push(root, headRef);
    }
}

// Helper function to print a doubly linked list
void printDoublyLinkedList(Node* ptr)
{
    while (ptr)
    {
        cout << ptr->data << " —> ";
        ptr = ptr->right;
    }
    cout << "nullptr";
}

int main()
{
    /* Construct the following ternary tree
                  1
                / | \
              /   |   \
            /     |     \
           2      9      12
         / | \   / \     |  \
        3  6  8 10  11  13   16
        |   \          /  \   |
        4    7        14  15  17
         \
          5
    */

    Node* root = new Node(1);

    root->left = new Node(2);
    root->mid = new Node(9);
    root->right = new Node(12);

    root->left->left = new Node(3);
    root->left->mid = new Node(6);
    root->left->right = new Node(8);

    root->mid->left = new Node(10);
    root->mid->right = new Node(11);

    root->right->mid = new Node(13);
    root->right->right = new Node(16);

    root->left->left->mid = new Node(4);
    root->left->left->mid->right = new Node(5);
    root->left->mid->right = new Node(7);

    root->right->mid->left = new Node(14);
    root->right->mid->right = new Node(15);
    root->right->right->mid = new Node(17);

    Node* head = nullptr;
    ternaryTreeToDoublyLinkedList(root, head);
    printDoublyLinkedList(root);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> 13 —> 14 —> 15 —> 16 —> 17 —> nullptr

##

```java
// A class to store a ternary tree node
class Node
{
    int data;
    Node left, mid, right;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Insert a tree node at the front of the doubly linked list
    public static Node push(Node node, Node head)
    {
        // insert the given node at the front of the doubly linked list
        head.left = node;
        node.right = head;

        // update left and mid-child pointer to null
        node.left = node.mid = null;

        // update and return a head pointer to point to the given node
        head = node;
        return head;
    }

    // Convert a ternary tree into a doubly-linked list using
    // reverse postorder traversal
    public static Node ternaryTreeToDoublyLinkedList(Node root, Node head)
    {
        // base case: an empty tree
        if (root == null) {
            return head;
        }

        // recur for the right, mid, and left child
        head = ternaryTreeToDoublyLinkedList(root.right, head);
        head = ternaryTreeToDoublyLinkedList(root.mid, head);
        head = ternaryTreeToDoublyLinkedList(root.left, head);

        // initialize head pointer of a doubly linked list
        if (head == null) {
            head = root;
        }
        else {
            // push the current node at the front of the doubly linked list
            head = push(root, head);
        }

        return head;
    }

    // Helper function to print a doubly linked list
    public static void printDoublyLinkedList(Node node)
    {
        while (node != null)
        {
            System.out.print(node.data + " —> ");
            node = node.right;
        }
        System.out.println("null");
    }

    public static void main(String[] args)
    {
        /* Construct the following ternary tree
                      1
                    / | \
                  /   |   \
                /     |     \
               2      9      12
             / | \   / \     |  \
            3  6  8 10  11  13   16
            |   \          /  \   |
            4    7        14  15  17
             \
              5
        */

        Node root = new Node(1);

        root.left = new Node(2);
        root.mid = new Node(9);
        root.right = new Node(12);

        root.left.left = new Node(3);
        root.left.mid = new Node(6);
        root.left.right = new Node(8);

        root.mid.left = new Node(10);
        root.mid.right = new Node(11);

        root.right.mid = new Node(13);
        root.right.right = new Node(16);

        root.left.left.mid = new Node(4);
        root.left.left.mid.right = new Node(5);
        root.left.mid.right = new Node(7);

        root.right.mid.left = new Node(14);
        root.right.mid.right = new Node(15);
        root.right.right.mid = new Node(17);

        ternaryTreeToDoublyLinkedList(root, null);
        printDoublyLinkedList(root);
    }
}
```

##

```python3
# A class to store a ternary tree node
class Node:
    def __init__(self, data, left=None, mid=None, right=None):
        self.data = data
        self.left = left
        self.mid = mid
        self.right = right

# Insert a tree node at the front of the doubly linked list
def push(node, head):

    # insert the given node at the front of the doubly linked list
    head.left = node
    node.right = head

    # update left and mid-child pointer to None
    node.left = node.mid = None

    # update and return a head pointer to point to the given node
    head = node
    return head

# Convert a ternary tree into a doubly-linked list using reverse postorder traversal
def ternaryTreeToDoublyLinkedList(root, head=None):

    # base case: an empty tree
    if root is None:
        return head

    # recur for the right, mid, and left child
    head = ternaryTreeToDoublyLinkedList(root.right, head)
    head = ternaryTreeToDoublyLinkedList(root.mid, head)
    head = ternaryTreeToDoublyLinkedList(root.left, head)

    # initialize head pointer of a doubly linked list
    if head is None:
        head = root
    else:
        # push the current node at the front of the doubly linked list
        head = push(root, head)

    return head

# Function to print a doubly linked list
def printDoublyLinkedList(node):

    while node:
        print(node.data, end=' —> ')
        node = node.right
    print('None')

if __name__ == '__main__':

    ''' Construct the following ternary tree
                  1
                / | \
              /   |   \
            /     |     \
           2      9      12
         / | \   / \     |  \
        3  6  8 10  11  13   16
        |   \          /  \   |
        4    7        14  15  17
         \
          5
    '''

    root = Node(1)

    root.left = Node(2)
    root.mid = Node(9)
    root.right = Node(12)

    root.left.left = Node(3)
    root.left.mid = Node(6)
    root.left.right = Node(8)

    root.mid.left = Node(10)
    root.mid.right = Node(11)

    root.right.mid = Node(13)
    root.right.right = Node(16)

    root.left.left.mid = Node(4)
    root.left.left.mid.right = Node(5)
    root.left.mid.right = Node(7)

    root.right.mid.left = Node(14)
    root.right.mid.right = Node(15)
    root.right.right.mid = Node(17)

    ternaryTreeToDoublyLinkedList(root)
    printDoublyLinkedList(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the ternary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Extract leaves of a binary tree into a doubly-linked list](https://www.techiedelight.com/extract-leaves-of-binary-tree-into-doubly-linked-list/ "Extract leaves of a binary tree into a doubly-linked list")

> [Merge two BSTs into a doubly-linked list in sorted order](https://www.techiedelight.com/merge-two-bsts-into-doubly-linked-list-sorted-order/ "Merge two BSTs into a doubly-linked list in sorted order")

> [Convert a binary tree into a doubly-linked list in spiral order](https://www.techiedelight.com/convert-binary-tree-into-doubly-linked-list/ "Convert a binary tree into a doubly-linked list in spiral order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 152

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
