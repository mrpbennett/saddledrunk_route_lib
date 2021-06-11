import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allContentfulRoutes(sort: { fields: routename, order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          routename
          ridetype
          destination
          rating
          slug
        }
      }
    }
  }
`;

const RouteList = (props) => {
  const routes = props.data.allContentfulRoutes.edges;

  return (
    <Layout>
      <SEO title='Routes' />

      <table className='table-auto'>
        <thead>
          <tr>
            <th>Some Witty Name</th>
            <th>Ride Type</th>
            <th>Destination</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {routes.map(({ node }) => {
            return (
              <tr>
                <td>
                  <Link to={`/route/${node.slug}`}>{node.routename}</Link>
                </td>
                <td>{node.ridetype}</td>
                <td>{node.destination}</td>
                <td>{node.rating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default RouteList;
