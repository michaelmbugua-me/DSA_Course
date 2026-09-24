# Check if a set of moves is circular or not

> Source: https://www.techiedelight.com/check-given-set-moves-circular-not/

[String](https://www.techiedelight.com/Category/String/)

Check if a given set of moves is circular or not. A move is circular if its starting and ending coordinates are the same. The moves can contain instructions to move one unit in the same direction `(M)`, to change direction to the left of current direction `(L)`, and to change direction to the right of current direction `(R)`. Assume that the initial direction is North.

For example,

Set of moves MRMRMRM is circular Set of moves MRMLMRMRMMRMM is circular

> 

The idea is simple – start with `(0, 0)` as the starting coordinates and North as the starting direction and linearly read each instruction from the input string. For every instruction, update the coordinates of the current location `(x, y)` if the instruction is `MOVE` or update the current direction if the instruction is `GO LEFT` or `GO RIGHT`. The move is circular if we are back to the starting coordinates `(0, 0)` in the end.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to check if the given set of moves is circular or not
bool isCircularMove(string str)
{
    // start from coordinates (0, 0)
    int x = 0, y = 0;

    // assume that the initial direction is North
    char dir = 'N';

    // read each instruction from the input string
    for (int i = 0; i < str.length(); i++)
    {
        switch (str[i])
        {
            // move one unit in the same direction
            case 'M':
                if (dir == 'N') {
                    y++;
                } else if (dir == 'S') {
                    y--;
                } else if (dir == 'E') {
                    x++;
                } else if (dir == 'W') {
                    x--;
                }
                break;

            // change direction to the left of the current direction
            case 'L':
                if (dir == 'N') {
                    dir = 'W';
                } else if (dir == 'W') {
                    dir = 'S';
                } else if (dir == 'S') {
                    dir = 'E';
                } else if (dir == 'E') {
                    dir = 'N';
                }
                break;

            // change direction to the right of the current direction
            case 'R':
                if (dir == 'N') {
                    dir = 'E';
                } else if (dir == 'E') {
                    dir = 'S';
                } else if (dir == 'S') {
                    dir = 'W';
                } else if (dir == 'W') {
                    dir = 'N';
                }
        }
    }

    // if we are back to starting coordinates (0, 0),
    // the move is circular
    return (!x && !y);
}

int main()
{
    string str = "MMRMMRMMRMM";

    if (isCircularMove(str)) {
        cout << "Circular move";
    }
    else {
        cout << "Non-circular move";
    }

    return 0;
}
```

**Output:** Circular move

##

```java
class Main
{
    // Function to check if the given set of moves is circular or not
    public static boolean isCircularMove(String str)
    {
        // start from coordinates (0, 0)
        int x = 0, y = 0;

        // assume that the initial direction is North
        char dir = 'N';

        // read each instruction from the input string
        for (char ch: str.toCharArray())
        {
            switch (ch)
            {
                // move one unit in the same direction
                case 'M':
                    if (dir == 'N') {
                        y++;
                    } else if (dir == 'S') {
                        y--;
                    } else if (dir == 'E') {
                        x++;
                    } else if (dir == 'W') {
                        x--;
                    } break;

                // change direction to the left of the current direction
                case 'L':
                    if (dir == 'N') {
                        dir = 'W';
                    } else if (dir == 'W') {
                        dir = 'S';
                    } else if (dir == 'S') {
                        dir = 'E';
                    } else if (dir == 'E') {
                        dir = 'N';
                    } break;

                // change direction to the right of the current direction
                case 'R':
                    if (dir == 'N') {
                        dir = 'E';
                    } else if (dir == 'E') {
                        dir = 'S';
                    } else if (dir == 'S') {
                        dir = 'W';
                    } else if (dir == 'W') {
                        dir = 'N';
                    }
            }
        }

        // if we are back to starting coordinates (0, 0),
        // the move is circular
        return (x == 0 && y == 0);
    }

    public static void main(String[] args)
    {
        String str = "MMRMMRMMRMM";

        if (isCircularMove(str)) {
            System.out.println("Circular move");
        }
        else {
            System.out.println("Non-circular move");
        }
    }
}
```

##

```python3
# Function to check if the given set of moves is circular or not
def isCircularMove(s):

    # start from coordinates (0, 0)
    x = y = 0

    # assume that the initial direction is North
    dir = 'N'

    # read each instruction from the input string
    for c in s:
        # move one unit in the same direction
        if c == 'M':
            if dir == 'N': y = y + 1
            elif dir == 'S': y = y - 1
            elif dir == 'E': x = x + 1
            elif dir == 'W': x = x - 1

        # change direction to the left of the current direction
        if c == 'L':
            if dir == 'N': dir = 'W'
            elif dir == 'W': dir = 'S'
            elif dir == 'S': dir = 'E'
            elif dir == 'E': dir = 'N'

        # change direction to the right of the current direction
        if c == 'R':
            if dir == 'N': dir = 'E'
            elif dir == 'E': dir = 'S'
            elif dir == 'S': dir = 'W'
            elif dir == 'W': dir = 'N'

    # if we are back to starting coordinates (0, 0),
    # the move is circular
    return x == 0 and y == 0

if __name__ == '__main__':

    s = 'MMRMMRMMRMM'

    if isCircularMove(s):
        print('Circular move')
    else:
        print('Non-circular move')
```

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.39/5. Vote count: 171

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
