# Find a triplet with the given sum in a BST

> Source: https://www.techiedelight.com/find-triplet-with-given-sum-bst/

Given a binary search tree, find a triplet with a given sum present in it.

For example, consider the following BST. If the given sum is 20, the triplet is `(-40, 10, 50)`.

> 

A simple solution is to [traverse the BST in an inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and store all encountered nodes in an auxiliary array. This array would be already sorted since inorder traversal visits the nodes in increasing order of their values. Then for each element `A[i]` in the array `A`, [check if the triplet is formed](https://techiedelight.com/find-triplet-given-with-given-sum/) by `A[i]` and a pair from subarray `A[i+1…n-1]`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <tuple>
using namespace std;

// Data structure to store a BST node
struct Node
{
    // value of node
    int data;

    // left and right child pointer for the BST node
    Node *left, *right;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Function to insert a given key at its correct position into the BST
Node* insert(Node* root, int data)
{
    if (root == nullptr) {
        return new Node(data);
    }

    if (data < root->data) {
        root->left = insert(root->left, data);
    }
    else {
        root->right = insert(root->right, data);
    }

    return root;
}

// Function to find a triplet in a vector with the given sum. If a triplet is found,
// the function stores it in a tuple and returns true.
bool findTriplet(vector<int> const &keys, int target, auto &tuple)
{
    // get the total number of nodes in the BST
    int n = keys.size();

    // check if a triplet is formed by `keys[i]` and a pair from `keys[i+1…n-1]`
    for (int i = 0; i <= n - 3; i++)
    {
        // remaining sum
        int k = target - keys[i];

        // maintain two indices pointing to endpoints of subarray `keys[i+1…n-1]`
        int low = i + 1, high = n - 1;

        // loop till `low` is less than `high`
        while (low < high)
        {
            // increment `low` index if the total is less than the remaining sum
            if (keys[low] + keys[high] < k) {
                low++;
            }

            // decrement `high` index if the total is more than the remaining sum
            else if (keys[low] + keys[high] > k) {
                high--;
            }

            // triplet with the given sum found
            else {
                // create a tuple of the found triplet and return true
                tuple = make_tuple(keys[i], keys[low], keys[high]);
                return true;
            }
        }
    }

    // no triplet found
    return false;
}

// Recursive function to push keys of a given BST in a vector
// in an inorder fashion
void pushTreeNodes(Node* root, vector<int> &keys)
{
    // base case
    if (root == nullptr) {
        return;
    }

    pushTreeNodes(root->left, keys);
    keys.push_back(root->data);
    pushTreeNodes(root->right, keys);
}

// Function to print a triplet with a given sum in a given BST
void printTriplet(Node* root, int target)
{
    /* 1. Push keys of a given BST into a vector in sorted order */

    vector<int> keys;
    pushTreeNodes(root, keys);

    /* 2: Find a triplet with a given sum in the vector */

    // create a tuple to store the triplet
    tuple<int, int, int> triplet;

    // find triplet
    if (findTriplet(keys, target, triplet))
    {
        cout << "Triplet found: ("
                  << get<0>(triplet) << ", "
                  << get<1>(triplet) << ", "
                  << get<2>(triplet) << ")";
    }
    else {
        cout << "Triplet not found";
    }
}

int main()
{
    // input keys to construct a BST
    int keys[] = { 10, -15, 3, -40, 20, 15, 50 };

    // construct a BST from `keys[]`
    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    // triplet sum
    int target = 20;

    // print a triplet with the given sum
    printTriplet(root, target);

    return 0;
}
```

**Output:** Triplet found: (-40, 10, 50)

##

```java
import java.util.ArrayList;
import java.util.List;

// Tuple class
class Tuple<X, Y, Z>
{
    public final X first;       // first field of a tuple
    public final Y second;      // second field of a tuple
    public final Z third;       // third field of a tuple

    // Constructs a new Tuple with specified values
    private Tuple(X first, Y second, Z third)
    {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    // Factory method for creating a Typed Tuple immutable instance
    public static <X, Y, Z> Tuple <X, Y, Z> of(X a, Y b, Z c)
    {
        // calls private constructor
        return new Tuple<>(a, b, c);
    }
}

// A class to store a BST node
class Node
{
    // value of node
    int data;

    // left and right child for the BST node
    Node left, right;

    // Constructor
    Node(int data)
    {
        this.data = data;
        this.left = this.right = null;
    }
}

class Main
{
    // Function to insert a given key at its correct position into the BST
    public static Node insert(Node root, int data)
    {
        if (root == null) {
            return new Node(data);
        }

        if (data < root.data) {
            root.left = insert(root.left, data);
        }
        else {
            root.right = insert(root.right, data);
        }

        return root;
    }

    // Function to find a triplet in a list with a given sum. If a triplet is found,
    // the function stores it in a tuple and returns true.
    public static Tuple<Integer, Integer, Integer> findTriplet(List<Integer> input,
                                                            int target)
    {
        // get the total number of nodes in the BST
        int n = input.size();

        // check if a triplet is formed by `input[i]` and a pair from `input[i+1…n-1]`
        for (int i = 0; i <= n - 3; i++)
        {
            // remaining sum
            int k = target - input.get(i);

            // maintain two indices pointing to endpoints of subarray `input[i+1…n-1]`
            int low = i + 1, high = n - 1;

            // loop till `low` is less than `high`
            while (low < high)
            {
                // increment `low` index if the total is less than the remaining sum
                if (input.get(low) + input.get(high) < k) {
                    low++;
                }

                // decrement `high` index if the total is more than the remaining sum
                else if (input.get(low) + input.get(high) > k) {
                    high--;
                }

                // triplet with the given sum found
                else {
                    // create a tuple of the found triplet and return it
                    return Tuple.of(input.get(i), input.get(low), input.get(high));
                }
            }
        }

        // no triplet found
        return null;
    }

    // Recursive function to push keys of a given BST into a list in an inorder fashion
    public static void pushTreeNodes(Node root, List<Integer> keys)
    {
        // base case
        if (root == null) {
            return;
        }

        pushTreeNodes(root.left, keys);
        keys.add(root.data);
        pushTreeNodes(root.right, keys);
    }

    // Function to print a triplet with a given sum in a given BST
    public static void printTriplet(Node root, int target)
    {
        /* 1. Push keys of a given BST into a list in sorted order */

        List<Integer> keys = new ArrayList<>();
        pushTreeNodes(root, keys);

        /* 2: Find a triplet with the given sum in the List */

        // create a tuple to store the triplet
        Tuple<Integer, Integer, Integer> triplet = findTriplet(keys, target);

        // find triplet
        if (triplet != null)
        {
            System.out.println("Triplet found: ("
                                    + triplet.first + ", "
                                    + triplet.second + ", "
                                    + triplet.third + ")");
        }
        else {
            System.out.println("Triplet not found");
        }
    }

    public static void main(String[] args)
    {
        // input keys to construct a BST
        int[] keys = { 10, -15, 3, -40, 20, 15, 50 };

        // construct a BST from `keys[]`
        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        // triplet sum
        int target = 20;

        // print a triplet with the given sum
        printTriplet(root, target);
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    # Constructor
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to insert a given key at its correct position into the BST
def insert(root, data):

    if root is None:
        return Node(data)

    if data < root.data:
        root.left = insert(root.left, data)
    else:
        root.right = insert(root.right, data)

    return root

# Function to find a triplet in a list with a given sum. If a triplet is found,
# the function stores it in a tuple and returns true.
def findTriplet(keys, target):

    # get the total number of nodes in the BST
    n = len(keys)

    # check if a triplet is formed by `keys[i]` and a pair from `keys[i+1…n-1]`
    for i in range(n - 2):

        # remaining sum
        k = target - keys[i]

        # maintain two indices pointing to endpoints of sublist `keys[i+1…n-1]`
        low = i + 1
        high = n - 1

        # loop till `low` is less than `high`
        while low < high:
            # increment `low` index if the total is less than the remaining sum
            if keys[low] + keys[high] < k:
                low = low + 1

            # decrement `high` index if the total is more than the remaining sum
            elif keys[low] + keys[high] > k:
                high = high - 1

            # triplet with the given sum found
            else:
                # create a tuple of the found triplet and return it
                return keys[i], keys[low], keys[high]

    # no triplet found
    return ()

# Recursive function to push keys of a given BST into a list in an inorder fashion
def pushTreeNodes(root, keys):

    # base case
    if root is None:
        return

    pushTreeNodes(root.left, keys)
    keys.append(root.data)
    pushTreeNodes(root.right, keys)

# Function to print a triplet with the given sum in a given BST
def printTriplet(root, target):

    ''' 1. Push keys of a given BST into a list in sorted order '''

    keys = []
    pushTreeNodes(root, keys)

    ''' 2: Find a triplet with the given sum in the List '''

    # store the triplet
    first, second, third = findTriplet(keys, target)

    # find triplet
    if first:
        print('Triplet found:', (first, second, third))
    else:
        print('Triplet not found')

if __name__ == '__main__':

    # input keys to construct a BST
    keys = [10, -15, 3, -40, 20, 15, 50]

    # construct a BST from keys
    root = None
    for key in keys:
        root = insert(root, key)

    # triplet sum
    target = 20

    # print a triplet with the given sum
    printTriplet(root, target)
```

The time complexity of the above solution is O(n2), where `n` is the size of the BST. The auxiliary space required by the program is O(n) for storing BST keys and for call stack.

We can avoid the extra space used for storing BST keys if we are allowed to modify the BST. The idea is to convert the given BST into a sorted doubly linked list and follow a similar routine to find a triplet as seen in the previous approach.

```cpp
#include <iostream>
#include <tuple>
using namespace std;

// Data structure to store a BST node
struct Node
{
    // value of node
    int data;

    // left and right child pointer for the BST node
    Node *left, *right;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->left = this->right = nullptr;
    }
};

// Function to insert a given key at its correct position into the BST
Node* insert(Node* root, int data)
{
    if (root == nullptr) {
        return new Node(data);
    }

    if (data < root->data) {
        root->left = insert(root->left, data);
    }
    else {
        root->right = insert(root->right, data);
    }

    return root;
}

// Function to insert a BST node at the front of a doubly linked list
void push(Node* node, Node* &headRef, Node* &tailRef)
{
    // update the right pointer of the given node to point to the current head
    node->right = headRef;

    // update the left pointer of the existing head node of the
    // doubly linked list to point to the new node
    if (headRef != nullptr) {
        headRef->left = node;
    }

    // update the tail pointer of the doubly linked list
    // (updated only for the first node)
    if (tailRef == nullptr) {
        tailRef = node;
    }

    // finally, update the head pointer of the doubly linked list
    headRef = node;
}

/*
    Recursive function to construct a sorted doubly linked list from a given BST
    root    —> Pointer to the root node of the BST
    headRef —> Reference to the head node of the doubly linked list
    tailRef —> Reference to the last node of the doubly linked list
*/
void convertBSTtoDLL(Node* root, Node* &headRef, Node* &tailRef)
{
    // Base case
    if (root == nullptr) {
        return;
    }

    // recursively convert the right subtree
    convertBSTtoDLL(root->right, headRef, tailRef);

    // push the current node at the front of the doubly linked list
    push(root, headRef, tailRef);

    // recursively convert the left subtree
    convertBSTtoDLL(root->left, headRef, tailRef);
}

// Returns true if a triplet with a given sum is found in a given BST
bool findTriplet(Node* root, int target, tuple<int, int, int> &tuple)
{
    /* 1. Convert the given BST into a sorted doubly linked list */

    // base case
    if (root == nullptr) {
        return false;
    }

    Node* head = nullptr;
    Node* tail = nullptr;
    convertBSTtoDLL(root, head, tail);

    /* 2: Find triplet with the given sum in doubly linked list */

    // loop till only 2 nodes are left
    while (head->right != tail)
    {
        // Assuming the current head node is part of the triplet, find the other two
        // nodes of the triplet in search space `[head->right, tail]`

        // maintain two pointers pointing to endpoints of the search space
        Node* start = head->right;
        Node* end = tail;

        // calculate the remaining sum
        int pair_sum = target - head->data;

        // reduce the search space `[start, end]` at each iteration of the loop
        while (start != end)
        {
            // get the sum of the current start and end nodes
            int curr_sum = start->data + end->data;

            // if a pair with the desired sum is found in the BST
            if (curr_sum == pair_sum)
            {
                // create a tuple from the triplet and return true
                tuple = make_tuple(head->data, start->data, end->data);
                return true;
            }

            // if the current sum is more than the desired sum,
            // move left in the list
            else if (curr_sum > pair_sum) {
                end = end->left;
            }

            // if the current sum is less than the desired sum,
            // move right in the list
            else {
                start = start->right;
            }
        }

        // move to the next node
        head = head->right;
    }

    // no triplet found
    return false;
}

int main()
{
    // input keys to construct a BST
    int keys[] = { 10, -15, 3, -40, 20, 15, 50 };

    // construct a BST from `keys[]`
    Node* root = nullptr;
    for (int key: keys) {
        root = insert(root, key);
    }

    // triplet sum
    int target = 20;

    // create a tuple to store the triplet
    tuple<int, int, int> triplet;

    // find triplet
    if (findTriplet(root, target, triplet))
    {
        cout << "Triplet found: ("
                << get<0>(triplet) << ", "
                << get<1>(triplet) << ", "
                << get<2>(triplet) << ")";
    }
    else {
        cout << "Triplet not found";
    }

    return 0;
}
```

**Output:** Triplet found: (-40, 10, 50)

##

```java
// A class to store a BST node
class Node
{
    // value of node
    int data;

    // left and right child for the BST node
    Node left, right;

    // Constructor
    Node(int data)
    {
        this.data = data;
        this.left = this.right = null;
    }
}

// Tuple class
class Tuple<X, Y, Z>
{
    public final X first;       // first field of a tuple
    public final Y second;      // second field of a tuple
    public final Z third;       // third field of a tuple

    // Constructs a new Tuple with specified values
    private Tuple(X first, Y second, Z third)
    {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    // Factory method for creating a Typed Tuple immutable instance
    public static <X, Y, Z> Tuple <X, Y, Z> of(X a, Y b, Z c)
    {
        // calls private constructor
        return new Tuple<>(a, b, c);
    }
}

class Nodes
{
    Node head, tail;
    Nodes() {}
}

class Main
{
    // Function to insert a given key at its correct position into the BST
    public static Node insert(Node root, int data)
    {
        if (root == null) {
            return new Node(data);
        }

        if (data < root.data) {
            root.left = insert(root.left, data);
        }
        else {
            root.right = insert(root.right, data);
        }

        return root;
    }

    // Function to insert a BST node at the front of a doubly linked list
    public static void push(Node node, Nodes nodes)
    {
        // update the right child of the given node to point to the current head
        node.right = nodes.head;

        // update the left child of the existing head node of the doubly linked list
        // to point to the new node
        if (nodes.head != null) {
            nodes.head.left = node;
        }

        // update the tail pointer of the doubly linked list (updated only for the
        // first node)
        if (nodes.tail == null) {
            nodes.tail = node;
        }

        // finally, update and return the head pointer of the doubly linked list
        nodes.head = node;
    }

    /*
    Recursive function to construct a sorted doubly linked list from a given BST
    */
    public static void convertBSTtoDLL(Node root, Nodes nodes)
    {
        // Base case
        if (root == null) {
            return;
        }

        // recursively convert the right subtree
        convertBSTtoDLL(root.right, nodes);

        // push the current node at the front of the doubly linked list
        push(root, nodes);

        // recursively convert the left subtree
        convertBSTtoDLL(root.left, nodes);
    }

    // Returns true if a triplet with a given sum is found in the given BST
    public static Tuple<Integer, Integer, Integer> findTriplet(Node root, int target)
    {
        /* 1. Convert the given BST into a sorted doubly linked list */

        Nodes nodes = new Nodes();
        convertBSTtoDLL(root, nodes);
        Node head = nodes.head;
        Node tail= nodes.tail;

        /* 2: Find triplet with the given sum in doubly linked list */

        // loop till only 2 nodes are left
        while (head!= null && head.right != tail)
        {
            // Assuming the current head node is part of the triplet, find the other
            // two nodes of the triplet in search space `[head.right, tail]`

            // maintain two pointers pointing to endpoints of the search space
            Node start = head.right;
            Node end = tail;

            // calculate the remaining sum
            int pair_sum = target - head.data;

            // reduce the search space `[start, end]` at each iteration of the loop
            while (start != end)
            {
                // get the sum of the current start and end nodes
                int curr_sum = start.data + end.data;

                // if a pair with the desired sum is found in the BST
                if (curr_sum == pair_sum)
                {
                    // create a tuple from the triplet and return true
                    return Tuple.of(head.data, start.data, end.data);
                }

                // if the current sum is more than the desired sum, move left
                // in the list
                else if (curr_sum > pair_sum) {
                    end = end.left;
                }

                // if the current sum is less than the desired sum, move right
                // in the list
                else {
                    start = start.right;
                }
            }

            // move to the next node
            head = head.right;
        }

        // no triplet found
        return null;
    }

    public static void main(String[] args)
    {
        // input keys to construct a BST
        int[] keys = { 10, -15, 3, -40, 20, 15, 50 };

        // construct a BST from `keys[]`
        Node root = null;
        for (int key: keys) {
            root = insert(root, key);
        }

        // triplet sum
        int target = 20;

        // create a tuple to store the triplet
        Tuple<Integer, Integer, Integer> triplet = findTriplet(root, target);

        // find triplet
        if (triplet != null)
        {
            System.out.println("Triplet found: (" + triplet.first + ", " +
                    triplet.second + ", " + triplet.third + ")");
        }
        else {
            System.out.println("Triplet not found");
        }
    }
}
```

##

```python3
# A class to store a BST node
class Node:
    # Constructor
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

# Function to insert a given key at its correct position into the BST
def insert(root, data):

    if root is None:
        return Node(data)

    if data < root.data:
        root.left = insert(root.left, data)
    else:
        root.right = insert(root.right, data)

    return root

# Function to insert a BST node at the front of a doubly linked list
def push(node, head, tail):

    # update the right child of the given node to point to the current head
    node.right = head

    # update the left child of the existing head node of the doubly linked list
    # to point to the new node
    if head:
        head.left = node

    # update the tail pointer of the doubly linked list (updated only for the
    # first node)
    if tail is None:
        tail = node

    # finally, update and return the head pointer of the doubly linked list
    head = node
    return head, tail

'''
Recursive function to construct a sorted doubly linked list from a given BST
    root: Pointer to the root node of the BST
    head: Reference to the head node of the doubly linked list
    tail: Reference to the last node of the doubly linked list
'''

def convertBSTtoDLL(root, head, tail):

    # Base case
    if root is None:
        return head, tail

    # recursively convert the right subtree
    head, tail = convertBSTtoDLL(root.right, head, tail)

    # push the current node at the front of the doubly linked list
    head, tail = push(root, head, tail)

    # recursively convert the left subtree
    head, tail = convertBSTtoDLL(root.left, head, tail)

    return head, tail

# Returns true if a triplet with a given sum is found in the given BST
def findTriplet(root, target):

    ''' 1. Convert the given BST into a sorted doubly linked list '''

    head, tail = convertBSTtoDLL(root, None, None)

    ''' 2: Find triplet with the given sum in doubly linked list '''

    # loop till only 2 nodes are left
    while head and head.right != tail:

        # Assuming the current head node is part of the triplet, find the other
        # two nodes of the triplet in search space `[head.right, tail]`

        # maintain two pointers pointing to endpoints of the search space
        start, end = head.right, tail

        # calculate the remaining sum
        pair_sum = target - head.data

        # reduce the search space `[start, end]` at each iteration of the loop
        while start != end:

            # get the sum of the current start and end nodes
            curr_sum = start.data + end.data

            # if a pair with the desired sum is found in the BST
            if curr_sum == pair_sum:
                # create a tuple from the triplet and return true
                return head.data, start.data, end.data

            # if the current sum is more than the desired sum, move left in the list
            elif curr_sum > pair_sum:
                end = end.left

            # if the current sum is less than the desired sum, move right in the list
            else:
                start = start.right

        # move to the next node
        head = head.right

    # no triplet found
    return ()

if __name__ == '__main__':

    # input keys to construct a BST
    keys = [10, -15, 3, -40, 20, 15, 50]

    # construct a BST from keys
    root = None
    for key in keys:
        root = insert(root, key)

    # triplet sum
    target = 20

    # create a tuple to store the triplet
    first, second, third = findTriplet(root, target)

    # find triplet
    if first:
        print('Triplet found:', (first, second, third))
    else:
        print('Triplet not found')
```

The time complexity of the above solution is O(n2), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

**Also See:**

> [Find a pair with the given sum in a BST](https://techiedelight.com/find-pair-with-given-sum-bst/)
