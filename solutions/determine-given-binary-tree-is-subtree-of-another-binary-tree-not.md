# Determine whether a binary tree is a subtree of another binary tree

> Source: https://www.techiedelight.com/determine-given-binary-tree-is-subtree-of-another-binary-tree-not/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, determine whether it is a subtree of another binary tree. A subtree of a tree `T` is a tree consisting of a node in `T` and all of its descendants in `T`.

For example, the second tree is a subtree of the first tree.

> 

A naive solution would be to check if every subtree rooted at every node in the first tree is identical to the second tree or not. The time complexity of this solution is O(m.n), where `n` is the size of the first tree and `m` is the size of the second tree.

Also, we know that [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) traversal, or inorder and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) traversal identify a tree uniquely. The idea is to store inorder and postorder traversal of both trees in separate arrays. Then for a given binary tree `X` to be a subset of another binary tree `Y`, the inorder traversal of `X` should be a subset of the inorder traversal of `Y`. Similarly, the postorder traversal of `X` should be a subset of the postorder traversal of `Y`. We can also perform preorder instead of the postorder traversal. For example, consider the above trees:

inorder(X) = {4, 2, 5, 1, 6, 3, 7} inorder(Y) = {6, 3, 7} postorder(X) = {4, 5, 2, 6, 7, 3, 1} postorder(Y) = {6, 7, 3}

Since `inorder(Y)` is a subset of `inorder(X)`, and `postorder(Y)` is a subset of `postorder(X)`, we can say that `Y` is a subtree of `X`. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
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

// Function to store inorder traversal on the tree in a vector
void inorder(Node* node, vector<int> &vc)
{
    if (node == nullptr) {
        return;
    }

    inorder(node->left, vc);
    vc.push_back(node->data);
    inorder(node->right, vc);
}

// Function to store postorder traversal on the tree in a vector
void postorder(Node* node, vector<int> &vc)
{
    if (node == nullptr) {
        return;
    }

    postorder(node->left, vc);
    postorder(node->right, vc);
    vc.push_back(node->data);
}

// Function to check if a given binary tree is a subtree of another
// binary tree or not
bool checkSubtree(Node* tree, Node* subtree)
{
    // base case: both trees are the same
    if (tree == subtree) {
        return true;
    }

    // base case: if the first tree is empty but the second tree is non-empty
    if (tree == nullptr) {
        return false;
    }

    // store inorder traversal of both trees in `first` and `second`, respectively
    vector<int> first, second;
    inorder(tree, first);
    inorder(subtree, second);

    // return false if `second` is not a subarray of `first`
    auto it = search(first.begin(), first.end(), second.begin(), second.end());
    if (it == first.end()) {
        return false;
    }

    // reset both vectors
    first.erase(first.begin(), first.end());
    second.erase(second.begin(), second.end());

    // Now store postorder traversal of both trees in `first` and `second`,
    // respectively
    postorder(tree, first);
    postorder(subtree, second);

    // return false if `second` is not a subarray of `first`
    it = search(first.begin(), first.end(), second.begin(), second.end());
    if (it == first.end()) {
        return false;
    }

    return true;
}

int main()
{
    /* Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    checkSubtree(root, root->right)? cout << "Yes": cout << "No";

    return 0;
}
```

**Output:** Yes

##

```java
import java.util.ArrayList;
import java.util.List;

// A class to store a binary tree node
class Node
{
    int data;
    Node left = null, right = null;

    Node(int data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return String.valueOf(data);
    }
}

class Main
{
    // Function to store inorder traversal on the tree in a list
    public static void inorder(Node node, List<Integer> list)
    {
        if (node == null) {
            return;
        }

        inorder(node.left, list);
        list.add(node.data);
        inorder(node.right, list);
    }

    // Function to store postorder traversal on the tree in a list
    public static void postorder(Node node, List<Integer> list)
    {
        if (node == null) {
            return;
        }

        postorder(node.left, list);
        postorder(node.right, list);
        list.add(node.data);
    }

    // Utility function to check if y is sublist of x or not
    public static boolean isSublist(List<Integer> x, List<Integer> y) {

        for (int i = 0; i < x.size() - y.size() + 1; i++)
        {
            if (x.subList(i, i + y.size()).equals(y)) {
                return true;
            }
        }
        return false;
    }

    // Function to check if a given binary tree is a subtree of another
    // binary tree or not
    public static boolean checkSubtree(Node tree, Node subtree)
    {
        // base case: both trees are the same
        if (tree == subtree) {
            return true;
        }

        // base case: if the first tree is empty but the second tree is non-empty
        if (tree == null) {
            return false;
        }

        // store the inorder traversal of both trees in `first` and `second`,
        // respectively
        List<Integer> first = new ArrayList<>(), second = new ArrayList<>();
        inorder(tree, first);
        inorder(subtree, second);

        // return false if the second list is not a sublist of the first list
        if (!isSublist(first, second)) {
            return false;
        }

        // reset both lists
        first.clear();
        second.clear();

        // Now store postorder traversal of both trees in `first` and `second`,
        // respectively
        postorder(tree, first);
        postorder(subtree, second);

        // return false if the second list is not a sublist of the first list
        if (!isSublist(first, second)) {
            return false;
        }

        return true;
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                  1
                /   \
               /     \
              2       3
             / \     / \
            4   5   6   7
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);

        if (checkSubtree(root, root.right)) {
            System.out.print("Yes");
        }
        else {
            System.out.print("No");
        }
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

    def __repr__(self):
        return str(self.data)

# Function to store inorder traversal on the tree in a list
def inorder(node, list):
    if node is None:
        return

    inorder(node.left, list)
    list.append(node.data)
    inorder(node.right, list)

# Function to store postorder traversal on the tree in a list
def postorder(node, list):
    if node is None:
        return

    postorder(node.left, list)
    postorder(node.right, list)
    list.append(node.data)

# Utility function to check if y is sublist of x or not
def is_sublist(x, y):
    for i in range(len(x) - len(y) + 1):
        if x[i: i + len(y)] == y:
            return True
    return False

# Function to check if a given binary tree is a subtree of another
# binary tree or not
def checkSubtree(tree, subtree):

    # base case: both trees are the same
    if tree == subtree:
        return True

    # base case: if the first tree is empty but the second tree is non-empty
    if tree is None:
        return False

    # store the inorder traversal of both trees in `first` and `second`, respectively
    first = []
    second = []

    inorder(tree, first)
    inorder(subtree, second)

    # return false if the second list is not a sublist of the first list
    if not is_sublist(first, second):
        return False

    # reset both lists
    first.clear()
    second.clear()

    # Now store postorder traversal of both trees in `first` and `second`, respectively
    postorder(tree, first)
    postorder(subtree, second)

    # return false if the second list is not a sublist of the first list
    if not is_sublist(first, second):
        return False

    return True

if __name__ == '__main__':

    ''' Construct the following tree
              1
            /   \
           /     \
          2       3
         / \     / \
        4   5   6   7
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    if checkSubtree(root, root.right):
        print('Yes')
    else:
        print('No')
```

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n).

Also See:

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Determine whether the given binary tree nodes are cousins of each other](https://www.techiedelight.com/determine-two-nodes-are-cousins/ "Determine whether the given binary tree nodes are cousins of each other")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
