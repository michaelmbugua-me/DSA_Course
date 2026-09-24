# Print nodes of a binary tree in vertical order

> Source: https://www.techiedelight.com/print-nodes-binary-tree-vertical-order/

Given a binary tree, print its nodes in vertical order. Assume that the left and right child of a node makes a 45–degree angle with the parent.

For example, nodes in vertical order for following binary tree is

2, 7 1, 5 3, 8 6

> 

We have seen [hash table](https://techiedelight.com/hashing-in-data-structure/) implementation in the [previous post](https://techiedelight.com/vertical-traversal-binary-tree/), which takes O(n.log(n)) time for a binary tree with `n` nodes. We can improve the time complexity of the above solution to linear with an auxiliary data structure such as a doubly-linked list. The idea is to store the vertical order of the binary tree in a doubly-linked list, where each node of the doubly linked list stores every node corresponding to a vertical line in a binary tree. This post provides an overview of some available alternatives to accomplish this using a doubly-linked list.

## 1\. Using Preorder traversal

We start by constructing a doubly linked list node that stores all nodes present at the vertical line passing through the root node. Then `node->prev` and `node->next` will correspond to nodes present at the vertical line passing through the root node’s left and right child, respectively. The trick is to recursively construct the linked list and add nodes to it as we traverse the tree using [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a binary tree node
struct TreeNode
{
    int data;
    TreeNode *left, *right;

    TreeNode(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// A Doubly Linked List Node
struct ListNode
{
    vector<int> data;
    ListNode *prev, *next;

    ListNode(int data, ListNode* prev, ListNode* next)
    {
        (this->data).push_back(data);
        this->prev = prev;
        this->next = next;
    }

    ListNode(ListNode* prev, ListNode* next)
    {
        this->prev = prev;
        this->next = next;
    }
};

// Function to print the vertical order stored in a given doubly linked list
void print(ListNode* mid)
{
    // find the head node
    while (mid && mid->prev) {
        mid = mid->prev;
    }

    // start with the head node
    ListNode* head = mid;
    while (head)
    {
        for (int i: head->data) {
            cout << i << ' ';
        }
        cout << endl;
        head = head->next;
    }
}

// Recursive function to perform preorder traversal on the tree and
// determine the vertical order of the given binary tree.
// Each node of the doubly linked list will store nodes present at the
// corresponding vertical line in a binary tree.
void updateDLLwithVerticalOrder(TreeNode* root, ListNode* curr)
{
    // base case
    if (!root) {
        return;
    }

    // add the current tree node to the corresponding list node
    curr->data.push_back(root->data);

    // create a new linked list node corresponding to the vertical line passing
    // through the root's left child, if not already.
    // This node would become the `prev` pointer of the current list node
    if (root->left && !curr->prev) {
        curr->prev = new ListNode(nullptr, curr);
    }

    // create a new linked list node corresponding to the vertical line passing
    // through the root's right child, if not already.
    // This node would become the `next` pointer of the current list node
    if (root->right && !curr->next) {
        curr->next = new ListNode(curr, nullptr);
    }

    // recur for the left and right subtree
    updateDLLwithVerticalOrder(root->left, curr->prev);
    updateDLLwithVerticalOrder(root->right, curr->next);
}

// Function to print nodes of a given binary tree in vertical order
void printVertical(TreeNode* root)
{
    // create a new linked list node corresponding to the vertical line passing
    // through the root node
    ListNode* curr = new ListNode(nullptr, nullptr);

    // determine the vertical order and store it in a doubly-linked list
    updateDLLwithVerticalOrder(root, curr);

    // print the linked list
    print(curr);
}

int main()
{
    /* Construct the following tree
              1
            /   \
           /     \
          2       3
                /   \
               /     \
              5       6
            /   \
           /     \
          7       8
                /   \
               /     \
              9      10
    */

    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->right->left = new TreeNode(5);
    root->right->right = new TreeNode(6);
    root->right->left->left = new TreeNode(7);
    root->right->left->right = new TreeNode(8);
    root->right->left->right->left = new TreeNode(9);
    root->right->left->right->right = new TreeNode(10);

    printVertical(root);

    return 0;
}
```

**Output:** 2 7 1 5 9 3 8 10 6

##

```java
import java.util.ArrayList;
import java.util.List;

// Data structure to store a binary tree node
class TreeNode
{
    int data;
    TreeNode left, right;

    TreeNode(int data)
    {
        this.data = data;
        this.left = this.right = null;
    }
}

// A Doubly Linked List Node
class ListNode
{
    List<Integer> data = new ArrayList<>();
    ListNode prev, next;

    ListNode(ListNode prev, ListNode next)
    {
        this.prev = prev;
        this.next = next;
    }
}

class Main
{
    // Function to print the vertical order stored in a given doubly linked list
    public static void print(ListNode mid)
    {
        // find the head node
        while (mid != null && mid.prev != null) {
            mid = mid.prev;
        }

        // start with the head node
        ListNode head = mid;
        while (head != null)
        {
            System.out.println(head.data);
            head = head.next;
        }
    }

    // Recursive function to perform preorder traversal on the tree and determine
    // the vertical order of a given binary tree.
    // Each node of the doubly linked list will store nodes present at the
    // corresponding vertical line in a binary tree.
    public static void updateDLLwithVerticalOrder(TreeNode root, ListNode curr)
    {
        // base case
        if (root == null) {
            return;
        }

        // add the current tree node to the corresponding list node
        curr.data.add(root.data);

        // create a new linked list node corresponding to the vertical line passing
        // through the root's left child, if not already.
        // This node would become the `prev` pointer of the current list node
        if (root.left != null && curr.prev == null) {
            curr.prev = new ListNode(null, curr);
        }

        // create a new linked list node corresponding to the vertical line passing
        // through the root's right child, if not already.
        // This node would become the `next` pointer of the current list node
        if (root.right != null && curr.next == null) {
            curr.next = new ListNode(curr, null);
        }

        // recur for the left and right subtree
        updateDLLwithVerticalOrder(root.left, curr.prev);
        updateDLLwithVerticalOrder(root.right, curr.next);
    }

    // Function to print nodes of a given binary tree in vertical order
    public static void printVertical(TreeNode root)
    {
        // create a new linked list node corresponding to the vertical line passing
        // through the root node
        ListNode curr = new ListNode(null, null);

        // determine the vertical order and store it in a doubly-linked list
        updateDLLwithVerticalOrder(root, curr);

        // print the linked list
        print(curr);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
               /     \
              2       3
                    /   \
                   /     \
                  5       6
                /   \
               /     \
              7       8
                    /   \
                   /     \
                  9      10
        */

        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.right.left = new TreeNode(5);
        root.right.right = new TreeNode(6);
        root.right.left.left = new TreeNode(7);
        root.right.left.right = new TreeNode(8);
        root.right.left.right.left = new TreeNode(9);
        root.right.left.right.right = new TreeNode(10);

        printVertical(root);
    }
}
```

##

```python3
# Data structure to store a binary tree node
class TreeNode:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# A Doubly Linked List Node
class ListNode:
    def __init__(self, prev=None, next=None):
        self.data = []
        self.prev = prev
        self.next = next

# Function to print the vertical order stored in a given doubly linked list
def printList(mid):

    # find the head node
    while mid and mid.prev:
        mid = mid.prev

    # start with the head node
    head = mid
    while head:
        print(head.data)
        head = head.next

# Recursive function to perform preorder traversal on the tree and determine the
# vertical order of a given binary tree.
# Each node of the doubly linked list will store nodes present at the corresponding
# vertical line in a binary tree.
def updateDLLwithVerticalOrder(root, curr):

    # base case
    if root is None:
        return

    # add the current tree node to the corresponding list node
    curr.data.append(root.data)

    # create a new linked list node corresponding to the vertical line passing
    # through the root's left child, if not already.
    # This node would become the `prev` pointer of the current list node
    if root.left and curr.prev is None:
        curr.prev = ListNode(None, curr)

    # create a new linked list node corresponding to the vertical line passing
    # through the root's right child, if not already.
    # This node would become the `next` pointer of the current list node
    if root.right and curr.next is None:
        curr.next = ListNode(curr, None)

    # recur for the left and right subtree
    updateDLLwithVerticalOrder(root.left, curr.prev)
    updateDLLwithVerticalOrder(root.right, curr.next)

# Function to print nodes of a given binary tree in vertical order
def printVertical(root):

    # create a new linked list node corresponding to the vertical line passing
    # through the root node
    curr = ListNode()

    # determine the vertical order and store it in a doubly-linked list
    updateDLLwithVerticalOrder(root, curr)

    # print the linked list
    printList(curr)

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
                /   \
               /     \
              5       6
            /   \
           /     \
          7       8
                /   \
               /     \
              9      10
    '''

    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.right.left = TreeNode(5)
    root.right.right = TreeNode(6)
    root.right.left.left = TreeNode(7)
    root.right.left.right = TreeNode(8)
    root.right.left.right.left = TreeNode(9)
    root.right.left.right.right = TreeNode(10)

    printVertical(root)
```

## 2\. Using Level Order Traversal

Since the above solution uses preorder traversal to traverse the tree, the nodes might not get processed in the same order as they appear in the binary tree from top to bottom. For instance, node 10 get printed before node 6 in the above solution.

We can perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) to ensure that nodes are processed in the same order as they appear in the binary tree. The idea remains the same as the previous approach, except we traverse the binary tree using level order traversal instead of the preorder traversal. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

// Data structure to store a binary tree node
struct TreeNode
{
    int data;
    TreeNode *left, *right;

    TreeNode(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// A Doubly Linked List Node
struct ListNode
{
    vector<int> data;
    ListNode *prev, *next;

    ListNode(int data, ListNode* prev, ListNode* next)
    {
        (this->data).push_back(data);
        this->prev = prev;
        this->next = next;
    }

    ListNode(ListNode* prev, ListNode* next)
    {
        this->prev = prev;
        this->next = next;
    }
};

// Function to print the vertical order stored in a given doubly linked list
void print(ListNode* mid)
{
    // find the head node
    while (mid && mid->prev) {
        mid = mid->prev;
    }

    // start with the head node
    ListNode* head = mid;
    while (head)
    {
        for (int i: head->data) {
            cout << i << ' ';
        }
        cout << endl;
        head = head->next;
    }
}

// Function to perform level order traversal on the tree and determine
// the vertical order of a given binary tree.
// Each node of the doubly linked list will store nodes present at the
// corresponding vertical line in a binary tree.
void updateDLLwithVerticalOrder(TreeNode* root, ListNode* curr)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // create an empty queue for level order traversal and
    // enqueue root node with its corresponding linked list node
    queue<pair<TreeNode*, ListNode*>> q;
    q.push(make_pair(root, curr));

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node
        TreeNode* node = q.front().first;   // tree node
        ListNode* curr = q.front().second;  // list node
        q.pop();

        // push the value of the current tree node into the corresponding list node
        curr->data.push_back(node->data);

        // process non-empty left child
        if (node->left)
        {
            // create a new linked list node corresponding to the vertical line passing
            // through the node's left child, if not already.
            // This node would become the `prev` pointer of the current list node
            if (!curr->prev) {
                curr->prev = new ListNode(nullptr, curr);
            }

            // enqueue left child with its corresponding linked list node
            q.push(make_pair(node->left, curr->prev));
        }

        // process non-empty right child
        if (node->right)
        {
            // create a new linked list node corresponding to the vertical line passing
            // through the node's right child, if not already.
            // This node would become the `next` pointer of the current list node
            if (!curr->next) {
                curr->next = new ListNode(curr, nullptr);
            }

            // enqueue right child with its corresponding linked list node
            q.push(make_pair(node->right, curr->next));
        }
    }
}

// Function to print nodes of a given binary tree in vertical order
void printVertical(TreeNode* root)
{
    // create a new linked list node corresponding to the vertical line passing
    // through the root node
    ListNode* curr = new ListNode(nullptr, nullptr);

    // determine vertical order and store it in a doubly-linked list
    updateDLLwithVerticalOrder(root, curr);

    // print the linked list
    print(curr);
}

int main()
{
    /* Construct the following tree
              1
            /   \
           /     \
          2       3
                /   \
               /     \
              5       6
            /   \
           /     \
          7       8
                /   \
               /     \
              9      10
    */

    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->right->left = new TreeNode(5);
    root->right->right = new TreeNode(6);
    root->right->left->left = new TreeNode(7);
    root->right->left->right = new TreeNode(8);
    root->right->left->right->left = new TreeNode(9);
    root->right->left->right->right = new TreeNode(10);

    printVertical(root);

    return 0;
}
```

**Output:** 2 7 1 5 9 3 8 6 10

##

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

// Data structure to store a binary tree node
class TreeNode
{
    int data;
    TreeNode left, right;

    TreeNode(int data)
    {
        this.data = data;
        this.left = this.right = null;
    }
}

// A Doubly Linked List Node
class ListNode
{
    List<Integer> data = new ArrayList<>();
    ListNode prev, next;

    ListNode(ListNode prev, ListNode next)
    {
        this.prev = prev;
        this.next = next;
    }
}

// A Pair class
class Pair<U, V>
{
    public final U first;       // first field of a pair
    public final V second;      // second field of a pair

    // Constructs a new Pair with specified values
    private Pair(U first, V second)
    {
        this.first = first;
        this.second = second;
    }

    // Factory method for creating a Typed Pair immutable instance
    public static <U, V> Pair <U, V> of(U a, V b)
    {
        // calls private constructor
        return new Pair<>(a, b);
    }
}

class Main
{
    // Function to print the vertical order stored in a given doubly linked list
    public static void print(ListNode mid)
    {
        // find the head node
        while (mid != null && mid.prev != null) {
            mid = mid.prev;
        }

        // start with the head node
        ListNode head = mid;
        while (head != null)
        {
            System.out.println(head.data);
            head = head.next;
        }
    }

    // Function to perform level order traversal on the tree and determine
    // the vertical order of a given binary tree.
    // Each node of the doubly linked list will store nodes present at the
    // corresponding vertical line in a binary tree.
    public static void updateDLLwithVerticalOrder(TreeNode root, ListNode curr)
    {
        // base case
        if (root == null) {
            return;
        }

        // create an empty queue for level order traversal and
        // enqueue root node with its corresponding linked list node
        Queue<Pair<TreeNode, ListNode>> q = new ArrayDeque<>();
        q.add(Pair.of(root, curr));

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node
            TreeNode node = q.peek().first;     // tree node
            curr = q.peek().second;             // list node
            q.poll();

            // push the value of the current tree node into the corresponding list node
            curr.data.add(node.data);

            // process non-empty left child
            if (node.left != null)
            {
                // create a new linked list node corresponding to the vertical line
                // passing through the node's left child, if not already.
                // This node would become the `prev` pointer of the current list node
                if (curr.prev == null) {
                    curr.prev = new ListNode(null, curr);
                }

                // enqueue left child with its corresponding linked list node
                q.add(Pair.of(node.left, curr.prev));
            }

            // process non-empty right child
            if (node.right != null)
            {
                // create a new linked list node corresponding to the vertical line
                // passing through the node's right child, if not already.
                // This node would become the `next` pointer of the current list node
                if (curr.next == null) {
                    curr.next = new ListNode(curr, null);
                }

                // enqueue right child with its corresponding linked list node
                q.add(Pair.of(node.right, curr.next));
            }
        }
    }

    // Function to print nodes of a given binary tree in vertical order
    public static void printVertical(TreeNode root)
    {
        // create a new linked list node corresponding to the vertical line passing
        // through the root node
        ListNode curr = new ListNode(null, null);

        // determine vertical order and store it in a doubly-linked list
        updateDLLwithVerticalOrder(root, curr);

        // print the linked list
        print(curr);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
               /     \
              2       3
                    /   \
                   /     \
                  5       6
                /   \
               /     \
              7       8
                    /   \
                   /     \
                  9      10
        */

        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.right.left = new TreeNode(5);
        root.right.right = new TreeNode(6);
        root.right.left.left = new TreeNode(7);
        root.right.left.right = new TreeNode(8);
        root.right.left.right.left = new TreeNode(9);
        root.right.left.right.right = new TreeNode(10);

        printVertical(root);
    }
}
```

##

```python3
from collections import deque

# Data structure to store a binary tree node
class TreeNode:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# A Doubly Linked List Node
class ListNode:
    def __init__(self, prev=None, next=None):
        self.data = []
        self.prev = prev
        self.next = next

# Function to print the vertical order stored in a given doubly linked list
def printList(mid):

    # find the head node
    while mid and mid.prev:
        mid = mid.prev

    # start with the head node
    head = mid
    while head:
        print(head.data)
        head = head.next

# Function to perform level order traversal on the tree and determine the
# vertical order of a given binary tree.
# Each node of the doubly linked list will store nodes present at the corresponding
# vertical line in a binary tree.
def updateDLLwithVerticalOrder(root, curr):

    # base case
    if root is None:
        return

    # create an empty queue for level order traversal and
    # enqueue root node with its corresponding linked list node
    q = deque()
    q.append((root, curr))

    # loop till queue is empty
    while q:

        # dequeue front node
        node, curr = q.popleft()

        # push the value of the current tree node into the corresponding list node
        curr.data.append(node.data)

        # process non-empty left child
        if node.left:
            # create a new linked list node corresponding to the vertical line passing
            # through the node's left child, if not already.
            # This node would become the `prev` pointer of the current list node
            if curr.prev is None:
                curr.prev = ListNode(None, curr)

            # enqueue left child with its corresponding linked list node
            q.append((node.left, curr.prev))

        # process non-empty right child
        if node.right:
            # create a new linked list node corresponding to the vertical line passing
            # through the node's right child, if not already.
            # This node would become the `next` pointer of the current list node
            if curr.next is None:
                curr.next = ListNode(curr, None)

            # enqueue right child with its corresponding linked list node
            q.append((node.right, curr.next))

# Function to print nodes of a given binary tree in vertical order
def printVertical(root):

    # create a new linked list node corresponding to the vertical line passing
    # through the root node
    curr = ListNode()

    # determine vertical order and store it in a doubly-linked list
    updateDLLwithVerticalOrder(root, curr)

    # print the linked list
    printList(curr)

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
                /   \
               /     \
              5       6
            /   \
           /     \
          7       8
                /   \
               /     \
              9      10
    '''

    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.right.left = TreeNode(5)
    root.right.right = TreeNode(6)
    root.right.left.left = TreeNode(7)
    root.right.left.right = TreeNode(8)
    root.right.left.right.left = TreeNode(9)
    root.right.left.right.right = TreeNode(10)

    printVertical(root)
```

The time complexity of both above-discussed methods is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space used is O(n) for a doubly linked list.
