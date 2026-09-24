# Longest Common Prefix in a given set of strings (Using Trie)

> Source: https://www.techiedelight.com/longest-common-prefix-given-set-strings-using-trie/

Find the longest common prefix (LCP) in a given set of strings.

For example,

**Input:** keys = [codable, code, coder, coding] **Output:** The longest common prefix is cod

> 

In the below post, we have discussed a solution using the divide-and-conquer technique to solve the LCP problem. In this post, a [Trie](https://techiedelight.com/trie-implementation-insert-search-delete/)-based solution is discussed.

> [Longest Common Prefix (LCP) Problem](https://techiedelight.com/find-longest-common-prefix-lcp-strings/)

Since all descendants of a Trie node have a common prefix of the string associated with that node, Trie (Prefix Tree) is the best data structure for this problem. We start by inserting all keys into the Trie. Then traverse the Trie until we find a leaf node or node with more than one child. All characters in the Trie path form the longest common prefix. For example,

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
using namespace std;

// Data structure to store a Trie node
struct Trie
{
    bool isLeaf;    // set when the node is a leaf node
    unordered_map<char, Trie*> character;

    // Constructor
    Trie() {
        isLeaf = false;
    }
};

// Iterative function to insert a string into a Trie
void insert(Trie* const &head, string const &str)
{
    // start from the root node
    Trie* curr = head;

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

// Function to find the longest common prefix
string findLCP(vector<string> const &dict)
{
    // insert all keys into a Trie
    Trie* head = new Trie();
    for (string s: dict) {
        insert(head, s);
    }

    // traverse the Trie and find the longest common prefix

    string lcp;
    Trie* curr = head;

    // loop until we find a leaf node or a node has more than 1 child
    while (curr && !curr->isLeaf && (curr->character.size() == 1))
    {
        // get an iterator to the only child
        auto it = curr->character.begin();

        // append current char to LCP
        lcp += it->first;

        // update `curr` pointer to the child node
        curr = it->second;
    }

    return lcp;
}

int main()
{
    // given set of keys
    vector<string> dict =
    {
        "code", "coder", "coding", "codable", "codec", "codecs", "coded",
        "codeless", "codependence", "codependency", "codependent",
        "codependents", "codes", "codesign", "codesigned", "codeveloped",
        "codeveloper", "codex", "codify", "codiscovered", "codrive"
    };

    cout << "The longest common prefix is " << findLCP(dict);

    return 0;
}
```

**Output:** The longest common prefix is cod

##

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// A class to store a Trie node
class TrieNode
{
    boolean isLeaf = false;    // set when the node is a leaf node
    Map<Character, TrieNode> character = new HashMap<>();
}

class Main
{
    // Iterative function to insert a string into a Trie
    private static void insert(TrieNode head, String str)
    {
        // start from the root node
        TrieNode curr = head;

        for (char c: str.toCharArray())
        {
            // create a new node if the path doesn't exist
            curr.character.putIfAbsent(c, new TrieNode());

            // go to the next node
            curr = curr.character.get(c);
        }

        curr.isLeaf = true;
    }

    // Function to find the longest common prefix
    public static String findLCP(List<String> dict)
    {
        // insert all keys into a Trie
        TrieNode head = new TrieNode();
        for (String s: dict) {
            insert(head, s);
        }

        // traverse the Trie and find the longest common prefix

        StringBuilder lcp = new StringBuilder();
        TrieNode curr = head;

        // loop until we find a leaf node or a node has more than 1 child
        while (curr != null && !curr.isLeaf && (curr.character.size() == 1))
        {
            for (var entry: curr.character.entrySet())
            {
                // append current char to LCP
                lcp.append(entry.getKey());

                // update `curr` pointer to the child node
                curr = entry.getValue();
            }
        }

        return lcp.toString();
    }

    public static void main (String[] args)
    {
        // given set of keys
        List<String> dict = Arrays.asList(
                "code", "coder", "coding", "codable", "codec", "codecs", "coded",
                "codeless", "codependence", "codependency", "codependent",
                "codependents", "codes", "codesign", "codesigned", "codeveloped",
                "codeveloper", "codex", "codify", "codiscovered", "codrive"
        );

        System.out.println("The longest common prefix is " + findLCP(dict));
    }
}
```

##

```python3
# A class to store a Trie node
class TrieNode:
    def __init__(self):
        self.isLeaf = False        # set when the node is a leaf node
        self.character = {}

# Iterative function to insert a string into a Trie
def insert(head, s):

    # start from the root node
    curr = head

    for c in s:
        # go to the next node and create a new node if the path doesn't exist
        curr = curr.character.setdefault(c, TrieNode())

    curr.isLeaf = True

# Function to find the longest common prefix
def findLCP(words):

    # insert all keys into a Trie
    head = TrieNode()
    for s in words:
        insert(head, s)

    # traverse the Trie and find the longest common prefix

    lcp = ''
    curr = head

    # loop until we find a leaf node or a node has more than 1 child
    while curr and not curr.isLeaf and len(curr.character) == 1:

        for k, v in curr.character.items():
            # append current char to LCP
            lcp += k

            # update `curr` pointer to the child node
            curr = v

    return lcp

if __name__ == '__main__':

    # given set of keys
    words = [
        'code', 'coder', 'coding', 'codable', 'codec', 'codecs', 'coded',
        'codeless', 'codependence', 'codependency', 'codependent',
        'codependents', 'codes', 'codesign', 'codesigned', 'codeveloped',
        'codeveloper', 'codex', 'codify', 'codiscovered', 'codrive'
    ]

    print('longest common prefix is:', findLCP(words))
```

The time complexity of the above solution is O(N.M), where `N` is the total number of given words and `M` is the maximum word length. The auxiliary space required by the program is O(N × M).

Also See:

> [C++ Implementation of Trie Data Structure](https://www.techiedelight.com/cpp-implementation-trie-data-structure/ "C++ Implementation of Trie Data Structure")

> [Trie Implementation in C – Insert, Search and Delete](https://www.techiedelight.com/trie-implementation-insert-search-delete/ "Trie Implementation in C – Insert, Search and Delete")

> [Memory Efficient C++ Implementation of Trie – Insert, Search, and Delete](https://www.techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/ "Memory Efficient C++ Implementation of Trie – Insert, Search, and Delete")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 176

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
