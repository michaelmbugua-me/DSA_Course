# Magnet Puzzle

> Source: https://www.techiedelight.com/magnet-puzzle/

We are given a set of bipolar magnets, each domino-shaped. The objective is to place magnets on an `M × N` board, which satisfies a set of conditions where both `M` and `N` are not odd.

For instance, the following problem has the solution on its right:

Each `2 × 1` or `1 × 2` grid in the board can contain a magnet or empty. The blank entry will be indicated by `X's`, and the magnet will be represented by `+` and `-` (For the positive and negative end, respectively). The digits along the board’s left and top sides represent the count of `+` squares in corresponding rows or columns. Similarly, those along the right and bottom show the total number of `-` signs in particular rows or columns. Rows and columns for which no number is mentioned can have any number of `+` or `-` signs. The puzzle solution must also satisfy the constraint that no two adjacent squares can have the same sign. But diagonally joined squares can have the same sign.

**Examples:** _Here,`top[]`, `bottom[]`, `left[]`, `right[]` arrays indicates the count of `+` or `-` along the top (+), bottom (-), left (+), and right (-) edges, respectively. The value of -1 indicate any number of `+` or `-` signs._

The `rules[][]` matrix can contain any `T`, `B`, `L`, or `R` character. `T` indicates its top end for a vertical slot in the board, and `B` indicates the bottom end. `L` indicates the left end, and `R` indicates the right end for a horizontal slot in the board.

**Input:** top[] = [1, -1, -1, 2, 1, -1] bottom[] = [2, -1, -1, 2, -1, 3] left[] = [2, 3, -1, -1, -1] right[] = [-1, -1, -1, 1, -1] Rules[][] = [L R L R T T] [L R L R B B] [T T T T L R] [B B B B T T] [L R L R B B] **Output:** \+ – + – X – – + – + X + X X + – + – X X – + X + – + X X X – **Input:** top[] = [2, -1, -1] bottom[] = [-1, -1, 2] left[] = [-1, -1, 2, -1] right[] = [0, -1, -1, -1] Rules[][] = [T T T] [B B B] [T L R] [B L R] **Output:** \+ X + – X – \+ – + – + –

> 

