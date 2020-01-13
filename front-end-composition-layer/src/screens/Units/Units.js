import * as React from 'react';

import List from '../../components/List/List';
import Details from '../../components/Details/Details';

class Units extends React.Component {
  render() {
    return (
      <section>
        <List />
        <Details />
      </section>
    );
  }
}

export default Units;
