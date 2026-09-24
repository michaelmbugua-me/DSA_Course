# Find k’th largest node in a BST

> Source: https://www.techiedelight.com/find-kth-smallest-largest-element-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST and a positive number `k`, find the `k'th` largest node in the BST.

For example, consider the following binary search tree. If `k = 2`, the `k'th` largest node is 20.

> 

We know that an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) of a binary search tree returns the nodes in ascending order. To find the `k'th` smallest node, we can perform inorder traversal and store the inorder sequence in an array. Then the `k'th` largest node would be the `(n-k)'th` smallest node, where `n` is the total number of nodes present in the BST.

The problem with this approach is that it requires two traversals of the array. We can solve this problem in a single traversal of the array by using reverse inorder traversal (traverse the right subtree before the left subtree for every node). Then the reverse inorder traversal of a binary search tree will process the nodes in descending order.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <climits>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Function to perform inorder traversal on the tree
void inorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

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

// Function to find the k'th largest node in a BST.
// Here, `i` denotes the total number of nodes processed so far
Node* kthLargest(Node* root, int *i, int k)
{
    // base case
    if (root == nullptr) {
        return nullptr;
    }

    // search in the right subtree
    Node* left = kthLargest(root->right, i, k);

    // if k'th largest is found in the left subtree, return it
    if (left) {
        return left;
    }

    // if the current node is k'th largest, return its value
    if (++*i == k) {
        return root;
    }

    // otherwise, search in the left subtree
    return kthLargest(root->left, i, k);
}

// Function to find the k'th largest node in a BST
Node* findKthLargest(Node* root, int k)
{
    // maintain index to count the total number of nodes processed so far
    int i = 0;

    // traverse the tree in an inorder fashion and return k'th node
    return kthLargest(root, &i, k);
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16, 25 };

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    int k = 2;
    Node* node = findKthLargest(root, k);

    if (node != nullptr) {
        cout << node->data;
    }
    else {
        cout << "Invalid Input";
    }

    return 0;
}
```

**Output:** 20

##

```java
import java.util.concurrent.atomic.AtomicInteger;

// A class to store a BST node
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

    // Function to find the k'th largest node in the BST.
    // Here, `i` denotes the total number of nodes processed so far
    public static Node kthLargest(Node root, AtomicInteger i, int k)
    {
        // base case
        if (root == null) {
            return null;
        }

        // search in the right subtree
        Node left = kthLargest(root.right, i, k);

        // if k'th largest is found in the left subtree, return it
        if (left != null) {
            return left;
        }

        // if the current node is k'th largest, return its value
        if (i.incrementAndGet() == k) {
            return root;
        }

        // otherwise, search in the left subtree
        return kthLargest(root.left, i, k);
    }

    // Function to find the k'th largest node in the BST
    public static Node kthLargest(Node root, int k)
    {
        // maintain index to count the total number of nodes processed so far
        AtomicInteger i = new AtomicInteger(0);

        // traverse the tree in an inorder fashion and return k'th node
        return kthLargest(root, i, k);
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        int k = 2;
        Node node = kthLargest(root, k);

        if (node != null) {
            System.out.println(node.data);
        }
        else {
            System.out.println("Invalid Input");
        }
    }
}
```

##

```python3
import sys

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

# Function to find the k'th largest node in a BST.
# Here, `i` denotes the total number of nodes processed so far
def kthLargest(root, i, k):

    # base case
    if root is None:
        return None, i

    # search in the right subtree
    left, i = kthLargest(root.right, i, k)

    # if k'th largest is found in the left subtree, return it
    if left:
        return left, i

    i = i + 1

    # if the current node is k'th largest, return its value
    if i == k:
        return root, i

    # otherwise, search in the left subtree
    return kthLargest(root.left, i, k)

# Function to find the k'th largest node in a BST
def findKthLargest(root, k):

    # maintain index to count the total number of nodes processed so far
    i = 0

    # traverse the tree in an inorder fashion and return k'th node
    return kthLargest(root, i, k)[0]

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    root = None
    for key in keys:
        root = insert(root, key)

    k = 2
    result = findKthLargest(root, k)

    if result != sys.maxsize:
        print(result)
    else:
        print('Invalid Input')
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

Also See:

> [Fix a binary tree that is only one swap away from becoming a BST](https://www.techiedelight.com/fix-binary-tree-one-swap-bst/ "Fix a binary tree that is only one swap away from becoming a BST")

> [Update every key in a BST to contain the sum of all greater keys](https://www.techiedelight.com/update-every-key-bst-contain-sum-greater-keys/ "Update every key in a BST to contain the sum of all greater keys")

> [Remove nodes from a BST that have keys outside a valid range](https://www.techiedelight.com/remove-nodes-bst-keys-outside-valid-range/ "Remove nodes from a BST that have keys outside a valid range")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 161

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
