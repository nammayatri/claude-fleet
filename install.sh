#!/usr/bin/env bash
set -euo pipefail

# Install claude-fleet by symlinking bin/* to ~/.local/bin

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BIN_DIR="$SCRIPT_DIR/bin"
INSTALL_DIR="${1:-$HOME/.local/bin}"

mkdir -p "$INSTALL_DIR"

for script in "$BIN_DIR"/fleet*; do
    name=$(basename "$script")
    target="$INSTALL_DIR/$name"
    if [[ -L "$target" || -e "$target" ]]; then
        echo "Updating: $name"
        rm "$target"
    else
        echo "Installing: $name"
    fi
    ln -s "$script" "$target"
done

echo ""
echo "Installed to $INSTALL_DIR"
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    echo "Add to PATH: export PATH=\"$INSTALL_DIR:\$PATH\""
fi
