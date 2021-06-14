import React, { useState } from 'react';
import './card.scss';
import img from './strava.png';

const Card = () => {
  const cardData = [
    {
      imgUrl:
        'https://images.squarespace-cdn.com/content/v1/5bc434afe5f7d17e4e03dd45/1541775412102-F3UN4NCCNXRM7FMJFJ94/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/simon-connellan-462404-unsplash.jpg',
      linkType: 'external',
      title: 'Saddledrunk official site',
      text: 'Head over to the official Saddledrunk website for more information.',
      url: 'https://www.saddledrunk.cc/',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1454784344663-cf4ccb334c52?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2253&q=80',
      linkType: 'internal',
      title: 'SD route library',
      text: 'Explore the favourite routes of Saddledrunk.',
      url: '/route',
    },
    {
      imgUrl: img,
      linkType: 'external',
      title: 'Saddledrunk members Strava club',
      text: 'If you are not already, become a member of our Strava club.',
      url: 'https://www.strava.com/clubs/saddledrunk-cc',
    },
  ];

  return (
    <div className='cardContainer'>
      {cardData.map((card) => (
        <a href={card.url}>
          <div className='card hover:bg-gray-100'>
            <img src={card.imgUrl} />
            <div className='cardInner'>
              <div className='cardInfoTop deemphasise'>{card.linkType} link</div>

              <h4>{card.title}</h4>

              <div className='cardInfoMiddle'>
                <span>{card.text}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Card;
