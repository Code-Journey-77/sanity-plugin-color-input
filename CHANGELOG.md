# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-06-25

### Added

- Added `disablePresets` and `disableCopyValues` plugin configuration options to hide the presets and copy values UI sections globally or per-field.
- Documented new configuration options in README.md.
- Added comprehensive Vitest tests for the new `resolveOption` utility.

### Changed

- Improved NPM package SEO with optimized description and expanded keywords based on official plugin standards.
- Updated project license to standard MIT License.

## [1.2.1] - 2026-06-24

### Fixed

- Fixed visual bug with active preset color selection highlighting.
- Modularized `ColorInput` component into smaller subcomponents (`Presets`, `Preview`, `ValueOutputs`) for better maintainability.
- Enforced strict type safety across components.
- Fixed and updated Vitest test cases to support modularized components.
- Updated GitHub Actions CI workflow.

## [1.2.0] - 2026-06-20

### Added

- Feature: Added full gradient support (`linear-gradient`) alongside solid colors.
- Added new utility functions for color conversion (`hexToHsl`, `hexToRgba`, etc.).
- Added new curated color presets including gradient examples.

### Changed

- Chore: Rebranded package to `sanity-plugin-color-input` for public NPM release.

## [1.1.0] - 2026-05-15

### Changed

- Docs: Updated compatibility to officially support Sanity Studio v3, v4, and v5.
- Fix: Updated Sanity peer dependencies to include v5.
- Cleanup unused configuration files.

## [1.0.0] - 2026-02-28

### Added

- Initial release of the `sanity-color-picker` plugin for Sanity Studio v3.
- Visual dynamic color picker input replacing the standard input field.
- Returns comprehensive structural object containing `hex`, `rgba`, and `hsl` keys smoothly.
- Beautiful UI built tightly using `@sanity/ui` for a native integrated feel.
- One-click 'copy to clipboard' utilities built-in for all color formats.
- Complete support for Custom Preset overrides through the `options.colors` field property.
- Included 20 Material Design default colors out of the box.
- Built-in dynamic text accessibility color contrast calculator to properly display picker overlay text.
