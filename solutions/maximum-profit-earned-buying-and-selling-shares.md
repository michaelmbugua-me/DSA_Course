# Find maximum profit earned by buying and selling shares any number of times

> Source: https://www.techiedelight.com/maximum-profit-earned-buying-and-selling-shares/

[Array](https://www.techiedelight.com/Category/Array/)

Given a list containing future prediction of share prices, find the maximum profit earned by buying and selling shares any number of times with the constraint, a new transaction can only start after the previous transaction is complete, i.e., we can only hold at most one share at a time.

For example,

**Stock Prices:** {1, 5, 2, 3, 7, 6, 4, 5} Total profit earned is 10 Buy on day 1 and sell on day 2 Buy on day 3 and sell on day 5 Buy on day 7 and sell on day 8 **Stock Prices:** {10, 8, 6, 5, 4, 2} Total profit earned is 0

> 

There are several variations to the above problem:

  1. If we are allowed to stock only once, we can [find the maximum difference between two elements in the array](https://techiedelight.com/find-maximum-difference-between-two-elements-array/), where the smaller element appears before the larger element.
  2. If we are allowed to stock shares at most twice, we can follow the approach discussed [here](https://techiedelight.com/find-maximum-profit-earned-from-at most-two-stock-transactions/).
  3. If we are allowed to stock shares at most `k` times, we can follow the approach discussed [here](https://techiedelight.com/find-maximum-profit-earned-at most-k-stock-transactions/).

The current problem allows us to make unlimited stock transactions. The idea is to traverse the given list of prices and find a local minimum of every increasing sequence. For example, the increasing sequences of length 2 or more in the array `{1, 5, 2, 3, 7, 6, 4, 5}` are `{1, 5}`, `{2, 3, 7}`, and `{4, 5}`. The local minimum of each sequence is 1, 2 and 4, respectively. We can gain maximum profit if we buy the shares at the starting of every increasing sequence (local minimum) and sell them at the end of the increasing sequence (local maximum).

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>

// Function to find the maximum profit earned by buying and
// selling shares any number of times
int findMaxProfit(int price[], int n)
{
    // keep track of the maximum profit gained
    int profit = 0;

    // initialize the local minimum to the first element's index
    int j = 0;

    // start from the second element
    for (int i = 1; i < n; i++)
    {
        // update the local minimum if a decreasing sequence is found
        if (price[i - 1] > price[i]) {
            j = i;
        }

        // sell shares if the current element is the peak,
        // i.e., (`previous <= current > next`)
        if (price[i - 1] <= price[i] &&
            (i + 1 == n || price[i] > price[i + 1]))
        {
            profit += (price[i] - price[j]);
            printf("Buy on day %d and sell on day %d\n", j + 1, i + 1);
        }
    }

    return profit;
}

int main()
{
    int price[] = { 1, 5, 2, 3, 7, 6, 4, 5 };
    int n = sizeof(price) / sizeof(price[0]);

    printf("\nTotal profit earned is %d", findMaxProfit(price, n));

    return 0;
}
```

##

```java
class Main
{
    // Function to find the maximum profit earned by buying and
    // selling shares any number of times
    public static int findMaxProfit(int[] price)
    {
        // keep track of the maximum profit gained
        int profit = 0;

        // initialize the local minimum to the first element's index
        int j = 0;

        // start from the second element
        for (int i = 1; i < price.length; i++)
        {
            // update the local minimum if a decreasing sequence is found
            if (price[i - 1] > price[i]) {
                j = i;
            }

            // sell shares if the current element is the peak,
            // i.e., (`previous <= current > next`)
            if (price[i - 1] <= price[i] &&
                (i + 1 == price.length || price[i] > price[i + 1]))
            {
                profit += (price[i] - price[j]);
                System.out.printf("Buy on day %d and sell on day %d\n", j + 1, i + 1);
            }
        }

        return profit;
    }

    public static void main(String[] args)
    {
        int[] price = { 1, 5, 2, 3, 7, 6, 4, 5 };

        System.out.print("\nTotal profit earned is " + findMaxProfit(price));
    }
}
```

##

```python3
# Function to find the maximum profit earned by buying and
# selling shares any number of times
def findMaxProfit(price):

    # keep track of the maximum profit gained
    profit = 0

    # initialize the local minimum to the first element's index
    j = 0

    # start from the second element
    for i in range(1, len(price)):

        # update the local minimum if a decreasing sequence is found
        if price[i - 1] > price[i]:
            j = i

        # sell shares if the current element is the peak, i.e.,
        # (`previous <= current > next`)
        if price[i - 1] <= price[i] and \
                (i + 1 == len(price) or price[i] > price[i + 1]):
            profit += (price[i] - price[j])
            print(f"Buy on day {j + 1} and sell on day {i + 1}")

    return profit

if __name__ == '__main__':

    price = [1, 5, 2, 3, 7, 6, 4, 5]
    print("\nTotal profit earned is", findMaxProfit(price))
```

**Output:** Buy on day 1 and sell on day 2 Buy on day 3 and sell on day 5 Buy on day 7 and sell on day 8 Total profit earned is 10

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the total number of given days.

Also See:

> [Find maximum profit earned from at most two stock transactions](https://www.techiedelight.com/find-maximum-profit-earned-from-at-most-two-stock-transactions/ "Find maximum profit earned from at most two stock transactions")

> [Find maximum profit earned from at most `k` stock transactions](https://www.techiedelight.com/find-maximum-profit-earned-at-most-k-stock-transactions/ "Find maximum profit earned from at most `k` stock transactions")

> [Find maximum profit that can be earned by conditionally selling stocks](https://www.techiedelight.com/find-maximum-profit-that-can-be-earned-by-selling-stocks/ "Find maximum profit that can be earned by conditionally selling stocks")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
