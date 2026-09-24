# Quicksort using Dutch National Flag Algorithm

> Source: https://www.techiedelight.com/quicksort-using-dutch-national-flag-algorithm/

Implement Quicksort efficiently for inputs containing many repeated elements.

[Quicksort](https://techiedelight.com/quicksort/) exhibits poor performance for inputs that contain many repeated elements. The problem is visible when all the input elements are equal. Then at each point in recursion, the left partition is empty (no input values are less than the pivot), and the right partition has only decreased by one element (the pivot is removed). Consequently, the algorithm takes quadratic time to sort an array of equal values.

> 

We can use an alternative linear-time partition routine to solve this problem that separates the values into three groups:

  * The values less than the pivot,
  * The values equal to the pivot, and
  * The values greater than the pivot.

The values equal to the pivot are already sorted, so only the less-than and greater-than partitions need to be recursively sorted. This linear-time partition routine is similar to 3–way partitioning for the [Dutch national flag problem](https://en.wikipedia.org/wiki/Dutch_national_flag_problem).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Partition routine using the Dutch national flag algorithm
pair<int, int> partition(vector<int> &nums, int start, int end)
{
    int mid = start;
    int pivot = nums[end];

    while (mid <= end)
    {
        if (nums[mid] < pivot)
        {
            swap(nums[start], nums[mid]);
            ++start, ++mid;
        }
        else if (nums[mid] > pivot)
        {
            swap(nums[mid], nums[end]);
            --end;
        }
        else {
            ++mid;
        }
    }

    // nums[start … mid-1] contains all occurrences of a pivot
    return make_pair(start - 1, mid);
}

// 3–way Quicksort routine
void quicksort(vector<int> &nums, int start, int end)
{
    // base condition for 0 or 1 elements
    if (start >= end) {
        return;
    }

    // rearrange elements across pivot using the Dutch national flag algorithm
    pair<int, int> pivot = partition(nums, start, end);

    // recur on the subarray containing elements that are less than the pivot
    quicksort(nums, start, pivot.first);

    // recur on the subarray containing elements that are more than the pivot
    quicksort(nums, pivot.second, end);
}

int main()
{
    vector<int> nums = { 2, 6, 5, 2, 6, 8, 6, 1, 2, 6 };
    int n = nums.size();

    // sort list
    quicksort(nums, 0, n - 1);

    // print the sorted array
    for (int i = 0; i < n; i++) {
        cout << nums[i] << " ";
    }

    return 0;
}
```

**Output:** 1 2 2 2 5 6 6 6 6 8

##

```java
import java.util.Arrays;

// A simple pair class in Java
class Pair
{
    private int x;
    private int y;

    Pair(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public int getY() { return y; }
}

class Main
{
    public static void swap (int[] nums, int i, int j)
    {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    // Partition routine using the Dutch national flag algorithm
    public static Pair partition(int[] nums, int start, int end)
    {
        int mid = start;
        int pivot = nums[end];

        while (mid <= end)
        {
            if (nums[mid] < pivot)
            {
                swap(nums, start, mid);
                ++start;
                ++mid;
            }
            else if (nums[mid] > pivot)
            {
                swap(nums, mid, end);
                --end;
            }
            else {
                ++mid;
            }
        }

        // nums[start … mid-1] contains all occurrences of a pivot
        return new Pair(start - 1, mid);
    }

    // 3–way Quicksort routine
    public static void quicksort(int[] nums, int start, int end)
    {
        // base condition for 0 or 1 elements
        if (start >= end) {
            return;
        }

        // rearrange elements across pivot using the Dutch national flag algorithm
        Pair pivot = partition(nums, start, end);

        // recur on the subarray containing elements that are less than the pivot
        quicksort(nums, start, pivot.getX());

        // recur on the subarray containing elements that are more than the pivot
        quicksort(nums, pivot.getY(), end);
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 6, 5, 2, 6, 8, 6, 1, 2, 6 };

        // sort list
        quicksort(nums, 0, nums.length - 1);

        // print the sorted array
        System.out.println(Arrays.toString(nums));
    }
}
```

##

```python3
def swap (nums, i, j):
    temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp

# Partition routine using the Dutch national flag algorithm
def partition(nums, start, end):
    mid = start
    pivot = nums[end]

    while mid <= end:
        if nums[mid] < pivot:
            swap(nums, start, mid)
            start += 1
            mid += 1
        elif nums[mid] > pivot:
            swap(nums, mid, end)
            end -= 1
        else:
            mid += 1

    # nums[start … mid-1] contains all occurrences of a pivot
    return start - 1, mid

# 3–way Quicksort routine
def quicksort(nums, start, end):

    # base condition for 0 or 1 elements
    if start >= end:
        return

    # rearrange elements across pivot using the Dutch national flag algorithm
    x, y = partition(nums, start, end)

    # recur on sublist containing elements that are less than the pivot
    quicksort(nums, start, x)

    # recur on sublist containing elements that are more than the pivot
    quicksort(nums, y, end)

if __name__ == '__main__':

    nums = [2, 6, 5, 2, 6, 8, 6, 1, 2, 6]

    # sort list
    quicksort(nums, 0, len(nums) - 1)

    # print the sorted list
    print(nums)
```

The algorithm’s best-case now occurs when all elements are equal (or are chosen from a small set of `k << n` elements). The modified Quicksort will perform at most two recursive calls on empty subarrays and thus finish linearly in all identical elements.

**References:** <https://en.wikipedia.org/wiki/Quicksort>

Also See:

> [Sort an array of 0’s, 1’s, and 2’s (Dutch National Flag Problem)](https://www.techiedelight.com/sort-array-containing-0s-1s-2s-dutch-national-flag-problem/ "Sort an array of 0’s, 1’s, and 2’s \(Dutch National Flag Problem\)")

> [How to Boost QuickSort Performance?](https://www.techiedelight.com/boost-quicksort-performance/ "How to Boost QuickSort Performance?")

> [Quicksort algorithm using Hoare’s partitioning scheme](https://www.techiedelight.com/quick-sort-using-hoares-partitioning-scheme/ "Quicksort algorithm using Hoare’s partitioning scheme")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 263

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
