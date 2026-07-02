#!/bin/bash

echo "========================================="
echo "Building Saka Backend"
echo "========================================="

# Upgrade pip and install build tools
echo "Step 1: Upgrading pip and installing build tools..."
python -m pip install --upgrade pip
pip install setuptools wheel

# Install requirements
echo "Step 2: Installing dependencies..."
pip install -r requirements.txt

echo "✅ Build completed successfully!"
