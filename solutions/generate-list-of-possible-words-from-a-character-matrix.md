# Generate a list of possible words from a character matrix

> Source: https://www.techiedelight.com/generate-list-of-possible-words-from-a-character-matrix/

Given an `M × N` boggle board, find a list of all possible words that can be formed by a sequence of adjacent characters on the board.

We are allowed to search a word in all eight possible directions, i.e., North, West, South, East, North-East, North-West, South-East, South-West, but a word should not have multiple instances of the same cell.

Consider the following the traditional `4 × 4` boggle board. If the input dictionary is `[START, NOTE, SAND, STONED]`, the valid words are `[NOTE, SAND, STONED]`.

> 

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to solve this problem. The idea is to start from each character in the matrix and explore all eight paths possible and recursively check if they lead to a solution or not. To make sure that a word doesn’t have multiple instances of the same cell, keep track of cells involved in the current path in the matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

To find all possible movements from a cell, we can use an array to store the relative position of movement from any cell. For example, if the current cell is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k <=7` using the following array:

int row[] = { -1, -1, -1, 0, 0, 1, 1, 1 } int col[] = { -1, 0, 1, -1, 1, -1, 0, 1 }

So, from position `(x, y)`, we can move to:

(x – 1, y – 1) (x – 1, y) (x – 1, y + 1) (x, y – 1) (x, y + 1) (x + 1, y – 1) (x + 1, y) (x + 1, y + 1)

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_set>
#include <string>
using namespace std;

// Below arrays detail all eight possible movements from a cell
// (top, right, bottom, left, and four diagonal moves)
int row[] = { -1, -1, -1, 0, 1, 0, 1, 1 };
int col[] = { -1, 1, 0, -1, -1, 1, 0, 1 };

// Function to check if it is safe to go to cell (x, y) from the current cell.
// The function returns false if (x, y) is not valid matrix coordinates
// or cell (x, y) is already processed.
bool isSafe(int x, int y, auto &processed) {
    return (x >= 0 && x < processed.size()) && (y >= 0 && y < processed[0].size()) &&
        !processed[x][y];
}

// A recursive function to generate all possible words in a boggle
void searchBoggle(auto const &board, auto const &words, auto &result, auto &processed,
                int i, int j, string path)
{
    // mark the current node as processed
    processed[i][j] = true;

    // update the path with the current character and insert it into the set
    path += board[i][j];

    // check whether the path is present in the input set
    if (words.find(path) != words.end()) {
        result.insert(path);
    }

    // check for all eight possible movements from the current cell
    for (int k = 0; k < 8; k++)
    {
        // skip if a cell is invalid, or it is already processed
        if (isSafe(i + row[k], j + col[k], processed)) {
            searchBoggle(board, words, result, processed, i + row[k], j + col[k], path);
        }
    }

    // backtrack: mark the current node as unprocessed
    processed[i][j] = false;
}

unordered_set<string> searchBoggle(auto const &board, auto const &words)
{
    // construct a set to store valid words constructed from the boggle
    unordered_set<string> result;

    // base case
    if (board.size() == 0) {
        return result;
    }

    // `M × N` board
    int M = board.size();
    int N = board[0].size();

    // construct a boolean matrix to store whether a cell is processed or not
     vector<vector<bool>> processed(M, vector<bool>(N));

    // generate all possible words in a boggle
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++) {
            // consider each character as a starting point and run DFS
            searchBoggle(board, words, result, processed, i, j, "");
        }
    }

    return result;
}

template <typename T>
void printSet(unordered_set<T> const &input)
{
    cout << "{";
    int n = input.size();
    for (auto const &i: input) {
        cout << i;
        if (--n) {
            cout << ", ";
        }
    }
    cout << "}";
}

int main()
{
    vector<vector<char>> board = {
                    {'M', 'S', 'E', 'F'},
                    {'R', 'A', 'T', 'D'},
                    {'L', 'O', 'N', 'E'}
                };

    unordered_set<string> words = { "START", "NOTE", "SAND", "STONED" };

    unordered_set<string> output = searchBoggle(board, words);
    printSet(output);

    return 0;
}
```

