# Young Tableau | Insert, Search, Extract-Min, Delete, Replace

> Source: https://www.techiedelight.com/young-tableau-insert-search-extract-min-delete-replace/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

An `M × N` Young tableau is an `M × N` matrix such that the entries of each row are sorted from left to right and the entries of each column are sorted from top to bottom. Some entries of a Young tableau may be infinity, which indicates an empty entry. Thus, a Young tableau can be used to hold `n <= M*N` finite numbers.

For example, the following matrix is a Young tableau:

In this post, we will see how to

  * Insert a new element into a non-full M × N Young tableau in O(M + N) time.
  * Search an element in an M × N Young tableau in O(M + N) time.
  * Extract the minimum element from an M × N Young tableau in O(M + N) time.
  * Delete an element in an M × N Young tableau in O(M + N) time.
  * Replace an element in an M × N Young tableau in O(M + N) time.

## 1\. Insert operation in Young tableau

> 

To insert an element into a non-full Young tableau, the idea is to place the element in the bottom-right corner of the tableau and then move it upwards and leftwards to its correct position within the tableau. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <climits>
using namespace std;

// Recursive function to insert a new element into a non-full `M × N` Young tableau
// The new element is initially placed in the bottom-right corner of the tableau.
// The function works by swapping the smallest of [i-1, j] and [i, j-1] with
// [i, j] and recur for the smaller value.

void insert(vector<vector<int>> &tableau, int i, int j)
{
    // base case
    if (i == 0 && j == 0) {
        return;
    }

    // handle separately for the first row
    if (i == 0)
    {
        if (tableau[i][j] < tableau[i][j-1])
        {
            swap(tableau[i][j], tableau[i][j-1]);
            insert(tableau, i, j - 1);
        }
        return;
    }

    // handle separately for the first column
    if (j == 0)
    {
        if (tableau[i][j] < tableau[i-1][j])
        {
            swap(tableau[i][j], tableau[i-1][j]);
            insert(tableau, i - 1, j);
        }
        return;
    }

    if (tableau[i][j] < tableau[i-1][j])        // go up
    {
        swap(tableau[i][j], tableau[i-1][j]);
        insert(tableau, i - 1, j);
    }

    if (tableau[i][j] < tableau[i][j-1])        // go left
    {
        swap(tableau[i][j], tableau[i][j-1]);
        insert(tableau, i, j - 1);
    }
}

// Utility function to print a Young tableau
void printTableau(vector<vector<int>> const &tableau)
{
    for (int i = 0; i < tableau.size(); i++)
    {
        for (int j = 0; j < tableau[0].size(); j++) {
            cout << tableau[i][j] << ' ';
        }
        cout << endl;
    }
}

// Recursive function to insert a new element into a non-full `M × N` Young tableau
vector<vector<int>> insert(vector<int> &keys)
{
    int M = ceil(sqrt(keys.size()));
    int N = M;

    // construct an `M × N` Young tableau and initialize it by infinity
    vector<vector<int>> tableau(M, vector<int>(N, INT_MAX));

    // do for each key
    for (int key: keys)
    {
        // check for overflow
        if (tableau[M-1][N-1] != INT_MAX) {
            cout << "Young tableau is full. Skipping key " << key << endl;
        }
        else {
            // place the key in the bottom-right corner of the tableau
            tableau[M-1][N-1] = key;

            // move the key to its correct position in the tableau
            insert(tableau, M-1, N-1);
        }
    }

    return tableau;
}

int main()
{
    // construct a Young tableau from the following keys
    vector<int> keys = { 12, 10, 20, 22, 25, 30, 34, 11,
                        44, 27, 16, 40, 35, 15, 18, 45 };

    vector<vector<int>> tableau = insert(keys);
    printTableau(tableau);

    return 0;
}
```

**Output:** 10 11 12 15 16 18 20 22 25 27 30 34 35 40 44 45

##

```java
import java.util.Arrays;

class Main
{
    // Recursive function to insert a new element into a non-full `M × N` Young tableau
    // The new element is initially placed in the bottom-right corner of the tableau.
    // The function works by swapping the smallest of [i-1, j] and [i, j-1] with
    // [i, j] and recur for the smaller value.

