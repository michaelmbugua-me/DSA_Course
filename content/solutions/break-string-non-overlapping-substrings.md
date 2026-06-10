# Break a string into all possible combinations of non-overlapping substrings

> Source: https://www.techiedelight.com/break-string-non-overlapping-substrings/

[String](https://www.techiedelight.com/Category/String/)

Given a string, break it into all possible combinations of non-overlapping substrings enclosed within curly brackets.

Please note that the problem specifically targets [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

For example,

**Input:** ABC **Output:** {ABC} {AB}{C} {A}{BC} {A}{B}{C} **Input:** ABCD **Output:** {ABCD} {ABC}{D} {AB}{CD} {AB}{C}{D} {A}{BCD} {A}{BC}{D} {A}{B}{CD} {A}{B}{C}{D}

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to maintain two parameters – the index of the next character to be processed and the result string so far. We start from the index of the next character to be processed, append the substring formed by the unprocessed string to the result string and recur on the remaining string until the whole string is processed.

The following diagram represents a recursion tree for string `abc`. In each tree node, the processed part is shown by the green color, and the red color shows the unprocessed string.

Following is the TypeScript implementation based on the above idea:

```ts
const OPEN_BRACKET = '{';
const CLOSED_BRACKET = '}';
const EMPTY_STRING = '';

// Function to break a string into all possible combinations of
// non-overlapping substrings enclosed within parenthesis
function recur(s: string, i: number = 0, out: string = EMPTY_STRING): void {
    if (i === s.length) {
        console.log(out);
    }

    // consider each substring S[i, j]
    for (let j = s.length - 1; j >= i; j--) {
        const substr = OPEN_BRACKET + s.slice(i, j + 1) + CLOSED_BRACKET;

        // append the substring to the result and recur with an index of the
        // next character to be processed and the result string
        recur(s, j + 1, out + substr);
    }
}

const s = 'ABCD';    // input string
recur(s);
```

**Output:** {ABCD} {ABC}{D} {AB}{CD} {AB}{C}{D} {A}{BCD} {A}{BC}{D} {A}{B}{CD} {A}{B}{C}{D}

**Output:** {ABCD} {ABC}{D} {AB}{CD} {AB}{C}{D} {A}{BCD} {A}{BC}{D} {A}{B}{CD} {A}{B}{C}{D}

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Author:** Aditya Goel

Also See:

> [Find all combinations of non-overlapping substrings of a string](https://www.techiedelight.com/find-combinations-non-overlapping-substrings-string/ "Find all combinations of non-overlapping substrings of a string")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 230

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
