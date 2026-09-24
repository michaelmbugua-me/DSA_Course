# Find Floor and Ceil in a Binary Search Tree

> Source: https://www.techiedelight.com/floor-ceil-bst-iterative-recursive/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST, find the floor and ceil of a given key in it. If the given key lies in the BST, then both floor and ceil are equal to that key; otherwise, the ceil is equal to the next greater key (if any) in the BST, and the floor is equal to the previous greater key (if any) in the BST.

For example, consider the following tree:

The floor of 1 does not exist, ceil of 1 is 2 The floor of 3 is 2, ceil of 3 is 4 The floor of 9 is 9, ceil of 9 is 9 The floor of 7 is 6, ceil of 7 is 8

> 

The idea is simple – search for the given key in the tree and update the ceil to the current node before visiting its left subtree. Similarly, update the floor to the current node before visiting its right subtree. If the key is found in the BST, then the floor and ceil are equal to that key. If the key is not found in the BST, then the floor and ceil were already updated while searching for the key.

Following is the iterative implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

// Data structure to store a BST node
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

// Recursive function to find the floor and ceil of a given key in a BST.
// Note that floor and ceil are passed by reference to the function
void findFloorCeil(Node* root, Node* &floor, Node* &ceil, int key)
{
    while (root)
    {
        // if a node with the desired value is found, both floor and ceil is equal
        // to the current node
        if (root->data == key)
        {
            floor = root;
            ceil = root;
            break;
        }

        // if the given key is less than the root node, visit the left subtree
        else if (key < root->data)
        {
            // update ceil to the current node before visiting the left subtree
            ceil = root;
            root = root->left;
        }

        // if the given key is more than the root node, visit the right subtree
        else {
            // update floor to the current node before visiting the right subtree
            floor = root;
            root = root->right;
        }
    }
}

int main()
{
    /* Construct the following tree
               8
             /   \
            /     \
           4       10
          / \     /  \
         /   \   /    \
        2     6 9     12
    */

    int keys[] = { 2, 4, 6, 8, 9, 10, 12 };

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    // find the ceil and floor for each key
    for (int i = 0; i < 15; i++)
    {
        Node *floor = nullptr, *ceil = nullptr;
        findFloorCeil(root, floor, ceil, i);

        cout << setw(2) << i << " —> ";
        cout << setw(4) << (floor? floor->data: -1);
        cout << setw(4) << (ceil? ceil->data: -1) << endl;
    }

    return 0;
}
```

##

```java
// A class to store a BST node
class Node
{
    int data;
    Node left, right;

    Node(int data) {
        this.data = data;
    }
}

class FloorCeil
{
    private Node floor, ceil;

    FloorCeil()
    {
        floor = new Node(-1);
        ceil = new Node(-1);
    }

    public void setCeil(Node ceil) {
        this.ceil = ceil;
    }

    public void setFloor(Node floor) {
        this.floor = floor;
    }

    public int getCeilData() {
        return ceil.data;
    }

    public int getFloorData() {
        return floor.data;
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
        if (key < root.data) {
            root.left = insert(root.left, key);
        }

        // if the given key is more than the root node, recur for the right subtree
        else {
            root.right = insert(root.right, key);
        }

        return root;
    }

