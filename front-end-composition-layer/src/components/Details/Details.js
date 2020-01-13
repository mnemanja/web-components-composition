import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Details extends React.Component {
  state = {
    componentExists: false,
  };

  detailsElement;

  async componentDidMount() {
    this.setState((state) => ({ ...state, componentExists: true }));
    try {
      await fetch(this.context.listService);

      /**
       * Attach event listeners
       */
      this.detailsElement &&
        this.detailsElement.addEventListener(
          window.eventsList.updateUnitDetailsSucceeded,
          this.handleListItemUpdatedEvent,
        );
    } catch (err) {
      this.setState((state) => ({ ...state, componentExists: false }));
    }
  }

  componentWillUnmount() {
    /**
     * Detach event listeners
     */
    this.detailsElement &&
      this.detailsElement.removeEventListener(
        window.eventsList.updateUnitDetailsSucceeded,
        this.handleListItemUpdatedEvent,
      );
  }

  /****** Custom methods ******/
  handleListItemUpdatedEvent = () => {
    this.props.updateTheList();
  };

  /****** Render ******/
  render() {
    let { selectedListId } = this.props;

    return this.state.componentExists ? (
      <details-component
        class="details-container"
        ref={(refs) => (this.detailsElement = refs)}
        selected-list-id-source={selectedListId}
      />
    ) : (
      <div className="details-container empty-container">Please start the directory service</div>
    );
  }
}

Details.contextTypes = {
  listService: PropTypes.string,
};

const mapState = ({ list }) => {
  return {
    selectedListId: list.selectedListId,
  };
};

const mapDispatch = ({ list }) => {
  return {
    updateTheList: list.updateTheList,
  };
};

export default connect(mapState, mapDispatch)(Details);
