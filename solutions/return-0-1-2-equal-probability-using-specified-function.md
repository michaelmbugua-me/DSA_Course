# Return 0, 1, and 2 with equal probability using a specified function

> Source: https://www.techiedelight.com/return-0-1-2-equal-probability-using-specified-function/

Write an algorithm to generate 0, 1, and 2 with equal probability using a specified function that either produces 0 or 1 with 50% probability.

> 

Let’s assume the specified function is `random()`, which generates 0 or 1 with `50%` probability. Then if we make two different calls to the `random()` function and store the result in two variables, `x` and `y`, then their sum `x+y` can be any of `{0, 1, 2}`. Here, the probability of getting 0 and 2 is `25%` each, and the likelihood of getting 1 is `50%`.

Now the problem reduces to decreasing the probability of getting 1 from `50%` to `25%`. We can easily do so by forcing our function to never generate either `(x = 1, y = 0)` or `(x = 0, y = 1)` which causes the sum to be equal to 1.

The implementation can be seen below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int random()
{
    // `rand()` produces a random number
    int random = rand();

    // return 0 if the random number is even; otherwise, return 1
    return (random % 2);
}

// Return 0, 1, and 2 with equal probability using the specified function
int generate()
{
    int x = random();
    int y = random();

    // if `x == 1` and `y == 0`, try again
    return (x == 1 && y == 0)? generate(): (x + y);
}

int main(void)
{
    // initialize srand with a distinctive value
    srand(time(NULL));

    int x = 0, y = 0, z = 0;

    for (int i = 0; i < 100000; i++)
    {
        int val = generate();
        (val == 0) ? x++ : (val == 1 ? y++: z++);
    }

    printf("0 ~ %f%\n1 ~ %f%\n2 ~ %f%%", x/1000.0, y/1000.0, z/1000.0);

    return 0;
}
```

##

```java
import java.util.Random;

class Main
{
    // Return 0 and 1 with equal probability
    public static int random() {
        return new Random().nextInt(2);
    }

    // Return 0, 1, and 2 with equal probability using the specified function
    public static int generate()
    {
        int x = random();
        int y = random();

        // if `x == 1` and `y == 0`, try again
        return (x == 1 && y == 0)? generate(): (x + y);
    }

    public static void main(String[] args)
    {
        int zero = 0, one = 0, two = 0;

        for (int i = 0; i < 100000; i++)
        {
            int val = generate();
            if (val == 0) {
                zero++;
            }
            else if (val == 1) {
                one++;
            }
            else {
                two++;
            }
        }

        System.out.println("0 ~ " + zero/1000.0 + "%");
        System.out.println("1 ~ " + one/1000.0 + "%");
        System.out.println("2 ~ " + two/1000.0 + "%");
    }
}
```

##

```python3
from random import randrange

# Return 0 and 1 with equal probability
def random():
    return randrange(2)

# Return 0, 1, and 2 with equal probability using the specified function
def generate():

    x = random()
    y = random()

    # if `x == 1` and `y == 0`, try again
    return generate() if (x == 1 and y == 0) else (x + y)

if __name__ == '__main__':

    zero = one = two = 0

    for i in range(100000):
        val = generate()
        if val == 0:
            zero += 1
        elif val == 1:
            one += 1
        else:
            two += 1

    print('0 ~', zero / 1000, '%')
    print('1 ~', one / 1000, '%')
    print('2 ~', two / 1000, '%')
```

**Output (will vary):** 0 ~ 33.488% 1 ~ 33.176% 2 ~ 33.336%

Another plausible way of generating 0, 1, and 2 with equal probability is to use the expression `2 × random() + random()`, which produces `0, 1, 2, 3`, all with equal probability. Similar to the previous approach, if we make the probability of getting 3 from `25%` to `0%`, then the function returns 0, 1, and 2 with `25%` probability.

Following is the C, Java, and Python implementation of the idea:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int random()
{
    // `rand()` produces a random number
    int random = rand();

    // if the random number is even, return 0; otherwise, return 1
    return (random % 2);
}

// Return 0, 1, and 2 with equal probability using the specified function
int generate()
{
    // rand is one of { 0, 1, 2, or 3 } with equal probability (25% each)
    int rand = 2 * random() + random();

    // return rand if it is 0, 1, or 2; otherwise, try again
    return (rand <= 2) ? rand : generate();
}

int main(void)
{
    // initialize srand with a distinctive value
    srand(time(NULL));

    int x = 0, y = 0, z = 0;

    for (int i = 0; i < 100000; i++)
    {
        int val = generate();
        (val == 0) ? x++ : (val == 1 ? y++: z++);
    }

    printf("0 ~ %f%\n1 ~ %f%\n2 ~ %f%%", x/1000.0, y/1000.0, z/1000.0);

    return 0;
}
```

##

```java
import java.util.Random;

class Main
{
    // Return 0 and 1 with equal probability
    public static int random() {
        return new Random().nextInt(2);
    }

    // Return 0, 1, and 2 with equal probability using the specified function
    public static int generate()
    {
        // rand is one of { 0, 1, 2, or 3 } with equal probability (25% each)
        int rand = 2 * random() + random();

        // return rand if it is 0, 1, or 2; otherwise, try again
        return (rand <= 2) ? rand : generate();
    }

    public static void main(String[] args)
    {
        int zero = 0, one = 0, two = 0;

        for (int i = 0; i < 100000; i++)
        {
            int val = generate();
            if (val == 0) {
                zero++;
            }
            else if (val == 1) {
                one++;
            }
            else {
                two++;
            }
        }

        System.out.println("0 ~ " + zero/1000.0 + "%");
        System.out.println("1 ~ " + one/1000.0 + "%");
        System.out.println("2 ~ " + two/1000.0 + "%");
    }
}
```

##

```python3
from random import randrange

# Return 0 and 1 with equal probability
def random():
    return randrange(2)

# Return 0, 1, and 2 with equal probability using the specified function
def generate():

    # rand is one of 0, 1, 2, or 3 with equal probability (25% each)
    rand = 2 * random() + random()

    # return rand if it is 0, 1, or 2; otherwise, try again
    return rand if (rand <= 2) else generate()

if __name__ == '__main__':

    zero = one = two = 0

    for i in range(100000):
        val = generate()
        if val == 0:
            zero = zero + 1
        elif val == 1:
            one = one + 1
        else:
            two = two + 1

    print('0 ~', zero / 1000, '%')
    print('1 ~', one / 1000, '%')
    print('2 ~', two / 1000, '%')
```

**Output (will vary):** 0 ~ 33.411% 1 ~ 33.518% 2 ~ 33.071%

**Author:** Aditya Goel
