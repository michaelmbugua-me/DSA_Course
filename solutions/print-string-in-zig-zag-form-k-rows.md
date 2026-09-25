# Print string in the zigzag form in `k` rows

> Source: https://www.techiedelight.com/print-string-in-zig-zag-form-k-rows/

[String](https://www.techiedelight.com/Category/String/)

Given a string and a positive integer `k`, print the string in `k` rows in the zigzag form.

For example,

> 

The idea is to identify a pattern in the problem. If we consider a character’s index in the output, we have observed some patterns:

  * The first key of each row, `i`, is present at index `i` in the string.
  * For the first and the last row, the distance between each key is `(k-1)×2`. For example, for `k = 4`, the difference is `6`. So, the first element of the first row is located at index `0`; the second element is located at index `6`; the third element at `12`, and so on… Similarly, the first element of the last row is located at index `3`; the second element is located at index `9`, the third element at `15`, and so on…
  * For all middle rows, depending upon whether we are going up or going down, the index differs, as evident from the following code:

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to print given string in the zigzag form in `k` rows
function printZigZag(s: string, k: number): void {

    // base case
    if (k === 0) {
        return;
    }

    // base case
    if (k === 1) {
        process.stdout.write(s);
        return;
    }

    // print first row
    for (let i = 0; i < s.length; i += (k - 1) * 2) {
        process.stdout.write(s[i]);
    }

    // print middle rows
    for (let j = 1; j < k - 1; j++) {

        let down = true;
        let i = j;

        while (i < s.length) {
            process.stdout.write(s[i]);
            if (down) {         // going down
                i += (k - j - 1) * 2;
            }
            else {              // going up
                i += (k - 1) * 2 - (k - j - 1) * 2;
            }

            down = !down;       // switch direction
        }
    }

    // print last row
    for (let i = k - 1; i < s.length; i += (k - 1) * 2) {
        process.stdout.write(s[i]);
    }
}

const s = 'THISPROBLEMISAWESOME';
const k = 4;

printZigZag(s, k);
```

**Output:** TOSMHRBIAOEIPLMWSSEE

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.64/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
