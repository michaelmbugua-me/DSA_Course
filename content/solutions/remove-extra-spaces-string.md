# Remove all extra spaces from a string

> Source: https://www.techiedelight.com/remove-extra-spaces-string/

[String](https://www.techiedelight.com/Category/String/)

Write a program to [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) remove all extra spaces from a string. There maybe leading spaces, trailing spaces, or consecutive spaces between words of the string. The solution should remove them and also handle punctuation marks.

The idea is to iterate through the string’s characters and check if the current character is a space, non-space character, or a punctuation mark. If it is a punctuation mark, any preceding space, if present, is removed. If it is a space, remove it unless it just after a word or a punctuation mark.

Following is a TypeScript implementation of it. The solution keeps track of the next empty position in the output string to facilitate the algorithm and handles the leading and trailing spaces separately.

```ts
// true when the character is a space
const isSpace = (c: string): boolean => c === ' ';

// true when the character is a punctuation mark
const isPunct = (c: string): boolean => /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(c);

// Function to remove all extra whitespace from a string
function removeSpace(s: string): string {
    const chars = s.split('');

    // true when a whitespace character is found and false when
    // any non-space character is found
    let space = false;

    // `k` points to the next free position
    let k = 0;

    // iterate through the characters of the string
    for (let i = 0; i < chars.length; i++) {
        // handle leading spaces in the string
        while (k === 0 && i < chars.length && isSpace(chars[i])) {
            i++;
        }

        if (i >= chars.length) {
            break;
        }

        // if the current character is a space
        if (isSpace(chars[i])) {
            // if the flag was false earlier, i.e., the first occurrence of a
            // space after a word
            if (!space) {
                // copy current char (whitespace) at the next free index
                // and set the flag
                chars[k++] = chars[i];
                space = true;
            }
        }
        // if the current character is a punctuation mark
        else if (isPunct(chars[i])) {
            // if the last assigned character was a space, overwrite it
            // with the current character
            if (k > 0 && isSpace(chars[k - 1])) {
                chars[k - 1] = chars[i];
            }
            else {
                // copy the current character at the next free index
                chars[k++] = chars[i];
            }
            space = false;
        }
        else {
            // copy the current character at the next free index
            chars[k++] = chars[i];
            space = false;
        }
    }

    // handle trailing spaces in the string
    return chars.slice(0, k).join('');
}

const s = ' Hello .   This is   a C   program !! ';

console.log(removeSpace(s));
```

**Output:** Hello. This is a C program!!

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space for the conversion.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
