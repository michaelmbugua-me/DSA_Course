# Find the index of a row containing the maximum number of 1’s in a binary matrix

> Source: https://www.techiedelight.com/find-index-row-containing-maximum-number-1s-matrix/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given a binary `M × N` row-wise sorted matrix, find a row that contains the maximum number of `1's` in linear time.

For example,

**Input:** [ 0 0 0 1 1 ] [ 0 0 1 1 1 ] [ 0 0 0 0 0 ] [ 0 1 1 1 1 ] [ 0 0 0 0 1 ] **Output:** The maximum 1’s are present in row 4

> 

The idea is to start from the top-right corner of the matrix and do the following:

  * If the current cell has value 1, continue moving left till we encounter 0, or all columns are processed;
  * If the current cell has value 0, continue moving down till we encounter 1, or all rows are processed.

Finally, return the row index of the last cell in which we have seen 1. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int findRowIndex(vector<vector<int>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // `(i, j)` stores the current row and column index
    int i, j;

    // stores row number with maximum index
    int row = -1;

    // start from the top-rightmost cell of the matrix
    i = 0, j = N - 1;

    while (i <= M - 1 && j >= 0)
    {
        // move left if the current cell has value 1
        if (mat[i][j]) {
            j--, row = i;   // update row number
        }
        else {              // otherwise, move down
            i++;
        }
    }

    return row + 1;
}

int main()
{
    vector<vector<int>> mat =
    {
        { 0, 0, 0, 1, 1 },
        { 0, 0, 1, 1, 1 },
        { 0, 0, 0, 0, 0 },
        { 0, 1, 1, 1, 1 },
        { 0, 0, 0, 0, 1 }
    };

    int rowIndex = findRowIndex(mat);

    // rowIndex = 0 means no 1's are present in the matrix
    if (rowIndex) {
        cout << "The Maximum 1's are present in the row " << rowIndex;
    }

    return 0;
}
```

**Output:** The maximum 1’s are present in the row 4

##

```java
class Main
{
    public static int findRowIndex(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // stores row number with maximum index
        int row = -1;

        // `(i, j)` stores the current row and column index

        // start from the top-rightmost cell of the matrix
        int i = 0, j = mat[0].length - 1;

        while (i <= mat.length - 1 && j >= 0)
        {
            // move left if the current cell has value 1
            if (mat[i][j] == 1)
            {
                j--;
                row = i;    // update row number
            }
            // otherwise, move down
            else {
                i++;
            }
        }
        return row + 1;
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 0, 0, 0, 1, 1 },
            { 0, 0, 1, 1, 1 },
            { 0, 0, 0, 0, 0 },
            { 0, 1, 1, 1, 1 },
            { 0, 0, 0, 0, 1 }
        };

        int rowIndex = findRowIndex(mat);

        // rowIndex = 0 means no 1's are present in the matrix
        if (rowIndex != 0) {
            System.out.print("The maximum 1's are present in the row " + rowIndex);
        }
    }
}
```

##

```python3
def findRowIndex(mat):

    # base case
    if not mat or not len(mat):
        return

    # stores row number with maximum index
    row = -1

    # `(i, j)` stores the current row and column index
    # start from the top-rightmost cell of the matrix
    (i, j) = (0, len(mat[0]) - 1)

    while i <= len(mat) - 1 and j >= 0:
        # move left if the current cell has value 1
        if mat[i][j] == 1:
            j = j - 1
            row = i         # update row number
        # otherwise, move down
        else:
            i = i + 1

    return row + 1

if __name__ == '__main__':

    mat = [
        [0, 0, 0, 1, 1],
        [0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1]
    ]

    rowIndex = findRowIndex(mat)

    # rowIndex = 0 means no 1's are present in the matrix
    if rowIndex:
        print("The maximum 1's are present in the row", rowIndex)
```

The time complexity of the proposed solution is O(M + N) for an `M × N` matrix and doesn’t require any extra space.

Also See:

> [Report all occurrences of an element in a row-wise and column-wise sorted matrix in linear time](https://www.techiedelight.com/report-all-occurrences-of-an-element-in-sorted-matrix/ "Report all occurrences of an element in a row-wise and column-wise sorted matrix in linear time")

> [Collect maximum value of coins in a matrix](https://www.techiedelight.com/collect-maximum-value-coins-matrix/ "Collect maximum value of coins in a matrix")

> [Count negative elements present in the sorted matrix in linear time](https://www.techiedelight.com/count-negative-elements-present-sorted-matrix/ "Count negative elements present in the sorted matrix in linear time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
