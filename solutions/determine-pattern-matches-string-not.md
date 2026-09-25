# Determine whether a string matches with a given pattern

> Source: https://www.techiedelight.com/determine-pattern-matches-string-not/

Given a string and a pattern, determine whether a string matches with a given pattern. The solution should not use any regex.

For example,

**Input:** string: codesleepcode pattern: XYX **Output:** X: code Y: sleep **Input:** string: codecodecode pattern: XXX **Output:** X: code

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. The idea is to maintain a map that stores a substring mapped to each character in the pattern. Now, if any character is not seen before, consider all possible substrings and recur to see if it leads to the solution or not. If a solution is found, print the string mapped to each distinct character in the pattern using the map.

Following is the TypeScript implementation of the idea:

```ts
// Function to determine whether a string matches with a given pattern
function isMatch(word: string, pattern: string, d: Map<string, string>, i = 0, j = 0): boolean {
  // invalid input
  if (!word || !pattern) {
    return false;
  }

  const n = word.length;
  const m = pattern.length;

  // base condition
  if (n < m) {
    return false;
  }

  // if both pattern and the string reaches the end
  if (i === n && j === m) {
    return true;
  }

  // if either string or pattern reaches the end
  if (i === n || j === m) {
    return false;
  }

  // consider the next character from the pattern
  const curr = pattern[j];

  // if the character is seen before
  if (d.has(curr)) {
    const s = d.get(curr)!;
    const k = s.length;

    // `ss` stores next `k` characters of the given string
    let ss: string;
    if (i + k < word.length) {
      ss = word.slice(i, i + k);
    } else {
      ss = word.slice(i);
    }

    // return false if the next `k` characters don't match with `s`
    if (ss !== s) {
      return false;
    }

    // recur for remaining characters if the next `k` characters match
    return isMatch(word, pattern, d, i + k, j + 1);
  }

  // process all remaining characters in the string if the current
  // character is never seen before
  for (let k = 1; k <= n - i; k++) {
    // insert substring formed by next `k` characters of the string
    // into the map
    d.set(curr, word.slice(i, i + k));

    // check if it leads to the solution
    if (isMatch(word, pattern, d, i + k, j + 1)) {
      return true;
    }

    // otherwise, backtrack – remove the current character from the map
    d.delete(curr);
  }

  return false;
}

// input string and pattern
const word = "codesleepcode";
const pattern = "XYX";

// create a map to store mappings between the pattern and string
const d = new Map<string, string>();

// check for solution
if (isMatch(word, pattern, d)) {
  for (const [key, value] of d) {
    console.log(`${key}: ${value}`);
  }
} else {
  console.log("Solution doesn't exist");
}
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Author:** Aditya Goel

Also See:

> [Check if a string matches with the given wildcard pattern](https://www.techiedelight.com/check-string-matches-with-wildcard-pattern/ "Check if a string matches with the given wildcard pattern")

> [Determine whether characters of a string follow a specific order](https://www.techiedelight.com/determine-string-follows-specified-order/ "Determine whether characters of a string follow a specific order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
