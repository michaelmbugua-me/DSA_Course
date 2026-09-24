# Print diagonal traversal of a binary tree

> Source: https://www.techiedelight.com/print-diagonal-traversal-binary-tree/

Given a binary tree, print all nodes for each diagonal having negative slope `(\)`. Assume that the left and right child of a node makes a 45–degree angle with the parent.

For example, consider the following binary tree having three diagonals. The diagonal’s traversal is:

1 3 6 2 5 8 4 7

> 

## Recursive Version

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to create an empty map where each key in the map represents a diagonal in the binary tree, and its value maintains all nodes present in the diagonal. Then perform [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree and update the map. For each node, recur for its left subtree by increasing the diagonal by one and recur for the right subtree with the same diagonal.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
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

// Recursive function to perform preorder traversal on the tree and
// fill the map with diagonal elements
void printDiagonal(Node* node, int diagonal, auto &map)
{
    // base case: empty tree
    if (node == nullptr) {
        return;
    }

    // insert the current node into the current diagonal
    map[diagonal].push_back(node->data);

    // recur for the left subtree by increasing diagonal by 1
    printDiagonal(node->left, diagonal + 1, map);

    // recur for the right subtree with the same diagonal
    printDiagonal(node->right, diagonal, map);
}

// Function to print the diagonal elements of a given binary tree
void printDiagonal(Node* root)
{
    // create an empty map to store the diagonal element in every slope
    unordered_map<int, vector<int>> map;

    // perform preorder traversal on the tree and fill the map
    printDiagonal(root, 0, map);

    // traverse the map and print the diagonal elements
    for (int i = 0; i < map.size(); i++)
    {
        for (int j: map[i]) {
            cout << j << ' ';
        }
        cout << endl;
    }
}

int main()
{
    /* Construct the following tree
              1
            /   \
           /     \
          2       3
         /      /  \
        /      /    \
       4      5      6
             / \
            /   \
           7     8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    printDiagonal(root);

    return 0;
}
```

**Output:** 1 3 6 2 5 8 4 7

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
    Node left = null, right = null;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Recursive function to perform preorder traversal on the tree and
    // fill the map with diagonal elements
    public static void printDiagonal(Node node, int diagonal,
                                    Map<Integer, List<Integer>> map)
    {
        // base case: empty tree
        if (node == null) {
            return;
        }

        // insert the current node into the current diagonal
        map.putIfAbsent(diagonal, new ArrayList<>());
        map.get(diagonal).add(node.data);

        // recur for the left subtree by increasing diagonal by 1
        printDiagonal(node.left, diagonal + 1, map);

        // recur for the right subtree with the same diagonal
        printDiagonal(node.right, diagonal, map);
    }

    // Function to print the diagonal elements of a given binary tree
    public static void printDiagonal(Node root)
    {
        // create an empty multimap to store the diagonal element in every slope
        Map<Integer, List<Integer>> map = new HashMap<>();

        // perform preorder traversal on the tree and fill the map
        printDiagonal(root, 0, map);

        // traverse the map and print the diagonal elements
        for (int i = 0; i < map.size(); i++) {
            System.out.println(map.get(i));
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
               /     \
              2       3
             /      /  \
            /      /    \
           4      5      6
                 / \
                /   \
               7     8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        printDiagonal(root);
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

# Recursive function to perform preorder traversal on the tree and
# fill the dictionary with diagonal elements
def printDiagonal(node, diagonal, d):

    # base case: empty tree
    if node is None:
        return

    # insert the current node into the current diagonal
    d.setdefault(diagonal, []).append(node.data)

    # recur for the left subtree by increasing diagonal by 1
    printDiagonal(node.left, diagonal + 1, d)

    # recur for the right subtree with the same diagonal
    printDiagonal(node.right, diagonal, d)

# Function to print the diagonal elements of a given binary tree
def printDiagonalElements(root):

    # create an empty dictionary to store the diagonal element in every slope
    d = {}

    # perform preorder traversal on the tree and fill the dictionary
    printDiagonal(root, 0, d)

    # traverse the dictionary and print diagonal elements
    for i in range(len(d)):
        print(d.get(i))

if __name__ == '__main__':

    ''' Construct the following tree
               1
             /   \
            /     \
          2        3
         /        /  \
        /        /    \
       4        5      6
               / \
             /    \
            7      8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    printDiagonalElements(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## Iterative Version

We can also use a [queue](https://techiedelight.com/queue-implementation-cpp/) to solve this problem. The idea is similar to [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/), but instead of storing nodes of a level, we enqueue nodes in a diagonal.

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
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

// Iterative function to print the diagonal elements of a given binary tree
void diagonalPrint(Node* root)
{
    // create an empty queue
    queue<Node*> q;

    // create a sentinel (dummy) node to denote the end of a diagonal
    Node* sentinel = new Node(-1);

    // enqueue all nodes of the first diagonal in the binary tree
    while (root)
    {
        q.push(root);
        root = root->right;
    }

    // enqueue sentinel node at the end of each diagonal
    q.push(sentinel);

    // run till the only sentinel is left
    while (q.size() != 1)
    {
        // dequeue front node
        Node* front = q.front();
        q.pop();

        if (front != sentinel)
        {
            // print the current node
            cout << front->data << " ";

            // enqueue nodes of the next diagonal in the binary tree
            Node* node = front->left;
            while (node)
            {
                q.push(node);
                node = node->right;
            }
        }
        else {
            // If the current diagonal end is reached, enqueue the sentinel node
            // and print an empty line
            q.push(sentinel);
            cout << endl;
        }
    }
}

int main()
{
    /* Construct the following tree
               1
             /   \
            /     \
          2        3
         /        /  \
        /        /    \
       4        5      6
               / \
             /    \
            7      8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    diagonalPrint(root);

    return 0;
}
```

**Output:** 1 3 6 2 5 8 4 7

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

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
    // Iterative function to print the diagonal elements of a given binary tree
    public static void diagonalPrint(Node root)
    {
        // create an empty queue
        Queue<Node> q = new ArrayDeque<>();

        // create a sentinel (dummy) node to denote the end of a diagonal
        Node sentinel = new Node(-1);

        // enqueue all nodes of the first diagonal in the binary tree
        while (root != null)
        {
            q.add(root);
            root = root.right;
        }

        // enqueue sentinel node at the end of each diagonal
        q.add(sentinel);

        // run till the only sentinel is left
        while (q.size() != 1)
        {
            // dequeue front node
            Node front = q.poll();

            if (front != sentinel)
            {
                // print the current node
                System.out.print(front.data + " ");

                // enqueue nodes of the next diagonal in the binary tree
                Node node = front.left;
                while (node != null)
                {
                    q.add(node);
                    node = node.right;
                }
            }
            else {
                // If the current diagonal end is reached, enqueue the sentinel node
                // and print an empty line
                q.add(sentinel);
                System.out.println();
            }
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
               1
             /   \
            /     \
          2        3
         /        /  \
        /        /    \
       4        5      6
               / \
             /    \
            7      8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        diagonalPrint(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Iterative function to print the diagonal elements of a given binary tree
def diagonalPrint(root):

    # create an empty queue
    q = deque()

    # create a sentinel (dummy) node to denote the end of a diagonal
    sentinel = Node(-1)

    # enqueue all nodes of the first diagonal in the binary tree
    while root:
        q.append(root)
        root = root.right

    # enqueue sentinel node at the end of each diagonal
    q.append(sentinel)

    # run till the only sentinel is left
    while len(q) != 1:

        # dequeue front node
        front = q.popleft()

        if front != sentinel:
            # print the current node
            print(front.data, end=' ')

            # enqueue nodes of the next diagonal in the binary tree
            node = front.left
            while node:
                q.append(node)
                node = node.right

        else:
            # If the current diagonal end is reached, enqueue the sentinel node
            # and print an empty line
            q.append(sentinel)
            print()

if __name__ == '__main__':

    ''' Construct the following tree
               1
             /   \
            /     \
          2        3
         /        /  \
        /        /    \
       4        5      6
               / \
             /    \
            7      8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    diagonalPrint(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:** Modify the solution to print diagonal elements for diagonals having positive slope `/`.
