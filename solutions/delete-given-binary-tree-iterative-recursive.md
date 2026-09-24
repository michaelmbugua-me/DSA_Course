# Delete a binary tree – Iterative and Recursive

> Source: https://www.techiedelight.com/delete-given-binary-tree-iterative-recursive/

Given a binary tree, write an efficient algorithm to delete the entire binary tree. The algorithm should deallocate every single node present in the tree, not just change the root node’s reference to null.

## Recursive Solution

The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and delete the left and right subtree of a node before deleting the node itself. Note that we cannot traverse a tree in [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) or inorder fashion as we can’t delete a parent before deleting its children.

Following is the C++ program that demonstrates it:

```cpp
#include <iostream>
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

// Recursive function to delete a given binary tree
void deleteBinaryTree(Node* &root)
{
    // Base case: empty tree
    if (root == nullptr) {
        return;
    }

    // delete left and right subtree first (Postorder)
    deleteBinaryTree(root->left);
    deleteBinaryTree(root->right);

    // delete the current node after deleting its left and right subtree
    delete root;

    // set root as null before returning
    root = nullptr;
}

int main()
{
    Node* root = new Node(15);
    root->left = new Node(10);
    root->right = new Node(20);
    root->left->left = new Node(8);
    root->left->right = new Node(12);
    root->right->left = new Node(16);
    root->right->right = new Node(25);

    // delete the entire tree
    deleteBinaryTree(root);

    if (root == nullptr) {
        cout << "Tree Successfully Deleted";
    }

    return 0;
}
```

The time complexity of the above recursive solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

## Iterative Solution

In the iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. The idea is to delete each node in the [queue](https://techiedelight.com/circular-queue-implementation-c/), one by one, after enqueuing their children. Note that the parent is deleted before deleting its children as we are enqueuing them, and they will be processed and deleted afterward.

This is demonstrated below in C++:

```cpp
#include <iostream>
#include <queue>
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

// Iterative function to delete a given binary tree
void deleteBinaryTree(Node* &root)
{
    // empty tree
    if (root == nullptr) {
        return;
    }

    // create an empty queue and enqueue the root node
    queue<Node*> queue;
    queue.push(root);

    Node* front = nullptr;

    // loop till queue is empty
    while (!queue.empty())
    {
        // delete each node in the queue one by one after pushing their
        // non-empty left and right child to the queue
        front = queue.front();
        queue.pop();

        if (front->left) {
            queue.push(front->left);
        }

        if (front->right) {
            queue.push(front->right);
        }

        // it is important to delete the front node ONLY after enqueuing its children
        delete front;
    }

    // set root as null before returning
    root = nullptr;
}

int main()
{
    Node* root = new Node(15);
    root->left = new Node(10);
    root->right = new Node(20);
    root->left->left = new Node(8);
    root->left->right = new Node(12);
    root->right->left = new Node(16);
    root->right->right = new Node(25);

    // delete the entire tree
    deleteBinaryTree(root);

    if (root == nullptr) {
        cout << "Tree Successfully Deleted";
    }

    return 0;
}
```

The time complexity of the above iterative solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for the queue data structure.
