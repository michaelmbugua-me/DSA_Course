# Find the diameter of a binary tree

> Source: https://www.techiedelight.com/find-diameter-of-a-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to compute the diameter of it. A binary tree diameter equals the total number of nodes on the longest path between any two leaves in it.

The following figure shows two binary trees with diameters 6 and 5, respectively (nodes highlighted in blue). The binary tree diameter shown on the left side passes through the root node, while the diameter of the binary tree shown on the right side does not pass through the root node.

> 

A simple solution would be to calculate the left and right subtree’s height for each node in the tree. The _maximum node path_ that passes through a node will have a value one more than the sum of the height of its left and right subtree. Finally, the diameter is maximum among all _maximum node paths_ for every node in the tree. The time complexity of this solution is O(n2) as there are `n` nodes in the tree, and for every node, we are calculating the height of its left and right subtree that takes O(n) time.

We can solve this problem in linear time by doing a [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) on the tree. Instead of calculating the height of the left and the right subtree for every node in the tree, get the height in constant time. The idea is to start from the bottom of the tree and return the height of the subtree rooted at a given node to its parent. The height of a subtree rooted at any node is one more than the maximum height of the left or right subtree.

The algorithm can be implemented as follows in C++, Java, and Python. Here, we pass diameter by reference to the function (_instead of returning it_) and update its value within the function itself using the left and right subtree height.

```cpp
#include <iostream>
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

// Function to find the diameter of the binary tree. Note that the function
// returns the height of the subtree rooted at a given node, and the diameter
// is updated within the function as it is passed by reference
int getDiameter(Node* root, int &diameter)
{
    // base case: tree is empty
    if (root == nullptr) {
        return 0;
    }

    // get heights of left and right subtrees
    int left_height = getDiameter(root->left, diameter);
    int right_height = getDiameter(root->right, diameter);

    // calculate diameter "through" the current node
    int max_diameter = left_height + right_height + 1;

    // update maximum diameter (note that diameter "excluding" the current
    // node in the subtree rooted at the current node is already updated
    // since we are doing postorder traversal)
    diameter = max(diameter, max_diameter);

    // it is important to return the height of the subtree rooted at the current node
    return max(left_height, right_height) + 1;
}

int getDiameter(Node* root)
{
    int diameter = 0;
    getDiameter(root, diameter);

    return diameter;
}

int main()
{
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->right = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->right->left->left = new Node(7);
    root->right->left->right = new Node(8);

    cout << "The diameter of the tree is " << getDiameter(root);

    return 0;
}
```

**Output:** The diameter of the tree is 6

##

```java
import java.util.concurrent.atomic.AtomicInteger;

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
    // Function to find the diameter of the binary tree. Note that the
    // function returns the height of the subtree rooted at a given node,
    // and the diameter is updated within the function as it is passed by
    // reference using the `AtomicInteger` class.
    public static int getDiameter(Node root, AtomicInteger diameter)
    {
        // base case: tree is empty
        if (root == null) {
            return 0;
        }

        // get heights of left and right subtrees
        int left_height = getDiameter(root.left, diameter);
        int right_height = getDiameter(root.right, diameter);

        // calculate diameter "through" the current node
        int max_diameter = left_height + right_height + 1;

        // update maximum diameter (note that diameter "excluding" the current
        // node in the subtree rooted at the current node is already updated
        // since we are doing postorder traversal)
        diameter.set(Math.max(diameter.get(), max_diameter));

        // it is important to return the height of the subtree rooted at the
        // current node
        return Math.max(left_height, right_height) + 1;
    }

    public static int getDiameter(Node root)
    {
        AtomicInteger diameter = new AtomicInteger(0);
        getDiameter(root, diameter);

        return diameter.get();
    }

    public static void main(String[] args)
    {
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.right = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.right.left.left = new Node(7);
        root.right.left.right = new Node(8);

        System.out.print("The diameter of the tree is " + getDiameter(root));
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

# Function to find the diameter of the binary tree. Note that the function
# returns the height of the subtree rooted at a given node and the diameter.
def getDiameter(root, diameter):

    # base case: tree is empty
    if root is None:
        return 0, diameter

    # get heights of left and right subtrees
    left_height, diameter = getDiameter(root.left, diameter)
    right_height, diameter = getDiameter(root.right, diameter)

    # calculate diameter "through" the current node
    max_diameter = left_height + right_height + 1

    # update maximum diameter (note that diameter "excluding" the current
    # node in the subtree rooted at the current node is already updated
    # since we are doing postorder traversal)
    diameter = max(diameter, max_diameter)

    # it is important to return the height of the subtree rooted at the current node
    return max(left_height, right_height) + 1, diameter

def getBTDiameter(root):

    diameter = 0
    return getDiameter(root, diameter)[1]

if __name__ == '__main__':

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.right = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.right.left.left = Node(7)
    root.right.left.right = Node(8)

    print('The diameter of the tree is', getBTDiameter(root))
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Check if a binary tree is height-balanced or not](https://www.techiedelight.com/check-given-binary-tree-is-height-balanced-not/ "Check if a binary tree is height-balanced or not")

> [Calculate the height of a binary tree with leaf nodes forming a circular doubly linked list](https://www.techiedelight.com/calculate-height-binary-tree-leaf-nodes-forming-circular-doubly-linked-list/ "Calculate the height of a binary tree with leaf nodes forming a circular doubly linked list")

> [Sink nodes containing zero to the bottom of a binary tree](https://www.techiedelight.com/sink-nodes-containing-zero-bottom-binary-tree/ "Sink nodes containing zero to the bottom of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 200

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