    public static void insert(int[][] tableau, int i, int j)
    {
        // base case
        if (i == 0 && j == 0) {
            return;
        }

        // handle separately for the first row
        if (i == 0)
        {
            if (tableau[i][j] < tableau[i][j-1])
            {
                // swap tableau[i][j] and tableau[i][j-1]
                int temp = tableau[i][j];
                tableau[i][j] = tableau[i][j-1];
                tableau[i][j-1] = temp;

                insert(tableau, i, j - 1);
            }
            return;
        }

        // handle separately for the first column
        if (j == 0)
        {
            if (tableau[i][j] < tableau[i-1][j])
            {
                // swap tableau[i][j] and tableau[i-1][j]

                int temp = tableau[i][j];
                tableau[i][j] = tableau[i-1][j];
                tableau[i-1][j] = temp;

                insert(tableau, i - 1, j);
            }
            return;
        }

        if (tableau[i][j] < tableau[i-1][j])        // go up
        {
            // swap tableau[i][j] and tableau[i-1][j]

            int temp = tableau[i][j];
            tableau[i][j] = tableau[i-1][j];
            tableau[i-1][j] = temp;

            insert(tableau, i - 1, j);
        }

        if (tableau[i][j] < tableau[i][j-1])        // go left
        {
            // swap tableau[i][j] and tableau[i][j-1]

            int temp = tableau[i][j];
            tableau[i][j] = tableau[i][j-1];
            tableau[i][j-1] = temp;

            insert(tableau, i, j - 1);
        }
    }

    // Utility function to print a Young tableau
    public static void printTableau(int[][] tableau)
    {
        for (int i = 0; i < tableau.length; i++)
        {
            for (int j = 0; j < tableau[0].length; j++) {
                System.out.print(tableau[i][j] + " ");
            }
            System.out.println();
        }
    }

    // Recursive function to insert a new element into a non-full
    // M × N Young tableau
    public static int[][] insert(int[] keys)
    {
        int M, N;
        M = N = (int)Math.ceil(Math.sqrt(keys.length));

        // construct an `M × N` Young tableau
        int[][] tableau = new int[M][N];

        // initialize the Young tableau by infinity
        for (int i = 0; i < M; i++) {
            Arrays.fill(tableau[i], Integer.MAX_VALUE);
        }

        // do for each key
        for (int key: keys)
        {
            // check for overflow
            if (tableau[M-1][N-1] != Integer.MAX_VALUE) {
                System.out.print("Young tableau is full. Skipping key " + key);
            }
            else {
                // place the key in the bottom-right corner of the tableau
                tableau[M-1][N-1] = key;

                // move the key to its correct position in the tableau
                insert(tableau, M-1, N-1);
            }
        }

        return tableau;
    }

    public static void main(String[] args)
    {
        // construct a Young tableau from the following keys
        int[] keys = { 12, 10, 20, 22, 25, 30, 34, 11,
                        44, 27, 16, 40, 35, 15, 18, 45 };

        int[][] tableau = insert(keys);
        printTableau(tableau);
    }
}
```

##

```python3
from math import sqrt, ceil

# Recursive function to insert a new element into a non-full `M × N` Young tableau.
# The new element is initially placed in the bottom-right corner of the tableau.
# The function works by swapping the smallest of [i-1, j] and [i, j-1] with
# [i, j] and recur for the smaller value.
def insert(tableau, i, j):

    # base case
    if i == 0 and j == 0:
        return

    # handle separately for the first row
    if i == 0:
        if tableau[i][j] < tableau[i][j - 1]:
            # swap tableau[i][j] and tableau[i][j-1]
            temp = tableau[i][j]
            tableau[i][j] = tableau[i][j - 1]
            tableau[i][j - 1] = temp

            insert(tableau, i, j - 1)
        return

    # handle separately for the first column
    if j == 0:
        if tableau[i][j] < tableau[i - 1][j]:
            # swap tableau[i][j] and tableau[i-1][j]

            temp = tableau[i][j]
            tableau[i][j] = tableau[i - 1][j]
            tableau[i - 1][j] = temp

            insert(tableau, i - 1, j)
        return

    if tableau[i][j] < tableau[i - 1][j]:        # go up

        # swap tableau[i][j] and tableau[i-1][j]
        temp = tableau[i][j]
        tableau[i][j] = tableau[i - 1][j]
        tableau[i - 1][j] = temp

        insert(tableau, i - 1, j)

    if tableau[i][j] < tableau[i][j - 1]:        # go left

        # swap tableau[i][j] and tableau[i][j-1]
        temp = tableau[i][j]
        tableau[i][j] = tableau[i][j - 1]
        tableau[i][j - 1] = temp

        insert(tableau, i, j - 1)

