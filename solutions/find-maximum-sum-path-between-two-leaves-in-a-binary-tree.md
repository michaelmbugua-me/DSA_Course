# Find the maximum sum path between two leaves in a binary tree

> Source: https://www.techiedelight.com/find-maximum-sum-path-between-two-leaves-in-a-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to find the maximum sum of a path between any two leaves in it. Assume that the binary tree is not skewed and contains at-least two nodes.

For example, the maximum sum path in the following binary tree is 22:

> 

A simple solution would be to calculate the maximum sum node-to-leaf path from the left and right child for every node in the tree. The maximum sum path between two leaves that passes through a node has a value equal to the maximum sum node-to-leaf path of its left and right child plus the node’s value. Finally, consider the maximum value among all maximum sum paths found for every node in the tree.

The time complexity of this solution is O(n2) as there are `n` nodes in the tree, and for every node, we are calculating the maximum sum node-to-leaf path of its left and right subtree that takes O(n) time.

We can solve this problem in linear time by traversing the tree in a bottom-up manner. Instead of calculating the maximum sum node-to-leaf path of the left and right child for every node in the tree, calculate the maximum sum path between two leaves that passes through a node in constant time. The idea is to start from the bottom of the tree and return the maximum sum node-to-leaf path for each node to its parent.

The algorithm can be implemented as follows in C++, Java, and Python. Here, we pass the maximum sum path by reference to the function (instead of returning it) and update its value within the function itself using the return value of the left and right subtrees.

```cpp
#include <iostream>
#include <climits>
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

// Recursive function to find the maximum sum path between two leaves
// in a binary tree
int findMaxSumPath(Node* root, int &max_sum)
{
    // base case: empty tree
    if (root == nullptr) {
        return 0;
    }

    // find the maximum sum node-to-leaf path starting from the left child
    int left = findMaxSumPath(root->left, max_sum);

    // find the maximum sum node-to-leaf path starting from the right child
    int right = findMaxSumPath(root->right, max_sum);

    // it is important to return the maximum sum node-to-leaf path starting from the
    // current node

    // case 1: left child is null
    if (root->left == nullptr) {
        return right + root->data;
    }

    // case 2: right child is null
    if (root->right == nullptr) {
        return left + root->data;
    }

    // find the maximum sum path "through" the current node
    int cur_sum = left + right + root->data;

    // update the maximum sum path found so far (Note that maximum sum path
    // "excluding" the current node in the subtree rooted at the current node
    // is already updated as we are doing postorder traversal)

    max_sum = max(cur_sum, max_sum);

    // case 3: both left and right child exists
    return max(left, right) + root->data;
}

// Function to return the maximum sum path between two leaves in a binary tree
int findMaxSumPath(Node* root)
{
    int max_sum = INT_MIN;
    findMaxSumPath(root, max_sum);

    return max_sum;
}

int main()
{
    /* Construct the following tree
          1
        /   \
       /     \
      2       3
       \     / \
       -4   5   6
           / \
          7   8
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->right = new Node(-4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    cout << findMaxSumPath(root) << endl;

    return 0;
}
```

**Output:** 22

##

```java
import java.util.concurrent.atomic.AtomicInteger;

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
    // Recursive function to find the maximum sum path between two leaves
    // in a binary tree
    public static int findMaxSumPath(Node root, AtomicInteger max_sum)
    {
        // base case: empty tree
        if (root == null) {
            return 0;
        }

        // find the maximum sum node-to-leaf path starting from the left child
        int left = findMaxSumPath(root.left, max_sum);

        // find the maximum sum node-to-leaf path starting from the right child
        int right = findMaxSumPath(root.right, max_sum);

        // it is important to return the maximum sum node-to-leaf path starting
        // from the current node

        // case 1: left child is null
        if (root.left == null) {
            return right + root.data;
        }

        // case 2: right child is null
        if (root.right == null) {
            return left + root.data;
        }

        // find the maximum sum path "through" the current node
        int cur_sum = left + right + root.data;

        // update the maximum sum path found so far (Note that maximum sum path
        // "excluding" the current node in the subtree rooted at the current node
        // is already updated as we are doing postorder traversal)

        max_sum.set(Math.max(cur_sum, max_sum.get()));

        // case 3: both left and right child exists
        return Math.max(left, right) + root.data;
    }

    // Function to return the maximum sum path between two leaves in a binary tree
    public static int findMaxSumPath(Node root)
    {
        // using `AtomicInteger` to get the result since `Integer` is passed by
        // value in Java
        AtomicInteger max_sum = new AtomicInteger(Integer.MIN_VALUE);
        findMaxSumPath(root, max_sum);

        return max_sum.get();
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
              1
            /   \
           /     \
          2       3
           \     / \
           -4   5   6
               / \
              7   8
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.right = new Node(-4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        System.out.println(findMaxSumPath(root));
    }
}
```

##

```python3
import sys

# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to find the maximum sum path between two leaves
# in a binary tree
def findMaxSumPath(root, max_sum=-sys.maxsize):

    # base case: empty tree
    if root is None:
        return 0, max_sum

    # find the maximum sum node-to-leaf path starting from the left child
    left, max_sum = findMaxSumPath(root.left, max_sum)

    # find the maximum sum node-to-leaf path starting from the right child
    right, max_sum = findMaxSumPath(root.right, max_sum)

    # it is important to return the maximum sum node-to-leaf path starting from the
    # current node

    # case 1: left child is None
    if root.left is None:
        return (right + root.data), max_sum

    # case 2: right child is None
    if root.right is None:
        return (left + root.data), max_sum

    # find the maximum sum path "through" the current node
    cur_sum = left + right + root.data

    # update the maximum sum path found so far (Note that maximum sum path
    # "excluding" the current node in the subtree rooted at the current node
    # is already updated as we are doing postorder traversal)

    max_sum = max(cur_sum, max_sum)

    # case 3: both left and right child exists
    return (max(left, right) + root.data), max_sum

if __name__ == '__main__':

    ''' Construct the following tree
          1
        /   \
       /     \
      2       3
       \     / \
       -4   5   6
           / \
          7   8
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.right = Node(-4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    print(findMaxSumPath(root)[1])
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Find maximum sum root to leaf path in a binary tree](https://www.techiedelight.com/find-maximum-sum-root-to-leaf-path-binary-tree/ "Find maximum sum root to leaf path in a binary tree")

> [Maximum path sum in a binary tree](https://www.techiedelight.com/maximum-path-sum-binary-tree/ "Maximum path sum in a binary tree")

> [Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`](https://www.techiedelight.com/truncate-given-binary-tree-remove-nodes-lie-path-sum-less-k/ "Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 65

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
