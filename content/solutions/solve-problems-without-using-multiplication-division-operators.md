# Solve a given set of problems without using multiplication or division operators

> Source: https://www.techiedelight.com/solve-problems-without-using-multiplication-division-operators/

This post will discuss a few related problems that can be solved without using multiplication and division operators.

## Problem 1. Multiply a given integer with 15 without using multiplication and division operators.

The idea is to use the left shift bitwise operator to solve this problem. Let the given integer be `n`. We know that `15 × n` can be rewritten as:

`15 × n = (16 × n - n) = (n << 4) - n`

We can extend this solution to any number of forms, `2i-1`, where `i >= 1`, and we can use the expression `(n << i) - n `

### Another approach:

`15 × n` can also be rewritten as `15 × n = 8n + 4n + 2n + n = (n << 3) + (n << 2) + (n << 1) + n`

## Problem 2. Multiply a given even integer with 7.5 without using multiplication and division operators.

We know that `7.5n` can also be rewritten as `15 × n/2`. We can easily use expressions used in problem 1 to solve this problem as well.

`7.5n = 15 × n/2 = ((n << 4) - n) >> 1` OR

`7.5n = 15 × n/2 = ((n << 3) + (n << 2) + (n << 1) + n ) >> 1`

### Another approach:

`7.5n` can also be rewritten as `7.5n = 8n - n/2 = ((n << 3) - (n >> 1))`

Please note that if `n` is odd, the above expression will return the ceil of the result. Instead, use the below expression to return the floor.

`(n << 3) - (n >> 1) - (n & 1);`

Please note that the above solutions are prone to overflow as we are using a left shift operator.

## Problem 3. Calculate value of 15 × n/16 without using multiplication and division operators.

Like problem 2, we can easily use expressions used in problem 1 to solve this problem.

`15 × n/16 = (n << 4) - n) >> 4` OR

`15 × n/16 = ((n << 3) + (n << 2) + (n << 1) + n) >> 4`

### Another approach:

`15 × n/16` can also be rewritten as `15 × n/16 = n - n/16 = n - (n >> 4)`

Note that the first two expressions are equivalent to `(15 × n)/16`, but the last expression is equivalent to `15×(n/16)`. Therefore, the results can differ in both.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 66

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
