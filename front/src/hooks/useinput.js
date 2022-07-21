import React, { useState, useCallback } from 'react';

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.checked);
    console.log(e.target.checked);
  }, []);
  return [value, handler];
};