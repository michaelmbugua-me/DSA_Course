# Memory Efficient C++ Implementation of Trie – Insert, Search, and Delete

> Source: https://www.techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/

[Trie](https://techiedelight.com/trie-implementation-insert-search-delete/) is a tree-based data structure, which is used for efficient re _trie_ val of a key in a large dataset of strings. In this post, we will cover memory-efficient implementation of Trie data structure in C++ using the map data structure.

There are several ways to represent tries, corresponding to different trade-offs between memory use and operations speed. The basic form is that of a linked set of nodes, where each node contains an array of child pointers, one for each symbol in the alphabet (so for the English alphabet, one would store 26 child pointers and for the alphabet of bytes, 256 pointers).

This representation is simple but wasteful in terms of memory. Each Trie node requires a kilobyte of storage, with the alphabet of bytes (size 256) and 4–byte pointers, and when there is little overlap in the strings’ prefixes, the total number of required nodes is roughly the combined length of the stored strings. Also, nodes near the bottom of the tree tend to have few children, and there are many of them, so the structure waste space storing null pointers.

The storage problem can be alleviated by using a map to store a node’s children. The idea is to allocate memory only for alphabets in use and don’t waste space storing null pointers, as demonstrated below in C++.

```
#include <iostream>
#include <unordered_map>
using namespace std;

// Data structure to store a Trie node
struct Trie
{
    // true when the node is a leaf node
    bool isLeaf;

    // each node stores a map to its child nodes
    unordered_map<char, Trie*> map;
};

// Function that returns a new Trie node
Trie* getNewTrieNode()
{
    Trie* node = new Trie;
    node->isLeaf = false;

    return node;
}

// Iterative function to insert a string into a Trie
void insert(Trie*& head, char* str)
{
    if (head == nullptr) {
        head = getNewTrieNode();
    }

    // start from the root node
    Trie* curr = head;
    while (*str)
    {
        // create a new node if the path doesn't exist
        if (curr->map.find(*str) == curr->map.end()) {
            curr->map[*str] = getNewTrieNode();
        }

        // go to the next node
        curr = curr->map[*str];

        // move to the next character
        str++;
    }

    // mark the current node as a leaf
    curr->isLeaf = true;
}

// Returns true if the given node has any children
bool haveChildren(Trie const* curr)
{
    // don't use `(curr->map).size()` to check for children

    for (auto it: curr->map)
    {
        if (it.second != nullptr) {
            return true;
        }
    }

    return false;
}

// Recursive function to delete a string from a Trie
bool deletion(Trie*& curr, char* str)
{
    // return if Trie is empty
    if (curr == nullptr) {
        return false;
    }

    // if the end of the string is not reached
    if (*str)
    {
        // recur for the node corresponding to the next character in
        // the string and if it returns true, delete the current node
        // (if it is non-leaf)
        if (curr != nullptr && curr->map.find(*str) != curr->map.end() &&
            deletion(curr->map[*str], str + 1) && curr->isLeaf == false)
        {
            if (!haveChildren(curr))
            {
                delete curr;
                curr = nullptr;
                return true;
            }
            else {
                return false;
            }
        }
    }

    // if the end of the string is reached
    if (*str == '\0' && curr->isLeaf)
    {
        // if the current node is a leaf node and doesn't have any children
        if (!haveChildren(curr))
        {
            delete curr;    // delete the current node
            curr = nullptr;
            return true;    // delete the non-leaf parent nodes
        }

        // if the current node is a leaf node and has children
        else {
            // mark the current node as a non-leaf node (DON'T DELETE IT)
            curr->isLeaf = false;
            return false;   // don't delete its parent nodes
        }
    }

    return false;
}

// Iterative function to search a string in a Trie. It returns true
// if the string is found in the Trie; otherwise, it returns false.
bool search(Trie* head, char* str)
{
    // return false if Trie is empty
    if (head == nullptr) {
        return false;
    }

    Trie* curr = head;
    while (*str)
    {
        // go to the next node
        curr = curr->map[*str];

        // if the string is invalid (reached end of a path in the Trie)
        if (curr == nullptr) {
            return false;
        }

        // move to the next character
        str++;
    }

    // return true if the current node is a leaf and the
    // end of the string is reached
    return curr->isLeaf;
}

// Memory efficient Trie implementation in C++ using Map
int main()
{
    Trie* head = nullptr;

    insert(head, "hello");
    cout << search(head, "hello") << " ";       // print 1

    insert(head, "helloworld");
    cout << search(head, "helloworld") << " ";  // print 1

    cout << search(head, "helll") << " ";       // print 0 (Not present)

    insert(head, "hell");
    cout << search(head, "hell") << " ";        // print 1

    insert(head, "h");
    cout << search(head, "h") << endl;          // print 1 + newline

    deletion(head, "hello");
    cout << search(head, "hello") << " ";       // print 0 (`hello` deleted)
    cout << search(head, "helloworld") << " ";  // print 1
    cout << search(head, "hell") << endl;       // print 1 + newline

    deletion(head, "h");
    cout << search(head, "h") << " ";           // print 0 (`h` deleted)
    cout << search(head, "hell") << " ";        // print 1
    cout << search(head, "helloworld") << endl; // print 1 + newline

    deletion(head, "helloworld");
    cout << search(head, "helloworld") << " ";  // print 0
    cout << search(head, "hell") << " ";        // print 1

    deletion(head, "hell");
    cout << search(head, "hell") << endl;       // print 0 + newline

    if (head == nullptr) {
        cout << "Trie empty!!\n";               // Trie is empty now
    }

    cout << search(head, "hell");               // print 0

    return 0;
}
```

**Output:** 1 1 0 1 1 0 1 1 0 1 1 0 1 0 Trie empty!! 0

The time complexity of a Trie data structure for insertion, deletion, and search operation is O(n), where `n` is the key length.

**Also see:**

> [Java Implementation of Trie Data Structure](https://techiedelight.com/implement-trie-data-structure-java/)

**References:** <https://en.wikipedia.org/wiki/Trie>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 57

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
