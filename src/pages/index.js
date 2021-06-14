import * as React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Card from '../components/card/card';

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

        <div className='mt-10'>
          <Card />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
