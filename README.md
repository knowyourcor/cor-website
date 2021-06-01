# [COR Website](https://thecor.com/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Publishing changes

All development should be done within the `dev` branch. Once updates are committed to `dev`, deployed and verified on [Dev](https://cor-website-dev.vercel.app/) you can do a pull request into the Main branch. Performing a pull request into the Main branch will deploy changes from dev to the live site.

- Dev: https://cor-website-dev.vercel.app/
- Live: https://cor-website.vercel.app/ or https://thecor.com

The dev and live sites are hosted and managed on [Vercel](https://vercel.com/knowyourcor).

## Project structure

- **/lib** - helpers, hooks, contexts, API calls
- **/pages** - the pages of the website including wrappers for document, app and errors
- **/public** - all static assets like images, videos, sounds, etc. on `yarn build` these files get moved to the root
- **/styles** - global and page level SCSS styles
- **/components** - all site components named accordingly

## Responsive images

All images should be managed through Prismic so they're processed and optimized by Imgix.com.

## Additional notes

- Component level [CSS modules](https://github.com/css-modules/css-modules) are used which has built-in support through [Next.js](https://nextjs.org/docs/basic-features/built-in-css-support)
- [SCSS](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support) flavor of SASS is used

## Package dependencies

- [@apollo/client](https://www.npmjs.com/package/@apollo/client) - Apollo GraphQL client used for dynamic loading blog posts
- [@prismicio/client](https://www.npmjs.com/package/@prismicio/client) - Standard Prismic client
- [@react-hook/debounce](https://www.npmjs.com/package/@react-hook/debounce) - Simple debounce hook
- [apollo-link-prismic](https://www.npmjs.com/package/apollo-link-prismic) - Allow use to query the Prismic GraphQL API with apollo-client
- [focus-visible](https://www.npmjs.com/package/focus-visible) - only show focus outline when navigating the site using a keyboard
- [framer-motion](https://www.npmjs.com/package/framer-motion) - UI animations
- [graphql](https://www.npmjs.com/package/graphql) - Standard GraphQL
- [graphql-tag](https://www.npmjs.com/package/graphql-tag) - Standard GraphQL
- [mixpanel-browser](https://www.npmjs.com/package/mixpanel-browser) - Mixpanel JavaScript Library
- [next](https://www.npmjs.com/package/next) - Standard Next.js
- [prismic-reactjs](https://www.npmjs.com/package/prismic-reactjs) - Prismic React helpers
- [react](https://www.npmjs.com/package/react) - Standard React
- [react-dom](https://www.npmjs.com/package/react-dom) - Standard React DOM
- [react-focus-on](https://www.npmjs.com/package/react-focus-on) - Used for A11Y modals and full-screen tasks
- [react-gtm-module](https://www.npmjs.com/package/react-gtm-module) - React based Google Tag Manager
- [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer) - React implementation of the Intersection Observer API
- [react-mailchimp-subscribe](https://www.npmjs.com/package/react-mailchimp-subscribe) - React subscribe form for Mailchimp
- [react-pdf](https://www.npmjs.com/package/react-pdf) - Allows us to embed PDFs into a React component
- [react-swipeable](https://www.npmjs.com/package/react-swipeable) - React swipe event handler hook
- [react-typeform-embed](https://www.npmjs.com/package/react-typeform-embed) - Allows us to embed Typeform into a React component
- [sass](https://www.npmjs.com/package/sass) - Allows use of SASS/SCSS
- [slugify](https://www.npmjs.com/package/slugify) - Turns a string into a slug
- [swiper](https://www.npmjs.com/package/swiper) - A React based carousel

## @Media Breakpoints

**Breakpoints**

```
$xs: 32rem; // ~512px
$sm: 48rem; // ~768px
$md: 64rem; // ~1024px
$lg: 80rem; // ~1280px
$xl: 90rem; // ~1440px
$xxl: 105rem // ~1680px
```

**@Import**

Import `_variables.scss` into the SCSS file. Update path based on location of SCSS file.

```
@import "styles/_variables.scss";
```

**Usage**

Using a mobile-first approach set min-width to the desired breakpoint using a SASS variable.

Basic example

```
@media (min-width: $sm) {
  /* styles go here */
}
```

Standard example

```
.container {
  padding: 0 1rem; /* mobile/base styles */

   @media (min-width: $sm) {
     padding: 0 1rem; /* small and up breakpoint */
   }

   @media (min-width: $md) {
     padding: 0 3rem; /* medium and up breakpoint */
   }

   @media (min-width: $xl) {
     padding: 0 5rem; /* xlarge and up breakpoint */
   }
}
```
