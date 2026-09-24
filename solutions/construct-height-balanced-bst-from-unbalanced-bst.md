# Construct a height-balanced BST from an unbalanced BST

> Source: https://www.techiedelight.com/construct-height-balanced-bst-from-unbalanced-bst/

Given a binary search tree (BST), convert it into a height-balanced binary search tree.

For a height-balanced binary search tree, the difference between the height of the left and right subtree of every node is never more than 1. The height of a binary search tree with `n` nodes is never more than `log2(n)` \+ 1.

For example, convert BST on the left into a BST on the right:

> 

The idea is to traverse the BST in an [inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and store all encountered nodes in a container (array, list, vector, etc.). The container will be sorted since inorder traversal on a BST always visits the nodes in increasing order of their values.

Then construct a height-balanced BST from the sorted nodes. The idea is to start from the middle element of the sorted array. That would be our root node of the BST. All elements before the middle element should go in the left subtree, and all elements after the middle element should go in the right subtree. We can easily do this recursively, and we will end up with a height-balanced BST.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node *left, *right;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Helper function to perform the preorder traversal on a BST
void preorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

// Recursive function to push nodes of a given binary search tree into a
// vector in an inorder fashion
void pushTreeNodes(Node* root, vector<Node*> &nodes)
{
    // base case
    if (root == nullptr) {
        return;
    }

    pushTreeNodes(root->left, nodes);
    nodes.push_back(root);
    pushTreeNodes(root->right, nodes);
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
    root->left = buildBalancedBST(nodes, start, mid - 1);
    root->right = buildBalancedBST(nodes, mid + 1, end);

    // return root node
    return root;
}

// Function to construct a height-balanced BST from an unbalanced BST
void constructBalancedBST(Node*& root)
{
    // Push nodes of a given binary search tree into a vector in sorted order
    vector<Node*> nodes;
    pushTreeNodes(root, nodes);

    // Construct a height-balanced BST from sorted BST nodes
    root = buildBalancedBST(nodes, 0, nodes.size() - 1);
}

int main()
{
    Node* root = new Node(20);
    root->left = new Node(15);
    root->left->left = new Node(10);
    root->left->left->left = new Node(5);
    root->left->left->left->left = new Node(2);
    root->left->left->left->right = new Node(8);

    constructBalancedBST(root);

    cout << "Preorder traversal of the constructed BST is ";
    preorder(root);

    return 0;
}
```

**Output:** Preorder traversal of the constructed BST is 8 2 5 15 10 20

##

```java
import java.util.ArrayList;
import java.util.List;

// A class to store a BST node
class Node
{
    int data;
    Node left, right;

    // Constructor
    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Helper function to perform the preorder traversal on a BST
    public static void preorder (Node root)
    {
        if (root == null) {
            return;
        }

        System.out.print(root.data + " ");
        preorder(root.left);
        preorder(root.right);
    }

    // Recursive function to push nodes of a given binary search tree into a
    // list in an inorder fashion
    public static void pushTreeNodes(Node root, List<Node> nodes)
    {
        // base case
        if (root == null) {
            return;
        }

        pushTreeNodes(root.left, nodes);
        nodes.add(root);
        pushTreeNodes(root.right, nodes);
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
        root.left = buildBalancedBST(nodes, start, mid - 1);
        root.right = buildBalancedBST(nodes, mid + 1, end);

        // return root node
        return root;
    }

    // Function to construct a height-balanced BST from an unbalanced BST
    public static Node constructBalancedBST(Node root)
    {
        // Push nodes of a given binary search tree into a list in sorted order
        List<Node> nodes = new ArrayList<>();
        pushTreeNodes(root, nodes);

        // Construct a height-balanced BST from sorted BST nodes
        return buildBalancedBST(nodes, 0, nodes.size() - 1);
    }

    public static void main(String[] args)
    {
        Node root = new Node(20);
        root.left = new Node(15);
        root.left.left = new Node(10);
        root.left.left.left = new Node(5);
        root.left.left.left.left = new Node(2);
        root.left.left.left.right = new Node(8);

        root = constructBalancedBST(root);

        System.out.print("Preorder traversal of the constructed BST is ");
        preorder(root);
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

# Function to perform the preorder traversal on a BST
def preorder(root):

    if root is None:
        return

    print(root.data, end=' ')
    preorder(root.left)
    preorder(root.right)

# Recursive function to push nodes of a given binary search tree into a
# list in an inorder fashion
def pushTreeNodes(root, nodes):

    # base case
    if root is None:
        return

    pushTreeNodes(root.left, nodes)
    nodes.append(root)
    pushTreeNodes(root.right, nodes)

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
    root.left = buildBalancedBST(nodes, start, mid - 1)
    root.right = buildBalancedBST(nodes, mid + 1, end)

    # return root node
    return root

# Function to construct a height-balanced BST from an unbalanced BST
def constructBalancedBST(root):

    # Push nodes of a given binary search tree into a list in sorted order
    nodes = []
    pushTreeNodes(root, nodes)

    # Construct a height-balanced BST from sorted BST nodes
    return buildBalancedBST(nodes, 0, len(nodes) - 1)

if __name__ == '__main__':

    root = Node(20)
    root.left = Node(15)
    root.left.left = Node(10)
    root.left.left.left = Node(5)
    root.left.left.left.left = Node(2)
    root.left.left.left.right = Node(8)

    root = constructBalancedBST(root)

    print('Preorder traversal of the constructed BST is ', end='')
    preorder(root)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST. However, the program requires O(n) extra space for storing the BST nodes.

We can do the conversion [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) without any auxiliary data structure. The idea is to convert the given BST into a sorted doubly linked list and then construct a height-balanced BST from it. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node *left, *right;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Helper function to perform the preorder traversal on a BST
void preorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    preorder(root->left);
    cout << root->data << " ";
    preorder(root->right);
}

// Function to insert a BST node at the front of a doubly linked list
void push(Node* root, Node*& headRef)
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
    Recursive function to construct a sorted doubly linked list from a BST
    root —> Pointer to the root node of the binary search tree
    headRef —> Reference to the head node of the doubly linked list
    n —> Stores the total number of nodes processed so far in the BST
*/
void convertBSTtoSortedDLL(Node* root, Node*& headRef, int &n)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // recursively convert the right subtree
    convertBSTtoSortedDLL(root->right, headRef, n);

    // push the current node at the front of the doubly linked list
    push(root, headRef);

    // recursively convert the left subtree
    convertBSTtoSortedDLL(root->left, headRef, ++n);
}

/*
    Recursive function to construct a height-balanced BST from a doubly linked list
    headRef —> Reference to the head node of the doubly linked list
    n —> Total number of nodes in the doubly linked list
*/
Node* convertSortedDLLToBST(Node* &headRef, int n)
{
    // base case
    if (n <= 0) {
        return nullptr;
    }

    // recursively construct the left subtree
    Node* leftSubTree = convertSortedDLLToBST(headRef, n/2);

    // `headRef` now points to the middle node of the sorted DDL

    // make the middle node of the sorted DDL as the root node of the BST
    Node* root = headRef;

    // update left child of the root node
    root->left = leftSubTree;

    // update the head reference of the doubly linked list
    headRef = headRef->right;

    // recursively construct the right subtree with the remaining nodes
    root->right = convertSortedDLLToBST(headRef, n - (n/2 + 1));
                                                /* +1 for the root node */

    // return the root node
    return root;
}

// Function to construct a height-balanced BST from an unbalanced BST
void constructBalancedBST(Node* &root)
{
    // pointer to the head node of the doubly linked list
    Node* head = nullptr;

    // convert the given BST into a sorted doubly linked list and update the counter
    // with the total number of nodes in the BST
    int counter = 0;
    convertBSTtoSortedDLL(root, head, counter);

    // construct a height-balanced BST from the sorted doubly linked list
    root = convertSortedDLLToBST(head, counter);
}

int main()
{
    Node* root = new Node(20);
    root->left = new Node(15);
    root->left->left = new Node(10);
    root->left->left->left = new Node(5);
    root->left->left->left->left = new Node(2);
    root->left->left->left->right = new Node(8);

    constructBalancedBST(root);

    cout << "Preorder traversal of the constructed BST is ";
    preorder(root);

    return 0;
}
```

**Output:** Preorder traversal of the constructed BST is 2 5 8 10 15 20

##

```java
import java.util.concurrent.atomic.AtomicInteger;

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
    // Wrapper over `Node` class
    static class NodeWrapper
    {
        public Node node;

        NodeWrapper(Node node) {
            this.node = node;
        }
    }

    // Helper function to perform the preorder traversal on a BST
    public static void preorder (Node root)
    {
        if (root == null) {
            return;
        }

        preorder(root.left);
        System.out.print(root.data + " ");
        preorder(root.right);
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

    /*
    Recursive function to construct a sorted doubly linked list from a BST
        root —> Pointer to the root node of the binary search tree
        head —> Reference to the head node of the doubly linked list
        nodes —> Stores the total number of nodes processed so far in the BST
    */
    public static Node convertBSTtoSortedDLL(Node root, Node head, AtomicInteger nodes)
    {
        // base case
        if (root == null) {
            return head;
        }

        // recursively convert the right subtree
        head = convertBSTtoSortedDLL(root.right, head, nodes);

        // push the current node at the front of the doubly linked list
        head = push(root, head);

        // increment the number of nodes
        nodes.incrementAndGet();

        // recursively convert the left subtree
        head = convertBSTtoSortedDLL(root.left, head, nodes);

        return head;
    }

    /*
    Recursive function to construct a height-balanced BST from a doubly linked list
        head —> Reference to the head node of the doubly linked list
        n    —> Total number of nodes in the doubly linked list
    */
    public static Node convertSortedDLLToBST(NodeWrapper head, int n)
    {
        // base case
        if (n <= 0) {
            return null;
        }

        // recursively construct the left subtree
        Node leftSubTree = convertSortedDLLToBST(head, n/2);

        // `head` now points to the middle node of the sorted DDL

        // make the middle node of the sorted DDL as the root node of the BST
        Node root = head.node;

        // update left child of the root node
        root.left = leftSubTree;

        // update the head reference of the doubly linked list
        head.node = head.node.right;

        // recursively construct the right subtree with the remaining nodes
        root.right = convertSortedDLLToBST(head, n - (n/2 + 1));
                                                /* +1 for the root node */

        // return the root node
        return root;
    }

    // Function to construct a height-balanced BST from an unbalanced BST
    public static Node constructBalancedBST(Node root)
    {
        // pointer to the head node of the doubly linked list
        Node head = null;

        /* Convert the given BST into a sorted doubly linked list and update the
            counter with the total number of nodes in the BST */

        // `AtomicInteger` is used here since `Integer` is passed by value in Java
        AtomicInteger nodes = new AtomicInteger(0);

        head = convertBSTtoSortedDLL(root, head, nodes);

        /* Construct a height-balanced BST from the sorted doubly linked list */

        // wrap the `head` node, so its reference can be changed inside the
        // `convertSortedDLLToBST()`
        root = convertSortedDLLToBST(new NodeWrapper(head), nodes.get());

        return root;
    }

    public static void main(String[] args)
    {
        Node root = new Node(20);
        root.left = new Node(15);
        root.left.left = new Node(10);
        root.left.left.left = new Node(5);
        root.left.left.left.left = new Node(2);
        root.left.left.left.right = new Node(8);

        root = constructBalancedBST(root);

        System.out.print("Preorder traversal of the constructed BST is ");
        preorder(root);
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

# Helper function to perform the preorder traversal on a BST
def preorder(root):
    if root is None:
        return
    preorder(root.left)
    print(root.data, end=' ')
    preorder(root.right)

# Function to insert a BST node at the front of a doubly linked list
def push(root, head):

    # insert the given node at the front of a DDL
    root.right = head

    # update the left child of the existing head node of the DDL
    # to point to the BST node
    if head is not None:
        head.left = root

    # update the head pointer of DDL
    head = root
    return head

'''
Recursive function to construct a sorted doubly linked list from a BST
    root —> Pointer to the root node of the binary search tree
    head —> Reference to the head node of the doubly linked list
    nodes —> Stores the total number of nodes processed so far in the BST
'''
def convertBSTtoSortedDLL(root, head, nodes=0):

    # base case
    if root is None:
        return head, nodes

    # recursively convert the right subtree
    head, nodes = convertBSTtoSortedDLL(root.right, head, nodes)

    # push the current node at the front of the doubly linked list
    head = push(root, head)

    # increment the number of nodes
    nodes = nodes + 1

    # recursively convert the left subtree
    head, nodes = convertBSTtoSortedDLL(root.left, head, nodes)

    return head, nodes

'''
Recursive function to construct a height-balanced BST from a doubly linked list
    head —> Reference to the head node of the doubly linked list
    n —> Total number of nodes in the doubly linked list
'''
def convertSortedDLLToBST(head, n):

    # base case
    if n <= 0:
        return None, head

    # recursively construct the left subtree
    leftSubTree, head = convertSortedDLLToBST(head, n // 2)

    # `head` now points to the middle node of the sorted DDL

    # make the middle node of the sorted DDL as the root node of the BST
    root = head

    # update left child of the root node
    root.left = leftSubTree

    # update the head reference of the doubly linked list
    head = head.right

    # recursively construct the right subtree with the remaining nodes
    root.right, head = convertSortedDLLToBST(head, n - (n // 2 + 1))
                                                    # +1 for root Node

    # return the root node
    return root, head

# Function to construct a height-balanced BST from an unbalanced BST
def constructBalancedBST(root):

    # pointer to the head node of the doubly linked list
    head = None

    # convert the given BST into a sorted doubly linked list
    head, nodes = convertBSTtoSortedDLL(root, head)

    # construct a height-balanced BST from the sorted doubly linked list
    root, head = convertSortedDLLToBST(head, nodes)

    return root

if __name__ == '__main__':

    root = Node(20)
    root.left = Node(15)
    root.left.left = Node(10)
    root.left.left.left = Node(5)
    root.left.left.left.left = Node(2)
    root.left.left.left.right = Node(8)

    root = constructBalancedBST(root)

    print('Preorder traversal of the constructed BST is', end=' ')
    preorder(root)
```
