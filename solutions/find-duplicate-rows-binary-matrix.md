# Find duplicate rows in a binary matrix

> Source: https://www.techiedelight.com/find-duplicate-rows-binary-matrix/

Find duplicate rows present in a given binary matrix by traversing the matrix only once.

For example,

**Input:** [1 0 0 1 0] [0 1 1 0 0] [1 0 0 1 0] [0 0 1 1 0] [0 1 1 0 0] **Output:** {3, 5} **Explanation:** Row #3 is duplicate of row #1 and row #5 is duplicate of row #2

> 

## Approach 1 (Using Trie)

The idea is to insert each row of the given binary matrix into a binary [Trie](https://techiedelight.com/trie-implementation-insert-search-delete/). The alphabet size of a binary trie is only limited to Boolean numbers (0 and 1). If a row is seen before (i.e., it is already present in the Trie), report it as duplicate.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
using namespace std;

// `M × N` matrix
#define M 5
#define N 5

// Data structure to store a Trie node
struct Trie
{
    bool isLeaf;    // set when the node is a leaf node
    Trie* character[2];
};

// Function that returns a new Trie node
Trie* getNewTrieNode()
{
    Trie* node = new Trie;

    node->character[0] = node->character[1] = nullptr;
    node->isLeaf = false;

    return node;
}

// Iterative function to insert each array element into a Trie
bool insert(Trie*& head, bool* arr)
{
    // start from the root node
    Trie* curr = head;

    for (int i = 0; i < N; i++)
    {
        // create a new node if the path doesn't exist
        if (curr->character[arr[i]] == nullptr) {
            curr->character[arr[i]] = getNewTrieNode();
        }

        // go to the next node
        curr = curr->character[arr[i]];
    }

    // if the row is inserted before, return false
    if (curr->isLeaf) {
        return false;
    }

    // mark leaf node and return true
    return curr->isLeaf = true;
}

int main()
{
    bool mat[M][N] =
    {
        {1, 0, 0, 1, 0},
        {0, 1, 1, 0, 0},
        {1, 0, 0, 1, 0},
        {0, 0, 1, 1, 0},
        {0, 1, 1, 0, 0}
    };

    // insert all rows of the matrix into a Trie
    Trie* head = getNewTrieNode();
    for (int i = 0; i < M; i++)
    {
        if (!insert(head, mat[i])) {
            cout << "Duplicate row found: Row #" << i + 1 << endl;
        }
    }

    return 0;
}
```

##

```java
// A class to store a Trie node
class Trie
{
    boolean isLeaf;    // set when the node is a leaf node
    Trie[] character = new Trie[2];

    // Constructor
    Trie() {
        isLeaf = false;
    }
}

class Main
{
    // Iterative function to insert each array element into a Trie
    public static boolean insert(Trie head, int[] A)
    {
        // start from the root node
        Trie curr = head;

        for (int i: A)
        {
            // create a new node if the path doesn't exist
            if (curr.character[i] == null) {
                curr.character[i] = new Trie();
            }

            // go to the next node
            curr = curr.character[i];
        }

        // if the row is inserted before, return false
        if (curr.isLeaf) {
            return false;
        }

        // mark leaf node and return true
        return (curr.isLeaf = true);
    }

    public static void main (String[] args)
    {
        Trie head = new Trie();

        int mat[][] =
        {
            {1, 0, 0, 1, 0},
            {0, 1, 1, 0, 0},
            {1, 0, 0, 1, 0},
            {0, 0, 1, 1, 0},
            {0, 1, 1, 0, 0}
        };

        // insert all rows of the matrix into a Trie
        for (int i = 0; i < mat.length; i++)
        {
            if (!insert(head, mat[i])) {
                System.out.println("Duplicate row found: Row #" + (i + 1));
            }
        }
    }
}
```

##

```python3
# A class to store a Trie node
class Trie:
    # Constructor
    def __init__(self):
        self.character = [None] * 2

        # set when the node is a leaf node
        self.isLeaf = False

# Iterative function to insert each element of a list into a Trie
def insert(head, A):

    # start from the root node
    curr = head

    for i in A:
        # create a new node if the path doesn't exist
        if curr.character[i] is None:
            curr.character[i] = Trie()

        # go to the next node
        curr = curr.character[i]

    # if the row is inserted before, return false
    if curr.isLeaf:
        return False

    # mark leaf node and return true
    curr.isLeaf = True
    return True

if __name__ == '__main__':

    mat = [
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0]
    ]

    # insert all rows of the matrix into a Trie
    head = Trie()
    for i, e in enumerate(mat):
        if not insert(head, e):
            print(f"Duplicate row found: Row #{i+1}")
```

**Output:** Duplicate row found: Row #3 Duplicate row found: Row #5

The time complexity of the above solution is O(N.M) and requires O(N.M) extra space for Trie data structure, where `M` and `N` are dimensions of the matrix.

## Approach 2 (Converting to Decimal)

The idea is to convert each row to its decimal equivalent and check if the decimal value is seen before or not. If it is seen before, report the row as duplicate. This method will only work for `N < 32` (or `N < 64` if `long` datatype is used), where `N` is the total number of columns in the matrix.

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>
#include <cmath>
using namespace std;

int main()
{
    vector<vector<bool>> mat =
    {
        {0, 0, 0, 0, 0},
        {0, 1, 1, 0, 0},
        {0, 0, 0, 0, 0},
        {0, 0, 1, 1, 0},
        {0, 1, 1, 0, 0}
    };

    unordered_set<unsigned> set;

    // do for each row `i`
    for (int i = 0; i < mat.size(); i++)
    {
        unsigned decimal = 0;

        // convert binary row `i` to its decimal equivalent
        for (int j = 0; j < mat[0].size(); j++) {
            decimal += mat[i][j] * pow(2, j);
        }

        // if the decimal value is seen before
        if (set.find(decimal) != set.end()) {
            cout << "Duplicate row found: Row #" << i + 1 << endl;
        }
        else {
            set.insert(decimal);
        }
    }

    return 0;
}
```

##

```java
import java.util.HashSet;
import java.util.Set;

class Main
{
    public static void main(String[] args)
    {
        int mat[][] =
        {
            {0, 0, 0, 0, 0},
            {0, 1, 1, 0, 0},
            {0, 0, 0, 0, 0},
            {0, 0, 1, 1, 0},
            {0, 1, 1, 0, 0}
        };

        Set<Integer> set = new HashSet<>();

        // do for each row `i`
        for (int i = 0; i < mat.length; i++)
        {
            int decimal = 0;

            // convert binary row `i` to its decimal equivalent
            for (int j = 0; j < mat[i].length; j++) {
                decimal += mat[i][j] * Math.pow(2, j);
            }

            // if the decimal value is seen before
            if (set.contains(decimal)) {
                System.out.println("Duplicate row found: Row #" + (i + 1));
            }
            else {
                set.add(decimal);
            }
        }
    }
}
```

##

```python3
if __name__ == '__main__':

    mat = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0]
    ]

    s = set()

    # do for each row `i`
    for i in range(len(mat)):
        decimal = 0

        # convert binary row `i` to its decimal equivalent
        for j in range(len(mat[i])):
            decimal += mat[i][j] * pow(2, j)

        # if the decimal value is seen before
        if decimal in s:
            print("Duplicate row found: Row", (i + 1))
        else:
            s.add(decimal)
```

**Output:** Duplicate row found: Row #3 Duplicate row found: Row #5

The time complexity of the above solution is O(N.M) and requires O(M) extra space for the hashset, where `M` and `N` are dimensions of the matrix.
