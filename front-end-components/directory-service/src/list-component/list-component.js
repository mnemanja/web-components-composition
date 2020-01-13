import React from 'react';
import { props, emit } from 'skatejs';
import { mui } from '../utils/dependencies/dependenciesHandler';
import ReactComponentWithoutShadowRoot from '../utils/ReactComponentWithoutShadowRoot';
import { getAll } from '../utils/api/fetchData';

class App extends ReactComponentWithoutShadowRoot {
  state = {
    library: {},
    listItems: [],
    localSelectedItem: 0,
  };

  static get props() {
    return {
      listUpdated: props.boolean,
      inheritedSelectedItem: props.number,
    };
  }

  async connectedCallback() {
    this.state = {
      ...this.state,
      library: await mui(['List', 'ListItem', 'ListItemIcon', 'ListItemText', 'Divider'], window.MUI),
      localSelectedItem: this.inheritedSelectedItem,
    };

    let listItems = [...this.state.listItems];

    try {
      listItems = await getAll();
    } catch (err) {
      console.log(err);
    }

    this.state = {
      ...this.state,
      listItems,
    };

    emit(this, window.eventsList.selectListItem, {
      detail: {
        selectedListId: this.state.localSelectedItem,
      },
    });
  }

  async attributeChangedCallback(attr, prevVal, nextVal) {
    if (attr === 'list-updated' && nextVal) {
      let listItems = [...this.state.listItems];

      try {
        listItems = await getAll();
      } catch (err) {
        console.log(err);
      }

      this.state = {
        ...this.state,
        listItems,
      };

      emit(this, window.eventsList.updateUnitDetailsFinished, {
        status: true,
      });
    }

    if (attr === 'inherited-selected-item') {
      this.state = {
        ...this.state,
        localSelectedItem: nextVal,
      };
    }
  }

  handleClick = (selectedListId) => () => {
    emit(this, window.eventsList.selectListItem, {
      detail: {
        selectedListId,
      },
    });
  };

  render() {
    const { List, ListItem, ListItemText, Divider } = this.state.library;
    const Aux = (props) => props.children;

    return (
      <div className="list-component">
        {List && (
          <List component="nav">
            {this.state.listItems.length ? (
              this.state.listItems.map((item, key, arr) => {
                return (
                  <Aux key={item.id}>
                    <ListItem
                      button
                      id={item.id}
                      className={Number(this.state.localSelectedItem) === Number(item.id) ? 'selected-item' : ''}
                      onClick={this.handleClick(item.id)}>
                      <ListItemText primary={item.name} />
                    </ListItem>

                    {key !== arr.length - 1 && <Divider />}
                  </Aux>
                );
              })
            ) : (
              <div className="missing-data">There is currently no data to be displayed</div>
            )}
          </List>
        )}
      </div>
    );
  }
}

customElements.define('list-component', App);
