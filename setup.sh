#!/bin/bash

# UniTech Blockly Editor Setup Script

echo "🌌 Setting up UniTech Blockly Editor..."

# Create directory structure
echo "Creating directory structure..."
mkdir -p src/components

# Create a simple check for existing files
if [ -f "package.json" ]; then
    echo "⚠️  package.json already exists. Skipping file creation."
    echo "Run 'npm install' to install dependencies."
else
    echo "✅ Directory structure created!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Copy all the provided files to their respective locations"
    echo "2. Run: npm install"
    echo "3. Run: npm run dev"
    echo ""
    echo "The editor will be available at http://localhost:3000"
fi

echo ""
echo "🚀 Happy coding with UniTech!"