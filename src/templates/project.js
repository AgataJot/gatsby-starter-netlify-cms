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
          className="full-width-image-container"
          style={{ backgroundImage: `url(${fullImage})` }}
        />
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
          </div>
        </div>
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
