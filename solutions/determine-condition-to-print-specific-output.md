# Determine the if condition to print the specific output

> Source: https://www.techiedelight.com/determine-condition-to-print-specific-output/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

What should be the if condition in the following code snippet so that output would be “HelloWorld”.

```
if "condition"
    printf("Hello");
else
    printf("World");
```

## 1\. Using `printf()` function

To print “HelloWorld” using the given code snippet, we need to find a condition that is always `false` and prints “Hello”, so that the else branch is executed. One possible condition is `!printf("Hello")`, which is `false` because the `printf()` function returns the number of characters it has printed, which is a positive value. For example:

```
if (!printf("Hello"))
    printf("Hello");
else
    printf("World");
```

We can also use the comma operator instead of depending upon the return value of `printf` to know what the conditional clause does.

```
if (printf("Hello"), 0)
    printf("Hello");
else
    printf("World");
```

## 2\. Recursive `main()` function

Another option is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. We can print the desired output using a static variable with the recursive `main()` function. The idea is to use a static variable in such a way that the if block is executed in the initial call to the `main()` function and the else block is executed in the second call to the `main()` function. Here is an example:

```
#include <iostream>
using namespace std;

int main()
{
    static int i = 0;
    if (i++ == 0 ? main() : 1) {
        printf("Hello");
    }
    else {
        printf("World");
    }

    return 0;
}
```

Note that we can also use a write custom function instead of calling `main()` recursively:

```
#include <iostream>
using namespace std;

int fun()
{
    static int i = 0;
    if (i++ == 0 ? fun() : 1) {
        printf("Hello");
    }
    else {
        printf("World");
    }
}

int main()
{
    fun();
    return 0;
}
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 53

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
