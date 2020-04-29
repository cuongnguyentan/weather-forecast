const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const cors = require('@koa/cors');

const port = process.env.SERVICE_PORT || 8000;
const apiRoot = process.env.WEATHER_API_ROOT || 'https://www.metaweather.com/api';

const app = new Koa();
const router = new Router();

app.use(cors());

const search = async (ctx) => {
  const { term } = ctx.request.query;

  const res = await axios.get(`${apiRoot}/location/search/?query=${term}`);
  const cities = res.data.filter((item) => item.location_type.toLowerCase() === 'city');

  ctx.body = cities.map(({ title, woeid, latt_long }) => { // eslint-disable-line camelcase
    const coorsArr = latt_long.split(/,\s*/);
    const coors = {
      latt: parseFloat(coorsArr[0]),
      long: parseFloat(coorsArr[1])
    };

    return {
      title,
      woeid,
      coors
    };
  });
};

router.get('/cities', search);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server up: http://localhost:${port}`); // eslint-disable-line no-console
});
