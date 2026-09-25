# Compute modulus division without division and modulo operator

> Source: https://www.techiedelight.com/compute-modulus-division-without-division-modulo-operator/

Compute modulus division of a positive number `n` by another positive number `d`, which is a power of 2, without using division or modulo operator.

In order words, compute `n % d` without using `/` and `%` operators, where `d` is one of `1, 2, 4, 8, 16, 32, …`. Since `d` is a power of 2, `d` can be represented as `1 << s`, where `s` is a positive number.

We can use the expression `n & (d-1)` to compute the value of the expression `n % d` when `n` and `d` are both positive and `d` is a power of 2.

How this works?

The expression `d-1` has all the bits flipped (0 to 1) after the set bit of `d` (which is also flipped from 1 to 0), i.e.,

00001000 (d = 8) 00000111 (d-1 = 7)

So, the expression `n & (d-1)` converts all left bits of `n` starting from the `i'th` bit to 0 and leave bits from 0 to `i-1` as it is. Here, `i` is the position of the only set bit in `d`. For example,

00010010 & (n = 18) 00000111 (d-1 = 7) ~~~~~~~~ 00000010 (n % d)

This method is demonstrated below in TypeScript:

```ts
// Function to compute `n % d` without using division and modulo operator
function compute(n: number, d: number): number {
    return n & (d - 1);
}

const n = 18;

const s = 3;
const d = 1 << s;   // So, `d` is one of 1, 2, 4, 8, 16, 32, …

// `m` will be `n % d`
const m = compute(n, d);

console.log(`${n} % ${d} = ${m}`);
```

**Output:** 18 % 8 = 2

Note that if `d` is not a power of 2, then to compute `n % d`, do repeated subtractions until we get the remainder, as demonstrated below in TypeScript:

```ts
// Function to compute `n % d` without using division and modulo operator
function compute(n: number, d: number): number {
    while (n > 0) {
        n = n - d;
    }

    return n + d;
}

const n = 38;
const d = 7;

const m = compute(n, d);
console.log(`${n} % ${d} = ${m}`);
```

**Output:** 38 % 7 = 3

**Reference:** [Bit Twiddling Hacks](http://graphics.stanford.edu/~seander/bithacks.html#ModulusDivisionEasy)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.65/5. Vote count: 51

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
