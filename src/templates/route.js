import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import axios from 'axios';
import fileDownload from 'js-file-download';

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
  const [segments, setSegments] = useState([]);
  const [stoken, setSToken] = useState([]);

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
        setSegments(secondResponse.data.segments);
        setSToken(token);
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

  const estimatedMovingTime = Math.round(route.estimated_moving_time / 3600);

  const createdAt = new Date(route.timestamp * 1000).toLocaleDateString();

  const downloadGPX = () => {
    axios({
      method: 'GET',
      url: `https://www.strava.com/api/v3/routes/${props.data.contentfulRoutes.slug}/export_gpx`,
      headers: { Authorization: `Bearer ${stoken}` },
      responseType: 'blob',
    })
      .then((response) => {
        fileDownload(response.data, `${route.name}.gpx`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadTCX = () => {
    axios({
      method: 'GET',
      url: `https://www.strava.com/api/v3/routes/${props.data.contentfulRoutes.slug}/export_tcx`,
      headers: { Authorization: `Bearer ${stoken}` },
      responseType: 'blob',
    })
      .then((response) => {
        fileDownload(response.data, `${route.name}.tcx`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <SEO title={props.data.contentfulRoutes.routename} />

      <section>
        {/* route name + gpx btn */}
        <div className='mt-8' id='routename-and-gpx'>
          <div className='mb-5'>
            <h2>{route.name}</h2>

            <div className='flex'>
              <button
                onClick={downloadGPX}
                className='hidden md:inline py-1 px-3 rounded-lg text-sm text-white font-bold shadow hover:bg-gray-200 hover:text-gray-800 strava-orange mr-3'>
                Get GPX
              </button>
              <button
                onClick={downloadTCX}
                className='hidden md:inline py-1 px-3 rounded-lg text-sm font-bold shadow hover:bg-gray-200 hover:text-gray-800'>
                Get TCX
              </button>
            </div>
          </div>
        </div>

        {/* map and route info block */}
        <div className='flex flex-col md:flex-row'>
          <div id='map' className='md:flex-grow md:mr-10'>
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?size=1000x350&maptype=roadmap&path=enc:${route.map.summary_polyline}&key=${process.env.GATSBY_GOOGLE_MAP_KEY}`}
              className='rounded-md shadow-md w-full'
              alt='route map'
            />

            {/* segments */}
            <div className='hidden md:inline'>
              <h2>Segments</h2>
              <table className='table-fixed text-sm px-2 '>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className='text-center'>Distance km / mi</th>
                    <th className='text-center'>Avg. Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {segments.slice(0, 10).map((s) => {
                    return (
                      <tr>
                        <td>
                          <a
                            href={`https://www.strava.com/segments/${s.id}`}
                            className='font-normal hover:text-blue-500'>
                            {s.name}
                          </a>
                        </td>
                        <td className='text-center'>
                          <span className='font-bold'>{parseFloat(s.distance / 1000).toFixed(2)} km</span> /{' '}
                          <span className='font-normal text-gray-500'>
                            {parseFloat(s.distance / 1609).toFixed(2)} mi
                          </span>
                        </td>
                        <td className='text-center'>{s.average_grade}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* route data */}
          <div id='route' className='w-full md:w-2/5'>
            {/* profile img and creator */}

            <div id='creator-header' className='flex items-center'>
              <img src={athlete.profile} className='rounded-full w-16 shadow' alt='rider profile' />

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
                  <span className='font-bold'>{estimatedMovingTime} hrs</span>
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
