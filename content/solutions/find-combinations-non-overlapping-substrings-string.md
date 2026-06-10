# Find all combinations of non-overlapping substrings of a string

> Source: https://www.techiedelight.com/find-combinations-non-overlapping-substrings-string/

Given a string, find all combinations of non-overlapping substrings of it.

Please note that the problem specifically targets [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

For example,

**Input:** ABC **Output:** [A, B, C], [A, BC], [AB, C], [ABC]

**Input:** ABCD **Output:** [A, B, C, D], [A, B, CD], [A, BC, D], [A, BCD], [AB, C, D], [AB, CD], [ABC, D], [ABCD]

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. For a given string `str` of length `n`, consider every prefix `str[0, i]` of it one by one. We append the prefix to the output string by enclosing it within the parenthesis and recur for the remaining substring `str[i+1, n-1]`. If every substring of the original string is processed, add the output string to result.

Following is the TypeScript implementation of the idea:

```ts
// Find all combinations of non-overlapping substrings of a given string
function findCombinations(s: string, combinations: Set<string[]>, substring: string[] = []): void {

    // if all characters of the input are processed,
    // add the output string to result
    if (!s) {
        // output string to store non-overlapping substrings
        combinations.add([...substring]);
        return;
    }

    // add each substring `s[0, i]` to the output string and recur for
    // remaining substring `s[i+1, n-1]`
    for (let i = 0; i < s.length; i++) {
        // push substring `s[0, i]` into the output string
        substring.push(s.slice(0, i + 1));

        // recur for the remaining string `s[i+1, n-1]`
        findCombinations(s.slice(i + 1), combinations, substring);

        // backtrack: remove current substring from the output
        substring.pop();
    }
}

function findAllCombinations(s: string): Set<string[]> {
    // base case
    if (!s) {
        return new Set();
    }

    // find all non-overlapping substrings
    const combinations = new Set<string[]>();
    findCombinations(s, combinations);
    return combinations;
}

// input string
const s = 'ABCD';

// find all non-overlapping substrings
const combinations = findAllCombinations(s);
console.log(combinations);
```

The time complexity of the above solution is exponential as there are exactly `2n-1` combinations, where `n` is the length of the input string.

Also See:

> [Break a string into all possible combinations of non-overlapping substrings](https://www.techiedelight.com/break-string-non-overlapping-substrings/ "Break a string into all possible combinations of non-overlapping substrings")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
