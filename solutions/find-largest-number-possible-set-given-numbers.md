# Find the largest number possible from a given set of numbers

> Source: https://www.techiedelight.com/find-largest-number-possible-set-given-numbers/

Find the largest number possible from a set of given numbers where the numbers append to each other in any order to form the largest number.

For example,

**Input:** { 10, 68, 75, 7, 21, 12 } **Output:** 77568211210

> 

Simply sorting the array in descending order and considering the sorted order is not possible here as the sorted array `{75, 68, 21, 12, 10, 7}` will result in the number `75682112107`, which is less than the largest number possible `77568211210`.

The idea is to write our [custom comparator function for the sorting](https://techiedelight.com/sort-array-ascending-order-cpp/) routine. For two numbers, `X` and `Y`, the custom comparator function will not compare `X` and `Y` with each other, but it compares `XY` with `YX`, and the greater number will come first in sorted order. Here, `XY` denotes a number formed by appending `Y` to `X`, and `YX` denotes a number formed by appending `X` to `Y`. For example, for `X = 15` and `Y = 4`, `XY = 154` and `YX = 415`.

As evident from the above example, `X > Y` but `XY < YX`, so the comparator function will consider `Y > X`. This is demonstrated below in C, C++, and Java:

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/*
    Note – An element of `a` is of type `char*` and the `const void*` in
    compare point to `*char`, so what is being passed is a `char**`.
    Therefore, the proper cast is `*(const char**)a`.
*/
int compare(const void *a, const void *b)
{
    const char **X = (const char **)a;
    const char **Y = (const char **)b;

    int len = strlen(*X) + strlen(*Y) + 1;

    // create a new string, `X + Y`
    char XY[len];
    strcpy(XY, *X);
    strcat(XY, *Y);

    // create a new string, `Y + X`
    char YX[len];
    strcpy(YX, *Y);
    strcat(YX, *X);

    // the largest of `YX` and `XY` should come first in the sorted array
    return strcmp(YX, XY);
}

int main(void)
{
    char *arr[] = { "10", "68", "97", "9", "21", "12" };
    int n = sizeof(arr)/sizeof(arr[0]);

    // custom sort
    qsort(arr, n, sizeof(arr[0]), compare);

    // print the sorted sequence
    printf("The largest number is ");
    for (int i = 0; i < n; i++ ) {
        printf("%s", arr[i]);
    }

    return 0;
}
```

**Output:** The largest number is 99768211210

##

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

// sort using a custom function object
struct {
    bool operator()(int a, int b) const
    {
        string value1 = to_string(a) + to_string(b);
        string value2 = to_string(b) + to_string(a);

        return value1 > value2;
    }
} customCompare;

string findLargestNumber(vector<int> &nums)
{
    sort(nums.begin(), nums.end(), customCompare);
    string s;
    for (int &i: nums) {
        s += to_string(i);
    }
    return s;
}

int main()
{
    vector<int> numbers = { 10, 68, 97, 9, 21, 12 };

    cout << "The largest number is " << findLargestNumber(numbers) << endl;

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class Main
{
    public static String findLargestNumber(List<Integer> nums)
    {
        // sort using a custom function object
        Collections.sort(nums, (a, b) -> (String.valueOf(b) + a).compareTo(String.valueOf(a) + b));
        return nums.stream()
                .map(Object::toString)
                .collect(Collectors.joining(""));
    }

    public static void main(String[] args)
    {
        List<Integer> numbers = Arrays.asList(10, 68, 97, 9, 21, 12);

        String largestNumber = findLargestNumber(numbers);
        System.out.println("The largest number is " + largestNumber);
    }
}
```

##

```python3
from functools import cmp_to_key

@cmp_to_key
def custom_compare(a, b):
    value1 = str(a) + str(b)
    value2 = str(b) + str(a)

    if value1 < value2:
        return 1
    elif value1 > value2:
        return -1
    else:
        return 0

def findLargestNumber(numbers):
    # sort using a custom function object
    numbers.sort(key=custom_compare)

    # join and return
    return ''.join(map(str, numbers))

if __name__ == '__main__':
    numbers = [10, 68, 97, 9, 21, 12]

    largestNumber = findLargestNumber(numbers)
    print('The largest number is', largestNumber)
```

The time complexity of the above solution is O(n.log(n)) and doesn’t require any extra space, where `n` is the size of the input.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 196

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
