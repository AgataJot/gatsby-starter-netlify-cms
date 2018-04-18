import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Masonry from "react-masonry-component";
const masonryOptions = {
  transitionDuration: 0
};
const imagesLoadedOptions = { background: ".my-bg-image-el" };

export default class IndexPage extends React.Component {
  componentDidMount() {
    this.masonry.on("layoutComplete", this.handleLayoutComplete);
  }

  componentWillUnmount() {
    this.masonry.off("layoutComplete", this.handleLayoutComplete);
  }

  handleLayoutComplete = () => {
    console.log("complete");
  };

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const images = posts.map(({ node: post }) => (
      <li key={post.frontmatter.image} className="column is-one-third">
        <Link
          className="has-text-white"
          to={post.fields.slug}
          style={{ display: "block" }}
        >
          <img src={post.frontmatter.image} />
        </Link>
      </li>
    ));

    return (
      <section className="section">
        <div className="container">
          <Masonry
            ref={c => {
              this.masonry = this.masonry || c.masonry;
            }}
            className={"columns"}
            elementType={"ul"}
            options={masonryOptions}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
            imagesLoadedOptions={imagesLoadedOptions}
          >
            {images}
          </Masonry>

          {posts.map(({ node: post }) => (
            <div
              className="content"
              style={{
                border: "1px solid #eaecee",
                padding: "2em 4em"
              }}
              key={post.id}
            >
              <p>
                <Link className="has-text-primary" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
                <span> &bull; </span>
                <small>{post.frontmatter.date}</small>
              </p>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link className="button is-small" to={post.fields.slug}>
                  Keep Reading →
                </Link>
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "project" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            image
          }
        }
      }
    }
  }
`;
