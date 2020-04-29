import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

import AutocompleteInput from 'components/AutocompleteInput';
import locationService from 'services/location';

import './App.scss';

function App() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);

  useEffect(() => {
    if (!query) return;

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

        { !!city && (
          <Row className="forecast">
            <Col xs={12} md={4}>
              <div className="info">
                <h4>Wednesday - 29 Apr, 2020</h4>
                <p>placeholder</p>
              </div>
            </Col>
          </Row>
        ) }
      </Container>
    </div>
  );
}

export default App;
