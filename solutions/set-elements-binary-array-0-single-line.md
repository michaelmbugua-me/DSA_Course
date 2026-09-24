# Set both elements of a binary array to 0 in a single line

> Source: https://www.techiedelight.com/set-elements-binary-array-0-single-line/

Given a binary array of size two having at least one element as zero, write a single line function to set both its elements to zero. Use of ternary operator and direct assignment of elements are not allowed.

There are three combinations of array elements as per problem constraints:

  1. arr[0] = 0 and arr[1] = 1
  2. arr[0] = 1 and arr[1] = 0
  3. arr[0] = 0 and arr[1] = 0

There are many ways to solve the given problem. We will discuss a few of them:

## Method 1: Using assignment operator twice

We can use any of the following single line expressions to convert both elements of the given array to 0:

  * arr[0] = arr[1] = arr[!arr[1]], or
  * arr[0] = arr[1] = arr[0] & arr[1], or
  * arr[0] = arr[1] -= arr[1] // or arr[1] = arr[0] -= arr[0]

This is demonstrated below in C++ and Java:

```cpp
#include <iostream>
using namespace std;

void convert(int arr[])
{
    arr[0] = arr[1] = arr[!arr[1]];
    // arr[0] = arr[1] = arr[0] & arr[1];
    // arr[0] = arr[1] -= arr[1];
    // arr[1] = arr[0] -= arr[0];
}

int main()
{
    int first[] = { 0, 1 };
    convert(first);
    cout << first[0] << " " << first[1] << endl;

    int second[] = { 1, 0 };
    convert(second);
    cout << second[0] << " " << second[1] << endl;

    int third[] = { 0, 0 };
    convert(third);
    cout << third[0] << " " << third[1] << endl;

    return 0;
}
```

**Output:** 0 0 0 0 0 0

##

```java
class Main
{
    public static void convert(int[] arr)
    {
        arr[0] = arr[1] = arr[0] & arr[1];
        // arr[0] = arr[1] -= arr[1];
        // arr[1] = arr[0] -= arr[0];
    }

    public static void main(String[] args)
    {
        int[] first = { 0, 1 };
        convert(first);
        System.out.println(first[0] + " " + first[1]);

        int[] second = { 1, 0 };
        convert(second);
        System.out.println(second[0] + " " + second[1]);

        int[] third = { 0, 0 };
        convert(third);
        System.out.println(third[0] + " " + third[1]);
    }
}
```

## Method 2: Using negation (logical NOT) operator

We can use the negation operator with an assignment operator to convert both elements of the given array to 1 in a single line:

  * arr[!arr[0]] = arr[arr[0]], or
  * arr[arr[1]] = arr[!arr[1]], or
  * arr[!arr[0]] = arr[!arr[1]]

Following is the C++ and Java program that demonstrates it:

```cpp
#include <iostream>
using namespace std;

void convert(int arr[])
{
    arr[!arr[0]] = arr[arr[0]];
    // arr[arr[1]] = arr[!arr[1]];
    // arr[!arr[0]] = arr[!arr[1]];
}

int main()
{
    int first[] = { 0, 1 };
    convert(first);
    cout << first[0] << " " << first[1] << endl;

    int second[] = { 1, 0 };
    convert(second);
    cout << second[0] << " " << second[1] << endl;

    int third[] = { 0, 0 };
    convert(third);
    cout << third[0] << " " << third[1] << endl;

    return 0;
}
```

**Output:** 0 0 0 0 0 0

##

```java
class Main
{
    public static void convert(int[] arr)
    {
        arr[arr[1]] = arr[arr[0]];
        // arr[1 - arr[0]] = arr[1 - arr[1]];
        // arr[arr[1]] = 0;
    }

    public static void main(String[] args)
    {
        int[] first = { 0, 1 };
        convert(first);
        System.out.println(first[0] + " " + first[1]);

        int[] second = { 1, 0 };
        convert(second);
        System.out.println(second[0] + " " + second[1]);

        int[] third = { 0, 0 };
        convert(third);
        System.out.println(third[0] + " " + third[1]);
    }
}
```

## Method 3: Using only assignment operator

We can directly use an assignment operator to set both elements of the given binary array to 0 in a single line:

  * arr[arr[1]] = arr[arr[0]], or
  * arr[1 – arr[0]] = arr[1 – arr[1]], or
  * arr[arr[1]] = 0

The implementation can be seen below in C++ and Java:

```cpp
#include <iostream>
using namespace std;

void convert(int arr[])
{
    arr[arr[1]] = arr[arr[0]];
    // arr[1 - arr[0]] = arr[1 - arr[1]];
    // arr[arr[1]] = 0;
}

int main()
{
    int first[] = { 0, 1 };
    convert(first);
    cout << first[0] << " " << first[1] << endl;

    int second[] = { 1, 0 };
    convert(second);
    cout << second[0] << " " << second[1] << endl;

    int third[] = { 0, 0 };
    convert(third);
    cout << third[0] << " " << third[1] << endl;

    return 0;
}
```

**Output:** 0 0 0 0 0 0
