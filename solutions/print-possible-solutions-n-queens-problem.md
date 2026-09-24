# Print all possible solutions to N–Queens problem

> Source: https://www.techiedelight.com/print-possible-solutions-n-queens-problem/

The N–queens puzzle is the problem of placing `N` chess queens on an `N × N` chessboard so that no two queens threaten each other. Thus, the solution requires that no two queens share the same row, column, or diagonal.

For example, for a standard `8 × 8` chessboard, below is one such configuration:

Q – – – – – – – – – – – Q – – – – – – – – – – Q – – – – – Q – – – – Q – – – – – – – – – – – Q – – Q – – – – – – – – – Q – – – –

Note that the solution exists for all natural numbers `n`, except for `n = 2` and `n = 3`.

> 

We can solve this problem with the help of [backtracking](https://techiedelight.com/backtracking-interview-questions/). The idea is to start from the first row and place Queen in each square of the first row and recursively explore the remaining rows to check if they lead to the solution or not. If the current configuration doesn’t result in a solution, backtrack. Before exploring any square, ignore the square if two queens threaten each other.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <string.h>

// `N × N` chessboard
#define N 8

// Function to check if two queens threaten each other or not
int isSafe(char mat[][N], int r, int c)
{
    // return 0 if two queens share the same column
    for (int i = 0; i < r; i++)
    {
        if (mat[i][c] == 'Q') {
            return 0;
        }
    }

    // return 0 if two queens share the same `` diagonal
    for (int i = r, j = c; i >= 0 && j >= 0; i--, j--)
    {
        if (mat[i][j] == 'Q') {
            return 0;
        }
    }

    // return 0 if two queens share the same `/` diagonal
    for (int i = r, j = c; i >= 0 && j < N; i--, j++)
    {
        if (mat[i][j] == 'Q') {
            return 0;
        }
    }

    return 1;
}

void printSolution(char mat[][N])
{
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++) {
            printf("%c ", mat[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

void nQueen(char mat[][N], int r)
{
    // if `N` queens are placed successfully, print the solution
    if (r == N)
    {
        printSolution(mat);
        return;
    }

    // place queen at every square in the current row `r`
    // and recur for each valid movement
    for (int i = 0; i < N; i++)
    {
        // if no two queens threaten each other
        if (isSafe(mat, r, i))
        {
            // place queen on the current square
            mat[r][i] = 'Q';

            // recur for the next row
            nQueen(mat, r + 1);

            // backtrack and remove the queen from the current square
            mat[r][i] = '-';
        }
    }
}

int main()
{
    // `mat[][]` keeps track of the position of queens in the current configuration
    char mat[N][N];

    // initialize `mat[][]` by `-`
    memset(mat, '-', sizeof mat);

    nQueen(mat, 0);

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // Function to check if two queens threaten each other or not
    private static boolean isSafe(char[][] mat, int r, int c)
    {
        // return false if two queens share the same column
        for (int i = 0; i < r; i++)
        {
            if (mat[i][c] == 'Q') {
                return false;
            }
        }

        // return false if two queens share the same `` diagonal
        for (int i = r, j = c; i >= 0 && j >= 0; i--, j--)
        {
            if (mat[i][j] == 'Q') {
                return false;
            }
        }

        // return false if two queens share the same `/` diagonal
        for (int i = r, j = c; i >= 0 && j < mat.length; i--, j++)
        {
            if (mat[i][j] == 'Q') {
                return false;
            }
        }

        return true;
    }

    private static void printSolution(char[][] mat)
    {
        for (char[] chars: mat) {
            System.out.println(Arrays.toString(chars).replaceAll(",", ""));
        }
        System.out.println();
    }

    private static void nQueen(char[][] mat, int r)
    {
        // if `N` queens are placed successfully, print the solution
        if (r == mat.length)
        {
            printSolution(mat);
            return;
        }

        // place queen at every square in the current row `r`
        // and recur for each valid movement
        for (int i = 0; i < mat.length; i++)
        {
            // if no two queens threaten each other
            if (isSafe(mat, r, i))
            {
                // place queen on the current square
                mat[r][i] = 'Q';

                // recur for the next row
                nQueen(mat, r + 1);

                // backtrack and remove the queen from the current square
                mat[r][i] = '–';
            }
        }
    }

    public static void main(String[] args)
    {
        // `N × N` chessboard
        int N = 8;

        // `mat[][]` keeps track of the position of queens in
        // the current configuration
        char[][] mat = new char[N][N];

        // initialize `mat[][]` by `-`
        for (int i = 0; i < N; i++) {
            Arrays.fill(mat[i], '–');
        }

        nQueen(mat, 0);
    }
}
```

##

```python3
# Function to check if two queens threaten each other or not
def isSafe(mat, r, c):

    # return false if two queens share the same column
    for i in range(r):
        if mat[i][c] == 'Q':
            return False

    # return false if two queens share the same `` diagonal
    (i, j) = (r, c)
    while i >= 0 and j >= 0:
        if mat[i][j] == 'Q':
            return False
        i = i - 1
        j = j - 1

    # return false if two queens share the same `/` diagonal
    (i, j) = (r, c)
    while i >= 0 and j < len(mat):
        if mat[i][j] == 'Q':
            return False
        i = i - 1
        j = j + 1

    return True

def printSolution(mat):
    for r in mat:
        print(str(r).replace(',', '').replace('\'', ''))
    print()

def nQueen(mat, r):

    # if `N` queens are placed successfully, print the solution
    if r == len(mat):
        printSolution(mat)
        return

    # place queen at every square in the current row `r`
    # and recur for each valid movement
    for i in range(len(mat)):

        # if no two queens threaten each other
        if isSafe(mat, r, i):
            # place queen on the current square
            mat[r][i] = 'Q'

            # recur for the next row
            nQueen(mat, r + 1)

            # backtrack and remove the queen from the current square
            mat[r][i] = '–'

if __name__ == '__main__':

    # `N × N` chessboard
    N = 8

    # `mat[][]` keeps track of the position of queens in
    # the current configuration
    mat = [['–' for x in range(N)] for y in range(N)]

    nQueen(mat, 0)
```

**Output:** Q – – – – – – – – – – – Q – – – – – – – – – – Q – – – – – Q – – – – Q – – – – – – – – – – – Q – – Q – – – – – – – – – Q – – – – Q – – – – – – – – – – – – Q – – – – – – – – – Q – – Q – – – – – – – – – – – Q – – – – Q – – – – – Q – – – – – – – – – – Q – – – And 90 other distinct solutions to the eight queens problem.

The time complexity of the above backtracking solution is exponential.

**Optimizations:** The time complexity of the above backtracking algorithm can be improved using Branch and Bound. In a backtracking solution, we backtrack on hitting a dead end, but in branch and bound, after building a partial solution, we figure out that there is no point going any deeper as we are going to hit a dead end.

**References:**

1\. <https://en.wikipedia.org/wiki/Eight_queens_puzzle> 2\. <https://developers.google.com/optimization/cp/queens>

Also See:

> [Magnet Puzzle](https://www.techiedelight.com/magnet-puzzle/ "Magnet Puzzle")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 223

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
