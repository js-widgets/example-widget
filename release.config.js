module.exports = {
  branches: ['master'],
  analyzeCommits: 'semantic-release-conventional-commits',
  repositoryUrl: 'https://github.com/js-widgets/example-widget.git',
  plugins: ['@semantic-release/commit-analyzer', '@semantic-release/github'],
};
