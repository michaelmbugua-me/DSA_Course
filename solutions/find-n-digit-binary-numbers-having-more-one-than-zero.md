# Find all n-digit binary numbers having more 1’s than 0’s for any prefix

> Source: https://www.techiedelight.com/find-n-digit-binary-numbers-having-more-one-than-zero/

[String](https://www.techiedelight.com/Category/String/)

Given a positive integer `n`, find all `n`–digit binary numbers having more `1's` than `0's` for any prefix of the number.

For example, for `n = 1`, the binary numbers that satisfy the given constraints are `1111`, `1110`, `1101`, `1100`, `1011`, `1010`. Note that `1001` will not form part of the solution as it violates the problem constraints (`1001` has `2` zeros and `1` one at third position). The same applies to all other `4`–digit binary numbers.

> 

A simple solution would be to generate all `n`–digit numbers and print only those numbers that satisfy the given constraints. The time complexity of this solution would be exponential.

A better solution is to [recursively](https://techiedelight.com/recursion-practice-problems-with-solutions/) generate only those `n`–digit numbers that satisfy the given constraints. The idea is to append `0` and `1` to the partially formed number and recur with one less digit at each point in the recursion. We also maintain a count of the total number of zeros and the number of ones in the partially formed number. Here, the optimization is to return if the total number of ones is less than the total number of zeros at any point in the recursion.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find all n–digit binary numbers having
// more 1's than 0's at any position
void find(string str, int n, int zeros, int ones)
{
    // continue only if the total number of ones is more than equal
    // to the total number of zeros
    if (ones < zeros) {
        return;
    }

    // if the number becomes n–digit, print it
    if (n == 0)
    {
        cout << str << endl;
        return;
    }

    // append 1 to the result and recur with one less digit
    find(str + "1", n - 1, zeros, ones + 1);

    // append 0 to the result and recur with one less digit
    find(str + "0", n - 1, zeros + 1, ones);
}

int main()
{
    // given the total number of digits
    int n = 4;

    string str;
    find(str, n, 0, 0);

    return 0;
}
```

##

```java
class Main
{
    // Function to find all n–digit binary numbers having
    // more 1's than 0's at any position
    public static void find(String str, int n, int zeros, int ones)
    {
        // continue only if the total number of ones is more than equal
        // to the number of zeros
        if (ones < zeros) {
            return;
        }

        // if the number becomes n–digit, print it
        if (n == 0)
        {
            System.out.println(str);
            return;
        }

        // append 1 to the result and recur with one less digit
        find(str + '1', n - 1, zeros, ones + 1);

        // append 0 to the result and recur with one less digit
        find(str + '0', n - 1, zeros + 1, ones);
    }

    public static void main(String[] args)
    {
        // given the total number of digits
        int n = 4;

        String str = "";
        find(str, n, 0, 0);
    }
}
```

##

```python3
# Function to find all n–digit binary numbers having
# more 1's than 0's at any position
def find(n, s='', zeros=0, ones=0):

    # continue only if the total number of ones is more than equal
    # to the number of zeros
    if ones < zeros:
        return

    # if the number becomes n–digit, print it
    if n == 0:
        print(s)
        return

    # append 1 to the result and recur with one less digit
    find(n - 1, s + '1', zeros, ones + 1)

    # append 0 to the result and recur with one less digit
    find(n - 1, s + '0', zeros + 1, ones)

if __name__ == '__main__':

    # given the total number of digits
    n = 4

    find(n)
```

**Output:** 1111 1110 1101 1100 1011 1010

As mentioned by Matt in the comments below, we can improve the above code by excluding the possibility of making an invalid number. Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find all n–digit binary numbers having
// more 1's than 0's at any position
void recur(string currentNumber, int extraOnes, int remainingPlaces)
{
    // If the number is completed, print it
    if (0 == remainingPlaces)
    {
        cout << currentNumber << endl;
        return;
    }

    // Append 1 to the current number and reduce the remaining places by one
    recur(currentNumber + "1", extraOnes + 1, remainingPlaces - 1);

    // If there are more ones than zeros, append 0 to the current number
    // and reduce the remaining places by one
    if (0 < extraOnes) {
        recur(currentNumber + "0", extraOnes - 1, remainingPlaces - 1);
    }
}

int main()
{
    int numberOfDigits = 4;
    string str;

    recur(str, 0, numberOfDigits);

    return 0;
}
```

##

```java
class Main
{
    // Function to find all n–digit binary numbers having
    // more 1's than 0's at any position
    public static void recur(String currentNumber, int extraOnes, int remainingPlaces)
    {
        // If the number is completed, print it
        if (0 == remainingPlaces)
        {
            System.out.println(currentNumber);
            return;
        }

        // Append 1 to the current number and reduce the remaining places by one
        recur(currentNumber + '1', extraOnes + 1, remainingPlaces - 1);

        // If there are more ones than zeros, append 0 to the current number
        // and reduce the remaining places by one
        if (0 < extraOnes) {
            recur(currentNumber + '0', extraOnes - 1, remainingPlaces - 1);
        }
    }

    public static void main(String[] args)
    {
        int numberOfDigits = 4;
        String str = "";

        recur(str, 0, numberOfDigits);
    }
}
```

##

```python3
# Function to find all n–digit binary numbers having more 1's than 0's at any position
def findSolution(remaining, current='', extraOnes=0):

    # If the number is completed, print it
    if remaining == 0:
        print(current)
        return

    # Append 1 to the current number and reduce the remaining places by one
    findSolution(remaining - 1, current + '1', extraOnes + 1)

    # If there are more ones than zeros, append 0 to the current number
    # and reduce the remaining places by one
    if 0 < extraOnes:
        findSolution(remaining - 1, current + '0', extraOnes - 1)

if __name__ == '__main__':

    numberOfDigits = 4
    findSolution(numberOfDigits)
```

**Output:** 1111 1110 1101 1100 1011 1010
