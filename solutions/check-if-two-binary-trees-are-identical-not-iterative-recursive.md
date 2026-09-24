# Check if two binary trees are identical or not – Iterative and Recursive

> Source: https://www.techiedelight.com/check-if-two-binary-trees-are-identical-not-iterative-recursive/

Write an efficient algorithm to check if two binary trees are identical or not. Two binary trees are identical if they have identical structure and their contents are also the same.

**Input:** 1 1 / \ / \ 2 3 2 3 / \ / \ / \ / \ 4 5 6 7 4 5 6 7 **Output:** True **Explanation:** Both binary trees have the same structure and contents. **Input:** 1 1 / \ / \ 2 3 2 3 / \ / \ / \ / 4 5 6 7 4 5 6 **Output:** False **Explanation:** Both binary trees have different structures. **Input:** 1 1 / \ / \ 2 3 2 3 / \ / \ / \ / \ 4 5 6 7 4 5 6 8 **Output:** False **Explanation:** Both binary trees have the same structure but differ in nodes’ values.

> 

## Recursive Solution

The idea is to traverse both trees and compare values at their root node. If the value matches, recursively check if the first tree’s left subtree is identical to the left subtree of the second tree and the right subtree of the first tree is identical to the right subtree of the second tree. If the value at their root node differs, the trees violate data property. If at any point in the recursion, the first tree is empty and the second tree is non-empty, or the second tree is empty and the first tree is non-empty, the trees violate structural property, and they cannot be identical.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int key;
    Node *left, *right;

    Node(int key)
    {
        this->key = key;
        this->left = this->right = nullptr;
    }
};

// Recursive function to check if two given binary trees are identical or not
int isIdentical(Node* x, Node* y)
{
    // if both trees are empty, return true
    if (x == nullptr && y == nullptr) {
        return 1;
    }

    // if both trees are non-empty and the value of their root node matches,
    // recur for their left and right subtree
    return (x && y) && (x->key == y->key) &&
            isIdentical(x->left, y->left) &&
            isIdentical(x->right, y->right);
}

