# Find all occurrences of the given string in a character matrix

> Source: https://www.techiedelight.com/find-occurrences-given-string-character-matrix/

Given an `M × N` matrix of characters, find all occurrences of a given string in the matrix. We are allowed to search the string in all eight possible directions, i.e., North, West, South, East, North-East, North-West, South-East, South-West. Note that there should not be any cycles in the output path.

For example, consider the following matrix of characters,

[ D E M X B ] [ A O E P E ] [ D D C O D ] [ E B E D S ] [ C P Y E N ]

If the given string is `CODE`, following are all its occurrences in the matrix:

C(2, 2) O(1, 1) D(0, 0) E(0, 1) C(2, 2) O(1, 1) D(2, 0) E(3, 0) C(2, 2) O(1, 1) D(2, 1) E(1, 2) C(2, 2) O(1, 1) D(2, 1) E(3, 0) C(2, 2) O(1, 1) D(2, 1) E(3, 2) C(2, 2) O(2, 3) D(2, 4) E(1, 4) C(2, 2) O(2, 3) D(3, 3) E(3, 2) C(2, 2) O(2, 3) D(3, 3) E(4, 3)

> 

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to solve this problem. The idea is to start from each cell in the matrix and explore all eight paths possible and recursively check if they will lead to the solution or not. To make sure that the path is simple and doesn’t contain any cycles, keep track of cells involved in the current path in a matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

We can find all the possible locations we can move to from the given location by using the array that stores the relative position of movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k <= 7` using the following array:

int row[] = { -1, -1, -1, 0, 0, 1, 1, 1 } int col[] = { -1, 0, 1, -1, 1, -1, 0, 1 } So, from position `(x, y)`, we can move to: (x – 1, y – 1) (x – 1, y) (x – 1, y + 1) (x, y – 1) (x, y + 1) (x + 1, y – 1) (x + 1, y) (x + 1, y + 1)

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

template <typename T>
void printVectorOfPairs(vector<pair<T,T>> const &input)
{
    cout << "[";
    int n = input.size();
    for (int i = 0; i < n; i++) {
        cout << '(' << input[i].first << ", " << input[i].second << ')';
        if (i < n - 1) {
            cout << ", ";
        }
    }
    cout << "]\n";
}

// Function to check if it is possible to go to position next
// from the current position. The function returns false if next is
// not in a valid position, or it is already visited
bool isValid(pair<int,int> const &next, vector<pair<int,int>> const &path,
    vector<vector<char>> const &mat)
{
    return (next.first >= 0 && next.first < mat.size()) &&
            (next.second >= 0 && next.second < mat[0].size()) &&
            find(path.begin(), path.end(), next) == path.end();
}

// Notice that the path vector is not passed by the reference (Why?).
// Use backtracking if the vector is passed by reference
void DFS(vector<vector<char>> const &mat, string word, pair<int,int> const &next,
        vector<pair<int,int>> path, int index)
{
    int i = next.first;
    int j = next.second;

    // return if characters don't match
    if (mat[i][j] != word[index]) {
        return;
    }

    // include the current cell in the path
    path.push_back({i, j});

    // if all words are matched, print the result and return
    if (index == word.size() - 1)    {
        printVectorOfPairs(path);
        return;
    }

    // Below arrays detail all eight possible movements from a cell
    // (top, right, bottom, left, and four diagonal moves)
    int row[] = { -1, -1, -1, 0, 0, 1, 1, 1 };
    int col[] = { -1, 0, 1, -1, 1, -1, 0, 1 };

    // check all eight possible movements from the current cell
    // and recur for each valid movement
    for (int k = 0; k < 8; k++)
    {
        // calculate the next position
        pair<int,int> next = {i + row[k], j + col[k]};

        // check if it is possible to go to the next position
        // from the current position
        if (isValid(next, path, mat)) {
            DFS(mat, word, next, path, index + 1);
        }
    }
}

void findAllOccurences(vector<vector<char>> const &mat, string word)
{
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[0].size(); j++) {
            DFS(mat, word, make_pair(i, j), {}, 0);
        }
    }
}

int main()
{
    vector<vector<char>> mat =
    {
        { 'D', 'E', 'M', 'X', 'B' },
        { 'A', 'O', 'E', 'P', 'E' },
        { 'D', 'D', 'C', 'O', 'D' },
        { 'E', 'B', 'E', 'D', 'S' },
        { 'C', 'P', 'Y', 'E', 'N' }
    };

    string word = "CODE";

    findAllOccurences(mat, word);

    return 0;
}
```

##

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

// Node class
class Node
{
    public int x, y;

    private Node(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public static Node of(int x, int y) {
        return new Node(x, y);
    }

    @Override
    public boolean equals(Object o) {
        Node node = (Node) o;
        return x == node.x && y == node.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }

    @Override
    public String toString() {
        return ("(" + x + ", " + y + ")");
    }
}

class Main
{
    // Below arrays detail all eight possible movements from a cell
    private static final int[] row = { -1, -1, -1, 0, 0, 1, 1, 1 };
    private static final int[] col = { -1, 0, 1, -1, 1, -1, 0, 1 };

