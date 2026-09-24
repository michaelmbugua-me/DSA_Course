# Add elements of two arrays into a new array

> Source: https://www.techiedelight.com/add-elements-two-arrays/

[Array](https://www.techiedelight.com/Category/Array/)

Given two arrays of positive integers, add their elements into a new array. The solution should add both arrays, one by one starting from the 0th index, and split the sum into individual digits if it is a 2–digit number.

For example,

**Input:** a = { 23, 5, 2, 7, 87 } b = { 4, 67, 2, 8 } **Output:** { 2, 7, 7, 2, 4, 1, 5, 8, 7 } **Input:** a = {} b = { 4, 67, 2, 8 } **Output:** { 4, 6, 7, 2, 8 }

> 

The idea is to run a loop that considers every pair of elements present at the same index in both arrays and adds them. If the sum is a 2–digit number, add its digits to the result array; otherwise, add the single-digit sum to the result array. Finally, add the remaining elements of the larger array to the result array.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Recursive function to separate the digits of a positive integer
// and add them to a given vector
void split_number(int num, vector<int> &result)
{
    if (num > 0)
    {
        split_number(num/10, result);
        result.push_back(num % 10);
    }
}

// Function to add two arrays
void add(vector<int> const &a, vector<int> const &b, vector<int> &result)
{
    int m = a.size(), n = b.size();

    // loop till either `a` or `b` runs out
    int i = 0;
    while (i < m && i < n)
    {
        // get the sum of the next element from each array
        int sum = a[i] + b[i];

        // separate the digits of the sum and add them to the output vector
        split_number(sum, result);

        i++;
    }

    // process remaining elements of the first vector, if any
    while (i < m) {
        split_number(a[i++], result);
    }

    // process remaining elements of the second vector, if any
    while (i < n) {
        split_number(b[i++], result);
    }
}

int main()
{
    // input vectors
    vector<int> a = { 23, 5, 2, 7, 87 };
    vector<int> b = { 4, 67, 2, 8 };

    // vector to store the output
    vector<int> result;
    add(a, b, result);

    // print the output vector
    for (int i: result) {
        cout << i << " ";
    }

    return 0;
}
```

**Output:** 2 7 7 2 4 1 5 8 7

##

```java
import java.util.ArrayList;
import java.util.List;

class Main
{
    // Recursive function to separate the digits of a positive integer
    // and add them to a given list
    public static void split_number(int num, List<Integer> result)
    {
        if (num > 0)
        {
            split_number(num/10, result);
            result.add(num % 10);
        }
    }

    // Function to add two arrays
    public static void add(int[] a, int[] b, List<Integer> result)
    {
        int m = a.length, n = b.length;

        // loop till either `a` or `b` runs out
        int i = 0;
        while (i < m && i < n)
        {
            // get the sum of the next element from each array
            int sum = a[i] + b[i];

            // separate the digits of the sum and add them to the output list
            split_number(sum, result);
            i++;
        }

        // process remaining elements of the first list, if any
        while (i < m) {
            split_number(a[i++], result);
        }

        // process remaining elements of the second list, if any
        while (i < n) {
            split_number(b[i++], result);
        }
    }

    public static void main(String[] args)
    {
        // input lists
        int[] a = { 23, 5, 2, 7, 87 };
        int[] b = { 4, 67, 2, 8 };

        // list to store the output
        List<Integer> result = new ArrayList<>();
        add(a, b, result);

        // print the output list
        System.out.print(result);
    }
}
```

##

```python3
# Recursive function to separate the digits of a positive integer
# and add them to a given list
def split_number(num, result):

    if num > 0:
        split_number(num // 10, result)
        result.append(num % 10)

# Function to add two lists
def append(a, b, result):

    m = len(a)
    n = len(b)

    # loop till either `a` or `b` runs out
    i = 0
    while i < m and i < n:

        # get the sum of the next element from each list
        total = a[i] + b[i]

        # separate the digits of the sum and add them to the output list
        split_number(total, result)
        i = i + 1

    # process remaining elements of the first list, if any
    while i < m:
        split_number(a[i], result)
        i = i + 1

    # process remaining elements of the second list, if any
    while i < n:
        split_number(b[i], result)
        i = i + 1

if __name__ == '__main__':

    # input lists
    a = [23, 5, 2, 7, 87]
    b = [4, 67, 2, 8]

    # list to store the output
    result = []
    append(a, b, result)

    # print the output list
    print(result)
```

Here’s another solution that constructs a string containing the result by appending the sum of each pair of elements to it and finally add each character to a list of integers.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to add two arrays
void add(vector<int> const &a, vector<int> const &b, vector<int> &result)
{
    int m = a.size(), n = b.size();
    string str;

    // loop till either `a` or `b` runs out
    int i = 0;
    while (i < m && i < n)
    {
        str += to_string(a[i] + b[i]);
        i++;
    }

    // process remaining elements of the first vector, if any
    while (i < m) {
        str += to_string(a[i++]);
    }

    // process remaining elements of the second vector, if any
    while (i < n) {
        str += to_string(b[i++]);
    }

    // add characters of the output string to a given vector of integers
    for (char c: str) {
        result.push_back(c - '0');
    }
}

int main()
{
    // input vectors
    vector<int> a = { };
    vector<int> b = { 4, 67, 2, 8 };

    // vector to store the output
    vector<int> result;
    add(a, b, result);

    // print the output vector
    for (int i: result) {
        cout << i << " ";
    }

    return 0;
}
```

**Output:** 4 6 7 2 8

##

```java
import java.util.ArrayList;
import java.util.List;

class Main
{
    // Function to add two arrays
    public static void add(int[] a, int[] b, List<Integer> result)
    {
        int m = a.length, n = b.length;
        String str = "";

        // loop till either `a` or `b` runs out
        int i = 0;
        while (i < m && i < n)
        {
            str += (a[i] + b[i]);
            i++;
        }

        // process remaining elements of the first list, if any
        while (i < m) {
            str += (a[i++]);
        }

        // process remaining elements of the second list, if any
        while (i < n) {
            str += (b[i++]);
        }

        // add characters of the output string to a given list of integers
        char[] chars = str.toCharArray();
        for (char c: chars) {
            result.add(c - '0');
        }
    }

    public static void main(String[] args)
    {
        // input lists
        int[] a = { };
        int[] b = { 4, 67, 2, 8 };

        // list to store the output
        List<Integer> result = new ArrayList<>();
        add(a, b, result);

        // print the output list
        System.out.print(result);
    }
}
```

##

```python3
# Function to add two lists
def add(a, b):

    m = len(a)
    n = len(b)
    s = ''

    # loop till either `a` or `b` runs out
    i = 0
    while i < m and i < n:
        s += str(a[i] + b[i])
        i = i + 1

    # process remaining elements of the first list, if any
    while i < m:
        s = s + str(a[i])
        i = i + 1

    # process remaining elements of the second list, if any
    while i < n:
        s = s + str(b[i])
        i = i + 1

    # add characters of the output string to a given list of integers
    return [int(c) for c in s]

if __name__ == '__main__':

    # input lists
    a = []
    b = [4, 67, 2, 8]

    # list to store the output
    result = add(a, b)

    # print the output list
    print(result)
```

The time complexity of both above-discussed methods is O(m + n) and runs in constant space. Here, `m` and `n` are the size of the first and second array, respectively.

**Author:** Aditya Goel
