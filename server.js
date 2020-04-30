const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const cors = require('@koa/cors');
const moment = require('moment');

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

const forecast = async (ctx) => {
  const { id } = ctx.params;

  let next = moment();
  const days = Array(6).fill(0).map(() => {
    const d = next.format('YYYY/MM/DD');
    next = next.add(1, 'days');

    return d;
  });

  const promises = [];
  for (let i = 0; i < days.length; i += 1) {
    promises.push(new Promise((resolve) => {
      const loadData = async () => {
        try {
          const res = await axios.get(`${apiRoot}/location/${id}/${days[i]}`);
          const info = res.data.sort((a, b) => (a.predictability - b.predictability))[0];
          const { applicable_date: date, min_temp: min, max_temp: max } = info;
          resolve({ date, min, max });
        } catch (e) {
          resolve({
            date: days[i].replace(/\//g, '-'),
            min: null,
            max: null
          });
        }
      };

      loadData();
    }));
  }

  const results = await Promise.all(promises);
  ctx.body = results;
};

router.get('/cities', search);
router.get('/cities/:id/forecast', forecast);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server up: http://localhost:${port}`); // eslint-disable-line no-console
});
