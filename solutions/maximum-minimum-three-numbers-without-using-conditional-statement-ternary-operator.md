# Find maximum and minimum value of a triplet without using a conditional statement

> Source: https://www.techiedelight.com/maximum-minimum-three-numbers-without-using-conditional-statement-ternary-operator/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given three integers, find the maximum and minimum number between them without using conditional statements or ternary operator.

## Approach 1: Using short-circuiting in Boolean expressions

The idea is to take advantage of [short-circuiting](https://en.wikipedia.org/wiki/Short-circuit_evaluation) in Boolean expressions. We know that in Boolean `AND` operations such as `x && y`, `y` is only evaluated if `x` is true. If `x` is false, then `y` is not evaluated because the whole expression would be false, which can be deduced without even evaluating `y`. This is called short-circuiting in Boolean expressions.

The idea is to apply this principle to the following code. Initially, `max` is `a`. If `max < b` is true, then that means `b` is greater than `a`, so the second subexpression `max = b` is evaluated, and `max` is set to `b`. If, however, `max < b` is false, then the second subexpression is not evaluated, and `max` will remain `a` (greater than `b`). Similarly, the second expression is evaluated.

We can implement the minimum function as well, in a similar fashion, as demonstrated below in C++:

```
#include <iostream>
using namespace std;

int maximum(int a, int b, int c)
{
    // initialize `max` with `a`
    int max = a;

    // set `max` to `b` if and only if `max` is less than `b`
    (max < b) && (max = b);    // these are not conditional statements

    // set `max` to `c` if and only if `max` is less than `c`
    (max < c) && (max = c);    // these are just boolean expressions

    return max;
}

int minimum(int a, int b, int c)
{
    // initialize `min` with `a`
    int min = a;

    // set `min` to `b` if and only if `min` is more than `b`
    (min > b) && (min = b);

    // set `min` to `c` if and only if `min` is more than `c`
    (min > c) && (min = c);

    return min;
}

int main()
{
    cout << maximum(7, 9, 4) << endl;
    cout << minimum(6, 3, 9) << endl;

    return 0;
}
```

## Approach 2: Using array index

```
#include <iostream>
using namespace std;

int maximum(int a, int b, int c)
{
    // `first` will contain the first two elements
    int first[] = { a, b };

    // `second` will contain the maximum of the first two elements at
    // the 0th index and the third element at index 1
    int second[] = { first[a < b], c };

    // finally, return the maximum element
    return second[second[0] < c];
}

int minimum(int a, int b, int c)
{
    // `first` will contain the first two elements
    int first[] = { a, b };

    // `second` will contain the minimum of the first two elements at the
    // 0th index and the third element at index 1
    int second[] = { first[a > b], c };

    // finally, return the minimum element
    return second[second[0] > c];
}

int main()
{
    cout << maximum(6, 3, 9) << endl;
    cout << minimum(6, 3, 9) << endl;

    return 0;
}
```

We can simplify the above approach by breaking the problem into finding the maximum/minimum of two numbers. The following C++ program demonstrates it:

```
#include <iostream>
using namespace std;

int maximum(int a, int b)
{
    int lookup[] = {a, b};
    return lookup[a < b];
}

int maximum (int a, int b, int c) {
    return maximum(a, maximum(b, c));
}

int main()
{
    cout << maximum(6, 3, 9) << endl;

    return 0;
}
```

We can implement the minimum function, in a similar fashion, as demonstrated below in C++:

```
#include <iostream>
using namespace std;

int minimum(int a, int b)
{
    int lookup[] = {a, b};
    return lookup[a > b];
}

int minimum(int a, int b, int c) {
    return minimum(a, minimum(b, c));
}

int main()
{
    cout << minimum(6, 3, 9) << endl;

    return 0;
}
```

## Approach 3: Using repeated subtraction

```
#include <iostream>
using namespace std;

int minimum (int a, int b, int c)
{
    int min = 0;
    while (a && b && c) {
        a--, b--, c--, min++;
    }

    return min;
}

int maximum (int a, int b, int c)
{
    int max = 0;
    while (a > 0 || b > 0 || c > 0) {
        a--, b--, c--, max++;
    }

    return max;
}

int main()
{
    cout << maximum(6, 3, 9) << endl;
    cout << minimum(6, 3, 9) << endl;

    return 0;
}
```

**References:** <https://stackoverflow.com/questions/7074010/find-maximum-of-three-number-in-c-without-using-conditional-statement-and-ternar>

Also See:

> [Check if a number is even or odd without using any conditional statement](https://www.techiedelight.com/find-number-even-odd-without-using-conditional-statement/ "Check if a number is even or odd without using any conditional statement")

> [Find minimum number without using conditional statement or ternary operator](https://www.techiedelight.com/find-minimum-number-without-using-conditional-statement-ternary-operator/ "Find minimum number without using conditional statement or ternary operator")

> [Find maximum number without using conditional statement or ternary operator](https://www.techiedelight.com/find-maximum-number-without-using-conditional-statement-ternary-operator/ "Find maximum number without using conditional statement or ternary operator")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 54

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
