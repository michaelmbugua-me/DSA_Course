# Find all interleaving of given strings

> Source: https://www.techiedelight.com/find-interleavings-of-given-strings/

[String](https://www.techiedelight.com/Category/String/)

Find all interleavings of given strings that can be formed from all the characters of the first and second string where the order of characters is preserved.

For example, interleavings of string `ABC` and `ACB` are:

ACBABC, AABCBC, ACABCB, ABCACB, AACBBC, ABACCB, ACABBC, ABACBC, AACBCB, AABCCB

> 

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to append the first or last character of `X` and `Y` in the result one by one, and recur for the remaining substring.

**Input:** X[1…m], Y[1…n] fun(X, m, Y, n) = fun(X, m-1, Y, n) + X[m] fun(X, m, Y, n-1) + Y[n] fun(X, 0, Y, n) = Y[n] // `X` is empty fun(X, m, Y, 0) = X[m] // `Y` is empty

Following is a TypeScript implementation of the idea:

```ts
// Function to find all interleaving of string `X` and `Y`
function findInterleavings(X: string, Y: string, interleavings: Set<string>, curr: string = ''): Set<string> {
    // insert `curr` into the set if the end of both strings is reached
    if (!X && !Y) {
        interleavings.add(curr);
        return interleavings;
    }

    // if the string `X` is not empty, append its first character in the
    // result and recur for the remaining substring

    if (X) {
        findInterleavings(X.slice(1), Y, interleavings, curr + X[0]);
    }

    // if the string `Y` is not empty, append its first character in the
    // result and recur for the remaining substring

    if (Y) {
        findInterleavings(X, Y.slice(1), interleavings, curr + Y[0]);
    }

    return interleavings;
}

function findAllInterleavings(X: string, Y: string): Set<string> {

    // use set to handle duplicates
    const interleavings = new Set<string>();

    if (!X && !Y) {
        return interleavings;
    }

    findInterleavings(X, Y, interleavings);
    return interleavings;
}

const X = 'ABC';
const Y = 'ACB';

const interleavings = findAllInterleavings(X, Y);
console.log(interleavings);
```

**Output:** ACBABC AABCBC ACABCB ABCACB AACBBC ABACCB ACABBC ABACBC AACBCB AABCCB

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Check if a string is interleaving of two other given strings](https://www.techiedelight.com/check-string-interleaving-two-given-strings/ "Check if a string is interleaving of two other given strings")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.53/5. Vote count: 197

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
