# Find the diagonal sum of a binary tree

> Source: https://www.techiedelight.com/find-diagonal-sum-given-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, calculate the sum of all nodes for each diagonal having negative slope `\`. Assume that the left and right child of a node makes a 45–degree angle with the parent.

For example, consider the following binary tree having three diagonals. The sum of diagonals is 10, 15, and 11.

> 

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to create an empty map where each key in the map represents a diagonal in the binary tree, and its value maintains the sum of all nodes present in the diagonal. Then perform a [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree and update the map. For each node, recur for its left subtree by increasing the diagonal by one and recur for the right subtree with the same diagonal.

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
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

// Recursive function to perform preorder traversal on the tree and
// fill the map with the diagonal sum of elements
void diagonalSum(Node* root, int diagonal, auto &map)
{
    // base case: empty tree
    if (root == nullptr) {
        return;
    }

    // update the current diagonal with the node's value
    map[diagonal] += root->data;

    // recur for the left subtree by increasing diagonal by 1
    diagonalSum(root->left, diagonal + 1, map);

    // recur for the right subtree with the same diagonal
    diagonalSum(root->right, diagonal, map);
}

// Function to print the diagonal sum of a given binary tree
void diagonalSum(Node* root)
{
    // create an empty map to store the diagonal sum for every slope
    unordered_map<int, int> map;

    // traverse the tree in a preorder fashion and fill the map
    diagonalSum(root, 0, map);

    // traverse the map and print the diagonal sum
    for (int i = 0; i < map.size(); i++) {
        cout << map[i] << " ";
    }
}

int main()
{
    /* Construct the following tree
               1
             /  \
            /    \
           2      3
          /     /  \
         /     /    \
        4     5     6
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

    diagonalSum(root);

    return 0;
}
```

**Output:** 10 15 11

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
    // Recursive function to perform preorder traversal on the tree and
    // fill the map with the diagonal sum of elements
    public static void diagonalSum(Node root, int diagonal, Map<Integer, Integer> map)
    {
        // base case: empty tree
        if (root == null) {
            return;
        }

        // update the current diagonal with the node's value
        map.put(diagonal, map.getOrDefault(diagonal, 0) + root.data);

        // recur for the left subtree by increasing diagonal by 1
        diagonalSum(root.left, diagonal + 1, map);

        // recur for the right subtree with the same diagonal
        diagonalSum(root.right, diagonal, map);
    }

    // Function to print the diagonal sum of a given binary tree
    public static void diagonalSum(Node root)
    {
        // create an empty map to store the diagonal sum for every slope
        Map<Integer, Integer> map = new HashMap<>();

        // traverse the tree in a preorder fashion and fill the map
        diagonalSum(root, 0, map);

        // traverse the map and print the diagonal sum
        System.out.println(map.values());
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

        diagonalSum(root);
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

# Recursive function to perform preorder traversal on the tree and
# fill the dictionary with the diagonal sum of elements
def diagonalSum(root, diagonal, d):

    # base case: empty tree
    if root is None:
        return

    # update the current diagonal with the node's value
    d[diagonal] = d.get(diagonal, 0) + root.data

    # recur for the left subtree by increasing diagonal by 1
    diagonalSum(root.left, diagonal + 1, d)

    # recur for the right subtree with the same diagonal
    diagonalSum(root.right, diagonal, d)

# Function to print the diagonal sum of a given binary tree
def printDiagonalSum(root):

    # create an empty dictionary to store the diagonal sum for every slope
    d = {}

    # traverse the tree in a preorder fashion and fill the dictionary
    diagonalSum(root, 0, d)

    # print the diagonal sum
    print(list(d.values()))

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

    printDiagonalSum(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:**

1\. [Extend the solution to print nodes of every diagonal](https://techiedelight.com/print-diagonal-traversal-binary-tree/).

2\. Modify the solution to print the diagonal sum for diagonals having a positive slope `/`.

Also See:

> [Print diagonal traversal of a binary tree](https://www.techiedelight.com/print-diagonal-traversal-binary-tree/ "Print diagonal traversal of a binary tree")

> [In-place convert a binary tree to its sum tree](https://www.techiedelight.com/inplace-convert-a-tree-sum-tree/ "In-place convert a binary tree to its sum tree")

> [Fix children-sum property in a binary tree](https://www.techiedelight.com/fix-children-sum-property-binary-tree/ "Fix children-sum property in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 179

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
