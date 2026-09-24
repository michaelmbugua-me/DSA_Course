# Generate numbers from 1 to 7 with equal probability using a specified function

> Source: https://www.techiedelight.com/generate-numbers-1-7-equal-probability/

Write an algorithm to generate numbers from 1 to 7 with equal probability using a specified function that produces random numbers between 1 and 5.

> 

Suppose the specified function is `random()`, which generates random numbers from 1 to 5 with equal probability. The idea is to use the expression `5 × (random() - 1) + random()` which uniformly produces random numbers in the range `[1–25]`. So if we exclude the possibility of the random number being one among `[8–25]` by repeating the procedure, we are left with numbers between 1 and 7 having equivalent probability.

How this works?

Since `random()` returns random numbers from 1 to 5 with equal probability, `R = 5 × (random() - 1)` can be any of 0, 5, 10, 15 or 20. Now for the second `random()` call, let’s explore all possibilities:

If R = 0, R + random() can be any of 1, 2, 3, 4, 5 If R = 5, R + random() can be any of 6, 7, 8, 9, 10 If R = 10, R + random() can be any of 11, 12, 13, 14, 15 If R = 15, R + random() can be any of 15, 16, 17, 18, 19, 20 If R = 20, R + random() can be any of 21, 22, 23, 24, 25

So, the expression uniformly distributes the numbers in the range `[1–25]`. Following is the C, Java, and Python implementation of the idea:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

// Function to generate a random number from 1 to 5 with equal probability
int getRandom() {
    return (rand() % 5) + 1;
}

// Function to generate a random number from 1 to 7 with equal probability
// by using the specified function
int generate()
{
    int r;
    do {
        r = 5 * (getRandom() - 1) + getRandom();
    } while (r > 7);

    return r;
}

int main(void)
{
    // initialize srand with a distinctive value
    srand(time(NULL));

    // count array to validate the results
    int count[8];
    memset(count, 0, sizeof count);

    // make 1000000 calls to the `generate()` function and store the results
    for (int i = 1; i <= 1000000; i++)
    {
        int val = generate();
        count[val]++;
    }

    // print the results
    for (int i = 1; i <= 7; i++) {
        printf("%d ~ %0.2f%\n", i, count[i]/10000.0);
    }

    return 0;
}
```

##

```java
import java.util.Random;

class Main
{
    // Generates a pseudo-random integer in range `[min, max]`
    public static int rand(int min, int max)
    {
        if (min > max || (max - min + 1 > Integer.MAX_VALUE)) {
            throw new IllegalArgumentException("Invalid range");
        }

        return new Random().nextInt(max - min + 1) + min;
    }

    // Function to generate a random number from 1 to 7 with equal probability
    // by using the specified function
    public static int generate()
    {
        int r;
        do {
            r = 5 * (rand(1, 5) - 1) + rand(1, 5);
        } while (r > 7);

        return r;
    }

    public static void main(String[] args)
    {
        // count array to validate the results
        int[] count = new int[8];

        // make 1000000 calls to the `generate()` function and store the results
        for (int i = 1; i <= 1000000; i++)
        {
            int val = generate();
            count[val]++;
        }

        // print the results
        for (int i = 1; i <= 7; i++) {
            System.out.println(i + " ~ " + (count[i] / 10000.0) + "%");
        }
    }
}
```

##

```python3
from random import randint

# Function to generate a random number from 1 to 7 with equal probability
# by using the specified function
def generate():

    while True:
        x = randint(1, 5)
        y = randint(1, 5)

        r = 5 * (x - 1) + y
        if r <= 7:
            break

    return r

if __name__ == '__main__':

    # count list to validate the results
    count = [0] * 8

    # make 1000000 calls to the `generate()` function and store the results
    for i in range(1000000):
        val = generate()
        count[val] = count[val] + 1

    # print the results
    for i in range(1, 8):
        print(f'{i}~{count[i]/10000}%')
```

**Output (will vary):** 1 ~ 14.29% 2 ~ 14.25% 3 ~ 14.33% 4 ~ 14.27% 5 ~ 14.26% 6 ~ 14.31% 7 ~ 14.29%

To minimize the total number of calls to the `random()` function, stop the while loop at `r <= 21` and use the modulo operator, as shown below:

```
int generate()
{
    int r;
    do {
        r = 5 * (random() - 1) + random();
    } while (r > 21);

    return (r % 7) + 1;
}
```

Also See:

> [Return 0, 1, and 2 with equal probability using a specified function](https://www.techiedelight.com/return-0-1-2-equal-probability-using-specified-function/ "Return 0, 1, and 2 with equal probability using a specified function")

> [Generate desired random numbers with equal probability](https://www.techiedelight.com/generate-random-numbers-equal-probability/ "Generate desired random numbers with equal probability")

> [Get 0 and 1 with equal probability using a specified function](https://www.techiedelight.com/get-0-1-equal-probability-using-specified-function/ "Get 0 and 1 with equal probability using a specified function")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 151

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
