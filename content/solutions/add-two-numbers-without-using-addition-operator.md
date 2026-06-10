# Add two numbers without using the addition operator | 5 methods

> Source: https://www.techiedelight.com/add-two-numbers-without-using-addition-operator/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given two numbers, add them without using an addition operator.

## 1\. Using subtraction operator

```ts
function add(a: number, b: number): number {
    return a - (-b);
}
```

## 2\. Repeated Addition/Subtraction using `--/++` operator

```ts
function add(a: number, b: number): number {
    // to handle positive `a`
    while (a > 0) {
        b++;
        a--;
    }

    // to handle negative `a`
    while (a < 0) {
        b--;
        a++;
    }

    return b;
}

console.log(add(5, 8));
console.log(add(5, -8));
console.log(add(-5, 8));
```

**Output:** 13 -3 3

## 3\. Using `printf()` function

This method makes use of two facts:

  1. We can use an asterisk `*` to pass the width precision to `printf()`, rather than hard-coding it into the format string.
  2. `printf()` function returns the total number of characters printed on the output stream.

Note that we can also use `%*c, ' '` replacing `%*s, ""`.

```ts
function add(a: number, b: number): number {
    // `%*s` in C means print a space `*` number of times and the return
    // value is the total number of characters printed — the string length
    return (' '.repeat(a) + ' '.repeat(b)).length;
}
```

## 4\. Half adder logic

```ts
function add(a: number, b: number): number {
    if (!b) {
        return a;
    }

    const sum = a ^ b;
    const carry = (a & b) << 1;

    return add(sum, carry);
}
```

## 5\. Using logarithm and exponential function

```ts
const a = 8, b = 6;

console.log(Math.log(Math.exp(a) * Math.exp(b)));
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.33/5. Vote count: 92

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
