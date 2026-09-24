# Construct a binary tree from inorder and preorder traversal

> Source: https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient algorithm to construct a binary tree from the given [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) sequence.

For example,

**Input:** Inorder Traversal : { 4, 2, 1, 7, 5, 8, 3, 6 } Preorder Traversal: { 1, 2, 4, 3, 5, 7, 8, 6 } **Output:** Below binary tree

> 

The idea is to start with the root node, which would be the first item in the preorder sequence, and find the boundary of its left and right subtree in the inorder sequence. To find the boundary, search for the index of the root node in the inorder sequence. All keys before the root node in the inorder sequence become part of the left subtree, and all keys after the root node become part of the right subtree. Repeat this recursively for all nodes in the tree and construct the tree in the process.

To illustrate, consider the following inorder and preorder sequence:

Inorder : { 4, 2, 1, 7, 5, 8, 3, 6 } Preorder : { 1, 2, 4, 3, 5, 7, 8, 6 }

The root will be the first element in the preorder sequence, i.e., `1`. Next, locate the index of the root node in the inorder sequence. Since `1` is the root node, all nodes before `1` in the inorder sequence must be included in the left subtree, i.e., `{4, 2}` and all the nodes after `1` must be included in the right subtree, i.e., `{7, 5, 8, 3, 6}`. Now the problem is reduced to building the left and right subtrees and linking them to the root node.

**Left subtree:** Inorder : {4, 2} Preorder : {2, 4} **Right subtree:** Inorder : {7, 5, 8, 3, 6} Preorder : {3, 5, 7, 8, 6}

The idea is to recursively follow the above approach until the complete tree is constructed. This is demonstrated below in C, C++, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// Data structure to store a binary tree node
struct Node
{
    int key;
    struct Node *left, *right;
};

// Function to create a new binary tree node having a given key
struct Node* newNode(int key)
{
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->key = key;
    node->left = node->right = NULL;

    return node;
}

// Recursive function to perform inorder traversal on a given binary tree
void inorderTraversal(struct Node* root)
{
    if (root == NULL) {
        return;
    }

    inorderTraversal(root->left);
    printf("%d ", root->key);
    inorderTraversal(root->right);
}

// Recursive function to perform preorder traversal on a given binary tree
void preorderTraversal(struct Node* root)
{
    if (root == NULL) {
        return;
    }

    printf("%d ", root->key);
    preorderTraversal(root->left);
    preorderTraversal(root->right);
}

// Recursive function to construct a binary tree from a given
// inorder and preorder sequence
struct Node* construct(int inorder[], int start, int end,
                int preorder[], int *pIndex)
{
    // base case
    if (start > end) {
        return NULL;
    }

    // The next element in `preorder[]` will be the root node of
    // subtree formed by sequence represented by `inorder[start, end]`
    struct Node* node = newNode(preorder[(*pIndex)++]);

    // search the root node index in sequence `inorder[]` to determine the
    // left and right subtree boundary
    int i;
    for (i = start; i <= end; i++)
    {
        if (inorder[i] == node->key) {
            break;
        }
    }

    // recursively construct the left subtree
    node->left = construct(inorder, start, i - 1, preorder, pIndex);

    // recursively construct the right subtree
    node->right = construct(inorder, i + 1, end, preorder, pIndex);

    // return current node
    return node;
}

// Construct a binary tree from inorder and preorder traversals.
// This function assumes that the input is valid, i.e., given
// inorder and preorder sequence forms a binary tree.
struct Node* constructTree(int inorder[], int preorder[], int n)
{
    // `pIndex` stores the index of the next unprocessed node in a preorder sequence;
    // root node is present at index 0 in a preorder sequence
    int pIndex = 0;

    return construct(inorder, 0, n - 1, preorder, &pIndex);
}

