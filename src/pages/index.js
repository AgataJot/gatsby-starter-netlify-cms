import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Masonry from "react-masonry-component";
import { get } from "lodash";
import classNames from "classnames";

const masonryOptions = {
  transitionDuration: 0
};
const mobileW = 768;
// TODO doesn't update
const isMobile = document && document.body.clientWidth <= mobileW;

function Grid({ images, handleImagesLoaded }) {
  if (isMobile) return <ul className="columns">{images}</ul>;
  return (
    <Masonry
      className={"columns"}
      elementType={"ul"}
      options={masonryOptions}
      disableImagesLoaded={false}
      updateOnEachImageLoad={true}
      onImagesLoaded={handleImagesLoaded}
      imagesLoadedOptions={{}}
    >
      {images}
    </Masonry>
  );
}

export default class IndexPage extends React.PureComponent {
  state = { layoutComplete: false, loadedImages: [false] };

  handleImagesLoaded = what => {
    if (this.state.loadedImages.every(isLoaded => isLoaded)) return;
    const loadedImages = what.images.map(({ isLoaded }) => isLoaded);
    console.log("loaded", loadedImages);
    console.log("complete", what);
    this.setState({ loadedImages });
  };

  getImg = src => {
    if (typeof window === "undefined") return { src };
    const isLocal = window.location.host.includes("localhost");
    const location = !isLocal
      ? window.location.origin
      : "https://relaxed-swirles-8933b8.netlify.com/";
    const dpr = window.devicePixelRatio;
    const imageWidth = 318;
    const pixelWidth = imageWidth * dpr;
    const options = [
      `w_${pixelWidth}`,
      "f_auto",
      "q_auto",
      "fl_progressive"
    ].join(",");
    const cloudinary = `https://res.cloudinary.com/dixjmm2zt/image/fetch/${options}/`;
    const url = `${cloudinary}${location}${src}`;
    console.log("url", url);
    return { src: url };
  };

  hasLoaded = index => {
    const { loadedImages } = this.state;
    return loadedImages[index];
  };

  render() {
    const { data } = this.props;
    const { layoutComplete } = this.state;
    const { edges: posts } = data.allMarkdownRemark;
    const images = posts.map(({ node: post }, index) => (
      <li
        key={post.frontmatter.image}
        className="column is-one-quarter wk-grid-image"
      >
        <Link
          className={classNames("has-text-white", {
            "wk-grid-image-link": !this.hasLoaded(index)
          })}
          to={post.fields.slug}
        >
          <img {...this.getImg(post.frontmatter.image)} />
        </Link>
      </li>
    ));

    return (
      <section className="section">
        <div className="container wk-grid-container">
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