The idea is to use [backtracking](https://techiedelight.com/backtracking-interview-questions/). We start from the first cell of the rules matrix and check for every horizontal and vertical slot. If the horizontal or vertical slot contains `L` and `R` or `T` and `B`, respectively, put `('+', '-')` or `('-', '+')` accordingly in the slot and recursively checks if they lead to the solution or not. If the solution is found with the required configuration, print the solution matrix; if none of the above solutions work, return false from the function.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
using namespace std;

// `M × N` matrix
#define M 5
#define N 6

// Utility function to print solution
void printSolution(char board[M][N])
{
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++) {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
}

// Utility function to count the total number of characters `ch` in current column `j`
int countInColumns(char board[N][N], char ch, int j)
{
    int count = 0;
    for (int i = 0; i < M; i++)
    {
        if (board[i][j] == ch) {
            count++;
        }
    }

    return count;
}

// Utility function to count the total number of characters `ch` in current row `i`
int countInRow(char board[N][N], char ch, int i)
{
    int count = 0;
    for (int j = 0; j < N; j++)
    {
        if (board[i][j] == ch) {
            count++;
        }
    }

    return count;
}

// Function to check if it is safe to put `ch` at `board[row][col]`
bool isSafe(char board[N][N], int row, int col, char ch, int top[],
            int left[], int bottom[], int right[])
{
    // check for adjacent cells
    if ((row - 1 >= 0 && board[row - 1][col] == ch) ||
            (col + 1 < N && board[row][col + 1] == ch) ||
            (row + 1 < M && board[row + 1][col] == ch) ||
            (col - 1 >= 0 && board[row][col - 1] == ch)) {
        return false;
    }

    // count character `ch` in the current row
    int rowCount = countInRow(board, ch, row);

    // count character `ch` in the current column
    int colCount = countInColumns(board, ch, col);

    // if the given character is `+`, check `top[]` and `left[]`
    if (ch == '+')
    {
        // check top
        if (top[col] != -1 && colCount >= top[col]) {
            return false;
        }

        // check left
        if (left[row] != -1 && rowCount >= left[row]) {
            return false;
        }
    }

    // if the given character is `-`, check `bottom[]` and `right[]`
    if (ch == '-')
    {
        // check bottom
        if (bottom[col] != -1 && colCount >= bottom[col]) {
            return false;
        }

        // check left
        if (right[row] != -1 && rowCount >= right[row]) {
            return false;
        }
    }

    return true;
}

// Function to validate the configuration of an output board
bool validateConfiguration(char board[N][N], int top[], int left[],
                        int bottom[], int right[])
{
    // check top
    for (int i = 0; i < N; i++)
    {
        if (top[i] != -1 && countInColumns(board, '+', i) != top[i]) {
            return false;
        }
    }

    // check left
    for (int j = 0; j < M; j++)
    {
        if (left[j] != -1 && countInRow(board, '+', j) != left[j]) {
            return false;
        }
    }

    // check bottom
    for (int i = 0; i < N; i++)
    {
        if (bottom[i] != -1 && countInColumns(board, '-', i) != bottom[i]) {
            return false;
        }
    }

    // check right
    for (int j = 0; j < M; j++)
    {
        if (right[j] != -1 && countInRow(board, '-', j) != right[j]) {
            return false;
        }
    }

    return true;
}

// The main function to solve the Bipolar Magnets puzzle
bool solveMagnetPuzzle(char board[N][N], int row, int col, int top[],
                int left[], int bottom[], int right[], char rules[M][N])
{
    // if the last cell is reached
    if (row >= M - 1 && col >= N - 1)
    {
        if (validateConfiguration(board, top, left, bottom, right)) {
            return true;
        }

        return false;
    }

    // if the last column of the current row is already processed,
    // go to the next row, the first column
    if (col >= N)
    {
        col = 0;
        row = row + 1;
    }

    // if the current cell contains `R` or `B` (end of horizontal
    // or vertical slot), recur for the next cell
    if (rules[row][col] == 'R' || rules[row][col] == 'B')
    {
        if (solveMagnetPuzzle(board, row, col + 1, top,
                                left, bottom, right, rules)) {
            return true;
        }
    }

    // if horizontal slot contains `L` and `R`
    if (rules[row][col] == 'L' && rules[row][col + 1] == 'R')
    {
        // put (`+`, `-`) pair and recur
        if (isSafe(board, row, col, '+', top, left, bottom, right) &&
            isSafe(board, row, col + 1, '-', top, left, bottom, right))
        {
            board[row][col] = '+';
            board[row][col + 1] = '-';

            if (solveMagnetPuzzle(board, row, col + 2,
                            top, left, bottom, right, rules)) {
                return true;
            }

            // if it doesn't lead to a solution, backtrack
            board[row][col] = 'X';
            board[row][col + 1] = 'X';
        }

        // put (`-`, `+`) pair and recur
        if (isSafe(board, row, col, '-', top, left, bottom, right) &&
            isSafe(board, row, col + 1, '+', top, left, bottom, right))
        {
            board[row][col] = '-';
            board[row][col + 1] = '+';

            if (solveMagnetPuzzle(board, row, col + 2,
                            top, left, bottom, right, rules)) {
                return true;
            }

            // if it doesn't lead to a solution, backtrack
            board[row][col] = 'X';
            board[row][col + 1] = 'X';
        }
    }

    // if vertical slot contains `T` and `B`
    if (rules[row][col] == 'T' && rules[row + 1][col] == 'B')
    {
        // put (`+`, `-`) pair and recur
        if (isSafe(board, row, col, '+', top, left, bottom, right) &&
            isSafe(board, row + 1, col, '-', top, left, bottom, right))
        {
            board[row][col] = '+';
            board[row + 1][col] = '-';

            if (solveMagnetPuzzle(board, row, col + 1,
                            top, left, bottom, right, rules)) {
                return true;
            }

            // if it doesn't lead to a solution, backtrack
            board[row][col] = 'X';
            board[row + 1][col] = 'X';
        }

        // put (`-`, `+`) pair and recur
        if (isSafe(board, row, col, '-', top, left, bottom, right) &&
            isSafe(board, row + 1, col, '+', top, left, bottom, right))
        {
            board[row][col] = '-';
            board[row + 1][col] = '+';

            if (solveMagnetPuzzle(board, row, col + 1,
                            top, left, bottom, right, rules)) {
                return true;
            }

            // if it doesn't lead to a solution, backtrack
            board[row][col] = 'X';
            board[row + 1][col] = 'X';
        }
    }

    // ignore the current cell and recur
    if (solveMagnetPuzzle(board, row, col + 1,
                        top, left, bottom, right, rules)) {
        return true;
    }

    // if no solution is possible, return false
    return false;
}

void solveMagnetPuzzle(int top[], int left[], int bottom[],
                        int right[], char rules[M][N])
{
    // to store the result
    char board[M][N];

    // initialize all cells by `X`
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++) {
            board[i][j] = 'X';
        }
    }

    // start from `(0, 0)` cell
    if (!solveMagnetPuzzle(board, 0, 0, top, left, bottom, right, rules))
    {
        cout << "Solution does not exist";
        return;
    }

    // print result if the given configuration is solvable
    printSolution(board);
}

