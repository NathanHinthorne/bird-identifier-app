# Step 1: Build the project to ensure dist folder exists
if (-Not (Test-Path -Path "dist")) {
    Write-Host "Building the project..."
    npm run build
}

# Step 2: Create and switch to a new orphan branch
$tempBranch = "temp-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"
git checkout --orphan $tempBranch

# Step 3: Remove all files from the staging area
git rm -rf .

# Step 4: Copy contents of dist folder to the root
Copy-Item -Path "dist/*" -Destination "." -Recurse

# Step 5: Add all files in the current directory
git add .

# Step 6: Commit the changes
git commit -m "Deploy to GitHub Pages"

# Step 7: Delete the old gh-pages branch
git branch -D gh-pages
git push origin --delete gh-pages

# Step 8: Rename the current branch to gh-pages
git branch -m gh-pages

# Step 9: Force push to the gh-pages branch
git push -f origin gh-pages

# Step 10: Clean up - switch back to main and delete temporary branch
git checkout main
git branch -D $tempBranch

Write-Host "Deployment completed successfully!"