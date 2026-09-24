# Lexicographic sorting of a given set of keys

> Source: https://www.techiedelight.com/lexicographic-sorting-given-set-of-keys/

Lexicographic sorting: Given a set of strings, return them in lexicographic order (dictionary/alphabetical order).

> 

Lexicographic sorting of a set of keys can be accomplished with a simple [Trie-based algorithm](https://techiedelight.com/trie-implementation-insert-search-delete/) as follows:

  * Insert all keys into a Trie.
  * Print all keys in the Trie by performing [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on Trie to get output in lexicographically increasing order.

Following is the C++, Java, and Python implementation of the idea. Trie currently supports the lowercase English characters `a – z`. We can easily extend the solution to support all ASCII characters.

```cpp
#include <iostream>
#include <string>
using namespace std;

// Trie supports lowercase English characters `a – z`.
// So, the character size is 26.
#define CHAR_SIZE 26

// Data structure to store a Trie node
struct Trie
{
    string key;        // set when the node is a leaf node
    Trie* character[CHAR_SIZE];

    // Constructor
    Trie()
    {
        for (int i = 0; i < CHAR_SIZE; i++) {
            character[i] = nullptr;
        }
    }
};

// Iterative function to insert a string into a Trie
void insert(Trie* &head, string const &str)
{
    // start from the root node
    Trie* curr = head;

    for (char ch: str)
    {
        // create a new node if the path doesn't exist
        if (curr->character[ch - 'a'] == nullptr) {
            curr->character[ch - 'a'] = new Trie();
        }

        // go to the next node
        curr = curr->character[ch - 'a'];
    }

    // store key in the leaf node
    curr->key = str;
}

// Function to perform preorder traversal on a given Trie
bool preorder(Trie* const curr, Trie const *root)
{
    // return if Trie is empty
    if (curr == nullptr) {
        return false;
    }

    for (int i = 0; i < CHAR_SIZE; i++)
    {
        if (curr->character[i] != nullptr)
        {
            // if the current node is a leaf, print the key
            if (curr->character[i]->key.length() > 0) {
                cout << curr->character[i]->key << endl;
            }

            preorder(curr->character[i], root);
        }
    }
}

int main()
{
    // given set of keys
    string dict[] =
    {
        "lexicographic", "sorting", "of", "a", "set", "of", "keys", "can",
        "be", "accomplished", "with", "a", "simple", "trie", "based",
        "algorithm", "we", "insert", "all", "keys", "in", "a", "trie",
        "output", "all", "keys", "in", "the", "trie", "by", "means", "of",
        "preorder", "traversal", "which", "results", "in", "output", "that",
        "is", "in", "lexicographically", "increasing", "order", "preorder",
        "traversal", "is", "a", "kind", "of", "depth", "first", "traversal"
    };

    Trie* head = new Trie();

    // insert all keys of a dictionary into a Trie
    for (string word: dict) {
        insert(head, word);
    }

    // print keys in lexicographic order
    preorder(head, head);

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.List;

// A class to store a Trie node
class Trie
{
    String key;        // non-empty when node is a leaf node
    Trie[] character;

    // Constructor
    Trie()
    {
        // Trie supports lowercase English characters `a – z`.
        // So, the character size is 26.
        character = new Trie[26];
    }
}

class Main
{
    // Iterative function to insert a string into a Trie
    public static void insert(Trie head, String str)
    {
        // start from the root node
        Trie curr = head;

        for (char c: str.toCharArray())
        {
            // create a new node if the path doesn't exist
            if (curr.character[c - 'a'] == null) {
                curr.character[c - 'a'] = new Trie();
            }

            // go to the next node
            curr = curr.character[c - 'a'];
        }

        // store key in the leaf node
        curr.key = str;
    }

    // Function to perform preorder traversal on a given Trie
    public static void preorder(Trie curr)
    {
        // return if Trie is empty
        if (curr == null) {
            return;
        }

        for (int i = 0; i < 26; i++)
        {
            // if the current node is a leaf, print the key
            if (curr.character[i] != null && curr.character[i].key != null) {
                System.out.println(curr.character[i].key);
            }

            preorder(curr.character[i]);
        }
    }

    public static void main (String[] args)
    {
        String s = "lexicographic sorting of a set of keys can be accomplished with " +
                "a simple trie based algorithm we insert all keys in a trie output " +
                "all keys in the trie by means of preorder traversal which results " +
                "in output that is in lexicographically increasing order preorder " +
                "traversal is a kind of depth first traversal";

        // split the given string to set of keys
        String[] dict = s.split(" ");

        Trie head = new Trie();

        // insert all keys of a dictionary into a Trie
        for (String word: dict) {
            insert(head, word);
        }

        // print keys in lexicographic order
        preorder(head);
    }
}
```

##

```python3
# A class to store a Trie node
class Trie:
    def __init__(self):
        self.key = None

        # Trie supports lowercase English characters `a – z`.
        # So, the character size is 26.
        self.character = [None] * 26

# Iterative function to insert a string into a Trie
def insert(head, s):

    # start from the root node
    curr = head

    for c in s:
        key = ord(c) - ord('a')

        # create a new node if the path doesn't exist
        if curr.character[key] is None:
            curr.character[key] = Trie()

        # go to the next node
        curr = curr.character[key]

    # store key in the leaf node
    curr.key = s

# Function to perform preorder traversal on a given Trie
def preorder(curr):

    # return if Trie is empty
    if curr is None:
        return

    for i in range(26):
        if curr.character[i]:
            # if the current node is a leaf, print the key
            if curr.character[i].key:
                print(curr.character[i].key)

            preorder(curr.character[i])

if __name__ == '__main__':

    # given set of keys
    words = [
        'lexicographic', 'sorting', 'of', 'a', 'set', 'of', 'keys', 'can', 'be',
        'accomplished', 'with', 'a', 'simple', 'trie', 'based', 'algorithm',
        'we', 'insert', 'all', 'keys', 'in', 'a', 'trie', 'output', 'all',
        'keys', 'in', 'the', 'trie', 'by', 'means', 'of', 'preorder',
        'traversal', 'which', 'results', 'in', 'output', 'that', 'is', 'in',
        'lexicographically', 'increasing', 'order', 'preorder', 'traversal',
        'is', 'a', 'kind', 'of', 'depth', 'first', 'traversal'
    ]

    head = Trie()

    # insert all keys of a dictionary into a Trie
    for word in words:
        insert(head, word)

    # print keys in lexicographic order
    preorder(head)
```

**Output:** a accomplished algorithm all based be by can depth first in increasing insert is keys kind lexicographic lexicographically means of order output preorder results set simple sorting that the traversal trie we which with

The time complexity of the above solution is O(N.M), where `N` is the total number of given words and `M` is the maximum word length. The auxiliary space required by the program is O(N × M).

Also See:

> [Find the maximum occurring word in a given set of strings](https://www.techiedelight.com/find-maximum-occurring-word-given-set-strings/ "Find the maximum occurring word in a given set of strings")

> [Find first `k` maximum occurring words in a given set of strings](https://www.techiedelight.com/find-first-k-maximum-occurring-words-given-set-strings/ "Find first `k` maximum occurring words in a given set of strings")

> [C++ Implementation of Trie Data Structure](https://www.techiedelight.com/cpp-implementation-trie-data-structure/ "C++ Implementation of Trie Data Structure")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
