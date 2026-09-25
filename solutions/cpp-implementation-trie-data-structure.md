# C++ Implementation of Trie Data Structure

> Source: https://www.techiedelight.com/cpp-implementation-trie-data-structure/

This post covers the TypeScript implementation of the Trie data structure, which supports insertion, deletion, and search operations.

We know that Trie is a tree-based data structure used for efficient re _trie_ val of a key in a huge set of strings. In the [previous post](https://techiedelight.com/trie-implementation-insert-search-delete/), we have discussed Trie data structure and covered its C implementation. In this post, the C++ implementation of Trie data structure is discussed, which is way cleaner than the C implementation.

Following is the TypeScript implementation of the Trie data structure, which supports insertion, deletion, and search operations:

```ts
// Define the character size
const CHAR_SIZE = 128;

// A class to store a Trie node
class Trie
{
    isLeaf: boolean;
    character: (Trie | null)[];

    // Constructor
    constructor()
    {
        this.isLeaf = false;
        this.character = new Array<Trie | null>(CHAR_SIZE).fill(null);
    }

    // Iterative function to insert a key into a Trie
    insert(key: string): void
    {
        // start from the root node
        let curr: Trie = this;
        for (let i = 0; i < key.length; i++)
        {
            // create a new node if the path doesn't exist
            if (curr.character[key.charCodeAt(i)] == null) {
                curr.character[key.charCodeAt(i)] = new Trie();
            }

            // go to the next node
            curr = curr.character[key.charCodeAt(i)]!;
        }

        // mark the current node as a leaf
        curr.isLeaf = true;
    }

    // Iterative function to search a key in a Trie. It returns true
    // if the key is found in the Trie; otherwise, it returns false
    search(key: string): boolean
    {
        // return false if Trie is empty
        if (!this) {
            return false;
        }

        let curr: Trie | null = this;
        for (let i = 0; i < key.length; i++)
        {
            // go to the next node
            curr = curr!.character[key.charCodeAt(i)];

            // if the string is invalid (reached end of a path in the Trie)
            if (curr == null) {
                return false;
            }
        }

        // return true if the current node is a leaf and the
        // end of the string is reached
        return curr!.isLeaf;
    }

    // Returns true if a given node has any children
    haveChildren(curr: Trie): boolean
    {
        for (let i = 0; i < CHAR_SIZE; i++)
        {
            if (curr.character[i]) {
                return true;    // child found
            }
        }

        return false;
    }

    // Recursive function to delete a key in the Trie. It returns true
    // if the given node should be deleted, so the caller can drop its
    // reference to it
    deletion(curr: Trie | null, key: string): boolean
    {
        // return if Trie is empty
        if (curr == null) {
            return false;
        }

        // if the end of the key is not reached
        if (key.length)
        {
            // recur for the node corresponding to the next character in the key
            // and if it returns true, delete the current node (if it is non-leaf)

            if (curr.character[key.charCodeAt(0)] != null &&
                this.deletion(curr.character[key.charCodeAt(0)]!, key.slice(1)) &&
                curr.isLeaf === false)
            {
                // delete the child node removed by the recursion
                curr.character[key.charCodeAt(0)] = null;

                if (!this.haveChildren(curr))
                {
                    // delete the current node (the caller drops its reference)
                    return true;
                }
                else {
                    return false;
                }
            }
        }

        // if the end of the key is reached
        if (key.length === 0 && curr.isLeaf)
        {
            // if the current node is a leaf node and doesn't have any children
            if (!this.haveChildren(curr))
            {
                // delete the current node (the caller drops its reference)

                // delete the non-leaf parent nodes
                return true;
            }

            // if the current node is a leaf node and has children
            else {
                // mark the current node as a non-leaf node (DON'T DELETE IT)
                curr.isLeaf = false;

                // don't delete its parent nodes
                return false;
            }
        }

        return false;
    }
}

// TypeScript implementation of Trie data structure
let head: Trie | null = new Trie();

head.insert("hello");
console.log(head.search("hello"));            // print 1

head.insert("helloworld");
console.log(head.search("helloworld"));       // print 1

console.log(head.search("helll"));            // print 0 (Not found)

head.insert("hell");
console.log(head.search("hell"));             // print 1

head.insert("h");
console.log(head.search("h"));                // print 1

head.deletion(head, "hello");
console.log(head?.search("hello"));           // print 0

console.log(head?.search("helloworld"));      // print 1
console.log(head?.search("hell"));            // print 1

head.deletion(head, "h");
console.log(head?.search("h"));               // print 0
console.log(head?.search("hell"));            // print 1
console.log(head?.search("helloworld"));      // print 1

head.deletion(head, "helloworld");
console.log(head?.search("helloworld"));      // print 0
console.log(head?.search("hell"));            // print 1

if (head.deletion(head, "hell")) {
    head = null;                              // the Trie is now empty
}

console.log(head?.search("hell") ?? false);   // print 0

if (head === null) {
    console.log("Trie empty!!");              // Trie is empty now
}

console.log(head?.search("hell") ?? false);   // print 0
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
