#!/bin/bash

# Start both dev servers for Narrative Canvas Platform
# Run this in Claude Code: bash start-all.sh

echo "🚀 Starting Narrative Canvas Platform..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Make sure you're in projects/alpha directory"
    echo "Run: cd projects/alpha"
    exit 1
fi

echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "================================"
echo "Starting Development Servers"
echo "================================"
echo ""

# Start Vite in background
echo "🔥 Starting Vite on http://localhost:5173..."
npm run dev &
VITE_PID=$!
echo "   Vite PID: $VITE_PID"
echo ""

# Wait a moment for Vite to start
sleep 3

# Start Convex in background
echo "⚙️  Starting Convex on http://localhost:3210..."
npm run convex:dev &
CONVEX_PID=$!
echo "   Convex PID: $CONVEX_PID"
echo ""

echo "================================"
echo "✅ Both servers started!"
echo "================================"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "⚙️  Backend:  http://localhost:3210"
echo ""
echo "📍 Next steps:"
echo "1. Click port 5173 in Claude Code"
echo "2. Click 'Test OpenRouter Connection' button"
echo "3. Check the result"
echo ""
echo "To stop: Press Ctrl+C"
echo ""

# Wait for both processes
wait $VITE_PID $CONVEX_PID
