# Find first `k` maximum occurring words in a given set of strings

> Source: https://www.techiedelight.com/find-first-k-maximum-occurring-words-given-set-strings/

Given a huge set of words with duplicates present and a positive integer `k`, find the first k–maximum occurring words in it.

For example,

**Input:** keys = [code, coder, coding, codable, codec, codecs, coded, codeless, codec, codecs, codependence, codex, codify, codependents, codes, code, coder, codesign, codec, codeveloper, codrive, codec, codecs, codiscovered] k = 4 **Output:** codec occurs 4 times codecs occurs 3 times code occurs 2 times coder occurs 2 times

The idea is to use [Trie (Prefix Tree)](https://techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/) to solve this problem. Start by inserting each key into the Trie and store its count so far (along with the key itself) in the leaf nodes. After all keys are inserted into the trie, perform its [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) ([Depth–first search](https://techiedelight.com/depth-first-search/)) and insert all key’s count into a [max-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). Then the problem is reduced to removing the first `k` elements from the max-heap.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <queue>
#include <unordered_map>
using namespace std;

// Data structure to store a Trie node
struct Trie
{
    // `count` and `key` will be set only for leaf nodes
    // `key` stores the string, and `count` stores its frequency so far
    int count;
    string key;

    // each node stores a map to its child nodes
    unordered_map<char, Trie*> character;
};

// Data structure to store a heap node
struct Node
{
    string key;
    int count;
};

// Comparison object used to order the max-heap
struct comp
{
    bool operator()(const Node &lhs, const Node &rhs) const {
        return lhs.count < rhs.count;
    }
};

// Function that returns a new Trie node
Trie* getNewTrieNode()
{
    Trie* node = new Trie;
    node->count = 0;

    return node;
}

// Iterative function to insert a string into a Trie
void insert(Trie*& head, string str)
{
    // start from the root node
    Trie* curr = head;

    for (char ch: str)
    {
        // create a new node if the path doesn't exist
        if (curr->character.find(ch) == curr->character.end()) {
            curr->character[ch] = getNewTrieNode();
        }

        // go to the next node
        curr = curr->character[ch];
    }

    // store key and its count in leaf nodes
    curr->key = str;
    curr->count += 1;
}

// Function to perform preorder traversal on Trie and insert
// each distinct key along with its count in max-heap
bool preorder(Trie* curr, auto &pq)
{
    // base condition
    if (curr == nullptr) {
        return false;
    }

    for (auto it: curr->character)
    {
        // if a leaf node is reached (leaf nodes have a non-zero count),
        // push the key with its frequency in max-heap
        if (it.second->count) {
            pq.push({ it.second->key, it.second->count });
        }

        // recur for current node's children
        preorder(it.second, pq);
    }
}

// Function to find first k–maximum occurring words in a given
// list of strings
void findKfrequentWords(string dict[], int n, int k)
{
    // insert all keys into a Trie and maintain each key
    // frequency in Trie's leaf nodes
    Trie* head = getNewTrieNode();
    for (int i = 0; i < n; i++) {
        insert(head, dict[i]);
    }

    // create an empty max-heap
    priority_queue<Node, vector<Node>, comp> pq;

    // perform preorder traversal on given Trie and push each
    // unique key with its frequency in max-heap
    preorder(head, pq);

    // run till max-heap becomes empty or `k` keys are printed
    while (k-- && !pq.empty())
    {
        // extract the maximum node from the max-heap
        Node max = pq.top();
        pq.pop();

        // print the maximum occurring element with its count
        cout << max.key << " occurs " << max.count << " times\n";
    }
}

int main()
{
    // given set of keys
    string dict[] =
    {
        "code", "coder", "coding", "codable", "codec", "codecs", "coded",
        "codeless", "codec", "codecs", "codependence", "codex", "codify",
        "codependents", "codes", "code", "coder", "codesign", "codec",
        "codeveloper", "codrive", "codec", "codecs", "codiscovered"
    };

    int k = 4;

    // total number of keys
    int n = sizeof(dict)/sizeof(dict[0]);

    findKfrequentWords(dict, n, k);

    return 0;
}
```

##

```java
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

// A class to store a Trie node
class Trie
{
    // `count` and `key` will be set only for leaf nodes
    // `key` stores the string, and `count` stores its frequency so far
    int count = 0;
    String key = null;

    // each node stores a map to its child nodes
    Map<Character, Trie> character = new HashMap<>();
}

// A class to store a heap node
class Node implements Comparable
{
    String key;
    int count;

    // constructor
    Node(String key, int count)
    {
        this.key = key;
        this.count = count;
    }

    @Override
    public int compareTo(Object o)
    {
        Node node = (Node)o;
        return count - node.count;
    }
}

class Main
{
    // Iterative function to insert a string into a Trie
    private static void insert(Trie head, String str)
    {
        // start from the root node
        Trie curr = head;

        for (char c: str.toCharArray())
        {
            // create a new node if the path doesn't exist
            curr.character.putIfAbsent(c, new Trie());

            // go to the next node
            curr = curr.character.get(c);
        }

        // store key and its count in leaf nodes
        curr.key = str;
        curr.count += 1;
    }

    // Function to perform preorder traversal on Trie and insert
    // each distinct key along with its count in max-heap
    private static void preorder(Trie curr, PriorityQueue<Node> pq)
    {
        // base condition
        if (curr == null) {
            return;
        }

        for (var entry: curr.character.entrySet())
        {
            // if a leaf node is reached (leaf nodes have a non-zero count),
            // push the key with its frequency in max-heap
            if (entry.getValue().count != 0) {
                pq.add(new Node(entry.getValue().key, entry.getValue().count));
            }

            // recur for current node's children
            preorder(entry.getValue(), pq);
        }
    }

    // Function to find first k–maximum occurring words in a given
    // list of strings
    public static void findKfrequentWords(String[] dict, int k)
    {
        // insert all keys into a Trie and maintain each key
        // frequency in Trie's leaf nodes
        Trie head = new Trie();
        for (String word: dict) {
            insert(head, word);
        }

        // create an empty max-heap
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.reverseOrder());

        // perform preorder traversal on given Trie and push each
        // unique key with its frequency in max-heap
        preorder(head, pq);

        // run till max-heap becomes empty or `k` keys are printed
        while (k-- > 0 && !pq.isEmpty())
        {
            // extract the maximum node from the max-heap
            Node max = pq.poll();

            // print the maximum occurring element with its count
            System.out.println(max.key + " occurs " + max.count + " times");
        }
    }

    public static void main (String[] args)
    {
        // given set of keys
        String[] dict =
        {
            "code", "coder", "coding", "codable", "codec", "codecs", "coded",
            "codeless", "codec", "codecs", "codependence", "codex", "codify",
            "codependents", "codes", "code", "coder", "codesign", "codec",
            "codeveloper", "codrive", "codec", "codecs", "codiscovered"
        };

        int k = 4;

        findKfrequentWords(dict, k);
    }
}
```

##

```python3
import heapq
from heapq import heappop, heappush

