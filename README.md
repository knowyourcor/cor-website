# [COR Website](https://thecor.com/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

- [body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock) - prevents scroll when main menu is open
- [focus-visible](https://www.npmjs.com/package/focus-visible) - only show focus outline when navigating the site using a keyboard
- [framer-motion](https://www.npmjs.com/package/framer-motion) - UI animations
- [keen-slider](https://www.npmjs.com/package/keen-slider) - slider/carousel
- [next](https://www.npmjs.com/package/next) - primary website framework
- [prismic-javascript](https://www.npmjs.com/package/prismic-javascript) - required Prismic javascript utilities
- [prismic-reactjs](https://www.npmjs.com/package/prismic-reactjs) - required Prismic React package
- [react](https://www.npmjs.com/package/react) - standard React
- [react-dom](https://www.npmjs.com/package/react-dom) - standard React DOM
- [react-focus-lock](https://www.npmjs.com/package/react-focus-lock) - a11y traps focus - used within main menu
- [react-mailchimp-subscribe](https://www.npmjs.com/package/react-mailchimp-subscribe) - handle MailChimp integration
- [sass](https://www.npmjs.com/package/sass) - allows use of SASS/SCSS