**Output:** {NOTE, SAND, STONED}

##

```java
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class Main
{
    // Below arrays detail all eight possible movements from a cell
    // (top, right, bottom, left, and four diagonal moves)
    public static int[] row = { -1, -1, -1, 0, 1, 0, 1, 1 };
    public static int[] col = { -1, 1, 0, -1, -1, 1, 0, 1 };

    // Function to check if it is safe to go to cell (x, y) from the current cell.
    // The function returns false if (x, y) is not valid matrix coordinates
    // or cell (x, y) is already processed.
    public static boolean isSafe(int x, int y, boolean[][] processed) {
        return (x >= 0 && x < processed.length) && (y >= 0 && y < processed[0].length)
                && !processed[x][y];
    }

    // A recursive function to generate all possible words in a boggle
    public static void searchBoggle(char[][] board, Set<String> words,
                                    Set<String> result, boolean[][] processed,
                                    int i, int j, String path)
    {
        // mark the current node as processed
        processed[i][j] = true;

        // update the path with the current character and insert it into the set
        path += board[i][j];

        // check whether the path is present in the input set
        if (words.contains(path)) {
            result.add(path);
        }

        // check for all eight possible movements from the current cell
        for (int k = 0; k < row.length; k++)
        {
            // skip if a cell is invalid, or it is already processed
            if (isSafe(i + row[k], j + col[k], processed)) {
                searchBoggle(board, words, result, processed, i + row[k],
                        j + col[k], path);
            }
        }

        // backtrack: mark the current node as unprocessed
        processed[i][j] = false;
    }

    // Function to search for a given set of words in a boggle
    public static Set<String> searchBoggle(char[][] board, Set<String> words)
    {
        // construct a set to store valid words constructed from the boggle
        Set<String> result = new HashSet<>();

        // base case
        if (board.length == 0) {
            return result;
        }

        // `M × N` board
        int M = board.length;
        int N = board[0].length;

        // construct a boolean matrix to store whether a cell is processed or not
        boolean[][] processed = new boolean[M][N];

        // generate all possible words in a boggle
        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++) {
                // consider each character as a starting point and run DFS
                searchBoggle(board, words, result, processed, i, j, "");
            }
        }

        return result;
    }

    public static void main(String[] args)
    {
        char[][] board = {
                {'M', 'S', 'E'},
                {'R', 'A', 'T'},
                {'L', 'O', 'N'}
        };
        Set<String> words = Stream.of("STAR", "NOTE", "SAND", "STONE")
                                .collect(Collectors.toSet());

        Set<String> validWords = searchBoggle(board, words);
        System.out.println(validWords);
    }
}
```

##

```python3
# Below lists detail all eight possible movements from a cell
# (top, right, bottom, left, and four diagonal moves)
row = [-1, -1, -1, 0, 1, 0, 1, 1]
col = [-1, 1, 0, -1, -1, 1, 0, 1]

# Function to check if it is safe to go to cell (x, y) from the current cell.
# The function returns false if (x, y) is not valid matrix coordinates
# or cell (x, y) is already processed.
def isSafe(x, y, processed):
    return (0 <= x < len(processed)) and (0 <= y < len(processed[0]))\
        and not processed[x][y]

# A recursive function to generate all possible words in a boggle
def searchBoggle(board, words, result, processed, i, j, path=''):
    # mark the current node as processed
    processed[i][j] = True

    # update the path with the current character and insert it into the set
    path += board[i][j]

    # check whether the path is present in the input set
    if path in words:
        result.add(path)

    # check for all eight possible movements from the current cell
    for k in range(len(row)):
        # skip if a cell is invalid, or it is already processed
        if isSafe(i + row[k], j + col[k], processed):
            searchBoggle(board, words, result, processed, i + row[k], j + col[k], path)

    # backtrack: mark the current node as unprocessed
    processed[i][j] = False

def searchInBoggle(board, words):

    # construct a set to store valid words constructed from the boggle
    result = set()

    # base case
    if not board or not len(board):
        return

    # `M × N` board
    (M, N) = (len(board), len(board[0]))

    # construct a boolean matrix to store whether a cell is processed or not
    processed = [[False for x in range(N)] for y in range(M)]

    # generate all possible words in a boggle
    for i in range(M):
        for j in range(N):
            # consider each character as a starting point and run DFS
            searchBoggle(board, words, result, processed, i, j)

    return result

if __name__ == '__main__':

    board = [
        ['M', 'S', 'E'],
        ['R', 'A', 'T'],
        ['L', 'O', 'N']
    ]

    words = ['STAR', 'NOTE', 'SAND', 'STONE']

    validWords = searchInBoggle(board, words)
    print(validWords)
```

