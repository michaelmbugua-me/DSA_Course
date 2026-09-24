# Print all numbers between 1 to N without using any loop | 4 methods

> Source: https://www.techiedelight.com/print-numbers-1-n-without-using-loop-4-methods/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Write a program to print all numbers between 1 and `N` without using a loop.

## Method 1: Using static variable in recursive main

The idea is to call the `main()` function recursively, and with each call, print the next element from the series. To store information about the previous element printed, we use a static variable (Note that a global variable will also work fine).

The following C++ program demonstrates it:

```
#include <iostream>
using namespace std;
#define N 100

int main()
{
    static int i = 1;
    if (i <= N && cout << i++ << " ") {
        main();
    }

    return 0;
}
```

OR

```
#include <iostream>
using namespace std;
#define N 100

int main()
{
    static int i = 0;
    if (i++ < N)
    {
        cout << i << " ";
        main();
    }

    return 0;
}
```

## Method 2: Using Recursion by implementing a separate method

```
#include <iostream>
using namespace std;
#define N 100

void print(int n)
{
    if (n <= 0) {
        return;
    }

    print(n - 1);
    cout << n << " ";
}

int main()
{
    print(N);
    return 0;
}
```

OR

```
#include <iostream>
using namespace std;
#define N 100

// Short–circuiting (not a conditional statement)
void print(int n) {
    n && (print(n - 1), cout << n << " ");
}

int main()
{
    print(N);
    return 0;
}
```

## Method 3: Using a MACRO

```
#include <iostream>
using namespace std;

#define COUT(i) cout << i++ << " ";
#define LEVEL(N) N N N N N N N N N N
#define PRINT(i) LEVEL(LEVEL(COUT(i)));        // 100 = 10×10

int main()
{
    int i = 1;

    // prints numbers from 1 to 100
    PRINT(i);

    return 0;
}
```

## Method 4: Without Recursion using struct/class with static field

```
#include <iostream>
using namespace std;
#define N 100

struct X
{
    static int i;
    X() {
        cout << ++i << " ";
    }
};

int X::i = 0;

int main()
{
    X ob[N];
    return 0;
}
```

We can also use the C++ class replacing struct.

```
#include <iostream>
using namespace std;
#define N 100

class X
{
    static int i;
public:
    X() {
        cout << ++i << " ";
    }
};

int X::i = 0;

int main()
{
    X ob[N];
    return 0;
}
```

**Exercise:** Extend method 3 to print numbers from 1 to 1000

**References:** <https://stackoverflow.com/questions/4568645/printing-1-to-1000-without-loop-or-conditionals/>

Also See:

> [Print all numbers between 1 to N without using a semicolon](https://www.techiedelight.com/print-numbers-1-n-without-using-semicolon/ "Print all numbers between 1 to N without using a semicolon")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.51/5. Vote count: 65

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
