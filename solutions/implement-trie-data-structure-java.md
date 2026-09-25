# Java Implementation of Trie Data Structure

> Source: https://www.techiedelight.com/implement-trie-data-structure-java/

[Trie](https://www.techiedelight.com/Category/Trees/Trie/)

Trie is a tree-based data structure used for efficient re _trie_ val of a key in a huge word set. In this post, we will implement the Trie data structure in TypeScript.

In the [previous post](https://techiedelight.com/trie-implementation-insert-search-delete/), we discussed a Trie data structure in detail and covered its C implementation. In this post, the Trie data structure’s TypeScript implementation is discussed, which is way cleaner than the C implementation.

Following is the TypeScript implementation of the Trie data structure, which supports insertion and search operations. The implementation currently supports only lowercase English characters `(a – z)`, but we can easily extend the solution to support any set of characters.

```ts
// A class to store a Trie node
class Trie {
    // Define the alphabet size (26 characters for `a – z`)
    private static readonly CHAR_SIZE = 26;

    private isLeaf: boolean;
    private children: (Trie | null)[];

    // Constructor
    constructor() {
        this.isLeaf = false;
        this.children = new Array(Trie.CHAR_SIZE).fill(null);
    }

    // Iterative function to insert a string into a Trie
    insert(key: string): void {
        console.log(`Inserting "${key}"`);

        // start from the root node
        let curr: Trie = this;

        // do for each character of the key
        for (const c of key) {
            // create a new Trie node if the path does not exist
            if (curr.children[c.charCodeAt(0) - 'a'.charCodeAt(0)] === null) {
                curr.children[c.charCodeAt(0) - 'a'.charCodeAt(0)] = new Trie();
            }

            // go to the next node
            curr = curr.children[c.charCodeAt(0) - 'a'.charCodeAt(0)] as Trie;
        }

        // mark the current node as a leaf
        curr.isLeaf = true;
    }

    // Iterative function to search a key in a Trie. It returns true
    // if the key is found in the Trie; otherwise, it returns false
    search(key: string): boolean {
        process.stdout.write(`Searching "${key}" : `);

        let curr: Trie = this;

        // do for each character of the key
        for (const c of key) {
            // go to the next node
            curr = curr.children[c.charCodeAt(0) - 'a'.charCodeAt(0)] as Trie;

            // if the string is invalid (reached end of a path in the Trie)
            if (curr === null) {
                return false;
            }
        }

        // return true if the current node is a leaf node and the
        // end of the string is reached
        return curr.isLeaf;
    }
}

(function main() {
    // construct a new Trie node
    const head = new Trie();

    head.insert("techie");
    head.insert("techi");
    head.insert("tech");

    console.log(head.search("tech"));            // true
    console.log(head.search("techi"));           // true
    console.log(head.search("techie"));          // true
    console.log(head.search("techiedelight"));   // false

    head.insert("techiedelight");

    console.log(head.search("tech"));            // true
    console.log(head.search("techi"));           // true
    console.log(head.search("techie"));          // true
    console.log(head.search("techiedelight"));   // true
})();
```

The space complexity of a Trie data structure is O(N × M × C), where `N` is the total number of strings, `M` is the maximum length of the string, and `C` is the alphabet’s size.

The storage problem can be alleviated if we only allocate memory for alphabets in use and don’t waste space storing null pointers. Following is a memory-efficient implementation of Trie data structure in TypeScript, which uses a `Map` to store a node’s children:

```ts
// A class to store a Trie node
class Trie {
    private isLeaf: boolean;
    private children: Map<string, Trie>;

    // Constructor
    constructor() {
        this.isLeaf = false;
        this.children = new Map();
    }

    // Iterative function to insert a string into a Trie
    insert(key: string): void {
        console.log(`Inserting "${key}"`);

        // start from the root node
        let curr: Trie = this;

        // do for each character of the key
        for (const c of key) {
            // create a new node if the path doesn't exist
            if (!curr.children.has(c)) {
                curr.children.set(c, new Trie());
            }

            // go to the next node
            curr = curr.children.get(c) as Trie;
        }

        // mark the current node as a leaf
        curr.isLeaf = true;
    }

    // Iterative function to search a key in a Trie. It returns true
    // if the key is found in the Trie; otherwise, it returns false
    search(key: string): boolean {
        process.stdout.write(`Searching "${key}" : `);

        let curr: Trie = this;

        // do for each character of the key
        for (const c of key) {
            // go to the next node
            curr = curr.children.get(c) as Trie;

            // if the string is invalid (reached end of a path in the Trie)
            if (curr === null) {
                return false;
            }
        }

        // return true if the current node is a leaf node and the
        // end of the string is reached
        return curr.isLeaf;
    }
}

(function main() {
    // construct a new Trie node
    const head = new Trie();

    head.insert("techie");
    head.insert("techi");
    head.insert("tech");

    console.log(head.search("tech"));            // true
    console.log(head.search("techi"));           // true
    console.log(head.search("techie"));          // true
    console.log(head.search("techiedelight"));   // false

    head.insert("techiedelight");

    console.log(head.search("tech"));            // true
    console.log(head.search("techi"));           // true
    console.log(head.search("techie"));          // true
    console.log(head.search("techiedelight"));   // true
})();
```

**Also see:**

> [C++ Implementation of Trie Data Structure](https://techiedelight.com/cpp-implementation-trie-data-structure/)

> [Trie Data Structure – Python Implementation](https://techiedelight.com/trie-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 69

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
