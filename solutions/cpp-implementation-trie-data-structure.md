# C++ Implementation of Trie Data Structure

> Source: https://www.techiedelight.com/cpp-implementation-trie-data-structure/

This post covers the C++ implementation of the Trie data structure, which supports insertion, deletion, and search operations.

We know that Trie is a tree-based data structure used for efficient re _trie_ val of a key in a huge set of strings. In the [previous post](https://techiedelight.com/trie-implementation-insert-search-delete/), we have discussed Trie data structure and covered its C implementation. In this post, the C++ implementation of Trie data structure is discussed, which is way cleaner than the C implementation.

Following is the C++ implementation of the Trie data structure, which supports insertion, deletion, and search operations:

```
#include <iostream>
using namespace std;

// Define the character size
#define CHAR_SIZE 128

// A class to store a Trie node
class Trie
{
public:
    bool isLeaf;
    Trie* character[CHAR_SIZE];

    // Constructor
    Trie()
    {
        this->isLeaf = false;

        for (int i = 0; i < CHAR_SIZE; i++) {
            this->character[i] = nullptr;
        }
    }

    void insert(string);
    bool deletion(Trie*&, string);
    bool search(string);
    bool haveChildren(Trie const*);
};

// Iterative function to insert a key into a Trie
void Trie::insert(string key)
{
    // start from the root node
    Trie* curr = this;
    for (int i = 0; i < key.length(); i++)
    {
        // create a new node if the path doesn't exist
        if (curr->character[key[i]] == nullptr) {
            curr->character[key[i]] = new Trie();
        }

        // go to the next node
        curr = curr->character[key[i]];
    }

    // mark the current node as a leaf
    curr->isLeaf = true;
}

// Iterative function to search a key in a Trie. It returns true
// if the key is found in the Trie; otherwise, it returns false
bool Trie::search(string key)
{
    // return false if Trie is empty
    if (this == nullptr) {
        return false;
    }

    Trie* curr = this;
    for (int i = 0; i < key.length(); i++)
    {
        // go to the next node
        curr = curr->character[key[i]];

        // if the string is invalid (reached end of a path in the Trie)
        if (curr == nullptr) {
            return false;
        }
    }

    // return true if the current node is a leaf and the
    // end of the string is reached
    return curr->isLeaf;
}

// Returns true if a given node has any children
bool Trie::haveChildren(Trie const* curr)
{
    for (int i = 0; i < CHAR_SIZE; i++)
    {
        if (curr->character[i]) {
            return true;    // child found
        }
    }

    return false;
}

// Recursive function to delete a key in the Trie
bool Trie::deletion(Trie*& curr, string key)
{
    // return if Trie is empty
    if (curr == nullptr) {
        return false;
    }

    // if the end of the key is not reached
    if (key.length())
    {
        // recur for the node corresponding to the next character in the key
        // and if it returns true, delete the current node (if it is non-leaf)

        if (curr != nullptr &&
            curr->character[key[0]] != nullptr &&
            deletion(curr->character[key[0]], key.substr(1)) &&
            curr->isLeaf == false)
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

    // if the end of the key is reached
    if (key.length() == 0 && curr->isLeaf)
    {
        // if the current node is a leaf node and doesn't have any children
        if (!haveChildren(curr))
        {
            // delete the current node
            delete curr;
            curr = nullptr;

            // delete the non-leaf parent nodes
            return true;
        }

        // if the current node is a leaf node and has children
        else {
            // mark the current node as a non-leaf node (DON'T DELETE IT)
            curr->isLeaf = false;

            // don't delete its parent nodes
            return false;
        }
    }

    return false;
}

// C++ implementation of Trie data structure
int main()
{
    Trie* head = new Trie();

    head->insert("hello");
    cout << head->search("hello") << " ";      // print 1

    head->insert("helloworld");
    cout << head->search("helloworld") << " "; // print 1

    cout << head->search("helll") << " ";      // print 0 (Not found)

    head->insert("hell");
    cout << head->search("hell") << " ";       // print 1

    head->insert("h");
    cout << head->search("h");                 // print 1

    cout << endl;

    head->deletion(head, "hello");
    cout << head->search("hello") << " ";      // print 0

    cout << head->search("helloworld") << " "; // print 1
    cout << head->search("hell");              // print 1

    cout << endl;

    head->deletion(head, "h");
    cout << head->search("h") << " ";          // print 0
    cout << head->search("hell") << " ";       // print 1
    cout << head->search("helloworld");        // print 1

    cout << endl;

    head->deletion(head, "helloworld");
    cout << head->search("helloworld") << " "; // print 0
    cout << head->search("hell") << " ";       // print 1

    head->deletion(head, "hell");
    cout << head->search("hell");              // print 0

    cout << endl;

    if (head == nullptr) {
        cout << "Trie empty!!\n";              // Trie is empty now
    }

    cout << head->search("hell");              // print 0

    return 0;
}
```

**Output:** 1 1 0 1 1 0 1 1 0 1 1 0 1 0 Trie empty!! 0

The time complexity of a Trie data structure for insertion, deletion, and search operation is O(n), where `n` is the key length.

The space complexity of a Trie data structure is O(N × M × C), where `N` is the total number of strings, `M` is the maximum length of the string, and `C` is the alphabet’s size.

**Also see:**

> [Memory Efficient C++ Implementation of Trie – Insert, Search, and Delete](https://techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/)

> [Java Implementation of Trie Data Structure](https://techiedelight.com/implement-trie-data-structure-java/)

> [Trie Data Structure – Python Implementation](https://techiedelight.com/trie-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.53/5. Vote count: 78

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
