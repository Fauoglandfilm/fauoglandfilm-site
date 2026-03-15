#!/bin/bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="${TMPDIR:-/tmp}/fau-land-dev.log"
DEV_PID=""
TAIL_PID=""
PORT=3000
URL=""

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

open_browser() {
  if [[ "${NO_BROWSER:-0}" == "1" ]]; then
    return
  fi

  if command_exists open; then
    open "$URL" >/dev/null 2>&1 || true
  elif command_exists xdg-open; then
    xdg-open "$URL" >/dev/null 2>&1 || true
  fi
}

port_in_use() {
  local port="$1"

  if command_exists lsof; then
    lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
    return
  fi

  if command_exists nc; then
    nc -z localhost "$port" >/dev/null 2>&1
    return
  fi

  return 1
}

wait_for_url() {
  local url="$1"
  local attempts="${2:-30}"

  for _ in $(seq 1 "$attempts"); do
    if curl -fsS "$url" >/dev/null 2>&1; then
      return 0
    fi

    sleep 1
  done

  return 1
}

cleanup() {
  if [[ -n "$TAIL_PID" ]] && kill -0 "$TAIL_PID" >/dev/null 2>&1; then
    kill "$TAIL_PID" >/dev/null 2>&1 || true
  fi

  if [[ -n "$DEV_PID" ]] && kill -0 "$DEV_PID" >/dev/null 2>&1; then
    kill "$DEV_PID" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT
trap 'exit 130' INT TERM

echo ""
echo "Starter Fau&Land nettside..."
echo ""

if [[ ! -f "$PROJECT_DIR/package.json" ]]; then
  echo "Fant ikke package.json i prosjektmappen:"
  echo "$PROJECT_DIR"
  exit 1
fi

if ! command_exists npm; then
  echo "Fant ikke npm. Installer Node.js først."
  exit 1
fi

cd "$PROJECT_DIR"

if [[ ! -d node_modules ]]; then
  echo "Installerer dependencies..."
  npm install
else
  echo "Dependencies finnes allerede."
fi

if [[ -d "$PROJECT_DIR/.next" ]]; then
  rm -rf "$PROJECT_DIR/.next"
fi

if port_in_use "$PORT"; then
  start_port="$PORT"

  while port_in_use "$PORT"; do
    PORT=$((PORT + 1))
  done

  echo "Port $start_port er opptatt. Bruker port $PORT i stedet."
fi

URL="http://localhost:$PORT"

echo ""
echo "Starter utviklingsserver..."
echo ""

: > "$LOG_FILE"
npm run dev -- --port "$PORT" >"$LOG_FILE" 2>&1 &
DEV_PID=$!

for _ in $(seq 1 90); do
  if ! kill -0 "$DEV_PID" >/dev/null 2>&1; then
    echo "Utviklingsserveren stoppet før nettsiden ble klar."
    echo ""
    echo "Siste logglinjer:"
    tail -n 20 "$LOG_FILE" || true
    exit 1
  fi

  LOGGED_URL="$(grep -Eo 'http://localhost:[0-9]+' "$LOG_FILE" | tail -n 1 || true)"
  if [[ -n "$LOGGED_URL" ]]; then
    URL="$LOGGED_URL"
  fi

  if curl -fsS "$URL" >/dev/null 2>&1; then
    break
  fi

  sleep 1
done

if ! curl -fsS "$URL" >/dev/null 2>&1; then
  echo "Nettsiden svarte ikke innen forventet tid."
  echo ""
  echo "Siste logglinjer:"
  tail -n 20 "$LOG_FILE" || true
  exit 1
fi

echo ""
echo "================================"
echo "FAU&LAND NETTSIDE ER STARTET"
echo "$URL"
echo "Logg: $LOG_FILE"
echo "================================"
echo ""
echo "Åpner nettsiden i nettleser..."
echo ""

open_browser

tail -n +1 -f "$LOG_FILE" &
TAIL_PID=$!

wait "$DEV_PID"
