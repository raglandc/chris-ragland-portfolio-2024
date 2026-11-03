const withMDX = require("@next/mdx")({
    extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withMDX({
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    // Standalone quiz page in public/, served without the .html extension.
    rewrites: async () => [
        { source: "/orgo/exam-2-prep-quiz", destination: "/orgo/exam-2-prep-quiz.html" },
    ],
});
