# Link nodes present in each level of a binary tree in the form of a linked list

> Source: https://www.techiedelight.com/link-nodes-each-level-binary-tree/

Given the root of a special binary tree with each node containing an additional next pointer, link nodes at the same level using the next pointer in the form of a linked list like structure.

For example, the binary tree on the left should be converted into a binary tree on the right.

> 

We can solve this problem in linear time by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store nodes present at each level in a map from left to right. After every node is processed, iterate through the map, and for each level, set the next node for every node present in it.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node *left, *right, *next;

    // constructor
    Node(int data)
    {
        this->data = data;
        this->left = this->right = this->next = nullptr;
    }
};

// Function to print a given linked list
void printList(Node* head)
{
    while (head)
    {
        cout << head->data << " —> ";
        head = head->next;
    }

    cout << "null" << endl;
}

// Recursive function to find the first node in the next level of a given root node
Node* findNextNode(Node* root)
{
    // base case
    if (root == nullptr || root->next == nullptr) {
        return nullptr;
    }

    // if the left child of the root's next node exists, return it
    if (root->next->left) {
        return root->next->left;
    }

    // if the right child of the root's next node exists, return it
    if (root->next->right) {
        return root->next->right;
    }

    // if root's next node is a leaf node, recur for root's next node
    return findNextNode(root->next);
}

// Function to traverse the nodes in a preorder fashion and
// insert all nodes into the map corresponding to their level
void linkNodes(Node* root, int level, auto &map)
{
    // base case: empty subtree
    if (root == nullptr) {
        return;
    }

    // insert the current node and level information into the map
    map[level].push_back(root);

    // recur for the left and right subtree by increasing the level by 1
    linkNodes(root->left, level + 1, map);
    linkNodes(root->right, level + 1, map);
}

// Function to link nodes present in each level of a binary tree
// using the next pointer
void linkNodes(Node* root)
{
    // create an empty map to store nodes present at each level
    // from left to right
    unordered_map<int, vector<Node*>> map;

    // traverse the tree in a preorder fashion and fill the map
    linkNodes(root, 1, map);

    // iterate through the map, and for each level,
    // set the next node for every node in it
    for (auto it: map)
    {
        Node* prev = nullptr;
        for (Node* curr: it.second)
        {
            if (prev) {
                prev->next = curr;
            }
            prev = curr;
        }
        prev->next = nullptr;
    }
};

