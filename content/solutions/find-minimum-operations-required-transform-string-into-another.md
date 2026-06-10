# Find minimum operations required to transform a string into another string

> Source: https://www.techiedelight.com/find-minimum-operations-required-transform-string-into-another/

Given two strings, determine if the first string can be transformed into the second string. The only operation allowed is moving a character from the first string to the front. If the string can be transformed, find the minimum number of operations required for the transformation.

For example, the minimum number of operations required to convert the string `ADCB` to string `ABCD` is `3`.

ADCB —> CADB (Move ‘C’ to the front) CADB —> BCAD (Move ‘B’ to the front) BCAD —> ABCD (Move ‘A’ to the front)

> 

1\. To determine if a string can be transformed into another string, check whether both strings have the same set of characters. If both strings have a different set of characters, they can’t be transformed.

2\. To find the minimum number of operations required to convert the first string to the second string, the idea is to simultaneously traverse both strings from the end. If the last characters of both strings match, move to the next pair of characters. If the last character of both strings doesn’t match, find the index of the matching character in the first string. The difference between both indices represents the number of characters in the first string that has to be moved before the current character of the first string.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the minimum number of operations required to transform a given
// string into another string
const getMinimumOperations = (first: string, second: string): number => {
    // to keep track of the minimum number of operations required
    let count = 0;

    // `i` and `j` keep track of the current characters' index in the
    // first and second strings, respectively

    // start from the end of the first and second string
    let i = first.length - 1;
    let j = i;

    while (i >= 0) {
        // if the current character of both strings doesn't match,
        // search for `second[j]` in substring `first[0,i-1]` and
        // increment the count for every move
        while (i >= 0 && first[i] !== second[j]) {
            i = i - 1;
            count = count + 1;
        }

        i = i - 1;
        j = j - 1;
    }

    // return the minimum operations required
    return count;
};

// Function to determine if the first string can be transformed into
// the second string
const isTransformable = (first: string, second: string): boolean => {
    // if the length of both strings differs
    if (first.length !== second.length) {
        return false;
    }

    // return true if both strings have the same set of characters
    const countChars = (s: string): Map<string, number> => {
        const counter = new Map<string, number>();
        for (const ch of s) {
            counter.set(ch, (counter.get(ch) ?? 0) + 1);
        }
        return counter;
    };

    const chars1 = countChars(first);
    const chars2 = countChars(second);

    if (chars1.size !== chars2.size) {
        return false;
    }
    for (const [ch, cnt] of chars1) {
        if (chars2.get(ch) !== cnt) {
            return false;
        }
    }
    return true;
};

const first = 'ADCB';
const second = 'ABCD';

if (isTransformable(first, second)) {
    console.log(`The minimum operations required to convert the string ${first} to string ${second} are ${getMinimumOperations(first, second)}`);
}
else {
    console.log('The string cannot be transformed');
}
```

**Output:** The minimum operations required to convert the string ADCB to string ABCD are 3

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input string.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 114

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
