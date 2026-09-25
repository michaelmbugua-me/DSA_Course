# Find first `k` maximum occurring words in a given set of strings

> Source: https://www.techiedelight.com/find-first-k-maximum-occurring-words-given-set-strings/

Given a huge set of words with duplicates present and a positive integer `k`, find the first k–maximum occurring words in it.

For example,

**Input:** keys = [code, coder, coding, codable, codec, codecs, coded, codeless, codec, codecs, codependence, codex, codify, codependents, codes, code, coder, codesign, codec, codeveloper, codrive, codec, codecs, codiscovered] k = 4 **Output:** codec occurs 4 times codecs occurs 3 times code occurs 2 times coder occurs 2 times

The idea is to use [Trie (Prefix Tree)](https://techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/) to solve this problem. Start by inserting each key into the Trie and store its count so far (along with the key itself) in the leaf nodes. After all keys are inserted into the trie, perform its [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) ([Depth–first search](https://techiedelight.com/depth-first-search/)) and insert all key’s count into a [max-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). Then the problem is reduced to removing the first `k` elements from the max-heap.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a Trie node
class Trie {
    // `count` and `key` will be set only for leaf nodes
    count = 0;

    // `key` stores the string, and `count` stores its frequency so far
    key: string | null = null;

    // each node stores a map to its child nodes
    character = new Map<string, Trie>();
}

// A class to store a heap node
class Node {
    constructor(public key: string, public count: number) {}
}

// Iterative function to insert a string into a Trie
function insert(head: Trie, s: string): void {

    // start from the root node
    let curr: Trie = head;

    for (const c of s) {
        // create a new node if the path doesn't exist
        if (!curr.character.has(c)) {
            curr.character.set(c, new Trie());
        }

        // go to the next node
        curr = curr.character.get(c) as Trie;
    }

    // store key and its count in leaf nodes
    curr.key = s;
    curr.count += 1;
}

// Function to perform preorder traversal on Trie and insert
// each distinct key along with its count in max-heap
function preorder(curr: Trie | null, pq: Node[]): void {

    // base condition
    if (curr === null) {
        return;
    }

    for (const value of curr.character.values()) {

        // if a leaf node is reached (leaf nodes have a non-zero count),
        // push the key with its frequency in max-heap
        if (value.count) {
            pq.push(new Node(value.key as string, value.count));
        }

        // recur for current node's children
        preorder(value, pq);
    }
}

// Function to find first k–maximum occurring words in a given list of strings
function findKFrequentWords(words: string[], k: number): void {

    // insert all keys into a Trie and maintain each key
    // frequency in Trie's leaf nodes
    const head = new Trie();
    for (const word of words) {
        insert(head, word);
    }

    // create an empty max-heap (plain array; JS has no builtin heap)
    const pq: Node[] = [];

    // perform preorder traversal on given Trie and push each
    // unique key with its frequency in max-heap
    preorder(head, pq);

    // order the heap contents by descending count
    pq.sort((a, b) => b.count - a.count);

    // run till max-heap becomes empty or `k` keys are printed
    while (k-- > 0 && pq.length) {

        // extract the maximum node from the max-heap
        const max = pq.shift() as Node;

        // print the maximum occurring element with its count
        console.log(`${max.key} occurs ${max.count} times`);
    }
}

// given set of keys
const words = [
    'code', 'coder', 'coding', 'codable', 'codec', 'codecs', 'coded',
    'codeless', 'codec', 'codecs', 'codependence', 'codex', 'codify',
    'codependents', 'codes', 'code', 'coder', 'codesign', 'codec',
    'codeveloper', 'codrive', 'codec', 'codecs', 'codiscovered'
];

const k = 4;
findKFrequentWords(words, k);
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
