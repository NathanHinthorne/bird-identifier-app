# Step 1: Ensure the dist folder is ignored in the main branch
$gitignorePath = ".gitignore"
if (-not (Select-String -Path $gitignorePath -Pattern "^dist$")) {
    Add-Content -Path $gitignorePath -Value "`ndist"
    git add .gitignore
    git commit -m "Ignore dist folder in main branch"
}

# Step 2: Add and commit the dist folder, force-add since it's in .gitignore
git add dist -f
git commit -m "Adding dist folder for deployment"

# Step 3: Pull the gh-pages branch to avoid non-fast-forward issues
Try {
    git fetch origin gh-pages
    git subtree pull --prefix dist origin gh-pages -m "Merging latest gh-pages changes"
} Catch {
    Write-Host "Nothing to pull or subtree pull failed"
}

# Step 4: Push subtree to gh-pages
Try {
    git subtree push --prefix dist origin gh-pages
} Catch {
    Write-Host "Subtree push failed"
}

# Step 5: Reset dist folder changes on the main branch so it isn't committed
git reset HEAD dist
