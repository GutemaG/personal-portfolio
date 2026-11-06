// Everything the /toolbelt page says about the app. Tile images are in public/images/toolbelt/tiles/.

export const links = {
  repo: "https://github.com/GutemaG/Toolbelt",
  download: "https://github.com/GutemaG/Toolbelt/releases/latest/download/Toolbelt.dmg",
  issues: "https://github.com/GutemaG/Toolbelt/issues",
};

export type Showcase = { id: string; name: string; title: string; text: string; points: string[] };

export const showcase: Showcase[] = [
  {
    id: "clipboard",
    name: "Clipboard",
    title: "Everything you copied, one search away",
    text: "Press ⌘⇧V to bring back text, links and images you copied earlier, and see which app each one came from.",
    points: ["Pin what you paste all the time", "Paste as plain text", "Search your whole history"],
  },
  {
    id: "quick-note",
    name: "Quick Note",
    title: "Write it down before you forget it",
    text: "Press ⌃⌥N in any app and start typing. There's nothing to name and nothing to save.",
    points: ["Saves as you type", "Keep as many notes as you need", "Undo a delete"],
  },
  {
    id: "calendar",
    name: "Calendar",
    title: "Your day, and a button to join the call",
    text: "See the month beside your events, with a heads-up before the next one starts.",
    points: ["Join calls in one click", "Colored dots for busy days", "Reads your existing calendars"],
  },
  {
    id: "network-speed",
    name: "Network Speed",
    title: "See what your connection is doing right now",
    text: "Live download and upload charts for the last minute, and a speed test when you ask for one.",
    points: ["Hover a chart for any moment", "Live speeds in the menu bar", "Uses Apple's own network test"],
  },
  {
    id: "pomodoro",
    name: "Pomodoro",
    title: "Focus now, and take the break too",
    text: "Type a length like 25 and start. Focus and breaks take turns, with the time left in your menu bar.",
    points: ["Start, skip and reset from the keyboard", "Tracks today's focus sessions", "Time left in the menu bar"],
  },
  {
    id: "now-playing",
    name: "Now Playing",
    title: "Change the song without changing apps",
    text: "See and control what's playing in Music or Spotify from wherever you are.",
    points: ["Works with Music and Spotify", "Album art and progress", "Play, pause and skip from the keyboard"],
  },
  {
    id: "windows",
    name: "Windows",
    title: "Put every window in its place",
    text: "Snap the front window to one of 11 positions, from a click or a shortcut you choose.",
    points: ["Halves, thirds and two-thirds", "Maximize or center", "Set a shortcut for each"],
  },
  {
    id: "toggles",
    name: "Toggles",
    title: "The switches you keep looking for",
    text: "Flip the system settings you use most, without opening System Settings.",
    points: ["Dark Mode and hidden files", "Hide your desktop icons", "Lock, sleep the display, empty the Trash"],
  },
  {
    id: "world-clock",
    name: "World Clock",
    title: "Find a time that works for everyone",
    text: "Slide through the day and see what time it is in every city, with a band that shows when they're working or asleep.",
    points: ["Time difference from your own clock", "Flags, day and night at a glance", "Pin any city to the menu bar"],
  },
];

export type Tool = { id: string; name: string; text: string };
export type ToolGroup = { title: string; tools: Tool[] };

