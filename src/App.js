import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import AutocompleteInput from 'components/AutocompleteInput';

import './App.scss';

function App() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  return (
    <div id="app">
      <h1>{t('WEATHER_FORECAST')}</h1>

      <AutocompleteInput
        value={query}
        label={t('SEARCH_FOR_CITY')}
        mode="label-inline"
        icon={() => (<FontAwesomeIcon icon={faSearch} />)}
        tapToClear
      />
    </div>
  );
}

export default App;
