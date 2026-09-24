# Trie Implementation in C – Insert, Search and Delete

> Source: https://www.techiedelight.com/trie-implementation-insert-search-delete/

[Trie](https://www.techiedelight.com/Category/Trees/Trie/)

Implement insert, search, and delete operations on Trie data structure. Assume that the input consists of only lowercase letters `a–z`.

## Overview of Trie

**Trie** is a tree-based data structure, which is used for efficient re _trie_ val of a key in a large dataset of strings. Unlike a binary search tree, where a node stores the key associated with that node, the Trie node’s position in the tree defines the key with which it is associated, and the key is only associated with the leaves. It is also known as a prefix tree as all descendants of a node have a common prefix of the string associated with that node, and the root is associated with the empty string.

## Representation of Trie

There are several ways to represent a Trie, corresponding to different trade-offs between memory use and operations speed. The basic form is that of a linked set of nodes, where each node contains an array of child pointers, one for each symbol in the alphabet (so for the English alphabet, one would store 26 child pointers and for the alphabet of bytes, 256 pointers). The Trie node also maintains a flag that specifies whether it corresponds to the key’s end or not.

As illustrated in the following figure, each key is represented in the Trie as a path from the root to the internal node or a leaf:

## Implementation of Trie

**Insertion** proceeds by walking the Trie according to the string to be inserted, then appending new nodes for the suffix of the string that is not contained in the Trie. **Searching** also proceeds the similar way by walking the Trie according to the string to be searched, returning false if the string is not found. **Deletion** is a bit complicated. The idea is to delete the key in a bottom-up manner using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). Special care has to be taken while deleting the key as it can be the prefix of another key, or its prefix can be another key in Trie.

Following is the C implementation of the Trie data structure, which supports insertion, deletion, and search operations. The implementation currently supports only lowercase English characters `(a – z)`, but it can be easily extended to support any set of characters.

```
#include <stdio.h>
#include <stdlib.h>

// Define the character size
#define CHAR_SIZE 26

// Data structure to store a Trie node
struct Trie
{
    int isLeaf;             // 1 when the node is a leaf node
    struct Trie* character[CHAR_SIZE];
};

// Function that returns a new Trie node
struct Trie* getNewTrieNode()
{
    struct Trie* node = (struct Trie*)malloc(sizeof(struct Trie));
    node->isLeaf = 0;

    for (int i = 0; i < CHAR_SIZE; i++) {
        node->character[i] = NULL;
    }

    return node;
}

// Iterative function to insert a string into a Trie
void insert(struct Trie *head, char* str)
{
    // start from the root node
    struct Trie* curr = head;
    while (*str)
    {
        // create a new node if the path doesn't exist
        if (curr->character[*str - 'a'] == NULL) {
            curr->character[*str - 'a'] = getNewTrieNode();
        }

        // go to the next node
        curr = curr->character[*str - 'a'];

        // move to the next character
        str++;
    }

    // mark the current node as a leaf
    curr->isLeaf = 1;
}

// Iterative function to search a string in a Trie. It returns 1
// if the string is found in the Trie; otherwise, it returns 0.
int search(struct Trie* head, char* str)
{
    // return 0 if Trie is empty
    if (head == NULL) {
        return 0;
    }

    struct Trie* curr = head;
    while (*str)
    {
        // go to the next node
        curr = curr->character[*str - 'a'];

        // if the string is invalid (reached end of a path in the Trie)
        if (curr == NULL) {
            return 0;
        }

        // move to the next character
        str++;
    }

    // return 1 if the current node is a leaf and the
    // end of the string is reached
    return curr->isLeaf;
}

// Returns 1 if a given Trie node has any children
int hasChildren(struct Trie* curr)
{
    for (int i = 0; i < CHAR_SIZE; i++)
    {
        if (curr->character[i]) {
            return 1;       // child found
        }
    }

    return 0;
}

// Recursive function to delete a string from a Trie
int deletion(struct Trie **curr, char* str)
{
    // return 0 if Trie is empty
    if (*curr == NULL) {
        return 0;
    }

    // if the end of the string is not reached
    if (*str)
    {
        // recur for the node corresponding to the next character in
        // the string and if it returns 1, delete the current node
        // (if it is non-leaf)
        if (*curr != NULL && (*curr)->character[*str - 'a'] != NULL &&
            deletion(&((*curr)->character[*str - 'a']), str + 1) &&
            (*curr)->isLeaf == 0)
        {
            if (!hasChildren(*curr))
            {
                free(*curr);
                (*curr) = NULL;
                return 1;
            }
            else {
                return 0;
            }
        }
    }

    // if the end of the string is reached
    if (*str == '\0' && (*curr)->isLeaf)
    {
        // if the current node is a leaf node and doesn't have any children
        if (!hasChildren(*curr))
        {
            free(*curr);    // delete the current node
            (*curr) = NULL;
            return 1;       // delete the non-leaf parent nodes
        }

        // if the current node is a leaf node and has children
        else {
            // mark the current node as a non-leaf node (DON'T DELETE IT)
            (*curr)->isLeaf = 0;
            return 0;       // don't delete its parent nodes
        }
    }

    return 0;
}

// Trie implementation in C – Insertion, Searching, and Deletion
int main()
{
    struct Trie* head = getNewTrieNode();

    insert(head, "hello");
    printf("%d ", search(head, "hello"));       // print 1

    insert(head, "helloworld");
    printf("%d ", search(head, "helloworld"));  // print 1

    printf("%d ", search(head, "helll"));       // print 0 (Not present)

    insert(head, "hell");
    printf("%d ", search(head, "hell"));        // print 1

    insert(head, "h");
    printf("%d \n", search(head, "h"));         // print 1 + newline

    deletion(&head, "hello");
    printf("%d ", search(head, "hello"));       // print 0 (hello deleted)
    printf("%d ", search(head, "helloworld"));  // print 1
    printf("%d \n", search(head, "hell"));      // print 1 + newline

    deletion(&head, "h");
    printf("%d ", search(head, "h"));           // print 0 (h deleted)
    printf("%d ", search(head, "hell"));        // print 1
    printf("%d\n", search(head, "helloworld")); // print 1 + newline

    deletion(&head, "helloworld");
    printf("%d ", search(head, "helloworld"));  // print 0
    printf("%d ", search(head, "hell"));        // print 1

    deletion(&head, "hell");
    printf("%d\n", search(head, "hell"));       // print 0 + newline

    if (head == NULL) {
        printf("Trie empty!!\n");               // Trie is empty now
    }

    printf("%d ", search(head, "hell"));        // print 0

    return 0;
}
```

