# Determine whether a string can be transformed into another string in a single edit

> Source: https://www.techiedelight.com/determine-string-transformed-into-another-string-single-edit/

[String](https://www.techiedelight.com/Category/String/)

Given two strings, determine whether the first string can be transformed into the second string with a single edit operation. An edit operation can insert, remove, or replace a character in the first string.

For example,

**Input:** xyz —> xz **Output:** True **Explanation:** The total number of edits required is 1 (remove y from the first string) **Input:** xyz —> xyyz **Output:** True **Explanation:** The total number of edits required is 1 (add y in the first string) **Input:** xyz —> xyx **Output:** True **Explanation:** The total number of edits required is 1 (replace z in the first string by x) **Input:** xyz —> xxx **Output:** False **Explanation:** The total number of edits required are 2 (replace y and z in the first string by x) **Input:** xyz —> xyz **Output:** False **Explanation:** The total number of edits required is 0 (both strings are the same)

> 

The standard solution is to find the [Levenshtein Distance (Edit Distance)](https://techiedelight.com/levenshtein-distance-edit-distance-problem/) between the given strings. If the edit distance is 1, transform the first string into the second string with a single edit operation. The time complexity of this solution is O(m.n) if [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) is used. This also requires the auxiliary space of O(m.n), where `m` is the length of the first string and `n` is the length of the second string.

We can reduce the time complexity to linear in terms of the length of both strings. The idea is to simultaneously traverse both strings and keep track of the number of edits required to transform the first string into the second string. The algorithm can be implemented as follows in TypeScript:

```ts
// Determine if the first string can be transformed into the
// second string with a single edit operation
function checkEditDistance(first: string, second: string): boolean {
  // store length of both strings
  const m = first.length;
  const n = second.length;

  // difference between the length of both strings is more than one
  if (Math.abs(m - n) > 1) {
    return false;
  }

  // to keep track of the total number of edits
  let edits = 0;

  // `i` and `j` keep track of the index of current characters in the
  // first and second strings, respectively
  let i = 0;
  let j = 0;

  // loop till either string runs out
  while (i < m && j < n) {
    // if the current character of both strings doesn't match
    if (first[i] !== second[j]) {
      // when the length of the first string is more than the length
      // of the second string, remove the current character at
      // index `i` in the first string

      if (m > n) {
        i = i + 1;
      }

      // when the length of the first string is less than the length
      // of the second string, add the current character at index `j`
      // in the second string to the first string

      else if (m < n) {
        j = j + 1;
      }

      // when the length of both strings is the same, replace the character
      // present at index `i` in the first string with the character present
      // at index `j` in the second string.

      else {
        i = i + 1;
        j = j + 1;
      }

      // increment the number of edits
      edits = edits + 1;
    }

    // if the current character of both strings matches
    else {
      i = i + 1;
      j = j + 1;
    }
  }

  // remove any extra characters left in the first string
  if (i < m) {
    edits = edits + 1;
  }

  // add any extra characters left in the second string at the end of the first string
  if (j < n) {
    edits = edits + 1;
  }

  // return true if the number of edits is exactly one return, false otherwise
  return edits === 1;
}

console.log(checkEditDistance("xyz", "xz"));       // true
console.log(checkEditDistance("xyz", "xyyz"));     // true
console.log(checkEditDistance("xyz", "xyx"));      // true
console.log(checkEditDistance("xyz", "xxx"));      // false
```

The time complexity of the above solution is O(m + n), where `m` and `n` are the length of each string. The auxiliary space required by the program is O(1).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 174

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
