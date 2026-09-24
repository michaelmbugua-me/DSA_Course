# Find a pair with the given sum in a BST

> Source: https://www.techiedelight.com/find-pair-with-given-sum-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a binary search tree, find a pair with a given sum present in it.

For example, consider the following BST. If the given sum is 14, the pair is `(8, 6)`.

> 

We can easily solve this problem by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the tree in an [inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and insert every node’s value into a set. Also check if, for any node, the difference between the given sum and node’s value is found in the set, then the pair with the given sum exists in the tree.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

// Data structure to store a BST node
struct Node
{
    int data;
    Node* left = nullptr, *right = nullptr;

    Node() {}
    Node(int data): data(data) {}
};

// Recursive function to insert a key into a BST
Node* insert(Node* root, int key)
{
    // if the root is null, create a new node and return it
    if (root == nullptr) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root->data) {
        root->left = insert(root->left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        root->right = insert(root->right, key);
    }

    return root;
}

// Function to find a pair with a given sum in a BST
bool findPair(Node* root, int target, auto &set)
{
    // base case
    if (root == nullptr) {
        return false;
    }

    // return true if pair is found in the left subtree; otherwise, continue
    // processing the node
    if (findPair(root->left, target, set)) {
        return true;
    }

    // if a pair is formed with the current node, print the pair and return true
    if (set.find(target - root->data) != set.end())
    {
        cout << "Pair found (" << target - root->data << ", " << root->data << ")";
        return true;
    }

    // insert the current node's value into the set
    else {
        set.insert(root->data);
    }

    // search in the right subtree
    return findPair(root->right, target, set);
}

int main()
{
    int keys[] = { 15, 10, 20, 8, 12, 16, 25 };

    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    // find pair with the given sum
    int target = 28;

    // create an empty set
    unordered_set<int> set;

    if (!findPair(root, target, set)) {
        cout << "Pair does not exist";
    }

    return 0;
}
```

**Output:** Pair found (12, 16)

##

```java
import java.util.HashSet;
import java.util.Set;

// A class to store a BST node
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
    // Recursive function to insert a key into a BST
    public static Node insert(Node root, int key)
    {
        // if the root is null, create a new node and return it
        if (root == null) {
            return new Node(key);
        }

        // if the given key is less than the root node, recur for the left subtree
        if (key < root.data) {
            root.left = insert(root.left, key);
        }

        // if the given key is more than the root node, recur for the right subtree
        else {
            root.right = insert(root.right, key);
        }

        return root;
    }

    // Function to find a pair with a given sum in the BST
    public static boolean findPair(Node root, int target, Set<Integer> set)
    {
        // base case
        if (root == null) {
            return false;
        }

        // return true if pair is found in the left subtree; otherwise, continue
        // processing the node
        if (findPair(root.left, target, set)) {
            return true;
        }

        // if a pair is formed with the current node, print the pair and return true
        if (set.contains(target - root.data))
        {
            System.out.println("Pair found (" + (target - root.data) + ", "
                                    + root.data + ")");
            return true;
        }

        // insert the current node's value into the set
        else {
            set.add(root.data);
        }

        // search in the right subtree
        return findPair(root.right, target, set);
    }

    public static void main(String[] args)
    {
        int[] keys = { 15, 10, 20, 8, 12, 16, 25 };

        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        // find pair with the given sum
        int target = 28;

        // create an empty set
        Set<Integer> set = new HashSet<>();

        if (!findPair(root, target, set)) {
            System.out.println("Pair does not exist");
        }
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Recursive function to insert a key into a BST
def insert(root, key):

    # if the root is None, create a new node and return it
    if root is None:
        return Node(key)

    # if the given key is less than the root node, recur for the left subtree
    if key < root.data:
        root.left = insert(root.left, key)

    # if the given key is more than the root node, recur for the right subtree
    else:
        root.right = insert(root.right, key)

    return root

# Function to find a pair with a given sum in a BST
def findPair(root, target, s):

    # base case
    if root is None:
        return False

    # return true if pair is found in the left subtree; otherwise, continue
    # processing the node
    if findPair(root.left, target, s):
        return True

    # if a pair is formed with the current node, print the pair and return true
    if target - root.data in s:
        print('Pair found', (target - root.data, root.data))
        return True

    # insert the current node's value into the set
    else:
        s.add(root.data)

    # search in the right subtree
    return findPair(root.right, target, s)

if __name__ == '__main__':

    keys = [15, 10, 20, 8, 12, 16, 25]

    root = None
    for key in keys:
        root = insert(root, key)

    # find pair with the given sum
    target = 28

    # create an empty set
    s = set()

    if not findPair(root, target, s):
        print('Pair does not exist')
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

**Also See:**

> [Find a triplet with the given sum in a BST](https://techiedelight.com/find-triplet-with-given-sum-bst/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.67/5. Vote count: 287

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
