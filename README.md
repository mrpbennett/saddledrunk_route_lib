# 🚴🏼‍♂️ Saddledrunk Route library

This is a route library of sorts. It's a website that allows users to upload their favourite routes allowing them to share them with the whole your cycling club.

The rides are uploaded via a [Contentful](https://www.contentful.com) then populated into the site via the [Strava API](https://developers.strava.com). 

To upload a site the user is only required to enter 5 bits of information via Contentful. 

- Ride Name
- Ride Type (Road, MTB, Gravel etc)
- Destination (the turning point or endpoint)
- Rating (1 out of 5) This rating is yet to be determined what it means... enjoyment/difficulty for example
- Route ID (the number at the end of the url) 

The rest is populated via the Strava API.


## The Route page

![route page]('./img/route.png')

Everything in the above is populated via the Strava API. The map is generated using the [Google Static Map API](https://developers.google.com/maps/documentation/maps-static/overview) and the `polyline` from the API.

One thing I have heard, whilst building this project was, that it would be nice to have the ability for non-Strava users to download the gpx file. 

The site allows for that via an [Axios](https://www.npmjs.com/package/axios) request to the Strava API.

```javascript
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
```

The user would just have to click the "Get GPX" button and it downloads the file to their computer.

## ToDo

- [ ] Add an [Algolia](https://www.algolia.com) search function allowing users to search through the list
- [ ] Finailise on what the route list should look like