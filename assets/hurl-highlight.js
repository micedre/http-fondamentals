// Hurl syntax highlighting for highlight.js
// This provides syntax highlighting for Hurl HTTP test files

window.hljsDefineHurl = function(hljs) {
  return {
    name: 'hurl',
    case_insensitive: false,
    aliases: ['hurl'],
    contains: [
      // Hurl directives (#| echo, #| output, etc.)
      {
        className: 'meta',
        begin: /^#\|/,
        end: /$/,
        relevance: 10
      },
      // HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, etc.)
      {
        className: 'keyword',
        begin: /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|CONNECT|TRACE)\b/,
        relevance: 10
      },
      // URLs
      {
        className: 'string',
        begin: /https?:\/\/[^\s]+/,
        relevance: 5
      },
      // HTTP headers (name: value)
      {
        className: 'attr',
        begin: /^[A-Za-z][A-Za-z0-9-]*:/,
        end: / /,
        excludeEnd: true,
        relevance: 5
      },
      // Status codes
      {
        className: 'number',
        begin: /\b[1-5][0-9]{2}\b/,
        relevance: 5
      },
      // Comments
      {
        className: 'comment',
        begin: /#(?!\|)/,
        end: /$/
      },
      // Hurl sections ([FormParams], [Options], [MultipartFormData], etc.)
      {
        className: 'section',
        begin: /^\[[A-Za-z]+\]$/,
        relevance: 5
      },
      // Query parameters
      {
        className: 'params',
        begin: /\?[^\s]+/,
        relevance: 3
      },
      // JSON-like strings
      {
        className: 'string',
        begin: /"/,
        end: /"/,
        contains: [{
          className: 'subst',
          begin: /\\./
        }]
      },
      // JSON-like properties
      {
        className: 'property',
        begin: /"[^"]+"\s*:/,
        end: /:/,
        excludeEnd: true
      }
    ]
  };
};
