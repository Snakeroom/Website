# Website

This repository contains the source code for [snakeroom.org](https://snakeroom.org).

## Contributing

To set up your local development environment:

```bash
git clone git@github.com:Snakeroom/Website.git
npm install
npm run dev
# http://localhost:3000
```

We follow [Chris Beams' git commit style guide](https://chris.beams.io/posts/git-commit).

We use Prettier and ESLint to enforce code style. Make sure to run `npm run lint` before commit to lint and autofix your changes. (or install the respective editor plugins for lint/format-on-save)

If your PR contains significant code changes (e.g. not just fixing a typo), add your name to the `LICENSE` file.

## Production

The repo is automatically deployed to Netlify upon commit to `master`.
