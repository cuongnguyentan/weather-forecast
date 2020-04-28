import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import AutocompleteInput from 'components/AutocompleteInput';
import locationService from 'services/location';

import './App.scss';

function App() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!query) return;

    const loadCities = async () => {
      try {
        const res = await locationService.search(query) || [];
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', res);
        setCities(res);
      } catch(e) {
        console.log(e);
      }
    };

    loadCities();
  }, [query]);

  return (
    <div id="app">
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
      />
    </div>
  );
}

export default App;
