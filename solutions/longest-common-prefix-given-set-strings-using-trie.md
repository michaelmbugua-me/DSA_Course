# Longest Common Prefix in a given set of strings (Using Trie)

> Source: https://www.techiedelight.com/longest-common-prefix-given-set-strings-using-trie/

Find the longest common prefix (LCP) in a given set of strings.

For example,

**Input:** keys = [codable, code, coder, coding] **Output:** The longest common prefix is cod

> 

In the below post, we have discussed a solution using the divide-and-conquer technique to solve the LCP problem. In this post, a [Trie](https://techiedelight.com/trie-implementation-insert-search-delete/)-based solution is discussed.

> [Longest Common Prefix (LCP) Problem](https://techiedelight.com/find-longest-common-prefix-lcp-strings/)

Since all descendants of a Trie node have a common prefix of the string associated with that node, Trie (Prefix Tree) is the best data structure for this problem. We start by inserting all keys into the Trie. Then traverse the Trie until we find a leaf node or node with more than one child. All characters in the Trie path form the longest common prefix. For example,

Following is a TypeScript implementation of the idea:

```ts
// A class to store a Trie node
class TrieNode {
  isLeaf = false;    // set when the node is a leaf node
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
    curr = curr.character.get(c)!;
  }

  curr.isLeaf = true;
}

// Function to find the longest common prefix
function findLCP(words: string[]): string {
  // insert all keys into a Trie
  const head = new TrieNode();
  for (const s of words) {
    insert(head, s);
  }

  // traverse the Trie and find the longest common prefix

  let lcp = '';
  let curr = head;

  // loop until we find a leaf node or a node has more than 1 child
  while (curr && !curr.isLeaf && curr.character.size === 1) {
    for (const [k, v] of curr.character) {
      // append current char to LCP
      lcp += k;

      // update `curr` pointer to the child node
      curr = v;
    }
  }

  return lcp;
}

// given set of keys
const words = [
  'code', 'coder', 'coding', 'codable', 'codec', 'codecs', 'coded',
  'codeless', 'codependence', 'codependency', 'codependent',
  'codependents', 'codes', 'codesign', 'codesigned', 'codeveloped',
  'codeveloper', 'codex', 'codify', 'codiscovered', 'codrive'
];

console.log('The longest common prefix is', findLCP(words));
```

**Output:** The longest common prefix is cod

The time complexity of the above solution is O(N.M), where `N` is the total number of given words and `M` is the maximum word length. The auxiliary space required by the program is O(N × M).

Also See:

> [C++ Implementation of Trie Data Structure](https://www.techiedelight.com/cpp-implementation-trie-data-structure/ "C++ Implementation of Trie Data Structure")

> [Trie Implementation in C – Insert, Search and Delete](https://www.techiedelight.com/trie-implementation-insert-search-delete/ "Trie Implementation in C – Insert, Search and Delete")

> [Memory Efficient C++ Implementation of Trie – Insert, Search, and Delete](https://www.techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/ "Memory Efficient C++ Implementation of Trie – Insert, Search, and Delete")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 176

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
