# Determine whether characters of a string follow a specific order

> Source: https://www.techiedelight.com/determine-string-follows-specified-order/

[String](https://www.techiedelight.com/Category/String/)

Given a string and a pattern (having all distinct characters), determine whether the string characters follow a specific order as defined by the pattern’s characters.

For example,

**Input:** word = Techie Delight pattern = el **Output:** Pattern found The pattern characters follow the order [e, e, e, l] in the input string. Note that all e’s appear before l. **Input:** word = Techie Delight pattern = ei **Output:** Pattern not found The pattern characters follow the order [e, i, e, e, i] in the input string. Note that all e’s doesn’t appear before all i’s.

> 

The idea is to loop through all characters of the pattern. If at any point, the last occurrence of the previous encountered character is after the first occurrence of the current character in the input string, we can say that the string doesn’t follow the order defined by the pattern.

Following is the implementation in TypeScript based on the above idea:

```ts
// Determine if characters of a given word follow specific order as
// defined by characters of the given pattern
function checkPattern(word: string, pattern: string): boolean {
  // invalid input
  if (!word || !pattern || word.length < pattern.length) {
    return false;
  }

  // stores previous character
  let prev: string | null = null;

  // loop through all chars of the pattern
  for (const curr of pattern) {
    // return false if the last occurrence of the previous character is after
    // the first occurrence of the current character in the input word

    const firstIndex = word.indexOf(curr);
    if (firstIndex === -1 || (prev !== null && word.lastIndexOf(prev) > firstIndex)) {
      return false;
    }

    // set current as previous for the next iteration
    prev = curr;
  }

  // we reach here if the given word matches the pattern
  return true;
}

const word = "Techie Delight";
const pattern = "el";

if (checkPattern(word, pattern)) {
  console.log("Pattern found");
} else {
  console.log("Pattern not found");
}
```

**Output:** Pattern found

The time complexity of the above solution is O(m.n), where `m` is the length of the string and `n` is the length of the pattern. The auxiliary space required by the program is O(1).

Here’s another simple approach to solving this problem. The solution can be divided into three steps:

  1. Remove all characters from the given string that are not present in the specified pattern.
  2. Remove the adjacent duplicates from the modified string.
  3. Compare the resultant string with the pattern and return true if both are equal.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to remove characters from a word that are not present in
// the specified pattern
function removeChars(word: string, allowed: string): string[] {
  const allow = new Set(allowed);
  return [...word].filter((ch) => allow.has(ch));
}

// Function to remove adjacent duplicates characters from a word
function removeDuplicates(chars: string[]): string {
  let prev: string | null = null;
  let k = 0;

  for (let i = 0; i < chars.length; i++) {
    if (prev !== chars[i]) {
      chars[k] = chars[i];
      k = k + 1;
      prev = chars[i];
    }
  }

  return chars.slice(0, k).join("");
}

// Determine if characters of a given word follow specific order as
// defined by characters of the given pattern
function checkPattern(word: string, pattern: string): boolean {
  // invalid input
  if (!word || !pattern) {
    return false;
  }

  return removeDuplicates(removeChars(word, pattern)) === pattern;
}

const word = "Techie Delight";
const pattern = "el";

if (checkPattern(word, pattern)) {
  console.log("Pattern found");
} else {
  console.log("Pattern not found");
}
```

**Output:** Pattern found
