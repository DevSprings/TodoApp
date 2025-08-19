# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- Drag and drop to reorder items on the list

### Screenshot

![](./screenshots/Screenshot%202025-08-18%20at%2016-08-27%20Frontend%20Mentor%20Todo%20app.png)
![](./screenshots/Screenshot%202025-08-18%20at%2016-06-43%20Frontend%20Mentor%20Todo%20app.png)
![](./screenshots/Screenshot%202025-08-18%20at%2016-05-59%20Frontend%20Mentor%20Todo%20app.png)
![](./screenshots/Screenshot%202025-08-18%20at%2016-06-17%20Frontend%20Mentor%20Todo%20app.png)


### Links

- Solution URL: [Add solution URL here](https://www.frontendmentor.io/solutions/todo-app-responsiveness-css-gridflex-intrinsic-design-bem-naming-tDww1jWJYl)
- Live Site URL: [Add live site URL here](https://todomainapp7.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- BEM naming convention
- Flexbox
- CSS Grid
- Mobile-first workflow


### What I learned

- Handling the theme, theme-icon and background simultaneously.

```js
// Theme icon handlers.

themeIcon.addEventListener('click', () => {
  if (themeIcon.id === 'moon') {
    themeIcon.src = '/images/icon-sun.svg'
    themeIcon.id = 'sun';
    body.className = 'dark-theme';
    if (window.innerWidth > 600) {
      body.style.backgroundImage = 'url(/images/bg-desktop-dark.jpg)';
    } else {
      body.style.backgroundImage = 'url(/images/bg-mobile-dark.jpg)';
    }
  } else {
    themeIcon.src = '/images/icon-moon.svg'
    themeIcon.id = 'moon';
    body.className = 'light-theme';

    if (window.innerWidth > 600) {
      body.style.backgroundImage = 'url(/images/bg-desktop-light.jpg)';
    } else {
      body.style.backgroundImage = 'url(/images/bg-mobile-light.jpg)';
    }
  }
})
```
- Gradient circular border on hover.

```js
 completeIcon.addEventListener('mouseover', () => {
    if (!completeIcon.hasChildNodes()) {
      completeIcon.style.border = '2px solid transparent';
      completeIcon.style.background = 'linear-gradient(var(--input-bg), var(--input-bg)) padding-box, linear-gradient(45deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%)) border-box';
      completeIcon.style.borderRadius = '100%';
    }
  }
  )

  completeIcon.addEventListener('mouseout', () => {
    if (!completeIcon.hasChildNodes()) {
      completeIcon.style.border = '1px solid var(--button-border)';
      completeIcon.style.background = 'none';
      completeIcon.style.borderRadius = '100%';
    }
  }
  )
```
- Handling the scrolling of the task list.
```css
.tasks__list {
    margin-top: 1rem;
    margin-bottom: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    background: var(--tasks-list-bg);
    padding-inline: 0;
    min-height: 43vh;
    box-shadow: var(--task-shadow);


    @media (height > 43vh) {
        max-height: 43vh;
        overflow: scroll;
        overflow-x: hidden;
        overflow-y: auto;
        scrollbar-width: none;
        /* Firefox */
        -ms-overflow-style: none;

        /* IE and Edge */
        &::-webkit-scrollbar {
            display: none;
        }
    }

}
```
- Using grid-template-areas to handle the buttom part of the list.

```css
.tasks__records {
    display: grid;
    grid-template-areas:
        'one three three'
        'four four four';
    color: var(--record-text);

    @media (width>600px) {
        grid-template-areas:
            'one two three'
            'four four four';
    }

}

.grider:nth-child(1) {
    grid-area: one;
}

.grider:nth-child(2) {
    grid-area: three;
}


.grider:nth-child(3) {
    grid-area: four;
}

@media (width>600px) {

    .grider:nth-child(3) {
        grid-area: two;
    }

    .grider:nth-child(2) {
        grid-area: three;
    }
}
```

### Continued development

- DOM
- Styling patterns/Methodology e.g CUBE CSS


### Useful resources

- AI - This helped me for sortimg the list, some debuggings. 
- [Web Dev Simplified](https://www.example.com) - This is an amazing video which helped me finally understand how the sorting works even Ai probably use its repo to generate the code. I'd recommend it to anyone still learning this concept.


## Author

- Website - [DevSpringz](https://github.com/DevSprings/)
- Frontend Mentor - [@DevSprings](https://www.frontendmentor.io/profile/DevSprings)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

## Acknowledgments

- All Youtube videos and AI.
