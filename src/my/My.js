import React from 'react';
import { BottomBar, TopBar } from '../components';

const My = () => {
  return (
    <>
      <TopBar showSearchAndFilter={true} />

      <BottomBar />
    </>
  );
};

export default My;
