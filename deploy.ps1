# Build the project
npm run build

# Force add the dist directory
git add -f dist

# Commit the dist directory temporarily
git commit -m "Temporary commit for dist directory"

# Fetch the latest changes from the remote gh-pages branch
git fetch origin gh-pages

# Merge the latest changes into the local gh-pages branch
git subtree pull --prefix dist origin gh-pages -m "Merge remote gh-pages"

# Push the contents of the dist directory to the gh-pages branch
git subtree push --prefix dist origin gh-pages

# Undo the temporary commit
git reset HEAD~1

# Remove the dist directory from the working directory
rm -rf dist