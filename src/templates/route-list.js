import React, { useState } from 'react';
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
          ratingInt
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

      <div className='pt-2 relative mx-auto text-gray-600 flex justify-center my-5'>
        <input
          className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full md:w-2/5'
          type='search'
          name='search'
          placeholder='This is a fake search bar'
        />
      </div>

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
                <td className='capitalize'>{node.ridetype}</td>
                <td className='capitalize'>{node.destination}</td>
                <td>
                  {[...Array(node.ratingInt)].map(() => {
                    return (
                      <span role='img' alt='star' className='mr-2 text-xl'>
                        ⭐️
                      </span>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default RouteList;
