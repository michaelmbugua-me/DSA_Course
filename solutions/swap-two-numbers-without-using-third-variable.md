# Swap two numbers without using a third variable | 5 methods

> Source: https://www.techiedelight.com/swap-two-numbers-without-using-third-variable/

Given two integers, swap them without using any third variable.

## Method 1: Using addition and subtraction operator

```ts
// Swap the two elements of an array (TypeScript passes the array by reference)
function swap(a: number[]): void
{
    // return if both variables' data is the same
    if (a[0] === a[1]) {
        return;
    }

    a[0] = a[0] + a[1];          // Note: overflow might happen
    a[1] = a[0] - a[1];
    a[0] = a[0] - a[1];
}

const nums = [3, 4];
swap(nums);

console.log(`${nums[0]} ${nums[1]}`);
```

Note that the two numbers are passed inside an array, which is passed by reference, so any changes made to its elements in the function will affect the original. The same swap can also be written by operating on the array elements directly, as demonstrated below.

```ts
// Swap using array elements passed by reference
function swap(a: number[]): void
{
    if (a[0] === a[1]) {     // Check if the two values are the same
        return;
    }

    a[0] = a[0] + a[1];       // overflow might happen
    a[1] = a[0] - a[1];
    a[0] = a[0] - a[1];
}

const nums = [3, 4];
swap(nums);

console.log(`${nums[0]} ${nums[1]}`);
```

## Method 2: Using multiplication and division operator

```ts
function swap(a: number[]): void
{
    if (a[1] !== 0 && a[0] !== a[1])
    {
        a[0] = a[0] * a[1];      // overflow can happen
        a[1] = a[0] / a[1];
        a[0] = a[0] / a[1];
    }
}

const nums = [3, 4];
swap(nums);

console.log(`${nums[0]} ${nums[1]}`);
```

## Method 3: Using Bitwise XOR operator

```ts
function swap(a: number[]): void
{
    if (a[0] !== a[1])
    {
        a[0] = a[0] ^ a[1];
        a[1] = a[0] ^ a[1];
        a[0] = a[0] ^ a[1];
    }

    // in a single line
    // (x === y) || ((x ^= y), (y ^= x), (x ^= y));
}

const nums = [3, 4];
swap(nums);

console.log(`${nums[0]} ${nums[1]}`);
```

## Method 4: Using difference between two values

```ts
function swap(a: number[]): void
{
    if (a[0] !== a[1])
    {
        a[0] = a[0] - a[1];
        a[1] = a[1] + a[0];
        a[0] = a[1] - a[0];
    }

    // in a single line
    // (x === y) || ((x -= y), (y += x), (x = y - x));
}

const nums = [3, 4];

console.log("Before swap: x = " + nums[0] + " and y = " + nums[1]);
swap(nums);
console.log("\nAfter swap: x = " + nums[0] + " and y = " + nums[1]);
```

## Method 5: Using single line expressions

We can also use any of the following expressions to swap two variables in a single line:

  * x = x ^ y ^ (y = x);
  * x = x + y – (y = x);
  * x = (x × y) / (y = x);

The following TypeScript program demonstrates it:

```ts
function swap(a: number[]): void
{
    let x = a[0], y = a[1];

    // x = x ^ y ^ (y = x);
    // x = x + y - (y = x);
    x = (x * y) / (y = x);

    a[0] = x;
    a[1] = y;
}

const nums = [3, 4];
swap(nums);

console.log(`${nums[0]} ${nums[1]}`);
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 69

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
