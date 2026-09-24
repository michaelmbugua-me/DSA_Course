# Check if a matrix is a Toeplitz or not

> Source: https://www.techiedelight.com/check-given-matrix-toeplitz-matrix-not/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` matrix, check if it is a Toeplitz matrix or not. A Toeplitz matrix or diagonal-constant matrix is a matrix in which each descending diagonal from left to right is constant.

Any `M × N` matrix `mat` is a Toeplitz matrix if `mat(i, j) = mat(i+1, j+1) = mat(i+2, j+2)`, and so on… Here, `mat(i, j)` denotes the element `mat[i][j]` in the matrix.

For instance, the following matrix is a Toeplitz matrix:

> 

The idea is simple – traverse the matrix once, and for each element `(i, j)`, check if it is the same as its immediate diagonal element `(i+1, j+1)` or not. If any element differs from its immediate diagonal element, the matrix cannot be Toeplitz.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to determine if a given matrix is a Toeplitz or not
bool isToeplitz(vector<vector<int>> const &matrix)
{
    // base case
    if (matrix.size() == 0) {
        return true;
    }

    int M = matrix.size();
    int N = matrix[0].size();

    for (int i = 0; i < M - 1; i++)
    {
        for (int j = 0; j < N - 1; j++)
        {
            // return false if any diagonal elements have different values
            if (matrix[i][j] != matrix[i + 1][j + 1]) {
                return false;
            }
        }
    }

    return true;
}

int main()
{
    vector<vector<int>> matrix =
    {
        { 3, 7, 0, 9, 8 },
        { 5, 3, 7, 0, 9 },
        { 6, 5, 3, 7, 0 },
        { 4, 6, 5, 3, 7 }
    };

    if (isToeplitz(matrix)) {
        cout << "Toeplitz matrix.";
    }
    else {
        cout << "Not a Toeplitz matrix.";
    }

    return 0;
}
```

**Output:** Toeplitz matrix

##

```java
class Main
{
    // Function to determine if a given matrix is a Toeplitz or not
    public static boolean isToeplitz(int[][] matrix)
    {
        // base case
        if (matrix == null) {
            return true;
        }

        for (int i = 0; i < matrix.length - 1; i++)
        {
            for (int j = 0; j < matrix[0].length - 1; j++)
            {
                if (matrix[i][j] != matrix[i + 1][j + 1]) {
                    return false;
                }
            }
        }

        return true;
    }

    public static void main(String[] args)
    {
        int[][] matrix =
        {
            { 3, 7, 0, 9, 8 },
            { 5, 3, 7, 0, 9 },
            { 6, 5, 3, 7, 0 },
            { 4, 6, 5, 3, 7 }
        };

        if (isToeplitz(matrix)) {
            System.out.print("Toeplitz matrix");
        }
        else {
            System.out.print("Not a Toeplitz matrix");
        }
    }
}
```

##

```python3
#Function to determine if a given matrix is a Toeplitz or not
def isToeplitz(matrix):

    # base case
    if not matrix:
        return True

    for i in range(len(matrix) - 1):
        for j in range(len(matrix[0]) - 1):
            if matrix[i][j] != matrix[i + 1][j + 1]:
                return False

    return True

if __name__ == '__main__':

    matrix = [
        [3, 7, 0, 9, 8],
        [5, 3, 7, 0, 9],
        [6, 5, 3, 7, 0],
        [4, 6, 5, 3, 7]
    ]

    if isToeplitz(matrix):
        print("Toeplitz matrix")
    else:
        print("Not a Toeplitz matrix")
```

The time complexity of the proposed solution is O(N2) for an `N × N` matrix and doesn’t require any extra space.

**References:** <https://en.wikipedia.org/wiki/Toeplitz_matrix>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.69/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
