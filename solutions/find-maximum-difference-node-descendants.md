# Find the maximum difference between a node and its descendants in a binary tree

> Source: https://www.techiedelight.com/find-maximum-difference-node-descendants/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, find the maximum difference between a node and its descendants in it. Assume that the binary tree contains at-least two nodes.

For example, consider the following tree. The maximum difference between a node and its descendants is 8 – 1 = 7.

> 

A simple solution would be to traverse the tree, and for every node, find the minimum value node in its left and right subtree. If the difference between the node and its descendants is more than the maximum difference found so far, update it. The time complexity of this solution is O(n2), where `n` is the total number of nodes in the binary tree.

We can solve this problem linearly by processing the tree nodes in a [bottom-up manner](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) by visiting the left and right subtree before processing a node. The function returns the minimum value among all nodes in the subtree rooted at it. So for any node, we can get minimum values in the left and right subtree in constant time. We find the maximum difference for every node, and if the difference is more than the maximum difference found so far, update it.

Following is the C++, Java, and Python implementation of the algorithm:

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

// Helper function to find the maximum difference between a node and its
// descendants in a binary tree
int findMaxDifference(Node* root, int &diff)
{
    // base case: if the tree is empty, return infinity
    if (root == nullptr) {
        return INT_MAX;
    }

    // recur for the left and right subtree
    int left = findMaxDifference(root->left, diff);
    int right = findMaxDifference(root->right, diff);

    // find the maximum difference between the current node and its descendants
    int d = INT_MIN;
    if (min(left, right) != INT_MAX) {
        d = root->data - min(left, right);
    }

    // update the maximum difference found so far if required
    diff = max(diff, d);

    // For the difference to be maximum, the function should return
    // a minimum value among all subtree nodes
    return min(min(left, right), root->data);
}

// Find the maximum difference between a node and its descendants in a binary tree
int findMaxDifference(Node* root)
{
    int diff = INT_MIN;
    findMaxDifference(root, diff);

    return diff;
}

int main()
{
    /* Construct the following tree
              6
            /   \
           /     \
          3       8
                /   \
               /     \
              2       4
            /   \
           /     \
          1       7
    */

    Node* root = new Node(6);
    root->left = new Node(3);
    root->right = new Node(8);
    root->right->left = new Node(2);
    root->right->right = new Node(4);
    root->right->left->left = new Node(1);
    root->right->left->right = new Node(7);

    cout << findMaxDifference(root);

    return 0;
}
```

**Output:** 7

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
    // Helper function to find the maximum difference between a node and its
    // descendants in a binary tree
    public static int findMaxDifference(Node root, AtomicInteger diff)
    {
        // base case: if the tree is empty, return infinity
        if (root == null) {
            return Integer.MAX_VALUE;
        }

        // recur for the left and right subtree
        int left = findMaxDifference(root.left, diff);
        int right = findMaxDifference(root.right, diff);

        // find the maximum difference between the current node and its descendants
        int d = Integer.MIN_VALUE;
        if (Math.min(left, right) != Integer.MAX_VALUE) {
            d = root.data - Math.min(left, right);
        }

        // update the maximum difference found so far if required
        diff.set(Math.max(diff.get(), d));

        // For the difference to be maximum, the function should return
        // a minimum value among all subtree nodes
        return Math.min(Math.min(left, right), root.data);
    }

    // Find the maximum difference between a node and its descendants in a binary tree
    public static int findMaxDifference(Node root)
    {
        // using `AtomicInteger` to get the result since `Integer` is passed by value
        // in Java
        AtomicInteger diff = new AtomicInteger(Integer.MIN_VALUE);
        findMaxDifference(root, diff);

        return diff.get();
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  6
                /   \
               /     \
              3       8
                    /   \
                   /     \
                  2       4
                /   \
               /     \
              1       7
        */

        Node root = new Node(6);
        root.left = new Node(3);
        root.right = new Node(8);
        root.right.left = new Node(2);
        root.right.right = new Node(4);
        root.right.left.left = new Node(1);
        root.right.left.right = new Node(7);

        System.out.print(findMaxDifference(root));
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

# Helper function to find the maximum difference between a node and its
# descendants in a binary tree
def findMaxDifference(root, diff=-sys.maxsize):

    # base case: if the tree is empty, return infinity
    if root is None:
        return sys.maxsize, diff

    # recur for the left and right subtree
    left, diff = findMaxDifference(root.left, diff)
    right, diff = findMaxDifference(root.right, diff)

    # find the maximum difference between the current node and its descendants
    d = root.data - min(left, right)

    # update the maximum difference found so far if required
    diff = max(diff, d)

    # For the difference to be maximum, the function should return
    # a minimum value among all subtree nodes
    return min(min(left, right), root.data), diff

if __name__ == '__main__':

    ''' Construct the following tree
              6
            /   \
           /     \
          3       8
                /   \
               /     \
              2       4
            /   \
           /     \
          1       7
    '''

    root = Node(6)
    root.left = Node(3)
    root.right = Node(8)
    root.right.left = Node(2)
    root.right.right = Node(4)
    root.right.left.left = Node(1)
    root.right.left.right = Node(7)

    print(findMaxDifference(root)[1])
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for call stack, where `h` is the height of the tree.

Also See:

> [Find difference between sum of all nodes present at odd and even levels in a binary tree](https://www.techiedelight.com/difference-between-sum-nodes-odd-even-levels/ "Find difference between sum of all nodes present at odd and even levels in a binary tree")

> [Fix children-sum property in a binary tree](https://www.techiedelight.com/fix-children-sum-property-binary-tree/ "Fix children-sum property in a binary tree")

> [Determine if a binary tree satisfies the height-balanced property of a red–black tree](https://www.techiedelight.com/determine-binary-tree-satisfy-height-balanced-property-red-black-tree/ "Determine if a binary tree satisfies the height-balanced property of a red–black tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
