# Find difference between sum of all nodes present at odd and even levels in a binary tree

> Source: https://www.techiedelight.com/difference-between-sum-nodes-odd-even-levels/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, calculate the difference between the sum of all nodes present at odd levels and the sum of all nodes present at even level.

For example, consider the following binary tree. The required difference is:

`(1 + 4 + 5 + 6) - (2 + 3 + 7 + 8) = -4`

> 

The idea is to traverse the tree and pass the level of each node in recursion. We also pass a variable to store the required difference. If the node’s level is odd, increase the difference by the node’s value; otherwise, decrease the difference by the same amount. At the end of the recursion, the variable will contain the required difference.

Following is the C++, Java, and Python program that demonstrates it:

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

// Helper function
void findDiff(Node* root, int &diff, int level)
{
    // base case
    if (root == nullptr) {
        return;
    }

    // if the current level is odd
    if (level & 1) {
        diff += root->data;
    }
    // if the current level is even
    else {
        diff -= root->data;
    }

    // recur for the left and right subtree
    findDiff(root->left, diff, level + 1);
    findDiff(root->right, diff, level + 1);
}

// Function to calculate the difference between the sum of all nodes present
// at odd levels and the sum of all nodes present at even level
int findDiff(Node* root)
{
    int diff = 0;
    findDiff(root, diff, 1);

    return diff;
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

    cout << findDiff(root);

    return 0;
}
```

**Output:** -4

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
    // Helper function
    public static int findDiff(Node root, int diff, int level)
    {
        // base case
        if (root == null) {
            return diff;
        }

        // if the current level is odd
        if (level % 2 == 1) {
            diff = diff + root.data;
        }
        // if the current level is even
        else {
            diff = diff - root.data;
        }

        // recur for the left and right subtree
        diff = findDiff(root.left, diff, level + 1);
        diff = findDiff(root.right, diff, level + 1);

        return diff;
    }

    // Function to calculate the difference between the sum of all nodes present
    // at odd levels and the sum of all nodes present at even level
    public static int findDiff(Node root) {
        return findDiff(root, 0, 1);
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

        System.out.print(findDiff(root));
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

# Function to calculate the difference between the sum of all nodes present
# at odd levels and the sum of all nodes present at even level
def findDiff(root, diff=0, level=1):

    # base case
    if root is None:
        return diff

    # if the current level is odd
    if level % 2 == 1:
        diff = diff + root.data

    # if the current level is even
    else:
        diff = diff - root.data

    # recur for the left and right subtree
    diff = findDiff(root.left, diff, level + 1)
    diff = findDiff(root.right, diff, level + 1)

    return diff

if __name__ == '__main__':

    ''' Construct the following tree
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
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    print(findDiff(root))
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

Also See:

> [Efficiently print all nodes between two given levels in a binary tree](https://www.techiedelight.com/print-nodes-between-two-levels-binary-tree/ "Efficiently print all nodes between two given levels in a binary tree")

> [Find the maximum difference between a node and its descendants in a binary tree](https://www.techiedelight.com/find-maximum-difference-node-descendants/ "Find the maximum difference between a node and its descendants in a binary tree")

> [Fix children-sum property in a binary tree](https://www.techiedelight.com/fix-children-sum-property-binary-tree/ "Fix children-sum property in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 186

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
