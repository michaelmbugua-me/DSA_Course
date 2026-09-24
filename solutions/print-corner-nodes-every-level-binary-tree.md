# Print corner nodes of every level in a binary tree

> Source: https://www.techiedelight.com/print-corner-nodes-every-level-binary-tree/

Given a binary tree, print corner nodes of every level in it.

For example, consider the following tree:

**Output:** 6 3 8 4 2 1 3

> 

The idea is simple. First, modify the [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on a given binary tree to maintain the level of each node. Then while doing level order traversal, if the current node happens to be the first or last node at the current level, print it.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <queue>
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

// Iterative function to print corner nodes of every level in a binary tree
void print(Node* root)
{
    // return if the tree is empty
    if (root == nullptr) {
        return;
    }

    // create an empty queue to store tree nodes
    queue<Node*> q;

    // enqueue root node
    q.push(root);

    // loop till queue is empty
    while (!q.empty())
    {
        // get the size of the current level
        int size = q.size();
        int n = size;

        // process all nodes present in the current level
        while (n--)
        {
            Node* node = q.front();
            q.pop();

            // if the corner node is found, print it
            if (n == size - 1 || n == 0) {
                cout << node->data << " ";
            }

            // enqueue left and right child of the current node
            if (node->left != nullptr) {
                q.push(node->left);
            }

            if (node->right != nullptr) {
                q.push(node->right);
            }
        }

        // terminate level by printing an empty line
        cout << endl;
    }
}

int main()
{
    /* Construct the following tree
                 1
               /   \
              2     3
            /     /   \
           4     5     6
         /     /   \     \
        7     8     9     10
    */

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    root->left->left->left = new Node(7);
    root->right->left->left = new Node(8);
    root->right->left->right = new Node(9);
    root->right->right->right = new Node(10);

    print(root);

    return 0;
}
```

**Output:** 1 2 3 4 6 7 10

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

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
    // Iterative function to print corner nodes of every level in the binary tree
    public static void print(Node root)
    {
        // return if the tree is empty
        if (root == null) {
            return;
        }

        // create an empty queue to store tree nodes
        Queue<Node> q = new ArrayDeque<>();

        // enqueue root node
        q.add(root);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // get the size of the current level
            int size = q.size();
            int n = size;

            // process all nodes present in the current level
            while (n-- > 0)
            {
                Node node = q.poll();

                // if the corner node is found, print it
                if (n == size - 1 || n == 0) {
                    System.out.print(node.data + " ");
                }

                // enqueue left and right child of the current node
                if (node.left != null) {
                    q.add(node.left);
                }

                if (node.right != null) {
                    q.add(node.right);
                }
            }

            // terminate level by printing an empty line
            System.out.println();
        }
    }

    public static void main(String[] args)
    {
        /* Construct the following tree
                     1
                   /   \
                  2     3
                /     /   \
               4     5     6
             /     /   \     \
            7     8     9     10
        */

        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.right.left = new Node(5);
        root.right.right = new Node(6);
        root.left.left.left = new Node(7);
        root.right.left.left = new Node(8);
        root.right.left.right = new Node(9);
        root.right.right.right = new Node(10);

        print(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Iterative function to print corner nodes of every level in a binary tree
def printTree(root):

    # return if the tree is empty
    if root is None:
        return

    # create an empty queue to store tree nodes
    q = deque()

    # enqueue root node
    q.append(root)

    # loop till queue is empty
    while q:

        # get the size of the current level
        size = len(q)
        n = size

        # process all nodes present in the current level
        while n:
            n = n - 1
            node = q.popleft()

            # if the corner node is found, print it
            if n == size - 1 or n == 0:
                print(node.data, end=' ')

            # enqueue left and right child of the current node
            if node.left:
                q.append(node.left)

            if node.right:
                q.append(node.right)

        # terminate level by printing an empty line
        print()

if __name__ == '__main__':

    ''' Construct the following tree
                 1
               /   \
              2     3
            /     /   \
           4     5     6
         /     /   \     \
        7     8     9     10
    '''

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.right.left = Node(5)
    root.right.right = Node(6)
    root.left.left.left = Node(7)
    root.right.left.left = Node(8)
    root.right.left.right = Node(9)
    root.right.right.right = Node(10)

    printTree(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

Also See:

> [Efficiently print all nodes between two given levels in a binary tree](https://www.techiedelight.com/print-nodes-between-two-levels-binary-tree/ "Efficiently print all nodes between two given levels in a binary tree")

> [Compute the maximum number of nodes at any level in a binary tree](https://www.techiedelight.com/find-maximum-width-given-binary-tree/ "Compute the maximum number of nodes at any level in a binary tree")

> [Print all nodes of a perfect binary tree in a specific order](https://www.techiedelight.com/print-nodes-binary-tree-specific-order/ "Print all nodes of a perfect binary tree in a specific order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 179

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [FIFO](https://www.techiedelight.com/Tags/FIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
