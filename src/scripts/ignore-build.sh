#!/bin/bash

# Check if any relevant files changed
git diff HEAD^ HEAD --quiet $APP_PATH ${PACKAGES//,/ } package.json pnpm-lock.yaml pnpm-workspace.yaml

# Exit code 0 = no changes (ignore build), Exit code 1 = changes found (build)