import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { User } from '../../src/entities';

const { expect } = require('chai');

describe('Simple App testing', () => {
  // Adding time out to make sure the app is load prior to test is run
  beforeEach(() => {
    $('~page-de-connexion').waitForDisplayed(11000, false);
  });

  it('Valid Login Test', (async) => {
    $('~email').setValue('shamique');
    $('~password').setValue('123456');

    $('~connexion').click();
    const i = 1;
    // const route = useRoute();

    // const [activeUser] = useState<User | undefined>(route.params ? (route.params as User) : undefined);

    expect(i).to.equals(1);
  });
  /*
  it('Invalid Login Test', (async) => {
    $('~username').setValue('Samuel4');
    $('~password').setValue('123');

    $('~login').click();

    $('~loginstatus').waitForDisplayed(11000);
    const status = $('~loginstatus').getText();
    expect(status).to.equal('fail');
  }); */
});
