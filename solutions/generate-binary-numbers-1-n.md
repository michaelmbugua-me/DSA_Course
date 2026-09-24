# Generate binary numbers between 1 to `n` using a queue

> Source: https://www.techiedelight.com/generate-binary-numbers-1-n/

Given a positive number `n`, efficiently generate binary numbers between 1 and `n` using the [queue data structure](https://techiedelight.com/circular-queue-implementation-c/) in linear time.

For example, for `n = 16`, the binary numbers are:

1 10 11 100 101 110 111 1000 1001 1010 1011 1100 1101 1110 1111 10000

> 

Following is the C++, Java, and Python implementation:

```cpp
#include <iostream>
#include <string>
#include <queue>
using namespace std;

// Function to generate binary numbers between 1 and `n` using the
// queue data structure
void generate(int n)
{
    // create an empty queue and enqueue 1
    queue<string> q;
    q.push("1");

    // run `n` times
    int i = 1;
    while (i++ <= n)
    {
        // append 0 and 1 to the front element of the queue and
        // enqueue both strings
        q.push(q.front() + "0");
        q.push(q.front() + "1");

        // dequeue front element after printing it
        cout << q.front() << ' ';
        q.pop();
    }
}

int main()
{
    int n = 16;
    generate(n);

    return 0;
}
```

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

class Main
{
    // Function to generate binary numbers between 1 and `n` using the
    // queue data structure
    public static void generate(int n)
    {
        // create an empty queue and enqueue 1
        Queue<String> q = new ArrayDeque<>();
        q.add("1");

        // run `n` times
        int i = 1;
        while (i++ <= n)
        {
            // append 0 and 1 to the front element of the queue and
            // enqueue both strings
            q.add(q.peek() + '0');
            q.add(q.peek() + '1');

            // remove the front element and print it
            System.out.print(q.poll() + ' ');
        }
    }

    public static void main(String[] args)
    {
        int n = 16;
        generate(n);
    }
}
```

##

```python3
from collections import deque

# Function to generate binary numbers between 1 and `n` using the
# queue data structure
def generate(n):

    # create an empty queue and enqueue 1
    q = deque()
    q.append('1')

    # run `n` times
    for i in range(n):
        # remove the front element
        front = str(q.popleft())

        # append 0 and 1 to the front element of the queue and
        # enqueue both strings
        q.append(front + '0')
        q.append(front + '1')

        # print the front element
        print(front, end=' ')

if __name__ == '__main__':

    n = 16
    generate(n)
```

**Output:** 1 10 11 100 101 110 111 1000 1001 1010 1011 1100 1101 1110 1111 10000

The time complexity of the above solution is O(n) and requires O(n) extra space.

We can also use [std::bitset](https://cplusplus.com/reference/bitset/bitset/) in C++, as shown below:

```cpp
#include <iostream>
#include <string>
#include <bitset>
using namespace std;

// Function to generate binary numbers between 1 and `n` using `std::bitset`
int generate(int n)
{
    // run `n` times
    for (int i = 1; i <= n; i++)
    {
        // convert `i` to an 8–bit binary number
        bitset<8> binary(i);

        // print the current binary number
        cout << binary.to_string() << ' ';
    }
}

int main()
{
    int n = 16;
    generate(n);

    return 0;
}
```

**Output:** 00000001 00000010 00000011 00000100 00000101 00000110 00000111 00001000 00001001 00001010 00001011 00001100 00001101 00001110 00001111 00010000

The time complexity of the above solution is O(n), and the auxiliary space used by the program is O(1).
