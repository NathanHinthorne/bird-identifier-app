if ($currentBranch -ne "main") {
    Write-Host "Please run this script from the main branch."
    exit 1
}

# Step 1: Build the project to ensure dist folder exists
if (-Not (Test-Path -Path "dist")) {
    Write-Host "Building the project..."
    npm run build
}

# Step 2: Create and switch to a new branch
$tempBranch = "temp-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"
git checkout -b $tempBranch

# Step 3: Remove all files except dist
Get-ChildItem -Exclude dist | Remove-Item -Recurse -Force

# Step 4: Move contents of dist folder to the root
Move-Item -Path "dist/*" -Destination "."
Remove-Item -Path "dist" -Recurse -Force

# Step 5: Add all files in the current directory
git add .

# Step 6: Commit the changes
git commit -m "Deploy to GitHub Pages" --allow-empty

# Step 7: Delete the old gh-pages branch (if it exists)
git push origin --delete gh-pages

# Step 8: Rename the current branch to gh-pages
git branch -m gh-pages

# Step 9: Force push to the gh-pages branch
git push -f origin gh-pages

# Step 10: Clean up - switch back to main and delete temporary branch
git checkout main
git branch -D gh-pages

Write-Host "Deployment completed successfully!"