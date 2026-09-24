# Construct a binary tree from inorder and level order sequence

> Source: https://www.techiedelight.com/construct-binary-tree-from-inorder-level-order-traversals/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient algorithm to construct a binary tree from the given [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [level order](https://techiedelight.com/level-order-traversal-binary-tree/) sequence.

For example,

**Input:** Inorder Traversal : { 4, 2, 5, 1, 6, 3, 7 } level order traversal : { 1, 2, 3, 4, 5, 6, 7 } **Output:** Below binary tree

> 

The idea is to start with the root node, which would be the node with the minimum index in the level order sequence, and partition the inorder sequence for the left and right subtree. To find the left and right subtree boundary, search for the root node index in the inorder sequence. All keys before the root node in the inorder sequence will become part of the left subtree, and all keys after the root node will become part of the right subtree. Repeat this recursively for all nodes in the tree and construct the tree in the process.

To illustrate, consider the following in order and level order sequence:

Inorder : { 4, 2, 5, 1, 6, 3, 7 } Level-order : { 1, 2, 3, 4, 5, 6, 7 }

The root node is present at the first index in the level order sequence, i.e., node `1` is the root node. Now since node `1` is the root, all nodes before node `1`, i.e., `{4, 2, 5}`, must be included in the inorder sequence in the left subtree of the root node and all the nodes after node `1`, i.e., `{6, 3, 7}`, must be included in the right subtree. This logic reduces the problem of building the left and right subtrees and linking them to the root node.

**Left subtree:** Inorder : { 4, 2, 5 } Level-order : { 1, 2, 3, 4, 5, 6, 7 } **Right subtree:** Inorder : { 6, 3, 7 } Level-order : { 1, 2, 3, 4, 5, 6, 7 }

In the respective inorder sequence, the key which appears first in the level order traversal becomes the root node for the corresponding left or right subtree. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits>
using namespace std;

// Data structure to store a binary tree node
struct Node
{
    int data;
    Node* left, *right;

    Node(int data)
    {
        this->data = data;
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
    cout << root->data << " ";
    inorderTraversal(root->right);
}

// Recursive function to construct a binary tree from a given inorder and
// level order traversals
Node* buildTree(vector<int> const &inorder, int start, int end,
                unordered_map<int, int> map)
{
    // base case
    if (start > end) {
        return nullptr;
    }

    // find the root node index in sequence `inorder[]` to determine the
    // left and right subtree boundary
    int index = start;
    for (int j = start + 1; j <= end; j++)
    {
        // Find node with minimum index in level order traversal.
        // That would be the root node of the sequence inorder[start, end]
        if (map[inorder[j]] < map[inorder[index]]) {
            index = j;
        }
    }

    // construct the root node
    Node* root = new Node(inorder[index]);

    // recursively construct the left subtree
    root->left = buildTree(inorder, start, index - 1, map);

    // recursively construct the right subtree
    root->right = buildTree(inorder, index + 1, end, map);

    // return the root node
    return root;
}

// Construct a binary tree from inorder and level order traversals
Node* buildTree(vector<int> const &inorder, vector<int> const &level)
{
    int n = inorder.size();

    // create a map to efficiently find the index of an element in a
    // level order sequence
    unordered_map<int, int> map;
    for (int i = 0; i < n; i++) {
        map[level[i]] = i;
    }

    // construct the tree and return it
    return buildTree(inorder, 0, n - 1, map);
}

int main()
{
    vector<int> inorder = { 4, 2, 5, 1, 6, 3, 7 };
    vector<int> level    = { 1, 2, 3, 4, 5, 6, 7 };

    Node* root = buildTree(inorder, level);

    cout << "Inorder traversal of the constructed tree is ";
    inorderTraversal(root);

    return 0;
}
```

**Output:** Inorder traversal of the constructed tree is 4 2 5 1 6 3 7

##

```java
import java.util.HashMap;
import java.util.Map;

// A class to store a binary tree node
class Node
{
    int data;
    Node left, right;

    Node(int data) {
        this.data = data;
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
        System.out.print(root.data + " ");
        inorderTraversal(root.right);
    }

    // Recursive function to construct a binary tree from a given inorder and
    // level order traversals
    public static Node buildTree(int[] inorder, int start, int end,
                                Map<Integer, Integer> map)
    {
        // base case
        if (start > end) {
            return null;
        }

        // find the root node index in sequence `inorder[]` to determine the
        // left and right subtree boundary
        int index = start;
        for (int j = start + 1; j <= end; j++)
        {
            // Find node with minimum index in level order traversal.
            // That would be the root node of the sequence inorder[start, end]
            if (map.get(inorder[j]) < map.get(inorder[index])) {
                index = j;
            }
        }

        // construct the root node
        Node root = new Node(inorder[index]);

        // recursively construct the left subtree
        root.left = buildTree(inorder, start, index - 1, map);

        // recursively construct the right subtree
        root.right = buildTree(inorder, index + 1, end, map);

        // return the root node
        return root;
    }

    // Construct a binary tree from inorder and level order traversals
    public static Node buildTree(int[] in, int[] level)
    {
        // create a map to efficiently find the index of an element in a
        // level order sequence
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < in.length; i++) {
            map.put(level[i], i);
        }

        // construct the tree and return it
        return buildTree(in, 0, in.length - 1, map);
    }

    public static void main(String[] args)
    {
        int[] inorder = { 4, 2, 5, 1, 6, 3, 7 };
        int[] level    = { 1, 2, 3, 4, 5, 6, 7 };

        Node root = buildTree(inorder, level);

        System.out.print("Inorder traversal of the constructed tree is ");
        inorderTraversal(root);
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

# Recursive function to perform inorder traversal on a given binary tree
def inorderTraversal(root):

    if root is None:
        return

    inorderTraversal(root.left)
    print(root.data, end=' ')
    inorderTraversal(root.right)

# Recursive function to construct a binary tree from a given inorder and
# level order traversals
def buildTree(inorder, start, end, d):

    # base case
    if start > end:
        return None

    # find the root node index in sequence `inorder[]` to determine the
    # left and right subtree boundary
    index = start
    for j in range(start + 1, end + 1):
        # Find node with minimum index in level order traversal.
        # That would be the root node of the sequence inorder[start, end]
        if d.get(inorder[j]) < d.get(inorder[index]):
            index = j

    # construct the root node
    root = Node(inorder[index])

    # recursively construct the left subtree
    root.left = buildTree(inorder, start, index - 1, d)

    # recursively construct the right subtree
    root.right = buildTree(inorder, index + 1, end, d)

    # return the root node
    return root

# Construct a binary tree from inorder and level order traversals
def buildBT(inorder, level):

    # create a dictionary to efficiently find the index of an element in a
    # level order sequence
    d = {}
    for i, e in enumerate(level):
        d[e] = i

    # construct the tree and return it
    return buildTree(inorder, 0, len(inorder) - 1, d)

if __name__ == '__main__':

    inorder = [4, 2, 5, 1, 6, 3, 7]
    level = [1, 2, 3, 4, 5, 6, 7]

    root = buildBT(inorder, level)

    print('Inorder traversal of the constructed tree is ', end='')
    inorderTraversal(root)
```

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. It also requires O(n) extra space for map and call stack.

Also See:

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Construct a binary tree from inorder and postorder traversals](https://www.techiedelight.com/construct-binary-tree-from-inorder-postorder-traversals/ "Construct a binary tree from inorder and postorder traversals")

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
