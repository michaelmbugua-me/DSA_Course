# Division of two numbers using binary search algorithm

> Source: https://www.techiedelight.com/division-two-numbers-using-binary-search-algorithm/

Divide & Conquer

This post will discuss the division of two numbers (integer or decimal) using the binary search algorithm.

We can easily modify the [binary search algorithm](https://techiedelight.com/binary-search/) to perform the division of two decimal numbers. We start by defining the range for our result as `[0, INFINITY]`, which is the initial `low` and `high` for the binary search algorithm. Now we need to find a `mid` that satisfies `x / y = mid` or `x = y × mid` for given two numbers, `x` and `y`, which will be our result.

Based on a comparison result between `x` and `y × mid`, either update `low` or `high`, or return `mid` if:

  * `y × mid` is _almost_ equal to `x`, return `mid`.
  * `y × mid` is less than `x`, update `low` to `mid`.
  * `y × mid` is more than `x`, update `high` to `mid`.

We also need to take care of a few conditions like divisibility by 0, the result’s sign, etc., as demonstrated in below in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

// Define INFINITY as `ULONG_MAX`
#define INF ULONG_MAX

double getAbsolute(double i) {
    return i >= 0 ? i : -i;
}

// Function to perform a division of two numbers using the binary search algorithm
double divide(double x, double y)
{
    // handle divisibility by 0
    if (y == 0) {
        return INF;        // return INFINITY
    }

    // Set range for result [low, high]. The `high` is set to INFINITY
    // to handle the case when `y < 1`, and `x < result < INF`
    double low = 0, high = INF;

    // set accuracy of the result
    double precision = 0.001;

    // store sign of the result
    int sign = 1;
    if (x * y < 0) {
        sign = -1;
    }

    // make both input numbers positive
    x = getAbsolute(x);
    y = getAbsolute(y);

    while (1)
    {
        // calculate mid
        double mid = low + ((high - low)/2);

        // if `y×mid` is almost equal to `x`, return `mid`
        if (getAbsolute(y * mid - x) <= precision) {
            return mid * sign;
        }

        // if `y×mid` is less than `x`, update `low` to `mid`
        if (y * mid < x) {
            low = mid;
        }
        else {
            // if `y×mid` is more than `x`, update `high` to `mid`
            high = mid;
        }
    }
}

int main(void)
{
    printf("%f", divide(22, 7));

    return 0;
}
```

**Output:** 3.142822

##

```java
class Main
{
    // Function to perform a division of two numbers using the
    // binary search algorithm
    public static double divide(double x, double y)
    {
        // handle divisibility by 0
        if (y == 0) {
            return Double.MAX_VALUE;        // return INFINITY
        }

        // Set range for result [left, right].
        // `right` is set to INFINITY to handle the case
        // when `y < 1`, and `x < result < Double.MAX_VALUE`
        double left = 0.0, right = Double.MAX_VALUE;

        // set accuracy of the result
        double precision = 0.001;

        // store sign of the result
        int sign = 1;
        if (x * y < 0) {
            sign = -1;
        }

        // make both input numbers positive
        x = Math.abs(x);
        y = Math.abs(y);

        while (true)
        {
            // calculate mid
            double mid = left + ((right - left) / 2);

            // if `y×mid` is almost equal to `x`, return `mid`
            if (Math.abs(y * mid - x) <= precision) {
                return mid * sign;
            }

            // if `y×mid` is less than `x`, update `left` to `mid`
            if (y * mid < x) {
                left = mid;
            }
            else {
                // if `y×mid` is more than `x`, update `right` to `mid`
                right = mid;
            }
        }
    }

    public static void main(String[] args) {
        System.out.println(divide(22, 7));
    }
}
```

##

```python3
# Function to perform a division of two numbers using the
# binary search algorithm
def divide(x, y):

    INF = 100000000000.0    # take a huge number as INFINITY

    # handle divisibility by 0
    if y == 0:
        return INF          # return INFINITY

    # Set range for result [left, right].
    # The `right` is set to INFINITY to handle the case
    # when `y < 1`, and `x < result < INFINITY`
    left = 0.0
    right = INF

    # set accuracy of the result
    precision = 0.001

    # store sign of the result
    sign = 1
    if x * y < 0:
        sign = -1

    # make both input numbers positive
    x = abs(x)
    y = abs(y)

    while True:
        # calculate mid
        mid = left + (right - left) / 2

        # if `y×mid` is almost equal to `x`, return `mid`
        if abs(y * mid - x) <= precision:
            return mid * sign

        # if `y×mid` is less than `x`, update `left` to `mid`
        if y * mid < x:
            left = mid
        else:
            # if `y×mid` is more than `x`, update `right` to `mid`
            right = mid

if __name__ == '__main__':

    print(divide(22, 7))
```

The time complexity of the above solution is O(log(n)), where `n` is equal to `MAX_VAL`.

Also See:

> [Unbounded Binary Search](https://www.techiedelight.com/unbounded-binary-search/ "Unbounded Binary Search")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 155

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
