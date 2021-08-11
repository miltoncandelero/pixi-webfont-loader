# Changelog

# 1.0.0
- Removed the FontFaceObserver dependency.
- Changed tooling from Microbundle to Rollup.
- Updated a lot of devDependencies
- Added support for `ttf`, `otf`, `woff`, and `woff2` files.

# 0.2.2
- Support for `com/css` extension for google fonts. (Thanks Sergaks [#1](https://github.com/miltoncandelero/pixi-webfont-loader/pull/1))

# 0.2.1
- Misconfigured `standard-version` bumped the version number.

# 0.2.0
- Changed `peerDependency` from `pixi.js` to `@pixi/loaders`. Improves compatibility with all projects.
- Added a iife version for browser direct usage.
    - The iife version lives in `PIXI.WebfontLoaderPlugin`.
    - The iife version bundles `FontFaceObserver` so you don't need to link it manually.
    - Updated example to use this version instead of umd.
- Exposed `FontFaceObserver` in `WebfontLoaderPlugin.FontFaceObserver`. No reason not to, we need it but we can share it ♥.

# 0.1.0
- Initial release