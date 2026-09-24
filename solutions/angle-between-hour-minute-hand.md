# Clock Angle Problem

> Source: https://www.techiedelight.com/angle-between-hour-minute-hand/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Clock Angle Problem: Given time in `hh:mm` format in 24-hour notation, calculate the shorter angle between the hour and minute hand in an analog clock.

For example,

**Input:** 5:30 **Output:** 15° **Input:** 21:00 **Output:** 90° **Input:** 12:00 **Output:** 0° _Please note that hh:60 should be considered as (hh+1):0_

> 

The idea is to consider the rate of change of the angle in degrees per minute. The hour hand of a 12–hour analog clock turns `360°` in 12 hours, and the minute hand rotates through `360°` in 60 minutes. So, we can calculate the angle in degrees of the hour hand minute hand separately and return their difference using the following formula:

Degree(hh) = H×(360/12) + (M×360)/(12×60) Degree(mm) = M×(360/60)

Here, `H` is the hour, and `M` is the minutes past the hour. The angle should be in degrees and measured clockwise from the 12 o’clock position of the clock. If the angle is greater than `180°`, take its difference with 360.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
using namespace std;

// Function to compute the angle between the hour and minute hand
int findAngle(int hh, int mm)
{
    // handle 24-hour notation
    hh = hh % 12;

    // find the position of the hour's hand
    int h = (hh * 360) / 12 + (mm * 360) / (12 * 60);

    // find the position of the minute's hand
    int m = (mm * 360) / (60);

    // calculate the angle difference
    int angle = abs(h - m);

    // consider the shorter angle and return it
    if (angle > 180) {
        angle = 360 - angle;
    }

    return angle;
}

// Clock Angle Problem
int main()
{
    int hh = 5;
    int mm = 30;

    cout << findAngle(hh, mm);

    return 0;
}
```

**Output:** 15

##

```java
class Main
{
    // Function to compute the angle between the hour and minute hand
    public static int findAngle(int hh, int mm)
    {
        // handle 24-hour notation
        hh = hh % 12;

        // find the position of the hour's hand
        int h = (hh * 360) / 12 + (mm * 360) / (12 * 60);

        // find the position of the minute's hand
        int m = (mm * 360) / (60);

        // calculate the angle difference
        int angle = Math.abs(h - m);

        // consider the shorter angle and return it
        if (angle > 180) {
            angle = 360 - angle;
        }

        return angle;
    }

    // Clock Angle Problem
    public static void main(String[] args)
    {
        int hh = 5;
        int mm = 30;

        System.out.println(findAngle(hh, mm));
    }
}
```

##

```python3
# Function to compute the angle between the hour and minute hand
def findAngle(hh, mm):

    # handle 24-hour notation
    hh = hh % 12

    # find the position of the hour's hand
    h = (hh * 360) // 12 + (mm * 360) // (12 * 60)

    # find the position of the minute's hand
    m = (mm * 360) // (60)

    # calculate the angle difference
    angle = abs(h - m)

    # consider the shorter angle and return it
    if angle > 180:
        angle = 360 - angle

    return angle

# Clock Angle Problem
if __name__ == '__main__':

    hh = 5
    mm = 30

    print(findAngle(hh, mm))
```

**References:** [Clock Angle Problem – Wikipedia](https://en.wikipedia.org/wiki/Clock_angle_problem)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 211

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
