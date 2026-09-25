# Implementation of KMP Algorithm – C, C++, Java, and Python

> Source: https://www.techiedelight.com/implementation-kmp-algorithm-c-cpp-java/

This post will implement the KMP algorithm in the TypeScript programming language.

We have seen that the [naive algorithm](https://techiedelight.com/introduction-pattern-matching/) for pattern matching runs in O(n.m) time, where `n` is the length of the text and `m` is the length of the pattern. This is because the algorithm doesn’t remember any information about the past matched characters. It basically matches a character with a different pattern character over and over again.

The [KMP Algorithm](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) (or _Knuth, Morris, and Pratt_ string searching algorithm) cleverly uses the previous comparison data. It can search for a pattern in O(n) time as it never re-compares a text symbol that has matched a pattern symbol. However, it uses a partial match table to analyze the pattern structure. Construction of a partial match table takes O(m) time. Therefore, the overall time complexity of the KMP algorithm is O(m + n).

Please refer to the following link for a detailed explanation of the KMP algorithm, one of the best explanations available on the web:

> [The Knuth–Morris–Pratt Algorithm in my own words](http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/)

> [Practice this algorithm](https://techiedelight.com/?problem=ImplementStrstrFunction)

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to implement the KMP algorithm
function KMP(text: string, pattern: string): void {

    // base case 1: pattern is empty
    if (!pattern) {
        console.log('The pattern occurs with shift 0');
        return;
    }

    // base case 2: text is empty, or text's length is less than that of pattern's
    if (!text || pattern.length > text.length) {
        console.log('Pattern not found');
        return;
    }

    const chars = pattern.split('');

    // next[i] stores the index of the next best partial match
    const next: number[] = new Array(pattern.length + 1).fill(0);

    for (let i = 1; i < pattern.length; i++) {
        let j = next[i];

        while (j > 0 && chars[j] !== chars[i]) {
            j = next[j];
        }

        if (j > 0 || chars[j] === chars[i]) {
            next[i + 1] = j + 1;
        }
    }

    let i = 0, j = 0;
    while (i < text.length) {
        if (j < pattern.length && text[i] === pattern[j]) {
            j = j + 1;
            if (j === pattern.length) {
                console.log(`Pattern occurs with shift ${i - j + 1}`);
            }
        } else if (j > 0) {
            j = next[j];
            i = i - 1;        // since `i` will be incremented in the next iteration
        }
        i = i + 1;
    }
}

// Program to implement the KMP algorithm in TypeScript
const text = 'ABCABAABCABAC';
const pattern = 'CAB';

KMP(text, pattern);
```

**Output:** The pattern occurs with shift 2 The pattern occurs with shift 8

Also See:

> [Introduction to Pattern Matching](https://www.techiedelight.com/introduction-pattern-matching/ "Introduction to Pattern Matching")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.4/5. Vote count: 166

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
