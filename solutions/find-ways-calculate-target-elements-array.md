# Find ways to calculate a target from elements of the specified array

> Source: https://www.techiedelight.com/find-ways-calculate-target-elements-array/

Given an integer array, return the total number of ways to calculate the specified target from array elements using only the addition and subtraction operator. The use of any other operator is forbidden.

For example,

Consider the array { 5, 3, -6, 2 }. The total number of ways to reach a target of 6 using only + and – operators is 4 as: (-)-6 = 6 (+) 5 (+) 3 (-) 2 = 6 (+) 5 (-) 3 (-) -6 (-) 2 = 6 (-) 5 (+) 3 (-) -6 (+) 2 = 6 Similarly, there are 4 ways to calculate the target of 4: (-)-6 (-) 2 = 4 (-) 5 (+) 3 (-)-6 = 4 (+) 5 (-) 3 (+) 2 = 4 (+) 5 (+) 3 (+)-6 (+) 2 = 4

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to recursively consider each array element, add or subtract its value from the target, and recur for the remaining elements with every element’s remaining target. Also recur with remaining elements with the same target by ignoring the element completely. Finally, return the number of times the desired target is reached at any point in the recursion.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Count ways to calculate a target from elements of the specified array
int countWays(vector<int> const &nums, int i, int target)
{
    // base case: if a target is found
    if (target == 0 && i == nums.size()) {
        return 1;
    }

    // base case: no elements are left
    if (i == nums.size()) {
        return 0;
    }

    // 1. ignore the current element
    int exclude = countWays(nums, i + 1, target);

    // 2. Consider the current element

    // 2.1. Subtract the current element from the target
    // 2.2. Add the current element to the target
    int include = countWays(nums, i + 1, target - nums[i]) +
                countWays(nums, i + 1, target + nums[i]);

    // Return total count
    return exclude + include;
}

int main()
{
    // input array and target number
    vector<int> nums = { 5, 3, -6, 2 };
    int target = 6;

    cout << countWays(nums, 0, target) << " ways";

    return 0;
}
```

**Output:** 4 ways

##

```java
class Main
{
    // Count ways to calculate a target from elements of a specified array
    public static int countWays(int[] nums, int i, int target)
    {
        // base case: if a target is found
        if (target == 0 && i == nums.length) {
            return 1;
        }

        // base case: no elements are left
        if (i == nums.length) {
            return 0;
        }

        // 1. ignore the current element
        int exclude = countWays(nums, i + 1, target);

        // 2. Consider the current element

        // 2.1. Subtract the current element from the target
        // 2.2. Add the current element to the target
        int include = countWays(nums, i + 1, target - nums[i]) +
                countWays(nums, i + 1, target + nums[i]);

        // Return total count
        return exclude + include;
    }

    public static void main(String[] args)
    {
        // input array and target number
        int[] nums = { 5, 3, -6, 2 };
        int target = 6;

        System.out.println(countWays(nums, 0, target) + " ways");
    }
}
```

##

```python3
# Count ways to calculate a target from elements of a specified list
def countWays(nums, i, target):

    # base case: if a target is found
    if target == 0 and i == len(nums):
        return 1

    # base case: no elements are left
    if i == len(nums):
        return 0

    # 1. ignore the current element
    exclude = countWays(nums, i + 1, target)

    # 2. Consider the current element
    #    2.1. Subtract the current element from the target
    #    2.2. Add the current element to the target
    include = countWays(nums, i + 1, target - nums[i]) + \
            countWays(nums, i + 1, target + nums[i])

    # Return total count
    return exclude + include

if __name__ == '__main__':

    # input list and target number
    nums = [5, 3, -6, 2]
    target = 6

    print(countWays(nums, 0, target), 'ways')
```

The above solution is very similar to the famous [0–1 Knapsack Problem](https://techiedelight.com/0-1-knapsack-problem/) and runs in O(3^n) time, where `n` is the size of the input. The [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) solution is recommended for large input, which is left as an exercise to the readers.

How can we extend the solution to print all pairs?

We can easily extend the solution to print all pairs of elements. The idea is to maintain a list to store the processed elements at any point, along with the information about the operator used.

```cpp
#include <iostream>
#include <vector>
#include <list>
using namespace std;

