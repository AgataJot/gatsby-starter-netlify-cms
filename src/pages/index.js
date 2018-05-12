import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Masonry from "react-masonry-component";
const masonryOptions = {
  transitionDuration: 0
};
const imagesLoadedOptions = { background: ".my-bg-image-el" };

function Grid(props) {
  return (
    <Masonry
      className={"columns"}
      elementType={"ul"}
      options={masonryOptions}
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}
      onImagesLoaded={props.handleImagesLoaded}
      imagesLoadedOptions={imagesLoadedOptions}
    >
      {props.images}
    </Masonry>
  );
}

export default class IndexPage extends React.PureComponent {
  state = { layoutComplete: false };

  handleImagesLoaded = () => {
    console.log("complete");
    this.setState({ layoutComplete: true });
  };

  getImgSrc = src => {
    if (!window || window.location.host.includes("localhost")) return src;

    const imageWidth = 318;
    const cloudinary = `https://res.cloudinary.com/dixjmm2zt/image/fetch/w_${imageWidth},f_auto/`;
    const originalURL = `https://${window.location.origin}/${src}`;
    return `${cloudinary}${originalURL}`;
  };

  render() {
    const { data } = this.props;
    const { layoutComplete } = this.state;
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
          <img src={this.getImgSrc(post.frontmatter.image)} />
        </Link>
      </li>
    ));

    const gridClassName = [
      "container",
      "wk-grid-container",
      layoutComplete ? "wk-show-grid" : null
    ];

    return (
      <section className="section">
        <div className={gridClassName.join(" ")}>
          {!layoutComplete && <div className="wk-preloader" />}
          <Grid images={images} handleImagesLoaded={this.handleImagesLoaded} />
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
