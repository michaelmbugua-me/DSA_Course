# Find all words matching a pattern in the given dictionary

> Source: https://www.techiedelight.com/find-all-words-matching-pattern-dictionary/

Given a dictionary of words where each word follows a CamelCase notation, find all words in it that matches a given pattern of all uppercase characters.

CamelCase Notation is the practice of writing compound words or phrases joined without spaces, where each word’s first letter is capitalized. For example, PowerPoint, LibreOffice, CinemaScope, etc., are in CamelCase.

For example, consider the dictionary.

dict = [Hi, HiTech, HiTechCity, Hello, HelloWorld, HiTechLab]

  * If the pattern is HT, the output is [HiTech, HiTechCity, HiTechLab].
  * If the pattern is HTC, the output is [HiTechCity].
  * If the pattern is H, the output is the same as the input.

> 

We can use a [Trie data structure](https://techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/) to solve this problem. The idea is to insert all uppercase characters of each word in the CamelCase dictionary into a Trie. In contrast, the complete word is stored in a container associated with the corresponding leaf node. After the complete dictionary is processed, traverse the Trie and find all words that match the given pattern.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a Trie node
class TrieNode {
    // each node stores a dictionary to its child nodes
    d = new Map<string, TrieNode>();

    // true when the node is a leaf node
    isLeaf = false;

    // collection to store a complete list of words in the leaf node
    word = new Set<string>();
}

// Function to insert a string into a Trie
function insert(head: TrieNode | null, word: string): TrieNode {
    if (head === null) {
        head = new TrieNode();
    }

    // start from the head node
    let curr = head;
    for (const c of word) {
        // insert only uppercase characters
        if (c >= 'A' && c <= 'Z') {
            // create a new node if the path doesn't exist
            if (!curr.d.has(c)) {
                curr.d.set(c, new TrieNode());
            }
            // go to the next node
            curr = curr.d.get(c) as TrieNode;
        }
    }

    // mark the current node as a leaf
    curr.isLeaf = true;

    // push the current word into the set associated with a leaf node
    curr.word.add(word);

    return head;
}

// Function to print all children of a given Trie node
function printAllWords(root: TrieNode | null): void {

    // base case
    if (root === null) {
        return;
    }

    // if the current node is a leaf, print all words associated with it
    if (root.isLeaf) {
        console.log([...root.word]);
    }

    // recur for all children of the root node
    for (const val of root.d.values()) {
        printAllWords(val);
    }
}

// Function to print all words in the CamelCase dictionary, which
// matches the given pattern
function findAllWords(dictionary: string[], pattern: string): void {

    // base case
    if (!dictionary.length) {
        return;
    }

    // Trie head node
    let head: TrieNode | null = null;

    // construct a Trie from the given dictionary
    for (const s of dictionary) {
        head = insert(head, s);
    }

    // search for the given pattern in the Trie
    let curr = head as TrieNode;
    for (const c of pattern) {

        // if the given pattern is not found (reached end of a path in the Trie)
        if (!curr.d.has(c)) {
            return;
        }

        // move to the child node
        curr = curr.d.get(c) as TrieNode;
    }

    // print all words matching the given pattern
    printAllWords(curr);
}

const dictionary = ['Hi', 'HiTech', 'HiTechCity', 'Techie',
    'TechieDelight', 'Hello', 'HelloWorld', 'HiTechLab'];
const pattern = 'HT';

findAllWords(dictionary, pattern);
```

The time complexity of the above solution is O(N.M), where `N` is the total number of words in the given dictionary and `M` is the maximum word length. The auxiliary space required by the program is O(N × M).

**Author:** Aditya Goel

Also See:

> [Print all pairs of anagrams in a set of strings](https://www.techiedelight.com/print-all-pairs-of-anagrams/ "Print all pairs of anagrams in a set of strings")

> [Longest Common Prefix in a given set of strings (Using Trie)](https://www.techiedelight.com/longest-common-prefix-given-set-strings-using-trie/ "Longest Common Prefix in a given set of strings \(Using Trie\)")

> [C++ Implementation of Trie Data Structure](https://www.techiedelight.com/cpp-implementation-trie-data-structure/ "C++ Implementation of Trie Data Structure")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 151

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
