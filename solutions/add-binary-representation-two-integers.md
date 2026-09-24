# Add binary representation of two integers

> Source: https://www.techiedelight.com/add-binary-representation-two-integers/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given two integers, add their binary representation.

For example,

**Input:** x = 12731 (which is 00000000000000000011000110111011 in binary) y = 38023 (which is 00000000000000001001010010000111 in binary) **Output:** 00000000000000001100011001000010 **Input:** x = 1023 (which is 00000000000000000000001111111111 in binary) y = 1023 (which is 00000000000000000000001111111111 in binary) **Output:** 00000000000000000000011111111110

> 

Binary addition is much like decimal addition, except that it carries on a value of 2 instead of 10. For example, in decimal addition, if we add `9 + 6`, we get 16, which in the sum gives a digit 6 and a carry of 1. Binary addition follows a similar logic.

  * When we add 1 and 1 (with a carry of 0); the result is 2 in decimal, but since 2 is written as 10 in binary, we get, after summing `1 + 1` in binary, a digit 0 and a carry of 1.
  * Similarly, if we add 1 and 1 (with a carry of 1), the result is 3 in decimal, 11 in binary. So, after summing `1 + 1 + 1` in binary, we get a digit 1 and a carry of 1.

Therefore, in binary,

0 + 0 = 0 0 + 1 = 1 1 + 0 = 1 1 + 1 = 10 (which is 0 with carry 1) **with carry 1** 0 + 0 (+ 1) = 1 0 + 1 (+ 1) = 10 (which is 0 with carry 1) 1 + 0 (+ 1) = 10 (which is 0 with carry 1) 1 + 1 (+ 1) = 11 (which is 1 with carry 1)

So, the idea is to extract each bit from both integers one by one from LSB to MSB and store their addition result in an array of the size of an integer. If addition results in a carry, propagate the carry to the next pair of bits.

The algorithm can be implemented as follows in C++, Java, and Python using `LEFT` shift and `AND` binary operator:

```cpp
#include <iostream>
#include <vector>
#include <bitset>
using namespace std;

// A macro that defines the size of an integer
#define INT_SIZE sizeof(int) * 8

// Function to add `x` and `y` in binary
vector<int> add(int x, int y)
{
    int carry = 0;
    int n = INT_SIZE;

    // create an array to store the binary sum
    vector<int> arr(n);

    for (int i = 0; i < n; i++)
    {
        // if `x` is 1
        if (x & (1 << i))
        {
            if (y & (1 << i))               // if both `x` and `y` are 1
            {
                if (carry) {
                    arr[n - i - 1] = 1;     // carry = 1
                }
                else {
                    arr[n - i - 1] = 0, carry = 1;
                }
            }
            else                            // `x` is 1, `y` is 0
            {
                if (carry) {
                    arr[n - i - 1] = 0;     // carry = 1
                }
                else {
                    arr[n - i - 1] = 1;     // carry = 0
                }
            }
        }
        // if `x` is 0
        else {
            if (y & (1 << i))               // `x` is 0, `y` is 1
            {
                if (carry) {
                    arr[n - i - 1] = 0;     // carry = 1
                }
                else {
                    arr[n - i - 1] = 1;     // carry = 0
                }
            }
            else                            // both `x` and `y` are 0
            {
                if (carry == 1) {
                    arr[n - i - 1] = 1, carry = 0;
                }
                else {
                    arr[n - i - 1] = 0;     // carry = 0
                }
            }
        }
    }

    return arr;
}

int main()
{
    int x = 12731, y = 38023;

    cout << "x (" << x << ") in binary is " << bitset<32>(x) << endl;
    cout << "y (" << y << ") in binary is " << bitset<32>(y) << endl;

    vector<int> arr = add(x, y);

    cout << "\nx + y is ";
    for (unsigned i = 0; i < INT_SIZE; i++) {
        cout << arr[i];
    }

    return 0;
}
```