int main()
{
    // indicates the count of `+` or `-` along the top (+), bottom (-),
    // left (+), and right (-) edges, respectively.
    // Value of -1 indicate any number of `+` or `-` signs
    int top[N] = { 1, -1, -1, 2, 1, -1 };
    int bottom[N] = { 2, -1, -1, 2, -1, 3 };
    int left[M] = { 2, 3, -1, -1, -1 };
    int right[M] = { -1, -1, -1, 1, -1 };

    // rules matrix
    char rules[M][N] =
    {
        { 'L', 'R', 'L', 'R', 'T', 'T' },
        { 'L', 'R', 'L', 'R', 'B', 'B' },
        { 'T', 'T', 'T', 'T', 'L', 'R' },
        { 'B', 'B', 'B', 'B', 'T', 'T' },
        { 'L', 'R', 'L', 'R', 'B', 'B' }
    };

    solveMagnetPuzzle(top, left, bottom, right, rules);

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // `M × N` matrix
    private static final int M = 5;
    private static final int N = 6;

    // Utility function to print solution
    private static void printSolution(char[][] board) {
        for (var r: board) {
            System.out.println(Arrays.toString(r));
        }
    }

    // Utility function to count the total number of characters `ch` in
    // current column `j`
    private static int countInColumns(char[][] board, char ch, int j)
    {
        int count = 0;
        for (int i = 0; i < M; i++) {
            if (board[i][j] == ch) {
                count++;
            }
        }
        return count;
    }

    // Utility function to count the total number of characters `ch` in
    // current row `i`
    private static int countInRow(char[][] board, char ch, int i)
    {
        int count = 0;
        for (int j = 0; j < N; j++) {
            if (board[i][j] == ch) {
                count++;
            }
        }
        return count;
    }

    // Function to check if it is safe to put `ch` at `board[row][col]`
    private static boolean isSafe(char[][] board, int row, int col, char ch,
                            int[] top, int[] left, int[] bottom, int[] right)
    {
        // check for adjacent cells
        if ((row - 1 >= 0 && board[row - 1][col] == ch) ||
                (col + 1 < N && board[row][col + 1] == ch) ||
                (row + 1 < M && board[row + 1][col] == ch) ||
                (col - 1 >= 0 && board[row][col - 1] == ch)) {
            return false;
        }

        // count character `ch` in the current row
        int rowCount = countInRow(board, ch, row);

        // count character `ch` in the current column
        int colCount = countInColumns(board, ch, col);

        // if the given character is `+`, check `top[]` and `left[]`
        if (ch == '+')
        {
            // check top
            if (top[col] != -1 && colCount >= top[col]) {
                return false;
            }

            // check left
            if (left[row] != -1 && rowCount >= left[row]) {
                return false;
            }
        }

        // if the given character is `-`, check `bottom[]` and `right[]`
        if (ch == '-')
        {
            // check bottom
            if (bottom[col] != -1 && colCount >= bottom[col]) {
                return false;
            }

            // check left
            if (right[row] != -1 && rowCount >= right[row]) {
                return false;
            }
        }

        return true;
    }

    // Function to validate the configuration of an output board
    private static boolean validateConfiguration(char[][] board, int[] top, int[] left,
                                            int[] bottom, int[] right)
    {
        // check top
        for (int i = 0; i < N; i++)
        {
            if (top[i] != -1 && countInColumns(board, '+', i) != top[i]) {
                return false;
            }
        }

        // check left
        for (int j = 0; j < M; j++)
        {
            if (left[j] != -1 && countInRow(board, '+', j) != left[j]) {
                return false;
            }
        }

        // check bottom
        for (int i = 0; i < N; i++)
        {
            if (bottom[i] != -1 && countInColumns(board, '-', i) != bottom[i]) {
                return false;
            }
        }

        // check right
        for (int j = 0; j < M; j++)
        {
            if (right[j] != -1 && countInRow(board, '-', j) != right[j]) {
                return false;
            }
        }

        return true;
    }

    // The main function to solve the Bipolar Magnets puzzle
    private static boolean solveMagnetPuzzle(char[][] board, int row, int col,
                                            int[] top, int[] left, int[] bottom,
                                            int[] right, char[][] rules)
    {
        // if the last cell is reached
        if (row >= M - 1 && col >= N - 1) {
            return validateConfiguration(board, top, left, bottom, right);
        }

        // if the last column of the current row is already processed,
        // go to the next row, the first column
        if (col >= N)
        {
            col = 0;
            row = row + 1;
        }

        // if the current cell contains `R` or `B` (end of horizontal
        // or vertical slot), recur for the next cell
        if (rules[row][col] == 'R' || rules[row][col] == 'B')
        {
            if (solveMagnetPuzzle(board, row, col + 1, top,
                    left, bottom, right, rules)) {
                return true;
            }
        }

        // if horizontal slot contains `L` and `R`
        if (rules[row][col] == 'L' && rules[row][col + 1] == 'R')
        {
            // put (`+`, `-`) pair and recur
            if (isSafe(board, row, col, '+', top, left, bottom, right) &&
                    isSafe(board, row, col + 1, '-', top, left, bottom, right))
            {
                board[row][col] = '+';
                board[row][col + 1] = '-';

                if (solveMagnetPuzzle(board, row, col + 2,
                        top, left, bottom, right, rules)) {
                    return true;
                }

                // if it doesn't lead to a solution, backtrack
                board[row][col] = 'X';
                board[row][col + 1] = 'X';
            }

            // put (`-`, `+`) pair and recur
            if (isSafe(board, row, col, '-', top, left, bottom, right) &&
                    isSafe(board, row, col + 1, '+', top, left, bottom, right))
            {
                board[row][col] = '-';
                board[row][col + 1] = '+';

                if (solveMagnetPuzzle(board, row, col + 2,
                        top, left, bottom, right, rules)) {
                    return true;
                }

                // if it doesn't lead to a solution, backtrack
                board[row][col] = 'X';
                board[row][col + 1] = 'X';
            }
        }

        // if vertical slot contains `T` and `B`
        if (rules[row][col] == 'T' && rules[row + 1][col] == 'B')
        {
            // put (`+`, `-`) pair and recur
            if (isSafe(board, row, col, '+', top, left, bottom, right) &&
                    isSafe(board, row + 1, col, '-', top, left, bottom, right))
            {
                board[row][col] = '+';
                board[row + 1][col] = '-';

                if (solveMagnetPuzzle(board, row, col + 1,
                        top, left, bottom, right, rules)) {
                    return true;
                }

                // if it doesn't lead to a solution, backtrack
                board[row][col] = 'X';
                board[row + 1][col] = 'X';
            }

            // put (`-`, `+`) pair and recur
            if (isSafe(board, row, col, '-', top, left, bottom, right) &&
                    isSafe(board, row + 1, col, '+', top, left, bottom, right))
            {
                board[row][col] = '-';
                board[row + 1][col] = '+';

                if (solveMagnetPuzzle(board, row, col + 1,
                        top, left, bottom, right, rules)) {
                    return true;
                }

                // if it doesn't lead to a solution, backtrack
                board[row][col] = 'X';
                board[row + 1][col] = 'X';
            }
        }

        // ignore the current cell and recur
        if (solveMagnetPuzzle(board, row, col + 1,
                top, left, bottom, right, rules)) {
            return true;
        }

        // if no solution is possible, return false
        return false;
    }

    public static void solveMagnetPuzzle(int[] top, int[] left, int[] bottom,
                                        int[] right, char[][] rules)
    {
        // to store the result
        char[][] board = new char[M][N];

        // initialize all cells by `X`
        for (int i = 0; i < M; i++) {
            Arrays.fill(board[i], 'X');
        }

        // start from `(0, 0)` cell
        if (!solveMagnetPuzzle(board, 0, 0, top, left, bottom, right, rules))
        {
            System.out.println("Solution does not exist");
            return;
        }

        // print result if the given configuration is solvable
        printSolution(board);
    }

    public static void main(String[] args)
    {
        // indicates the count of `+` or `-` along the top (+), bottom (-),
        // left (+), and right (-) edges, respectively.
        // value of -1 indicate any number of `+` or `-` signs
        final int[] top = { 1, -1, -1, 2, 1, -1 };
        final int[] bottom = { 2, -1, -1, 2, -1, 3 };
        final int[] left = { 2, 3, -1, -1, -1 };
        final int[] right = { -1, -1, -1, 1, -1 };

        // rules matrix
        char[][] rules =
        {
            { 'L', 'R', 'L', 'R', 'T', 'T' },
            { 'L', 'R', 'L', 'R', 'B', 'B' },
            { 'T', 'T', 'T', 'T', 'L', 'R' },
            { 'B', 'B', 'B', 'B', 'T', 'T' },
            { 'L', 'R', 'L', 'R', 'B', 'B' }
        };

        solveMagnetPuzzle(top, left, bottom, right, rules);
    }
}
```

##

```python3
# Utility function to print solution
def printSolution(board):
    for i in range(M):
        for j in range(N):
            print(board[i][j], end=' ')
        print()

