/*
 * MMM-ClickToNavigate Configuration Examples
 *
 * Copy the examples below into your config/config.js file
 * and modify them to suit your needs.
 */

// ============================================
// BASIC EXAMPLE
// ============================================

{
  module: "MMM-pages",
  config: {
    modules: [
      ["clock", "weather"],  // Page 0
      ["weatherforecast"]    // Page 1
    ],
    fixed: ["MMM-ClickToNavigate"]
  }
},
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "weather": 1  // Click weather → go to page 1
    }
  }
}

// ============================================
// MULTI-PAGE NAVIGATION
// ============================================

{
  module: "MMM-pages",
  config: {
    modules: [
      // Page 0 - Home
      ["clock", "weather", "calendar", "compliments"],

      // Page 1 - Weather Details
      ["weatherforecast", "MMM-WeatherChart"],

      // Page 2 - Calendar Details
      ["calendar", "MMM-CalendarExt3"],

      // Page 3 - News
      ["newsfeed"]
    ],
    fixed: ["MMM-page-indicator", "MMM-ClickToNavigate"]
  }
},
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      // Click weather on home → Weather details page
      "weather": 1,
      "currentweather": 1,

      // Click clock → Return to home
      "clock": 0,

      // Click calendar → Calendar details page
      "calendar": 2,

      // Click compliments → Return to home
      "compliments": 0,

      // Click forecast → Stay on weather page
      "weatherforecast": 1,

      // Click news → News page
      "newsfeed": 3
    },
    debug: false
  }
}

// ============================================
// WITH DEBUG MODE (for troubleshooting)
// ============================================

{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "weather": 1,
      "clock": 2
    },
    debug: true  // ← Enable logging to browser console
  }
}

// Check browser console (F12) for messages like:
// [MMM-ClickToNavigate] Found 1 elements for class: weather
// [MMM-ClickToNavigate] Clicked on weather, navigating to page 1

// ============================================
// SMART HOME DASHBOARD
// ============================================

{
  module: "MMM-pages",
  config: {
    modules: [
      // Page 0 - Overview
      ["clock", "MMM-Temperature", "MMM-Lights-Status"],

      // Page 1 - Climate Control
      ["MMM-Temperature", "MMM-Thermostat", "MMM-HumidityChart"],

      // Page 2 - Lighting
      ["MMM-SmartTouch", "MMM-Lights-Status"],

      // Page 3 - Security
      ["MMM-SecurityCamera", "MMM-DoorSensors"]
    ],
    fixed: ["MMM-page-indicator", "MMM-ClickToNavigate"]
  }
},
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "MMM-Temperature": 1,        // Temperature → Climate page
      "MMM-Lights-Status": 2,      // Lights → Lighting page
      "MMM-SecurityCamera": 3,     // Camera → Security page
      "clock": 0                    // Clock → Home
    }
  }
}

// ============================================
// MEDIA CENTER
// ============================================

{
  module: "MMM-pages",
  config: {
    modules: [
      // Page 0 - Main Menu
      ["clock", "MMM-NowPlayingOnSpotify", "MMM-LaunchBrowser"],

      // Page 1 - Music
      ["MMM-NowPlayingOnSpotify", "MMM-Spotify"],

      // Page 2 - Videos
      ["MMM-YouTube", "MMM-PiDeck"],

      // Page 3 - Photos
      ["MMM-GooglePhotos"]
    ],
    fixed: ["MMM-page-indicator", "MMM-ClickToNavigate"]
  }
},
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "MMM-NowPlayingOnSpotify": 1,  // Album art → Music page
      "MMM-YouTube": 2,               // Video → Videos page
      "MMM-GooglePhotos": 3,          // Photos → Photos page
      "clock": 0                      // Clock → Main menu
    }
  }
}

// ============================================
// FINDING CSS CLASSES
// ============================================

// Method 1: Right-click module → Inspect → Look for class names
// Method 2: Check module documentation
// Method 3: Common classes:

/*
Default Modules:
- clock: "clock"
- weather: "weather" or "currentweather"
- calendar: "calendar"
- weatherforecast: "weatherforecast"
- newsfeed: "newsfeed"
- compliments: "compliments"

Custom Modules:
- Usually the module name (MMM-ModuleName)
- Check the module's .css file or documentation
*/

// ============================================
// KITCHEN SINK (All Options)
// ============================================

{
  module: "MMM-ClickToNavigate",
  config: {
    // Map CSS classes to page numbers
    mappings: {
      "weather": 1,
      "weatherforecast": 1,
      "currentweather": 1,
      "clock": 0,
      "calendar": 2,
      "MMM-Timer": 3,
      "MMM-CustomModule": 4
    },

    // Enable debug logging (default: false)
    debug: true
  }
}

// ============================================
// TOUCHSCREEN KIOSK EXAMPLE
// ============================================

{
  module: "MMM-pages",
  config: {
    modules: [
      // Page 0 - Home/Menu
      [
        "clock",
        "MMM-LaunchBrowser", // YouTube launcher
        "MMM-LaunchBrowser", // Netflix launcher
        "MMM-LaunchBrowser", // Gmail launcher
        "weather"
      ],

      // Page 1 - Weather
      ["weather", "weatherforecast", "MMM-WeatherChart"],

      // Page 2 - Timer/Clock
      ["clock", "MMM-Timer"]
    ],
    fixed: [
      "MMM-page-indicator",
      "MMM-ClickToNavigate",
      "MMM-TouchSwipe"  // Swipe to navigate
    ],
    rotationTime: 0  // Manual navigation only
  }
},
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "weather": 1,     // Tap weather → Weather page
      "clock": 2        // Tap clock → Timer page
    }
  }
}

// ============================================
// COMBINING WITH OTHER NAVIGATION
// ============================================

// Use with:
// - MMM-TouchSwipe (swipe left/right)
// - MMM-page-indicator (visual page indicator)
// - MMM-Gestures (gesture navigation)
// - Remote control modules

{
  module: "MMM-pages",
  config: {
    modules: [
      ["clock", "weather", "calendar"],
      ["weatherforecast"],
      ["MMM-Timer"]
    ],
    fixed: [
      "MMM-page-indicator",    // See which page you're on
      "MMM-ClickToNavigate",   // Click to navigate
      "MMM-TouchSwipe"         // Swipe to navigate
    ]
  }
},
{
  module: "MMM-TouchSwipe",
  config: {
    // Swipe or click to navigate
  }
},
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "weather": 1,
      "clock": 2
    }
  }
}
