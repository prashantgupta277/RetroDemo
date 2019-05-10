#!/bin/bash
set -e

echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env

exec "$@"
