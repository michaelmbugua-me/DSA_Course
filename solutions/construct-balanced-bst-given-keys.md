# Construct a balanced BST from the given keys

> Source: https://www.techiedelight.com/construct-balanced-bst-given-keys/

Given an unsorted integer array that represents binary search tree (BST) keys, construct a height-balanced BST from it. For each node of a height-balanced tree, the difference between its left and right subtree height is at most 1.

For example,

**Input:** keys = [15, 10, 20, 8, 12, 16, 25] **Output:** 15 / \ 10 20 / \ / \ 8 12 16 25 OR 12 / \ 10 20 / / \ 8 16 25 / 15 OR Any other possible representation.

> 

We have already discussed how to [insert a key into a BST](https://techiedelight.com/insertion-in-bst/). The height of such BST in the worst-case can be as much as the total number of keys in the BST. The worst case happens when given keys are sorted in ascending or descending order, and we get a skewed tree where all the nodes except the leaf have one and only one child.

For height-balanced BSTs, with each comparison, skip about half of the tree so that each insertion operation takes time proportional to the logarithm of the total number of items `n` stored in the tree, i.e., log2n. This is much better than the linear time required to find items by key in an (unsorted) array or unbalanced trees.

We can easily modify the solution to get height-balanced BSTs if all keys are known in advance. The idea is to [sort the given keys](https://techiedelight.com/sort-array-ascending-order-cpp/) first. Then the root will be the middle element of the sorted array, and we recursively construct the left subtree of the root by keys less than the middle element and the right subtree of the root by keys more than the middle element. For example,

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
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

// Function to construct balanced BST from the given sorted array.
// Note that the root of the tree is passed by reference here
void convert(vector<int> const &keys, int low, int high, Node* &root)
{
    // base case
    if (low > high) {
        return;
    }

    // find the middle element of the current range
    int mid = (low + high) / 2;

    // construct a new node from the middle element and assign it to the root
    root = new Node(keys[mid]);

    // left subtree of the root will be formed by keys less than middle element
    convert(keys, low, mid - 1, root->left);

    // right subtree of the root will be formed by keys more than the middle element
    convert(keys, mid + 1, high, root->right);
}

// Function to construct balanced BST from the given unsorted array
Node* convert(vector<int> keys)
{
    // sort the keys first
    sort(keys.begin(), keys.end());

    // construct a balanced BST
    Node* root = nullptr;
    convert(keys, 0, keys.size() - 1, root);

    // return root node of the tree
    return root;
}

int main()
{
    // input keys
    vector<int> keys = { 15, 10, 20, 8, 12, 16, 25 };

    // construct a balanced binary search tree
    Node* root = convert(keys);

    // print the keys in an inorder fashion
    inorder(root);

    return 0;
}
```

**Output:** 8 10 12 15 16 20 25

##

```java
import java.util.Arrays;

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
    // Function to perform inorder traversal on the tree
    public static void inorder(Node root)
    {
        if (root == null) {
            return;
        }

        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    // Function to construct balanced BST from the given sorted array
    public static Node convert(int[] keys, int low, int high, Node root)
    {
        // base case
        if (low > high) {
            return root;
        }

        // find the middle element of the current range
        int mid = (low + high) / 2;

        // construct a new node from the middle element and assign it to the root
        root = new Node(keys[mid]);

        // left subtree of the root will be formed by keys less than middle element
        root.left = convert(keys, low, mid - 1, root.left);

        // right subtree of the root will be formed by keys more than the
        // middle element
        root.right = convert(keys, mid + 1, high, root.right);

        return root;
    }

    // Function to construct balanced BST from the given unsorted array
    public static Node convert(int[] keys)
    {
        // sort the keys first
        Arrays.sort(keys);

        // construct a balanced BST and return the root node of the tree
        return convert(keys, 0, keys.length - 1, null);
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        // construct a balanced binary search tree
        Node root = convert(keys);

        // print the keys in an inorder fashion
        inorder(root);
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

# Function to perform inorder traversal on the tree
def inorder(root):
    if root is None:
        return

    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Function to construct balanced BST from the given sorted list
def construct(keys, low, high, root):

    # base case
    if low > high:
        return root

    # find the middle element of the current range
    mid = (low + high) // 2

    # construct a new node from the middle element and assign it to the root
    root = Node(keys[mid])

    # left subtree of the root will be formed by keys less than middle element
    root.left = construct(keys, low, mid - 1, root.left)

    # right subtree of the root will be formed by keys more than the middle element
    root.right = construct(keys, mid + 1, high, root.right)

    return root

# Function to construct balanced BST from the given unsorted list
def constructBST(keys):

    # sort the keys first
    keys.sort()

    # construct a balanced BST and return the root node of the tree
    return construct(keys, 0, len(keys) - 1, None)

if __name__ == '__main__':

    # input keys
    keys = [15, 10, 20, 8, 12, 16, 25]

    # construct a balanced binary search tree
    root = constructBST(keys)

    # print the keys in an inorder fashion
    inorder(root)
```

The time complexity of the above solution is O(n.log(n)), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

Also See:

> [Remove nodes from a BST that have keys outside a valid range](https://www.techiedelight.com/remove-nodes-bst-keys-outside-valid-range/ "Remove nodes from a BST that have keys outside a valid range")

> [Construct a height-balanced BST from an unbalanced BST](https://www.techiedelight.com/construct-height-balanced-bst-from-unbalanced-bst/ "Construct a height-balanced BST from an unbalanced BST")

> [In-place merge two height-balanced BSTs](https://www.techiedelight.com/in-place-merge-two-height-balanced-bsts/ "In-place merge two height-balanced BSTs")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 280

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
