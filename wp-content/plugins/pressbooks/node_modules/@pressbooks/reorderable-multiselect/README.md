# \<pressbooks-reorderable-multiselect>

[![Latest version](https://badgen.net/npm/v/@pressbooks/reorderable-multiselect)](https://npmjs.com/package/@pressbooks/reorderable-multiselect) [![MIT license](https://badgen.net/npm/license/@pressbooks/reorderable-multiselect)](https://github.com/pressbooks/reorderable-multiselect/tree/main/LICENSE) 

A web component which allows users to select multiple items from a list and customize the order in which they appear, built with [Lit](https://lit.dev). This web
component follows the [open-wc](https://github.com/open-wc/open-wc) recommendations.

It is largely based on the [ARIA Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) pattern.

## Installation

```bash
npm i @pressbooks/reorderable-multiselect
```

## Usage

TODO.

### Styling

Because this web component uses the Shadow Dom, styling is limited to modification via CSS custom properties. However,
there are plenty to choose from.

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## Publishing to NPM

As this is a scoped package it must be published by someone within the Pressbooks NPM organization and must use the `--access public` flag:

```bash
npm publish --access public
```
