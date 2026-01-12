# EduSeek Logo Files

This directory contains the EduSeek logo files.

## Logo Files

1. **eduseek_logo.png**
   - ES monogram icon
   - Used in: Favicon, app icons, small branding elements
   - Recommended size: 32x32px minimum (square)

2. **eduseek_text.png**
   - Wordmark only (text "EduSeek")
   - Used in: Navigation bar, footer, smaller branding areas
   - Recommended size: 120x24px minimum

3. **eduseek_light.jpg**
   - Full logo optimized for light backgrounds
   - Used in: Authentication pages, light-themed areas
   - Recommended size: 200x60px minimum

4. **eduseek_dark.jpg**
   - Full logo optimized for dark backgrounds
   - Used in: Dark-themed areas, email headers with dark backgrounds
   - Recommended size: 200x60px minimum

## Usage

The Logo component (`components/ui/Logo.tsx`) automatically selects the appropriate logo:
- `variant="icon"` → eduseek_logo.png
- `variant="wordmark"` → eduseek_text.png
- `variant="full"` → eduseek_light.jpg or eduseek_dark.jpg (based on theme prop)

## File Locations

All logo files are located in `/public/logo/` and are accessible via:
- `/logo/eduseek_logo.png`
- `/logo/eduseek_text.png`
- `/logo/eduseek_light.jpg`
- `/logo/eduseek_dark.jpg`