**Output:** x (12731) in binary is 00000000000000000011000110111011 y (38023) in binary is 00000000000000001001010010000111 x + y is 00000000000000001100011001000010

##

```java
class Main
{
    public static String toBinaryString(int n)
    {
        return String.format("%32s", Integer.toBinaryString(n))
                    .replaceAll(" ", "0");
    }

    // Function to add `x` and `y` in binary
    public static int[] add(int x, int y)
    {
        int carry = 0;
        int n = Integer.SIZE;

        // create an array to store the binary sum
        int[] arr = new int[n];

        for (int i = 0; i < n; i++)
        {
            // if `x` is 1
            if ((x & (1 << i)) != 0)
            {
                if ((y & (1 << i)) != 0)        // if both `x` and `y` are 1
                {
                    if (carry == 1) {
                        arr[n - i - 1] = 1;     // carry = 1
                    }
                    else {
                        arr[n - i - 1] = 0;
                        carry = 1;
                    }
                }
                else                            // `x` is 1, `y` is 0
                {
                    if (carry == 1) {
                        arr[n - i - 1] = 0;     // carry = 1
                    }
                    else {
                        arr[n - i - 1] = 1;     // carry = 0
                    }
                }
            }
            // if `x` is 0
            else {
                if ((y & (1 << i)) != 0)        // `x` is 0, `y` is 1
                {
                    if (carry == 1) {
                        arr[n - i - 1] = 0;     // carry = 1
                    }
                    else {
                        arr[n - i - 1] = 1;     // carry = 0
                    }
                }
                else                            // both `x` and `y` are 0
                {
                    if (carry == 1)
                    {
                        arr[n - i - 1] = 1;
                        carry = 0;
                    }
                    else {
                        arr[n - i - 1] = 0;     // carry = 0
                    }
                }
            }
        }

        return arr;
    }

    public static void main(String[] args)
    {
        int x = 12731, y = 38023;

        System.out.println("x (" + x + ") in binary is " + toBinaryString(x));
        System.out.println("y (" + y + ") in binary is " + toBinaryString(y));

        int[] arr = add(x, y);

        System.out.print("x + y is ");
        for (int i = 0; i < Integer.SIZE; i++) {
            System.out.printf("%d", arr[i]);
        }
    }
}
```

##

```python3
# Function to add `x` and `y` in binary
def append(x, y):

    carry = 0
    n = SIZE

    # create a list to store the binary sum
    result = [None] * n

    for i in range(n):

        # if `x` is 1
        if x & (1 << i):
            # if both `x` and `y` are 1
            if y & (1 << i):
                if carry == 1:
                    result[n - i - 1] = 1     # carry = 1
                else:
                    result[n - i - 1] = 0
                    carry = 1
            # `x` is 1, `y` is 0
            else:
                if carry == 1:
                    result[n - i - 1] = 0     # carry = 1
                else:
                    result[n - i - 1] = 1     # carry = 0

        # if `x` is 0
        else:
            if y & (1 << i): # `x` is 0, `y` is 1
                if carry == 1:
                    result[n - i - 1] = 0     # carry = 1
                else:
                    result[n - i - 1] = 1     # carry = 0

            else:    # both `x` and `y` are 0
                if carry == 1:
                    result[n - i - 1] = 1
                    carry = 0
                else:
                    result[n - i - 1] = 0     # carry = 0

    return ''.join(map(str, result))

if __name__ == '__main__':

    x = 12731
    y = 38023

    SIZE = 32        # Assume 32-bit integer

    print(f'x {x} in binary is', bin(x))
    print(f'y {y} in binary is', bin(y))

    result = append(x, y)
    print('x + y is', result)
```

Check similar implementation using `RIGHT` shift and `AND` binary operator [here](https://techiedelight.com/compiler/?run=4JOhE4).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.67/5. Vote count: 100

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