int main()
{
    /* Construct the following tree
           1
         /   \
        2     3
       / \     \
      4   5     6
       \       /
        7     8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->right = new Node(6);
    root->left->left->right = new Node(7);
    root->right->right->left = new Node(8);

    // link nodes at the same level
    linkNodes(root);

    // print the nodes
    Node* node = root;
    while (node)
    {
        // print the current level
        printList(node);

        // find the leftmost node in the next level
        if (node->left) {
            node = node->left;
        }
        else if (node->right) {
            node = node->right;
        }
        else {
            node = findNextNode(node);
        }
    }

    return 0;
}
```

**Output:** 1 —> null 2 —> 3 —> null 4 —> 5 —> 6 —> null 7 —> 8 —> null

##

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// A class to store a binary tree node
class Node
{
    int data;
    Node left = null, right = null, next = null;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Function to print a given linked list
    public static void printList(Node head)
    {
        while (head != null)
        {
            System.out.print(head.data + " —> ");
            head = head.next;
        }

        System.out.println("null");
    }

    // Function to perform inorder traversal on a given binary tree where nodes
    // at the same level are linked together in the form of a linked list
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);

        // print current node and its next node
        System.out.print(root.data + " —> ");
        if (root.next != null) {
            System.out.println(root.next.data);
        }
        else {
            System.out.println("null");
        }

        inorder(root.right);
    }

    // Recursive function to find the first node in the next level of a given root node
    public static Node findNextNode(Node root)
    {
        // base case
        if (root == null || root.next == null) {
            return null;
        }

        // if the left child of the root's next node exists, return it
        if (root.next.left != null) {
            return root.next.left;
        }

        // if the right child of the root's next node exists, return it
        if (root.next.right != null) {
            return root.next.right;
        }

        // if root's next node is a leaf node, recur for root's next node
        return findNextNode(root.next);
    }

    // Function to traverse the nodes in a preorder fashion and
    // insert all nodes into the map corresponding to their level
    public static void linkNodes(Node root, int level, Map<Integer, List<Node>> map)
    {
        // base case: empty subtree
        if (root == null) {
            return;
        }

        // insert the current node and level information into the map
        if (map.get(level) == null) {
            map.put(level, new ArrayList<>());
        }
        map.get(level).add(root);

        // recur for the left and right subtree by increasing the level by 1
        linkNodes(root.left, level + 1, map);
        linkNodes(root.right, level + 1, map);
    }

    // Function to link nodes present in each level of a binary tree
    // using the next pointer
    public static void linkNodes(Node root)
    {
        // create an empty map to store nodes present at each level
        // from left to right
        Map<Integer, List<Node>> map = new HashMap<>();

        // traverse the tree in a preorder fashion and fill the map
        linkNodes(root, 1, map);

        // iterate through the map, and for each level,
        // set the next node for every node in it
        for (List<Node> values: map.values())
        {
            Node prev = null;
            for (Node curr: values)
            {
                if (prev != null) {
                    prev.next = curr;
                }
                prev = curr;
            }
            prev.next = null;
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                 1
               /   \
              2     3
             / \     \
            4   5     6
             \       /
              7     8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.right = new Node(6);
        root.left.left.right = new Node(7);
        root.right.right.left = new Node(8);

        // link nodes at the same level
        linkNodes(root);

        // print the nodes
        Node node = root;
        while (node != null)
        {
            // print the current level
            printList(node);

            // find the leftmost node in the next level
            if (node.left != null) {
                node = node.left;
            }
            else if (node.right != null) {
                node = node.right;
            }
            else {
                node = findNextNode(node);
            }
        }

        // inorder(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None, next=None):
        self.data = data
        self.left = left
        self.right = right
        self.next = next

# Function to print a given linked list
def printList(head):

    while head:
        print(head.data, end=' —> ')
        head = head.next

    print('None')

# Function to perform inorder traversal on a given binary tree where nodes
# at the same level are linked together in the form of a linked list
def inorder(root):

    if root is None:
        return

    inorder(root.left)

    # print current node and its next node
    print(root.data, end=' —> ')
    if root.next:
        print(root.next.data)
    else:
        print('None')

    inorder(root.right)

# Recursive function to find the first node in the next level of a given root node
def findNextNode(root):

    # base case
    if root is None or root.next is None:
        return None

    # if the left child of the root's next node exists, return it
    if root.next.left:
        return root.next.left

    # if the right child of the root's next node exists, return it
    if root.next.right:
        return root.next.right

    # if root's next node is a leaf node, recur for root's next node
    return findNextNode(root.next)

# Function to traverse the nodes in a preorder fashion and
# insert all nodes into the dictionary corresponding to their level
def linkNodes(root, level, d):

    # base case: empty subtree
    if root is None:
        return

    # insert the current node and level information into the dictionary
    d.setdefault(level, []).append(root)

    # recur for the left and right subtree by increasing the level by 1
    linkNodes(root.left, level + 1, d)
    linkNodes(root.right, level + 1, d)

# Function to link nodes present in each level of a binary tree
# using the next pointer
def linkNodesBT(root):

    # create an empty dictionary to store nodes present at each level
    # from left to right
    d = {}

    # traverse the tree in a preorder fashion and fill the dictionary
    linkNodes(root, 1, d)

    # iterate through the dictionary, and for each level,
    # set the next node for every node in it
    for values in d.values():
        prev = None
        for curr in values:
            if prev:
                prev.next = curr
            prev = curr
        prev.next = None

if __name__ == '__main__':

    ''' Construct the following tree
           1
         /   \
        2     3
       / \     \
      4   5     6
       \       /
        7     8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.right = Node(6)
    root.left.left.right = Node(7)
    root.right.right.left = Node(8)

    # link nodes at the same level
    linkNodesBT(root)

    # print the nodes
    node = root
    while node:
        printList(node)        # print the current level

        # find the leftmost node in the next level
        if node.left:
            node = node.left
        elif node.right:
            node = node.right
        else:
            node = findNextNode(node)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for the unordered map.

How can we solve this using constant space?

The idea is to traverse the tree in a preorder fashion and ensure that all nodes at the current level are linked before all nodes at the next level, i.e., the next pointer of the parent nodes is set before its children.

Then update the next pointer of the parent’s left child to the parent’s right child. If the right child doesn’t exist, link the parent’s left child to the first node in the next level. Similarly, update the next pointer of the parent’s right child to the first node in the next level. If we follow this recursively for the left and right subtrees, we will end up having connected nodes at each level.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node *left, *right, *next;

    // constructor
    Node(int data)
    {
        this->data = data;
        this->left = this->right = this->next = nullptr;
    }
};

// Function to print a given linked list
void printList(Node* head)
{
    while (head)
    {
        cout << head->data << " —> ";
        head = head->next;
    }

    cout << "null" << endl;
}

// Recursive function to find the first node in the next level of a given root node
Node* findNextNode(Node* root)
{
    // base case
    if (root == nullptr || root->next == nullptr) {
        return nullptr;
    }

    // if the left child of the root's next node exists, return it
    if (root->next->left) {
        return root->next->left;
    }

    // if the right child of the root's next node exists, return it
    if (root->next->right) {
        return root->next->right;
    }

    // if root's next node is a leaf node, recur for root's next node
    return findNextNode(root->next);
}

// Recursive function to link nodes present in each level of a binary tree
// in the form of a linked list
void linkNodes(Node* root)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // ensure that the nodes of the current level are linked before the
    // next level nodes
    linkNodes(root->next);

    // Update the next pointer of root's left child to root's right child.
    // If the right child doesn't exist, link it to the first node in the next level.
    if (root->left) {
        root->left->next = (root->right)? root->right: findNextNode(root);
    }

    // update the next pointer of the root's right child to the first node
    // in the next level
    if (root->right) {
        root->right->next = findNextNode(root);
    }

    // recur for the left and right subtree
    linkNodes(root->left);
    linkNodes(root->right);
}

int main()
{
    /* Construct the following tree
             1
           /   \
          2     3
         / \     \
        4   5     6
         \       /
          7     8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->right = new Node(6);
    root->left->left->right = new Node(7);
    root->right->right->left = new Node(8);

    // link nodes at the same level
    linkNodes(root);

    // print the nodes
    Node* node = root;
    while (node)
    {
        // print the current level
        printList(node);

        // find the leftmost node in the next level
        if (node->left) {
            node = node->left;
        }
        else if (node->right) {
            node = node->right;
        }
        else {
            node = findNextNode(node);
        }
    }

    return 0;
}
```

**Output:** 1 —> null 2 —> 3 —> null 4 —> 5 —> 6 —> null 7 —> 8 —> null

##

```java
// A class to store a binary tree node
class Node
{
    int data;
    Node left = null, right = null, next = null;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Function to print a given linked list
    public static void printList(Node head)
    {
        while (head != null)
        {
            System.out.print(head.data + " —> ");
            head = head.next;
        }

        System.out.println("null");
    }

    // Function to perform inorder traversal on a given binary tree where nodes
    // at the same level are linked together in the form of a linked list
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);

        // print current node and its next node
        System.out.print(root.data + "—>");
        if (root.next != null) {
            System.out.println(root.next.data);
        }
        else {
            System.out.println("null");
        }

        inorder(root.right);
    }

    // Recursive function to find the first node in the next level of a given root node
    public static Node findNextNode(Node root)
    {
        // base case
        if (root == null || root.next == null) {
            return null;
        }

        // if the left child of the root's next node exists, return it
        if (root.next.left != null) {
            return root.next.left;
        }

        // if the right child of the root's next node exists, return it
        if (root.next.right != null) {
            return root.next.right;
        }

        // if root's next node is a leaf node, recur for root's next node
        return findNextNode(root.next);
    }

    // Recursive function to link nodes present in each level of a binary tree
    // in the form of a linked list
    public static void linkNodes(Node root)
    {
        // base case
        if (root == null) {
            return;
        }

        // ensure that the nodes of the current level are linked before the
        // next level nodes
        linkNodes(root.next);

        // Update the next pointer of root's left child to root's right child.
        // If the right child doesn't exist, link it to the first node in the
        // next level.
        if (root.left != null) {
            root.left.next = (root.right != null)? root.right: findNextNode(root);
        }

        // update the next pointer of the root's right child to the first node
        // in the next level
        if (root.right != null) {
            root.right.next = findNextNode(root);
        }

        // recur for the left and right subtree
        linkNodes(root.left);
        linkNodes(root.right);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
               1
             /   \
            2     3
           / \     \
          4   5     6
           \       /
            7     8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.right = new Node(6);
        root.left.left.right = new Node(7);
        root.right.right.left = new Node(8);

        // link nodes at the same level
        linkNodes(root);

        // print the nodes
        Node node = root;
        while (node != null)
        {
            // print the current level
            printList(node);

            // find the leftmost node in the next level
            if (node.left != null) {
                node = node.left;
            }
            else if (node.right != null) {
                node = node.right;
            }
            else {
                node = findNextNode(node);
            }
        }

        // inorder(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None, next=None):
        self.data = data
        self.left = left
        self.right = right
        self.next = next

# Function to print a given linked list
def printList(head):

    while head:
        print(head.data, end=' —> ')
        head = head.next

    print('None')

# Function to perform inorder traversal on a given binary tree where nodes
# at the same level are linked together in the form of a linked list
def inorder(root):

    if root is None:
        return

    inorder(root.left)

    # print current node and its next node
    print(root.data, end=' —> ')
    if root.next:
        print(root.next.data, end='')
    else:
        print('None')

    inorder(root.right)

# Recursive function to find the first node in the next level of a given root node
def findNextNode(root):

    # base case
    if root is None or root.next is None:
        return None

    # if the left child of the root's next node exists, return it
    if root.next.left:
        return root.next.left

    # if the right child of the root's next node exists, return it
    if root.next.right:
        return root.next.right

    # if root's next node is a leaf node, recur for root's next node
    return findNextNode(root.next)

# Recursive function to link nodes present in each level of a binary tree
# in the form of a linked list
def linkNodes(root: Node):

    # base case
    if root is None:
        return

    # ensure that the nodes of the current level are linked before the
    # next level nodes
    linkNodes(root.next)

    # Update the next pointer of root's left child to root's right child.
    # If the right child doesn't exist, link it to the first node in the next level.
    if root.left:
        if root.right:
            root.left.next = root.right
        else:
            root.left.next = findNextNode(root)

    # update the next pointer of the root's right child to the first node
    # in the next level
    if root.right:
        root.right.next = findNextNode(root)

    # recur for the left and right subtree
    linkNodes(root.left)
    linkNodes(root.right)

if __name__ == '__main__':

    ''' Construct the following tree
           1
         /   \
        2     3
       / \     \
      4   5     6
       \       /
        7     8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.right = Node(6)
    root.left.left.right = Node(7)
    root.right.right.left = Node(8)

    # link nodes at the same level
    linkNodes(root)

    # print the nodes
    node = root
    while node:
        # print the current level
        printList(node)

        # find the leftmost node in the next level
        if node.left:
            node = node.left
        elif node.right:
            node = node.right
        else:
            node = findNextNode(node)
```

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. The solution also takes implicit space for the call stack. We can easily convert the above program into a non-recursive one, which takes O(1) space. The iterative version can be seen [here](https://techiedelight.com/compiler/?run=1i5oGn).
