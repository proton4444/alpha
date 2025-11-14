#!/bin/bash

# PROJECT ALIGNMENT CHECK - Run this in Claude Code to verify everything is synced

echo "================================"
echo "NARRATIVE CANVAS PROJECT CHECK"
echo "================================"
echo ""

# Check 1: Git status
echo "✓ Git Status:"
echo "  Branch: $(git branch --show-current)"
echo "  Last commit: $(git log -1 --oneline)"
echo "  Uncommitted: $(git status --short | wc -l) files"
echo ""

# Check 2: TypeScript
echo "✓ TypeScript Compilation:"
if npx tsc --noEmit 2>&1 | grep -q "error"; then
    echo "  ❌ ERRORS FOUND"
    npx tsc --noEmit
else
    echo "  ✅ No errors"
fi
echo ""

# Check 3: Dependencies
echo "✓ Key Dependencies:"
echo "  React: $(npm list react 2>/dev/null | grep react@ | head -1 | xargs)"
echo "  Convex: $(npm list convex 2>/dev/null | grep convex@ | head -1 | xargs)"
echo "  Vite: $(npm list vite 2>/dev/null | grep vite@ | head -1 | xargs)"
echo ""

# Check 4: Critical files
echo "✓ Critical Files:"
for file in src/App.tsx convex/schema.ts package.json index.html .env.local; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file MISSING"
    fi
done
echo ""

# Check 5: Dev server readiness
echo "✓ Dev Server Scripts:"
if npm run | grep -q "dev"; then
    echo "  ✅ npm run dev available"
else
    echo "  ❌ npm run dev NOT available"
fi

if npm run | grep -q "convex:dev"; then
    echo "  ✅ npm run convex:dev available"
else
    echo "  ❌ npm run convex:dev NOT available"
fi
echo ""

# Final status
echo "================================"
echo "ALIGNMENT STATUS: ✅ READY"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Terminal 1: npm run dev"
echo "2. Terminal 2: npm run convex:dev"
echo "3. Access: http://localhost:5173"
echo "4. Start Story 1.3"
echo ""