int main()
{
    /* Construct the following tree
               1
             /   \
            /     \
           2       3
          /       / \
         /       /   \
        4       5     6
               / \
              /   \
             7     8
    */

    int inorder[] = { 4, 2, 1, 7, 5, 8, 3, 6 };
    int preorder[] = { 1, 2, 4, 3, 5, 7, 8, 6 };
    int n = sizeof(inorder)/sizeof(inorder[0]);

    struct Node* root = constructTree(inorder, preorder, n);

    // traverse the constructed tree
    printf("The inorder traversal is "); inorderTraversal(root);
    printf("\nThe preorder traversal is "); preorderTraversal(root);

    return 0;
}
```

**Output:** The inorder traversal is 4 2 1 7 5 8 3 6 The preorder traversal is 1 2 4 3 5 7 8 6

##

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
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

// Recursive function to perform inorder traversal on a given binary tree
void inorderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorderTraversal(root->left);
    cout << root->key << ' ';
    inorderTraversal(root->right);
}

// Recursive function to perform postorder traversal on a given binary tree
void preorderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    cout << root->key << ' ';
    preorderTraversal(root->left);
    preorderTraversal(root->right);
}

// Recursive function to construct a binary tree from a given
// inorder and preorder sequence
Node* construct(int start, int end, vector<int> const &preorder,
                int &pIndex, unordered_map<int, int> &map)
{
    // base case
    if (start > end) {
        return nullptr;
    }

    // The next element in `preorder[]` will be the root node of subtree
    // formed by sequence represented by `inorder[start, end]`
    Node *root = new Node(preorder[pIndex++]);

    // get the root node index in sequence `inorder[]` to determine the
    // left and right subtree boundary
    int index = map[root->key];

    // recursively construct the left subtree
    root->left = construct(start, index - 1, preorder, pIndex, map);

    // recursively construct the right subtree
    root->right = construct(index + 1, end, preorder, pIndex, map);

    // return current node
    return root;
}

// Construct a binary tree from inorder and preorder traversals.
// This function assumes that the input is valid
// i.e., given inorder and preorder sequence forms a binary tree
Node* construct(vector<int> const &inorder, vector<int> const &preorder)
{
    // get the total number of nodes in the tree
    int n = inorder.size();

    // create a map to efficiently find the index of any element in
    // a given inorder sequence
    unordered_map<int, int> map;
    for (int i = 0; i < n; i++) {
        map[inorder[i]] = i;
    }

    // `pIndex` stores the index of the next unprocessed node in preorder;
    // start with the root node (present at 0th index)
    int pIndex = 0;

    return construct(0, n - 1, preorder, pIndex, map);
}

int main()
{
    /* Construct the following tree
               1
             /   \
            /     \
           2       3
          /       / \
         /       /   \
        4       5     6
               / \
              /   \
             7     8
    */

    vector<int> inorder = { 4, 2, 1, 7, 5, 8, 3, 6 };
    vector<int> preorder = { 1, 2, 4, 3, 5, 7, 8, 6 };

    Node* root = construct(inorder, preorder);

    // traverse the constructed tree
    cout << "The inorder traversal is "; inorderTraversal(root);
    cout << "\nThe preorder traversal is "; preorderTraversal(root);

    return 0;
}
```

##

