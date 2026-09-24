# Trie Data Structure – Python Implementation

> Source: https://www.techiedelight.com/trie-implementation-python/

The following post shows how to implement the Trie data structure in Python.

> [Trie Implementation in C – Insert, Search and Delete](https://techiedelight.com/trie-implementation-insert-search-delete/)

Trie is a tree-based data structure used to efficiently re _trie_ val a key in a huge set of strings. Following is the Python implementation of the Trie data structure, which supports insertion and search operations:

```
# define alphabet size (26 characters for a – z)
CHAR_SIZE = 26

# A class to store a Trie node
class Trie:
    # Constructor
    def __init__(self):
        self.isLeaf = False
        self.children = [None] * CHAR_SIZE

    # Iterative function to insert a string into a Trie
    def insert(self, key):
        print('Inserting…', key)

        # start from the root node
        curr = self

        # do for each character of the key
        for i in range(len(key)):
            index = ord(key[i]) - ord('a')
            # create a new node if the path does not exist
            if curr.children[index] is None:
                curr.children[index] = Trie()
            # go to the next node
            curr = curr.children[index]

        # mark the current node as a leaf
        curr.isLeaf = True

    # Iterative function to search a key in a Trie. It returns True
    # if the key is found in the Trie; otherwise, it returns False
    def search(self, key):
        print('Searching', key, end=': ')
        curr = self

        # do for each character of the key
        for c in key:
            # go to the next node
            index = ord(c) - ord('a')
            curr = curr.children[index]
            # if the string is invalid (reached end of a path in the Trie)
            if curr is None:
                return False

        # return true if the current node is a leaf node, and we have reached
        # the end of the string
        return curr.isLeaf

if __name__ == '__main__':

    # construct a node
    head = Trie()

    head.insert('xyz')
    print(head.search('xyz'))
```

The above implementation currently supports only lowercase English characters `a – z`, but the solution can be easily extended to support any set of characters. The space complexity of a Trie is O(N × M × C), where `N` is the total number of strings, `M` is the maximum length of the string, and `C` is the alphabet’s size.

We can resolve the storage problem if we only allocate memory for alphabets in use. Following is a memory-efficient implementation of Trie data structure in Python, which uses a Dictionary for storing children:

```
# A class to store a Trie node
class Trie:
    # Constructor
    def __init__(self):
        self.isLeaf = False
        self.children = {}

    # Iterative function to insert a string into a Trie
    def insert(self, key):
        print('Inserting…', key)

        # start from the root node
        curr = self

        # do for each character of the key
        for c in key:
            # go to the next node and create one if the path doesn't exist
            curr = curr.children.setdefault(c, Trie())

        # mark the current node as a leaf
        curr.isLeaf = True

    # Iterative function to search a key in a Trie. It returns True
    # if the key is found in the Trie; otherwise, it returns False
    def search(self, key):

        print('Searching', key, end=': ')
        curr = self

        # do for each character of the key
        for c in key:
            # go to the next node
            curr = curr.children.get(c)
            # if the string is invalid (reached end of a path in the Trie)
            if curr is None:
                return False

        # return true if the current node is a leaf node, and we have reached
        # the end of the string
        return curr.isLeaf

if __name__ == '__main__':

    # construct a node
    head = Trie()

    head.insert('xyz')
    print(head.search('xyz'))
```

**Also see:**

> [Java Implementation of Trie Data Structure](https://techiedelight.com/implement-trie-data-structure-java/)

> [C++ Implementation of Trie Data Structure](https://techiedelight.com/cpp-implementation-trie-data-structure/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
