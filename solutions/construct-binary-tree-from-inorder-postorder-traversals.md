# Construct a binary tree from inorder and postorder traversals

> Source: https://www.techiedelight.com/construct-binary-tree-from-inorder-postorder-traversals/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient algorithm to construct a binary tree from the given [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) traversals.

For example,

**Input:** Inorder Traversal : { 4, 2, 1, 7, 5, 8, 3, 6 } Postorder Traversal : { 4, 2, 7, 8, 5, 6, 3, 1 } **Output:** Below binary tree

> 

The idea is to start with the root node, which would be the last item in the postorder sequence, and find the boundary of its left and right subtree in the inorder sequence. To find the boundary, search for the index of the root node in the inorder sequence. All keys before the root node in the inorder sequence become part of the left subtree, and all keys after the root node become part of the right subtree. Repeat this recursively for all nodes in the tree and construct the tree in the process.

To illustrate, consider the following inorder and postorder sequence:

Inorder : { 4, 2, 1, 7, 5, 8, 3, 6 } Postorder : { 4, 2, 7, 8, 5, 6, 3, 1 }

Root would be the last element in the postorder sequence, i.e., `1`. Next, locate the index of the root node in the inorder sequence. Now since `1` is the root node, all nodes before `1` in the inorder sequence must be included in the left subtree of the root node, i.e., `{4, 2}` and all the nodes after `1` must be included in the right subtree, i.e., `{7, 5, 8, 3, 6}`. Now the problem is reduced to building the left and right subtrees and linking them to the root node.

**Left subtree:** Inorder : {4, 2} Postorder : {4, 2} **Right subtree:** Inorder : {7, 5, 8, 3, 6} Postorder : {7, 8, 5, 6, 3}

The idea is to recursively follow the above approach until the complete tree is constructed. This is demonstrated below in C/C++, Java, and Python:

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

// Recursive function to perform postorder traversal on a given binary tree
void postorderTraversal(struct Node* root)
{
    if (root == NULL) {
        return;
    }

    postorderTraversal(root->left);
    postorderTraversal(root->right);
    printf("%d ", root->key);
}

// Recursive function to construct a binary tree from a given
// inorder and postorder traversals
struct Node* construct(int inorder[], int start, int end,
                    int postorder[], int *pIndex)
{
    // base case
    if (start > end) {
        return NULL;
    }

    // Consider the next item from the end of a given postorder sequence.
    // This value would be the root node of the subtree formed by the sequence
    // inorder[start, end].
    struct Node* node = newNode(postorder[(*pIndex)--]);

    // search the current node index in inorder sequence to determine
    // the boundary of the left and right subtree of the current node
    int i;
    for (i = start; i <= end; i++)
    {
        if (inorder[i] == node->key) {
            break;
        }
    }

    // recursively construct the right subtree
    node->right= construct(inorder, i + 1, end, postorder, pIndex);

    // recursively construct the left subtree
    node->left = construct(inorder, start, i - 1, postorder, pIndex);

    // return the current node
    return node;
}

// Construct a binary tree from inorder and postorder traversals.
// This function assumes that the input is valid, i.e., given
// inorder and postorder sequences forming a binary tree.
struct Node* constructTree(int inorder[], int postorder[], int n)
{
    // `pIndex` stores the index of the next unprocessed node from the end
    // of the postorder sequence
    int *pIndex = &n;
    return construct(inorder, 0, n, postorder, pIndex);
}

