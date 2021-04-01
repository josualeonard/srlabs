# Brief

## Features

1. Data is grouped by tabs
2. Each tab has bullet descriptions on what to show
3. Each tab has statistical bar chart and data that can be filtered and shorted
4. All data is taken via API call
5. For this app, data is simply stored on JSON

## Building Steps

1. Create basic page template & css
    * Define color theme (this app using mostly white, green, and red, for text it's using black and white)
    * Changing background color (gradient)
    * Add page container and elements
2. Add modular react element
    * Page container
    * Add tab content (just in case each tab is having different layout)
    * Add bullets container (left side on full page), description layout should be uniform
    * Add data and charting container (right side on full page), statistical data layout should be uniform
3. Add react interaction
    * Tab switching and data loading
    * Sorting:
        * Sort by title
        * Sort by score
    * Filtering
        * Filter by dropdown
        * Filter by textarea with type number step up/down
    * Chart loading, and state update

## Difficulties

The only difficulties I experience is when trying to make the fontawesome icon works, because from the base project font awesome wasn't working. I thought it's should be able to use without any changes.
I solved them by changing path to font from:
```
$fa-font-path: '/font';
```
to
```
$fa-font-path: '~@fortawesome/fontawesome-free/webfonts';
```

### Obstacles I find in the challenge

That fontawesome issue and learn a bit about chartist.

### Approach to solve the problem and the reason to use the approach

I have some kind of path in my mind to clear up the challenge, such as:
* Finish up the page structure first (base page layout without any interaction)
* Adding more details like responsiveness and detailed styling
* Adding interaction and actions: tab data loading, sorting, filtering, and applying bar chart

The reason I'm using this approach is because it's easiest to see the big picture of what I'm going to create since I had the frame to the app.

### If you were given additional time, what will be the next step?

I was finishing this app up when I'm working with the filtering and sorting. Tab clicking not working yet, but the data already pulled and applied to the component.

If I were given more time, I will be able to clear up tab clicking and loading data, sorting and filtering, up to bar chart and finishing touch like adding loading process and cross browser support.
