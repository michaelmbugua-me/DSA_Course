# Find all distinct combinations of a given length with repetition allowed

> Source: https://www.techiedelight.com/find-distinct-combinations-given-length-repetition-allowed/

Given an integer array, find all distinct combinations of a given length `k`, where the repetition of elements is allowed.

For example,

**Input:** {1, 2, 3}, k = 2 **Output:** {1, 1}, {1, 2}, {1, 3}, {2, 2}, {2, 3}, {3, 3} **Input:** {1, 2, 3, 4}, k = 2 **Output:** {1, 1}, {1, 2}, {1, 3}, {1, 4}, {2, 2}, {2, 3}, {2, 4}, {3, 3}, {3, 4}, {4, 4} **Input:** {1, 2, 1}, k = 2 **Output:** {1, 1}, {1, 2}, {2, 2}

The program should print only distinct combinations. For example, for the last input, either `{1, 2}` or `{2, 1}` should be considered.

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to add each array element to the output starting from the last considered element and recur for the remaining elements. To avoid printing permutations, construct each tuple in the same order as array elements. If the combination of size `k` is found, print it.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to print the contents of the vector
void printVector(vector<int> const &out)
{
    for (auto it = out.begin(); it != out.end(); it++) {
        cout << *it << " ";
    }
    cout << endl;
}

// Function to print all distinct combinations of length `k`, where the
// repetition of elements is allowed
void findCombinations(int arr[], vector<int> &out, int k, int i, int n)
{
    // base case: if the combination size is `k`, print it
    if (out.size() == k)
    {
        printVector(out);
        return;
    }

    // start from the previous element in the current combination
    // till the last element
    for (int j = i; j < n; j++)
    {
        // add current element `arr[j]` to the solution and recur with the
        // same index `j` (as repeated elements are allowed in combinations)
        out.push_back(arr[j]);
        findCombinations(arr, out, k, j, n);

        // backtrack: remove the current element from the solution
        out.pop_back();
    }
}

int main()
{
    int arr[] = { 1, 2, 1 };
    int k = 2;

    int n = sizeof(arr) / sizeof(arr[0]);

    vector<int> out;
    findCombinations(arr, out, k, 0, n);

    return 0;
}
```

**Output:** 1 1 1 2 1 1 2 2 2 1 1 1

##

```java
import java.util.ArrayDeque;
import java.util.Deque;

class Main
{
    // Function to print all distinct combinations of length `k`, where the
    // repetition of elements is allowed
    public static void findCombinations(int[] A, Deque<Integer> out,
                            int k, int i, int n)
    {
        // base case: if the combination size is `k`, print it
        if (out.size() == k)
        {
            System.out.println(out);
            return;
        }

        // start from the previous element in the current combination
        // till the last element
        for (int j = i; j < n; j++)
        {
            // add current element `A[j]` to the solution and recur with the
            // same index `j` (as repeated elements are allowed in combinations)
            out.addLast(A[j]);
            findCombinations(A, out, k, j, n);

            // backtrack: remove the current element from the solution
            out.pollLast();
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 2, 1 };
        int k = 2;

        Deque<Integer> out = new ArrayDeque<>();
        findCombinations(A, out, k, 0, A.length);
    }
}
```

##

```python3
# Function to print all distinct combinations of length `k`, where the
# repetition of elements is allowed
def findCombinations(A, out, k, i, n):

    # base case: if the combination size is `k`, print it
    if len(out) == k:
        print(out)
        return

    # start from the previous element in the current combination
    # till the last element
    for j in range(i, n):

        # add current element `A[j]` to the solution and recur with the
        # same index `j` (as repeated elements are allowed in combinations)
        out.append(A[j])
        findCombinations(A, out, k, j, n)

        # backtrack: remove the current element from the solution
        out.pop()

if __name__ == '__main__':

    A = [1, 2, 1]
    k = 2

    out = []
    findCombinations(A, out, k, 0, len(A))
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

In case the array contains repeated elements, the above code will print duplicate combinations. To print only distinct tuples in case input contains repeated elements, [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and recur for only one occurrence of adjacent identical elements. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to print the contents of the vector
void printVector(vector<int> const &out)
{
    for (auto it = out.begin(); it != out.end(); it++) {
        cout << *it << " ";
    }
    cout << endl;
}

// Function to print all distinct combinations of length `k`, where the
// repetition of elements is allowed
void findCombinations(int arr[], vector<int> &out, int k, int i, int n)
{
    // base case: if the combination size is `k`, print it
    if (out.size() == k)
    {
        printVector(out);
        return;
    }

    // start from the previous element in the current combination
    // till the last element
    for (int j = i; j < n; j++)
    {
        // add current element `arr[j]` to the solution and recur with the
        // same index `j` (as repeated elements are allowed in combinations)
        out.push_back(arr[j]);
        findCombinations(arr, out, k, j, n);

        // backtrack: remove the current element from the solution
        out.pop_back();

        // code to handle duplicates – skip adjacent duplicates
        while (j < n - 1 && arr[j] == arr[j + 1]) {
            j++;
        }
    }
}

int main()
{
    int arr[] = { 1, 2, 1 };
    int k = 2;

    int n = sizeof(arr) / sizeof(arr[0]);

    // if the array contains repeated elements, sort the array to
    // handle duplicates combinations
    sort (arr, arr + n);

    vector<int> out;
    findCombinations(arr, out, k, 0, n);

    return 0;
}
```

**Output:** 1 1 1 2 2 2

##

```java
import java.util.Arrays;
import java.util.Stack;

class Main
{
    // Function to print all distinct combinations of length `k`, where the
    // repetition of elements is allowed
    public static void findCombinations(int[] A, int k, int i, Stack<Integer> output)
    {
        // base case: if the combination size is `k`, print it
        if (output.size() == k)
        {
            System.out.println(output);
            return;
        }

        // start from the previous element in the current combination
        // till the last element
        for (int j = i; j < A.length; j++)
        {
            // add current element `A[j]` to the solution and recur with the
            // same index `j` (as repeated elements are allowed in combinations)
            output.add(A[j]);
            findCombinations(A, k, j, output);

            // backtrack: remove the current element from the solution
            output.pop();

            // code to handle duplicates – skip adjacent duplicates
            while (j < A.length - 1 && A[j] == A[j + 1]) {
                j++;
            }
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 2, 1 };
        int k = 2;

        // if the array contains repeated elements, sort the array to
        // handle duplicates combinations
        Arrays.sort(A);

        Stack<Integer> output = new Stack<>();
        findCombinations(A, k, 0, output);
    }
}
```

##

```python3
# Function to print all distinct combinations of length `k`, where the
# repetition of elements is allowed
def findCombinations(A, k, i=0, out=[]):

    # base case: if the combination size is `k`, print it
    if len(out) == k:
        print(out)
        return

    # start from the previous element in the current combination
    # till the last element
    j = i
    while j < len(A):

        # add current element `A[j]` to the solution and recur with the
        # same index `j` (as repeated elements are allowed in combinations)
        out.append(A[j])
        findCombinations(A, k, j, out)

        # backtrack: remove the current element from the solution
        out.pop()

        # code to handle duplicates – skip adjacent duplicates
        while j < len(A) - 1 and A[j] == A[j + 1]:
            j = j + 1

        j = j + 1

if __name__ == '__main__':

    A = [1, 2, 1]
    k = 2

    # if the list contains repeated elements, sort the list to
    # handle duplicates combinations
    A.sort()

    findCombinations(A, k)
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).
