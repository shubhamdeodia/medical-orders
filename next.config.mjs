/**
 * Next.js configuration tailored for static export to GitHub Pages.
 * If your repository name is (for example) `medical-orders`, and you deploy to
 * a user/org Pages site (https://<user>.github.io/medical-orders), set basePath
 * and assetPrefix to '/medical-orders'. For a project Pages site they are required.
 * For a user/organization root site (https://<user>.github.io) leave them empty.
 */
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'medical-orders'
const isProjectPage = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static HTML export
  output: 'export',
  // Avoid server-side image optimization (not supported in static export)
  images: { unoptimized: true },
  // Lint / type errors ignored during build (keep original behavior)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Configure basePath & assetPrefix only when building for GitHub Pages project site
  basePath: isProjectPage ? `/${repoName}` : undefined,
  assetPrefix: isProjectPage ? `/${repoName}/` : undefined,
  trailingSlash: true, // Helps when serving from GitHub Pages (directories)
}

export default nextConfig
