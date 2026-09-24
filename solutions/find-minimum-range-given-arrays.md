# Find a minimum range with at least one element from each of the given arrays

> Source: https://www.techiedelight.com/find-minimum-range-given-arrays/

[Array](https://www.techiedelight.com/Category/Array/)

Given three sorted arrays of variable length, efficiently compute the minimum range with at least one element from each array.

For example,

**Input:** 3 sorted arrays of variable length [ **3** , 6, 8, 10, 15 ] [ 1, **5** , 12 ] [ **4** , 8, 15, 16 ] **Output:** Minimum range is 3–5 **Input:** 3 sorted arrays of variable length [ 2, 3, **4** , 8, 10, 15 ] [ 1, **5** , 12 ] [ **7** , 8, 15, 16 ] **Output:** Minimum range is 4–7

> 

A naive solution is to compute the range of every possible triplet and return the minimum of all values. The time complexity of this solution is O(n3) for an input containing `n` elements, as we need three nested loops to consider every triplet. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <limits>
using namespace std;

// Function to find the minimum range with at least one element from
// each of the given arrays
pair<int, int> findMinRange(auto &a, auto &b, auto &c)
{
    // create a pair to store the result
    pair<int, int> pair;

    // stores the low difference
    int diff = numeric_limits<int>::max();

    // consider all triplets formed by `(a[i], b[j], c[k])`
    for (int i = 0; i < a.size(); i++)
    {
        for (int j = 0; j < b.size(); j++)
        {
            for (int k = 0; k < c.size(); k++)
            {
                // find the minimum and maximum value in the current triplet
                int low = min(min(a[i], b[j]), c[k]);
                int high = max(max(a[i], b[j]), c[k]);

                // update the low difference if the current difference is more
                // and store the range in a pair
                if (diff > high - low)
                {
                    pair = make_pair(low, high);
                    diff = high - low;
                }
            }
        }
    }

    return pair;
}

int main()
{
    vector<int> a = { 3, 6, 8, 10, 15 };
    vector<int> b = { 1, 5, 12 };
    vector<int> c = { 4, 8, 15, 16 };

    auto pair = findMinRange(a, b, c);
    cout << "The minimum range is [" << pair.first << ", " << pair.second << "]";

    return 0;
}
```

**Output:** The minimum range is [3, 5]

##

```java
// A Pair class
class Pair
{
    private final int first;        // first field of a pair
    private final int second;        // second field of a pair

    // Constructs a new Pair with specified values
    private Pair(int first, int second)
    {
        this.first = first;
        this.second = second;
    }

    // Factory method for creating a Typed Pair immutable instance
    public static Pair of(int a, int b)
    {
        // calls private constructor
        return new Pair(a, b);
    }

    @Override
    public String toString() {
        return "[" + first + ", " + second + ']';
    }
}

class Main
{
    // Function to find the minimum range with at least one element from
    // each of the given arrays
    public static Pair findMinRange(int[] a, int[] b, int[] c)
    {
        // create a pair to store the result
        Pair pair = null;

        // stores the minimum difference
        int diff = Integer.MAX_VALUE;

        // consider all triplets formed by `(a[i], b[j], c[k])`
        for (int i = 0; i < a.length; i++)
        {
            for (int j = 0; j < b.length; j++)
            {
                for (int k = 0; k < c.length; k++)
                {
                    // find the minimum and maximum value in the current triplet
                    int low = Math.min(Math.min(a[i], b[j]), c[k]);
                    int high = Math.max(Math.max(a[i], b[j]), c[k]);

                    // update the minimum difference if the current difference is more
                    // and store the range in a pair
                    if (diff > high - low)
                    {
                        pair = Pair.of(low, high);
                        diff = high - low;
                    }
                }
            }
        }

        return pair;
    }

    public static void main(String[] args)
    {
        int[] a = { 3, 6, 8, 10, 15 };
        int[] b = { 1, 5, 12 };
        int[] c = { 4, 8, 15, 16 };

        Pair pair = findMinRange(a, b, c);
        System.out.print("The minimum range is " + pair);
    }
}
```

##

```python3
import sys

# Function to find the minimum range with at least one element from
# each of the given lists
def findMinRange(a, b, c):

    # create a pair to store the result
    pair = ()

    # stores the minimum difference
    diff = sys.maxsize

    # consider all triplets formed by `(a[i], b[j], c[k])`
    for i in range(len(a)):
        for j in range(len(b)):
            for k in range(len(c)):
                # find the minimum and maximum value in the current triplet
                low = min(min(a[i], b[j]), c[k])
                high = max(max(a[i], b[j]), c[k])

                # update the minimum difference if the current difference is more
                # and store the range in a pair
                if diff > high - low:
                    pair = (low, high)
                    diff = high - low

    return pair

if __name__ == '__main__':

    a = [3, 6, 8, 10, 15]
    b = [1, 5, 12]
    c = [4, 8, 15, 16]

    pair = findMinRange(a, b, c)
    print("The minimum range is", pair)
```

We can quickly reduce the time complexity to linear as we don’t need to consider every triplet. The idea is to take advantage of the fact that the arrays are already sorted. In the following solution in C++, Java, and Python, we compute the range for some selected triplets and return the minimum.

```cpp
#include <iostream>
#include <vector>
#include <limits>
using namespace std;

// Function to find the minimum range with at least one element from
// each of the given arrays
pair<int, int> findMinRange(auto &a, auto &b, auto &c)
{
    // create a pair to store the result
    pair<int, int> pair;

    // stores the minimum difference
    int diff = numeric_limits<int>::max();

    // a triplet is formed by `(a[i], b[j], c[k])`
    int i = 0, j = 0, k = 0;

    // loop till the end of any array is reached
    while (i < a.size() && j < b.size() && k < c.size())
    {
        // find the minimum and maximum value in the current triplet
        int low = min(min(a[i], b[j]), c[k]);
        int high = max(max(a[i], b[j]), c[k]);

        // update the minimum difference if the current difference is more
        // and store the elements in a pair
        if (diff > high - low)
        {
            pair = make_pair(low, high);
            diff = high - low;
        }

        // advance index of the array with a minimum value
        if (a[i] == low) {
            i++;
        }
        else if (b[j] == low) {
            j++;
        }
        else {
            k++;
        }
    }

    return pair;
}

int main()
{
    vector<int> a = { 2, 3, 4, 8, 10, 15 };
    vector<int> b = { 1, 5, 12 };
    vector<int> c = { 7, 8, 15, 16 };

    auto pair = findMinRange(a, b, c);
    cout << "The minimum range is [" << pair.first << ", " << pair.second << "]";

    return 0;
}
```

**Output:** The minimum range is [4, 7]

##

```java
// A Pair class
class Pair<U, V>
{
    private final U first;      // first field of a pair
    private final V second;     // second field of a pair

    // Constructs a new Pair with specified values
    private Pair(U first, V second)
    {
        this.first = first;
        this.second = second;
    }

    // Factory method for creating a Typed Pair immutable instance
    public static <U, V> Pair <U, V> of(U a, V b)
    {
        // calls private constructor
        return new Pair<>(a, b);
    }

    @Override
    public String toString() {
        return "[" + first + ", " + second + ']';
    }
}

class Main
{
    // Function to find the minimum range with at least one element from
    // each of the given arrays
    public static Pair<Integer, Integer> findMinRange(int[] a, int[] b, int[] c)
    {
        // create a pair to store the result
        Pair<Integer, Integer> pair = null;

        // stores the minimum difference
        int diff = Integer.MAX_VALUE;

        // a triplet is formed by `(a[i], b[j], c[k])`
        int i = 0, j = 0, k = 0;

        // loop till the end of any array is reached
        while (i < a.length && j < b.length && k < c.length)
        {
            // find the minimum and maximum value in the current triplet
            int low = Math.min(Math.min(a[i], b[j]), c[k]);
            int high = Math.max(Math.max(a[i], b[j]), c[k]);

            // update the minimum difference if the current difference is more
            // and store the elements in a pair
            if (diff > high - low)
            {
                pair = Pair.of(low, high);
                diff = high - low;
            }

            // advance index of the array with a minimum value
            if (a[i] == low) {
                i++;
            }
            else if (b[j] == low) {
                j++;
            }
            else {
                k++;
            }
        }

        return pair;
    }

    public static void main(String[] args)
    {
        int[] a = { 2, 3, 4, 8, 10, 15 };
        int[] b = { 1, 5, 12 };
        int[] c = { 7, 8, 15, 16 };

        Pair<Integer, Integer> pair = findMinRange(a, b, c);
        System.out.print("The minimum range is " + pair);
    }
}
```

##

```python3
import sys

# Function to find the minimum range with at least one element from
# each of the given lists
def findMinRange(a, b, c):

    # stores the minimum difference
    diff = sys.maxsize

    # A triplet is formed by `(a[i], b[j], c[k])`
    i = j = k = 0

    # loop till the end of any list is reached
    while i < len(a) and j < len(b) and k < len(c):

        # find the minimum and maximum value in the current triplet
        low = min(a[i], b[j], c[k])
        high = max(a[i], b[j], c[k])

        # update the minimum difference if the current difference is more
        # and store the elements in a pair
        if diff > high - low:
            pair = (low, high)
            diff = high - low

        # advance index of the list with a minimum value
        if a[i] == low:
            i = i + 1
        elif b[j] == low:
            j = j + 1
        else:
            k = k + 1

    return pair

if __name__ == '__main__':

    a = [2, 3, 4, 8, 10, 15]
    b = [1, 5, 12]
    c = [7, 8, 15, 16]

    print("The minimum range is", findMinRange(a, b, c))
```

The time complexity of the above solution is O(n), where `n` is the total number of elements in all three arrays.
