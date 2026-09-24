# Generate random input from an array according to given probabilities

> Source: https://www.techiedelight.com/generate-random-input-array-according-given-probabilities/

Write an algorithm to generate any one of the given `n` numbers according to given probabilities.

For example, consider the following integer array and their probabilities. The solution should return 1 with `30%` probability, 2 with `10%` probability, 3 with `20%` probability, and so on for every array element.

nums[] = { 1, 2, 3, 4, 5 }; probability[] = { 30, 10, 20, 15, 25 }; // total probability should sum to 100%

> 

Algorithm:

  1. Construct a sum array `S[]` from the given probability array `P[]`, where `S[i]` holds the sum of all `P[j]` for `0 <= j <= i`.
  2. Generate a random integer from 1 to 100 and check where it lies in `S[]`.
  3. Based on the comparison result, return the corresponding element from the input array.

The implementation can be seen below in C, C++, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <limits.h>

// Function to generate random nums from an array according to
// given probabilities
int getRandom(int *nums, int *probability, int n)
{
    // construct a sum array from the given probabilities
    int prob_sum[n];
    memset(prob_sum, 0, sizeof prob_sum);

    // `prob_sum[i]` holds sum of all `probability[j]` for `0 <= j <=i`
    prob_sum[0] = probability[0];
    for (int i = 1; i < n; i++) {
        prob_sum[i] = prob_sum[i-1] + probability[i];
    }

    // generate a random integer from 1 to 100 and check where it lies in `prob_sum[]`
    int r = (rand() % 100) + 1;

    // based on the comparison result, return the corresponding
    // element from the input array

    if (r <= prob_sum[0]) {         // handle 0th index separately
        return nums[0];
    }

    for (int i = 1; i < n; i++)
    {
        if (r > prob_sum[i - 1] && r <= prob_sum[i]) {
            return nums[i];
        }
    }
}

int main(void)
{
    // Input: integer array and their probabilities
    // Goal: generate `nums[i]` with probability equal to `probability[i]`

    int nums[] = {1, 2, 3, 4, 5};
    int probability[] = {30, 10, 20, 15, 25};

    int n = sizeof (nums) / sizeof (nums[0]);

    // initialize srand with a distinctive value
    srand(time(NULL));

    // maintain a count array to validate the results (assuming max nums is 1000)
    int count[1000];
    memset(count, 0, sizeof count);

    // make 1000000 calls to the `random()` function and store the results
    for (int i = 1; i <= 1000000; i++)
    {
        int val = getRandom(nums, probability, n);
        count[val]++;
    }

    // print the results
    for (int i = 0; i < n; i++) {
        printf("%d ~ %0.2f%\n", nums[i], count[nums[i]]/10000.0);
    }

    return 0;
}
```

##

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <cstdlib>
#include <ctime>
using namespace std;

// Function to generate random nums from a vector according to the given probabilities
int random(vector<int> const &nums, vector<int> const &probability)
{
    int n = nums.size();
    if (n != probability.size()) {
        return -1;        // error
    }

    // construct a sum vector from the given probabilities
    vector<int> prob_sum(n, 0);

    // `prob_sum[i]` holds sum of all `probability[j]` for `0 <= j <=i`
    prob_sum[0] = probability[0];
    for (int i = 1; i < n; i++) {
        prob_sum[i] = prob_sum.at(i-1) + probability[i];
    }

    // generate a random integer from 1 to 100 and check where it lies in `prob_sum[]`
    int r = (rand() % 100) + 1;

    // based on the comparison result, return the corresponding
    // element from the nums vector

    if (r <= prob_sum[0]) {      // handle 0th index separately
        return nums[0];
    }

    for (int i = 1; i < n; i++)
    {
        if (r > prob_sum.at(i-1) && r <= prob_sum[i]) {
            return nums[i];
        }
    }
}

int main()
{
    // Input: vector of integers and their probabilities
    // Goal: generate `nums[i]` with probability equal to `probability[i]`

    vector<int> nums = {1, 2, 3, 4, 5};
    vector<int> probability = {30, 10, 20, 15, 25};

    // initialize srand with a distinctive value
    srand(time(NULL));

    // maintain a frequency map to validate the results
    unordered_map<int, int> freq;

    // make 1000000 calls to the `random()` function and
    // store results in a map
    for (int i = 0; i < 1000000; i++)
    {
        int val = random(nums, probability);
        freq[val]++;
    }

    // print the results
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i] << " ~ " << freq[nums[i]]/10000.0 << "%" << endl;
    }

    return 0;
}
```

