# Word Break Problem – Using Trie Data Structure

> Source: https://www.techiedelight.com/word-break-problem-using-trie/

Given a dictionary of words, determine if a given string can be segmented into a space-separated sequence of one or more dictionary words.

For example,

**Input:** words[] = { this, th, is, famous, Word, break, b, r, e, a, k, br, bre, brea, ak, problem } string = Wordbreakproblem **Output:** The string can be segmented The segmented strings are: Word break problem Word brea k problem Word bre ak problem Word bre a k problem Word br e ak problem Word br e a k problem Word b r e ak problem Word b r e a k problem

> 

We have already discussed a [recursive solution of the word break problem](https://techiedelight.com/word-break-problem/) and an alternate version where we actually print all sequences. This post covers the iterative version using [Trie data structure](https://techiedelight.com/trie-implementation-insert-search-delete/) that offers better time complexity.

Consider the problem of breaking a string into component words. Call this string `s`. Let `x` be a prefix of `s`, and `y` be the remaining characters forming a suffix, so `xy` (`x` concatenated with `y`) is `s`. Then if we can break `x` and `y` into words recursively, we can break `xy = s` by merging the two sets of words. We can simplify things for ourselves by assuming that `x` will be a dictionary word; the problem is then to construct such `x`. We can do this with a Trie. Since `x` is known to be a prefix of `s`, any candidate word in the dictionary must be found on the Trie’s path corresponding to the first few letters of `s`. To do this using [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/), any time we find an appropriate `x`, set our “good” array to have a solution at `|x|+1`, where `|x|` is the size of prefix `x`. Then we can check the last entry to find if the entire string can be broken up.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a Trie node
class Node {
    // Currently, Trie supports lowercase English characters `a – z`.
    // So, the character size is 26.
    static CHAR_SIZE = 26;

    exist = false;              // true when the node is a leaf node
    next: (Node | null)[] = new Array(Node.CHAR_SIZE).fill(null);
}

// Iterative function to insert a string into a Trie
function insertTrie(head: Node, s: string): void {
    // start from the root node
    let node = head;

    // do for each character in the string
    for (const c of s) {
        const index = c.charCodeAt(0) - 'a'.charCodeAt(0);

        // create a new node if the path doesn't exist
        if (node.next[index] === null) {
            node.next[index] = new Node();
        }

        // go to the next node
        node = node.next[index];
    }

    // mark the last node as a leaf
    node.exist = true;
}

// Function to determine if a string can be segmented into space-separated
// sequence of one or more dictionary words
function wordBreak(head: Node, s: string): boolean {
    // get the length of the string
    const n = s.length;

    // `good[i]` is true if the first `i` characters of `s` can be segmented
    const good: boolean[] = new Array(n + 1).fill(false);
    good[0] = true;        // base case

    for (let i = 0; i < n; i++) {
        if (good[i]) {
            let node: Node | null = head;
            for (let j = i; j < n; j++) {
                if (node === null) {
                    break;
                }

                const index = s[j].charCodeAt(0) - 'a'.charCodeAt(0);
                node = node.next[index];

                // we can make [0, i] using our known decomposition
                // and [i+1, j] using this string in a Trie
                if (node && node.exist) {
                    good[j + 1] = true;
                }
            }
        }
    }

    // `good[n]` would be true if all characters of `s` can be segmented
    return good[n];
}

// List of strings to represent a dictionary
const words = [
    'self', 'th', 'is', 'famous', 'word', 'break', 'b', 'r',
    'e', 'a', 'k', 'br', 'bre', 'brea', 'ak', 'prob', 'lem'
];

// given string
const s = 'wordbreakproblem';

// create a Trie to store the dictionary
const t = new Node();
for (const word of words) {
    insertTrie(t, word);
}

// check if the string can be segmented or not
if (wordBreak(t, s)) {
    console.log('The string can be segmented');
} else {
    console.log("The string can't be segmented");
}
```

Runtime Analysis:

A naive analysis suggests an O(n2) runtime, but notice that the second loop will break when the node is null. This must occur after `k` steps, where `k` is the deepest vertex in the Trie (though it could, of course, occur earlier). It is not too difficult to see that with a dictionary containing a word of maximum length `w`, we would have `k = w+1`. So, the time complexity of the loop is actually O(w), and thus the whole function has a time complexity of O(n.w). The additional space used is the space necessary to hold a trie and the `good` array, i.e., O(n + sum of word lengths).

**Author:** Whitehead, Spencer Nicholas

Also See:

> [Word Break Problem – Dynamic Programming](https://www.techiedelight.com/word-break-problem/ "Word Break Problem – Dynamic Programming")

> [C++ Implementation of Trie Data Structure](https://www.techiedelight.com/cpp-implementation-trie-data-structure/ "C++ Implementation of Trie Data Structure")

> [Trie Data Structure – Python Implementation](https://www.techiedelight.com/trie-implementation-python/ "Trie Data Structure – Python Implementation")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 181

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
