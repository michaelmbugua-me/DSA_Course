# Find the square of a number without using the multiplication and division operator

> Source: https://www.techiedelight.com/find-square-number-without-using-multiplication-division-operator/

Given an integer, find its square without using multiplication and division operator. Also, the use of the power function from any programming language library is not allowed.

## Method 1:

The idea is based on the fact that the square root of any number `n` can be calculated by adding odd numbers exactly `n` times. The relation can be expressed as:

12 = 1 22 = (1 + 3) = 4 32 = (1 + 3 + 5 = 9) 42 = (1 + 3 + 5 + 7) = 16

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

int findSquare(int num)
{
    int odd = 1;
    int sq = 0;

    // convert the number to positive if it is negative
    num = abs(num);

    // add odd numbers num times to result
    while (num--)
    {
        sq = sq + odd;
        odd = odd + 2;
    }

    return sq;
}

int main()
{
    cout << findSquare(8) << " " << findSquare(-4);

    return 0;
}
```

**Output:** 64 16

##

```java
class Main
{
    public static int findSquare(int num)
    {
        int odd = 1;
        int sq = 0;

        // convert the number to positive if it is negative
        num = Math.abs(num);

        while (num-- > 0)
        {
            sq = sq + odd;
            odd = odd + 2;
        }

        return sq;
    }

    public static void main(String[] args)
    {
        System.out.println(findSquare(8));
        System.out.println(findSquare(-4));
    }
}
```

##

```python3
def findSquare(num):

    odd = 1
    sq = 0

    # convert the number to positive if it is negative
    num = abs(num)

    while num > 0:
        sq = sq + odd
        odd = odd + 2
        num = num - 1

    return sq

if __name__ == '__main__':

    print(findSquare(8))
    print(findSquare(-4))
```

## Method 2: Repeatedly adding a given number to the result

The idea is to repeatedly add a given number `n` to the result `n` times. For example,

For n = 5, 52 = (5 + 5 + 5 + 5 + 5) = 25

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
using namespace std;

int findSquare(int num)
{
    // convert the number to positive if it is negative
    num = abs(num);

    // stores square of the number
    int sq = num;

    // repeatedly add `num` to the result
    for (int i = 1; i < num; i++) {
        sq = sq + num;
    }

    return sq;
}

int main()
{
    cout << findSquare(8) << " " << findSquare(-4);

    return 0;
}
```

**Output:** 64 16

##

```java
class Main
{
    public static int findSquare(int num)
    {
        // convert the number to positive if it is negative
        num = Math.abs(num);

        // stores square of the number
        int sq = num;

        // repeatedly add `num` to the result
        for (int i = 1; i < num; i++) {
            sq = sq + num;
        }

        return sq;
    }

    public static void main(String[] args) {
        System.out.print(findSquare(8) + " " + findSquare(-4));
    }
}
```

##

```python3
def findSquare(num):

    # convert the number to positive if it is negative
    num = abs(num)

    # stores square of the number
    sq = num

    # repeatedly add `num` to the result
    for i in range(1, num):
        sq = sq + num

    return sq

if __name__ == '__main__':

    print(findSquare(8))
    print(findSquare(-4))
```

## Method 3: Using [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) with bitwise operators

If `n` is even, the square of `n` can be expressed as `n2 = ((n/2) × 2)2 = (n/2)2 × 4`.

If `n` is odd, the square of `n` can be expressed as `n2 = ((n - 1) + 1)2 = (n - 1)2 + 1 + 2 × (n - 1) × 1 = ((n/2)2 × 4) + 1 + (n/2) × 4`.

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

int findSquare(int num)
{
    // base case
    if (num < 2) {
        return num;
    }

    // convert the number to positive if it is negative
    num = abs(num);

    // drop last bit from num (divide it by 2)
    int i = num >> 1;

    // if num is odd
    if (num & 1) {
        return ((findSquare(i) << 2) + (i << 2) + 1);
    }

    // if num is even
    else {
        return (findSquare(i) << 2);
    }
}

int main()
{
    cout << findSquare(8);

    return 0;
}
```

**Output:** 64
