# Performance & Accessibility Audit

URL: https://mahmoud-elzayat-capstone-ai-enhance.vercel.app

## Lighthouse - Mobile

- Performance: 100
- Accessibility: 100
- Best Practices: 96
- SEO: 100

## Lighthouse - Desktop

- Performance: 100
- Accessibility: 100
- Best Practices: 96
- SEO: 100

## axe / WAVE

Tool: axe-core CLI 4.13.0

Result: 0 violations found on the production homepage. The tool notes that automated testing does not detect every accessibility issue, so manual review remains useful.

## Concrete audit-driven improvement

### Finding

The initial Lighthouse and axe contrast audit found insufficient contrast on the CTA background/text pair (2.96:1) and project screenshot placeholder text (3.86:1). The required ratio for the tested normal text was 4.5:1.

### Fix

Updated CTA backgrounds from `#7785FF` to `#4F5FCF`, updated screenshot placeholder text from `#67758A` to `#7F8DA1`, and changed accent labels from `#4F5FCF` to `#AAB2FF` in the existing page and component styles.

### Result

After redeploying, Lighthouse reported Accessibility 100 on both mobile and desktop, and axe reported 0 violations.

The production page also had no horizontal overflow at a 375px viewport: document client width and scroll width were both 360px.