# Utility function to print a Young tableau
def printTableau(tableau):
    for i in range(len(tableau)):
        print(tableau[i])

# Recursive function to insert a new element into a non-full `M × N` Young tableau.
def insertKeys(keys):

    # construct an `M × N` Young tableau
    M = N = ceil(sqrt(len(keys)))

    # initialize the Young tableau by infinity
    tableau = [[float('inf')  for x in range(N)] for y in range(M)]

    # do for each key
    for key in keys:
        # check for overflow
        if tableau[M - 1][N - 1] != float('inf') :
            print('Young tableau is full. Skipping key', key)
        else:
            # place the key in the bottom-right corner of the tableau
            tableau[M - 1][N - 1] = key

            # move the key to its correct position in the tableau
            insert(tableau, M - 1, N - 1)

    return tableau

if __name__ == '__main__':

    # construct a Young tableau from the following keys
    keys = [12, 10, 20, 22, 25, 30, 34, 11, 44, 27, 16, 40, 35, 15, 18, 45]

    tableau = insertKeys(keys)
    printTableau(tableau)
```

The time complexity for the insert operation is O(M + N), while the overall time complexity to construct an `M × N` Young tableau from a given list of elements is O(M × N × (M + N)). The additional space used by the program is O(M + N) for the call stack.

## 2\. Search operation in Young tableau

A naive solution would be to traverse the complete tableau to search for a given value. The problem with this approach is that it would require O(M × N) time for searching in an `M × N` Young tableau.

### Can we do better?

The idea is to take advantage of the fact that a Young tableau is a row-wise and column-wise sorted matrix. We start from the tableau’s top-rightmost corner and compare the current element with the one we are looking for and accordingly move left or down:

  1. If the current element is less than the key, increment the row index (move to the next row)
  2. If the current element is more than the key, decrement the column index (move to the previous column)
  3. If the current element is equal to the key, return true as we have found the element. If we end up in a row or column beyond the tableau boundary, terminate the search and return false.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Utility function to search an element in a Young tableau
bool search(vector<vector<int>> &tableau, int key)
{
    // base case
    if (tableau.size() == 0) {
        return false;
    }

    // M × N Young tableau
    int M = tableau.size();
    int N = tableau[0].size();

    // start from the top-rightmost cell of the tableau, i.e., (0, N-1) cell
    int i = 0, j = N - 1;

    // run till tableau boundary is reached
    while (i < M && j >= 0)
    {
        // if the current element is less than the key, increment the row index
        if (tableau[i][j] < key) {
            i++;
        }

        // if the current element is more than the key, decrement the column index
        else if (tableau[i][j] > key) {
            j--;
        }

        // if the current element is equal to the key
        else {
            return true;
        }
    }

    return false;
}

int main()
{
    vector<vector<int>> tableau =
    {
        { 10, 12, 15, 16 },
        { 11, 18, 20, 25 },
        { 22, 27, 30, 35 },
        { 34, 40, 44, 45 }
    };

    vector<int> keys = { 20, 23, 25, 29 };

    // do for each key
    for (int key: keys)
    {
        if (search(tableau, key)) {
            cout << "Key " << key << " found in tableau" << endl;
        }
    }

    return 0;
}
```

**Output:** Key 20 found in tableau Key 25 found in tableau

##

```java
class Main
{
    // Utility function to search an element in a Young tableau
    public static boolean search(int[][] tableau, int key)
    {
        // base case
        if (tableau == null || tableau.length == 0) {
            return false;
        }

        // start from the top-rightmost cell of the matrix, i.e., (0, N-1) cell
        int i = 0, j = tableau[0].length - 1;

        // run till matrix boundary is reached
        while (i < tableau.length && j >= 0)
        {
            // if the current element is less than the key, increment the row index
            if (tableau[i][j] < key) {
                i++;
            }

            // if the current element is more than the key, decrement the column index
            else if (tableau[i][j] > key) {
                j--;
            }

            // if the current element is equal to the key
            else {
                return true;
            }
        }

        return false;
    }

    public static void main(String[] args)
    {
        // M × N Young tableau
        int[][] tableau =
        {
            { 10, 12, 15, 16 },
            { 11, 18, 20, 25 },
            { 22, 27, 30, 35 },
            { 34, 40, 44, 45 }
        };

        int[] keys = { 20, 23, 25, 29 };

        // do for each key
        for (int key: keys)
        {
            if (search(tableau, key)) {
                System.out.println("Key " + key + " found in tableau");
            }
        }
    }
}
```

