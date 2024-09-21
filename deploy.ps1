# Step 1: Build the project to ensure dist folder exists
if (-Not (Test-Path -Path "dist")) {
    Write-Host "Building the project..."
    npm run build
}

# Step 2: Ensure the dist folder is ignored in the main branch
$gitignorePath = ".gitignore"
if (-not (Select-String -Path $gitignorePath -Pattern "^dist$")) {
    Add-Content -Path $gitignorePath -Value "`ndist"
    git add .gitignore
    git commit -m "Ignore dist folder in main branch"
}

# Step 3: Add and commit the dist folder, force-add since it's in .gitignore
git add dist -f
git commit -m "Adding dist folder for deployment"

# Step 4: Fetch the gh-pages branch
git fetch origin gh-pages

# Step 5: Create a new temporary branch for deployment
$tempBranch = "temp-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"
git checkout -b $tempBranch

# Step 6: Read the contents of the dist folder
git read-tree --prefix=dist/ -u origin/gh-pages

# Step 7: Commit the changes
git commit -m "Merge latest gh-pages content"

# Step 8: Create a new gh-pages branch from the current state
git branch -D gh-pages
git branch gh-pages

# Step 9: Push the new gh-pages branch, force if necessary
git push origin gh-pages --force

# Step 10: Clean up - switch back to main and delete temporary branch
git checkout main
git branch -D $tempBranch

# Step 11: Reset dist folder changes on the main branch so it isn't committed
git reset HEAD dist

Write-Host "Deployment completed successfully!"