# Clone a binary tree with random pointers

> Source: https://www.techiedelight.com/clone-a-binary-tree-with-random-pointers/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Write an efficient code to clone a binary tree with each node containing an additional random pointer. The random pointer can point to any node of the binary tree or can be null.

> 

The intuitive solution to clone a binary tree with random pointers is to insert each node into a [hash table](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the binary tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), and for each encountered node, create a new node with the same data and create a mapping from the original node to the duplicate node in the hash table. After creating the mapping, recursively set its left and right pointers. Finally, traverse the original binary tree again and update the duplicate nodes’ random pointers using the hash table.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Data structure to store a special binary tree node with a random pointer
struct Node
{
    int data;
    Node* left, *right;
    Node* random;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->right = this->left = nullptr;
        this->random = nullptr;
    }
};

// Function to print the preorder traversal on a given binary tree
void preorder(Node* root)
{
    if (root == nullptr) {
        return;
    }

    // print the current node's data
    cout << root->data << " ——> (";

    // print left child's data
    (root->left) ? cout << root->left->data    << ", " : cout << "X" << ", ";

    // print the right child's data
    (root->right) ? cout << root->right->data << ", " : cout << "X" << ", ";

    // print the random child's data
    (root->random) ? cout << root->random->data << ")\n": cout << "X" << ")\n";

    // recur for the left and right subtree
    preorder(root->left);
    preorder(root->right);
}

// Recursive function to copy random pointers from the original binary tree
// into the cloned binary tree using the map
void updateRandomPointers(Node* root, unordered_map<Node*, Node*> &map)
{
    // base case
    if (map[root] == nullptr) {
        return;
    }

    // update the random pointer of the cloned node
    map[root]->random = map[root->random];

    // recur for the left and right subtree
    updateRandomPointers(root->left, map);
    updateRandomPointers(root->right, map);
}

// Recursive function to clone the data, left, and right pointers for
// each node of a binary tree into a given map
Node* cloneLeftRightPointers(Node* root, unordered_map<Node*, Node*> &map)
{
    // base case
    if (root == nullptr) {
        return nullptr;
    }

    // clone all fields of the root node except the random pointer

    // create a new node with the same data as the root node
    map[root] = new Node(root->data);

    // clone the left and right subtree
    map[root]->left = cloneLeftRightPointers(root->left, map);
    map[root]->right = cloneLeftRightPointers(root->right, map);

    // return cloned root node
    return map[root];
}

// The main function to clone a special binary tree having random pointers
Node* cloneSpecialBinaryTree(Node* root)
{
    // base case
    if (root == nullptr) {
        return nullptr;
    }

    // create a map to store mappings from a node to its clone
    unordered_map<Node*, Node*> map;

    // clone data, left, and right pointers for each node of the original
    // binary tree, and put references into the map
    cloneLeftRightPointers(root, map);

    // update random pointers from the original binary tree in the map
    updateRandomPointers(root, map);

    // return the cloned root node
    return map[root];
}

int main()
{
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    root->left->left->random = root->right;
    root->left->right->random = root;
    root->right->left->random = root->left->left;
    root->random = root->left;

    cout << "Preorder traversal of the original tree:\n";
    preorder(root);

    Node* clone = cloneSpecialBinaryTree(root);

    cout << "\nPreorder traversal of the cloned tree:\n";
    preorder(clone);

    return 0;
}
```

##

```java
import java.util.HashMap;
import java.util.Map;

// Data structure to store a special binary tree node
// with a random pointer
class Node
{
    int data;
    Node left, right;
    Node random;

    // Constructor
    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Function to print the preorder traversal on a given binary tree
    public static void preorder(Node root)
    {
        if (root == null) {
            return;
        }

        // print the current node's data
        System.out.print(root.data + " —> (");

        // print left child's data
        System.out.print((root.left != null ? root.left.data : "X") + ", ");

        // print the right child's data
        System.out.print((root.right != null ? root.right.data : "X") + ", ");

        // print the random child's data
        System.out.println((root.random != null ? root.random.data : "X") + ")");

        // recur for the left and right subtree
        preorder(root.left);
        preorder(root.right);
    }

    // Recursive function to copy random pointers from the original binary tree
    // into the cloned binary tree using the map
    public static void updateRandomPointers(Node root, Map<Node, Node> map)
    {
        // base case
        if (map.get(root) == null) {
            return;
        }

        // update the random pointer of the cloned node
        map.get(root).random = map.get(root.random);

        // recur for the left and right subtree
        updateRandomPointers(root.left, map);
        updateRandomPointers(root.right, map);
    }

