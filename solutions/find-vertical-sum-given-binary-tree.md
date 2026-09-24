# Find the vertical sum of a binary tree

> Source: https://www.techiedelight.com/find-vertical-sum-given-binary-tree/

Given a binary tree, the print vertical sum of it. Assume the left and right child of a node makes a 45–degree angle with the parent.

For example, the vertical sum is shown in the following binary tree:

> 

## 1\. Using Hashing

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to create an empty map where each key represents the relative horizontal distance of a node from the root node, and the value in the map maintains the sum of all nodes present at the same horizontal distance. Then perform [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree, and update the sum for the current horizontal distance in the map. For each node, recur for its left subtree by decreasing horizontal distance by one, and recur for the right subtree by increasing horizontal distance by one.

The following figure shows the horizontal distance and level of each node in the above binary tree. The final values in the map will be:

(horizontal distance —> vertical sum) -1 —> 9 0 —> 6 1 —> 11 2 —> 6

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <map>
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

// Recursive function to perform preorder traversal on the tree and fill the map.
// Here, the node has `dist` horizontal distance from the tree's root
void printVerticalSum(Node* root, int dist, auto &map)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // update the map
    map[dist] += root->data;

    // recur for the left subtree by decreasing horizontal distance by 1
    printVerticalSum(root->left, dist - 1, map);

    // recur for the right subtree by increasing horizontal distance by 1
    printVerticalSum(root->right, dist + 1, map);
}

// Function to print the vertical sum of a given binary tree
void printVerticalSum(Node* root)
{
    // create an empty map where
    // key —> relative horizontal distance of the node from the root node, and
    // value —> sum of all nodes present at the same horizontal distance
    map<int, int> map;

    // perform preorder traversal on the tree and fill the map
    printVerticalSum(root, 0, map);

    // traverse the map and print the vertical sum
    for (auto it: map) {
        cout << it.second << " ";
    }
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
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    printVerticalSum(root);

    return 0;
}
```

**Output:** 9 6 11 6

##

```java
import java.util.Map;
import java.util.TreeMap;

// Data structure to store a binary tree node
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
    // Recursive function to perform preorder traversal on the tree and fill the map.
    // Here, the node has `dist` horizontal distance from the tree's root
    public static void printVerticalSum(Node root, int dist, Map<Integer, Integer> map)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }

        // update the map
        map.put(dist, map.getOrDefault(dist, 0) + root.key);

        // recur for the left subtree by decreasing horizontal distance by 1
        printVerticalSum(root.left, dist - 1, map);

        // recur for the right subtree by increasing horizontal distance by 1
        printVerticalSum(root.right, dist + 1, map);
    }

    // Function to print the vertical sum of a given binary tree
    public static void printVerticalSum(Node root)
    {
        // create an empty `TreeMap` where
        // key —> relative horizontal distance of the node from the root node, and
        // value —> sum of all nodes present at the same horizontal distance
        Map<Integer, Integer> map = new TreeMap<>();

        // perform preorder traversal on the tree and fill the map
        printVerticalSum(root, 0, map);

        // print vertical sum
        System.out.println(map.values());
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
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        printVerticalSum(root);
    }
}
```

##

```python3
# Data structure to store a binary tree node
class Node:
    def __init__(self, key=None, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Recursive function to perform preorder traversal on the tree and fill the dictionary.
# Here, the node has `dist` horizontal distance from the tree's root
def printVerticalSum(root, dist, d):

    # base case: empty tree
    if not root:
        return

    # update the dictionary
    d[dist] = d.get(dist, 0) + root.key

    # recur for the left subtree by decreasing horizontal distance by 1
    printVerticalSum(root.left, dist - 1, d)

    # recur for the right subtree by increasing horizontal distance by 1
    printVerticalSum(root.right, dist + 1, d)

# Function to print the vertical sum of a given binary tree
def printVertical(root):

    # create an empty dictionary where
    # key —> relative horizontal distance of the node from the root node, and
    # value —> sum of all nodes present at the same horizontal distance
    d = {}

    # perform preorder traversal on the tree and fill the dictionary
    printVerticalSum(root, 0, d)

    # traverse the dictionary in sorted order of their keys
    # and print vertical sum
    for key in sorted(d.keys()):
        print(d.get(key), end=' ')

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
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    printVertical(root)
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:** Reduce time complexity to linear using `std::unordered_map`/`HashMap`.

## 2\. Using Auxiliary Data Structure

We can improve the time complexity of the above solution to linear by using a doubly-linked list data structure. The idea is to store the vertical sum of the binary tree in a doubly-linked list, where each node of the doubly linked list stores the sum of all nodes corresponding to a vertical line in a binary tree.

We start by constructing a doubly linked list node that stores the sum of nodes present at the vertical line passing through the root node. Then `node->prev` and `node->next` will correspond to the sum of nodes present at the vertical line passing through the root node’s left and right child, respectively. The trick is to recursively construct the linked list and update nodes with the vertical sums as we traverse the tree.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
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
    int data;
    ListNode *prev, *next;

    ListNode(int data, ListNode* prev, ListNode* next)
    {
        this->data = data;
        this->prev = prev;
        this->next = next;
    }
};

// Function to print the vertical sum stored in a given doubly linked list
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
        cout << head->data << " ";
        head = head->next;
    }
}

