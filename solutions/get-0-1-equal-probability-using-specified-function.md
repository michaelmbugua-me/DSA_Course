# Get 0 and 1 with equal probability using a specified function

> Source: https://www.techiedelight.com/get-0-1-equal-probability-using-specified-function/

Write an algorithm to get 0 and 1 with equal probability using a function that generates random numbers from 1 to 5 with equal probability.

> 

The algorithm can be implemented as follows in C (self-explanatory):

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Function to generate a random number from 1 to 5 with equal probability
int random() {
    return (rand() % 5) + 1;
}

// Returns 0 or 1 with equal probability using `random()` function
int generate()
{
    int r;

    do {
        // `r` could be any one of 1, 2, 3, 4, and 5
        r = random();
    } while (r == 5);

    // `r` could any of 1, 2, 3, 4 now

    // since there are 2 odd and 2 even numbers, return the last bit of `r`,
    // which could be 0 or 1 with equal probability
    return r & 1;
}

int main(void)
{
    srand(time(NULL));

    int x = 0, y = 0;

    // make 10000 calls to `generate()`
    for (int i = 1; i <= 10000; i++) {
        generate()? x++: y++;
    }

    // print the results
    printf("0 ~ %0.2f%\n", x/100.0);
    printf("1 ~ %0.2f%\n", y/100.0);

    return 0;
}
```

**`Output (will vary):`** 0 ~ 50.23% 1 ~ 49.77%

We can also do something like below, but this will increase the number of calls made to the `random()` function:

```
int generate()
{
    int r;

    do {
        // `r` could be any one of 1, 2, 3, 4, and 5
        r = random();
    } while (r > 2);

    // `r` could be 1 or 2 now

    return r - 1;
}
```

Also See:

> [Generate numbers from 1 to 7 with equal probability using a specified function](https://www.techiedelight.com/generate-numbers-1-7-equal-probability/ "Generate numbers from 1 to 7 with equal probability using a specified function")

> [Generate desired random numbers with equal probability](https://www.techiedelight.com/generate-random-numbers-equal-probability/ "Generate desired random numbers with equal probability")

> [Return 0, 1, and 2 with equal probability using a specified function](https://www.techiedelight.com/return-0-1-2-equal-probability-using-specified-function/ "Return 0, 1, and 2 with equal probability using a specified function")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.66/5. Vote count: 138

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
