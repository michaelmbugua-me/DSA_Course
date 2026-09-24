# Count total possible combinations of n-digit numbers in a mobile keypad

> Source: https://www.techiedelight.com/count-total-possible-combinations-n-digit-numbers-mobile-keypad/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a positive number `n` and a mobile keypad having digits from 0 to 9 associated with each key, count the total possible combinations of digits having length `n`. We can start with any digit and press only four adjacent keys of any digit. The keypad also contains `*` and `#` keys, which we are not allowed to press.

For example,

**Input:** n = 2 **Output:** 36 **Explanation:** Total possible combinations are 36 [00, 08, 11, 12, 14, 21, 22, 23, 25, 32, 33, 36, 41, 44, 45, 47, … ,96, 98, 99]

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem since the problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). The problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial.

The idea is to consider each digit one by one and count all n–digit numbers starting from the current digit. For each digit `i`, recur for digit `i`, and all digits reachable from `i`. To easily find all digits reachable from any digit, use a [multimap](https://techiedelight.com/implement-multimap-java/) that stores the mapping of digits reachable from every digit. When the digit becomes n–digit, update the count.

The above solution exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). As shown below, the same subproblems (highlighted in the same color) are getting computed repeatedly.

**n–digit number starting from 1 =** 1 + (n-1) digit number starting from 1 2 + (n-1) digit number starting from 2 4 + (n-1) digit number starting from 4 **n–digit number starting from 2 =** 1 + (n-1) digit number starting from 1 2 + (n-1) digit number starting from 2 3 + (n-1) digit number starting from 3 5 + (n-1) digit number starting from 5 **n–digit number starting from 5 =** 2 + (n-1) digit number starting from 2 4 + (n-1) digit number starting from 4 5 + (n-1) digit number starting from 5 6 + (n-1) digit number starting from 6 8 + (n-1) digit number starting from 8

We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, where subproblem solutions are _memo_ ized rather than computed repeatedly. The top-down _memo_ ized approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <map>
using namespace std;

// The function returns false if `(i, j)` is not a valid position
int isValid(int i, int j)
{
    // for handling `*` or `#` (present in 4th row and 1st & 3rd column)
    if (i == 3 && (j == 0 || j == 2)) {
        return 0;
    }

    return (i >= 0 && i <= 3 && j >= 0 && j <= 2);
}

// Function to fill a multimap that stores the mapping of cells
// reachable from the current cell
multimap<int, int> fillMap(vector<vector<char>> const &keypad)
{
    // use a multimap to store the mapping of cells reachable
    // from the current cell
    multimap<int, int> mapping;

    // Below arrays detail all four possible movements from the current cell
    int row[] = { 0, -1, 0, 1 };
    int col[] = { -1, 0, 1, 0 };

    // do for each row
    for (int i = 0; i < 4; i++)
    {
        // do for each column of row `i`
        for (int j = 0; j < 3; j++)
        {
            // move in all four possible directions of current
            // digit `keypad[i][j]`
            for (int k = 0; k < 4; k++)
            {
                int r = i + row[k];
                int c = j + col[k];

                // insert the adjacent cell into the multimap if valid
                if (isValid(i, j) && isValid(r, c)) {
                    mapping.insert(make_pair(keypad[i][j] - '0', keypad[r][c] - '0'));
                }
            }
        }
    }

    return mapping;
}

// Function to count all numbers starting from digit `i` and
// having length `n`
int getCount(multimap<int, int> mapping, int i, int n, auto &lookup)
{
    if (n == 1) {    // reached end of the digit
        return 1;
    }

    // if the subproblem is seen for the first time, solve it and
    // store its result in an array
    if (lookup[i][n] == 0)
    {
        // recur for digit `i`
        lookup[i][n] = getCount(mapping, i, n - 1, lookup);

        // recur for all digits reachable from `i`
        for (auto it = mapping.find(i);
                (it != mapping.end() && it->first == i); it++) {
            lookup[i][n] += getCount(mapping, it->second, n - 1, lookup);
        }
    }

    // return the subproblem solution
    return lookup[i][n];
}

int findCount(int n, vector<vector<char>> const &keypad)
{
    // get the mapping of cells reachable from the current cell
    multimap<int, int> mapping = fillMap(keypad);

    // create a lookup table to store solutions to subproblems
    // `lookup[i][j]` stores count of all numbers starting from digit `i`
    // having length `n`
    vector<vector<int>> lookup(10, vector<int>(n + 1));

    int count = 0;

    // get the count of each digit
    for (int i = 0; i <= 9; i++) {
        count += getCount(mapping, i, n, lookup);
    }

    return count;
}