int main()
{
    // construct the first tree
    Node* x = nullptr;

    x = new Node(15);
    x->left = new Node(10);
    x->right = new Node(20);
    x->left->left = new Node(8);
    x->left->right = new Node(12);
    x->right->left = new Node(16);
    x->right->right = new Node(25);

    // construct the second tree
    Node* y = nullptr;

    y = new Node(15);
    y->left = new Node(10);
    y->right = new Node(20);
    y->left->left = new Node(8);
    y->left->right = new Node(12);
    y->right->left = new Node(16);
    y->right->right = new Node(25);

    if (isIdentical(x, y)) {
        cout << "The given binary trees are identical";
    }
    else {
        cout << "The given binary trees are not identical";
    }

    return 0;
}
```

**Output:** The given binary trees are identical

##

```java
// A class to store a binary tree node
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
    // Recursive function to check if two given binary trees are identical or not
    public static boolean isIdentical(Node x, Node y)
    {
        // if both trees are empty, return true
        if (x == null && y == null) {
            return true;
        }

        // if both trees are non-empty and the value of their root node matches,
        // recur for their left and right subtree
        return (x != null && y != null) && (x.key == y.key) &&
                    isIdentical(x.left, y.left) &&
                    isIdentical(x.right, y.right);
    }

    public static void main(String[] args)
    {
        // construct the first tree
        Node x = new Node(15);
        x.left = new Node(10);
        x.right = new Node(20);
        x.left.left = new Node(8);
        x.left.right = new Node(12);
        x.right.left = new Node(16);
        x.right.right = new Node(25);

        // construct the second tree
        Node y = new Node(15);
        y.left = new Node(10);
        y.right = new Node(20);
        y.left.left = new Node(8);
        y.left.right = new Node(12);
        y.right.left = new Node(16);
        y.right.right = new Node(25);

        if (isIdentical(x, y)) {
            System.out.println("The given binary trees are identical");
        }
        else {
            System.out.println("The given binary trees are not identical");
        }
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, key=None, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Recursive function to check if two given binary trees are identical or not
def isIdentical(x, y):

    # if both trees are empty, return true
    if x is None and y is None:
        return True

    # if both trees are non-empty and the value of their root node matches,
    # recur for their left and right subtree
    return (x is not None and y is not None) and (x.key == y.key) and \
        isIdentical(x.left, y.left) and isIdentical(x.right, y.right)

if __name__ == '__main__':

    # construct the first tree
    x = Node(15)
    x.left = Node(10)
    x.right = Node(20)
    x.left.left = Node(8)
    x.left.right = Node(12)
    x.right.left = Node(16)
    x.right.right = Node(25)

    # construct the second tree
    y = Node(15)
    y.left = Node(10)
    y.right = Node(20)
    y.left.left = Node(8)
    y.left.right = Node(12)
    y.right.left = Node(16)
    y.right.right = Node(25)

    if isIdentical(x, y):
        print('The given binary trees are identical')
    else:
        print('The given binary trees are not identical')
```

## Iterative Solution

In an iterative version, we use the [stack data structure](https://techiedelight.com/stack-implementation/) similar to the implicit recursive stack. The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int key;
    Node *left, *right;

    Node(int key)
    {
        this->key = key;
        this->left = this->right = nullptr;
    }
};

// Iterative function to check if two given binary trees are identical or not
bool isIdentical(Node* x, Node* y)
{
    // if both trees are empty, return true
    if (x == nullptr && y == nullptr) {
        return true;
    }

    // if the first tree is empty (and the second tree is non-empty), return false
    if (x == nullptr) {
        return false;
    }

    // if the second tree is empty (and the first tree is non-empty), return false
    if (y == nullptr) {
        return false;
    }

    // create a stack to hold `Node*` pairs
    stack<pair<Node*, Node*>> stack;
    stack.push({x, y});

    // loop till stack is empty
    while (!stack.empty())
    {
        // pop the top pair from the stack and process it
        Node* x = stack.top().first;
        Node* y = stack.top().second;
        stack.pop();

        // if the value of their root node doesn't match, return false
        if (x->key != y->key) {
            return false;
        }

        // if the left subtree of both `x` and `y` exists, push their addresses
        // to stack; otherwise, return false if only one left child exists
        if (x->left && y->left) {
            stack.push({x->left, y->left});
        }
        else if (x->left || y->left) {
            return false;
        }

        // if the right subtree of both `x` and `y` exists, push their addresses
        // to stack; otherwise, return false if only one right child exists
        if (x->right && y->right) {
            stack.push({x->right, y->right});
        }
        else if (x->right || y->right) {
            return false;
        }
    }

    // we reach here if both binary trees are identical
    return true;
}

int main()
{
    // construct the first tree
    Node* x = nullptr;

    x = new Node(15);
    x->left = new Node(10);
    x->right = new Node(20);
    x->left->left = new Node(8);
    x->left->right = new Node(12);
    x->right->left = new Node(16);
    x->right->right = new Node(25);

    // construct the second tree
    Node* y = nullptr;

    y = new Node(15);
    y->left = new Node(10);
    y->right = new Node(20);
    y->left->left = new Node(8);
    y->left->right = new Node(12);
    y->right->left = new Node(16);
    y->right->right = new Node(25);

    if (isIdentical(x, y)) {
        cout << "The given binary trees are identical";
    }
    else {
        cout << "The given binary trees are not identical";
    }

    return 0;
}
```

**Output:** The given binary trees are identical

##

```java
import java.util.ArrayDeque;
import java.util.Deque;

// A class to store a binary tree node
class Node
{
    int key;
    Node left = null, right = null;

    Node(int key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return "" + key + " ";
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
    // Iterative function to check if two given binary trees are identical or not
    public static boolean isIdentical(Node x, Node y)
    {
        // if both trees are empty, return true
        if (x == null && y == null) {
            return true;
        }

        // if the first tree is empty (and the second tree is non-empty), return false
        if (x == null) {
            return false;
        }

        // if the second tree is empty (and the first tree is non-empty), return false
        if (y == null) {
            return false;
        }

        // create a stack to hold `Node` pairs
        Deque<Pair<Node, Node>> stack = new ArrayDeque<>();
        stack.add(Pair.of(x, y));

        // loop till stack is empty
        while (!stack.isEmpty())
        {
            // pop the top pair from the stack and process it
            x = stack.peekLast().first;
            y = stack.peekLast().second;

            stack.pollLast();

            // if the value of their root node doesn't match, return false
            if (x.key != y.key) {
                return false;
            }

            // if the left subtree of both `x` and `y` exists, push their addresses
            // to stack; otherwise, return false if only one left child exists
            if (x.left != null && y.left != null) {
                stack.add(Pair.of(x.left, y.left));
            }
            else if (x.left != null || y.left != null) {
                return false;
            }

            // if the right subtree of both `x` and `y` exists, push their addresses
            // to stack; otherwise, return false if only one right child exists
            if (x.right != null && y.right != null) {
                stack.add(Pair.of(x.right, y.right));
            }
            else if (x.right != null || y.right != null) {
                return false;
            }
        }

        // we reach here if both binary trees are identical
        return true;
    }

    public static void main(String[] args)
    {
        // construct the first tree
        Node x = new Node(15);
        x.left = new Node(10);
        x.right = new Node(20);
        x.left.left = new Node(8);
        x.left.right = new Node(12);
        x.right.left = new Node(16);
        x.right.right = new Node(25);

        // construct the second tree
        Node y = new Node(15);
        y.left = new Node(10);
        y.right = new Node(20);
        y.left.left = new Node(8);
        y.left.right = new Node(12);
        y.right.left = new Node(16);
        y.right.right = new Node(25);

        if (isIdentical(x, y)) {
            System.out.println("The given binary trees are identical");
        }
        else {
            System.out.println("The given binary trees are not identical");
        }
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, key=None, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Iterative function to check if two given binary trees are identical or not
def isIdentical(x, y):

    # if both trees are empty, return true
    if x is None and y is None:
        return True

    # if the first tree is empty (and the second tree is non-empty), return false
    if x is None:
        return False

    # if the second tree is empty (and the first tree is non-empty), return false
    if y is None:
        return False

    # create a stack to hold pairs
    stack = deque()
    stack.append((x, y))

    # loop till stack is empty
    while stack:
        # pop the top pair from the stack and process it
        x, y = stack.pop()

        # if the value of their root node doesn't match, return false
        if x.key != y.key:
            return False

        # if the left subtree of both `x` and `y` exists, push their addresses
        # to stack; otherwise, return false if only one left child exists
        if x.left and y.left:
            stack.append((x.left, y.left))
        elif x.left or y.left:
            return False

        # if the right subtree of both `x` and `y` exists, push their addresses
        # to stack; otherwise, return false if only one right child exists
        if x.right and y.right:
            stack.append((x.right, y.right))
        elif x.right or y.right:
            return False

    # we reach here if both binary trees are identical
    return True

if __name__ == '__main__':

    # construct the first tree
    x = Node(15)
    x.left = Node(10)
    x.right = Node(20)
    x.left.left = Node(8)
    x.left.right = Node(12)
    x.right.left = Node(16)
    x.right.right = Node(25)

    # construct the second tree
    y = Node(15)
    y.left = Node(10)
    y.right = Node(20)
    y.left.left = Node(8)
    y.left.right = Node(12)
    y.right.left = Node(16)
    y.right.right = Node(25)

    if isIdentical(x, y):
        print('The given binary trees are identical')
    else:
        print('The given binary trees are not identical')
```

The time and space complexity of both recursive and iterative solutions are linear in terms of the total number of nodes in two trees. The space used by the recursive routine is also proportional to the tree’s height, whereas the iterative version use O(n) space for the stack data structure.
