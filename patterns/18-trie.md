# Pattern 18: Trie (Prefix Tree) (bonus)

> Extension to the 14 Patterns article — string lookup problems live here.

## Overview

A tree where each node represents a character and each root-to-node path spells a prefix. Insert/search/prefix-queries all run in O(L) where L is the word length — independent of how many words are stored. Common additions per node: `is_end` flag (word terminator), counts (autocomplete ranking), children map for memory efficiency.

Use cases: autocomplete, spell-check, word games on grids (Boggle), longest common prefix, dictionary matching, word break with lookup.

## Recognition cues

- "Prefix", "words starting with...", "autocomplete/suggestions"
- Dictionary of words + queries about beginnings of words
- Word search on a character matrix (trie + DFS combo)
- Duplicate detection over a stream of strings (trie leaves = unique strings)

## Template (Python)

```python3
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.is_word = True

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.is_word

    def starts_with(self, prefix):
        return self._walk(prefix) is not None

    def _walk(self, s):
        node = self.root
        for ch in s:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node
```

## Complexity

- Time: O(L) per insert/search/prefix query (L = key length)
- Space: O(ALPHABET × total chars) worst case; map-based children reduce it

## Common pitfalls

- Not marking `is_word` (search returns true for prefixes like "car" inside "card")
- Recreating child nodes instead of reusing (`setdefault`)
- Forgetting to walk back/reset the pointer in grid-DFS + trie combos — mark visited, recurse, unmark
- The hash map can replace most trie problems — but trie wins when you need **prefix enumeration** or shared prefixes explicitly

## Practice problems in this repo

- [Trie Implementation | Insert, Search and Delete](../solutions/trie-implementation-insert-search-delete.md) — also [C++](../solutions/cpp-implementation-trie-data-structure.md), [Java](../solutions/implement-trie-data-structure-java.md), [Python](../solutions/trie-implementation-python.md)
- [Memory Efficient Trie | Insert, Search and Delete](../solutions/memory-efficient-trie-implementation-using-map-insert-search-delete.md)
- [Longest Common Prefix in given set of strings (using Trie)](../solutions/longest-common-prefix-given-set-strings-using-trie.md)
- [Lexicographic sorting of given set of keys](../solutions/lexicographic-sorting-given-set-of-keys.md)
- [Find maximum occurring word in given set of strings](../solutions/find-maximum-occurring-word-given-set-strings.md)
- [Word Break Problem | Using Trie](../solutions/word-break-problem-using-trie.md)
- [Generate list of possible words from a character matrix](../solutions/generate-list-of-possible-words-from-a-character-matrix.md) — trie + DFS
- [Find all words matching a pattern in the given dictionary](../solutions/find-all-words-matching-pattern-dictionary.md)
