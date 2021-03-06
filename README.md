# drawerfront
<h1>Drawer Front Calculator</h1>

Calculates and draws drawer front heights based on basic inputs and several equations. Useful for comparing layouts to find the most pleasing sizing. Web app can be viewed at https://dcreith.github.io/drawerfront/.

Values output assume inches and show to the nearest 1/16th. If you want to calculate in metric then use the decimal output and ignore the values in parenthesis.

<h2>Calculations</h2>

<h3>Hambridge</h3>
The bottom drawer has a height of [(square root of 2) – 1] times the drawer width.
The second drawer from the bottom has a height of [(square root of 3) – (square root of 2)] times drawer width.
The nth drawer has a height of [(square root of n+1) – (square root of n)] times drawer width.

<h3>Geometric</h3>
Each drawer height calulated as a percentage (ratio) of the previous drawer starting with the bottom drawer.

<h3>Fibonacci/Phi</h3>
Each set of two drawers calculated as 1.618 based on the lower drawer (includes rails).

<h3>Arithmetic</h3>
Each drawer height is reduced by a fixed amount from the lower drawer.

<h3>Manual</h3>
Enter each drawer height individually.

<h3>Manual/Diff</h3>

Enter the difference between each drawer, empty values are ignored.

<h2>Scaling</h2>

Image will scale to fit the space. To rescale clear the drawing and reselect the calculation method.

<hr/>

<h2>Screen</h2>



<img src="screen_1.png"/>
