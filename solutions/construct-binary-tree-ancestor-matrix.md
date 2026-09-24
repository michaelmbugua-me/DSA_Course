# Construct a binary tree from an ancestor matrix

> Source: https://www.techiedelight.com/construct-binary-tree-ancestor-matrix/

Given an `N × N` ancestor matrix, whose cell `(i, j)` has the value true if `i` is the ancestor of `j` in a binary tree, construct a binary tree from it where binary tree nodes are labeled from 0 to `N-1`.

Please note that there may be several binary trees constructed out of a single matrix since the ancestor matrix doesn’t specify which child is left and which is right.

For example,

**Input:** 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1 1 0 **Output:** Any one of the following trees 4 4 4 / \ / \ / \ 1 2 OR 2 1 OR 1 2 OR … / / / \ \ / 0 3 3 0 0 3

> 

We start by creating an array of pointers to store the binary tree nodes. Since the total number of set values in the `i'th` row indicates the total number of descendants of node `i`, store row numbers corresponding to a given count in a [multimap](https://techiedelight.com/implement-multimap-java/). We then process the multimap entries in sorted order (smallest value first), and for each entry, assign a new node against the current row in the array. If it is a non-leaf node (having non-zero value), set the left/right child to its descendant’s nodes whose parents are not set (there can be at-max two such nodes if the given ancestor matrix is correct). Finally, return the last processed node, which has a maximum value and would be the root of the binary tree.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <map>
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

// Utility function to print binary tree nodes in an inorder fashion
void inorder(Node* node)
{
    if (node != nullptr)
    {
        inorder(node->left);
        cout << node->key << " ";
        inorder(node->right);
    }
}

// Function to construct a binary tree from the specified ancestor matrix
Node* constructTree(vector<vector<bool>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return nullptr;
    }

    // `N × N` matrix
    int N = mat.size();

    // create an empty multimap
    multimap<int, int> multimap;

    // Use sum as key and row numbers as values in the multimap
    for (int i = 0; i < N; i++)
    {
        // find the sum of the current row
        int sum = 0;
        for (int j = 0; j < N; j++) {
            sum += (int)mat[i][j];
        }

        // insert the sum and row number into the multimap
        multimap.insert({sum, i});
    }

    // node[i] will store the node for `i` in the constructed tree
    Node* node[N];
    int row;

    // value of parent[i] is true if a parent is set for the i'th node
    bool parent[N];
    for (int i = 0; i < N; i++) {
        parent[i] = false;
    }

    // Traverse the multimap in sorted order (default behavior)
    for (auto it: multimap)
    {
        row = it.second;

        // create a new node
        node[row] = new Node(row);

        // if a leaf node is reached, do nothing
        if (it.first == 0) {
            continue;
        }

        // traverse row
        for (int i = 0; i < N; i++)
        {
            // do if a parent is not set and ancestor exits
            if (parent[i] == false && mat[row][i])
            {
                // check for the unoccupied node
                if (node[row]->left == nullptr) {
                    node[row]->left = node[i];
                }
                else {
                    node[row]->right = node[i];
                }

                // set parent for i'th node
                parent[i] = true;
            }
        }
    }

    // last processed node is the root
    return node[row];
}

