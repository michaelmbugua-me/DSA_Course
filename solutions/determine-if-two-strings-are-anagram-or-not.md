# Determine whether two strings are anagram or not

> Source: https://www.techiedelight.com/determine-if-two-strings-are-anagram-or-not/

[String](https://www.techiedelight.com/Category/String/)

Given two strings, determine whether they are anagrams.

Any word that exactly reproduces the letters in another order is an anagram. In other words, `X` and `Y` are anagrams if by rearranging the letters of `X`, we can get `Y` using all the original letters of `X` exactly once.

For example, all these pairs are anagrams as lhs can be rearranged to rhs and vice-versa:

silent = listen incest = insect

> 

A simple solution would be to sort given strings. If the strings become equal after sorting, they are anagrams. The time complexity of this solution is O(n.log(n)), where `n` is the length of the input string.

We can also solve this problem in O(n) time. The idea is to maintain the frequency of each character of the first string in a map or a count array. Then for each character of the second string, decrement its frequency and return false if the frequency becomes negative or the character is not present on the map.

Following is the TypeScript implementation of the idea:

```ts
// Function to check if `X` and `Y` are anagrams or not
function isAnagram(X: string, Y: string): boolean {
  // if X's length is not the same as Y's, they can't be an anagram
  if (X.length !== Y.length) {
    return false;
  }

  // create an empty map
  const freq = new Map<string, number>();

  // maintain the count of each character of `X` in the map
  for (const ch of X) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // do for each character `y` of `Y`
  for (const ch of Y) {
    // if `y` is found not in the map, i.e., either `y` is not present
    // in string `X` or has more occurrences in string `Y`
    if (!freq.has(ch)) {
      return false;
    }

    // decrease the frequency of `y` in the map
    freq.set(ch, freq.get(ch)! - 1);

    // if its frequency becomes 0, erase it from the map
    if (freq.get(ch) === 0) {
      freq.delete(ch);
    }
  }

  // return true if the map becomes empty
  return freq.size === 0;
}

const X = "tommarvoloriddle";        // Tom Marvolo Riddle
const Y = "iamlordvoldemort";        // I am Lord Voldemort

if (isAnagram(X, Y)) {
  console.log("Anagram");
} else {
  console.log("Not an Anagram");
}
```

**Output:** Anagram

The time complexity of the above solution is O(n) assuming constant-time operations for a hash table. The auxiliary space required by the program is O(c), where `c` is the alphabet size.

## Approach 3

Another simple solution is to create two maps and store the frequency of each character of the first and second string in them. Then we can check if both maps are equal or not. If both are found to be equal, then both strings are anagrams.

Following is the TypeScript implementation of the idea:

```ts
// Function to check if `X` and `Y` are anagrams or not
function isAnagram(X: string, Y: string): boolean {
  // if X's length is not the same as Y's, they can't be an anagram
  if (X.length !== Y.length) {
    return false;
  }

  // create an empty map
  const freqX = new Map<string, number>();

  // maintain the count of each character of `X` in the map
  for (const ch of X) {
    freqX.set(ch, (freqX.get(ch) ?? 0) + 1);
  }

  // create a second map
  const freqY = new Map<string, number>();

  // maintain the count of each character of `Y` in the map
  for (const ch of Y) {
    freqY.set(ch, (freqY.get(ch) ?? 0) + 1);
  }

  // return true if both maps have the same content
  return (
    freqX.size === freqY.size &&
    [...freqX.entries()].every(([key, value]) => freqY.get(key) === value)
  );
}

const X = "tommarvoloriddle";        // Tom Marvolo Riddle
const Y = "iamlordvoldemort";        // I am Lord Voldemort

if (isAnagram(X, Y)) {
  console.log("Anagram");
} else {
  console.log("Not an Anagram");
}
```

**Output:** Anagram

The time complexity of the above solution is O(n) assuming constant-time operations for a hash table. The auxiliary space required by the program is O(c), where `c` is the alphabet size.
