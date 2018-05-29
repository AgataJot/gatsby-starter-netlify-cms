import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Masonry from "react-masonry-component";
import { get } from "lodash";
import classNames from "classnames";
import { getImg } from "../utils/cloudinary";
const masonryOptions = {
  transitionDuration: 0
};
const mobileW = 768;
// TODO doesn't update
const getDocumentW =
  typeof document !== "undefined" && document.body.clientWidth;
const isMobile = typeof document !== "undefined" && getDocumentW <= mobileW;

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
  state = { loadedImages: [false] };

  handleImagesLoaded = what => {
    if (this.state.loadedImages.every(isLoaded => isLoaded)) return;
    const loadedImages = what.images.map(({ isLoaded }) => isLoaded);
    console.log("loaded", loadedImages);
    console.log("complete", what);
    this.setState({ loadedImages });
  };

  hasLoaded = index => {
    const { loadedImages } = this.state;
    return loadedImages[index];
  };

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    console.log("render posts", posts);
    console.log("loadedImages", this.state);

    const images = posts.map(({ node: post }, index) => {
      const img = getImg(post.frontmatter.image, {
        width: isMobile ? getDocumentW : 318
      });
      console.log("get img,", img);
      return (
        <li
          key={post.frontmatter.image}
          className="column is-one-quarter wk-grid-image"
        >
          <Link
            className={classNames("has-text-white", "wk-grid-image-link", {
              "wk-grid-image-link-loading": !this.hasLoaded(index)
            })}
            to={post.fields.slug}
          >
            <img src={img.src} />
          </Link>
        </li>
      );
    });

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
