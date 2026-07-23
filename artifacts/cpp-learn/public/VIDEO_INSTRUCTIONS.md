# Video Background Instructions

## How to Add Your Video Background

1. **Get your video file**:
   - Download the coding video from Pinterest or any source
   - Recommended format: MP4
   - Recommended resolution: 1920x1080 or higher
   - Keep file size under 10MB for faster loading

2. **Add the video to this folder**:
   - Place your video file in: `public/coding-background.mp4`
   - Or use a different name and update the dashboard.tsx file

3. **If using a different filename**:
   - Open: `src/pages/dashboard.tsx`
   - Find the line: `<source src="/coding-background.mp4" type="video/mp4" />`
   - Replace `coding-background.mp4` with your filename

4. **Alternative: Use a video URL**:
   - If hosting the video elsewhere (YouTube, Vimeo, CDN)
   - Replace the entire `<video>` tag with an iframe or update the src

## Current Setup

The homepage now has a full-screen video hero section with:
- **Video background** with opacity overlay
- **Animated gradient** as fallback if video doesn't load
- **Text overlay**: "Master C++ with uPhumeh"
- **Call-to-action buttons**: Continue Learning / Try Playground
- **Progress indicators**: Streak, completed lessons, level
- **Responsive design**: Works on mobile and desktop

## Tips

- Use a short looping video (5-15 seconds)
- Videos with code typing or terminal animations work great
- Compress your video to reduce file size
- Test on different devices for performance

## Fallback

If no video is provided, an animated gradient background will show instead, so the page still looks great!
