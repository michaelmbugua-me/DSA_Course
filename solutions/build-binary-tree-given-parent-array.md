# Build a binary tree from a parent array

> Source: https://www.techiedelight.com/build-binary-tree-given-parent-array/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given an integer array representing a binary tree, such that the parent-child relationship is defined by `(A[i], i)` for every index `i` in array `A`, build a binary tree out of it. The root node’s value is `i` if `-1` is present at index `i` in the array. It may be assumed that the input provided to the program is valid.

For example,

**Parent: [-1, 0, 0, 1, 2, 2, 4, 4]** Index : [ 0, 1, 2, 3, 4, 5, 6, 7]

Note that,

  * -1 is present at index 0, which implies that the binary tree root is node 0.
  * 0 is present at index 1 and 2, which implies that the left and right children of node 0 are 1 and 2.
  * 1 is present at index 3, which implies that the left or the right child of node 1 is 3.
  * 2 is present at index 4 and 5, which implies that the left and right children of node 2 are 4 and 5.
  * 4 is present at index 6 and 7, which implies that the left and right children of node 4 are 6 and 7.

The corresponding binary tree is:

> 

The solution is simple and effective – create `n` new tree nodes, each having values from 0 to `n-1`, where `n` is the array’s size, and store them in a map or array for the quick lookup. Then traverse the given parent array and build the tree by setting the parent-child relationship defined by `(A[i], i)` for every index `i` in array `A`. Since several binary trees can be formed from a single input, the solution should build any of them. The solution will always set the left child for a node before setting its right child.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
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

// Function to build a binary tree from the given parent array
Node *createTree(vector<int> const &parent)
{
    int n = parent.size();

    // create an empty map
    unordered_map<int, Node*> map;

    // create `n` new tree nodes, each having a value from 0 to `n-1`,
    // and store them in a map
    for (int i = 0; i < n; i++) {
        map[i] = new Node(i);
    }

    // represents the root node of a binary tree
    Node* root = nullptr;

    // traverse the parent array and build the tree
    for (int i = 0; i < n; i++)
    {
        // if the parent is -1, set the root to the current node having the
        // value `i` (stored in map[i])
        if (parent[i] == -1) {
            root = map[i];
        }
        else {
            // get the parent for the current node
            Node* ptr = map[parent[i]];

            // if the parent's left child is filled,
            // map the node to its right child
            if (ptr->left) {
                ptr->right = map[i];
            }
            // if the parent's left child is empty, map the node to it
            else {
                ptr->left = map[i];
            }
        }
    }

    // return root of the constructed tree
    return root;
}

int main()
{
    vector<int> parent = { -1, 0, 0, 1, 2, 2, 4, 4 };

    Node* root = createTree(parent);
    inorder(root);

    return 0;
}
```

**Output:** 3 1 0 6 4 7 2 5

##

```java
import java.util.HashMap;
import java.util.Map;

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

    // Function to build a binary tree from the given parent array
    public static Node createTree(int[] parent)
    {
        // create an empty map
        Map<Integer, Node> map = new HashMap<>();

        // create `n` new tree nodes, each having a value from 0 to `n-1`,
        // and store them in a map
        for (int i = 0; i < parent.length; i++) {
            map.put(i, new Node(i));
        }

        // represents the root node of a binary tree
        Node root = null;

        // traverse the parent array and build the tree
        for (int i = 0; i < parent.length; i++)
        {
            // if the parent is -1, set the root to the current node having the
            // value `i` (stored in map[i])
            if (parent[i] == -1) {
                root = map.get(i);
            }
            else {
                // get the parent for the current node
                Node ptr = map.get(parent[i]);

                // if the parent's left child is filled, map the node to its right
                // child
                if (ptr.left != null) {
                    ptr.right = map.get(i);
                }
                // if the parent's left child is empty, map the node to it
                else {
                    ptr.left = map.get(i);
                }
            }
        }

        // return root of the constructed tree
        return root;
    }

    public static void main(String[] args)
    {
        int[] parent = {-1, 0, 0, 1, 2, 2, 4, 4};

        Node root = createTree(parent);
        inorder(root);
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

# Function to perform inorder traversal on the tree
def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.data, end=' ')
    inorder(root.right)

# Function to build a binary tree from the given parent list
def createTree(parent):

    # create an empty dictionary
    d = {}

    # create `n` new tree nodes, each having a value from 0 to `n-1`,
    # and store them in a dictionary
    for i in range(len(parent)):
        d[i] = Node(i)

    # represents the root node of a binary tree
    root = None

    # traverse the parent list and build the tree
    for i, e in enumerate(parent):

        # if the parent is -1, set the root to the current node having the
        # value `i` (stored in map[i])
        if e == -1:
            root = d[i]
        else:
            # get the parent for the current node
            ptr = d[e]

            # if the parent's left child is filled, map the node to its right child
            if ptr.left:
                ptr.right = d[i]
            # if the parent's left child is empty, map the node to it
            else:
                ptr.left = d[i]

    # return root of the constructed tree
    return root

if __name__ == '__main__':

    parent = [-1, 0, 0, 1, 2, 2, 4, 4]

    root = createTree(parent)
    inorder(root)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in a binary tree (assuming constant-time operations for the hash table). The auxiliary space required by the program is O(n).

Also See:

> [Determine whether the given binary tree nodes are cousins of each other](https://www.techiedelight.com/determine-two-nodes-are-cousins/ "Determine whether the given binary tree nodes are cousins of each other")

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

> [Sink nodes containing zero to the bottom of a binary tree](https://www.techiedelight.com/sink-nodes-containing-zero-bottom-binary-tree/ "Sink nodes containing zero to the bottom of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 179

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
