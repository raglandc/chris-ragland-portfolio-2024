import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    date: { type: 'date', required: true },
    groupMembers: {type: "string", required: true},
    image: { type: "string", required: true },
    link: {type: "string", required: true},
    projectType: { type: "string", required: true},
    title: { type: 'string', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (project) => `/${project._raw.flattenedPath}` },
  },
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blogs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    author: { type: "string", required: true },
    date: { type: 'date', required: true },
    image: { type: "string", required: true },
    link: { type: "string", required: true },
    postCategory: { type: "string", required: true},
    readTime: { type: "string", required: true},
    title: { type: 'string', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (blog) => `/${blog._raw.flattenedPath}` },
  },
}))

export default makeSource({
   contentDirPath: 'posts',
   documentTypes: [Project, Blog], 
   mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // prevent lines from collapsing in `display: grid` mode
            // allow empty lines to be copy and pasted
            if (node.children.length === 0)
            {
              node.children = [{ type: "text", value: " " }]
            }
          },

          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },

          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"]
          },
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: "Link to section",
          },
        }
      ]
    ]
   }
  })