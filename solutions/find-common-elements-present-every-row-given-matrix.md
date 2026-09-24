# Find all common elements present in each row of a matrix

> Source: https://www.techiedelight.com/find-common-elements-present-every-row-given-matrix/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` matrix, find all common elements present in every row.

For example,

**Input:** M × N matrix [ 7 1 3 5 3 6 ] [ 2 3 6 1 1 6 ] [ 6 1 7 2 1 4 ] [ 6 6 7 1 3 3 ] [ 5 5 6 1 5 4 ] [ 3 5 6 2 7 1 ] [ 4 1 4 3 6 4 ] [ 4 6 1 7 4 3 ] **Output:** The common elements are 1 and 6

> 

The idea is simple and efficient – create an empty map and insert all the first row elements into the map with their value set as 1. For each element of the remaining rows, check if it is present on the map or not. If the element is present on the map, check its count to see if it is present in all previous rows or not. If yes, increment its count by 1; otherwise, ignore the element.

Following is the implementation in C++, Java, and Python based on the above idea. One particular case we need to handle that any duplicate entry in the same row should not get inserted into the map again.

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Function to find all common elements present in every row
// of a given matrix
void findCommonElements(vector<vector<int>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // Create an empty map
    unordered_map<int, int> map;

    // Insert all elements of the first row into the map
    // with their value set as 1

    for (int c = 0; c < N; c++) {
        map.insert(pair<int, int>(mat[0][c], 1));
    }

    // Do for remaining rows
    for (int r = 1; r < M; r++)
    {
        for (int c = 0; c < N; c++)
        {
            // Get the current element
            int curr = mat[r][c];

            // If the current element is present on the map and its value
            // is the same as the row index, increment its value by 1.
            // This check also handles duplicate entries in the same row.

            if (map.find(curr) != map.end() && map[curr] == r) {
                map[curr] = r + 1;
            }
        }
    }

    // Iterate over each entry in the map and print keys having
    // their value equal to `M` (number of rows in the matrix)

    cout << "The common elements are: ";
    for (auto it: map)
    {
        if (it.second == M) {
            cout << it.first << " ";
        }
    }
}

int main()
{
    vector<vector<int>> mat =
    {
        { 7, 1, 3, 5, 3, 6 },
        { 2, 3, 6, 1, 1, 6 },
        { 6, 1, 7, 2, 1, 4 },
        { 6, 6, 7, 1, 3, 3 },
        { 5, 5, 6, 1, 5, 4 },
        { 3, 5, 6, 2, 7, 1 },
        { 4, 1, 4, 3, 6, 4 },
        { 4, 6, 1, 7, 4, 3 }
    };

    findCommonElements(mat);

    return 0;
}
```

**Output:** The common elements are: 6 1

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to find all common elements present in every row
    // of a given matrix
    public static void findCommonElements(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // Create an empty map
        Map<Integer, Integer> map = new HashMap<>();

        // Insert all elements of the first row into the map
        // with their value set as 1

        for (int c = 0; c < N; c++) {
            map.put(mat[0][c], 1);
        }

        // Do for remaining rows
        for (int r = 1; r < M; r++)
        {
            for (int c = 0; c < N; c++)
            {
                // Get the current element
                int curr = mat[r][c];

                // If the current element is present on the map and its value
                // is the same as the row index, increment its value by 1.
                // This check also handles duplicate entries in the same row.

                if (map.containsKey(curr) && map.get(curr) == r) {
                    map.put(curr, r + 1);
                }
            }
        }

        // Iterate over each entry in the map and print keys having
        // their value equal to `M` (number of rows in the matrix)

        System.out.print("The common elements are: ");
        for (Map.Entry<Integer, Integer> entry: map.entrySet())
        {
            if (entry.getValue() == M) {
                System.out.print(entry.getKey() + " ");
            }
        }
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 7, 1, 3, 5, 3, 6 },
            { 2, 3, 6, 1, 1, 6 },
            { 6, 1, 7, 2, 1, 4 },
            { 6, 6, 7, 1, 3, 3 },
            { 5, 5, 6, 1, 5, 4 },
            { 3, 5, 6, 2, 7, 1 },
            { 4, 1, 4, 3, 6, 4 },
            { 4, 6, 1, 7, 4, 3 }
        };

        findCommonElements(mat);
    }
}
```

##

```python3
# Function to find all common elements present in every row of a given matrix
def findCommonElements(mat):

    # base case
    if not mat or not len(mat):
        return set()

    # `M × N` matrix
    M = len(mat)
    N = len(mat[0])

    # Create an empty dictionary
    d = {}

    # Insert all elements of the first row into the dictionary
    # with their value set as 1
    for c in range(N):
        d[mat[0][c]] = 1

    # Do for remaining rows
    for r in range(1, M):
        for c in range(N):
            # Get the current element
            curr = mat[r][c]

            # if the current element is present in the dictionary and its value
            # is the same as the row index, increment its value by 1.
            # This check also handles duplicate entries in the same row.
            if curr in d and d[curr] == r:
                d[curr] = r + 1

    # Iterate over each entry in the dictionary and print keys having
    # their value equal to `M` (number of rows in the matrix)
    print('The common elements are:', [k for k in d.keys() if d.get(k) == M])

if __name__ == '__main__':

    mat = [
        [7, 1, 3, 5, 3, 6],
        [2, 3, 6, 1, 1, 6],
        [6, 1, 7, 2, 1, 4],
        [6, 6, 7, 1, 3, 3],
        [5, 5, 6, 1, 5, 4],
        [3, 5, 6, 2, 7, 1],
        [4, 1, 4, 3, 6, 4],
        [4, 6, 1, 7, 4, 3]
    ]

    findCommonElements(mat)
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix and doesn’t require any extra space.

Also See:

> [Find common elements present in all rows of a matrix](https://www.techiedelight.com/find-common-elements-present-rows-matrix/ "Find common elements present in all rows of a matrix")

> [Find duplicate rows in a binary matrix](https://www.techiedelight.com/find-duplicate-rows-binary-matrix/ "Find duplicate rows in a binary matrix")

> [Change all elements of row `i` and column `j` in a matrix to 0 if cell `(i, j)` is 0](https://www.techiedelight.com/change-elements-row-column-j-matrix-0-cell-j-value-0/ "Change all elements of row `i` and column `j` in a matrix to 0 if cell `\(i, j\)` is 0")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 256

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
