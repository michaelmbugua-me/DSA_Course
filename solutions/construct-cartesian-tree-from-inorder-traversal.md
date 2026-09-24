# Construct a Cartesian tree from an inorder traversal

> Source: https://www.techiedelight.com/construct-cartesian-tree-from-inorder-traversal/

Write an efficient algorithm to construct a [Cartesian tree](https://en.wikipedia.org/wiki/Cartesian_tree) from [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/). A Cartesian tree is a [binary tree](https://techiedelight.com/binary-tree-interview-questions/) with the [heap property](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap): the parent of any node has a smaller value than the node itself.

For example, the following figure shows an example of a Cartesian tree derived from the sequence of numbers in inorder order:

> 

Based on the heap property, the Cartesian tree root is the smallest number of the inorder sequence. The idea is to find the minimum element index in the inorder sequence and construct the root node from it. The left subtree consists of the values earlier than the root in the inorder sequence, while the right subtree consists of the values later than the root. Recursively follow this pattern for all nodes in the tree to construct the complete Cartesian tree.

Following is the implementation of the above algorithm in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Cartesian Tree Node
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

// Recursive function to perform inorder traversal on a Cartesian tree
void inorderTraversal(Node* root)
{
    if (root == nullptr) {
        return;
    }

    inorderTraversal(root->left);
    cout << root->data << ' ';
    inorderTraversal(root->right);
}

// Function to find the minimum element index in sequence represented by
// `inorder[start, end]`
int findMinElementIndex(vector<int> const &inorder, int start, int end)
{
    int minIndex = start;
    for (int i = start + 1; i <= end; i++)
    {
        if (inorder[minIndex] > inorder[i]) {
            minIndex = i;
        }
    }

    return minIndex;
}

// Recursive function to construct a Cartesian tree from a given inorder sequence
Node* constructTree(vector<int> const &inorder, int start, int end)
{
    // base case
    if (start > end) {
        return nullptr;
    }

    // Find the index of the minimum element in sequence `inorder[start, end]`
    int index = findMinElementIndex(inorder, start, end);

    // The minimum element in a given range of inorder sequence becomes the root
    Node* root = new Node(inorder[index]);

    // recursively construct the left subtree
    root->left = constructTree(inorder, start, index - 1);

    // recursively construct the right subtree
    root->right = constructTree(inorder, index + 1, end);

    // return the current node
    return root;
}

int main()
{
    // input sequence of numbers representing the inorder sequence
    vector<int> inorder = { 9, 3, 7, 1, 8, 12, 10, 20, 15, 18, 5 };

    // construct the Cartesian tree
    Node* root = constructTree(inorder, 0, inorder.size() - 1);

    // print the Cartesian tree
    cout << "Inorder traversal of the constructed Cartesian tree is ";
    inorderTraversal(root);

    return 0;
}
```

**Output:** Inorder traversal of the constructed Cartesian tree is 9 3 7 1 8 12 10 20 15 18 5

##

```java
// Cartesian Tree Node
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
    // Recursive function to perform inorder traversal on a Cartesian tree
    public static void inorderTraversal(Node root)
    {
        if (root == null) {
            return;
        }

        inorderTraversal(root.left);
        System.out.print(root.data + " ");
        inorderTraversal(root.right);
    }

    // Function to find the minimum element index in sequence represented by
    // `inorder[start, end]`
    public static int findMinElementIndex(int[] inorder, int start, int end)
    {
        int minIndex = start;
        for (int i = start + 1; i <= end; i++)
        {
            if (inorder[minIndex] > inorder[i]) {
                minIndex = i;
            }
        }

        return minIndex;
    }

    // Recursive function to construct a Cartesian tree from a given inorder sequence
    public static Node constructTree(int[] inorder, int start, int end)
    {
        // base case
        if (start > end) {
            return null;
        }

        // Find the index of the minimum element in sequence `inorder[start, end]`
        int index = findMinElementIndex(inorder, start, end);

        // The minimum element in a given range of inorder sequence becomes the root
        Node root = new Node(inorder[index]);

        // recursively construct the left subtree
        root.left = constructTree(inorder, start, index - 1);

        // recursively construct the right subtree
        root.right = constructTree(inorder, index + 1, end);

        // return the current node
        return root;
    }

    public static void main(String[] args)
    {
        // input sequence of numbers representing the inorder sequence
        int[] inorder = { 9, 3, 7, 1, 8, 12, 10, 20, 15, 18, 5 };

        // construct the Cartesian tree
        Node root = constructTree(inorder, 0, inorder.length - 1);

        // print the Cartesian tree
        System.out.print("Inorder traversal of the constructed Cartesian tree is ");
        inorderTraversal(root);
    }
}
```

##

```python3
# Cartesian Tree Node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to perform inorder traversal on a Cartesian tree
def inorderTraversal(root):
    if root is None:
        return

    inorderTraversal(root.left)
    print(root.data, end=' ')
    inorderTraversal(root.right)

# Function to find the minimum element index in sequence represented by
# `inorder[start, end]`
def findMinElementIndex(inorder, start, end):
    minIndex = start
    for i in range(start + 1, end + 1):
        if inorder[minIndex] > inorder[i]:
            minIndex = i
    return minIndex

# Recursive function to construct a Cartesian tree from a given inorder sequence
def constructTree(inorder, start, end):

    # base case
    if start > end:
        return None

    # Find the index of the minimum element in sequence `inorder[start, end]`
    index = findMinElementIndex(inorder, start, end)

    # The minimum element in a given range of inorder sequence becomes the root
    root = Node(inorder[index])

    # recursively construct the left subtree
    root.left = constructTree(inorder, start, index - 1)

    # recursively construct the right subtree
    root.right = constructTree(inorder, index + 1, end)

    # return the current node
    return root

if __name__ == '__main__':

    # input sequence of numbers representing the inorder sequence
    inorder = [9, 3, 7, 1, 8, 12, 10, 20, 15, 18, 5]

    # construct the Cartesian tree
    root = constructTree(inorder, 0, len(inorder) - 1)

    # print the Cartesian tree
    print('Inorder traversal of the constructed Cartesian tree is ', end='')
    inorderTraversal(root)
```

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the Cartesian tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

Also See:

> [Construct a binary tree from inorder and preorder traversal](https://www.techiedelight.com/construct-binary-tree-from-inorder-preorder-traversal/ "Construct a binary tree from inorder and preorder traversal")

> [Construct a binary tree from inorder and level order sequence](https://www.techiedelight.com/construct-binary-tree-from-inorder-level-order-traversals/ "Construct a binary tree from inorder and level order sequence")

> [Construct a binary tree from inorder and postorder traversals](https://www.techiedelight.com/construct-binary-tree-from-inorder-postorder-traversals/ "Construct a binary tree from inorder and postorder traversals")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 185

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
