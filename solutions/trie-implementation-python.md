# Trie Data Structure – Python Implementation

> Source: https://www.techiedelight.com/trie-implementation-python/

The following post shows how to implement the Trie data structure in TypeScript.

> [Trie Implementation in C – Insert, Search and Delete](https://techiedelight.com/trie-implementation-insert-search-delete/)

Trie is a tree-based data structure used to efficiently re _trie_ val a key in a huge set of strings. Following is the TypeScript implementation of the Trie data structure, which supports insertion and search operations:

```ts
// define alphabet size (26 characters for a – z)
const CHAR_SIZE = 26;

// A class to store a Trie node
class Trie {
    isLeaf: boolean;
    children: (Trie | null)[];

    // Constructor
    constructor() {
        this.isLeaf = false;
        this.children = new Array<Trie | null>(CHAR_SIZE).fill(null);
    }

    // Iterative function to insert a string into a Trie
    insert(key: string): void {
        console.log('Inserting…', key);

        // start from the root node
        let curr: Trie = this;

        // do for each character of the key
        for (let i = 0; i < key.length; i++) {
            const index = key.charCodeAt(i) - 'a'.charCodeAt(0);
            // create a new node if the path does not exist
            if (curr.children[index] === null) {
                curr.children[index] = new Trie();
            }
            // go to the next node
            curr = curr.children[index]!;
        }

        // mark the current node as a leaf
        curr.isLeaf = true;
    }

    // Iterative function to search a key in a Trie. It returns true
    // if the key is found in the Trie; otherwise, it returns false
    search(key: string): boolean {
        process.stdout.write(`Searching ${key}: `);
        let curr: Trie = this;

        // do for each character of the key
        for (let i = 0; i < key.length; i++) {
            // go to the next node
            const index = key.charCodeAt(i) - 'a'.charCodeAt(0);
            curr = curr.children[index]!;
            // if the string is invalid (reached end of a path in the Trie)
            if (curr === null) {
                return false;
            }
        }

        // return true if the current node is a leaf node, and we have reached
        // the end of the string
        return curr.isLeaf;
    }
}

// construct a node
const head = new Trie();

head.insert('xyz');
console.log(head.search('xyz'));
```

The above implementation currently supports only lowercase English characters `a – z`, but the solution can be easily extended to support any set of characters. The space complexity of a Trie is O(N × M × C), where `N` is the total number of strings, `M` is the maximum length of the string, and `C` is the alphabet’s size.

We can resolve the storage problem if we only allocate memory for alphabets in use. Following is a memory-efficient implementation of Trie data structure in TypeScript, which uses a Map for storing children:

```ts
// A class to store a Trie node
class Trie {
    isLeaf: boolean;
    children: Map<string, Trie>;

    // Constructor
    constructor() {
        this.isLeaf = false;
        this.children = new Map<string, Trie>();
    }

    // Iterative function to insert a string into a Trie
    insert(key: string): void {
        console.log('Inserting…', key);

        // start from the root node
        let curr: Trie = this;

        // do for each character of the key
        for (const c of key) {
            // go to the next node and create one if the path doesn't exist
            if (!curr.children.has(c)) {
                curr.children.set(c, new Trie());
            }
            curr = curr.children.get(c)!;
        }

        // mark the current node as a leaf
        curr.isLeaf = true;
    }

    // Iterative function to search a key in a Trie. It returns true
    // if the key is found in the Trie; otherwise, it returns false
    search(key: string): boolean {
        process.stdout.write(`Searching ${key}: `);
        let curr: Trie | undefined = this;

        // do for each character of the key
        for (const c of key) {
            // go to the next node
            curr = curr.children.get(c);
            // if the string is invalid (reached end of a path in the Trie)
            if (curr === undefined) {
                return false;
            }
        }

        // return true if the current node is a leaf node, and we have reached
        // the end of the string
        return curr.isLeaf;
    }
}

// construct a node
const head = new Trie();

head.insert('xyz');
console.log(head.search('xyz'));
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
