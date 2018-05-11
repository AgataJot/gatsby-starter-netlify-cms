import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import Content, { HTMLContent } from "../components/Content";

export const ProjectPageTemplate = ({
  description,
  title,
  helmet,
  full_image: fullImage
}) => {
  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div
          className="wk-image-container"
          style={{ backgroundImage: `url(${fullImage})` }}
        />
      </div>
    </section>
  );
};

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
