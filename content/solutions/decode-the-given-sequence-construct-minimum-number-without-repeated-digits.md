# Decode a given sequence to construct a minimum number without repeated digits

> Source: https://www.techiedelight.com/decode-the-given-sequence-construct-minimum-number-without-repeated-digits/

Given a sequence of length <= 8 consisting of `I` and `D`, where `I` denotes the increasing sequence and `D` denotes the decreasing sequence, decode the sequence to construct a minimum number without repeated digits.

For example,

**sequence output** IIDDIDID ——> 125437698 IDIDII ——> 1325467 DDDD ——> 54321 IIII ——> 12345

> 

The idea is simple and effective. For each element of the given sequence, insert its position `index+1` into a [stack](https://techiedelight.com/stack-implementation-in-cpp/). If the current character is increasing `'I'` or all characters of the input sequence are processed, pop all numbers from the stack and append them to the output string.

Following is the implementation in TypeScript based on the above idea:

```ts
// Function to decode the given sequence to construct a minimum number
// without repeated digits
function decode(seq: string): string {
    // base case
    if (!seq || !seq.length) {
        return seq;
    }

    // `result` store the output string
    let result = '';

    // create an empty stack of integers
    const stack: number[] = [];

    // run `n+1` times, where `n` is the length of the input sequence
    for (let i = 0; i <= seq.length; i++) {
        // push number `i+1` into the stack
        stack.push(i + 1);

        // if all characters of the input sequence are processed, or
        // the current character is 'I' (increasing)
        if (i === seq.length || seq[i] === 'I') {
            // run till stack is empty
            while (stack.length > 0) {
                // remove a top element from the stack and add it to the solution
                result += stack.pop();
            }
        }
    }

    return result;
}

const seq = 'IDIDII';            // input sequence
console.log('The minimum number is', decode(seq));
```

**Output:** The minimum number is 1325467

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input string.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 173

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