void printList(list<pair<int, char>> const &list)
{
    for (auto i: list) {
        cout << "(" << i.second << ")" << i.first << " ";
    }
    cout << endl;
}

// Print all ways to calculate a target from elements of a specified array
void printWays(vector<int> const &nums, int i, int target,
            list<pair<int, char>> &auxlist)
{
    // base case: if a target is found, print the result list.
    if (target == 0 && i == nums.size()) {
        printList(auxlist);
    }

    // base case: no elements are left
    if (i == nums.size()) {
        return;
    }

    // ignore the current element
    printWays(nums, i + 1, target, auxlist);

    // consider the current element and subtract it from the target
    auxlist.push_back({nums[i], '+'});
    printWays(nums, i + 1, target + nums[i], auxlist);
    auxlist.pop_back();        // backtrack

    // consider the current element and add it to the target
    auxlist.push_back({nums[i], '-'});
    printWays(nums, i + 1, target - nums[i], auxlist);
    auxlist.pop_back();        // backtrack
}

int main()
{
    // input array and target number
    vector<int> nums = { 5, 3, -6, 2 };
    int target = 6;

    list<pair<int, char>> auxlist;
    printWays(nums, 0, target, auxlist);

    return 0;
}
```

##

```java
import java.util.ArrayDeque;
import java.util.Deque;

class Pair
{
    Integer num;
    Character sign;

    Pair(Integer num, Character sign)
    {
        this.num = num;
        this.sign = sign;
    }

    @Override
    public String toString() {
        return "(" + this.sign + ")" + this.num + " ";
    }
}

class Main
{
    private static void printList(Deque<Pair> list)
    {
        for (Pair p: list) {
            System.out.print(p);
        }
        System.out.println();
    }

    // Print all ways to calculate a target from elements of a specified array
    public static void printWays(int[] nums, int i, int target, Deque<Pair> auxlist)
    {
        // base case: if a target is found, print the result list.
        if (target == 0 && i == nums.length) {
            printList(auxlist);
        }

        // base case: no elements are left
        if (i == nums.length) {
            return;
        }

        // ignore the current element
        printWays(nums, i + 1, target, auxlist);

        // consider the current element and subtract it from the target
        auxlist.addLast(new Pair(nums[i], '+'));
        printWays(nums, i + 1, target + nums[i], auxlist);
        auxlist.pollLast();    // backtrack

        // consider the current element and add it to the target
        auxlist.addLast(new Pair(nums[i], '-'));
        printWays(nums, i + 1, target - nums[i], auxlist);
        auxlist.pollLast();    // backtrack
    }

    public static void main(String[] args)
    {
        // input array and target number
        int[] nums = { 5, 3, -6, 2 };
        int target = 6;

        printWays(nums, 0, target, new ArrayDeque<>());
    }
}
```

##

```python3
def printList(list):
    for (num, sign) in list:
        print(f'({sign}){num} ', end=' ')
    print()

# Print all ways to calculate a target from elements of a specified list
def printWays(nums, i, target, auxlist):
    # base case: if a target is found, print the result list.
    if target == 0 and i == len(nums):
        printList(auxlist)

    # base case: no elements are left
    if i == len(nums):
        return

    # ignore the current element
    printWays(nums, i + 1, target, auxlist)

    # consider the current element and subtract it from the target
    auxlist.append((nums[i], '+'))
    printWays(nums, i + 1, target - nums[i], auxlist)
    auxlist.pop()  # backtrack

    # consider the current element and add it to the target
    auxlist.append((nums[i], '-'))
    printWays(nums, i + 1, target + nums[i], auxlist)
    auxlist.pop()  # backtrack

if __name__ == '__main__':
    # input list and target number
    nums = [5, 3, -6, 2]
    target = 6

    printWays(nums, 0, target, [])
```

**Output:** (-)-6 (+)5 (+)3 (-)2 (+)5 (-)3 (-)-6 (-)2 (-)5 (+)3 (-)-6 (+)2
