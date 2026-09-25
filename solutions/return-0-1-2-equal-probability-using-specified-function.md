# Return 0, 1, and 2 with equal probability using a specified function

> Source: https://www.techiedelight.com/return-0-1-2-equal-probability-using-specified-function/

Write an algorithm to generate 0, 1, and 2 with equal probability using a specified function that either produces 0 or 1 with 50% probability.

> 

Let’s assume the specified function is `random()`, which generates 0 or 1 with `50%` probability. Then if we make two different calls to the `random()` function and store the result in two variables, `x` and `y`, then their sum `x+y` can be any of `{0, 1, 2}`. Here, the probability of getting 0 and 2 is `25%` each, and the likelihood of getting 1 is `50%`.

Now the problem reduces to decreasing the probability of getting 1 from `50%` to `25%`. We can easily do so by forcing our function to never generate either `(x = 1, y = 0)` or `(x = 0, y = 1)` which causes the sum to be equal to 1.

The implementation can be seen below in TypeScript:

```ts
// Return 0 and 1 with equal probability
function random(): number {
    return Math.round(Math.random());
}

// Return 0, 1, and 2 with equal probability using the specified function
function generate(): number {
    const x = random();
    const y = random();

    // if `x == 1` and `y == 0`, try again
    return x === 1 && y === 0 ? generate() : x + y;
}

let zero = 0, one = 0, two = 0;

for (let i = 0; i < 100000; i++) {
    const val = generate();
    if (val === 0) {
        zero++;
    }
    else if (val === 1) {
        one++;
    }
    else {
        two++;
    }
}

console.log(`0 ~ ${zero / 1000}%`);
console.log(`1 ~ ${one / 1000}%`);
console.log(`2 ~ ${two / 1000}%`);
```



**Output (will vary):** 0 ~ 33.488% 1 ~ 33.176% 2 ~ 33.336%

Another plausible way of generating 0, 1, and 2 with equal probability is to use the expression `2 × random() + random()`, which produces `0, 1, 2, 3`, all with equal probability. Similar to the previous approach, if we make the probability of getting 3 from `25%` to `0%`, then the function returns 0, 1, and 2 with `25%` probability.

Following is a TypeScript implementation of the idea:

```ts
// Return 0 and 1 with equal probability
function random(): number {
    return Math.round(Math.random());
}

// Return 0, 1, and 2 with equal probability using the specified function
function generate(): number {
    // rand is one of 0, 1, 2, or 3 with equal probability (25% each)
    const rand = 2 * random() + random();

    // return rand if it is 0, 1, or 2; otherwise, try again
    return rand <= 2 ? rand : generate();
}

let zero = 0, one = 0, two = 0;

for (let i = 0; i < 100000; i++) {
    const val = generate();
    if (val === 0) {
        zero++;
    }
    else if (val === 1) {
        one++;
    }
    else {
        two++;
    }
}

console.log(`0 ~ ${zero / 1000}%`);
console.log(`1 ~ ${one / 1000}%`);
console.log(`2 ~ ${two / 1000}%`);
```



**Output (will vary):** 0 ~ 33.411% 1 ~ 33.518% 2 ~ 33.071%

**Author:** Aditya Goel
