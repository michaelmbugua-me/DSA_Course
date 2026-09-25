# Find maximum profit earned from at most two stock transactions

> Source: https://www.techiedelight.com/find-maximum-profit-earned-from-at-most-two-stock-transactions/

Given a list containing future predictions of share prices, find the maximum profit earned by buying and selling shares at most twice with a constraint that a new transaction can only start after the previous transaction complete, i.e., we can only hold at most one share at a time.

For example,

**Input:** Stock prices are {2, 4, 7, 5, 4, 3, 5} **Output:** The maximum profit is 7 Buy at a price 2 and sell at a price 7 Buy at a price 3 and sell at a price 5 **Input:** Stock prices are {10, 6, 8, 4, 2} **Output:** The maximum profit is 2 Buy at a price 6 and sell at a price 8 **Input:** Stock prices are {8, 7, 6, 4} **Output:** The maximum profit is 0 Buying and selling stock will result in loss

> 

There are several variations to the above problem:

  1. If we are allowed to stock only once, then we can [find the maximum difference between two elements in the array](https://techiedelight.com/find-maximum-difference-between-two-elements-array/), where the smaller element appears before the larger element.
  2. If we are allowed to stock shares at most `k` times, we can follow the approach discussed [here](https://techiedelight.com/find-maximum-profit-earned-at most-k-stock-transactions/).
  3. If we are allowed to stock shares any number of times, we can follow the approach discussed [here](https://techiedelight.com/maximum-profit-earned-buying-and-selling-shares/).

Here, we are allowed to stock shares at most twice. The idea is to use extra space to solve this problem. We create an auxiliary array `profit[]` and fill it while performing two scans of the input array, which contains the stock price information for each day.

  1. In the first scan, update profit[i] to the maximum profit earned by a single stock transaction from the day `i` till day `n-1`. We can do this by traversing the array from right to left and keeping track of the maximum stock price seen so far.
  2. In the second scan, update `profit[i]` by taking a maximum of `profit[i-1]` (i.e., maximum profit calculated so far), and the total profit obtained by closing the first transaction on the day `i` and performing another transaction from the day `i` till day `n-1`. We can find the maximum profit earned on a stock transaction closing on the day `i` by traversing the array from left to right and keeping track of the minimum stock price seen so far.

Finally, the last element of `profit[]` has the result.

Note that we can initiate the second transaction on the same day as closing the first transaction, i.e., at the same price. This does not violate the problem constraint that a second transaction can only start once the first transaction is complete. This essentially means that we have performed only a single transaction.

The algorithm can be implemented as follows in TypeScript:

**Output:** The maximum profit is 7

```ts
// Function to find the maximum profit earned from at most two stock transactions
function findMaxProfit(price: number[]): number {

    const n = price.length;

    // base case
    if (n === 0) {
        return 0;
    }

    // create an auxiliary space of size `n`
    const profit: number[] = Array(n).fill(0);

    // initialize the last element of the auxiliary space to 0
    profit[n - 1] = 0;

    // to keep track of the maximum stock price on the right of the current stock price
    let max_so_far = price[n - 1];

    // traverse the array from right to left
    for (let i = n - 2; i >= 0; i--) {

        // update profit[i] to the maximum profit earned by a single stock
        // transaction from the day `i` till day `n-1`
        profit[i] = Math.max(profit[i + 1], max_so_far - price[i]);

        // update maximum stock price seen so far
        max_so_far = Math.max(max_so_far, price[i]);
    }

    // to keep track of the minimum stock price to the left of the current stock price
    let min_so_far = price[0];

    // traverse the array from left to right
    for (let i = 1; i < n; i++) {

        /* Update profit[i] by taking a maximum of the following:
           1. profit[i-1], which represents the maximum profit calculated so far
           2. The total profit obtained by closing the first transaction on the day `i`
              and performing another transaction from the day `i` till day `n-1`. */

        profit[i] = Math.max(profit[i - 1], (price[i] - min_so_far) + profit[i]);

        // update the minimum stock price seen so far
        min_so_far = Math.min(min_so_far, price[i]);
    }

    // the last element of profit stores the result
    return profit[n - 1];
}

const price = [2, 4, 7, 5, 4, 3, 5];

console.log(`The maximum profit is ${findMaxProfit(price)}`);
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the total number of given days.

Also See:

> [Find maximum profit earned from at most `k` stock transactions](https://www.techiedelight.com/find-maximum-profit-earned-at-most-k-stock-transactions/ "Find maximum profit earned from at most `k` stock transactions")

> [Find maximum profit earned by buying and selling shares any number of times](https://www.techiedelight.com/maximum-profit-earned-buying-and-selling-shares/ "Find maximum profit earned by buying and selling shares any number of times")

> [Find maximum profit that can be earned by conditionally selling stocks](https://www.techiedelight.com/find-maximum-profit-that-can-be-earned-by-selling-stocks/ "Find maximum profit that can be earned by conditionally selling stocks")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.66/5. Vote count: 167

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
