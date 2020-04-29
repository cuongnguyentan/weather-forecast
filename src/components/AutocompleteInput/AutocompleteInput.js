import React, { useState, useEffect, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

import './AutocompleteInput.scss';

const MODES = {
  LABEL_INLINE: 'label-inline'
};

let bounceTimeout;

const AutocompleteInput = forwardRef(({
  disabled,
  label,
  className,
  name,
  placeholder,
  onInput,
  onSelect,
  icon: Icon,
  mode,
  value,
  tapToClear,
  bounce,
  autocompleteItems
}, ref) => {
  const inputRef = useRef(null);
  const labelRef = useRef(null);

  const [validateMessage, setValidateMessage] = useState('');
  const [value_, setValue] = useState(value);
  const [isFocus, setFocus] = useState(false);
  const [placeholder_, setPlaceholder] = useState(placeholder);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const inputClass = classNames({
    disabled,
    'autocomplete-input': true,
    input: true,
    [mode]: true,
    error: !!validateMessage,
    [className]: true,
    hasIcon: !!Icon
  });

  const labelClass = classNames({
    label: true,
    placeholder: ((mode === MODES.LABEL_INLINE) && !value_ && !isFocus)
  });

  const handleClickLabel = () => {
    setFocus(true);
    inputRef.current.focus();
  };

  const select = (val) => {
    onSelect(val);
    setShowAutocomplete(false);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    const f = () => {
      onInput(value_);
    };

    if (bounce) {
      if (bounceTimeout) {
        clearTimeout(bounceTimeout);
      }

      bounceTimeout = setTimeout(f, +bounce);
    } else {
      f();
    }
  }, [value_, onInput, bounce]);

  useEffect(() => {
    if (mode !== MODES.LABEL_INLINE) {
      setPlaceholder(placeholder);
    }
  }, [placeholder, mode]);

  useEffect(() => {
    if (mode === MODES.LABEL_INLINE) {
      setPlaceholder('');
    }
  }, [mode]);

  useEffect(() => {
    if (!autocompleteItems || !autocompleteItems.length) {
      setValidateMessage('NOT_FOUND');
    } else {
      setValidateMessage('');
      setShowAutocomplete(true);
    }
  }, [autocompleteItems]);

  return (
    <div className={inputClass} ref={ref}>
      { !!label && (
        <div className={labelClass} role="presentation" onClick={() => handleClickLabel()} onBlur={() => setFocus(false)} ref={labelRef}>
          {label}
        </div>
      ) }
      <input
        ref={inputRef}
        disabled={disabled}
        name={name}
        type="text"
        placeholder={placeholder_}
        value={value_}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />

      { !!Icon && !tapToClear && (
        <Icon />
      )}
      { tapToClear && <FontAwesomeIcon className="tap-to-clear" icon={faBackspace} onClick={() => setValue('')} /> }

      { !!validateMessage && <div className="msg">{validateMessage}</div> }

      { showAutocomplete && !!autocompleteItems && !!autocompleteItems.length && (
        <div className="autocomplete">
          <ul>
            { autocompleteItems.map((item) => (
              <li key={item.value} onClick={() => select(item.value)}>{item.text}</li>
            )) }
          </ul>
        </div>
      ) }
    </div>
  );
});

AutocompleteInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onInput: PropTypes.func,
  onSelect: PropTypes.func,
  icon: PropTypes.elementType,
  mode: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  tapToClear: PropTypes.bool,
  className: PropTypes.string,
  bounce: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  autocompleteItems: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    text: PropTypes.string
  }))
};

AutocompleteInput.defaultProps = {
  disabled: false,
  label: '',
  placeholder: '',
  onInput: () => {},
  onSelect: () => {},
  icon: null,
  mode: 'text-input',
  value: '',
  name: '',
  tapToClear: false,
  className: '',
  bounce: 0,
  autocompleteItems: []
};

export default AutocompleteInput;
