import * as React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

// markup
const IndexPage = () => {
  return (
    <Layout>
      <SEO title='home' />
      <div className='mt-5'>
        <img
          src='https://static1.squarespace.com/static/5bc434afe5f7d17e4e03dd45/t/5be5a1acc2241b9c71eedab9/1623139774490/?format=1500w'
          className='w-2/5'
        />
        <p>
          SaddleDrunk CC is a growing cycling club based in Ealing, West London (United Kingdom) with over 100
          members with an approximate ratio of 2:1 men to women. We welcome riders of all abilities; from
          beginner through to strong intermediate. Beyond intermediate, we can introduce members to the
          SaddleDrunk Racing Team, to potentially train and race. The main focus for the Club is to promote
          the sport and to encourage people to ride! The Club's primary discipline is Road Biking, although
          the members can be seen off-road at MTB,CTX & Gravel events. The Club also has an active and growing
          women’s section with regular women only rides.
        </p>
        <p>
          The Club members meet regularly for Sunday Club Rides. Throughout the year members organise trips
          abroad to ride cyclo-sportive events in every corner of the globe.
        </p>

        <h2>Club Routes</h2>
        <p>
          Club Rides generally depart at 09:00 every Sunday, but depending the expected ride duration, length
          and weather, this may vary to between 8:00 and 10:00. Please gather 5-10 minutes prior to the
          published start time to ensure a prompt departure. For additional ride details, bunnyhop over to the{' '}
          <Link to='/route'>route section</Link>
        </p>

        <div>
          <p>The Sunday Club Ride will depart from outside of:</p>
          <div className='flex flex-col'>
            <span>Munson’s Coffee and Eats</span>
            <span>73 St Mary's Rd, London W5 5RG</span>
          </div>
          <p>
            Our rides are open to all members of Club. With prior agreement we do permit guest riders to join
            Club Rides. Please head over to the clubs{' '}
            <a href='https://www.saddledrunk.cc/contact'>official site</a> to register interest.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
