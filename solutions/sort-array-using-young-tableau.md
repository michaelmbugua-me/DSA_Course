# Sort an array using Young tableau

> Source: https://www.techiedelight.com/sort-array-using-young-tableau/

In this post, we will see how to sort `N2` numbers in increasing order using an `N × N` Young tableau in `O(N3)` time.

An `N × N` Young tableau is an `N × N` matrix such that entries of each row are sorted from left to right and the entries of each column are sorted from top to bottom. Some entries of a Young tableau may be infinity, which indicates an empty entry. Thus, a Young tableau can be used to hold `n <= N2` finite numbers.

Refer the following article on Young tableau as a prerequisite of this post:

> [Young Tableau | Insert, Search, Extract-Min, Delete, Replace](https://techiedelight.com/young-tableau-insert-search-extract-min-delete-replace/)

> 

To sort an array using Young tableau, insert each of its values into an empty Young tableau, one at a time. Afterward, repeatedly call the `Extract-Min` routine on the Young tableau until the tableau is empty and put the returned values back to the original array.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <cstring>
#include <climits>
#include <cmath>
using namespace std;

class YoungTableau
{
    // Recursive function to fix the tableau property in an `N × N` Young tableau.
    // An infinite value is initially placed at the first cell `(0, 0)` of the tableau.
    // The function works by swapping the smallest of `[i+1, j]` and `[i, j+1]` with
    // `[i, j]` and recur for the smaller value.
    void fixTableau(vector<vector<int>> &tableau, int i, int j)
    {
        int N = tableau.size();

        // get the values present at the bottom and right cell of the current cell
        int bottom = (i + 1 < N) ? tableau[i + 1][j] : INT_MAX;
        int right = (j + 1 < N) ? tableau[i][j + 1] : INT_MAX;

        if (bottom == INT_MAX && right == INT_MAX) {
            return;
        }

        if (bottom < right)        // go down
        {
            swap(tableau[i][j], tableau[i + 1][j]);
            fixTableau(tableau, i + 1, j);
        }
        else                    // go right
        {
            swap(tableau[i][j], tableau[i][j + 1]);
            fixTableau(tableau, i, j + 1);
        }
    }

    // Recursive function to insert a new element into a non-full `N × N` Young tableau.
    // The new element is initially placed at the bottom-right corner of the tableau.
    // The function works by swapping the smallest of `[i-1, j]` and `[i, j-1]` with
    // `[i, j]` and recur for the smaller value.
    void insert(vector<vector<int>> &tableau, int i, int j)
    {
        // base case
        if (i == 0 && j == 0) {
            return;
        }

        // handle separately for the first row
        if (i == 0)
        {
            if (tableau[i][j] < tableau[i][j - 1])
            {
                swap(tableau[i][j], tableau[i][j - 1]);
                insert(tableau, i, j - 1);
            }
            return;
        }

        // handle separately for the first column
        if (j == 0)
        {
            if (tableau[i][j] < tableau[i - 1][j])
            {
                swap(tableau[i][j], tableau[i - 1][j]);
                insert(tableau, i - 1, j);
            }
            return;
        }

        if (tableau[i][j] < tableau[i - 1][j])        // go up
        {
            swap(tableau[i][j], tableau[i - 1][j]);
            insert(tableau, i - 1, j);
        }

        if (tableau[i][j] < tableau[i][j - 1])        // go left
        {
            swap(tableau[i][j], tableau[i][j - 1]);
            insert(tableau, i, j - 1);
        }
    }

public:

    // Function construct an `N × N` Young tableau from the given keys
    vector<vector<int>> construct(vector<int> &keys)
    {
        // initialize the Young tableau by infinity
        int N = (int) ceil(sqrt(keys.size()));
        vector<vector<int>> tableau(N, vector<int>(N, INT_MAX));

        // do for each key
        for (int key: keys)
        {
            // check for overflow
            if (tableau[N - 1][N - 1] != INT_MAX) {
                break;
            }

            // place the key at the bottom-right corner of the tableau
            tableau[N - 1][N - 1] = key;

            // move the key to its correct position in the tableau
            insert(tableau, N - 1, N - 1);
        }

        return tableau;
    }

    // Function to extract the next minimum element from the Young tableau
    int extractMin(vector<vector<int>> &tableau)
    {
        // the first cell of the tableau stores the minimum element
        int min = tableau[0][0];

        // make the first element as infinity
        tableau[0][0] = INT_MAX;

        // fix the Young tableau property
        fixTableau(tableau, 0, 0);

        return min;
    }
};

void sort(vector<int> &keys)
{
    if (keys.size() == 0) {
        return;
    }

    // construct a Young tableau from the above keys
    YoungTableau s;
    vector<vector<int>> tableau = s.construct(keys);

    // repeatedly call `extractMin()` and fill `keys[]` with the returned values
    for (int i = 0; i < keys.size(); i++) {
        keys[i] = s.extractMin(tableau);
    }
}

int main()
{
    // unsorted input
    vector<int> keys { 6, 4, 8, 7, 2, 3, 1, 5 };

    // sort the input keys
    sort(keys);

    // print the sorted input
    for (int i: keys) {
        cout << i << ' ';
    }

    return 0;
}
```

**Output:** 1 2 3 4 5 6 7 8

##

```java
import java.util.Arrays;

class YoungTableau
{
    // Function construct an `N × N` Young tableau from the given keys
    public static int[][] construct(int[] keys)
    {
        // calculate N
        int N = (int) Math.ceil(Math.sqrt(keys.length));

        int[][] tableau = new int[N][N];

        // initialize the Young tableau by infinity
        for (int i = 0; i < N; i++) {
            Arrays.fill(tableau[i], Integer.MAX_VALUE);
        }

        // do for each key
        for (int key : keys) {
            // check for overflow
            if (tableau[N - 1][N - 1] != Integer.MAX_VALUE) {
                break;
            }

            // place the key at the bottom-right corner of the tableau
            tableau[N - 1][N - 1] = key;

            // move the key to its correct position in the tableau
            insert(tableau, N - 1, N - 1);
        }

        return tableau;
    }

    // Recursive function to fix the tableau property in an `N × N` Young tableau.
    // An infinite value is initially placed at the first cell `(0, 0)` of the tableau.
    // The function works by swapping the smallest of `[i+1, j]` and `[i, j+1]` with
    // `[i, j]` and recur for the smaller value.

    private static void fixTableau(int[][] tableau, int i, int j) {

        int N = tableau.length;

        // get the values present at the bottom and right cell of the current cell
        int bottom = (i + 1 < N) ? tableau[i + 1][j] : Integer.MAX_VALUE;
        int right = (j + 1 < N) ? tableau[i][j + 1] : Integer.MAX_VALUE;

        if (bottom == Integer.MAX_VALUE && right == Integer.MAX_VALUE) {
            return;
        }

        if (bottom < right)        // go down
        {
            // swap `tableau[i][j]` and `tableau[i+1][j]`

            int temp = tableau[i][j];
            tableau[i][j] = tableau[i + 1][j];
            tableau[i + 1][j] = temp;

            fixTableau(tableau, i + 1, j);
        }
        else        // go right
        {
            // swap `tableau[i][j]` and `tableau[i][j+1]`

            int temp = tableau[i][j];
            tableau[i][j] = tableau[i][j + 1];
            tableau[i][j + 1] = temp;

            fixTableau(tableau, i, j + 1);
        }
    }

    // Function to extract the next minimum element from the Young tableau
    public static int extractMin(int[][] tableau) {
        // the first cell of the tableau stores the minimum element
        int min = tableau[0][0];

        // make the first element as infinity
        tableau[0][0] = Integer.MAX_VALUE;

        // fix the Young tableau property
        fixTableau(tableau, 0, 0);

        return min;
    }

    // Recursive function to insert a new element into a non-full `N × N` Young tableau
    // The new element is initially placed at the bottom-right corner of the tableau.
    // The function works by swapping the smallest of `[i-1, j]` and `[i, j-1]` with
    // `[i, j]` and recur for the smaller value.

    private static void insert(int[][] tableau, int i, int j) {
        // base case
        if (i == 0 && j == 0) {
            return;
        }

        // handle separately for the first row
        if (i == 0) {
            if (tableau[i][j] < tableau[i][j - 1]) {
                // swap `tableau[i][j]` and `tableau[i][j-1]`
                int temp = tableau[i][j];
                tableau[i][j] = tableau[i][j - 1];
                tableau[i][j - 1] = temp;

                insert(tableau, i, j - 1);
            }
            return;
        }

        // handle separately for the first column
        if (j == 0) {
            if (tableau[i][j] < tableau[i - 1][j]) {
                // swap `tableau[i][j]` and `tableau[i-1][j]`

                int temp = tableau[i][j];
                tableau[i][j] = tableau[i - 1][j];
                tableau[i - 1][j] = temp;

                insert(tableau, i - 1, j);
            }
            return;
        }

        if (tableau[i][j] < tableau[i - 1][j])        // go up
        {
            // swap `tableau[i][j]` and `tableau[i-1][j]`

            int temp = tableau[i][j];
            tableau[i][j] = tableau[i - 1][j];
            tableau[i - 1][j] = temp;

            insert(tableau, i - 1, j);
        }

        if (tableau[i][j] < tableau[i][j - 1])        // go left
        {
            // swap `tableau[i][j]` and `tableau[i][j-1]`

            int temp = tableau[i][j];
            tableau[i][j] = tableau[i][j - 1];
            tableau[i][j - 1] = temp;

            insert(tableau, i, j - 1);
        }
    }
}

public class Main
{
    public static void sort(int[] keys)
    {
        if (keys == null || keys.length == 0) {
            return;
        }

        // construct a Young tableau from the above keys
        int[][] tableau = YoungTableau.construct(keys);

        // repeatedly call `extractMin()` and fill `keys[]` with the returned values
        for (int i = 0; i < keys.length; i++) {
            keys[i] = YoungTableau.extractMin(tableau);
        }
    }

    public static void main(String[] args)
    {
        // unsorted input
        int[] keys = {6, 4, 8, 7, 2, 3, 1, 5};

        // sort the input keys
        sort(keys);

        // print the sorted input
        System.out.println(Arrays.toString(keys));
    }
}
```

##

```python3
import fileinput, traceback
from math import sqrt, ceil
from typing import List
import sys

class YoungTableau:

    # Recursive function to fix the tableau property in an `N × N` Young tableau.
    # An infinite value is initially placed at the first cell `(0, 0)` of the tableau.
    # The function works by swapping the smallest of `[i+1, j]` and `[i, j+1]` with
    # `[i, j]` and recur for the smaller value.
    def __fixTableau(self, tableau, i=0, j=0):
        N = len(tableau)

        # get the values present at the bottom and right cell of the current cell
        bottom = tableau[i + 1][j] if (i + 1 < N) else sys.maxsize
        right = tableau[i][j + 1] if (j + 1 < N) else sys.maxsize

        if bottom == sys.maxsize and right == sys.maxsize:
            return

        if bottom < right:  # go down

            # swap `tableau[i][j]` and `tableau[i + 1][j]`

            temp = tableau[i][j]
            tableau[i][j] = tableau[i + 1][j]
            tableau[i + 1][j] = temp

            self.__fixTableau(tableau, i + 1, j)

        else:  # go right

            # swap `tableau[i][j]` and `tableau[i][j + 1]`

            temp = tableau[i][j]
            tableau[i][j] = tableau[i][j + 1]
            tableau[i][j + 1] = temp

            self.__fixTableau(tableau, i, j + 1)

    # Recursive function to insert a new element into a non-full `N × N` Young tableau.
    # The new element is initially placed at the bottom-right corner of the tableau.
    # The function works by swapping the smallest of `[i-1, j]` and `[i, j-1]` with
    # `[i, j]` and recur for the smaller value.
    def __insert(self, tableau, i, j):
        # base case
        if i == 0 and j == 0:
            return

        # handle separately for the first row
        if i == 0:
            if tableau[i][j] < tableau[i][j - 1]:
                # swap `tableau[i][j]` and `tableau[i][j-1]`
                temp = tableau[i][j]
                tableau[i][j] = tableau[i][j - 1]
                tableau[i][j - 1] = temp

                self.__insert(tableau, i, j - 1)
            return

        # handle separately for the first column
        if j == 0:
            if tableau[i][j] < tableau[i - 1][j]:
                # swap `tableau[i][j]` and `tableau[i-1][j]`

                temp = tableau[i][j]
                tableau[i][j] = tableau[i - 1][j]
                tableau[i - 1][j] = temp

                self.__insert(tableau, i - 1, j)
            return

        if tableau[i][j] < tableau[i - 1][j]:  # go up

            # swap `tableau[i][j]` and `tableau[i-1][j]`

            temp = tableau[i][j]
            tableau[i][j] = tableau[i - 1][j]
            tableau[i - 1][j] = temp

            self.__insert(tableau, i - 1, j)

        if tableau[i][j] < tableau[i][j - 1]:  # go left

            # swap `tableau[i][j]` and `tableau[i][j-1]`

            temp = tableau[i][j]
            tableau[i][j] = tableau[i][j - 1]
            tableau[i][j - 1] = temp

            self.__insert(tableau, i, j - 1)

    # Function to extract the next minimum element from the Young tableau
    def extractMin(self, tableau):
        # the first cell of the tableau stores the minimum element
        min = tableau[0][0]

        # make the first element as infinity
        tableau[0][0] = sys.maxsize

        # fix the Young tableau property
        self.__fixTableau(tableau)

        return min

    # Function construct an `N × N` Young tableau from the given keys
    def construct(self, keys):
        N = ceil(sqrt(len(keys)))
        tableau = [[sys.maxsize for x in range(N)] for y in range(N)]

        # do for each key
        for key in keys:
            # check for overflow
            if tableau[N - 1][N - 1] != sys.maxsize:
                break

            # place the key at the bottom-right corner of the tableau
            tableau[N - 1][N - 1] = key

            # move the key to its correct position in the tableau
            self.__insert(tableau, N - 1, N - 1)

        return tableau

def sort(keys: List[int]) -> None:

    if not keys or not len(keys):
        return

    obj = YoungTableau()

    # construct a Young tableau from the above keys
    tableau = obj.construct(keys)

    # repeatedly call `extractMin()` and fill `keys[]` with the returned values
    for i in range(len(keys)):
        keys[i] = obj.extractMin(tableau)

if __name__ == '__main__':

    N = 3

    # unsorted input
    keys = [6, 4, 8, 7, 2, 3, 1, 5]

    # sort the input keys
    sort(keys)

    # print the sorted input
    print(keys)
```

Constructing an O(N × N) Young tableau from O(N2) keys takes O(N3) time. Also, the `extractMin()` routine is called O(N × N) times, which runs in linear time. So, the overall time complexity of the proposed solution is O(N3) for O(N2) keys. The additional space used by the program is O(N2) for constructing an `N × N` Young tableau.

In order words, the sorting procedure runs in O(n1.5) time and O(n) space, where `n` is the size of the input.

Also See:

> [Young Tableau | Insert, Search, Extract-Min, Delete, Replace](https://www.techiedelight.com/young-tableau-insert-search-extract-min-delete-replace/ "Young Tableau | Insert, Search, Extract-Min, Delete, Replace")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 313

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