##

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

class Main
{
    public static int rand(int min, int max)
    {
        if (min > max || (max - min + 1 > Integer.MAX_VALUE)) {
            throw new IllegalArgumentException("Invalid range");
        }

        return new Random().nextInt(max - min + 1) + min;
    }

    // Function to generate random nums from a list according to the
    // given probabilities
    public static int random(int[] nums, int[] probability)
    {
        int n = nums.length;
        if (n != probability.length) {
            return -1;        // error
        }

        // construct a sum array from the given probabilities
        int[] prob_sum = new int[n];

        // `prob_sum[i]` holds sum of all `probability[j]` for `0 <= j <=i`
        prob_sum[0] = probability[0];
        for (int i = 1; i < n; i++) {
            prob_sum[i] = prob_sum[i - 1] + probability[i];
        }

        // generate a random integer from 1 to 100 and check where it lies
        // in `prob_sum[]`
        int r = rand(1, 100);

        // based on the comparison result, return the corresponding
        // element from the input list

        if (r <= prob_sum[0]) {     // handle 0th index separately
            return nums[0];
        }

        for (int i = 1; i < n; i++)
        {
            if (r > prob_sum[i-1] && r <= prob_sum[i]) {
                return nums[i];
            }
        }

        return -1;
    }

    public static void main(String[] args)
    {
        // Input: list of integers and their probabilities
        // Goal: generate `nums[i]` with probability equal to `probability[i]`

        int[] nums = { 1, 2, 3, 4, 5 };
        int[] probability = { 30, 10, 20, 15, 25 };

        // maintain a frequency map to validate the results
        Map<Integer, Integer> freq = new HashMap<>();

        // make 1000000 calls to the `random()` function and store results in a map
        for (int i = 0; i < 1000000; i++)
        {
            int val = random(nums, probability);
            freq.put(val, freq.getOrDefault(val, 0) + 1);
        }

        // print the results
        for (int i = 0; i < nums.length; i++) {
            System.out.println(nums[i] + " ~ " + freq.get(nums[i]) / 10000.0 + "%");
        }
    }
}
```

##

```python3
from random import randrange

# Function to generate random nums from a list according to the
# given probabilities
def random(nums, probability):

    n = len(nums)
    if n != len(probability):
        return -1               # error

    # construct a sum list from the given probabilities
    prob_sum = [None] * n

    # `prob_sum[i]` holds sum of all `probability[j]` for `0 <= j <=i`
    prob_sum[0] = probability[0]
    for i in range(1, n):
        prob_sum[i] = prob_sum[i - 1] + probability[i]

    # generate a random integer from 1 to 100
    # and check where it lies in `prob_sum`
    r = randrange(1, 100)

    # based on the comparison result, return the corresponding
    # element from the input list

    if r <= prob_sum[0]:        # handle 0th index separately
        return nums[0]

    for i in range(1, n):
        if prob_sum[i - 1] < r <= prob_sum[i]:
            return nums[i]

    return -1

if __name__ == '__main__':

    # Input: list of integers and their probabilities
    # Goal: generate `nums[i]` with probability equal to `probability[i]`

    nums = [1, 2, 3, 4, 5]
    probability = [30, 10, 20, 15, 25]

    # maintain a frequency map to validate the results
    freq = {}

    # make 1000000 calls to the `random()` function and store results in a dictionary
    for i in range(1000000):
        val = random(nums, probability)
        freq[val] = freq.get(val, 0) + 1

    # print the results
    for i in range(len(nums)):
        print(f'{nums[i]} ~ {freq.get(nums[i]) / 10000.0}%')
```

**`Output (will vary):`** 1 ~ 30.3368% 2 ~ 10.063% 3 ~ 20.1714% 4 ~ 15.1579% 5 ~ 24.2709%

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.65/5. Vote count: 286

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
