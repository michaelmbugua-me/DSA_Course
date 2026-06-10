# Find the first non-repeating character in a string by doing only one traversal of it

> Source: https://www.techiedelight.com/find-first-non-repeating-character-string-one-traversal/

[String](https://www.techiedelight.com/Category/String/)

Given a string, find the first non-repeating character in it by doing only a single traversal of it.

For example,

**Input:** string is ABCDBAGHC **Output:** The first non-repeating character in the string is D

> 

A simple solution would be to store each character’s count in a map or an array by traversing it once. Then traverse the string once more to find the first character having its count as 1. The time complexity of this solution is O(n) and requires O(n) extra space, where `n` is the length of the input string. The problem with this solution is that the string is traversed twice, violating the program constraints.

We can solve this problem in a single traversal of the string. The idea is to use a map to store each distinct character count and the index of its first or last occurrence in the string. Then, traverse the map and find a character with a minimum index of the string.

Following is a TypeScript implementation of the idea:

```ts
// Function to find the first non-repeating character in
// the string by doing only a single traversal of it
function findNonRepeatingChar(s: string): number {

    // base case
    if (!s.length) {
        return -1;
    }

    // map to store character count and the index of its
    // last occurrence in the string
    const d = new Map<string, [number, number]>();

    for (const [index, char] of [...s].entries()) {
        const [frequency, prevIndex] = d.get(char) || [0, index];
        d.set(char, [frequency + 1, index]);
    }

    // stores index of the first non-repeating character
    let minIndex = -1;

    // Traverse the map and find a character with count 1 and
    // a minimum index of the string
    for (const values of d.values()) {
        const [count, firstIndex] = values;
        if (count === 1 && (minIndex === -1 || firstIndex < minIndex)) {
            minIndex = firstIndex;
        }
    }

    return minIndex;
}

const s = 'ABCDBAGHC';

const index = findNonRepeatingChar(s);
if (index !== -1) {
    console.log(`The first non-repeating character in the string is ${s[index]}`);
}
else {
    console.log('The string has no non-repeating character');
}
```

**Output:** The first non-repeating character in the string is D

The time complexity of this solution is O(n) since we are doing a single traversal of the input string of length `n` and a single traversal of the map. Since the map’s size is equal to the alphabet size (a constant) in the worst-case, we can ignore it.

Also See:

> [Find first `k` non-repeating characters in a string in a single traversal](https://www.techiedelight.com/first-k-non-repeating-characters-string/ "Find first `k` non-repeating characters in a string in a single traversal")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 171

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
