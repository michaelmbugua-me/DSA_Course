# Sort a k-sorted array

> Source: https://www.techiedelight.com/sort-k-sorted-array/

Given a k–sorted array that is almost sorted such that each of the `n` elements may be misplaced by no more than `k` positions from the correct sorted order. Find a space-and-time efficient algorithm to sort the array.

For example,

**Input:** arr = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9] k = 2 **Output:**[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

> 

A simple solution would be to use an [efficient sorting algorithm](https://techiedelight.com/quicksort/) to sort the whole array again. The worst-case time complexity of this approach will be O(n.log(n)), where `n` is the size of the input. This method also does not use the fact that the array is k–sorted. We can also use the [insertion sort algorithm](https://techiedelight.com/insertion-sort-iterative-recursive/) to correct the order in just O(n.k) time. Insertion sort performs really well for small values of `k`, but it’s not recommended for a large value of `k` (we can use it for `k < 12`).

We can solve this problem in O(n.log(k)) using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `k+1` and insert the first `k+1` elements into the heap. Then remove minimum from the heap and insert the next element from the array into the heap and continue the process till both array and heap are exhausted. Each pop operation from the heap should insert the corresponding top element in its correct position into the array.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Function to sort a k–sorted array
void sortKSortedArray(vector<int> &nums, int k)
{
    // create an empty min-heap using `std::priority_queue`
    // use `std::greater` as a comparison function for min-heap
    priority_queue<int, vector<int>, greater<int>> pq;

    // insert the first `k+1` elements into a heap
    for (int i = 0; i <= k; i++) {
        pq.push(nums[i]);
    }

    int index = 0;

    // do for remaining elements in the array
    for (int i = k + 1; i < nums.size(); i++)
    {
        // pop the top element from the min-heap and assign them to the
        // next available array index
        nums[index++] = pq.top();
        pq.pop();

        // push the next array element into min-heap
        pq.push(nums[i]);
    }

    // pop all remaining elements from the min-heap and assign them to the
    // next available array index
    while (!pq.empty())
    {
        nums[index++] = pq.top();
        pq.pop();
    }
}

int main()
{
    vector<int> nums = { 1, 4, 5, 2, 3, 7, 8, 6, 10, 9};
    int k = 2;

    sortKSortedArray(nums, k);

    // print the sorted array
    for (int i: nums) {
        cout << i << " ";
    }

    return 0;
}
```

**Output:** 1 2 3 4 5 6 7 8 9 10

##

```java
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Main
{
    // Function to sort a k–sorted array
    public static void sortKSortedArray(List<Integer> nums, int k)
    {
        // create an empty min-heap and insert the first `k+1` elements into it
        PriorityQueue<Integer> pq = new PriorityQueue<>(nums.subList(0, k+1));

        int index = 0;

        // do for remaining elements in the array
        for (int i = k + 1; i < nums.size(); i++)
        {
            // pop the top element from the min-heap and assign them to the
            // next available array index
            nums.set(index++, pq.poll());

            // push the next array element into min-heap
            pq.add(nums.get(i));
        }

        // pop all remaining elements from the min-heap and assign them to the
        // next available array index
        while (!pq.isEmpty()) {
            nums.set(index++, pq.poll());
        }
    }

    public static void main(String[] args)
    {
        List<Integer> nums = Arrays.asList(1, 4, 5, 2, 3, 7, 8, 6, 10, 9);
        int k = 2;

        sortKSortedArray(nums, k);
        System.out.println(nums);
    }
}
```

##

```python3
import heapq
from heapq import heappop, heappush

# Function to sort a k–sorted array
def sort_k_sorted_arr(nums, k):

    # build a min-heap from the first `k+1` elements in the list
    pq = nums[0:k+1]
    heapq.heapify(pq)

    # do for remaining elements in the list
    index = 0
    for i in range(k+1, len(nums)):

        # pop the top element from the min-heap and assign them to the
        # next available list index
        nums[index] = heappop(pq)
        index = index + 1

        # push the next list element into min-heap
        heappush(pq, nums[i])

    # pop all remaining elements from the min-heap and assign them to the
    # next available list index
    while pq:
        nums[index] = heappop(pq)
        index = index + 1

if __name__ == '__main__':

    nums = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9]
    k = 2

    sort_k_sorted_arr(nums, k)
    print(nums)
```

The time complexity of the above solution is O(n.log(k)) since each insertion operation takes O(log(k)) time, and there are `n` elements in the input. The additional space used by the program is O(k).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 204

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
