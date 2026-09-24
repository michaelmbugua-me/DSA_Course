# Find numbers represented as the sum of two cubes for two different pairs

> Source: https://www.techiedelight.com/numbers-represented-as-sum-of-two-cubes/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given a large number, `n`, find all positive numbers less than or equal to `n` that can be represented as the sum of two cubes for at least two different pairs.

In other words, find all positive numbers `m <= n` that can be expressed as:

`m = (a3 + b3) = (c3 + d3)` for distinct `a`, `b`, `c`, `d`.

For example,

If `n = 25000`, `m` can be any of `1729`, `4104`, `13832`, or `20683` as these numbers can be represented as the sum of two cubes for two different pairs.

1729 = 13 \+ 123 = 93 \+ 103 4104 = 23 \+ 163 = 93 \+ 153 13832 = 23 \+ 243 = 183 \+ 203 20683 = 103 \+ 273 = 193 \+ 243

> 

The idea is simple. We know that any number `m` that satisfies the constraint will have two distinct pairs (let's say `(a, b)` and `(c, d)`). Since `m < n`, we can say that `a`, `b`, `c`, and `d` are less than `_n 1/3_`. Now for every distinct pair `(x, y)` formed by numbers less than the `_n 1/3_`, store their sum `x3 + y3` into a set. If two pairs with the same sum exist, print the sum.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <unordered_set>
#include <cmath>
using namespace std;

void findAllNumbers(int n)
{
    // find the cube root of `n`
    int cb = pow(n, 1.0 / 3);

    // create an empty set
    unordered_set<int> s;

    for (int i = 1; i < cb - 1; i++)
    {
        for (int j = i + 1; j < cb + 1; j++)
        {
            // (i, j) forms a pair
            int sum = (i*i*i) + (j*j*j);

            // sum is seen before
            if (s.find(sum) != s.end()) {
                if (sum <= n) {
                    cout << sum << endl;
                }
            }
            else {
                // sum is not seen before
                s.insert(sum);
            }
        }
    }
}

int main()
{
    int n = 25000;

    findAllNumbers(n);

    return 0;
}
```

**Output:** 1729 4104 13832 20683

##

```java
import java.util.HashSet;
import java.util.Set;

class Main
{
    public static void findAllNumbers(int n)
    {
        // find the cube root of `n`
        int cb = (int)Math.pow(n, 1.0 / 3);

        // create an empty set
        Set<Integer> s = new HashSet<>();

        for (int i = 1; i < cb - 1; i++)
        {
            for (int j = i + 1; j < cb + 1; j++)
            {
                // (i, j) forms a pair
                int sum = (i*i*i) + (j*j*j);

                // sum is seen before
                if (s.contains(sum)) {
                    if (sum <= n) {
                        System.out.println(sum);
                    }
                }
                else {
                    // sum is not seen before
                    s.add(sum);
                }
            }
        }
    }

    public static void main(String[] args)
    {
        int n = 25000;
        findAllNumbers(n);
    }
}
```

##

```python3
def findAllNumbers(n):

    # find the cube root of `n`
    cb = int(pow(n, 1.0 / 3))

    # create an empty set
    s = set()

    for i in range(1, cb - 1):
        for j in range(i + 1, cb + 1):

            # (i, j) forms a pair
            sum = (i*i*i) + (j*j*j)

            # sum is seen before
            if sum in s:
                if sum <= n:
                    print(sum)
            else:
                # sum is not seen before
                s.add(sum)

if __name__ == '__main__':

    n = 25000
    findAllNumbers(n)
```

The time complexity of the above solution is O(n2/3).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 169

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