    // Recursive function to clone the data, left, and right children for
    // each node of a binary tree into a given map
    public static Node cloneLeftRightPointers(Node root, Map<Node, Node> map)
    {
        // base case
        if (root == null) {
            return null;
        }

        // clone all fields of the root node except the random pointer

        // create a new node with the same data as the root node
        map.put(root, new Node(root.data));

        // clone the left and right subtree
        map.get(root).left = cloneLeftRightPointers(root.left, map);
        map.get(root).right = cloneLeftRightPointers(root.right, map);

        // return cloned root node
        return map.get(root);
    }

    // The main function to clone a special binary tree with random pointers
    public static Node cloneSpecialBinaryTree(Node root)
    {
        // base case
        if (root == null) {
            return null;
        }

        // create a map to store mappings from a node to its clone
        Map<Node, Node> map = new HashMap<>();

        // clone data, left, and right children for each node of the original
        // binary tree, and put references into the map
        cloneLeftRightPointers(root, map);

        // update random pointers from the original binary tree in the map
        updateRandomPointers(root, map);

        // return the cloned root node
        return map.get(root);
    }

    public static void main(String[] args)
    {
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        root.left.left.random = root.right;
        root.left.right.random = root;
        root.right.left.random = root.left.left;
        root.random = root.left;

        System.out.println("Preorder traversal of the original tree:");
        preorder(root);

        Node clone = cloneSpecialBinaryTree(root);

        System.out.println("\nPreorder traversal of the cloned tree:");
        preorder(clone);
    }
}
```

##

```python3
# A class to store a special binary tree node with a random pointer
class Node:
    # Constructor
    def __init__(self, data, left=None, right=None, random=None):
        self.data = data
        self.left = left
        self.right = right
        self.random = random

# Function to print the preorder traversal on a given binary tree
def preorder(root):

    if root is None:
        return

    # print the current node's data
    print(root.data, end=' —> (')

    # print left child's data
    print((root.left.data if root.left else 'X'), end=', ')

    # print the right child's data
    print((root.right.data if root.right else 'X'), end=', ')

    # print the random child's data
    print(str(root.random.data if root.random else 'X') + ')')

    # recur for the left and right subtree
    preorder(root.left)
    preorder(root.right)

# Recursive function to copy random pointers from the original binary tree
# into the cloned binary tree using the dictionary
def updateRandomPointers(root, d):

    # base case
    if d.get(root) is None:
        return

    # update the random pointer of the cloned node
    d.get(root).random = d.get(root.random)

    # recur for the left and right subtree
    updateRandomPointers(root.left, d)
    updateRandomPointers(root.right, d)

# Recursive function to clone the data, left, and right children for
# each node of a binary tree into a given dictionary
def cloneLeftRightPointers(root, d):

    # base case
    if not root:
        return None

    # clone all fields of the root node except the random pointer

    # create a new node with the same data as the root node
    d[root] = Node(root.data)

    # clone the left and right subtree
    d[root].left = cloneLeftRightPointers(root.left, d)
    d[root].right = cloneLeftRightPointers(root.right, d)

    # return cloned root node
    return d[root]

# The main function to clone a special binary tree with random pointers
def cloneSpecialBinaryTree(root):

    # base case
    if not root:
        return root

    # create a dictionary to store mappings from a node to its clone
    d = {}

    # clone data, left, and right children for each node of the original
    # binary tree, and put references into the dictionary
    cloneLeftRightPointers(root, d)

    # update random pointers from the original binary tree in the dictionary
    updateRandomPointers(root, d)

    # return the cloned root node
    return d[root]

if __name__ == '__main__':

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    root.left.left.random = root.right
    root.left.right.random = root
    root.right.left.random = root.left.left
    root.random = root.left

    print('Preorder traversal of the original tree:')
    preorder(root)

    clone = cloneSpecialBinaryTree(root)

    print('\nPreorder traversal of the cloned tree:')
    preorder(clone)
```

**Output:** Preorder traversal of the original tree: 1 ——> (2, 3, 2) 2 ——> (4, 5, X) 4 ——> (X, X, 3) 5 ——> (X, X, 1) 3 ——> (6, 7, X) 6 ——> (X, X, 4) 7 ——> (X, X, X) Preorder traversal of the cloned tree: 1 ——> (2, 3, 2) 2 ——> (4, 5, X) 4 ——> (X, X, 3) 5 ——> (X, X, 1) 3 ——> (6, 7, X) 6 ——> (X, X, 4) 7 ——> (X, X, X)

The time complexity of this solution is O(n), where `n` is the total number of nodes in the binary tree. The extra space used by the solution is O(n) for the map and call stack.

Also See:

> [Clone a Binary Tree](https://www.techiedelight.com/clone-binary-tree/ "Clone a Binary Tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