export const toolGroups: ToolGroup[] = [
  {
    title: "Everyday",
    tools: [
      { id: "launcher", name: "Launcher", text: "Find and open apps, with your pinned apps on top" },
      { id: "clipboard", name: "Clipboard", text: "Search everything you copied and paste it again" },
      { id: "snippets", name: "Snippets", text: "Saved text you paste by keyword or search" },
      { id: "quick-note", name: "Quick Note", text: "Jot something down, saved as you type" },
      { id: "windows", name: "Windows", text: "Snap the front window to halves, thirds or full size" },
    ],
  },
  {
    title: "Capture",
    tools: [
      { id: "screenshots", name: "Screenshots", text: "Capture an area, a window or the whole screen" },
      { id: "recording", name: "Recording", text: "Record an area, a window or the screen to a movie" },
      { id: "colors", name: "Colors", text: "Pick any color on the screen and copy it" },
      { id: "camera", name: "Camera", text: "A live camera preview, like a mirror" },
    ],
  },
  {
    title: "Time",
    tools: [
      { id: "timer", name: "Timer", text: "Count down, with the time left in the menu bar" },
      { id: "pomodoro", name: "Pomodoro", text: "Focus and take breaks in turn" },
      { id: "calendar", name: "Calendar", text: "The month and your events, with a join button" },
      { id: "world-clock", name: "World Clock", text: "The time in other cities, with one in the menu bar" },
    ],
  },
  {
    title: "Sound",
    tools: [
      { id: "now-playing", name: "Now Playing", text: "See and control the song in Music or Spotify" },
      { id: "sound", name: "Sound", text: "Switch between speakers, headphones and AirPods" },
      { id: "mixer", name: "Volume Mixer", text: "Turn each app up, down or off on its own" },
    ],
  },
  {
    title: "Your Mac",
    tools: [
      { id: "toggles", name: "Toggles", text: "Dark Mode, desktop icons, hidden files, lock and more" },
      { id: "knock", name: "Knock", text: "Knock on your MacBook to play music, take a screenshot and more" },
      { id: "system", name: "System", text: "CPU, memory, temperature, fans and energy use" },
      { id: "info", name: "Info", text: "Battery health, storage, hardware and developer tools" },
      { id: "network-speed", name: "Network Speed", text: "Live upload and download speed, and a speed test" },
      { id: "keep-awake", name: "Keep Awake", text: "Stop the Mac from sleeping for a while" },
    ],
  },
];

export const shortcuts: { keys: string[]; action: string }[] = [
  { keys: ["⌥", "Space"], action: "Open Launcher" },
  { keys: ["⌘", "⇧", "V"], action: "Open Clipboard" },
  { keys: ["⌃", "⌥", "N"], action: "Open Quick Note" },
  { keys: ["⌃", "⌥", "S"], action: "Open Snippets" },
  { keys: ["⌃", "⇧", "4"], action: "Capture an area or window" },
  { keys: ["⌃", "⇧", "5"], action: "Start or stop recording" },
  { keys: ["⌃", "⇧", "2"], action: "Copy text from the screen" },
  { keys: ["⌃", "⇧", "C"], action: "Pick a color" },
];

export const buildCommand = `git clone https://github.com/GutemaG/Toolbelt.git
cd Toolbelt
./build.sh --open`;

export const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/Toolbelt.app";

export const faqs: { q: string; a: string }[] = [
  {
    q: "Is it really free?",
    a: "Yes. There's no price, no trial and no account. The source code is on GitHub under the MIT license.",
  },
  {
    q: "Why does macOS block it the first time?",
    a: "Toolbelt isn't signed with a paid Apple Developer certificate or notarized by Apple, so macOS can't confirm who made it. The steps above let you open it anyway. If you'd rather not, you can read the code and build it yourself.",
  },
  {
    q: "Which Macs does it run on?",
    a: "The download needs an Apple silicon Mac with macOS 26 or later. Intel Macs haven't been tested. Knock also needs a MacBook with a motion sensor: M2 or later, M1 Pro or M1 Max.",
  },
  {
    q: "Why does it ask for so many permissions?",
    a: "It only asks when a tool needs one. Accessibility lets it paste for you and move windows, and Screen Recording lets it take screenshots. You only grant what you use.",
  },
  {
    q: "Does it update itself?",
    a: "Not yet. To update, download the new version and replace the old app, or pull the latest code and run the build again.",
  },
  {
    q: "How do I remove it?",
    a: "Quit Toolbelt and delete the app. Your notes, clipboard history and other data are in ~/Library/Application Support/Toolbelt, so delete that folder too if you want them gone.",
  },
];
