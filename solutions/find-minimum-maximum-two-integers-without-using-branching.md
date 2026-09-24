# Find minimum or maximum of two integers without using branching

> Source: https://www.techiedelight.com/find-minimum-maximum-two-integers-without-using-branching/

Given two integers, find their minimum and maximum without using branching.

## Approach 1

To find the `minimum(x, y)`, we can use the expression `y ^ ((x ^ y) & -(x < y))`.

Now, if `x` is less than `y`, then `-(x < y)` will be `-1` (all `1's` in binary representation), so the result `r` is:

r = y ^ ((x ^ y) & -(x < y)) r = y ^ ((x ^ y) & -1) r = y ^ (x ^ y) r = x

Alternatively, if `x` is more than `y`, then `-(x < y)` will be 0, so the result `r` is:

r = y ^ ((x ^ y) & -(x < y)) r = y ^ ((x ^ y) & 0) r = y ^ 0 r = y

To find the `maximum(x, y)`, we can use the expression `x ^ ((x ^ y) & -(x < y))`.

Now, if `x` is less than `y`, then `-(x < y)` will be `-1` (all 1’s in binary representation), so the result `r` is:

r = x ^ ((x ^ y) & -(x < y)) r = x ^ ((x ^ y) & -1) r = x ^ (x ^ y) r = x

If `x` is more than `y`, then `-(x < y)` will be 0, so the result `r` is:

r = x ^ ((x ^ y) & -(x < y)) r = x ^ ((x ^ y) & 0) r = x ^ 0 r = x

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

int findMin(int x, int y) {
    return y ^ ((x ^ y) & -(x < y));
}

int findMax(int x, int y) {
    return x ^ ((x ^ y) & -(x < y));
}

int main()
{
    int x = 2, y = 4;

    cout << "min(" << x << ", " << y << ") is " << findMin(x, y) << endl;
    cout << "max(" << x << ", " << y << ") is " << findMax(x, y) << endl;

    return 0;
}
```

**Output:** min(2, 4) is 2 max(2, 4) is 4

##

```java
class Main
{
    public static int findMin(int x, int y) {
        return y ^ ((x ^ y) & -((x < y) ? 1 : 0));
    }

    public static int findMax(int x, int y) {
        return x ^ ((x ^ y) & -((x < y) ? 1 : 0));
    }

    public static void main(String[] args)
    {
        int x = 2, y = 4;

        System.out.println("min(" + x + ", " + y + ") is " + findMin(x, y));
        System.out.println("max(" + x + ", " + y + ") is " + findMax(x, y));
    }
}
```

##

```python3
def findMin(x, y):
    return y ^ ((x ^ y) & -(1 if (x < y) else 0))

def findMax(x, y):
    return x ^ ((x ^ y) & -(1 if (x < y) else 0))

if __name__ == '__main__':

    x, y = 2, 4

    print(f'min({x}, {y}) is', findMin(x, y))
    print(f'max({x}, {y}) is', findMax(x, y))
```

## Approach 2

To find the `minimum(x, y)`, we can use the expression `y + ((x - y) & ((x - y) >> 31))`.

Now if `x` is less than `y`, then `(x - y) >> 31` will be `-1` (all 1’s in binary representation), so the result `r` is:

r = y + ((x – y) & ((x – y) >> 31)) r = y + ((x – y) & -1) r = y + (x – y) r = x

If `x` is more than `y`, then `(x - y) >> 31` will be 0, so the result `r` is:

r = y + ((x – y) & ((x – y) >> 31)) r = y + ((x – y) & 0) r = y + (0) r = y

Similarly, we can find the `maximum(x, y)` by using `x - ((x - y) & ((x - y) >> 31))`. The explanation is left for the users as an exercise.

```cpp
#include <iostream>
using namespace std;

int findMin(int x, int y) {
    return y + ((x - y) & ((x - y) >> 31));
}

int findMax(int x, int y) {
    return x - ((x - y) & ((x - y) >> 31));
}

int main()
{
    int x = 2, y = 4;

    cout << "min(" << x << ", " << y << ") is " << findMin(x, y) << endl;
    cout << "max(" << x << ", " << y << ") is " << findMax(x, y) << endl;

    return 0;
}
```

**Output:** min(2, 4) is 2 max(2, 4) is 4

##

```java
class Main
{
    public static int findMin(int x, int y) {
        return y + ((x - y) & ((x - y) >> 31));
    }

    public static int findMax(int x, int y) {
        return x - ((x - y) & ((x - y) >> 31));
    }

    public static void main(String[] args)
    {
        int x = 2, y = 4;

        System.out.println("min(" + x + ", " + y + ") is " + findMin(x, y));
        System.out.println("max(" + x + ", " + y + ") is " + findMax(x, y));
    }
}
```

##

```python3
def findMin(x, y):
    return y + ((x - y) & ((x - y) >> 31))

def findMax(x, y):
    return x - ((x - y) & ((x - y) >> 31))

if __name__ == '__main__':

    x, y = 2, 4

    print(f'min({x}, {y}) is', findMin(x, y))
    print(f'max({x}, {y}) is', findMax(x, y))
```

**References:** <https://graphics.stanford.edu/~seander/bithacks.html#IntegerMinOrMax>