# Utility function to count the total number of characters `ch` in current column `j`
def countInColumns(board, ch, j):
    count = 0
    for i in range(M):
        if board[i][j] == ch:
            count = count + 1
    return count

# Utility function to count the total number of characters `ch` in current row `i`
def countInRow(board, ch, i):
    count = 0
    for j in range(N):
        if board[i][j] == ch:
            count = count + 1
    return count

# Function to check if it is safe to put `ch` at `board[row][col]`
def isSafe(board, row, col, ch, top, left, bottom, right):

    # check for adjacent cells
    if ((row - 1 >= 0 and board[row - 1][col] == ch) or
            (col + 1 < N and board[row][col + 1] == ch) or
            (row + 1 < M and board[row + 1][col] == ch) or
            (col - 1 >= 0 and board[row][col - 1] == ch)):
        return False

    # count character `ch` in the current row
    rowCount = countInRow(board, ch, row)

    # count character `ch` in the current column
    colCount = countInColumns(board, ch, col)

    # if the given character is `+`, check `top[]` and `left[]`
    if ch == '+':

        # check top
        if top[col] != -1 and colCount >= top[col]:
            return False

        # check left
        if left[row] != -1 and rowCount >= left[row]:
            return False

    # if the given character is `-`, check `bottom[]` and `right[]`
    if ch == '-':

        # check bottom
        if bottom[col] != -1 and colCount >= bottom[col]:
            return False

        # check left
        if right[row] != -1 and rowCount >= right[row]:
            return False

    return True

