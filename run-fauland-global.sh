#!/bin/bash

set -euo pipefail

SOURCE="${BASH_SOURCE[0]}"

while [[ -h "$SOURCE" ]]; do
  SCRIPT_DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
  TARGET="$(readlink "$SOURCE")"

  if [[ "$TARGET" != /* ]]; then
    SOURCE="$SCRIPT_DIR/$TARGET"
  else
    SOURCE="$TARGET"
  fi
done

PROJECT_DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
START_SCRIPT="$PROJECT_DIR/start-fauland.sh"

if [[ ! -x "$START_SCRIPT" ]]; then
  echo "Fant ikke kjørbart startscript:"
  echo "$START_SCRIPT"
  exit 1
fi

cd "$PROJECT_DIR"
exec "$START_SCRIPT" "$@"
