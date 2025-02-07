# USD to BRL Converter - GNOME Extension

This is a GNOME Shell extension that provides real-time USD to BRL conversion rates, updating automatically and displaying the latest exchange rate directly in the system panel.

## Features

- Fetches USD to BRL exchange rate from [AwesomeAPI](https://economia.awesomeapi.com.br).
- Updates automatically every 60 seconds.
- Click to manually refresh the exchange rate.
- Simple and lightweight integration into the GNOME panel.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/usd-to-brl-gnome-extension.git
   ```
   
2. Move the extension files to the GNOME Shell extensions directory:

   ```sh
   mkdir -p ~/.local/share/gnome-shell/extensions/usd-to-brl@rooke
   cp -r usd-to-brl-gnome-extension/* ~/.local/share/gnome-shell/extensions/usd-to-brl@rooke/
   ```

3. Restart GNOME Shell:

   **On Xorg:** Press Alt + F2, type r, and press Enter.

   **On Wayland:** Log out and log back in.
   
4. Enable the extension:

   ```sh
   gnome-extensions enable usd-to-brl@rooke

## Development
To test the extension in a nested session, run:

```sh
dbus-run-session -- gnome-shell --nested --wayland | grep 'usd-to-brl@rooke'
```

## Folder Structure
The extension files should be placed in:


```sh
~/.local/share/gnome-shell/extensions/usd-to-brl@rooke
```

## Files

```sh
extension.js – Main extension logic and GNOME Shell integration.
request.js – Handles HTTP requests using Soup to fetch exchange rates.
metadata.json – Extension metadata and compatibility information.
stylesheet.css – Defines UI styling for the panel text.
```

## License
This project is licensed under the GNU General Public License v2.0 or later.

Maintainer: Felipe Rooke (@feliperooke)

Feel free to contribute and open issues if you find any bugs or have feature suggestions.

Let me know if you want any modifications! 🚀