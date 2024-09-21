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

# Step 4: Pull the gh-pages branch to avoid non-fast-forward issues
Try {
    git fetch origin gh-pages
    git subtree pull --prefix dist origin gh-pages --allow-unrelated-histories -m "Merging latest gh-pages changes"
} Catch {
    Write-Host "Nothing to pull or subtree pull failed"
}

# Step 5: Push subtree to gh-pages, force if necessary
Try {
    git subtree push --prefix dist origin gh-pages
} Catch {
    Write-Host "Subtree push failed, attempting a forced push"
    git push origin `gh-pages --force
}

# Step 6: Reset dist folder changes on the main branch so it isn't committed
git reset HEAD dist
