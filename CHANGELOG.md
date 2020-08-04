# Changelog

# 0.2.1
- Missconfigured `standard-version` bumped the version number.

# 0.2.0
- Changed `peerDependency` from `pixi.js` to `@pixi/loaders`. Improves compatibility with all projects.
- Added a iife version for browser direct usage.
    - The iife version lives in `PIXI.WebfontLoaderPlugin`.
    - The iife version bundles `FontFaceObserver` so you dont need to link it manually.
    - Updated example to use this version instead of umd.
- Exposed `FontFaceObserver` in `WebfontLoaderPlugin.FontFaceObserver`. No reason not to, we need it but we can share it ♥.

# 0.1.0
- Initial release