int main(void)
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

    int inorder[]    = { 4, 2, 1, 7, 5, 8, 3, 6 };
    int postorder[] = { 4, 2, 7, 8, 5, 6, 3, 1 };
    int n = sizeof(inorder)/sizeof(inorder[0]);

    struct Node* root = constructTree(inorder, postorder, n - 1);

    // traverse the constructed tree
    printf("Inorder traversal is "); inorderTraversal(root);
    printf("\nPostorder traversal is "); postorderTraversal(root);

    return 0;
}
```

**Output:** Inorder traversal is 4 2 1 7 5 8 3 6 Postorder traversal is 4 2 7 8 5 6 3 1

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
void postorderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    postorderTraversal(root->left);
    postorderTraversal(root->right);
    cout << root->key << ' ';
}

// Recursive function to construct a binary tree from a given
// inorder and postorder traversals
Node* construct(int start, int end,
                vector<int> const &postorder, int &pIndex,
                unordered_map<int, int> &map)
{
    // base case
    if (start > end) {
        return nullptr;
    }

    // Consider the next item from the end of a given postorder sequence.
    // This value would be the root node of a subtree formed by sequence
    // inorder[start, end].
    Node* root = new Node(postorder[pIndex--]);

    // search the current node index in inorder sequence to determine
    // the boundary of the left and right subtree of the current node
    int index = map[root->key];

    // recursively construct the right subtree
    root->right = construct(index + 1, end, postorder, pIndex, map);

    // recursively construct the left subtree
    root->left = construct(start, index - 1, postorder, pIndex, map);

    // return the root node
    return root;
}

// Construct a binary tree from inorder and postorder traversals.
// This function assumes that the input is valid, i.e., given
// inorder and postorder sequences forming a binary tree.
Node* construct(vector<int> const &inorder, vector<int> const &postorder)
{
    int n = inorder.size();

    // map is used to efficiently find the index of any element in
    // a given inorder sequence
    unordered_map<int, int> map;
    for (int i = 0; i < inorder.size(); i++) {
        map[inorder[i]] = i;
    }

    // `pIndex` stores the index of the next unprocessed node from the end
    // of the postorder sequence
    int pIndex = n - 1;
    return construct(0, n - 1, postorder, pIndex, map);
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
    vector<int> postorder = { 4, 2, 7, 8, 5, 6, 3, 1 };

    Node* root = construct(inorder, postorder);

    // traverse the constructed tree
    cout << "Inorder traversal is "; inorderTraversal(root);
    cout << "\nPostorder traversal is "; postorderTraversal(root);

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

    Node(int key) {
        this.key = key;
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
    public static void postorderTraversal(Node root)
    {
        if (root == null) {
            return;
        }

        postorderTraversal(root.left);
        postorderTraversal(root.right);
        System.out.print(root.key + " ");
    }

    // Recursive function to construct a binary tree from a given
    // inorder and postorder traversals
    public static Node construct(int start, int end,
                int[] postorder, AtomicInteger pIndex,
                Map<Integer, Integer> map)
    {
        // base case
        if (start > end) {
            return null;
        }

        // Consider the next item from the end of a given postorder sequence.
        // This value would be the root node of a subtree formed by sequence
        // inorder[start, end].
        Node root = new Node(postorder[pIndex.getAndDecrement()]);

        // search the current node index in inorder sequence to determine
        // the boundary of the left and right subtree of the current node
        int index = map.get(root.key);

        // recursively construct the right subtree
        root.right = construct(index + 1, end, postorder, pIndex, map);

        // recursively construct the left subtree
        root.left = construct(start, index - 1, postorder, pIndex, map);

        // return the root node
        return root;
    }

    // Construct a binary tree from inorder and postorder traversals.
    // This function assumes that the input is valid, i.e., given
    // inorder and postorder sequences forming a binary tree.
    public static Node construct(int[] inorder, int[] postorder)
    {
        // get size
        int n = inorder.length;

        // map is used to efficiently find the index of any element in
        // a given inorder sequence
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            map.put(inorder[i], i);
        }

        // `pIndex` stores the index of the next unprocessed node from the end
        // of the postorder sequence
        AtomicInteger pIndex = new AtomicInteger(n - 1);
        return construct(0, n - 1, postorder, pIndex, map);
    }

    public static void main(String[] args)
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

        int[] inorder = { 4, 2, 1, 7, 5, 8, 3, 6 };
        int[] postorder = { 4, 2, 7, 8, 5, 6, 3, 1 };

        Node root = construct(inorder, postorder);

        // traverse the constructed tree
        System.out.print("Inorder traversal is "); inorderTraversal(root);
        System.out.print("\nPostorder traversal is "); postorderTraversal(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, key):
        self.key = key

# Recursive function to perform inorder traversal on a given binary tree
def inorderTraversal(root):

    if root is None:
        return

    inorderTraversal(root.left)
    print(root.key, end=' ')
    inorderTraversal(root.right)

# Recursive function to perform postorder traversal on a given binary tree
def postorderTraversal(root):

    if root is None:
        return

    postorderTraversal(root.left)
    postorderTraversal(root.right)
    print(root.key, end=' ')

# Recursive function to construct a binary tree from a given
# inorder and postorder traversals
def construct(start, end, postorder, pIndex, d):

    # base case
    if start > end:
        return None, pIndex

    # Consider the next item from the end of a given postorder sequence.
    # This value would be the root node of a subtree formed by sequence
    # inorder[start, end].
    root = Node(postorder[pIndex])
    pIndex = pIndex - 1

    # search the current node index in inorder sequence to determine
    # the boundary of the left and right subtree of the current node
    index = d[root.key]

    # recursively construct the right subtree
    root.right, pIndex = construct(index + 1, end, postorder, pIndex, d)

    # recursively construct the left subtree
    root.left, pIndex = construct(start, index - 1, postorder, pIndex, d)

    # return the root node
    return root, pIndex

# Construct a binary tree from inorder and postorder traversals.
# This function assumes that the input is valid, i.e., given
# inorder and postorder sequences forming a binary tree.
def constructTree(inorder, postorder):

    # get size
    n = len(inorder)

    # dictionary is used to efficiently find the index of any element in
    # a given inorder sequence
    d = {}
    for i, e in enumerate(inorder):
        d[e] = i

    # `pIndex` stores the index of the next unprocessed node from the end
    # of the postorder sequence
    pIndex = n - 1
    return construct(0, n - 1, postorder, pIndex, d)[0]

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
    postorder = [4, 2, 7, 8, 5, 6, 3, 1]

    root = constructTree(inorder, postorder)

    # traverse the constructed tree
    print('Inorder traversal is ', end='')
    inorderTraversal(root)

    print('\nPostorder traversal is ', end='')
    postorderTraversal(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(n) extra space for hashing and recursion. The time complexity of the C solution is O(n2) and requires O(n) extra space for the call stack.

Also See:

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

> [Find preorder traversal of a binary tree from its inorder and postorder sequence](https://www.techiedelight.com/find-preorder-traversal-binary-tree-from-inorder-postorder/ "Find preorder traversal of a binary tree from its inorder and postorder sequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 198

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
