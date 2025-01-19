import React from 'react';
import { BottomBar, TopBar } from '../components';

const Saved = () => {
  return (
    <>
      <TopBar
        title="# Saved"
        showTags showHamburger={true} />

      <BottomBar />
    </>
  );
};

export default Saved;