**Output:** 1 1 0 1 1 0 1 1 0 1 1 0 1 0 Trie empty!! 0

## Performance of Trie

The time complexity of a Trie data structure for insertion/deletion/search operation is just O(n), where `n` is key length.

The space complexity of a Trie data structure is O(N × M × C), where `N` is the total number of strings, `M` is the maximum length of the string, and `C` is the alphabet’s size. Please refer to the following post for a memory-efficient implementation of the Trie:

> [Memory Efficient C++ Implementation of Trie – Insert, Search, and Delete](https://techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/)

## Applications of Trie

Numerous Trie data structure applications take advantage of a Trie’s ability to quickly search, insert, and delete entries.

⮚ As a replacement for other data structures

Trie has several advantages over [binary search trees](https://techiedelight.com/binary-search-tree-bst-interview-questions/). It can also replace a hash table as lookup is generally faster in the Trie, even in the worst case. Also, there are no collisions of different keys in a Trie, and a Trie can provide an alphabetical ordering of the entries by key.

⮚ Autocomplete / Dictionary

A Trie’s common application is storing a predictive text or autocomplete dictionaries, such as found on a mobile telephone or search engines. Autocomplete (or word completion) is a feature in which an application predicts the rest of a word the user is typing.

⮚ Spell checker

The spell checker flags words in a document that may not be spelled correctly. Spell checkers are commonly used in word processors (like MS Word), email clients, search engines, etc.

⮚ Lexicographic sorting of a set of keys

[Lexicographic sorting of a set of keys](https://techiedelight.com/lexicographic-sorting-given-set-of-keys/) can be accomplished with a simple Trie-based algorithm. We initially insert all keys into a Trie and then print all keys in the Trie by performing [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) (depth–first traversal), resulting in a lexicographically increasing order.

⮚ Longest prefix matching

Routers use the [longest prefix](https://techiedelight.com/longest-common-prefix-given-set-strings-using-trie/) match algorithm in Internet Protocol (IP) networking to select an entry from a forwarding table.

**Also see:**

> [C++ Implementation of Trie Data Structure](https://techiedelight.com/cpp-implementation-trie-data-structure/)

> [Java Implementation of Trie Data Structure](https://techiedelight.com/implement-trie-data-structure-java/)

> [Trie Data Structure – Python Implementation](https://techiedelight.com/trie-implementation-python/)

**References:** <https://en.wikipedia.org/wiki/Trie>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 80

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
