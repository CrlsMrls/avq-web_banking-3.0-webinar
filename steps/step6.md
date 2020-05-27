# 6. Modify theme	

## Goal

* Understand how to apply Angular Material based theme to the application
* Learn how to modify the default theme

## Tasks

### 6.1 Extending Angular Material theme

Angular Material theme defines a palette of colors. Avaloq slightly extended this palette to fulfil our requirements.

In the [UI SDK documentation](https://docs.avaloq.com/ui-sdk/), we explain how to theme the application, a self made Banklet, or the new components we may create.

More importantly, in our documentation you can find how to create a new theme using palette generators like [Material design palette generator](http://mcg.mbitson.com/#!?mcgpalette0=%23f1567b).

### 6.2 Customize application theme

Go to the `app-palette.scss` file and modify the primary blue color.

Replace line number 8 to a green value:

```scss
  400: #00930c,
```

Check the main title of the application. 
Except for a few places, most of the colors remained unchanged: we need to change the whole palette. 

### 6.3 Apply an existing theme

Switch the theme to use a reddish look in `src\styles.scss`:

```scss
// Load palette
// @import 'app-palette';
@import 'app-palette-red';
```

## Definition of done
* The application has a different theme

## Prev step
* [Step 5. Internationalization (i18n)](./step5.md)
