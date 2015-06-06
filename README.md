PostCSS Color Scale
===================

Plugin for generating color scales.

Install
-------
`npm install postcss-color-scale`

Use
---

From the command line:
```
post-css --use postcss-color-scale styles.css -o styles.out.css
```
This can be used with [postcss-cli](https://github.com/code42day/postcss-cli) in a [npm run script](https://docs.npmjs.com/cli/run-script).
[Great example post](http://substack.net/task_automation_with_npm_run)

### Standard use case

#### Input

```css
:root {
  --cs-color: blue;
  --cs-variance: 20;
}

body {
  background-color: cs(-1);
}
```

#### Output

```css
:root {
  --cs-color: blue;
  --cs-variance: 20;
}

body {
  background-color: #0000CC;
}
```

### Advanced use case
You can define any name for your color as long as you prefix the custom property with `--cs-` it will be available as the second argument to the `cs()` function.

#### Input

```css
:root {
  --cs-primary: blue;
  --cs-secondary: red;
  --cs-tertiary: green;
  --cs-variance: 20;
}

body {
  color: cs(-1, primary);
  background-color: cs(1, secondary);
  border-color: cs(2, tertiary);
}
```

#### Output

```css
:root {
  --cs-primary: blue;
  --cs-secondary: red;
  --cs-tertiary: green;
  --cs-variance: 20;
}

body {
  color: #0000CC;
  background-color: #FF3333;
  border-color: #66E666;
}
```

## How it works

The way the scale works is you supply a color and a variance ( meaning __the difference between steps__ ) then use the `cs()` function in your stylesheet to get a step of color from the scale.
Positive numbers go up the scale giving you a lighter color while negative numbers go down the scale giving you a darker color; where zero is the base color.
`cs(0)` will give you the base color. `cs(1)` will give you a lighter color and `cs(-1)` will give you a darker color.

