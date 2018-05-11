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
      <li
        key={post.frontmatter.image}
        className="column is-one-quarter wk-grid-image"
      >
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
      filter: { frontmatter: { templateKey: { eq: "project" } } }
      sort: {
        order: DESC
        fields: [frontmatter___priority, frontmatter___date]
      }
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