int main()
{
    vector<vector<bool>> mat =
    {
        { 0, 0, 0, 0, 0 },
        { 1, 0, 0, 0, 0 },
        { 0, 0, 0, 1, 0 },
        { 0, 0, 0, 0, 0 },
        { 1, 1, 1, 1, 0 }
    };

    Node* root = constructTree(mat);
    inorder(root);

    return 0;
}
```

**Output:** 0 1 4 3 2

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
    // Utility function to print binary tree nodes in an inorder fashion
    public static void inorder(Node node)
    {
        if (node != null)
        {
            inorder(node.left);
            System.out.print(node.key + " ");
            inorder(node.right);
        }
    }

    // Utility function to add an element to the list corresponding to the given key
    // in Map<Integer, List<Integer>>.
    public static void insertIntoMultiMap(Map<Integer, List<Integer>> map,
                                        Integer key, Integer value) {
        map.putIfAbsent(key, new ArrayList<>());
        map.get(key).add(value);
    }

    // Function to construct a binary tree from the specified ancestor matrix
    public static Node constructTree(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return null;
        }

        // get the total number of rows in the matrix
        int N = mat.length;

        // create an empty multimap
        Map<Integer, List<Integer>> multimap = new TreeMap<>();

        // Use sum as key and row numbers as values in the multimap
        for (int i = 0; i < N; i++)
        {
            // find the sum of the current row
            int sum = Arrays.stream(mat[i]).sum();

            // insert the sum and row number into the multimap
            insertIntoMultiMap(multimap, sum, i);
        }

        // node[i] will store the node for `i` in the constructed tree
        Node[] node = new Node[N];
        int last = 0;

        // value of parent[i] is true if a parent is set for the i'th node
        boolean[] parent = new boolean[N];

        // Traverse the `TreeMap` in sorted order (default behavior)
        for (Map.Entry<Integer, List<Integer>> entry: multimap.entrySet())
        {
            for (int row: entry.getValue())
            {
                last = row;
                // create a new node
                node[row] = new Node(row);

                // if a leaf node is reached, do nothing
                if (entry.getKey() == 0) {
                    continue;
                }

                // traverse row
                for (int i = 0; i < N; i++)
                {
                    // do if a parent is not set and ancestor exits
                    if (parent[i] == false && mat[row][i] == 1)
                    {
                        // check for the unoccupied node
                        if (node[row].left == null) {
                            node[row].left = node[i];
                        }
                        else {
                            node[row].right = node[i];
                        }

                        // set parent for i'th node
                        parent[i] = true;
                    }
                }
            }
        }

        // last processed node is the root
        return node[last];
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 0, 0, 0, 0, 0 },
            { 1, 0, 0, 0, 0 },
            { 0, 0, 0, 1, 0 },
            { 0, 0, 0, 0, 0 },
            { 1, 1, 1, 1, 0 }
        };

        Node root = constructTree(mat);
        inorder(root);
    }
}
```

##

```python3
# A class to store a binary tree node
class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

# Utility function to print binary tree nodes in an inorder fashion
def inorder(node):
    if node:
        inorder(node.left)
        print(node.key, end=' ')
        inorder(node.right)

# Function to construct a binary tree from the specified ancestor matrix
def constructTree(mat):

    # base case
    if not mat:
        return None

    # get the total number of rows in the matrix
    N = len(mat)

    # create an empty dictionary
    d = {}

    # Use sum as key and row numbers as values in the dictionary
    for i in range(N):

        # find the sum of the current row
        total = sum(mat[i])

        # insert the sum and row number into the dictionary
        d.setdefault(total, []).append(i)

    # node[i] will store the node for `i` in the constructed tree
    node = [Node(-1)] * N
    last = 0

    # value of parent[i] is true if a parent is set for the i'th node
    parent = [False] * N

    # Traverse the dictionary in sorted order
    for key in sorted(d.keys()):
        for row in d.get(key):
            last = row
            # create a new node
            node[row] = Node(row)

            # if a leaf node is reached, do nothing
            if key == 0:
                continue

            # traverse row
            for i in range(N):
                # do if a parent is not set and ancestor exits
                if not parent[i] and mat[row][i] == 1:
                    # check for the unoccupied node
                    if node[row].left is None:
                        node[row].left = node[i]
                    else:
                        node[row].right = node[i]

                    # set parent for i'th node
                    parent[i] = True

    # last processed node is the root
    return node[last]

if __name__ == '__main__':

    mat = [
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0]
    ]

    root = constructTree(mat)
    inorder(root)
```

The time complexity of the above solution is O(N2) and requires O(N) extra space, where `N × N` are dimensions of the ancestor matrix.

**Author:** Aditya Goel

Also See:

> [Construct an ancestor matrix from a binary tree](https://www.techiedelight.com/construct-ancestor-matrix-from-binary-tree/ "Construct an ancestor matrix from a binary tree")

> [Determine whether the given binary tree nodes are cousins of each other](https://www.techiedelight.com/determine-two-nodes-are-cousins/ "Determine whether the given binary tree nodes are cousins of each other")

> [Build a binary tree from a parent array](https://www.techiedelight.com/build-binary-tree-given-parent-array/ "Build a binary tree from a parent array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 156

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
