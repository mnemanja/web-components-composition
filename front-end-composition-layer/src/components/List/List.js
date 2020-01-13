import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  listContainer: {
    width: '30%',
    border: '1px solid #ccc',
    marginRight: '10px',
    backgroundColor: '#fff',

    emptyContainer: {
      padding: 20,
    },
    missingData: {
      textAlign: 'center',
      padding: 20,
    },
  },
};

export class List extends Component {
  state = {
    componentExists: false,
  };

  listComponentEl;

  async componentDidMount() {
    this.setState((state) => ({ ...state, componentExists: true }));

    try {
      await fetch(this.context.listService);

      /**
       * Attach event listeners
       */
      this.listComponentEl &&
        this.listComponentEl.addEventListener(window.eventsList.selectListItem, this.handleSelectedTreeItemEvent);
      this.listComponentEl &&
        this.listComponentEl.addEventListener(
          window.eventsList.updateUnitDetailsFinished,
          this.handleTreeItemUpdatedSuccessfullyEvent,
        );
    } catch (err) {
      console.log(err);
      this.setState((state) => ({ ...state, componentExists: false }));
    }
  }

  componentWillUnmount() {
    /**
     * Detach event listeners
     */
    this.listComponentEl &&
      this.listComponentEl.removeEventListener(window.eventsList.selectListItem, this.handleSelectedTreeItemEvent);
    this.listComponentEl &&
      this.listComponentEl.removeEventListener(
        window.eventsList.updateUnitDetailsFinished,
        this.handleTreeItemUpdatedSuccessfullyEvent,
      );
  }

  /****** Custom methods ******/
  handleSelectedTreeItemEvent = (event) => {
    if (event instanceof CustomEvent) {
      this.props.selectListItem(event.detail.selectedListId);
    }
  };

  handleTreeItemUpdatedSuccessfullyEvent = () => {
    this.props.listUpdatedFinished();
  };

  /****** Render ******/
  render() {
    const { classes, listUpdated, selectedListId } = this.props;

    console.log(this.state.componentExists);

    return this.state.componentExists ? (
      <Fragment>
        <h1>List component</h1>
        <list-component
          ref={(refs) => (this.listComponentEl = refs)}
          list-updated={listUpdated}
          inherited-selected-item={selectedListId}
          first="test"
          last="'Don't call me a framework' JS"
        />
      </Fragment>
    ) : (
      <div className="list-container empty-container">Please start the list service</div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
};

List.contextTypes = {
  listService: PropTypes.string,
};

const mapState = (state) => {
  return {
    listUpdated: state.list.listUpdated,
    selectedListId: state.list.selectedListId,
  };
};

const mapDispatch = ({ list }) => {
  return {
    selectListItem: (id) => {
      list.selectListItem(+id);
    },
    listUpdatedFinished: list.listUpdatedFinished,
  };
};

export default withStyles(styles)(connect(mapState, mapDispatch)(List));
