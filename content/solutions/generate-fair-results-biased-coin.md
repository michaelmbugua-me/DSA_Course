# Generate fair results from a biased coin

> Source: https://www.techiedelight.com/generate-fair-results-biased-coin/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Generate fair results from a biased coin that prefers one side of the coin over another and returns `TAILS` with `p` probability and `HEADS` with `1-p` probability where `p != (1-p)`.

> 

We can use the given biased coin for fair results by making two calls from the biased coin instead of one call. If the results of both calls match (both are `HEADS`, or both are `TAILS`), discard the results and start over. If the results differ, consider the first result.

How this works?

Suppose we have a `biased()` function that returns `TAILS` with `p` probability and `HEADS` with `1-p` probability. We make two independent subsequent calls to the `biased()` and store the results. Then there are four possible possibilities:

  1. The probability that both calls returns `TAILS` = `p × p`
  2. The probability that both calls returns `HEADS = (1 - p) × (1 - p)`
  3. The probability that the first call returns `TAILS`, and the second call returns `HEADS` = `p × (1 - p)`
  4. The probability that the first call returns `HEADS`, and the second call returns `TAILS` = `(1 - p) × p`

Clearly, the biased coin has the same probability of getting `TAILS` and then `HEADS` as the probability of getting `HEADS` and then `TAILS`. So if we exclude the events of two `HEADS` and two `TAILS` by repeating the procedure, we are left with the only two remaining outcomes having equivalent probability. That’s the reason why we will get a fair result.

Following is a TypeScript program that demonstrates it:

```ts
const HEADS = 1;
const TAILS = 0;

// Generates a pseudo-random integer in range [min, max]
function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// A biased function that returns TAILS with 80% probability and
// HEADS with 20% probability
function biased(): number {

    // generate a random number between 0–99, both inclusive
    const r = rand(0, 99);

    // return TAILS if we got a number between [0–79]; otherwise, return HEADS
    return r <= 79 ? TAILS : HEADS;
}

// Return HEADS and TAILS with equal probability using the specified function
function generate(): number {
    while (true) {
        const first = biased();
        const second = biased();
        if (first !== second) {
            return first;    // or return second
        }
    }
}

let x = 0, y = 0;
for (let i = 0; i < 100000; i++) {
    const val = generate();
    if (val > 0) {
        x++;
    } else {
        y++;
    }
}

console.log(`HEADS ~ ${x / 1000}%`);        // ~50%
console.log(`TAILS ~ ${y / 1000}%`);        // ~50%
```

**References:** <https://en.wikipedia.org/wiki/Fair_coin#Fair_results_from_a_biased_coin>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 75

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
