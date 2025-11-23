# MMM-ClickToNavigate

A MagicMirror² module that enables click-to-navigate functionality for page navigation. Click on any module (clock, weather, calendar, etc.) to jump to a specific page.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-MagicMirror²-informational)

## Features

- **Click any module** to navigate to a specific page
- **CSS class-based mapping** - Map any module to any page
- **Works with MMM-pages** - Integrates seamlessly with the pages module
- **Debug mode** - Built-in logging for troubleshooting
- **Auto-reattachment** - Handlers persist across DOM updates
- **Zero visual footprint** - Completely invisible module

## How It Works

MMM-ClickToNavigate monitors the DOM for elements with specific CSS classes and adds click handlers that send navigation notifications to MMM-pages.

For example:
- Click the **weather module** → Navigate to Weather page
- Click the **clock module** → Navigate to Timer page
- Click **any module** you map → Navigate anywhere

## Prerequisites

This module requires [MMM-pages](https://github.com/edward-shen/MMM-pages) to be installed and configured.

```bash
cd ~/MagicMirror/modules
git clone https://github.com/edward-shen/MMM-pages.git
cd MMM-pages
npm install
```

## Installation

### Step 1: Clone the Repository

```bash
cd ~/MagicMirror/modules
git clone https://github.com/YOUR-USERNAME/MMM-ClickToNavigate.git
```

### Step 2: Install Dependencies

This module uses only built-in modules - no additional dependencies required!

## Configuration

Add the module to your `config/config.js` file:

### Basic Example

```javascript
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "weather_current": 1,  // Click weather → go to page 1
      "clock": 2             // Click clock → go to page 2
    }
  }
}
```

### Complete Example with MMM-pages

```javascript
{
  module: "MMM-pages",
  config: {
    modules: [
      ["clock", "weather", "calendar"],         // Page 0 (Home)
      ["weatherforecast", "MMM-WeatherChart"],  // Page 1 (Weather)
      ["MMM-Timer"]                             // Page 2 (Timer)
    ],
    fixed: ["MMM-page-indicator", "MMM-ClickToNavigate", "alert"]
  }
},
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "weather": 1,          // Click current weather → Weather page
      "clock": 2,            // Click clock → Timer page
      "calendar": 0          // Click calendar → Home page
    },
    debug: false  // Enable for troubleshooting
  }
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mappings` | `object` | `{}` | CSS class to page number mappings |
| `debug` | `boolean` | `false` | Enable console logging for debugging |

## Finding CSS Classes

To find the CSS class of a module you want to make clickable:

### Method 1: Browser Developer Tools

1. Right-click on the module
2. Select "Inspect" or "Inspect Element"
3. Look for class names in the HTML

### Method 2: Module Documentation

Check the module's documentation or source code for CSS class names.

### Method 3: Common Module Classes

Here are some common MagicMirror² module CSS classes:

| Module | CSS Class |
|--------|-----------|
| Default Clock | `clock` |
| Default Weather | `weather` or `currentweather` |
| Default Calendar | `calendar` |
| Weather Forecast | `weatherforecast` |
| Newsfeed | `newsfeed` |
| Compliments | `compliments` |

**Note:** Some modules use multiple classes. Try different variations if one doesn't work.

## Advanced Examples

### Multi-Page Dashboard

```javascript
{
  module: "MMM-pages",
  config: {
    modules: [
      // Page 0 - Home
      ["clock", "weather", "calendar", "compliments"],

      // Page 1 - Weather
      ["weather", "weatherforecast", "MMM-WeatherChart"],

      // Page 2 - Calendar
      ["calendar", "MMM-CalendarExt3"],

      // Page 3 - News
      ["newsfeed", "MMM-News"]
    ],
    fixed: ["MMM-page-indicator", "MMM-ClickToNavigate"]
  }
},
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "weather": 1,          // Weather module → Weather page
      "weatherforecast": 1,  // Forecast → Weather page
      "clock": 0,            // Clock → Home
      "calendar": 2,         // Calendar → Calendar page
      "newsfeed": 3,         // News → News page
      "compliments": 0       // Compliments → Home
    },
    debug: false
  }
}
```

### Smart Home Control

```javascript
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "MMM-Temperature": 1,           // Temperature sensors page
      "MMM-SmartTouch": 2,            // Light controls page
      "MMM-SecurityCamera": 3,        // Camera feeds page
      "MMM-SystemStats": 4            // System status page
    }
  }
}
```

### Media Center Navigation

```javascript
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "MMM-NowPlayingOnSpotify": 1,   // Music page
      "MMM-PiDeck": 2,                // Video page
      "MMM-Podcast": 3                // Podcast page
    }
  }
}
```

## Styling Clickable Elements

Add visual feedback to show modules are clickable:

**Create/edit `~/MagicMirror/css/custom.css`:**

```css
/* Add pointer cursor to clickable modules */
.weather,
.clock,
.calendar {
  cursor: pointer;
}

/* Hover effect for touch feedback */
.weather:hover,
.clock:hover,
.calendar:hover {
  opacity: 0.8;
  transform: scale(1.02);
  transition: all 0.2s ease;
}

/* Add subtle border on hover */
.weather:hover {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 5px;
}

/* Glow effect */
.clock:hover {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Background highlight */
.calendar:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
}
```

**Note:** The module automatically sets `cursor: pointer` on mapped elements.

## Debugging

Enable debug mode to see what's happening:

```javascript
{
  module: "MMM-ClickToNavigate",
  config: {
    mappings: {
      "weather": 1,
      "clock": 2
    },
    debug: true  // ← Enable this
  }
}
```

**Check the browser console (F12)** for messages like:

```
[MMM-ClickToNavigate] MMM-ClickToNavigate started
[MMM-ClickToNavigate] Adding click handlers
[MMM-ClickToNavigate] Found 1 elements for class: weather
[MMM-ClickToNavigate] Found 1 elements for class: clock
[MMM-ClickToNavigate] Clicked on weather, navigating to page 1
```

## Troubleshooting

### Clicks don't navigate

**Check the following:**

1. **MMM-pages is installed and configured**
   ```bash
   ls ~/MagicMirror/modules/MMM-pages
   ```

2. **CSS classes match exactly**
   - Enable `debug: true` and check console
   - Look for "Found X elements for class: Y"
   - If "Found 0 elements", the class name is wrong

3. **Module is in the fixed list**
   ```javascript
   fixed: ["MMM-ClickToNavigate"]
   ```

4. **Page numbers are correct**
   - Pages are 0-indexed (first page is 0, not 1)
   - Verify page numbers match your MMM-pages config

### Elements found but navigation doesn't work

1. **Check MMM-pages is receiving notifications**
   - Look for PAGE_CHANGED notifications in logs

2. **Verify page numbers exist**
   - If you have 3 pages, use 0, 1, 2 (not 1, 2, 3)

3. **Check for JavaScript errors**
   - Open browser console (F12)
   - Look for red error messages

### Module doesn't load

1. **Check config.js syntax**
   ```bash
   pm2 logs MagicMirror
   ```

2. **Verify module location**
   ```bash
   ls ~/MagicMirror/modules/MMM-ClickToNavigate/
   ```

3. **Restart MagicMirror**
   ```bash
   pm2 restart MagicMirror
   ```

## How It Works (Technical)

1. **Startup**: Module starts and waits 3 seconds for DOM to load
2. **Handler Attachment**: Queries DOM for elements matching CSS classes in `mappings`
3. **Click Events**: Adds click listeners that send `PAGE_CHANGED` notification
4. **Auto-Reattachment**: Re-adds handlers on `MODULE_DOM_CREATED` and `ALL_MODULES_STARTED`
5. **Navigation**: MMM-pages receives notification and switches pages

## Use Cases

- **Touch-enabled dashboards** - Tap modules to explore details
- **Kiosk displays** - Navigate without physical buttons
- **Smart home panels** - Quick access to control pages
- **Media centers** - Click album art to open music player
- **Information displays** - Drill down into weather, traffic, etc.

## Compatibility

- **MagicMirror²** v2.12.0+
- **MMM-pages** (required)
- **Node.js** 14.0.0+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Changelog

### Version 1.0.0 (2025-11-23)
- Initial release
- CSS class-based navigation
- Debug mode
- Auto-handler reattachment

## Credits

Created for the MagicMirror² platform by [MagicMirror² Community](https://magicmirror.builders/)