// Recursive function to perform preorder traversal on the tree and calculate
// the vertical sum of the given binary tree.
// Each node of the doubly linked list will store the sum of tree nodes at
// the corresponding vertical line in a binary tree.
void updateDLLwithVerticalSum(TreeNode* root, ListNode* curr)
{
    // base case
    if (!root) {
        return;
    }

    // update the linked list node data corresponding to the vertical line
    // passing through the current tree node
    curr->data += root->data;

    // create a new linked list node corresponding to the vertical line
    // passing through the root's left child, if not already.
    // This node would be the `prev` pointer of the current list node

    if (root->left && !curr->prev) {
        curr->prev = new ListNode(0, nullptr, curr);
    }

    // create a new linked list node corresponding to the vertical line
    // passing through the root's right child, if not already.
    // This node would be the next pointer of the current list node

    if (root->right && !curr->next) {
        curr->next = new ListNode(0, curr, nullptr);
    }

    // recur for the left and right subtree
    updateDLLwithVerticalSum(root->left, curr->prev);
    updateDLLwithVerticalSum(root->right, curr->next);
}

// Function to find and print the vertical sum of a given binary tree
void printVerticalSum(TreeNode* root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // create a new linked list node corresponding to the vertical line
    // passing through the root node
    ListNode* curr = new ListNode(0, nullptr, nullptr);

    // calculate vertical sum and store it in a doubly-linked list
    updateDLLwithVerticalSum(root, curr);

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
    */

    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->right->left = new TreeNode(5);
    root->right->right = new TreeNode(6);
    root->right->left->left = new TreeNode(7);
    root->right->left->right = new TreeNode(8);

    printVerticalSum(root);

    return 0;
}
```

**Output:** 9 6 11 6

##

```java
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
    int data;
    ListNode prev, next;

    ListNode(int data, ListNode prev, ListNode next)
    {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class Main
{
    // Function to print the vertical sum stored in a given doubly linked list
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
            System.out.print(head.data + " ");
            head = head.next;
        }
    }

    // Recursive function to perform preorder traversal on the tree and calculate
    // the vertical sum of the given binary tree.
    // Each node of the doubly linked list will store the sum of tree nodes at
    // the corresponding vertical line in a binary tree.
    public static void updateDLLwithVerticalSum(TreeNode root, ListNode curr)
    {
        // base case
        if (root == null) {
            return;
        }

        // update the linked list node data corresponding to the vertical line
        // passing through the current tree node
        curr.data += root.data;

        // create a new linked list node corresponding to the vertical line
        // passing through the root's left child, if not already.
        // This node would be the `prev` pointer of the current list node

        if (root.left != null && curr.prev == null) {
            curr.prev = new ListNode(0, null, curr);
        }

        // create a new linked list node corresponding to the vertical line
        // passing through the root's right child, if not already.
        // This node would be the next pointer of the current list node

        if (root.right != null && curr.next == null) {
            curr.next = new ListNode(0, curr, null);
        }

        // recur for the left and right subtree
        updateDLLwithVerticalSum(root.left, curr.prev);
        updateDLLwithVerticalSum(root.right, curr.next);
    }

    // Function to find and print the vertical sum of a given binary tree
    public static void printVerticalSum(TreeNode root)
    {
        // base case
        if (root == null) {
            return;
        }

        // create a new linked list node corresponding to the vertical line
        // passing through the root node
        ListNode curr = new ListNode(0, null, null);

        // calculate vertical sum and store it in a doubly-linked list
        updateDLLwithVerticalSum(root, curr);

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
        */

        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.right.left = new TreeNode(5);
        root.right.right = new TreeNode(6);
        root.right.left.left = new TreeNode(7);
        root.right.left.right = new TreeNode(8);

        printVerticalSum(root);
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
    def __init__(self, data, prev, next):
        self.data = data
        self.prev = prev
        self.next = next

# Function to print the vertical sum stored in a given doubly linked list
def printList(mid):

    # find the head node
    while mid and mid.prev:
        mid = mid.prev

    # start with the head node
    head = mid
    while head:
        print(head.data, end=' ')
        head = head.next

# Recursive function to perform preorder traversal on the tree and calculate
# the vertical sum of the given binary tree.
# Each node of the doubly linked list will store the sum of tree nodes at
# the corresponding vertical line in a binary tree.
def updateDLLwithVerticalSum(root, curr):

    # base case
    if not root:
        return

    # update the linked list node data corresponding to the vertical line
    # passing through the current tree node
    curr.data += root.data

    # create a new linked list node corresponding to the vertical line passing
    # through the root's left child, if not already.
    # This node would be the `prev` pointer of the current list node

    if root.left and curr.prev is None:
        curr.prev = ListNode(0, None, curr)

    # create a new linked list node corresponding to the vertical line passing
    # through the root's right child, if not already.
    # This node would be the next pointer of the current list node

    if root.right and curr.next is None:
        curr.next = ListNode(0, curr, None)

    # recur for the left and right subtree
    updateDLLwithVerticalSum(root.left, curr.prev)
    updateDLLwithVerticalSum(root.right, curr.next)

# Function to find and print the vertical sum of a given binary tree
def printVerticalSum(root):

    # base case
    if not root:
        return

    # create a new linked list node corresponding to the vertical line passing
    # through the root node
    curr = ListNode(0, None, None)

    # calculate the vertical sum and store it in a doubly-linked list
    updateDLLwithVerticalSum(root, curr)

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
    '''

    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.right.left = TreeNode(5)
    root.right.right = TreeNode(6)
    root.right.left.left = TreeNode(7)
    root.right.left.right = TreeNode(8)

    printVerticalSum(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for linked list nodes.

**Exercise:** [Extend the solution to print nodes in vertical order](https://techiedelight.com/vertical-traversal-binary-tree/)
