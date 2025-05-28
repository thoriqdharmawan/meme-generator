#!/bin/bash

# React Native MemeGenerator - Development Setup Script
# This script helps new developers set up their development environment

echo "🚀 Setting up React Native MemeGenerator development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or later."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. You have $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if iOS development tools are available (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 macOS detected - checking iOS development tools..."

    if ! command -v xcodebuild &> /dev/null; then
        echo "⚠️  Xcode is not installed. iOS development will not be available."
    else
        echo "✅ Xcode detected"

        # Install iOS dependencies
        echo "📱 Installing iOS dependencies..."
        cd ios && bundle exec pod install && cd ..
    fi
fi

# Check if Android development tools are available
if command -v adb &> /dev/null; then
    echo "✅ Android Debug Bridge detected"
else
    echo "⚠️  Android Debug Bridge not found. Android development may not work."
fi

# Run quality checks
echo "🔍 Running code quality checks..."
npm run quality

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Available commands:"
echo "  npm run ios          - Run on iOS simulator"
echo "  npm run android      - Run on Android emulator/device"
echo "  npm run start        - Start Metro bundler"
echo "  npm run lint         - Run ESLint"
echo "  npm run format       - Format code with Prettier"
echo "  npm run quality      - Run all quality checks"
echo "  npm run quality:fix  - Fix and format code"
echo ""
echo "Happy coding! 🚀"
