import React from 'react';
import { props, emit } from 'skatejs';

import { mui } from '../utils/dependencies/dependenciesHandler';
import ReactComponentWithoutShadowRoot from '../utils/ReactComponentWithoutShadowRoot';
import { getOne, putOne } from '../utils/api/fetchData';

const style = {
  formActionsContainer: {
    textAlign: 'right',
  },
};

/**
 * Node details component
 */
export default class App extends ReactComponentWithoutShadowRoot {
  state = {
    library: {},
    selectedListId: 0,
    fields: {
      name: '',
      reportField: '',
    },
  };

  /**
   * Define attributes to observe together with their types
   * Attributes are written in dash-separated manner "some-useful-attribute" and
   * internally transformed into camel-case version of it "someUsefulAttribute"
   * @returns {{selectedListIdSource}}
   */
  static get props() {
    return {
      selectedListIdSource: props.number,
    };
  }

  /**
   * Handles the element connected callback
   * @returns {Promise<void>}
   */
  async connectedCallback() {
    console.log(this);
    this.state = {
      ...this.state,
      library: await mui(['TextField', 'Button'], window.MUI),
      selectedListId: this.selectedListIdSource,
    };

    let fields = { ...this.state.fields };
    try {
      fields = await getOne(this.selectedListIdSource);
    } catch (err) {
      console.log(err);
    }

    this.state = {
      ...this.state,
      fields,
    };
  }

  async attributeChangedCallback(attr, prevVal, nextVal) {
    console.log(attr === 'selected-list-id-source' && prevVal, attr, nextVal, prevVal);
    if (attr === 'selected-list-id-source' && prevVal) {
      let fields = { ...this.state.fields };
      try {
        fields = await getOne(nextVal);
      } catch (err) {
        console.log(err);
      }

      this.state = {
        ...this.state,
        fields,
      };
    }
  }

  /**
   * Updates the state upon the field change
   * @param e
   */
  handleFieldChange = (e) => {
    this.state = {
      ...this.state,
      fields: {
        ...this.state.fields,
        [e.target.id]: e.target.value,
      },
    };
  };

  /**
   * Save the changes and notify the composition layer
   * @returns {Promise<void>}
   */
  saveChanges = async () => {
    try {
      const data = await putOne(this.state.fields);

      emit(this, window.eventsList.updateUnitDetailsSucceeded, {
        detail: {
          details: data,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { TextField, Button } = this.state.library;

    return (
      <div>
        <form>
          {TextField && (
            <div>
              <TextField
                id="name"
                label="Name"
                placeholder="Please enter the node's name"
                value={this.state.fields.name}
                onChange={this.handleFieldChange}
                margin="normal"
                autoComplete="off"
                fullWidth
              />

              <TextField
                id="reportField"
                label="Reports"
                placeholder="Please enter the node's report information"
                value={this.state.fields.reportField}
                onChange={this.handleFieldChange}
                margin="normal"
                autoComplete="off"
                fullWidth
              />
            </div>
          )}

          {Button && (
            <div style={style.formActionsContainer}>
              <Button variant="raised" color="secondary" onClick={this.saveChanges}>
                Save changes
              </Button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

customElements.define('details-component', App);
