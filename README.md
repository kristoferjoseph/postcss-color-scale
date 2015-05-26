PostCSS Color Scale
===================

Plugin for generating color scales.

Install
-------
`npm install postcss-color-scale`

Use
---

### Standard use case

```css
:root {
  --cs-color: #007FFF;
  --cs-variance: 10;
}

body {
  color: cs(-2);
  background-color: cs(1);
}
```

### Advanced use case
You can define any name for your color as long as you prefix the custom property with `--cs-` it will be available as the second argument to the `cs()` function.

```css
:root {
  --cs-primary: #007FFF;
  --cs-secondary: #007FFF;
  --cs-accent: #007FFF;
  --cs-variance: 10;
}

body {
  color: cs(-2, primary);
  border-color: cs(3, accent);
  background-color: cs(1, secondary);
}
```
