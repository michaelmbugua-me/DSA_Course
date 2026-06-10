# Remove adjacent duplicate characters from a string

> Source: https://www.techiedelight.com/remove-adjacent-duplicates-characters-string/

[String](https://www.techiedelight.com/Category/String/)

Given a string, remove adjacent duplicates characters from it. In other words, remove all consecutive same characters except one.

For example,

**Input:** AABBBCDDD **Output:** ABCD

> 

The idea is to loop through the string, and for each character, compare it with its previous character. If the current character is different from the previous character, make it part of the resultant string; otherwise, ignore it. The time complexity of this approach is O(n), where `n` is the length of the input string and doesn’t require any extra space.

Following is a TypeScript implementation of the idea:

```ts
// Function to remove adjacent duplicates characters from a string
function removeDuplicates(s: string): string {
    let chars = '';
    let prev: string | null = null;

    for (const c of s) {
        if (prev !== c) {
            chars += c;
            prev = c;
        }
    }

    return chars;
}

const s = 'AAABBCDDD';
console.log(removeDuplicates(s));
```

**Output:** ABCD





Also See:

> [Determine whether characters of a string follow a specific order](https://www.techiedelight.com/determine-string-follows-specified-order/ "Determine whether characters of a string follow a specific order")

> [Remove all adjacent duplicates from a string](https://www.techiedelight.com/in-place-remove-all-adjacent-duplicates-from-string/ "Remove all adjacent duplicates from a string")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 202

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