int main()
{
    // n-digit
    int n = 2;

    // mobile mapping
    vector<vector<char>> keypad =
    {
        { '1', '2', '3' },
        { '4', '5', '6' },
        { '7', '8', '9' },
        { '*', '0', '#' }
    };

    cout << "Total possible combinations are " << findCount(n, keypad);

    return 0;
}
```

**Output:** Total possible combinations are 36

##

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Main
{
    // The function returns false if `(i, j)` is not a valid position
    public static boolean isValid(int i, int j)
    {
        // for handling `*` or `#` (present in 4th row and 1st
        // & 3rd column)
        if (i == 3 && (j == 0 || j == 2)) {
            return false;
        }

        return (i >= 0 && i <= 3 && j >= 0 && j <= 2);
    }

    // Function to fill a multimap that stores the mapping of cells
    // reachable from the current cell
    public static Map<Integer, List<Integer>> fillMap(char[][] keypad)
    {
        // use a multimap to store the mapping of cells reachable
        // from the current cell
        Map<Integer, List<Integer>> mapping = new HashMap<>();

        // Below arrays detail all four possible movements from the current cell
        int[] row = { 0, -1, 0, 1 };
        int[] col = { -1, 0, 1, 0 };

        // do for each row
        for (int i = 0; i < 4; i++)
        {
            // do for each column of row `i`
            for (int j = 0; j < 3; j++)
            {
                // move in all four possible directions of current
                // digit `keypad[i][j]`
                for (int k = 0; k < 4; k++)
                {
                    int r = i + row[k];
                    int c = j + col[k];

                    // insert the adjacent cell into the multimap if valid
                    if (isValid(i, j) && isValid(r, c))
                    {
                        mapping.putIfAbsent(keypad[i][j] - '0', new ArrayList<>());
                        mapping.get(keypad[i][j] - '0').add(keypad[r][c] - '0');
                    }
                }
            }
        }

        return mapping;
    }

    // Function to count all numbers starting from digit `i` and
    // having length `n`
    public static int getCount(Map<Integer, List<Integer>> mapping,
                               int i, int n, int[][] lookup)
    {
        if (n == 1) {    // reached end of the digit
            return 1;
        }

        // if the subproblem is seen for the first time, solve it and
        // store its result in an array
        if (lookup[i][n] == 0)
        {
            // recur for digit `i`
            lookup[i][n] = getCount(mapping, i, n - 1, lookup);

            // recur for all digits reachable from `i`
            for (Integer e: mapping.get(i)) {
                lookup[i][n] += getCount(mapping, e, n - 1, lookup);
            }
        }

        // return the subproblem solution
        return lookup[i][n];
    }

    private static int findCount(int n, char[][] keypad)
    {
        // get the mapping of cells reachable from the current cell
        Map<Integer, List<Integer>> mapping = fillMap(keypad);

        // create a lookup table to store solutions to subproblems
        // `lookup[i][j]` stores count of all numbers starting from digit `i`
        // having length `n`
        int[][] lookup = new int[10][n+1];

        // get the count of each digit
        int count = 0;
        for (int i = 0; i <= 9; i++) {
            count += getCount(mapping, i, n, lookup);
        }

        return count;
    }

    public static void main(String[] args)
    {
        // n-digit
        int n = 2;

        // mobile mapping
        char[][] keypad =
        {
            { '1', '2', '3' },
            { '4', '5', '6' },
            { '7', '8', '9' },
            { '*', '0', '#' }
        };

        System.out.print("Total possible combinations are " + findCount(n, keypad));
    }
}
```

##

```python3
# The function returns false if `(i, j)` is not a valid position
def isValid(i, j):

    # for handling `*` or `#` (present in 4th row and 1st & 3rd column)
    if i == 3 and (j == 0 or j == 2):
        return False

    return 0 <= i <= 3 and 0 <= j <= 2

# Function to fill a dictionary that stores the mapping of cells
# reachable from the current cell
def fillDictionary(keypad):

    # use a map to store a mapping of cells reachable from the current cell
    mapping = {}

    # Below lists detail all four possible movements from the current cell
    row = [0, -1, 0, 1]
    col = [-1, 0, 1, 0]

    # do for each row
    for i in range(4):
        # do for each column of row i
        for j in range(3):
            # move in all four possible directions of current digit `keypad[i][j]`
            for k in range(4):
                r = i + row[k]
                c = j + col[k]
                # insert the adjacent cell into the dictionary if valid
                if isValid(i, j) and isValid(r, c):
                    k = ord(keypad[i][j]) - 48
                    v = ord(keypad[r][c]) - 48
                    mapping.setdefault(k, []).append(v)
    return mapping

# Function to count all numbers starting from digit `i` and
# having length `n`
def getCount(mapping, i, n, lookup):
    if n == 1:        # reached end of the digit
        return 1

    # if the subproblem is seen for the first time, solve it and
    # store its result in a list
    if lookup[i][n] == 0:

        # recur for digit i
        lookup[i][n] = getCount(mapping, i, n - 1, lookup)

        # recur for all digits reachable from i
        for e in mapping.get(i):
            lookup[i][n] += getCount(mapping, e, n - 1, lookup)

    # return the subproblem solution
    return lookup[i][n]

def findCounts(n, keypad):

    # get a mapping of cells reachable from the current cell
    mapping = fillDictionary(keypad)

    # create a lookup table to store solutions to subproblems `lookup[i][j]`
    # stores count of all numbers starting from digit `i` having length `n`
    lookup = [[0 for x in range(n + 1)] for y in range(10)]

    # get the count of each digit
    count = 0
    for i in range(10):
        count += getCount(mapping, i, n, lookup)

    return count

if __name__ == '__main__':

    # n–digit
    n = 2

    # mobile mapping
    keypad = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['*', '0', '#']
    ]

    print('Total possible combinations are', findCounts(n, keypad))
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the given length of digits.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Top-down](https://www.techiedelight.com/Tags/Memoization/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