The time complexity of the proposed solution is exponential. We can improve the time complexity by using a [Trie data structure](https://techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/). The idea is to build a Trie out of the given words and then perform [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) (DFS) on it, as shown below in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <string>
#include <vector>
using namespace std;

// Data structure to store a Trie node
struct Trie
{
    // true when the node is a leaf node
    bool isLeaf;

    unordered_map<char, Trie*> character;

    // Constructor
    Trie() {
        isLeaf = false;
    }
};

// Iterative function to insert a string into a Trie
void insert(Trie* const &root, string const &str)
{
    // start from the root node
    Trie* curr = root;

    for (char ch: str)
    {
        // create a new node if the path doesn't exist
        if (curr->character.find(ch) == curr->character.end()) {
            curr->character[ch] = new Trie();
        }

        // go to the next node
        curr = curr->character[ch];
    }

    curr->isLeaf = true;
}

// Below arrays detail all eight possible movements from a cell
// (top, right, bottom, left, and four diagonal moves)
int row[] = { -1, -1, -1, 0, 1, 0, 1, 1 };
int col[] = { -1, 1, 0, -1, -1, 1, 0, 1 };

// The function returns false if (x, y) is not valid matrix coordinates
// or cell (x, y) is already processed or doesn't lead to the solution
bool isSafe(int x, int y, auto &processed, auto const &board, char ch)
{
    return (x >= 0 && x < processed.size()) && (y >= 0 && y < processed[0].size()) &&
            !processed[x][y] && (board[x][y] == ch);
}

// A recursive function to search valid words present in a boggle using trie
void searchBoggle(Trie *root, auto const &board, int i, int j,
                auto &processed, string path, auto &result)
{
    // if a leaf node is encountered
    if (root->isLeaf)
    {
        // update result with the current word
        result.insert(path);
    }

    // mark the current cell as processed
    processed[i][j] = true;

    // traverse all children of the current Trie node
    for (auto it: root->character)
    {
        // check for all eight possible movements from the current cell
        for (int k = 0; k < 8; k++)
        {
            // skip if a cell is invalid, or it is already processed
            // or doesn't lead to any path in the Trie
            if (isSafe(i + row[k], j + col[k], processed, board, it.first))
            {
                searchBoggle(it.second, board, i + row[k], j + col[k],
                            processed, path + it.first, result);
            }
        }
    }

    // backtrack: mark the current cell as unprocessed
    processed[i][j] = false;

}

unordered_set<string> searchInBoggle(auto const &board, auto const &words)
{
    // construct a set for storing the result
    unordered_set<string> result;

    // base case
    if (board.size() == 0) {
        return result;
    }

    // `M × N` board
    int M = board.size();
    int N = board[0].size();

    // insert all words into a trie
    Trie* root = new Trie();
    for (string word: words) {
        insert(root, word);
    }

    // construct a boolean matrix to store whether a cell is processed or not
    vector<vector<bool>> processed(M, vector<bool>(N));

    string s;

    // consider each character in the matrix
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++)
        {
            // current character
            char ch = board[i][j];

            // proceed only if the current character is a child of the Trie root node
            if (root->character[ch])
            {
                s = ch;
                searchBoggle(root->character[ch], board, i, j, processed, s, result);
            }
        }
    }

    // return the result set
    return result;
}