```java
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

// A class to store a binary tree node
class Node
{
    int key;
    Node left, right;

    public Node(int key)
    {
        this.key = key;
        left = right = null;
    }
}

class Main
{
    // Recursive function to perform inorder traversal on a given binary tree
    public static void inorderTraversal(Node root)
    {
        if (root == null) {
            return;
        }

        inorderTraversal(root.left);
        System.out.print(root.key + " ");
        inorderTraversal(root.right);
    }

    // Recursive function to perform postorder traversal on a given binary tree
    public static void preorderTraversal(Node root)
    {
        if (root == null) {
            return;
        }

        System.out.print(root.key + " ");
        preorderTraversal(root.left);
        preorderTraversal(root.right);
    }

    // Recursive function to construct a binary tree from a given
    // inorder and preorder sequence
    public static Node construct(int start, int end,
                                int[] preorder, AtomicInteger pIndex,
                                Map<Integer, Integer> map) {
        // base case
        if (start > end) {
            return null;
        }

        // The next element in `preorder[]` will be the root node of subtree
        // formed by sequence represented by `inorder[start, end]`
        Node root = new Node(preorder[pIndex.getAndIncrement()]);

        // get the root node index in sequence `inorder[]` to determine the
        // left and right subtree boundary
        int index = map.get(root.key);

        // recursively construct the left subtree
        root.left = construct(start, index - 1, preorder, pIndex, map);

        // recursively construct the right subtree
        root.right = construct(index + 1, end, preorder, pIndex, map);

        // return current node
        return root;
    }

    // Construct a binary tree from inorder and preorder traversals.
    // This function assumes that the input is valid, i.e., given
    // inorder and preorder sequence forms a binary tree.
    public static Node construct(int[] inorder, int[] preorder)
    {
        // create a map to efficiently find the index of any element in
        // a given inorder sequence
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            map.put(inorder[i], i);
        }

        // `pIndex` stores the index of the next unprocessed node in a preorder
        // sequence. We start with the root node (present at 0th index).
        AtomicInteger pIndex = new AtomicInteger(0);

        return construct(0, inorder.length - 1, preorder, pIndex, map);
    }

    public static void main(String[] args) {
        /* Construct the following tree
                   1
                 /   \
                /     \
               2       3
              /       / \
             /       /   \
            4       5     6
                   / \
                  /   \
                 7     8
        */

        int[] inorder = { 4, 2, 1, 7, 5, 8, 3, 6 };
        int[] preorder = { 1, 2, 4, 3, 5, 7, 8, 6 };

        Node root = construct(inorder, preorder);

        // traverse the constructed tree
        System.out.print("The inorder traversal is ");
        inorderTraversal(root);

        System.out.print("\nThe preorder traversal is ");
        preorderTraversal(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    # Constructor
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to perform inorder traversal on a given binary tree
def inorderTraversal(root):
    if root is None:
        return

    inorderTraversal(root.left)
    print(root.data, end=' ')
    inorderTraversal(root.right)

# Recursive function to perform postorder traversal on a given binary tree
def preorderTraversal(root):
    if root is None:
        return

    print(root.data, end=' ')
    preorderTraversal(root.left)
    preorderTraversal(root.right)

# Recursive function to construct a binary tree from a given
# inorder and preorder sequence
def construct(start, end, preorder, pIndex, d):

    # base case
    if start > end:
        return None, pIndex

    # The next element in `preorder[]` will be the root node of subtree
    # formed by sequence represented by `inorder[start, end]`
    root = Node(preorder[pIndex])
    pIndex = pIndex + 1

    # get the index of the root node in inorder to determine the
    # left and right subtree boundary
    index = d[root.data]

    # recursively construct the left subtree
    root.left, pIndex = construct(start, index - 1, preorder, pIndex, d)

    # recursively construct the right subtree
    root.right, pIndex = construct(index + 1, end, preorder, pIndex, d)

    # return current node
    return root, pIndex

# Construct a binary tree from inorder and preorder traversals.
# This function assumes that the input is valid
# i.e., given inorder and preorder sequence forms a binary tree
def constructTree(inorder, preorder):

    # create a dictionary to efficiently find the index of any element in
    # a given inorder sequence
    d = {}
    for i, e in enumerate(inorder):
        d[e] = i

    # `pIndex` stores the index of the next unprocessed node in a preorder sequence;
    # start with the root node (present at 0th index)
    pIndex = 0

    return construct(0, len(inorder) - 1, preorder, pIndex, d)[0]

if __name__ == '__main__':

    ''' Construct the following tree
               1
             /   \
            /     \
           2       3
          /       / \
         /       /   \
        4       5     6
               / \
              /   \
             7     8
    '''

    inorder = [4, 2, 1, 7, 5, 8, 3, 6]
    preorder = [1, 2, 4, 3, 5, 7, 8, 6]

    root = constructTree(inorder, preorder)

    # traverse the constructed tree
    print('The inorder traversal is ', end='')
    inorderTraversal(root)

    print('\nThe preorder traversal is ', end='')
    preorderTraversal(root)
```

The time complexity of C++, Java, and Python solution is O(n), where `n` is the total number of nodes in the binary tree. They require O(n) extra space for hashing and recursion. The time complexity of the C solution is O(n2) and requires O(n) extra space for the call stack.

Also See:

> [Find postorder traversal of a binary tree from its inorder and preorder sequence](https://www.techiedelight.com/find-postorder-traversal-binary-tree-from-inorder-preorder-sequence/ "Find postorder traversal of a binary tree from its inorder and preorder sequence")

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Find preorder traversal of a binary tree from its inorder and postorder sequence](https://www.techiedelight.com/find-preorder-traversal-binary-tree-from-inorder-postorder/ "Find preorder traversal of a binary tree from its inorder and postorder sequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.5/5. Vote count: 210

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
