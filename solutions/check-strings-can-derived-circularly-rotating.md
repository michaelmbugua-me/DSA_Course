# Check if strings can be derived from each other by circularly rotating them

> Source: https://www.techiedelight.com/check-strings-can-derived-circularly-rotating/

[String](https://www.techiedelight.com/Category/String/)

Check if a given string can be derived from another string by circularly rotating it. The rotation can be in a clockwise or anti-clockwise rotation.

For example,

**Input:** X = ABCD Y = DABC **Output:** Yes Y can be derived from X by right-rotating it by 1 unit

> 

For two given strings `X` and `Y`, a simple solution would be to check if the string `Y` is a substring of the string `XX` or not. If yes, they can be derived from each other. For example, consider string `X = ABCD` and `Y = DABC`.

`XX = ABCD + ABCD = ABCDABCD`

The string `Y` is clearly a substring of the string `ABC**DABC** D`.

The implementation can be seen [here](https://techiedelight.com/compiler/?run=xyQqwD). This solution seems efficient, but uses O(n) extra space.

How to do this using `O(1)` space?

The idea is to [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) rotate the string `X` and check if it becomes equal to the string `Y` or not. We have to consider every possible rotation of a string `X` (i.e., rotation by 1 unit, 2 unit… till `n-1` unit, where `n` is the length of the string `X`). Note that clockwise or anti-clockwise rotation doesn’t matter.

Following is a TypeScript implementation of the idea:

```ts
// Function to check if `X` can be derived from `Y` by rotating it
const check = (X: string, Y: string): boolean => {

    // if string lengths are different, they can't be
    // derived from each other
    if (X.length !== Y.length) {
        return false;
    }

    // Invariant: At the i'th iteration of this loop,
    // the string `X` will be rotated by `i` units
    for (let i = 0; i < X.length; i++) {

        // left rotate string `X` by 1 unit
        X = X.slice(1) + X[0];

        // return true if `X` becomes equal to `Y`
        if (X === Y) {
            return true;
        }
    }

    // return false if no rotation is matched
    return false;
};

// demo

const X = 'ABCD';
const Y = 'DABC';

if (check(X, Y)) {
    console.log('Given strings can be derived from each other');
} else {
    console.log('Given strings cannot be derived from each other');
}
```

The time complexity of the above solution is O(n2), where `n` is the length of the input strings, and doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 188

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
