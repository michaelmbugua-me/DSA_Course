# Find the maximum occurring word in a given set of strings

> Source: https://www.techiedelight.com/find-maximum-occurring-word-given-set-strings/

Given a huge set of words with duplicates present, find the maximum occurring word in it. If two words have the same count, return any one of them.

For example,

**Input:** keys = [code, coder, coding, codable, codec, codecs, coded, codeless, codec, codecs, codependence, codex, codify, codependents, codes, code, coder, codesign, codec, codeveloper, codrive, codec, codecs, codiscovered] **Output:** The maximum occurring word is codec. Its count is 4

> 

The idea is to use [Trie (Prefix Tree)](https://techiedelight.com/trie-implementation-insert-search-delete/) to solve this problem. We start by inserting each key into the Trie and store its count so far (along with the key itself) in the leaf nodes. After all nodes are inserted into the Trie, perform its [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) ([DFS](https://techiedelight.com/depth-first-search/)), and find the maximum frequency word by comparing the count present at leaf nodes. Note that we can also use a map to solve this problem.

Following is a TypeScript implementation of the idea:

**Output:** Word : codec Count: 4

```ts
// A class to store a Trie node
class TrieNode {
    // `count` and `key` are only set for leaf nodes
    // `key` stores the string, and `count` stores its frequency so far
    key: string | null = null;
    count = 0;

    // each node stores a map to its child nodes
    character = new Map<string, TrieNode>();
}

// Iterative function to insert a string into a Trie
function insert(head: TrieNode, s: string): void {

    // start from the root node
    let curr = head;

    for (const c of s) {
        // go to the next node and create a new node if the path doesn't exist
        if (!curr.character.has(c)) {
            curr.character.set(c, new TrieNode());
        }
        curr = curr.character.get(c);
    }

    // store key and its count in leaf nodes
    curr.key = s;
    curr.count += 1;
}

// Function to perform preorder traversal on a Trie and
// find a word with the maximum frequency
function preorder(curr: TrieNode, key = '', max_count = 0): [string, number] {

    // return false if Trie is empty
    if (curr === null) {
        return [key, max_count];
    }

    for (const v of curr.character.values()) {

        // leaf node has a non-zero count
        if (max_count < v.count) {
            key = v.key;
            max_count = v.count;
        }

        // recur for current node's children
        [key, max_count] = preorder(v, key, max_count);
    }

    return [key, max_count];
}

// given set of keys
const words = [
    'code', 'coder', 'coding', 'codable', 'codec', 'codecs', 'coded',
    'codeless', 'codec', 'codecs', 'codependence', 'codex', 'codify',
    'codependents', 'codes', 'code', 'coder', 'codesign', 'codec',
    'codeveloper', 'codrive', 'codec', 'codecs', 'codiscovered'
];

// Insert all keys into a Trie
const head = new TrieNode();
for (const word of words) {
    insert(head, word);
}

// perform preorder traversal on a Trie and find the key
// with a maximum frequency
const [key, count] = preorder(head);

console.log(`Word : ${key}`);
console.log(`Count: ${count}`);
```

The time complexity of the above solution is O(N.M), where `N` is the total number of given words and `M` is the maximum word length. The auxiliary space required by the program is O(N × M).

**Exercise:**

1\. Extend this solution to print all maximum occurring words (having the same count).

2\. Extend this solution to print the first `k` maximum occurring word.

Also See:

> [Find first `k` maximum occurring words in a given set of strings](https://www.techiedelight.com/find-first-k-maximum-occurring-words-given-set-strings/ "Find first `k` maximum occurring words in a given set of strings")

> [Longest Common Prefix in a given set of strings (Using Trie)](https://www.techiedelight.com/longest-common-prefix-given-set-strings-using-trie/ "Longest Common Prefix in a given set of strings \(Using Trie\)")

> [Lexicographic sorting of a given set of keys](https://www.techiedelight.com/lexicographic-sorting-given-set-of-keys/ "Lexicographic sorting of a given set of keys")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 187

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
