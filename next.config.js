const withMDX = require("@next/mdx")({
    extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withMDX({
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
