# Report all occurrences of an element in a row-wise and column-wise sorted matrix in linear time

> Source: https://www.techiedelight.com/report-all-occurrences-of-an-element-in-sorted-matrix/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` matrix, which is row-wise and column-wise sorted (with all strictly increasing elements in any row or column), report all occurrences of a given element in it in linear time.

For example,

**Input:** [ -4 -3 -1 3 5 ] [ -3 -2 2 4 6 ] [ -1 1 3 5 8 ] [ 3 4 7 8 9 ] **Output:** Element 3 is found at position (0, 3) Element 3 is found at position (2, 2) Element 3 is found at position (3, 0)

> 

We can do a [binary search](https://techiedelight.com/binary-search/) to find an index of the first occurrence and the last occurrence of the given key for each row. The complexity of this solution will be O(M × log(N)), which is not linear as per problem time constraints.

The idea is to take advantage of the fact that the matrix is row-wise and column-wise sorted. We start from the matrix’s top-rightmost cell and do the following until the matrix boundary is reached:

  1. If the current element is less than the key, increment the row index (move to the next row)
  2. If the current element is more than the key, decrement column index (move to the previous column)
  3. If the current element is equal to the key, print the current location and increment row index & decrement column index to find the key’s next location in the given matrix. This will work as the matrix contains all strictly increasing elements in any row or column.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

void findElement(vector<vector<int>> const &mat, int key)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    int M = mat.size();
    int N = mat[0].size();

    // start from `(0, N-1)`, i.e., top-rightmost cell of the matrix
    int i = 0, j = N - 1;

    // run till matrix boundary is reached
    while (i <= M - 1 && j >= 0)
    {
        // if the current element is less than the key, increment row index
        if (mat[i][j] < key) {
            i++;
        }

        // if the current element is more than the key, decrement col index
        else if (mat[i][j] > key) {
            j--;
        }

        // if the current element is equal to the key
        else {
            cout << "Element " << key << " is found at position ("
                 << i << ", " << j << ")" << endl;

            i++; j--;
        }
    }
}

int main()
{
    vector<vector<int>> mat =
    {
        { -4, -3, -1, 3, 5 },
        { -3, -2, 2, 4, 6 },
        { -1, 1, 3, 5, 8 },
        { 3, 4, 7, 8, 9 }
    };

    int key = 3;

    findElement(mat, key);

    return 0;
}
```

##

```java
class Main
{
    public static void findElement(int[][] mat, int key)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // start from `(0, N-1)`, i.e., top-rightmost cell of the matrix
        int i = 0, j = N - 1;

        // run till matrix boundary is reached
        while (i <= M - 1 && j >= 0)
        {
            // if the current element is less than the key, increment row index
            if (mat[i][j] < key) {
                i++;
            }

            // if the current element is more than the key, decrement col index
            else if (mat[i][j] > key) {
                j--;
            }

            // if the current element is equal to the key
            else {
                System.out.println("Element " + key + " is found at position ("
                        + i + ", " + j + ")");

                i++; j--;
            }
        }
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { -4, -3, -1, 3, 5 },
            { -3, -2, 2, 4, 6 },
            { -1, 1, 3, 5, 8 },
            { 3, 4, 7, 8, 9 }
        };

        int key = 3;

        findElement(mat, key);
    }
}
```

##

```python3
def findElement(mat, key):

    # base case
    if not mat or not len(mat):
        return

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # start from `(0, N-1)`, i.e., top-rightmost cell of the matrix
    i = 0
    j = N - 1

    # run till matrix boundary is reached
    while i <= M - 1 and j >= 0:

        # if the current element is less than the key, increment row index
        if mat[i][j] < key:
            i = i + 1

        # if the current element is more than the key, decrement col index
        elif mat[i][j] > key:
            j = j - 1

        # if the current element is equal to the key
        else:
            print("Element", key, "is found at position", (i, j))
            i = i + 1
            j = j - 1

if __name__ == '__main__':

    mat = [
        [-4, -3, -1, 3, 5],
        [-3, -2, 2, 4, 6],
        [-1, 1, 3, 5, 8],
        [3, 4, 7, 8, 9]
    ]

    findElement(mat, 3)
```

**Output:** Element 3 is found at position (0, 3) Element 3 is found at position (2, 2) Element 3 is found at position (3, 0)

The time complexity of the proposed solution is O(M + N) for an `M × N` matrix and doesn’t require any extra space.

Also See:

> [Count negative elements present in the sorted matrix in linear time](https://www.techiedelight.com/count-negative-elements-present-sorted-matrix/ "Count negative elements present in the sorted matrix in linear time")

> [Find the index of a row containing the maximum number of 1’s in a binary matrix](https://www.techiedelight.com/find-index-row-containing-maximum-number-1s-matrix/ "Find the index of a row containing the maximum number of 1’s in a binary matrix")

> [Change all elements of row `i` and column `j` in a matrix to 0 if cell `(i, j)` is 0](https://www.techiedelight.com/change-elements-row-column-j-matrix-0-cell-j-value-0/ "Change all elements of row `i` and column `j` in a matrix to 0 if cell `\(i, j\)` is 0")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