    // Recursive function to find the floor and ceil of a given key in the BST.
    public static void findFloorCeil(Node root, FloorCeil obj, int key)
    {
        while (root != null)
        {
            // if a node with the desired value is found, both floor and ceil is equal
            // to the current node
            if (root.data == key)
            {
                obj.setFloor(root);
                obj.setCeil(root);
                break;
            }

            // if the given key is less than the root node, visit the left subtree
            else if (key < root.data)
            {
                // update ceil to the current node before visiting the left subtree
                obj.setCeil(root);
                root = root.left;
            }

            // if the given key is more than the root node, visit the right subtree
            else {
                // update floor to the current node before visiting the right subtree
                obj.setFloor(root);
                root = root.right;
            }
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                   8
                 /   \
                /     \
               4       10
              / \     /  \
             /   \   /    \
            2     6 9     12
        */

        int[] keys = { 2, 4, 6, 8, 9, 10, 12 };

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        // find the ceil and floor for each key
        for (int i = 0; i < 15; i++)
        {
            FloorCeil ob = new FloorCeil();

            findFloorCeil(root, ob, i);
            System.out.println(i + " —> Floor is " + ob.getFloorData()
                        + ", Ceil is " + ob.getCeilData());
        }
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to insert a key into a BST
def insert(root, key):

    # if the root is None, create a new node and return it
    if root is None:
        return Node(key)

    # if the given key is less than the root node, recur for the left subtree
    if key < root.data:
        root.left = insert(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        root.right = insert(root.right, key)

    return root

# Recursive function to find the floor and ceil of a given key in a BST
def findFloorCeil(root, floor, ceil, key):

    while root:
        # if a node with the desired value is found, both floor and ceil is equal
        # to the current node
        if root.data == key:
            floor = ceil = root
            break

        # if the given key is less than the root node, visit the left subtree
        elif key < root.data:
            # update ceil to the current node before visiting the left subtree
            ceil = root
            root = root.left

        # if the given key is more than the root node, visit the right subtree
        else:
            # update floor to the current node before visiting the right subtree
            floor = root
            root = root.right

    return floor, ceil

if __name__ == '__main__':

    ''' Construct the following tree
               8
             /   \
            /     \
           4       10
          / \     /  \
         /   \   /    \
        2     6 9     12
    '''

    keys = [2, 4, 6, 8, 9, 10, 12]

    root = None
    for key in keys:
        root = insert(root, key)

    # find the ceil and floor for each key
    for i in range(15):

        floor, ceil = findFloorCeil(root, None, None, i)

        print(i, end=' —> ')
        print('Floor is', floor.data if floor else None, end=' and ')
        print('Ceil is', ceil.data if ceil else None)
```

**Output:** 0 —> Floor is -1, Ceil is 2 1 —> Floor is -1, Ceil is 2 2 —> Floor is 2, Ceil is 2 3 —> Floor is 2, Ceil is 4 4 —> Floor is 4, Ceil is 4 5 —> Floor is 4, Ceil is 6 6 —> Floor is 6, Ceil is 6 7 —> Floor is 6, Ceil is 8 8 —> Floor is 8, Ceil is 8 9 —> Floor is 9, Ceil is 9 10 —> Floor is 10, Ceil is 10 11 —> Floor is 10, Ceil is 12 12 —> Floor is 12, Ceil is 12 13 —> Floor is 12, Ceil is -1 14 —> Floor is 12, Ceil is -1

The time complexity of the above solution is O(n), where `n` is the size of the BST. The auxiliary space required by the program is O(1).

Following is the recursive C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

// Data structure to store a BST node
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

// Recursive function to find the floor and ceil of a given key in a BST.
// Note that floor and ceil are passed by reference to the function
void findFloorCeil(Node* root, Node* &floor, Node* &ceil, int key)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // if a node with the desired value is found, both floor and ceil is equal
    // to the current node
    if (root->data == key)
    {
        floor = root;
        ceil = root;
    }

    // if the given key is less than the root node, recur for the left subtree
    else if (key < root->data)
    {
        // update ceil to the current node before recursing in the left subtree
        ceil = root;
        findFloorCeil(root->left, floor, ceil, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        // update floor to the current node before recursing in the right subtree
        floor = root;
        findFloorCeil(root->right, floor, ceil, key);
    }
}

int main()
{
    /* Construct the following tree
               8
             /   \
            /     \
           4       10
          / \     /  \
         /   \   /    \
        2     6 9     12
    */

    int keys[] = { 2, 4, 6, 8, 9, 10, 12 };

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    // calculate the ceil and floor for each key
    for (int i = 0; i < 15; i++)
    {
        Node *floor = nullptr, *ceil = nullptr;
        findFloorCeil(root, floor, ceil, i);

        cout << setw(2) << i << " —> ";
        cout << setw(4) << (floor? floor->data: -1);
        cout << setw(4) << (ceil? ceil->data: -1) << endl;
    }

    return 0;
}
```

##

```java
// A class to store a BST node
class Node
{
    int data;
    Node left, right;

    Node(int data) {
        this.data = data;
    }
}

class FloorCeil
{
    private Node floor, ceil;

    FloorCeil()
    {
        floor = new Node(-1);
        ceil = new Node(-1);
    }

    public void setCeil(Node ceil) {
        this.ceil = ceil;
    }

    public void setFloor(Node floor) {
        this.floor = floor;
    }

    public int getCeilData() {
        return ceil.data;
    }

    public int getFloorData() {
        return floor.data;
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
        if (key < root.data) {
            root.left = insert(root.left, key);
        }

        // if the given key is more than the root node, recur for the right subtree
        else {
            root.right = insert(root.right, key);
        }

        return root;
    }

    // Recursive function to find the floor and ceil of a given key in the BST
    public static void findFloorCeil(Node root, FloorCeil obj, int key)
    {
        // base case
        if (root == null) {
            return;
        }

        // if a node with the desired value is found, both floor and ceil is equal
        // to the current node
        if (root.data == key)
        {
            obj.setFloor(root);
            obj.setCeil(root);
        }

        // if the given key is less than the root node, recur for the left subtree
        else if (key < root.data)
        {
            // update ceil to the current node before visiting the left subtree
            obj.setCeil(root);
            findFloorCeil(root.left, obj, key);
        }

        // if the given key is more than the root node, recur for the right subtree
        else {
            // update floor to the current node before visiting the right subtree
            obj.setFloor(root);
            findFloorCeil(root.right, obj, key);
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                   8
                 /   \
                /     \
               4       10
              / \     /  \
             /   \   /    \
            2     6 9     12
        */

        int[] keys = { 2, 4, 6, 8, 9, 10, 12 };

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        // calculate the ceil and floor for each key
        for (int i = 0; i < 15; i++)
        {
            FloorCeil ob = new FloorCeil();

            findFloorCeil(root, ob, i);
            System.out.println(i + " —> Floor is " + ob.getFloorData() +
                            ", Ceil is " + ob.getCeilData());
        }
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to insert a key into a BST
def insert(root, key):

    # if the root is None, create a new node and return it
    if root is None:
        return Node(key)

    # if the given key is less than the root node, recur for the left subtree
    if key < root.data:
        root.left = insert(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        root.right = insert(root.right, key)

    return root

# Recursive function to find the floor and ceil of a given key in a BST
def findFloorCeil(root, floor, ceil, key):

    # base case
    if root is None:
        return floor, ceil

    # if a node with the desired value is found, both floor and ceil is equal
    # to the current node
    if root.data == key:
        return root, root

    # if the given key is less than the root node, recur for the left subtree
    elif key < root.data:
        # update ceil to the current node before visiting the left subtree
        return findFloorCeil(root.left, floor, root, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        # update floor to the current node before visiting the right subtree
        return findFloorCeil(root.right, root, ceil, key)

if __name__ == '__main__':

    ''' Construct the following tree
               8
             /   \
            /     \
           4       10
          / \     /  \
         /   \   /    \
        2     6 9     12
    '''

    keys = [2, 4, 6, 8, 9, 10, 12]

    root = None
    for key in keys:
        root = insert(root, key)

    # calculate the ceil and floor for each key
    for i in range(15):
        floor, ceil = findFloorCeil(root, None, None, i)

        print(i, end=' —> ')
        print('Floor is', floor.data if floor else None, end=' and ')
        print('Ceil is', ceil.data if ceil else None)
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.