    // Function to check if it is possible to go to position next
    // from the current position. The function returns false if next is
    // not in a valid position, or it is already visited
    public static boolean isValid(Node next, List<Node> path, int M, int N)
    {
        return (next.x >= 0 && next.x < M) && (next.y >= 0 && next.y < N) &&
                !path.contains(next);
    }

    public static void DFS(char[][] mat, String word, Node next,
                        List<Node> path, int index)
    {
        int i = next.x;
        int j = next.y;

        // return if characters don't match
        if (mat[i][j] != word.charAt(index)) {
            return;
        }

        // include the current cell in the path
        path.add(Node.of(i, j));

        // if all words are matched, print the result and return
        if (index == word.length() - 1) {
            System.out.println(path);
        } else {
            // check all eight possible movements from the current cell
            // and recur for each valid movement
            for (int k = 0; k < row.length; k++) {
                // calculate the next position
                next = Node.of(i + row[k], j + col[k]);

                // check if it is possible to go to the next position
                // from the current position
                if (isValid(next, path, mat.length, mat[0].length)) {
                    DFS(mat, word, next, path, index + 1);
                }
            }
        }

        // backtrack: remove the current cell from the path
        path.remove(path.size() - 1);
    }

    public static void findAllOccurences(char[][] mat, String word) {
        // base case
        if (mat == null || mat.length == 0 || word == null) {
            return;
        }

        List<Node> path = new ArrayList<>();
        for (int i = 0; i < mat.length; i++) {
            for (int j = 0; j < mat[0].length; j++) {
                DFS(mat, word, Node.of(i, j), path, 0);
            }
        }
    }

    public static void main(String[] args)
    {
        char mat[][] =
        {
            "DEMXB".toCharArray(),
            "AOEPE".toCharArray(),
            "DDCOD".toCharArray(),
            "EBEDS".toCharArray(),
            "CPYEN".toCharArray()
        };

        String word = "CODE";

        findAllOccurences(mat, word);
    }
}
```

##

```python3
# Below lists detail all eight possible movements from a cell
row = [-1, -1, -1, 0, 0, 1, 1, 1]
col = [-1, 0, 1, -1, 1, -1, 0, 1]

# Function to check if it is possible to go to position next
# from the current position. The function returns false if next is
# not in a valid position, or it is already visited
def isValid(mat, x, y, path):
    return (0 <= x < len(mat)) and (0 <= y < len(mat[0])) and (x, y) not in path

def DFS(mat, word, i, j, path=[], index=0):

    # return if characters don't match
    if mat[i][j] != word[index]:
        return

    # include the current cell in the path
    path.append((i, j))

    # if all words are matched, print the result and return
    if index == len(word) - 1:
        print(path)
    else:
        # check all eight possible movements from the current cell
        # and recur for each valid movement
        for k in range(len(row)):
            # check if it is possible to go to the next position
            # from the current position
            if isValid(mat, i + row[k], j + col[k], path):
                DFS(mat, word, i + row[k], j + col[k], path, index + 1)

    # backtrack: remove the current cell from the path
    path.pop()

def findAllOccurences(mat, word):
    # base case
    if not mat or not len(mat) or not len(word):
        return

    for i in range(len(mat)):
        for j in range(len(mat[0])):
            DFS(mat, word, i, j)

if __name__ == '__main__':

    mat = [
        ['D', 'E', 'M', 'X', 'B'],
        ['A', 'O', 'E', 'P', 'E'],
        ['D', 'D', 'C', 'O', 'D'],
        ['E', 'B', 'E', 'D', 'S'],
        ['C', 'P', 'Y', 'E', 'N']
    ]
    word = 'CODE'

    findAllOccurences(mat, word)
```

**Output:** ` [(2, 2), (1, 1), (0, 0), (0, 1)] [(2, 2), (1, 1), (2, 0), (3, 0)] [(2, 2), (1, 1), (2, 1), (1, 2)] [(2, 2), (1, 1), (2, 1), (3, 0)] [(2, 2), (1, 1), (2, 1), (3, 2)] [(2, 2), (2, 3), (2, 4), (1, 4)] [(2, 2), (2, 3), (3, 3), (3, 2)] [(2, 2), (2, 3), (3, 3), (4, 3)] `

The time complexity of the proposed solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Find the length of the longest path in a matrix with consecutive characters](https://www.techiedelight.com/find-length-longest-path-matrix-consecutive-characters/ "Find the length of the longest path in a matrix with consecutive characters")

> [Generate a list of possible words from a character matrix](https://www.techiedelight.com/generate-list-of-possible-words-from-a-character-matrix/ "Generate a list of possible words from a character matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 169

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