template <typename T>
void printSet(unordered_set<T> const &input)
{
    cout << "{";
    int n = input.size();
    for (auto const &i: input) {
        cout << i;
        if (--n) {
            cout << ", ";
        }
    }
    cout << "}";
}

int main()
{
    vector<vector<char>> board = {
                    {'M', 'S', 'E', 'F'},
                    {'R', 'A', 'T', 'D'},
                    {'L', 'O', 'N', 'E'},
                    {'K', 'A', 'F', 'B'}
                };

    unordered_set<string> words = { "START", "NOTE", "SAND", "STONED" };

    unordered_set<string> output = searchInBoggle(board, words);
    printSet(output);

    return 0;
}
```

**Output:** {NOTE, STONED, SAND}

##

```java
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// A class to store a Trie node
class Trie
{
    // true when the node is a leaf node
    boolean isLeaf;

    Map<Character, Trie> character = new HashMap<>();

    // Constructor
    Trie() {
        isLeaf = false;
    }
}

class Main
{
    // `M × N` matrix
    private static int M, N;

    // Iterative function to insert a string into a Trie
    private static void insert(Trie root, String str)
    {
        // start from the root node
        Trie curr = root;

        for (char ch: str.toCharArray())
        {
            // create a new node if the path doesn't exist
            curr.character.putIfAbsent(ch, new Trie());

            // go to the next node
            curr = curr.character.get(ch);
        }

        curr.isLeaf = true;
    }

    // Below arrays detail all eight possible movements from a cell
    // (top, right, bottom, left, and four diagonal moves)
    private static int[] row = { -1, -1, -1, 0, 1, 0, 1, 1 };
    private static int[] col = { -1, 1, 0, -1, -1, 1, 0, 1 };

    // The function returns false if (x, y) is not valid matrix coordinates
    // or cell (x, y) is already processed or doesn't lead to the solution
    public static boolean isSafe(int x, int y, boolean[][] processed,
                                 char[][] board, char ch)
    {
        return (x >= 0 && x < M) && (y >= 0 && y < N) &&
                !processed[x][y] && (board[x][y] == ch);
    }

    // A recursive function to search valid words present in a boggle using trie
    public static void searchBoggle(Trie root, char[][] board, int i, int j,
                                    boolean[][] processed, String path,
                                    Set<String> result)
    {
        // if a leaf node is encountered
        if (root.isLeaf) {
            // update result with the current word
            result.add(path);
        }

        // mark the current cell as processed
        processed[i][j] = true;

        // traverse all children of the current Trie node
        for (var entry: root.character.entrySet())
        {
            // check for all eight possible movements from the current cell
            for (int k = 0; k < row.length; k++)
            {
                // skip if cell is invalid or entry is already processed
                // or doesn't lead to any path in the Trie
                if (isSafe(i + row[k], j + col[k], processed, board, entry.getKey()))
                {
                    searchBoggle(entry.getValue(), board, i + row[k], j + col[k],
                            processed, path + entry.getKey(), result);
                }
            }
        }

        // backtrack: mark the current cell as unprocessed
        processed[i][j] = false;
    }

