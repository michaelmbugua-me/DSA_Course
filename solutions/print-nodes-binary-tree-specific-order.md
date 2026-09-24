# Print all nodes of a perfect binary tree in a specific order

> Source: https://www.techiedelight.com/print-nodes-binary-tree-specific-order/

Given a perfect binary tree, print the values of alternating left and right nodes for each level in a top-down and bottom-up manner.

For example, there are two ways to print the following tree:

Variation 1: Print Top-Down

`(1, 2, 3, 4, 7, 5, 6, 8, 15, 9, 14, 10, 13, 11, 12)`

Variation 2: Print Bottom-Up

`(8, 15, 9, 14, 10, 13, 11, 12, 4, 7, 5, 6, 2, 3, 1)`

## Variation 1: Print Top-Down

> 

The idea is to modify [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) by maintaining two [queues](https://techiedelight.com/circular-queue-implementation-c/). We process two nodes each from one queue and enqueue the left and right child of the first popped node into the first queue and the right and left child of the second popped node into the second queue.

Following is the C++, Java, and Python implementation based on the above idea:

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

// Function to print all nodes of a given binary tree in a specific
// order from top to bottom
void printNodes(Node* root)
{
    // return if the tree is empty
    if (root == nullptr) {
        return;
    }

    // print the root node
    cout << root->key << " ";

    // create two empty queues and enqueue root's left and
    // right child, respectively
    queue<Node*> q1, q2;

    if (root->left && root->right)
    {
        q1.push(root->left);
        q2.push(root->right);
    }

    // loop till queue is empty
    while (!q1.empty())
    {
        // calculate the total number of nodes at the current level
        int n = q1.size();

        // process every node of the current level
        while (n--)
        {
            // dequeue front node from the first queue and print it
            Node* x = q1.front();
            q1.pop();

            cout << x->key << " ";

            // enqueue left and right child of `x` to the first queue
            if (x->left) {
                q1.push(x->left);
            }

            if (x->right) {
                q1.push(x->right);
            }

            // dequeue front node from the second queue and print it
            Node* y = q2.front();
            q2.pop();

            cout << y->key << " ";

            // enqueue right and left child of `y` to the second queue
            if (y->right) {
                q2.push(y->right);
            }

            if (y->left) {
                q2.push(y->left);
            }
        }
    }
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
    root->left->left->left = new Node(8);
    root->left->left->right = new Node(9);
    root->left->right->left = new Node(10);
    root->left->right->right = new Node(11);
    root->right->left->left = new Node(12);
    root->right->left->right = new Node(13);
    root->right->right->left = new Node(14);
    root->right->right->right = new Node(15);

    printNodes(root);

    return 0;
}
```

**Output:** 1 2 3 4 7 5 6 8 15 9 14 10 13 11 12

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// A class to store a binary tree node
class Node
{
    int key;
    Node left = null, right = null;

    Node(int key) {
        this.key = key;
    }
}

class Main
{
    // Function to print all nodes of a given binary tree in a specific
    // order from top to bottom
    public static void printNodes(Node root)
    {
        // return if the tree is empty
        if (root == null) {
            return;
        }

        // print the root node
        System.out.print(root.key + " ");

        // create two empty queues and enqueue root's left and
        // right child, respectively

        Queue<Node> first = new ArrayDeque<>();
        Queue<Node> second = new ArrayDeque<>();

        if (root.left != null && root.right != null)
        {
            first.add(root.left);
            second.add(root.right);
        }

        // loop till queue is empty
        while (!first.isEmpty())
        {
            // calculate the total number of nodes at the current level
            int n = first.size();

            // process every node of the current level
            while (n-- > 0)
            {
                // dequeue front node from the first queue and print it
                Node x = first.poll();

                System.out.print(x.key + " ");

                // enqueue left and right child of `x` to the first queue
                if (x.left != null) {
                    first.add(x.left);
                }

                if (x.right != null) {
                    first.add(x.right);
                }

                // dequeue front node from the second queue and print it
                Node y = second.poll();

                System.out.print(y.key + " ");

                // enqueue right and left child of `y` to the second queue
                if (y.right != null) {
                    second.add(y.right);
                }

                if (y.left != null) {
                    second.add(y.left);
                }
            }
        }
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
        root.left.left.left = new Node(8);
        root.left.left.right = new Node(9);
        root.left.right.left = new Node(10);
        root.left.right.right = new Node(11);
        root.right.left.left = new Node(12);
        root.right.left.right = new Node(13);
        root.right.right.left = new Node(14);
        root.right.right.right = new Node(15);

        printNodes(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, key=None, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Function to print all nodes of a given binary tree in a specific
# order from top to bottom
def printNodes(root):

    # return if the tree is empty
    if root is None:
        return

    # print the root node
    print(root.key, end=' ')

    # create two empty queues and enqueue root's left and
    # right child, respectively
    q1 = deque()
    q2 = deque()

    if root.left and root.right:
        q1.append(root.left)
        q2.append(root.right)

    # loop till queue is empty
    while q1:

        # calculate the total number of nodes at the current level
        n = len(q1)

        # process every node of the current level
        for _ in range(n):

            # dequeue front node from the first queue and print it
            x = q1.popleft()

            print(x.key, end=' ')

            # enqueue left and right child of `x` to the first queue
            if x.left:
                q1.append(x.left)

            if x.right:
                q1.append(x.right)

            # dequeue front node from the second queue and print it
            y = q2.popleft()

            print(y.key, end=' ')

            # enqueue right and left child of `y` to the second queue
            if y.right:
                q2.append(y.right)

            if y.left:
                q2.append(y.left)

if __name__ == '__main__':

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)
    root.left.left.left = Node(8)
    root.left.left.right = Node(9)
    root.left.right.left = Node(10)
    root.left.right.right = Node(11)
    root.right.left.left = Node(12)
    root.right.left.right = Node(13)
    root.right.right.left = Node(14)
    root.right.right.right = Node(15)

    printNodes(root)
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

## Variation 2: Print Bottom-Up

> 

The idea is to store nodes of every level in the desired order in a map and finally print nodes from the map for each level, starting from the last level to the first level.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
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

// Function to print all nodes of a given binary tree in
// a specific order from bottom to top
void printNodes(Node* root)
{
    // return if the tree is empty
    if (root == nullptr) {
        return;
    }

    // start with level 1 (of the root node)
    int level = 1;

    // create an empty multimap of integers (every key can be
    // associated with multiple values)
    unordered_map<int, vector<int>> map;

    // insert the root node at the first level
    map[level].push_back(root->key);

    // create two empty queues and enqueue root's left and
    // right child, respectively
    queue<Node*> q1, q2;

    if (root->left && root->right)
    {
        q1.push(root->left);
        q2.push(root->right);
    }

    // loop till queue is empty
    while (!q1.empty())
    {
        // increment level by 1
        level++;

        // calculate the total number of nodes at the current level
        int n = q1.size();

        // process every node of the current level
        while (n--)
        {
            // dequeue front node from the first queue and insert it into the map
            Node* x = q1.front();
            q1.pop();

            map[level].push_back(x->key);

            // enqueue left and right child of `x` to the first queue
            if (x->left) {
                q1.push(x->left);
            }

            if (x->right) {
                q1.push(x->right);
            }

            // dequeue front node from the second queue and insert it into the map
            Node* y = q2.front();
            q2.pop();

            map[level].push_back(y->key);

            // enqueue right and left child of `y` to the second queue
            if (y->right) {
                q2.push(y->right);
            }

            if (y->left) {
                q2.push(y->left);
            }
        }
    }

    // iterate through the map in reverse order and
    // print all nodes present at every level
    for (int i = map.size(); i > 0; i--)
    {
        for (int j: map[i]) {
            cout << j << " ";
        }
    }
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
    root->left->left->left = new Node(8);
    root->left->left->right = new Node(9);
    root->left->right->left = new Node(10);
    root->left->right->right = new Node(11);
    root->right->left->left = new Node(12);
    root->right->left->right = new Node(13);
    root->right->right->left = new Node(14);
    root->right->right->right = new Node(15);

    printNodes(root);

    return 0;
}
```

**Output:** 8 15 9 14 10 13 11 12 4 7 5 6 2 3 1

##

```java
import java.util.*;

// A class to store a binary tree node
class Node
{
    int key;
    Node left = null, right = null;

    Node(int key) {
        this.key = key;
    }
}

class Main
{
    // Utility function to add an element to the list corresponding to the given key
    // in `Map<Integer, List<Integer>>`.
    public static void insertIntoMultiMap(Map<Integer, List<Integer>> map,
                                        Integer key, Integer value) {
        map.putIfAbsent(key, new ArrayList<>());
        map.get(key).add(value);
    }

    // Function to print all nodes of a given binary tree in
    // a specific order from bottom to top
    public static void printNodes(Node root)
    {
        // return if the tree is empty
        if (root == null) {
            return;
        }

        // start with level 1 (of the root node)
        int level = 1;

        // create an empty multimap of integers (every key can be
        // associated with multiple values)
        Map<Integer, List<Integer>> map = new HashMap<>();

        // insert the root node at the first level
        insertIntoMultiMap(map, level, root.key);

        // create two empty queues and enqueue root's left and
        // right child, respectively
        Queue<Node> q1 = new ArrayDeque<>(), q2 = new ArrayDeque<>();

        if (root.left != null && root.right != null)
        {
            q1.add(root.left);
            q2.add(root.right);
        }

        // loop till queue is empty
        while (!q1.isEmpty())
        {
            // increment level by 1
            level++;

            // calculate the total number of nodes at the current level
            int n = q1.size();

            // process every node of the current level
            while (n-- > 0)
            {
                // dequeue front node from the first queue and insert it into the map
                Node x = q1.poll();
                insertIntoMultiMap(map, level, x.key);

                // enqueue left and right child of `x` to the first queue
                if (x.left != null) {
                    q1.add(x.left);
                }

                if (x.right != null) {
                    q1.add(x.right);
                }

                // dequeue front node from the second queue and insert it into the map
                Node y = q2.poll();

                map.get(level).add(y.key);

                // enqueue right and left child of `y` to the second queue
                if (y.right != null) {
                    q2.add(y.right);
                }

                if (y.left != null) {
                    q2.add(y.left);
                }
            }
        }

        // iterate through the HashMap and print all nodes present at every level
        for (int i = map.size(); i > 0; i--) {
            System.out.print(map.get(i));
        }
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
        root.left.left.left = new Node(8);
        root.left.left.right = new Node(9);
        root.left.right.left = new Node(10);
        root.left.right.right = new Node(11);
        root.right.left.left = new Node(12);
        root.right.left.right = new Node(13);
        root.right.right.left = new Node(14);
        root.right.right.right = new Node(15);

        printNodes(root);
    }
}
```

##

```python3
from collections import deque

# A class to store a binary tree node
class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Function to print all nodes of a given binary tree in
# a specific order from bottom to top
def printNodes(root):

    # return if the tree is empty
    if root is None:
        return

    # start with level 1 (of the root node)
    level = 1

    # create an empty dictionary of integers (every key can be
    # associated with multiple values)
    d = {}

    # insert the root node at the first level
    d.setdefault(level, []).append(root.key)

    # create two empty queues and enqueue root's left and
    # right child, respectively
    q1 = deque()
    q2 = deque()

    if root.left and root.right:
        q1.append(root.left)
        q2.append(root.right)

    # loop till queue is empty
    while q1:

        # increment level by 1
        level = level + 1

        # calculate the total number of nodes at the current level
        n = len(q1)

        # process every node of the current level
        while n > 0:

            # dequeue front node from the first queue and insert it into the dictionary
            x = q1.popleft()
            d.setdefault(level, []).append(x.key)

            # enqueue left and right child of `x` to the first queue
            if x.left:
                q1.append(x.left)

            if x.right:
                q1.append(x.right)

            # dequeue front node from the second queue
            y = q2.popleft()

            # insert the dequeued node into the dictionary
            d.get(level).append(y.key)

            # enqueue right and left child of `y` to the second queue
            if y.right:
                q2.append(y.right)

            if y.left:
                q2.append(y.left)

            n = n - 1

    # iterate through the dictionary and print all nodes present at every level
    for i in reversed(d.keys()):
        print(d.get(i), end='')

if __name__ == '__main__':

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)
    root.left.left.left = Node(8)
    root.left.left.right = Node(9)
    root.left.right.left = Node(10)
    root.left.right.right = Node(11)
    root.right.left.left = Node(12)
    root.right.left.right = Node(13)
    root.right.right.left = Node(14)
    root.right.right.right = Node(15)

    printNodes(root)
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:** Modify the solution to print using only one queue
