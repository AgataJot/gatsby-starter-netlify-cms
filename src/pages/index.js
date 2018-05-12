import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Masonry from "react-masonry-component";
const masonryOptions = {
  transitionDuration: 0
};
const imagesLoadedOptions = { background: ".wk-bg-image-el" };

function Grid(props) {
  return (
    <Masonry
      className={"columns"}
      elementType={"ul"}
      options={masonryOptions}
      disableImagesLoaded={false}
      updateOnEachImageLoad={true}
      onImagesLoaded={props.handleImagesLoaded}
      imagesLoadedOptions={imagesLoadedOptions}
    >
      {props.images}
    </Masonry>
  );
}

export default class IndexPage extends React.PureComponent {
  state = { layoutComplete: false };

  handleImagesLoaded = what => {
    console.log("complete", what);
    // this.setState({ layoutComplete: true });
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
          className="has-text-white wk-grid-image-link"
          to={post.fields.slug}
        >
          <img {...this.getImg(post.frontmatter.image)} />
        </Link>
      </li>
    ));

    const gridClassName = ["container", "wk-grid-container", "wk-show-grid"];
    //layoutComplete ? "wk-show-grid" : null

    return (
      <section className="section">
        <div className={gridClassName.join(" ")}>
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
