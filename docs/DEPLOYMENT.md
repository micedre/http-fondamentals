# Deployment Guide

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Automatic Deployment

Every push to the `main` or `master` branch will automatically trigger a deployment workflow that:

1. Checks out the repository
2. Sets up Quarto
3. Installs Python and dependencies (jupyter, jupyter-hurl-kernel)
4. Renders all Quarto documents
5. Publishes to GitHub Pages

## Initial Setup

### 1. Enable GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select the `gh-pages` branch
4. Click **Save**

### 2. Configure Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

### 3. Initial Publish (Optional)

You can manually trigger the first deployment:

1. Go to **Actions** tab in your repository
2. Select **Publish Quarto to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

Or, simply push a commit to the main/master branch.

## Manual Deployment

To manually publish from your local machine:

```bash
# First time only - initializes gh-pages branch
quarto publish gh-pages

# Subsequent publishes
quarto publish gh-pages
```

## Workflow Details

The GitHub Actions workflow is defined in `.github/workflows/publish.yml`:

- **Trigger**: Pushes to main/master branch, or manual dispatch
- **Runner**: Ubuntu latest
- **Python**: 3.11
- **Dependencies**: Installed from `requirements.txt`
- **Target**: GitHub Pages (gh-pages branch)

## Project Structure for Deployment

```
http-fondamentals/
├── .github/
│   └── workflows/
│       └── publish.yml          # GitHub Actions workflow
├── requirements.txt             # Python dependencies for CI
├── _quarto.yml                  # Quarto configuration
└── [content files]
```

## Troubleshooting

### Workflow Fails with Permission Error

**Solution**: Ensure workflow permissions are set to "Read and write" in repository settings.

### Pages Not Updating

**Checks**:
1. Verify the workflow completed successfully in Actions tab
2. Check that GitHub Pages is configured to deploy from `gh-pages` branch
3. Clear browser cache and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### Python Dependencies Not Found

**Solution**: Ensure all required packages are listed in `requirements.txt`

### Hurl Kernel Error

**Solution**: The `jupyter-hurl-kernel` package should be in requirements.txt and will be installed by the workflow.

## Site URL

After deployment, your site will be available at:

```
https://<username>.github.io/<repository-name>/
```

For example: `https://myorg.github.io/http-fondamentals/`

## Local Testing

Before pushing, test your site locally:

```bash
# Install dependencies
uv sync

# Render the site
uv run quarto render

# Preview locally
uv run quarto preview
```

## Freeze Configuration

This project uses `freeze: auto` in `_quarto.yml`, which means:

- **Locally**: Code execution is cached in `_freeze/` directory (ignored by git)
- **CI/CD**: Code is always re-executed on every build

This ensures reproducible builds in CI while maintaining fast local previews.
