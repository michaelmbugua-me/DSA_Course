# Calculate the height of a binary tree with leaf nodes forming a circular doubly linked list

> Source: https://www.techiedelight.com/calculate-height-binary-tree-leaf-nodes-forming-circular-doubly-linked-list/

Write an algorithm to compute a binary tree’s height with leaf nodes forming a circular doubly linked list where the leaf node’s left and right pointers will act as a previous and next pointer of the circular doubly linked list, respectively.

For example, consider the following binary tree. The leaf nodes are 7, 5, and 6, connected using the left and right pointers and form a circular doubly linked list.

> 

We know that the [height of a binary tree](https://techiedelight.com/calculate-height-binary-tree-iterative-recursive/) is the total number of nodes present on the longest path from the root to a leaf node. The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and calculate the left and right subtree’s height. The height of a subtree rooted at any node will be one more than the maximum height of its left and right subtree. Recursively apply this property to all tree nodes in a bottom-up manner (postorder fashion) and return the maximum height of the subtree rooted at that node.

For typical binary trees, the left and right children of a leaf node are null pointers. But here, the left and right child of leaf nodes act like the previous and next pointer of the circular doubly linked list. For a node to be a leaf node, check if its left’s right and right’s left are pointing to the node itself.

This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// Utility function to find the maximum of two integers
int max(int x, int y) {
    return (x > y) ? x : y;
}

// Data structure to store a binary tree node
struct Node
{
    int data;
    struct Node *left, *right;
};

// Utility function to allocate memory for a binary tree node
struct Node* allocateNode(int data)
{
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

// Recursive function to calculate the height of a binary tree with
// leaf nodes forming a circular doubly linked list
int height(struct Node* node)
{
    // base case: if the node is NULL
    if (node == NULL) {
        return 0;
    }

    // node is a leaf if its left's right and right's left
    // are pointing to the node itself
    if ((node->left && node->left->right == node) &&
        (node->right && node->right->left == node)) {
        return 1;
    }

    // recur for the left and right subtree and consider maximum depth
    return 1 + max(height(node->left), height(node->right));
}

int main(void)
{
    struct Node* root = NULL;

    // construct the tree
    root = allocateNode(1);
    root->left = allocateNode(2);
    root->right = allocateNode(3);
    root->left->left = allocateNode(4);
    root->left->right = allocateNode(5);        // leaf node
    root->right->right = allocateNode(6);       // leaf node
    root->left->left->left = allocateNode(7);   // leaf node

    // construct a circular doubly linked list from leaves
    struct Node* first = root->left->left->left;
    struct Node* second = root->left->right;
    struct Node* third = root->right->right;

    // set previous and next pointers of the linked list
    // (left and right pointer of a binary tree node, respectively)
    first->left = third;
    first->right = second;

    second->left = first;
    second->right = third;

    third->left = second;
    third->right = first;

    printf("The height of the binary tree is %d", height(root));

    return 0;
}
```

**Output:** The height of the binary tree is 4

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
    // Recursive function to calculate the height of a binary tree with
    // leaf nodes forming a circular doubly linked list
    public static int height(Node node)
    {
        // base case: if the node is null
        if (node == null) {
            return 0;
        }

        // node is a leaf if its left's right and right's left
        // are pointing to the node itself
        if ((node.left != null && node.left.right == node) &&
                    (node.right != null && node.right.left == node)) {
            return 1;
        }

        // recur for the left and right subtree and consider maximum depth
        return 1 + Math.max(height(node.left), height(node.right));
    }

    public static void main(String[] args)
    {
        // construct the tree
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);      // leaf node
        root.right.right = new Node(6);     // leaf node
        root.left.left.left = new Node(7);  // leaf node

        // construct a circular doubly linked list from leaves
        Node first = root.left.left.left;
        Node second = root.left.right;
        Node third = root.right.right;

        // set previous and next pointers of the linked list
        // (left and right child of a binary tree node, respectively)
        first.left = third;
        first.right = second;

        second.left = first;
        second.right = third;

        third.left = second;
        third.right = first;

        System.out.println("The height of the binary tree is " + height(root));
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

# Recursive function to calculate the height of a binary tree with
# leaf nodes forming a circular doubly linked list
def height(node):

    # base case: if the node is None
    if node is None:
        return 0

    # node is a leaf if its left's right and right's left
    # are pointing to the node itself
    if ((node.left and node.left.right == node) and
                (node.right and node.right.left == node)):
        return 1

    # recur for the left and right subtree and consider maximum depth
    return 1 + max(height(node.left), height(node.right))

if __name__ == '__main__':

    # construct the tree
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)       # leaf node
    root.right.right = Node(6)      # leaf node
    root.left.left.left = Node(7)   # leaf node

    # construct a circular doubly linked list from leaves
    first = root.left.left.left
    second = root.left.right
    third = root.right.right

    # set previous and next pointers of the linked list
    # (left and right child of a binary tree node, respectively)
    first.left = third
    first.right = second

    second.left = first
    second.right = third

    third.left = second
    third.right = first

    print('The height of the binary tree is', height(root))
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

**Author:** Aditya Goel

Also See:

> [Extract leaves of a binary tree into a doubly-linked list](https://www.techiedelight.com/extract-leaves-of-binary-tree-into-doubly-linked-list/ "Extract leaves of a binary tree into a doubly-linked list")

> [In-place convert a binary tree to a doubly-linked list](https://www.techiedelight.com/place-convert-given-binary-tree-to-doubly-linked-list/ "In-place convert a binary tree to a doubly-linked list")

> [Convert a ternary tree to a doubly-linked list](https://www.techiedelight.com/convert-ternary-tree-doubly-linked-list/ "Convert a ternary tree to a doubly-linked list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 153

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
