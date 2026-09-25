# Generate 0 and 1 with 75% and 25% probability

> Source: https://www.techiedelight.com/generate-0-1-75-25-probability/

Write an algorithm to generate 0 and 1 with 75% and 25% probability, respectively, using a specified function that produces either 0 or 1 each with 50% probability.

> 

The following function generates 0 or 1 with 50% probability each, which can be used to generate 0 and 1 with 75% and 25% probability:

```ts
function random(): number
{
    // return 0 or 1, each with 50% probability
    return Math.floor(Math.random() * 2);
}
```

## 1\. Using Bitwise AND Operator (or Logical AND Operator)

We can use bitwise or logical `AND` operator to solve this problem. The idea is two make two calls to the `random()` function and return `AND` of results returned by the individual calls.

```ts
// Return 0 and 1 with 75% and 25% probability, respectively, using the
// specified function and bitwise AND operator
function generate(): number
{
    const x = random();
    const y = random();

    return (x & y);
}
```

**Explanation:**

x can be either {0, 1} y can be either {0, 1} (x & y) can be either {0, 0, 0, 1}

## 2\. Using Bitwise OR Operator (or Logical OR Operator)

We can also use a bitwise or logical `OR` operator. The idea remains similar. First, make two calls to the `random()` function and then return the negation of `OR` of results returned by the individual calls, as shown below:

```ts
// Return 0 and 1 with 75% and 25% probability, respectively, using the
// specified function and bitwise OR operator
function generate(): number
{
    const x = random();
    const y = random();

    return Number(!(x | y));
}
```

**Explanation:**

x can be either {0, 1} y can be either {0, 1} (x | y) can be either {1, 1, 1, 0} !(x | y) can be either {0, 0, 0, 1}

## 3\. Using Left Shift Operator and Bitwise XOR Operator

The idea is to use this expression: `(random() << 1) ^ random()`.

**How this works?**

random() returns either 0000 or 0001 (in binary) (random() << 1) can be either 0000 or 0010 (random() << 1) ^ random() can be either {0001, 0011, 0000, 0010}

```ts
// Return 0 and 1 with 75% and 25% probability, respectively, using the
// specified function, left shift operator, and bitwise XOR operator
function generate(): number {
    return Number(((random() << 1) ^ random()) === 0);
}
```

**Author:** Aditya Goel

Also See:

> [Generate numbers from 1 to 7 with equal probability using a specified function](https://www.techiedelight.com/generate-numbers-1-7-equal-probability/ "Generate numbers from 1 to 7 with equal probability using a specified function")

> [Return 0, 1, and 2 with equal probability using a specified function](https://www.techiedelight.com/return-0-1-2-equal-probability-using-specified-function/ "Return 0, 1, and 2 with equal probability using a specified function")

> [Get 0 and 1 with equal probability using a specified function](https://www.techiedelight.com/get-0-1-equal-probability-using-specified-function/ "Get 0 and 1 with equal probability using a specified function")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
