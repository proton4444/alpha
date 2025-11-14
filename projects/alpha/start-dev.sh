#!/bin/bash
# Start development servers for Narrative Canvas Platform

echo "🚀 Starting Narrative Canvas Platform Development Servers..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start Vite dev server in background
echo "🔥 Starting Vite dev server on http://localhost:5173..."
npm run dev &
VITE_PID=$!

# Give Vite time to start
sleep 3

# Start Convex backend in background
echo "⚙️  Starting Convex backend on http://localhost:3210..."
npm run convex:dev &
CONVEX_PID=$!

echo ""
echo "✅ Both servers started!"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend: http://localhost:3210"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for both processes
wait $VITE_PID $CONVEX_PID
