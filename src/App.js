import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';

import AutocompleteInput from 'components/AutocompleteInput';
import locationService from 'services/location';

import './App.scss';

function App() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [cityName, setCityName] = useState('');
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    if (!query) {
      setCities([]);
      return;
    }

    const loadCities = async () => {
      try {
        const data = await locationService.search(query);

        if (data && data.length) {
          const items = data.map((item) => ({
            value: item.woeid,
            text: item.title
          }));

          setCities(items);
        } else {
          setCities([]);
        }
      } catch(e) {
        console.log(e);
      }
    };

    loadCities();
  }, [query]);

  useEffect(() => {
    if (!city) {
      setForecasts([]);
      return;
    }

    const loadForecasts = async () => {
      try {
        const data = await locationService.forecast(city);

        if (data && data.length) {
          setForecasts(data);
        } else {
          setForecasts([]);
        }
      } catch(e) {
        console.log(e);
      }
    };

    loadForecasts();
  }, [city, cities]);

  useEffect(() => {
    if (!cities || !cities.length) return;
    if (!city) {
      setCityName('');
    }

    const cc = cities.find((c) => c.value === city);
    setCityName(cc ? cc.text : '');
  }, [city, cities]);

  return (
    <div id="app">
      <Container>
        <h1>{t('WEATHER_FORECAST')}</h1>

        <AutocompleteInput
          value={query}
          label={t('SEARCH_FOR_CITY')}
          mode="label-inline"
          icon={() => (<FontAwesomeIcon icon={faSearch} />)}
          tapToClear
          bounce={500}
          onInput={(q) => setQuery(q)}
          autocompleteItems={cities}
          onSelect={(c) => setCity(c)}
        />

        { !!city && !!forecasts.length && (
          <div className="forecast">
            <h2 dangerouslySetInnerHTML={{ __html: t('WEATHER_FORECAST_FOR_CITY', { city: cityName }) }} />
            <Row>
              { forecasts.map((forecast) => (
                <Col xs={12} md={4} key={forecast.date} className="info-wrapper">
                  <div className="info">
                    <p>{ moment(forecast.date).format('ddd, DD MMM, YYYY') }</p>
                    <h4>{`${forecast.min.toFixed(1)} - ${forecast.max.toFixed(1)} °C`}</h4>
                  </div>
                </Col>
              )) }
            </Row>
          </div>
        ) }
      </Container>
    </div>
  );
}

export default App;
