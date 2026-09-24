# Determine if a binary tree can be converted to another by doing any number of swaps of children

> Source: https://www.techiedelight.com/determine-binary-tree-can-converted-another-number-swaps-left-right-child/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to determine if it can be converted into another binary tree by doing any number of swaps of its right and left branches.

For example, consider a binary tree shown on the left below. It can be converted into a binary tree shown on the right by few swaps of its right and left branches.

> 

We can easily solve this problem by using recursion. We return true if:

  1. Both trees are the same, or both trees are empty, or
  2. Both trees are non-empty, the value of the root of `X` and `Y` are the same, and either of the following conditions are satisfied:
     1. The left subtree of `X` can be converted into the left subtree of `Y`, and the right subtree of `X` can be converted into the right subtree of `Y`.
     2. The right subtree of `X` can be converted into the left subtree of `Y`, and the left subtree of `X` can be converted into the right subtree of `Y`.

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

// Function to determine if two given binary trees can be transformed
// into each other by doing any number of left and right subtree swaps
bool equal(Node* X, Node* Y)
{
    // base case: both trees are the same (handles the case when both trees are empty)
    if (X == Y) {
        return true;
    }

    return (X && Y) && (X->data == Y->data) &&
        ((equal(X->left, Y->left) && equal(X->right, Y->right)) ||
        (equal(X->right, Y->left) && equal(X->left, Y->right)));
}

int main()
{
    // construct the first tree
    Node* X = nullptr;

    X = new Node(6);
    X->left = new Node(3);
    X->right = new Node(8);
    X->left->left = new Node(1);
    X->left->right = new Node(7);
    X->right->left = new Node(4);
    X->right->right = new Node(2);
    X->right->left->left = new Node(1);
    X->right->left->right = new Node(7);
    X->right->right->right = new Node(3);

    // construct the second tree
    Node* Y = nullptr;

    Y = new Node(6);
    Y->left = new Node(8);
    Y->right = new Node(3);
    Y->left->left = new Node(2);
    Y->left->right = new Node(4);
    Y->right->left = new Node(7);
    Y->right->right = new Node(1);
    Y->left->left->left = new Node(3);
    Y->left->right->left = new Node(1);
    Y->left->right->right = new Node(7);

    if (equal(X, Y)) {
        cout << "Binary tree can be converted";
    }
    else {
        cout << "Binary tree cannot be converted";
    }

    return 0;
}
```

**Output:** Binary tree can be converted

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
    // Function to determine if two given binary trees can be transformed
    // into each other by doing any number of left and right subtree swaps
    public static boolean equal(Node X, Node Y)
    {
        // base case: both trees are the same (handles the case when both trees
        // are empty)
        if (X == Y) {
            return true;
        }

        return (X != null && Y != null ) && (X.data == Y.data) &&
                ((equal(X.left, Y.left) && equal(X.right, Y.right)) ||
                        (equal(X.right, Y.left) && equal(X.left, Y.right)));
    }

    public static void main(String[] args)
    {
        // construct the first tree
        Node X = new Node(6);
        X.left = new Node(3);
        X.right = new Node(8);
        X.left.left = new Node(1);
        X.left.right = new Node(7);
        X.right.left = new Node(4);
        X.right.right = new Node(2);
        X.right.left.left = new Node(1);
        X.right.left.right = new Node(7);
        X.right.right.right = new Node(3);

        // construct the second tree
        Node Y = new Node(6);
        Y.left = new Node(8);
        Y.right = new Node(3);
        Y.left.left = new Node(2);
        Y.left.right = new Node(4);
        Y.right.left = new Node(7);
        Y.right.right = new Node(1);
        Y.left.left.left = new Node(3);
        Y.left.right.left = new Node(1);
        Y.left.right.right = new Node(7);

        if (equal(X, Y)) {
            System.out.println("Binary tree can be converted");
        }
        else {
            System.out.println("Binary tree cannot be converted");
        }
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

# Function to determine if two given binary trees can be transformed
# into each other by doing any number of left and right subtree swaps
def equal(X, Y):

    # base case: both trees are the same (handles the case when both trees are empty)
    if X == Y:
        return True

    return (X is not None and Y is not None) and (X.data == Y.data) and \
        ((equal(X.left, Y.left) and equal(X.right, Y.right)) or \
            (equal(X.right, Y.left) and equal(X.left, Y.right)))

if __name__ == '__main__':

    # construct the first tree
    X = Node(6)
    X.left = Node(3)
    X.right = Node(8)
    X.left.left = Node(1)
    X.left.right = Node(7)
    X.right.left = Node(4)
    X.right.right = Node(2)
    X.right.left.left = Node(1)
    X.right.left.right = Node(7)
    X.right.right.right = Node(3)

    # construct the second tree
    Y = Node(6)
    Y.left = Node(8)
    Y.right = Node(3)
    Y.left.left = Node(2)
    Y.left.right = Node(4)
    Y.right.left = Node(7)
    Y.right.right = Node(1)
    Y.left.left.left = Node(3)
    Y.left.right.left = Node(1)
    Y.left.right.right = Node(7)

    if equal(X, Y):
        print('Binary tree can be converted')
    else:
        print('Binary tree cannot be converted')
```

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Check children-sum property in a binary tree](https://www.techiedelight.com/check-children-sum-property-binary-tree/ "Check children-sum property in a binary tree")

> [Determine whether a binary tree is a subtree of another binary tree](https://www.techiedelight.com/determine-given-binary-tree-is-subtree-of-another-binary-tree-not/ "Determine whether a binary tree is a subtree of another binary tree")

> [Check if a binary tree is symmetric or not](https://www.techiedelight.com/check-given-binary-tree-symmetric-structure-not/ "Check if a binary tree is symmetric or not")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