# Function to validate the configuration of an output board
def validateConfiguration(board, top, left, bottom, right):

    # check top
    for i in range(N):
        if top[i] != -1 and countInColumns(board, '+', i) != top[i]:
            return False

    # check left
    for j in range(M):
        if left[j] != -1 and countInRow(board, '+', j) != left[j]:
            return False

    # check bottom
    for i in range(N):
        if bottom[i] != -1 and countInColumns(board, '-', i) != bottom[i]:
            return False

    # check right
    for j in range(M):
        if right[j] != -1 and countInRow(board, '-', j) != right[j]:
            return False

    return True

# The main function to solve the Bipolar Magnets puzzle
def solveMagnetPuzzle(board, row, col, top, left, bottom, right, rules):

    # if the last cell is reached
    if row >= M - 1 and col >= N - 1:
        return validateConfiguration(board, top, left, bottom, right)

    # if the last column of the current row is already processed,
    # go to the next row, the first column
    if col >= N:
        col = 0
        row = row + 1

    # if the current cell contains `R` or `B` (end of horizontal
    # or vertical slot), recur for the next cell
    if rules[row][col] == 'R' or rules[row][col] == 'B':

        if solveMagnetPuzzle(board, row, col + 1, top, left, bottom, right, rules):
            return True

    # if the horizontal slot contains `L` and `R`
    if rules[row][col] == 'L' and rules[row][col + 1] == 'R':

        # put (`+`, `-`) pair and recur
        if (isSafe(board, row, col, '+', top, left, bottom, right) and
                isSafe(board, row, col + 1, '-', top, left, bottom, right)):
            board[row][col] = '+'
            board[row][col + 1] = '-'

            if solveMagnetPuzzle(board, row, col + 2, top, left, bottom, right, rules):
                return True

            # if it doesn't lead to a solution, backtrack
            board[row][col] = 'X'
            board[row][col + 1] = 'X'

        # put (`-`, `+`) pair and recur
        if (isSafe(board, row, col, '-', top, left, bottom, right) and
                isSafe(board, row, col + 1, '+', top, left, bottom, right)):
            board[row][col] = '-'
            board[row][col + 1] = '+'

            if solveMagnetPuzzle(board, row, col + 2, top, left, bottom, right, rules):
                return True

            # if it doesn't lead to a solution, backtrack
            board[row][col] = 'X'
            board[row][col + 1] = 'X'

    # if the vertical slot contains `T` and `B`
    if rules[row][col] == 'T' and rules[row + 1][col] == 'B':

        # put (`+`, `-`) pair and recur
        if (isSafe(board, row, col, '+', top, left, bottom, right) and
                isSafe(board, row + 1, col, '-', top, left, bottom, right)):
            board[row][col] = '+'
            board[row + 1][col] = '-'

            if solveMagnetPuzzle(board, row, col + 1, top, left, bottom, right, rules):
                return True

            # if it doesn't lead to a solution, backtrack
            board[row][col] = 'X'
            board[row + 1][col] = 'X'

        # put (`-`, `+`) pair and recur
        if (isSafe(board, row, col, '-', top, left, bottom, right) and
                isSafe(board, row + 1, col, '+', top, left, bottom, right)):
            board[row][col] = '-'
            board[row + 1][col] = '+'

            if solveMagnetPuzzle(board, row, col + 1, top, left, bottom, right, rules):
                return True

            # if it doesn't lead to a solution, backtrack
            board[row][col] = 'X'
            board[row + 1][col] = 'X'

    # ignore the current cell and recur
    if solveMagnetPuzzle(board, row, col + 1, top, left, bottom, right, rules):
        return True

    # if no solution is possible, return false
    return False

