# Music Setup Instructions for Cyberpunk Portfolio

## Current Setup
The AudioManager component is already configured in `src/components/AudioManager.tsx` and plays ambient synthwave music automatically.

## How to Change the Music

### Option 1: Use a Different Free Music URL
Replace the audio URL in `src/components/AudioManager.tsx` at line 11:

```typescript
audioRef.current = new Audio('YOUR_MUSIC_URL_HERE');
```

**Free Music Sources:**
- Pixabay Audio: https://pixabay.com/music/
- Free Music Archive: https://freemusicarchive.org/
- YouTube Audio Library (download and host yourself)

### Option 2: Host Your Own Music File

1. **Add your music file to the public folder:**
   - Place your MP3/WAV file in `public/audio/background-music.mp3`

2. **Update AudioManager.tsx:**
   ```typescript
   audioRef.current = new Audio('/audio/background-music.mp3');
   ```

### Option 3: Multiple Track Playlist

To rotate between multiple tracks, modify the AudioManager component:

```typescript
const tracks = [
  '/audio/track1.mp3',
  '/audio/track2.mp3',
  '/audio/track3.mp3'
];
let currentTrack = 0;

audioRef.current = new Audio(tracks[currentTrack]);
audioRef.current.addEventListener('ended', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  audioRef.current = new Audio(tracks[currentTrack]);
  audioRef.current.play();
});
```

## Volume Control
Current volume is set to 0.3 (30%). To adjust:
- Line 13 in AudioManager.tsx: `audioRef.current.volume = 0.3;`
- Line 34 in AudioManager.tsx: `audioRef.current.volume = 0.3;`

Change `0.3` to any value between `0.0` (mute) and `1.0` (full volume).

## Recommended Cyberpunk Music Genres
- Synthwave
- Cyberpunk
- Dark Ambient
- Electronic Chillwave
- Industrial Electronic

## Copyright Notice
⚠️ Always ensure you have the rights to use any music on your website. Use royalty-free or Creative Commons licensed music.
