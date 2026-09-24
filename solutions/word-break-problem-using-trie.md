# Word Break Problem – Using Trie Data Structure

> Source: https://www.techiedelight.com/word-break-problem-using-trie/

Given a dictionary of words, determine if a given string can be segmented into a space-separated sequence of one or more dictionary words.

For example,

**Input:** words[] = { this, th, is, famous, Word, break, b, r, e, a, k, br, bre, brea, ak, problem } string = Wordbreakproblem **Output:** The string can be segmented The segmented strings are: Word break problem Word brea k problem Word bre ak problem Word bre a k problem Word br e ak problem Word br e a k problem Word b r e ak problem Word b r e a k problem

> 

We have already discussed a [recursive solution of the word break problem](https://techiedelight.com/word-break-problem/) and an alternate version where we actually print all sequences. This post covers the iterative version using [Trie data structure](https://techiedelight.com/trie-implementation-insert-search-delete/) that offers better time complexity.

Consider the problem of breaking a string into component words. Call this string `s`. Let `x` be a prefix of `s`, and `y` be the remaining characters forming a suffix, so `xy` (`x` concatenated with `y`) is `s`. Then if we can break `x` and `y` into words recursively, we can break `xy = s` by merging the two sets of words. We can simplify things for ourselves by assuming that `x` will be a dictionary word; the problem is then to construct such `x`. We can do this with a Trie. Since `x` is known to be a prefix of `s`, any candidate word in the dictionary must be found on the Trie’s path corresponding to the first few letters of `s`. To do this using [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/), any time we find an appropriate `x`, set our “good” array to have a solution at `|x|+1`, where `|x|` is the size of prefix `x`. Then we can check the last entry to find if the entire string can be broken up.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Currently, Trie supports lowercase English characters `a – z`.
// So, the character size is 26.
#define CHAR_SIZE 26

// Data structure to store a Trie node
struct Node
{
    bool exist;        // true when the node is a leaf node
    Node* next[CHAR_SIZE];

    // Function that returns a new Trie node
    Node()
    {
        exist = false;

        for (int i = 0; i < CHAR_SIZE; i++) {
            next[i] = nullptr;
        }
    }
};

// Recursive function to delete a Trie in a postorder manner
void freeTrie(Node* node)
{
    if (!node) {
        return;
    }

    for (int i = 0; i < CHAR_SIZE; i++) {
        freeTrie(node->next[i]);
    }

    delete node;
}

// Iterative function to insert a string into a Trie
void insertTrie(Node* const head, string const &s)
{
    // start from the root node
    Node* node = head;

    // do for each character in the string
    for (char ch: s)
    {
        // create a new node if the path doesn't exist
        if (node->next[ch - 'a'] == nullptr) {
            node->next[ch - 'a'] = new Node();
        }

        // go to the next node
        node = node->next[ch - 'a'];
    }

    // mark the last node as a leaf
    node->exist = true;
}

// Function to determine if the string can be segmented into a
// space-separated sequence of one or more dictionary words
bool wordBreak(Node* const head, string const &s)
{
    // get the length of the string
    int n = s.length();

    // `good[i]` is true if the first `i` characters of `s` can be segmented
    vector<bool> good(n + 1);
    good[0] = true;        // base case

    for (int i = 0; i < n; i++)
    {
        if (good[i])
        {
            Node* node = head;
            for (int j = i; j < n; j++)
            {
                if (!node) {
                    break;
                }

                node = node->next[s[j] - 'a'];

                // we can make [0, i] using our known decomposition
                // and [i+1, j] using this string in a Trie
                if (node && node->exist) {
                    good[j + 1] = true;
                }
            }
        }
    }

    // `good[n]` would be true if all characters of `s` can be segmented
    return good[n];
}

int main()
{
    // vector of strings to represent a dictionary
    vector<string> words =
    {
        "this", "th", "is", "famous", "word", "break", "b", "r",
        "e", "a", "k", "br", "bre", "brea", "ak", "prob", "lem"
    };

    // given string
    string s = "wordbreakproblem";

    // create a Trie to store the dictionary
    Node* trie = new Node();
    for (string const &s: words) {
        insertTrie(trie, s);
    }

    // check if the string can be segmented or not
    if (wordBreak(trie, s)) {
        cout << "The string can be segmented";
    }
    else {
        cout << "The string can't be segmented";
    }

    // deallocate memory used by the Trie
    freeTrie(trie);

    return 0;
}
```

**Output:** The string can be segmented

##

```java
import java.util.Arrays;
import java.util.List;

// A class to store a Trie node
class Node
{
    // Currently, Trie supports lowercase English characters `a – z`.
    // So, the character size is 26.
    int CHAR_SIZE = 26;

    boolean exist;        // true when the node is a leaf node
    Node[] next;

    // Constructor
    Node()
    {
        next = new Node[CHAR_SIZE];
        exist = false;
    }
}

class Main
{
    // Iterative function to insert a string into a Trie
    public static void insertTrie(Node head, String s)
    {
        // start from the root node
        Node node = head;

        // do for each character in the string
        for (char c: s.toCharArray())
        {
            // create a new node if the path doesn't exist
            if (node.next[c - 'a'] == null) {
                node.next[c - 'a'] = new Node();
            }

            // go to the next node
            node = node.next[c - 'a'];
        }

        // mark the last node as a leaf
        node.exist = true;
    }

    // Function to determine if a string can be segmented into space-separated
    // sequence of one or more dictionary words
    public static boolean wordBreak(Node head, String s)
    {
        // `good[i]` is true if the first `i` characters of `s` can be segmented
        boolean[] good = new boolean[s.length() + 1];
        good[0] = true;        // base case

        for (int i = 0; i < s.length(); i++)
        {
            if (good[i])
            {
                Node node = head;
                for (int j = i; j < s.length(); j++)
                {
                    if (node == null) {
                        break;
                    }

                    node = node.next[s.charAt(j) - 'a'];

                    // we can make [0, i] using our known decomposition
                    // and [i+1, j] using this string in a Trie
                    if (node != null && node.exist) {
                        good[j + 1] = true;
                    }
                }
            }
        }

        // `good[n]` would be true if all characters of `s` can be segmented
        return good[s.length()];
    }

    public static void main (String[] args)
    {
        // List of strings to represent a dictionary
        List<String> words = Arrays.asList("this", "th", "is", "famous",
                "word", "break", "b", "r", "e", "a", "k",
                "br", "bre", "brea", "ak", "prob", "lem");

        // given string
        String s = "wordbreakproblem";

        // create a Trie to store the dictionary
        Node t = new Node();
        for (String word: words) {
            insertTrie(t, word);
        }

        // check if the string can be segmented or not
        if (wordBreak(t, s)) {
            System.out.println("The string can be segmented");
        }
        else {
            System.out.println("The string can't be segmented");
        }
    }
}
```

##

```python3
# Currently, Trie supports lowercase English characters. So, the character size is 26.
CHAR_SIZE = 26

# A class to store a Trie node
class Node:
    next = [None] * CHAR_SIZE
    exist = False       # true when the node is a leaf node

# Iterative function to insert a string into a Trie
def insertTrie(head, s):

    # start from the root node
    node = head

    # do for each character in the string
    for c in s:

        index = ord(c) - ord('a')

        # create a new node if the path doesn't exist
        if node.next[index] is None:
            node.next[index] = Node()

        # go to the next node
        node = node.next[index]

    # mark the last node as a leaf
    node.exist = True

# Function to determine if a string can be segmented into space-separated
# sequence of one or more dictionary words
def wordBreak(head, s):

    # get the length of the string
    n = len(s)

    # `good[i]` is true if the first `i` characters of `s` can be segmented
    good = [None] * (n + 1)
    good[0] = True      # base case

    for i in range(n):
        if good[i]:
            node = head
            for j in range(i, n):
                if node is None:
                    break

                index = ord(s[j]) - ord('a')
                node = node.next[index]

                # we can make [0, i] using our known decomposition
                # and [i+1, j] using this string in a Trie
                if node and node.exist:
                    good[j + 1] = True

    # `good[n]` would be true if all characters of `s` can be segmented
    return good[n]

if __name__ == '__main__':

    # List of strings to represent a dictionary
    words = [
        'self', 'th', 'is', 'famous', 'word', 'break', 'b', 'r',
        'e', 'a', 'k', 'br', 'bre', 'brea', 'ak', 'prob', 'lem'
    ]

    # given string
    s = 'wordbreakproblem'

    # create a Trie to store the dictionary
    t = Node()
    for word in words:
        insertTrie(t, word)

    # check if the string can be segmented or not
    if wordBreak(t, s):
        print('The string can be segmented')
    else:
        print('The string can\'t be segmented')
```

Runtime Analysis:

A naive analysis suggests an O(n2) runtime, but notice that the second loop will break when the node is null. This must occur after `k` steps, where `k` is the deepest vertex in the Trie (though it could, of course, occur earlier). It is not too difficult to see that with a dictionary containing a word of maximum length `w`, we would have `k = w+1`. So, the time complexity of the loop is actually O(w), and thus the whole function has a time complexity of O(n.w). The additional space used is the space necessary to hold a trie and the `good` array, i.e., O(n + sum of word lengths).

**Author:** Whitehead, Spencer Nicholas

Also See:

> [Word Break Problem – Dynamic Programming](https://www.techiedelight.com/word-break-problem/ "Word Break Problem – Dynamic Programming")

> [C++ Implementation of Trie Data Structure](https://www.techiedelight.com/cpp-implementation-trie-data-structure/ "C++ Implementation of Trie Data Structure")

> [Trie Data Structure – Python Implementation](https://www.techiedelight.com/trie-implementation-python/ "Trie Data Structure – Python Implementation")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 181

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
