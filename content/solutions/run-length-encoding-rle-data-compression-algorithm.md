# Run Length Encoding (RLE) Data Compression Algorithm

> Source: https://www.techiedelight.com/run-length-encoding-rle-data-compression-algorithm/

[String](https://www.techiedelight.com/Category/String/)

Run–length encoding (RLE) is a simple form of lossless data compression that runs on sequences with the same value occurring many consecutive times. It encodes the sequence to store only a single value and its count.

For example, consider a screen containing plain black text on a solid white background. There will be many long runs of white pixels in the blank space and many short runs of black pixels within the text.

`WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW`

With a run–length encoding (RLE) data compression algorithm applied to the above hypothetical scan line, it can be rendered as `12W1B12W3B24W1B14W`. This can be interpreted as a sequence of twelve `W’s`, one `B`, twelve `W’s`, three `B’s`, etc.

> 

The idea is to run a linear scan on the string, and for each distinct character, append the character and its consecutive occurrence in the output string.

The algorithm can be implemented as follows in TypeScript. Note that the output size will double the input size in the worst case, so the algorithm can’t run [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/). e.g. `ABCD —> A1B1C1D1`.

```ts
// Perform Run–length encoding (RLE) data compression algorithm on string `str`
function encode(s: string): string {
    let encoding = '';  // stores output string

    let i = 0;
    while (i < s.length) {
        // count occurrences of character at index `i`
        let count = 1;

        while (i + 1 < s.length && s[i] === s[i + 1]) {
            count++;
            i++;
        }

        // append current character and its count to the result
        encoding += count + s[i];
        i++;
    }

    return encoding;
}

// demo
const s = 'ABBCCCD';
console.log(encode(s));
```

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space.

**References:** [Run–length encoding – Wikipedia](https://en.wikipedia.org/wiki/Run-length_encoding)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Easy](https://www.techiedelight.com/Tags/easy/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