def magnetPuzzle(top, left, bottom, right, rules):

    # to store the result
    # initialize all cells by `X`
    board = [['X' for x in range(N)] for y in range(M)]

    # start from `(0, 0)` cell
    if not solveMagnetPuzzle(board, 0, 0, top, left, bottom, right, rules):
        print("Solution does not exist")
        return

    # print result if the given configuration is solvable
    printSolution(board)

if __name__ == '__main__':

    # indicates the count of `+` or `-` along the top (+), bottom (-),
    # left (+), and right (-) edges, respectively.
    # value of -1 indicate any number of `+` or `-` signs
    top = [1, -1, -1, 2, 1, -1]
    bottom = [2, -1, -1, 2, -1, 3]
    left = [2, 3, -1, -1, -1]
    right = [-1, -1, -1, 1, -1]

    # rules matrix
    rules = [
        ['L', 'R', 'L', 'R', 'T', 'T'],
        ['L', 'R', 'L', 'R', 'B', 'B'],
        ['T', 'T', 'T', 'T', 'L', 'R'],
        ['B', 'B', 'B', 'B', 'T', 'T'],
        ['L', 'R', 'L', 'R', 'B', 'B']
    ]

    # `M × N` matrix
    (M, N) = (len(rules), len(rules[0]))

    magnetPuzzle(top, left, bottom, right, rules)
```

**Output:** \+ – + – X – – + – + X + X X + – + – X X – + X + – + X X X –

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

This question is taken from – <https://people.eecs.berkeley.edu/~hilfingr/programming-contest/f2012-contest.pdf>

Also See:

> [Generate a list of possible words from a character matrix](https://www.techiedelight.com/generate-list-of-possible-words-from-a-character-matrix/ "Generate a list of possible words from a character matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 179

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