##

```python3
# Utility function to search an element in a Young tableau
def search(tableau, key):

    # base case
    if not tableau:
        return False

    # start from the top-rightmost cell of the matrix, i.e., (0, N-1) cell
    i = 0
    j = len(tableau[0]) - 1

    # run till matrix boundary is reached
    while i < len(tableau) and j >= 0:

        # if the current element is less than the key, increment the row index
        if tableau[i][j] < key:
            i = i + 1

        # if the current element is more than the key, decrement the column index
        elif tableau[i][j] > key:
            j = j - 1

        # if the current element is equal to the key
        else:
            return True

    return False

if __name__ == '__main__':

    # M × N Young tableau
    tableau = [
        [10, 12, 15, 16],
        [11, 18, 20, 25],
        [22, 27, 30, 35],
        [34, 40, 44, 45]
    ]

    keys = [20, 23, 25, 29]

    # do for each key
    for key in keys:
        if search(tableau, key):
            print(f'Key {key} found in tableau')
```

The time complexity of the search operation is O(M + N) for an `M × N` matrix and doesn’t require any extra space.

## 3\. Extract-Min operation in Young tableau

> 

The minimum element is present at position `(0, 0)` in the tableau. To remove an element `(i, j)` from a tableau, replace the cell value by infinity and return the element. This causes the Young tableau to become unstable, and the submatrix formed by `(i, j)`, `(i, N-1)`, `(M-1, j)`, and `(M-1, N-1)` violates the Young tableau property (the submatrix is not row-wise sorted and column-wise sorted anymore).

A Young tableau is similar to a heap where each cell `(i, j)` can be considered the root node. The bottom cell `(i+1, j)` and right cell `(i, j+1)` of a cell `(i, j)` can be considered as the left and right child of the root node.

The idea is to perform a procedure similar to [HEAPIFY-DOWN](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) to restore the Young tableau property. If `(i, j)` is larger than its neighbors, swap the smallest of `(i+1, j)` and `(i, j+1)` with `(i, j)`. This restores the tableau property for cell `(i, j)` but reduces the problem for cell `(i+1, j)` or cell `(i, j+1)`.

The algorithm can be recursively implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Recursive function to fix the tableau property in an `M × N` Young tableau.
// An infinite value is initially placed at the first cell `(0, 0)` of the tableau.
// The function works by swapping the smallest of [i+1, j] and [i, j+1] with
// [i, j] and recur for the smaller value.

void fixTableau(vector<vector<int>> &tableau, int i, int j)
{
    // M × N Young tableau
    int M = tableau.size();
    int N = tableau[0].size();

    // get the values present at the bottom and right cell of the current cell
    int bottom = (i + 1 < M) ? tableau[i + 1][j] : INT_MAX;
    int right = (j + 1 < N) ? tableau[i][j + 1] : INT_MAX;

    if (bottom == INT_MAX && right == INT_MAX) {
        return;
    }

    if (bottom < right)        // go down
    {
        swap(tableau[i][j], tableau[i + 1][j]);
        fixTableau(tableau, i + 1, j);
    }
    else        // go right
    {
        swap(tableau[i][j], tableau[i][j + 1]);
        fixTableau(tableau, i, j + 1);
    }
}

// Function to extract the next minimum element from the Young tableau
int replaceInYoungTableau(vector<vector<int>> &tableau)
{
    // base case
    if (tableau.size() == 0) {
        exit(-1);
    }

    // the first cell of the tableau stores the minimum element
    int min = tableau[0][0];

    // make the first element as infinity
    tableau[0][0] = INT_MAX;

    // fix the Young tableau property
    fixTableau(tableau, 0, 0);

    return min;
}

int main()
{
    vector<vector<int>> tableau =
    {
        { 10, 12, 15, 16 },
        { 11, 18, 20, 25 },
        { 22, 27, 30, 35 },
        { 34, 40, 44, 45 }
    };

    // M × N Young tableau
    int M = tableau.size();
    int N = tableau[0].size();

    // repeat `M×N` times
    for (int i = 0; i < M*N; i++) {
        cout << replaceInYoungTableau(tableau) << ' ';
    }

    return 0;
}
```

**Output:** 10 11 12 15 16 18 20 22 25 27 30 34 35 40 44 45
