# Short Answers

## 1. What is HTML?

HTML stands for "HyerText Markup Language." It is not a programming language, but the standard language used to create and structure content on the web.

## 2. What is block element? How is it diﬀerent from inline elements?

In HTML, block elements are elements that take up the full width, from left to right. You can only have one block element on each line/row of the page. For example, div tags, section tags, h1-h6 tags, footer tags, are all block elements. Their margins are affected by left, right, top and bottom. Inline elements are kind of like the opposite, they do not take up the full width from left to right of the page, but instead only take up their own width. You can have many inline elements on the same line/row of the page. Some of the most common inline tags I use are the span, button, input, and label tags. Inline elements are not affected by top and bottom margins. You can also turn any of these block or inline elements into inline blocks in which they behave like inline elements, but also keep some of their block characteristics.

## 3. What is the importance of the meta tag?

The metag tag defines the metadata. It provides information about character encoding (charset), viewport settings, author information, and the language. It is also important for SEO, as it provides information for web crawlers on how to index the page for search engines, such as the following code:

```html
<meta name="robots" content="noindex, nofollow">
```

## 4. What would happen if you clicked on a link created using `<a href=‘javascript:void(0)’ />`?

It would do nothing.

## 5. What is iframe?

The iframe tag allows you to show, or embed, another HTML document inside of an HTML document. We should remember to set the width and height if we use iframe, such as in the following code:

```html
<iframe src="https://www.another-html-document.com" width="500" height="500" title="Another HTML Document"></iframe>
```


## 6. What is CSS?

CSS stands for "Cascading Style Sheets." It is a stylesheet language used to
describe the way that HTML elements should be displayed on screen. So HTML would be resposible for the structure and content of a webpage, and CSS would be responsible for how it looks. We can create a separate CSS stylesheet, ending in .css, or we can insert CSS inside a style tag, placed inside the head tag. And finally, we can create in-line CSS by putting it directly in tags where it will have the highest priority.

## 7. How do you import CSS?

If CSS is created in a separate CSS file ending in .css, it must be imported. We import it by using the link tag which is placed in the head tag. Inside the link tag (a void tag, which is one without a closing tag), we use the rel and href attributes. It would look like the following line of code:

```html
<link rel="stylesheet" href="./index.css"/>
```

## 8. What are the diﬀerent types of CSS selectors?

There are simple selectors, combinator selectors, pseudo-class selectors, pseudo-element selectors, and attribute selectors. Simple selectors select using the tag name, class name, or ID name. It includes the universal "*" selector. Combinator selectors select elements through relationships such as direct child elements, descendent elements, or sibling elements.

## 9. What are the diﬀerent types of attribute selectors?

The attribute selectors apply styling to elements that have the selected attribute or attribute value. The different types of attribute selectors include selecting all attributes by a certain name, or attributes that have a value of a certain name, or attributes that have a value that starts with, ends with, or contains a certain name.

## 10. What is a pseudo-class?

Pseudo-classes are element selectors that defines a special state of an element. This includes effects such as hover and focus.


## 11. What is a pseudo-element?

Psuedo-elements are selectors that define a specific part of the selected elemented. They can be used to select the first letter or line of an element, select every even or odd child element of a parent element, or insert content before or after in an element. The following is an example of inserting "Hello:" before the name in a span tag:

```html
<span>Alan</span>
```

```css
span::before {
  content: "Hello: ";
}
```

We would get: "Hello: Alan"

## 12. What are two ways that we can make an element invisible? What is the diﬀerence?

One way to make an element invisible is to give it the "display: none" styling. The element is now invisible, and it does not take up space on the page. Elements under it or next to it will move up or move over and take its place. The second way to make an element invisible is to give it the "visibility: hidden" styling. The element is now invisible, but it still takes up space on the page. They will appear as an empty space, preventing other elements from going into its area.

## 13. What is SVG and why do we use it?

There is an HTML tag called `<svg>` that is used to define vector-based graphics, which can be zoomed or resized without losing quality. These can also be animated. SVG stands for "Scalable Vector Graphics" and is an XML-based file format. The following is an example of a circle in vector graphics:

```html
<svg width="100" height="100">
    <circle cx="50" cy="50" r="25" fill="#00B8B8" />
</svg>
```
