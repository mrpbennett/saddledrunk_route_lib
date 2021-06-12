import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import axios from 'axios';

import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  query ($slug: String!) {
    contentfulRoutes(slug: { eq: $slug }) {
      routename
      slug
    }
  }
`;

const Route = (props) => {
  const [route, setRoute] = useState([]);
  const [athlete, setAthlete] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const firstResponse = await axios({
          method: 'POST',
          url: 'https://www.strava.com/oauth/token',
          params: {
            client_id: process.env.GATSBY_STRAVA_CLIENT_ID,
            client_secret: process.env.GATSBY_STRAVA_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: process.env.GATSBY_STRAVA_REFRESH_TOKEN,
          },
        });
        const token = firstResponse.data.access_token;
        const secondResponse = await axios({
          method: 'GET',
          url: `https://www.strava.com/api/v3/routes/${props.data.contentfulRoutes.slug}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRoute(secondResponse.data);
        setAthlete(secondResponse.data.athlete);
      } catch (e) {
        console.log(e);
      }
    };

    init();
  }, []);

  const distanceMiles = route.distance / 1609;
  const elevationMeters = route.elevation_gain;

  const distanceKm = route.distance / 1000;
  const elevationFt = route.elevation_gain * 3.281;

  const estimatedMovingTime = route.estimated_moving_time / 3600;

  const createdAt = new Date(route.created_at).toString();

  return (
    <Layout>
      <SEO title={props.data.contentfulRoutes.routename} />
      <section>
        {/* route name + gpx btn */}
        <div className='mt-8' id='routename-and-gpx'>
          <div className='mb-5'>
            <h2>{route.name}</h2>
            <a href='#'>
              <button className='py-1 px-3 rounded-lg text-sm text-white font-bold shadow hover:bg-gray-200 hover:text-gray-800 strava-orange'>
                Get GPX
              </button>
            </a>
          </div>
        </div>

        {/* map and route info block */}
        <div className='flex flex-col md:flex-row'>
          <div id='map' className='md:flex-grow md:mr-10'>
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?size=1000x350&maptype=roadmap&path=enc:${route.map.summary_polyline}&key=${process.env.GATSBY_GOOGLE_MAP_KEY}`}
              className='rounded-md shadow-md w-full'
            />
            {/* 
            <div>
              <table className='table-auto'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {segments.map(({ s }) => {
                    return (
                      <tr>
                        <td>
                          <a href={`https://www.strava.com/segments/${s.id}`}>{s.name}</a>
                        </td>
                        <td>{s.distance}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div> */}
          </div>

          {/* route data */}
          <div id='route' className='md:w-2/5'>
            {/* profile img and creator */}

            <div id='creator-header' className='flex items-center'>
              <img src={athlete.profile} className='rounded-full w-16 shadow'></img>

              <div className='flex flex-col ml-4'>
                <span>
                  By{' '}
                  <strong>
                    {athlete.firstname} {athlete.lastname}
                  </strong>
                </span>
                <span className='text-sm text-gray-500'>Created on {createdAt}</span>
              </div>
            </div>

            <div id='route-stats' className='flex flex-col'>
              <div className='flex flex-row'>
                <div className='flex flex-col mr-10'>
                  <span className='font-bold'>
                    {Math.round(distanceKm)} km /{' '}
                    <span className='font-normal text-gray-500'>{Math.round(distanceMiles)} mi</span>
                  </span>
                  <span className='text-xs'>Distance</span>
                </div>
                <div className='flex flex-col mr-10'>
                  <span className='font-bold'>
                    {Math.round(elevationMeters)} m /{' '}
                    <span className='font-normal text-gray-500'>{Math.round(elevationFt)} ft</span>
                  </span>
                  <span className='text-xs'>Elevation Gain</span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold'>{Math.round(estimatedMovingTime)} hrs</span>
                  <span className='text-xs'>Estimated Moving Time</span>
                </div>
              </div>
            </div>

            <div id='description'>
              <p className='new-line'>{route.description}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Route;
