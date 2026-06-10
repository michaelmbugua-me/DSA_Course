# Remove all occurrences of `AB` and `C` from a string

> Source: https://www.techiedelight.com/inplace-remove-all-occurrences-ab-c-string/

[String](https://www.techiedelight.com/Category/String/)

Given a string, remove all occurrences of `AB` and `C` in a single traversal of it.

For example,

` The input string is 'CBAABCAB' The string after removal of 'AB' and 'C' is 'BA' 'CBAABCAB' —> '~~C~~ **BA** ~~AB~~ ~~C~~ ~~AB~~ ' —> 'BA' The input string is 'ABACB' The string after removal of 'AB' and 'C' is '' 'ABACB' —> '~~AB~~ **A** ~~C~~ **B** ' —> '~~AB~~ ' —> '' The input string is 'ABCACBCAABB' The string after removal of 'AB' and 'C' is '' 'ABCACBCAABB' —> '~~AB~~ ~~C~~ **A** ~~C~~ **B** ~~C~~ **A** ~~AB~~ **B** ' —> '~~AB~~ ~~AB~~ ' —> '' `

> 

The main challenge lies with doing the conversion in a single traversal of the string. The problem demands the removal of all adjacent, as well as non-adjacent occurrences of string `AB`, i.e., for a given string, say `ADAABCB`, after removing the first adjacent occurrence of `AB` (and `C` of-course), we get string `ADAB` which again needs to be processed for adjacent `AB` (No `C` this time, think!). Therefore, the final output string will be `AD`.

Following is a TypeScript implementation of the idea:

```ts
// Function to remove all occurrences of 'AB' and 'C' from the string
function remove(s: string): string {

    const chars = [...s];

    // `i` maintains the position of the current char in the input string.
    let i = 0;

    // `k` maintains the next free position in the output string.
    let k = 0;

    // do till the end of the string is reached
    while (i < chars.length) {

        // if the current character is 'B' and previous (need not be adjacent) was 'A',
        // increment `i` and decrement `k`
        if (chars[i] === 'B' && k > 0 && chars[k - 1] === 'A') {
            k = k - 1;
            i = i + 1;
        }

        // if the current character is 'C', increment `i`
        else if (chars[i] === 'C') {
            i = i + 1;
        }

        // for any other character, increment both `i` and `k`
        else {
            chars[k] = chars[i];
            k = k + 1;
            i = i + 1;
        }
    }

    return chars.slice(0, k).join('');
}

let s = 'ABCACBCAABB';

s = remove(s);
console.log(`The string after removal of 'AB' and 'C' is '${s}'`);
```

**Output:** `The string after removal of 'AB' and 'C' is ''`

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space.

Also See:

> [Remove all adjacent duplicates from a string](https://www.techiedelight.com/in-place-remove-all-adjacent-duplicates-from-string/ "Remove all adjacent duplicates from a string")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 223

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
