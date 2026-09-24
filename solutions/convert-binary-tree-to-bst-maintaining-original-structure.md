# Convert a binary tree to BST by maintaining its original structure

> Source: https://www.techiedelight.com/convert-binary-tree-to-bst-maintaining-original-structure/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Convert a given binary tree into a BST (Binary Search Tree) by keeping its original structure intact.

For example, consider a binary tree shown on the left below. The solution should convert it into a BST shown on the right.

> 

The idea is to traverse the binary tree and store its keys in a set. We know that an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) of a binary search tree returns the nodes in sorted order, so traverse the tree again in an inorder fashion and put the keys present in the set (in sorted order) back to their correct position in the BST.

The advantage of using a set over an array is that the keys are always retrieved in sorted order from the set. If an array is used, [sort the keys](https://techiedelight.com/sort-array-ascending-order-cpp/) first before inserting them back.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <set>
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

// Function to traverse the binary tree and store its keys in a set
void extractKeys(Node* root, auto &set)
{
    // base case
    if (root == nullptr) {
        return;
    }

    extractKeys(root->left, set);
    set.insert(root->data);
    extractKeys(root->right, set);
}

// Function to put keys back into a set in their correct order in a BST
// by doing inorder traversal
void convertToBST(Node* root, auto &it)
{
    if (root == nullptr) {
        return;
    }

    convertToBST(root->left, it);

    root->data = *it;
    it++;

    convertToBST(root->right, it);
}

// Function to convert a binary tree to BST by maintaining its original structure
void convertToBST(Node* root)
{
    // traverse the binary tree and store its keys in a set
    set<int> set;
    extractKeys(root, set);

    // put back keys present in the set to their correct order in the BST
    auto it = set.begin();
    convertToBST(root, it);
}

int main()
{
    /* Construct the following tree
               8
             /   \
            /     \
           3       5
          / \     / \
         /   \   /   \
        10    2 4     6
    */

    Node* root = new Node(8);
    root->left = new Node(3);
    root->right = new Node(5);
    root->left->left = new Node(10);
    root->left->right = new Node(2);
    root->right->left = new Node(4);
    root->right->right = new Node(6);

    convertToBST(root);
    inorder(root);

    return 0;
}
```

**Output:** 2 3 4 5 6 8 10

##

```java
import java.util.TreeSet;
import java.util.Iterator;
import java.util.Set;

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

    // Function to traverse the binary tree and store its keys in a set
    public static void extractKeys(Node root, Set<Integer> set)
    {
        // base case
        if (root == null) {
            return;
        }

        extractKeys(root.left, set);
        set.add(root.data);
        extractKeys(root.right, set);
    }

    // Function to put keys back into a set in their correct order in the BST
    // by doing inorder traversal
    public static void convertToBST(Node root, Iterator<Integer> it)
    {
        if (root == null) {
            return;
        }

        convertToBST(root.left, it);
        root.data = it.next();
        convertToBST(root.right, it);
    }

    // Function to convert a binary tree to BST by maintaining its original structure
    public static void convertToBST(Node root)
    {
        // traverse the binary tree and store its keys in a set
        Set<Integer> set = new TreeSet<>();
        extractKeys(root, set);

        // put back keys present in the set to their correct order in the BST
        Iterator<Integer> it = set.iterator();
        convertToBST(root, it);
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                   8
                 /   \
                /     \
               3       5
              / \     / \
             /   \   /   \
            10    2 4     6
        */

        Node root = new Node(8);
        root.left = new Node(3);
        root.right = new Node(5);
        root.left.left = new Node(10);
        root.left.right = new Node(2);
        root.right.left = new Node(4);
        root.right.right = new Node(6);

        convertToBST(root);
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

# Function to traverse the binary tree and store its keys in a set
def extractKeys(root, keys):
    # base case
    if root is None:
        return
    extractKeys(root.left, keys)
    keys.append(root.data)
    extractKeys(root.right, keys)

# Function to put keys back into a set in their correct order in a BST
# by doing inorder traversal
def convertToBST(root, it):
    if root is None:
        return
    convertToBST(root.left, it)
    root.data = next(it)
    convertToBST(root.right, it)

# Function to convert a binary tree to BST by maintaining its original structure
def convert(root):
    # traverse the binary tree and store its keys in a set
    keys = list()
    extractKeys(root, keys)

    # put back keys present in the set to their correct order in the BST
    it = iter(sorted(keys))
    convertToBST(root, it)

if __name__ == '__main__':

    ''' Construct the following tree
               8
             /   \
            /     \
           3       5
          / \     / \
         /   \   /   \
        10    2 4     6
    '''

    root = Node(8)
    root.left = Node(3)
    root.right = Node(5)
    root.left.left = Node(10)
    root.left.right = Node(2)
    root.right.left = Node(4)
    root.right.right = Node(6)

    convert(root)
    inorder(root)
```

The time complexity of the above solution is O(n.log(n)), where `n` is the size of the BST, and requires linear space for storing the tree nodes.

Also See:

> [Fix a binary tree that is only one swap away from becoming a BST](https://www.techiedelight.com/fix-binary-tree-one-swap-bst/ "Fix a binary tree that is only one swap away from becoming a BST")

> [Determine whether a given binary tree is a BST or not](https://www.techiedelight.com/determine-given-binary-tree-is-a-bst-or-not/ "Determine whether a given binary tree is a BST or not")

> [Find k’th largest node in a BST](https://www.techiedelight.com/find-kth-smallest-largest-element-bst/ "Find k’th largest node in a BST")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.66/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
