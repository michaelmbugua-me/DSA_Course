# Find maximum sum root to leaf path in a binary tree

> Source: https://www.techiedelight.com/find-maximum-sum-root-to-leaf-path-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to find the maximum sum root-to-leaf path, i.e., the maximum sum path from the root node to any leaf node in it.

For example, consider the following tree. The maximum sum is 18, and the maximum sum path is `[1, 3, 5, 9]`.

> 

The problem can be divided further into two subproblems:

  1. Calculate the maximum sum from the root node to any leaf node in a binary tree.
  2. Print root-to-leaf path having maximum sum in a binary tree.

We can solve both problems in linear time by traversing the tree in a bottom-up manner ([postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/)). Following is a simple implementation in C++, Java, and Python based on the idea:

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

// Function to print the root-to-leaf path with a given sum in a binary tree
bool printPath (Node* root, int sum)
{
    // base case
    if (sum == 0 && root == nullptr) {
        return true;
    }

    // base case
    if (root == nullptr) {
        return false;
    }

    // recur for the left and right subtree with reduced sum
    bool left = printPath(root->left, sum - root->data);
    bool right = false;

    if (!left) {
        right = printPath(root->right, sum - root->data);
    }

    // print the current node if it lies on a path with a given sum
    if (left || right) {
        cout << root->data << " ";
    }

    return left || right;
}

// Function to calculate the maximum root-to-leaf sum in a binary tree
int getRootToLeafSum(Node* root)
{
    // base case: tree is empty
    if (root == nullptr) {
        return INT_MIN;
    }

    // base case: current node is a leaf node
    if (root->left == nullptr && root->right == nullptr) {
        return root->data;
    }

    // calculate the maximum node-to-leaf sum for the left child
    int left = getRootToLeafSum(root->left);

    // calculate the maximum node-to-leaf sum for the right child
    int right = getRootToLeafSum(root->right);

    // consider the maximum sum child
    return (left > right? left : right) + root->data;
}

// Function to print maximum sum root-to-leaf path in a given binary tree
void findMaxSumPath(Node* root)
{
    int sum = getRootToLeafSum(root);
    cout << "The Maximum sum is " << sum << endl;
    cout << "The Maximum sum path is ";

    printPath(root, sum);
}

int main()
{
    /* Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        8   4   5   6
           /   / \   \
         10   7   9   5
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(8);
    root->left->right = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->left->right->left = new Node(10);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(9);
    root->right->right->right = new Node(5);

    findMaxSumPath(root);

    return 0;
}
```

**Output:** The maximum sum is 18 The maximum sum path is 9 5 3 1

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
    // Function to print the root-to-leaf path with a given sum in a binary tree
    public static boolean printPath(Node root, int sum)
    {
        // base case
        if (sum == 0 && root == null) {
            return true;
        }

        // base case
        if (root == null) {
            return false;
        }

        // recur for the left and right subtree with reduced sum
        boolean left = printPath(root.left, sum - root.data);
        boolean right = false;

        if (!left) {
            right = printPath(root.right, sum - root.data);
        }

        // print the current node if it lies on a path with a given sum
        if (left || right) {
            System.out.print(root.data + " ");
        }

        return left || right;
    }

    // Function to calculate the maximum root-to-leaf sum in a binary tree
    public static int getRootToLeafSum(Node root)
    {
        // base case: tree is empty
        if (root == null) {
            return Integer.MIN_VALUE;
        }

        // base case: current node is a leaf node
        if (root.left == null && root.right == null) {
            return root.data;
        }

        // calculate the maximum node-to-leaf sum for the left child
        int left = getRootToLeafSum(root.left);

        // calculate the maximum node-to-leaf sum for the right child
        int right = getRootToLeafSum(root.right);

        // consider the maximum sum child
        return (left > right? left : right) + root.data;
    }

    // Function to print maximum sum root-to-leaf path in a given binary tree
    public static void findMaxSumPath(Node root)
    {
        int sum = getRootToLeafSum(root);
        System.out.println("The maximum sum is " + sum);
        System.out.print("The maximum sum path is ");

        printPath(root, sum);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
               /     \
              2       3
             / \     / \
            8   4   5   6
               /   / \   \
             10   7   9   5
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(8);
        root.left.right = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.left.right.left = new Node(10);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(9);
        root.right.right.right = new Node(5);

        findMaxSumPath(root);
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

# Function to print the root-to-leaf path with a given sum in a binary tree
def printPath(root, total):

    # base case
    if total == 0 and root is None:
        return True

    # base case
    if root is None:
        return False

    # recur for the left and right subtree with reduced sum
    left = printPath(root.left, total - root.data)

    right= False
    if not left:
        right = printPath(root.right, total - root.data)

    # print the current node if it lies on a path with a given sum
    if left or right:
        print(root.data, end=' ')

    return left or right

# Function to calculate the maximum root-to-leaf sum in a binary tree
def getRootToLeafSum(root):

    # base case: tree is empty
    if root is None:
        return -sys.maxsize

    # base case: current node is a leaf node
    if root.left is None and root.right is None:
        return root.data

    # calculate the maximum node-to-leaf sum for the left child
    left = getRootToLeafSum(root.left)

    # calculate the maximum node-to-leaf sum for the right child
    right = getRootToLeafSum(root.right)

    # consider the maximum sum child
    return (left if left > right else right) + root.data

# Function to print maximum sum root-to-leaf path in a given binary tree
def findMaxSumPath(root):

    total = getRootToLeafSum(root)
    print('The maximum sum is', total)
    print('The maximum sum path is ', end='')

    printPath(root, total)

if __name__ == '__main__':

    root = None
    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        8   4   5   6
           /   / \   \
         10   7   9   5
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(8)
    root.left.right = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.left.right.left = Node(10)
    root.right.left.left = Node(7)
    root.right.left.right = Node(9)
    root.right.right.right = Node(5)

    findMaxSumPath(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

Also See:

> [Find the maximum sum path between two leaves in a binary tree](https://www.techiedelight.com/find-maximum-sum-path-between-two-leaves-in-a-binary-tree/ "Find the maximum sum path between two leaves in a binary tree")

> [Maximum path sum in a binary tree](https://www.techiedelight.com/maximum-path-sum-binary-tree/ "Maximum path sum in a binary tree")

> [Calculate sum of root to leaf digits in a binary tree](https://www.techiedelight.com/calculate-sum-root-to-leaf-digits/ "Calculate sum of root to leaf digits in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.65/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
