# Find maximum and minimum value of a triplet without using a conditional statement

> Source: https://www.techiedelight.com/maximum-minimum-three-numbers-without-using-conditional-statement-ternary-operator/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given three integers, find the maximum and minimum number between them without using conditional statements or ternary operator.

## Approach 1: Using short-circuiting in Boolean expressions

The idea is to take advantage of [short-circuiting](https://en.wikipedia.org/wiki/Short-circuit_evaluation) in Boolean expressions. We know that in Boolean `AND` operations such as `x && y`, `y` is only evaluated if `x` is true. If `x` is false, then `y` is not evaluated because the whole expression would be false, which can be deduced without even evaluating `y`. This is called short-circuiting in Boolean expressions.

The idea is to apply this principle to the following code. Initially, `max` is `a`. If `max < b` is true, then that means `b` is greater than `a`, so the second subexpression `max = b` is evaluated, and `max` is set to `b`. If, however, `max < b` is false, then the second subexpression is not evaluated, and `max` will remain `a` (greater than `b`). Similarly, the second expression is evaluated.

We can implement the minimum function as well, in a similar fashion, as demonstrated below in TypeScript:

```ts
function maximum(a: number, b: number, c: number): number {
    // initialize `max` with `a`
    let max = a;

    // set `max` to `b` if and only if `max` is less than `b`
    (max < b) && (max = b);    // these are not conditional statements

    // set `max` to `c` if and only if `max` is less than `c`
    (max < c) && (max = c);    // these are just boolean expressions

    return max;
}

function minimum(a: number, b: number, c: number): number {
    // initialize `min` with `a`
    let min = a;

    // set `min` to `b` if and only if `min` is more than `b`
    (min > b) && (min = b);

    // set `min` to `c` if and only if `min` is more than `c`
    (min > c) && (min = c);

    return min;
}

console.log(maximum(7, 9, 4));
console.log(minimum(6, 3, 9));
```

## Approach 2: Using array index

```ts
function maximum(a: number, b: number, c: number): number {
    // `first` will contain the first two elements
    const first: number[] = [a, b];

    // `second` will contain the maximum of the first two elements at
    // the 0th index and the third element at index 1
    const second: number[] = [first[Number(a < b)], c];

    // finally, return the maximum element
    return second[Number(second[0] < c)];
}

function minimum(a: number, b: number, c: number): number {
    // `first` will contain the first two elements
    const first: number[] = [a, b];

    // `second` will contain the minimum of the first two elements at the
    // 0th index and the third element at index 1
    const second: number[] = [first[Number(a > b)], c];

    // finally, return the minimum element
    return second[Number(second[0] > c)];
}

console.log(maximum(6, 3, 9));
console.log(minimum(6, 3, 9));
```

We can simplify the above approach by breaking the problem into finding the maximum/minimum of two numbers. The following TypeScript program demonstrates it:

```ts
function maximum(a: number, b: number): number {
    const lookup: number[] = [a, b];
    return lookup[Number(a < b)];
}

function maximumOf(a: number, b: number, c: number): number {
    return maximum(a, maximum(b, c));
}

console.log(maximumOf(6, 3, 9));
```

We can implement the minimum function, in a similar fashion, as demonstrated below in TypeScript:

```ts
function minimum(a: number, b: number): number {
    const lookup: number[] = [a, b];
    return lookup[Number(a > b)];
}

function minimumOf(a: number, b: number, c: number): number {
    return minimum(a, minimum(b, c));
}

console.log(minimumOf(6, 3, 9));
```

## Approach 3: Using repeated subtraction

```ts
function minimum(a: number, b: number, c: number): number {
    let min = 0;
    while (a && b && c) {
        a--, b--, c--, min++;
    }

    return min;
}

function maximum(a: number, b: number, c: number): number {
    let max = 0;
    while (a > 0 || b > 0 || c > 0) {
        a--, b--, c--, max++;
    }

    return max;
}

console.log(maximum(6, 3, 9));
console.log(minimum(6, 3, 9));
```

**References:** <https://stackoverflow.com/questions/7074010/find-maximum-of-three-number-in-c-without-using-conditional-statement-and-ternar>

Also See:

> [Check if a number is even or odd without using any conditional statement](https://www.techiedelight.com/find-number-even-odd-without-using-conditional-statement/ "Check if a number is even or odd without using any conditional statement")

> [Find minimum number without using conditional statement or ternary operator](https://www.techiedelight.com/find-minimum-number-without-using-conditional-statement-ternary-operator/ "Find minimum number without using conditional statement or ternary operator")

> [Find maximum number without using conditional statement or ternary operator](https://www.techiedelight.com/find-maximum-number-without-using-conditional-statement-ternary-operator/ "Find maximum number without using conditional statement or ternary operator")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 54

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
