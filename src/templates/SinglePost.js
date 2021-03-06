import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'
import Content from '../components/Content'
import Layout from '../components/Layout'
import Gallery from '../components/Gallery'
import { Tags } from '../components/Tags'
import PostSection from '../components/PostSection'

import './SinglePost.css'

export const SinglePostTemplate = ({
  id,
  title,
  postTags,
  date,
  body,
  categories = [],
  relatedPosts,
  gallery
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="SinglePost--BackButton" to="/shop/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )}
            {categories && (
              <Fragment>
                <span> |</span>
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>

          {postTags &&
            <Tags tags={postTags} selectedTag={null} />
          }

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          <section className="section">
            <div className="container">
            <Gallery images={gallery} />
            </div>
          </section>


          <div className="SinglePost--InnerContent">
            <Content source={body} />
          </div>

          {postTags &&
            <Tags tags={postTags} selectedTag={null} />
          }
          {!!relatedPosts.length && (
            <section className="section">
              <div className="container">
                <PostSection title={'?????????????????????'} posts={relatedPosts} />
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts, group } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  // ????????????????????????????????????
  const tags = group.group.filter(tag => post.frontmatter.tags.includes(tag.fieldValue))

  // ??????????????????????????????????????????????????????
  const relatedPosts =
    [...new Set(tags.flatMap(t => allPosts.edges
      .filter(p => p.node.id !== post.id)
      .filter(p => p.node.frontmatter.tags.includes(t.fieldValue))
    ))].map(post => ({
      ...post.node,
      ...post.node.frontmatter,
      ...post.node.fields
  }))

  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        postTags={tags}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
        relatedPosts={relatedPosts}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      id
      frontmatter {
        title
        template
        subtitle
        date(formatString: "YYYY/MM/DD")
        featuredImage
        categories {
          category
        }
        tags
      }
    }

    allPosts: allMarkdownRemark(filter: {fields: {contentType: {eq: "posts"}}, frontmatter: {status: {eq: "Published"}}}, 
      sort: {order: DESC, fields: [frontmatter___date]}) {
        edges {
          node {
            id
            excerpt(truncate: true, pruneLength: 50)
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "YYYY/MM/DD")
              slug
              categories {
                category
              }
              featuredImage
              tags
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "YYYY/MM/DD")
              categories {
                category
              }
              featuredImage
              tags
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "YYYY/MM/DD")
              categories {
                category
              }
              featuredImage
              tags
            }
          }
        }
      }

    group: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