    // Function to search for a given set of words in a boggle
    public static Set<String> searchBoggle(char[][] board, Set<String> words)
    {
        // construct a set for storing the result
        Set<String> result = new HashSet<>();

        // base case
        if (board.length == 0) {
            return result;
        }

        // `M × N` board
        int M = board.length;
        int N = board[0].length;

        // insert all words into a trie
        Trie root = new Trie();
        for (String word: words) {
            insert(root, word);
        }

        // construct a boolean matrix to store whether a cell is processed or not
        boolean[][] processed = new boolean[M][N];

        // consider each character in the matrix
        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++)
            {
                // current character
                char ch = board[i][j];

                // proceed only if the current character is a child of the Trie root
                if (root.character.containsKey(ch))
                {
                    searchBoggle(root.character.get(ch), board, i, j,
                            processed, Character.toString(ch), result);
                }
            }
        }

        // return the result set
        return result;
    }

    public static void main(String[] args)
    {
        char[][] board =
        {
            {'M', 'S', 'E', 'F'},
            {'R', 'A', 'T', 'D'},
            {'L', 'O', 'N', 'E'},
            {'K', 'A', 'F', 'B'}
        };

        M = board.length;
        N = board[0].length;

        Set<String> words = Stream.of("START", "NOTE", "SAND", "STONED")
                .collect(Collectors.toSet());

        Set<String> validWords = searchBoggle(board, words);
        System.out.println(validWords);
    }
}
```

##

```python3
# A class to store a Trie node
class Trie:
    # Constructor
    def __init__(self):
        self.character = {}
        self.isLeaf = False  # true when the node is a leaf node

# Iterative function to insert a string into a Trie
def insert(root, s):
    # start from the root node
    curr = root

    for ch in s:
        # go to the next node (create if the path doesn't exist)
        curr = curr.character.setdefault(ch, Trie())

    curr.isLeaf = True

# Below lists detail all eight possible movements from a cell
# (top, right, bottom, left, and four diagonal moves)
row = [-1, -1, -1, 0, 1, 0, 1, 1]
col = [-1, 1, 0, -1, -1, 1, 0, 1]

# The function returns false if (x, y) is not valid matrix coordinates
# or cell (x, y) is already processed or doesn't lead to the solution
def isSafe(x, y, processed, board, ch):
    return (0 <= x < len(processed)) and (0 <= y < len(processed[0])) and \
           not processed[x][y] and (board[x][y] == ch)

# A recursive function to search valid words present in a boggle using trie
def searchBoggle(root, board, i, j, processed, path, result):
    # if a leaf node is encountered
    if root.isLeaf:
        # update result with the current word
        result.add(path)

    # mark the current cell as processed
    processed[i][j] = True

    # traverse all children of the current Trie node
    for key, value in root.character.items():

        # check for all eight possible movements from the current cell
        for k in range(len(row)):

            # skip if a cell is invalid, or it is already processed
            # or doesn't lead to any path in the Trie
            if isSafe(i + row[k], j + col[k], processed, board, key):
                searchBoggle(value, board, i + row[k], j + col[k],
                             processed, path + key, result)

    # backtrack: mark the current cell as unprocessed
    processed[i][j] = False

# Function to search for a given set of words in a boggle
def searchInBoggle(board, words):
    # construct a set for storing the result
    result = set()

    # base case
    if not board or not len(board):
        return

    # insert all words into a trie
    root = Trie()
    for word in words:
        insert(root, word)

    # `M × N` board
    (M, N) = (len(board), len(board[0]))

    # construct a matrix to store whether a cell is processed or not
    processed = [[False for x in range(N)] for y in range(M)]

    # consider each character in the matrix
    for i in range(M):
        for j in range(N):
            ch = board[i][j]  # current character

            # proceed only if the current character is a child of the Trie root node
            if ch in root.character:
                searchBoggle(root.character[ch], board, i, j, processed, ch, result)

    # return the result set
    return result

if __name__ == '__main__':
    board = [
        ['M', 'S', 'E', 'F'],
        ['R', 'A', 'T', 'D'],
        ['L', 'O', 'N', 'E'],
        ['K', 'A', 'F', 'B']
    ]

    words = ['START', 'NOTE', 'SAND', 'STONED']
    searchInBoggle(board, words)

    validWords = searchInBoggle(board, words)
    print(validWords)
```
