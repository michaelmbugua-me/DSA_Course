# Lexicographic sorting of a given set of keys

> Source: https://www.techiedelight.com/lexicographic-sorting-given-set-of-keys/

Lexicographic sorting: Given a set of strings, return them in lexicographic order (dictionary/alphabetical order).

> 

Lexicographic sorting of a set of keys can be accomplished with a simple [Trie-based algorithm](https://techiedelight.com/trie-implementation-insert-search-delete/) as follows:

  * Insert all keys into a Trie.
  * Print all keys in the Trie by performing [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on Trie to get output in lexicographically increasing order.

Following is a TypeScript implementation of the idea. Trie currently supports the lowercase English characters `a – z`. We can easily extend the solution to support all ASCII characters.

```ts
// A class to store a Trie node
class Trie {
  key: string | null = null;    // non-empty when node is a leaf node
  character: (Trie | null)[];

  constructor() {
    // Trie supports lowercase English characters `a – z`.
    // So, the character size is 26.
    this.character = Array(26).fill(null);
  }
}

// Iterative function to insert a string into a Trie
function insert(head: Trie, s: string): void {
  // start from the root node
  let curr = head;

  for (const c of s) {
    const key = c.charCodeAt(0) - 'a'.charCodeAt(0);

    // create a new node if the path doesn't exist
    if (curr.character[key] === null) {
      curr.character[key] = new Trie();
    }

    // go to the next node
    curr = curr.character[key]!;
  }

  // store key in the leaf node
  curr.key = s;
}

// Function to perform preorder traversal on a given Trie
function preorder(curr: Trie | null): void {
  // return if Trie is empty
  if (curr === null) {
    return;
  }

  for (let i = 0; i < 26; i++) {
    if (curr.character[i]) {
      // if the current node is a leaf, print the key
      if (curr.character[i]!.key) {
        console.log(curr.character[i]!.key);
      }

      preorder(curr.character[i]);
    }
  }
}

// given set of keys
const words = [
  'lexicographic', 'sorting', 'of', 'a', 'set', 'of', 'keys', 'can', 'be',
  'accomplished', 'with', 'a', 'simple', 'trie', 'based', 'algorithm',
  'we', 'insert', 'all', 'keys', 'in', 'a', 'trie', 'output', 'all',
  'keys', 'in', 'the', 'trie', 'by', 'means', 'of', 'preorder',
  'traversal', 'which', 'results', 'in', 'output', 'that', 'is', 'in',
  'lexicographically', 'increasing', 'order', 'preorder', 'traversal',
  'is', 'a', 'kind', 'of', 'depth', 'first', 'traversal'
];

const head = new Trie();

// insert all keys of a dictionary into a Trie
for (const word of words) {
  insert(head, word);
}

// print keys in lexicographic order
preorder(head);
```

**Output:** a accomplished algorithm all based be by can depth first in increasing insert is keys kind lexicographic lexicographically means of order output preorder results set simple sorting that the traversal trie we which with

The time complexity of the above solution is O(N.M), where `N` is the total number of given words and `M` is the maximum word length. The auxiliary space required by the program is O(N × M).

Also See:

> [Find the maximum occurring word in a given set of strings](https://www.techiedelight.com/find-maximum-occurring-word-given-set-strings/ "Find the maximum occurring word in a given set of strings")

> [Find first `k` maximum occurring words in a given set of strings](https://www.techiedelight.com/find-first-k-maximum-occurring-words-given-set-strings/ "Find first `k` maximum occurring words in a given set of strings")

> [C++ Implementation of Trie Data Structure](https://www.techiedelight.com/cpp-implementation-trie-data-structure/ "C++ Implementation of Trie Data Structure")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
