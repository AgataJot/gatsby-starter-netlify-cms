import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import Content, { HTMLContent } from "../components/Content";
import { getImg } from "../utils/cloudinary";
import Measure from "react-measure";
import { isEmpty } from "lodash";

export class ProjectPageTemplate extends React.Component {
  state = {
    dimensions: {}
  };
  onResize = ({ bounds: dimensions }) => this.setState({ dimensions });
  render() {
    const { description, title, helmet, full_image: fullImage } = this.props;
    const { dimensions } = this.state;
    const hasMeasured = !isEmpty(dimensions);
    let style = {};
    if (hasMeasured) {
      const backgroundImage = `url(${
        getImg(fullImage, dimensions, true, "c_fit").src
      })`;
      style = { backgroundImage };
    }
    return (
      <section className="section">
        {helmet || ""}
        <div className="container content">
          <Measure bounds onResize={this.onResize}>
            {({ measureRef }) => (
              <div className="wk-image-container">
                <div ref={measureRef} className="wk-image" style={style} />
              </div>
            )}
          </Measure>
        </div>
      </section>
    );
  }
}

const Project = ({ data = {} }) => {
  const { markdownRemark: post } = data;

  return (
    <ProjectPageTemplate
      {...post.frontmatter}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
    />
  );
};

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default Project;

export const pageQuery = graphql`
  query ProjectsById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image
        full_image
      }
    }
  }
`;
