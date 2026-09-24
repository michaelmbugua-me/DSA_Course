# Find all words matching a pattern in the given dictionary

> Source: https://www.techiedelight.com/find-all-words-matching-pattern-dictionary/

Given a dictionary of words where each word follows a CamelCase notation, find all words in it that matches a given pattern of all uppercase characters.

CamelCase Notation is the practice of writing compound words or phrases joined without spaces, where each word’s first letter is capitalized. For example, PowerPoint, LibreOffice, CinemaScope, etc., are in CamelCase.

For example, consider the dictionary.

dict = [Hi, HiTech, HiTechCity, Hello, HelloWorld, HiTechLab]

  * If the pattern is HT, the output is [HiTech, HiTechCity, HiTechLab].
  * If the pattern is HTC, the output is [HiTechCity].
  * If the pattern is H, the output is the same as the input.

> 

We can use a [Trie data structure](https://techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/) to solve this problem. The idea is to insert all uppercase characters of each word in the CamelCase dictionary into a Trie. In contrast, the complete word is stored in a container associated with the corresponding leaf node. After the complete dictionary is processed, traverse the Trie and find all words that match the given pattern.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <string>
using namespace std;

// Data structure to store a Trie node
struct TrieNode
{
    // each node stores a map to its child nodes
    unordered_map<char, TrieNode*> map;

    // true when the node is a leaf node
    bool isLeaf = false;

    // collection to store a complete list of words in the leaf node
    unordered_set<string> word;
};

// Function to insert a string into a Trie
void insert(TrieNode*& head, string word)
{
    if (head == nullptr) {
        head = new TrieNode();
    }

    // start from the head node
    TrieNode* curr = head;
    for (char c: word)
    {
        // insert only uppercase characters
        if (isupper(c))
        {
            // create a new node if the path doesn't exist
            if (curr->map.find(c) == curr->map.end()) {
                curr->map[c] = new TrieNode();
            }

            // go to the next node
            curr = curr->map[c];
        }
    }

    // mark the current node as a leaf
    curr->isLeaf = true;

    // push the current word into the set associated with a leaf node
    (curr->word).insert(word);
}

// Function to print all children of a given Trie node
void printAllWords(TrieNode* root)
{
    // if the current node is a leaf, print all words associated with it
    if (root->isLeaf)
    {
        unordered_set<string> collection = root->word;
        for (string s: collection) {
            cout << s << endl;
        }
    }

    // recur for all children of the root node
    for (auto pair: root->map)
    {
        TrieNode* child = pair.second;
        if (child) {
            printAllWords(child);
        }
    }
}

// Function to print all words in the CamelCase dictionary, which
// matches the given pattern
void findAllWords(vector<string> const &dictionary, string pattern)
{
    // base case
    if (dictionary.size() == 0) {
        return;
    }

    // Trie head node
    TrieNode* head = nullptr;

    // construct a Trie from the given dictionary
    for (string s: dictionary) {
        insert(head, s);
    }

    // search for the given pattern in the Trie
    TrieNode* curr = head;
    for (char c: pattern)
    {
        // move to the child node
        curr = curr->map[c];

        // if the given pattern is not found (reached end of a path in the Trie)
        if (curr == nullptr) {
            return;
        }
    }

    // print all words matching the given pattern
    printAllWords(curr);
}

int main()
{
    vector<string> dictionary {
        "Hi", "HiTech", "HiTechCity", "Techie", "TechieDelight",
        "Hello", "HelloWorld", "HiTechLab"
    };

    string pattern = "HT";

    findAllWords(dictionary, pattern);

    return 0;
}
```

**Output:** HiTech HiTechLab HiTechCity

##

```java
import java.util.*;

// A class to store a Trie node
class TrieNode
{
    // each node stores a map to its child nodes
    Map<Character, TrieNode> map = new HashMap<>();

    // true when the node is a leaf node
    boolean isLeaf = false;

    // collection to store a complete list of words in the leaf node
    Set<String> word = new HashSet<>();
}

class Main
{
    // Function to insert a string into a Trie
    public static TrieNode insert(TrieNode head, String word)
    {
        if (head == null) {
            head = new TrieNode();
        }

        // start from the head node
        TrieNode curr = head;
        for (char c: word.toCharArray())
        {
            // insert only uppercase characters
            if (Character.isUpperCase(c))
            {
                // create a new node if the path doesn't exist
                curr.map.putIfAbsent(c, new TrieNode());

                // go to the next node
                curr = curr.map.get(c);
            }
        }

        // mark the current node as a leaf
        curr.isLeaf = true;

        // push the current word into the set associated with a leaf node
        (curr.word).add(word);

        return head;
    }

    // Function to print all children of a given Trie node
    public static void printAllWords(TrieNode root)
    {
        // base case
        if (root == null) {
            return;
        }

        // if the current node is a leaf, print all words associated with it
        if (root.isLeaf) {
            System.out.println(root.word);
        }

        // recur for all children of the root node
        for (var pair: root.map.entrySet())
        {
            TrieNode child = pair.getValue();
            printAllWords(child);
        }
    }

    // Function to print all words in the CamelCase dictionary, which
    // matches the given pattern
    public static void findAllWords(List<String> dictionary, String pattern)
    {
        // base case
        if (dictionary.size() == 0) {
            return;
        }

        // Trie head node
        TrieNode head = null;

        // construct a Trie from the given dictionary
        for (String s: dictionary) {
            head = insert(head, s);
        }

        // search for the given pattern in the Trie
        TrieNode curr = head;
        for (char c: pattern.toCharArray())
        {
            // move to the child node
            curr = curr.map.get(c);

            // if the given pattern is not found (reached end of a path in the Trie)
            if (curr == null) {
                return;
            }
        }

        // print all words matching the given pattern
        printAllWords(curr);
    }

    public static void main(String[] args)
    {
        List<String> dictionary = null;
        dictionary = Arrays.asList("Hi", "HiTech", "HiTechCity", "Techie",
                "TechieDelight", "Hello", "HelloWorld", "HiTechLab");

        String pattern = "HT";
        findAllWords(dictionary, pattern);
    }
}
```

##

```python3
# A class to store a Trie node
class TrieNode:
    def __init__(self):
        # each node stores a dictionary to its child nodes
        self.d = {}

        # true when the node is a leaf node
        self.isLeaf = False

        # collection to store a complete list of words in the leaf node
        self.word = set()

# Function to insert a string into a Trie
def insert(head, word):
    if head is None:
        head = TrieNode()

    # start from the head node
    curr = head
    for c in word:
        # insert only uppercase characters
        if c.isupper():
            # create a new node if the path doesn't exist
            curr.d.setdefault(c, TrieNode())
            # go to the next node
            curr = curr.d[c]

    # mark the current node as a leaf
    curr.isLeaf = True

    # push the current word into the set associated with a leaf node
    curr.word.add(word)

    return head

# Function to print all children of a given Trie node
def printAllWords(root):

    # base case
    if root is None:
        return

    # if the current node is a leaf, print all words associated with it
    if root.isLeaf:
        print(root.word)

    # recur for all children of the root node
    for val in root.d.values():
        printAllWords(val)

# Function to print all words in the CamelCase dictionary, which
# matches the given pattern
def findAllWords(dictionary, pattern):

    # base case
    if not dictionary:
        return

    # Trie head node
    head = None

    # construct a Trie from the given dictionary
    for s in dictionary:
        head = insert(head, s)

    # search for the given pattern in the Trie
    curr = head
    for c in pattern:

        # if the given pattern is not found (reached end of a path in the Trie)
        if c not in curr.d:
            return

        # move to the child node
        curr = curr.d[c]

    # print all words matching the given pattern
    printAllWords(curr)

if __name__ == '__main__':

    dictionary = ['Hi', 'HiTech', 'HiTechCity', 'Techie',
                'TechieDelight', 'Hello', 'HelloWorld', 'HiTechLab']
    pattern = 'HT'

    findAllWords(dictionary, pattern)
```

The time complexity of the above solution is O(N.M), where `N` is the total number of words in the given dictionary and `M` is the maximum word length. The auxiliary space required by the program is O(N × M).

**Author:** Aditya Goel

Also See:

> [Print all pairs of anagrams in a set of strings](https://www.techiedelight.com/print-all-pairs-of-anagrams/ "Print all pairs of anagrams in a set of strings")

> [Longest Common Prefix in a given set of strings (Using Trie)](https://www.techiedelight.com/longest-common-prefix-given-set-strings-using-trie/ "Longest Common Prefix in a given set of strings \(Using Trie\)")

> [C++ Implementation of Trie Data Structure](https://www.techiedelight.com/cpp-implementation-trie-data-structure/ "C++ Implementation of Trie Data Structure")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 151

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
