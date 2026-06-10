# Memory-Efficient TypeScript Implementation of Trie – Insert, Search, and Delete

> Source: https://www.techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/

[Trie](https://techiedelight.com/trie-implementation-insert-search-delete/) is a tree-based data structure, which is used for efficient re _trie_ val of a key in a large dataset of strings. In this post, we will cover memory-efficient implementation of Trie data structure in TypeScript using the map data structure.

There are several ways to represent tries, corresponding to different trade-offs between memory use and operations speed. The basic form is that of a linked set of nodes, where each node contains an array of child pointers, one for each symbol in the alphabet (so for the English alphabet, one would store 26 child pointers and for the alphabet of bytes, 256 pointers).

This representation is simple but wasteful in terms of memory. Each Trie node requires a kilobyte of storage, with the alphabet of bytes (size 256) and 4–byte pointers, and when there is little overlap in the strings’ prefixes, the total number of required nodes is roughly the combined length of the stored strings. Also, nodes near the bottom of the tree tend to have few children, and there are many of them, so the structure waste space storing null pointers.

The storage problem can be alleviated by using a map to store a node’s children. The idea is to allocate memory only for alphabets in use and don’t waste space storing null pointers, as demonstrated below in TypeScript.

```ts
// Data structure to store a Trie node
class Trie {
    // true when the node is a leaf node
    isLeaf: boolean;

    // each node stores a map to its child nodes
    children: Map<string, Trie>;

    constructor() {
        this.isLeaf = false;
        this.children = new Map();
    }
}

// Function that returns a new Trie node
function getNewTrieNode(): Trie {
    const node = new Trie();
    node.isLeaf = false;

    return node;
}

// Iterative function to insert a string into a Trie
function insert(head: Trie | null, str: string): Trie {
    if (head === null) {
        head = getNewTrieNode();
    }

    // start from the root node
    let curr: Trie = head;
    for (const c of str) {
        // create a new node if the path doesn't exist
        if (!curr.children.has(c)) {
            curr.children.set(c, getNewTrieNode());
        }

        // go to the next node
        curr = curr.children.get(c) as Trie;
    }

    // mark the current node as a leaf
    curr.isLeaf = true;

    return head;
}

// Returns true if the given node has any children
function haveChildren(curr: Trie): boolean {
    // don't use `(curr.children).size` to check for children

    for (const child of curr.children.values()) {
        if (child !== null) {
            return true;
        }
    }

    return false;
}

// Recursive function to delete a string from a Trie.
// Returns the (possibly new) subtree root — null when the subtree is deleted
function deletion(curr: Trie | null, str: string): Trie | null {
    // return if Trie is empty
    if (curr === null) {
        return null;
    }

    // if the end of the string is not reached
    if (str.length > 0) {
        // recur for the node corresponding to the next character in
        // the string; if the child is deleted, remove it from the map
        const c = str[0];
        if (curr.children.has(c) && deletion(curr.children.get(c) as Trie, str.slice(1)) === null) {
            curr.children.delete(c);

            // delete the current node (if it is non-leaf)
            if (curr.isLeaf === false) {
                if (!haveChildren(curr)) {
                    return null;    // delete the non-leaf parent nodes
                }
                else {
                    return curr;
                }
            }
        }
    }

    // if the end of the string is reached
    if (str.length === 0 && curr.isLeaf) {
        // if the current node is a leaf node and doesn't have any children
        if (!haveChildren(curr)) {
            return null;    // delete the non-leaf parent nodes
        }

        // if the current node is a leaf node and has children
        else {
            // mark the current node as a non-leaf node (DON'T DELETE IT)
            curr.isLeaf = false;
            return curr;   // don't delete its parent nodes
        }
    }

    return curr;
}

// Iterative function to search a string in a Trie. It returns true
// if the string is found in the Trie; otherwise, it returns false.
function search(head: Trie | null, str: string): boolean {
    // return false if Trie is empty
    if (head === null) {
        return false;
    }

    let curr: Trie | null = head;
    for (const c of str) {
        // go to the next node
        curr = curr.children.get(c) ?? null;

        // if the string is invalid (reached end of a path in the Trie)
        if (curr === null) {
            return false;
        }
    }

    // return true if the current node is a leaf and the
    // end of the string is reached
    return curr.isLeaf;
}

// Memory efficient Trie implementation in TypeScript using Map
let head: Trie | null = null;

head = insert(head, "hello");
process.stdout.write(`${Number(search(head, "hello"))} `);       // print 1

head = insert(head, "helloworld");
process.stdout.write(`${Number(search(head, "helloworld"))} `);  // print 1

process.stdout.write(`${Number(search(head, "helll"))} `);       // print 0 (Not present)

head = insert(head, "hell");
process.stdout.write(`${Number(search(head, "hell"))} `);        // print 1

head = insert(head, "h");
console.log(Number(search(head, "h")));                          // print 1 + newline

head = deletion(head, "hello");
process.stdout.write(`${Number(search(head, "hello"))} `);       // print 0 (`hello` deleted)
process.stdout.write(`${Number(search(head, "helloworld"))} `);  // print 1
console.log(Number(search(head, "hell")));                       // print 1 + newline

head = deletion(head, "h");
process.stdout.write(`${Number(search(head, "h"))} `);           // print 0 (`h` deleted)
process.stdout.write(`${Number(search(head, "hell"))} `);        // print 1
console.log(Number(search(head, "helloworld")));                 // print 1 + newline

head = deletion(head, "helloworld");
process.stdout.write(`${Number(search(head, "helloworld"))} `);  // print 0
process.stdout.write(`${Number(search(head, "hell"))} `);        // print 1

head = deletion(head, "hell");
console.log(Number(search(head, "hell")));                       // print 0 + newline

if (head === null) {
    console.log("Trie empty!!");                                 // Trie is empty now
}

console.log(Number(search(head, "hell")));                       // print 0
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
