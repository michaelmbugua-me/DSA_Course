# Generate desired random numbers with equal probability

> Source: https://www.techiedelight.com/generate-random-numbers-equal-probability/

Write an algorithm to generate random numbers from 1 to 12 with equal probability, using a given function that generates random numbers from 1 to 6, with equal probability.

> 

## Approach 1

The idea is to make two separate calls to the specified function and store the result in two variables, `x` and `y`, which would be random numbers between 1 and 6. Then we can quickly establish that:

  1. The expression `x * 2` returns an even random number between 2 and 12 (i.e., 2, 4, 6, 8, 10, and 12) with equal probability.
  2. The expression `y & 1` returns either 0 or 1 depending upon whether `y` is even or odd.

The idea is to use the expression `(x * 2) - (y & 1)`, which returns random numbers from 1 to 12 with equal probability. This expression works since

  1. If `y & 1` is 0, the expression returns the random even numbers 2, 4, 6, 8, 10, and 12 with equal probability.
  2. If `y & 1` is 1, the expression returns the random odd numbers 1, 3, 5, 7, 9, and 11 with equal probability.

Following is a TypeScript program that demonstrates it:

```ts
// Generates a pseudo-random integer in range [min, max]
function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random numbers between 1 and 12 with equal probability using a
// function that generates random numbers from 1 to 6 with equal probability
function generate(): number {

    // generate two random numbers from 1 to 6 with equal probability
    const x = rand(1, 6);
    const y = rand(1, 6);

    return 2 * x - (y & 1);
}

const freq: number[] = new Array(13).fill(0);

for (let i = 0; i < 1000000; i++) {
    const val = generate();
    freq[val]++;
}

for (let i = 1; i <= 12; i++) {
    console.log(`${i} ~ ${freq[i] / 10000}%`);
}
```

**Output (will vary):** 1 ~ 8.33% 2 ~ 8.35% 3 ~ 8.35% 4 ~ 8.31% 5 ~ 8.32% 6 ~ 8.33% 7 ~ 8.29% 8 ~ 8.38% 9 ~ 8.35% 10 ~ 8.34% 11 ~ 8.35% 12 ~ 8.31%

## Approach 2

Another way to generate the desired random numbers is to use the expression `x + (y & 1) * 6` or `x + !(y & 1) * 6`, where `x` and `y` represent the output of two distinct calls made to the `random()` function.

### How this works?

Let’s consider the expression `x + (y & 1) * 6`:

  1. `x` returns random numbers from 1 to 6 with equal probability.
  2. `y & 1` returns 0 or 1 depending upon whether `y` is even or odd.

If `y` is even, the expression reduces to `x`, which gives random numbers from 1 to 6, and if `y` is odd, the expression is reduced to `x + 6`, which gives random numbers from 7 to 12.

Following is a TypeScript program that demonstrates it:

```ts
// Generate random numbers between 1 and 12 with equal probability using a
// function that generates random numbers from 1 to 6 with equal probability
function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate(): number {

    const x = rand(1, 6);
    const y = rand(1, 6);

    return x + (y & 1) * 6;
}

const freq: number[] = new Array(13).fill(0);

for (let i = 0; i < 1000000; i++) {
    const val = generate();
    freq[val]++;
}

for (let i = 1; i <= 12; i++) {
    console.log(`${i} ~ ${freq[i] / 10000}%`);
}
```

**Output (will vary):** 1 ~ 8.29% 2 ~ 8.35% 3 ~ 8.34% 4 ~ 8.39% 5 ~ 8.29% 6 ~ 8.32% 7 ~ 8.31% 8 ~ 8.32% 9 ~ 8.36% 10 ~ 8.34% 11 ~ 8.32% 12 ~ 8.37%

**Author:** Aditya Goel