# A class to store a Trie node
class Trie:
    def __init__(self):
        # `count` and `key` will be set only for leaf nodes
        self.count = 0

        # `key` stores the string, and `count` stores its frequency so far
        self.key = None

        # each node stores a dictionary to its child nodes
        self.character = {}

# A class to store a heap node
class Node:
    def __init__(self, key, count):
        self.key = key
        self.count = count

    # Override the __lt__() function to make Node class work with max-heap
    def __lt__(self, other):
        return self.count > other.count

# Iterative function to insert a string into a Trie
def insert(head, s):

    # start from the root node
    curr = head

    for c in s:
        # create a new node if the path doesn't exist
        curr.character.setdefault(c, Trie())

        # go to the next node
        curr = curr.character[c]

    # store key and its count in leaf nodes
    curr.key = s
    curr.count += 1

# Function to perform preorder traversal on Trie and insert
# each distinct key along with its count in max-heap
def preorder(curr, pq):

    # base condition
    if not curr:
        return

    for value in curr.character.values():

        # if a leaf node is reached (leaf nodes have a non-zero count),
        # push the key with its frequency in max-heap
        if value.count:
            heappush(pq, Node(value.key, value.count))

        # recur for current node's children
        preorder(value, pq)

# Function to find first k–maximum occurring words in a given list of strings
def find_k_frequent_words(words, k):

    # insert all keys into a Trie and maintain each key
    # frequency in Trie's leaf nodes
    head = Trie()
    for word in words:
        insert(head, word)

    # create an empty max-heap
    pq = []

    # perform preorder traversal on given Trie and push each
    # unique key with its frequency in max-heap
    preorder (head, pq)

    # run till max-heap becomes empty or `k` keys are printed
    while k > 0 and pq:

        # extract the maximum node from the max-heap
        max = heappop(pq)

        # print the maximum occurring element with its count
        print(f'{max.key} occurs {max.count} times')

        k = k - 1

if __name__ == '__main__':

    # given set of keys
    words = [
        'code', 'coder', 'coding', 'codable', 'codec', 'codecs', 'coded',
        'codeless', 'codec', 'codecs', 'codependence', 'codex', 'codify',
        'codependents', 'codes', 'code', 'coder', 'codesign', 'codec',
        'codeveloper', 'codrive', 'codec', 'codecs', 'codiscovered'
    ]

    k = 4
    find_k_frequent_words(words, k)
```

**Output:** codec occurs 4 times codecs occurs 3 times code occurs 2 times coder occurs 2 times

The time complexity of the above solution is O(N.M), where `N` is the total number of given words and `M` is the maximum word length. The auxiliary space required by the program is O(N × M).

**Related Post:**

> [Find the maximum occurring word in a given set of strings](https://techiedelight.com/find-maximum-occurring-word-given-set-strings/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
