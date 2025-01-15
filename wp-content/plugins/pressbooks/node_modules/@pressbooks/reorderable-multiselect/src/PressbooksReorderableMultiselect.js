import { html, css, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export class PressbooksReorderableMultiselect extends LitElement {
  static get styles() {
    return css`
      :host {
        font-size: var(--pb-multiselect-font-size, 1rem);
      }

      * {
        box-sizing: border-box;
      }

      .visually-hidden {
        height: 1px;
        overflow: hidden;
        position: absolute;
        width: 1px;
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        font-size: 14px;
        white-space: nowrap;
      }

      label {
        color: var(--pb-label-color, #000);
        display: block;
        font-family: var(
          --pb-label-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen-Sans,
          Ubuntu,
          Cantarell,
          'Helvetica Neue',
          sans-serif
        );
        font-size: var(--pb-label-font-size, 0.8125rem);
        font-weight: var(--pb-label-font-weight, 600);
        line-height: var(--pb-label-font-size, 0.7222);
        margin: var(--pb-label-margin, 0.3125rem 0);
      }

      .hint {
        font-size: var(--pb-hint-font-size, 0.6875rem);
        margin-bottom: var(--pb-hint-margin-bottom, 0);
        margin-top: var(--pb-hint-margin-top, 0.1875rem);
      }

      button {
        align-items: center;
        appearance: none;
        background: var(--pb-button-secondary-background, #f6f7f7);
        border: var(--pb-button-secondary-border, 1px #d4002d solid);
        border-radius: var(--pb-button-border-radius, 3px);
        color: var(--pb-button-secondary-color, #d4002d);
        cursor: pointer;
        display: inline-flex;
        font-family: var(
          --pb-button-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen-Sans,
          Ubuntu,
          Cantarell,
          'Helvetica Neue',
          sans-serif
        );
        font-size: var(--pb-button-font-size, 13px);
        gap: var(--pb-button-gap, 0.125em);
        line-height: var(--pb-button-line-height, 2.15384615);
        margin: 0;
        min-height: var(--pb-button-min-height, 30px);
        padding: var(--pb-button-padding, 0 10px);
        text-decoration: none;
        white-space: nowrap;
      }

      button:hover {
        background: var(--pb-button-secondary-background-hover, #f0f0f1);
        border-color: var(--pb-button-secondary-border-color-hover, #a10022);
        color: var(--pb-button-secondary-color-hover, #a10022);
      }

      button:focus {
        border-color: var(--pb-button-secondary-border-color-focus, #ff083c);
        box-shadow: var(
          --pb-button-secondary-box-shadow-focus,
          0 0 0 1px #ff083c
        );
        color: var(--pb-button-secondary-color-focus, #6e0017);
        outline: var(
          --pb-button-secondary-outline-focus,
          2px solid transparent
        );
        outline-offset: 0;
      }

      button:active {
        background: var(--pb-button-secondary-background-active, #f6f7f7);
        border-color: var(--pb-button-secondary-border-color-active, #7e8993);
        box-shadow: none;
        color: var(--pb-button-secondary-color-active, #262a2e);
      }

      button:disabled,
      button:disabled:hover {
        background: var(--pb-button-secondary-background, #f6f7f7);
        border-color: var(--pb-button-secondary-colr-disabled, #dcdcde);
        color: var(--pb-button-secondary-colr-disabled, #a7aaad);
        cursor: default;
      }

      select {
        -webkit-appearance: none;
        background: #fff
          url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%206l5%205%205-5%202%201-7%207-7-7%202-1z%22%20fill%3D%22%23555%22%2F%3E%3C%2Fsvg%3E)
          no-repeat right 0.3125rem top 55%;
        background-size: 1rem 1rem;
        border-color: #8c8f94;
        border-radius: 0.1875rem;
        box-shadow: none;
        color: #2c3338;
        cursor: pointer;

        font-size: 0.875rem;
        line-height: 2;
        margin: 0.1875rem 0.5rem 0.1875rem 0;
        max-width: 25rem;
        min-height: 1.875rem;
        min-width: 12.5rem;
        padding: 0 0.5rem;
        width: 100%;
      }

      select:focus {
        border-color: #d4002d;
        outline-color: #d4002d;
      }

      .selected-options {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        width: 100%;
      }

      .selected-options-controls {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      [role='listbox'] {
        border: 1px solid var(--pb-listbox-border-color, #8c8f94);
        border-radius: 2px;
        height: auto;
        list-style: none;
        margin: 0;
        max-height: 12rem;
        max-width: var(--pb-selected-options-max-width, 100%);
        overflow-y: scroll;
        padding: 0;
        width: var(--pb-selected-options-width, 66%);
      }

      [role='listbox']:focus-visible {
        border-color: #d4002d;
        outline-color: #d4002d;
      }

      [role='option'] {
        background: var(--pb-listbox-option-background, #fff);
        cursor: default;
        font-family: var(
          --pb-listbox-option-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen-Sans,
          Ubuntu,
          Cantarell,
          'Helvetica Neue',
          sans-serif
        );
        padding: var(--pb-listbox-option-padding, 0.25rem 0.5rem);
      }

      [role='option'][aria-selected='true'] {
        background: var(--pb-listbox-option-background-selected, #d4002d);
        color: var(--pb-listbox-option-color-selected, #fff);
      }
    `;
  }

  static get properties() {
    return {
      messages: { type: Object },
      name: { type: String },
      label: { type: String },
      hint: { type: String },
      listBoxHasFocus: { type: Boolean },
      activeDescendant: { type: String },
      options: { type: Object },
      selectedOptions: { type: Object },
      availableOptions: { type: Object },
      selectedAvailableOption: { type: String },
      actionMessage: { type: String },
      ListboxActions: { type: Object },
      Keys: { type: Object },
    };
  }

  constructor() {
    super();

    this.messages = {};
    this.label = '';
    this.hint = '';
    this.listBoxHasFocus = false;
    this.activeDescendant = null;
    this.options = {};
    this.selectedOptions = {};
    this.availableOptions = {};
    this.selectedAvailableOption = '';
    this.actionMessage = null;
    this.ListboxActions = {
      MoveUp: 'MoveUp',
      MoveDown: 'MoveDown',
      MoveSelectionUp: 'MoveSelectionUp',
      MoveSelectionDown: 'MoveSelectionDown',
      Remove: 'Remove',
    };

    this.Keys = {
      Backspace: 'Backspace',
      Clear: 'Clear',
      Down: 'ArrowDown',
      End: 'End',
      Enter: 'Enter',
      Escape: 'Escape',
      Home: 'Home',
      Left: 'ArrowLeft',
      PageDown: 'PageDown',
      PageUp: 'PageUp',
      Right: 'ArrowRight',
      Space: ' ',
      Tab: 'Tab',
      Up: 'ArrowUp',
    };
  }

  labelTemplate() {
    return html`<label id="${this.name}-label">${this.label}</label>`;
  }

  hintTemplate() {
    return html`<p id="${this.name}-hint" class="hint">${this.hint}</p>`;
  }

  selectedOptionsTemplate() {
    return html` ${Object.keys(this.selectedOptions).map(
        option =>
          html`<input type="hidden" name="${this.name}[]" .value=${option} />`,
      )}
      <ul
        class="selected-options-list"
        role="listbox"
        aria-labelledby="${this.name}-label"
        aria-activedescendant=${ifDefined(this.activeDescendant)}
        tabindex="0"
        @keydown=${this._handleKeydown}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
      >
        ${Object.entries(this.selectedOptions).map(
          option =>
            html`<li
              role="option"
              id=${option[0]}
              aria-selected=${this.activeDescendant === option[0]}
              @click=${this._handleClick}
              @keydown=${this._handleKeydown}
            >
              ${option[1]}
            </li>`,
        )}
      </ul>`;
  }

  availableOptionsTemplate() {
    return html` <select
        id="available-options"
        @change="${this._handleSelectChange}"
        aria-label="${this.messages['Available options'] ??
        'Available options'}"
        ?disabled="${Object.keys(this.availableOptions).length === 0}"
      >
        ${Object.entries(this.availableOptions).map(option =>
          !Object.keys(this.selectedOptions).includes(option)
            ? html`<option value="${option[0]}">${option[1]}</option>`
            : null,
        )}
      </select>
      <button
        type="button"
        class="add"
        @click=${this._handleClick}
        ?disabled="${Object.keys(this.availableOptions).length === 0}"
      >
        ${this.messages.Add ?? 'Add'}
      </button>`;
  }

  selectedOptionsControlsTemplate() {
    return html`
      <div class="selected-options-controls">
        <button
          type="button"
          class="move-up"
          tabindex=${this.activeDescendant ? 0 : -1}
          aria-keyshortcuts="Alt+ArrowUp"
          @click=${this._handleClick}
          ?disabled="${!this.activeDescendant ||
          Object.keys(this.selectedOptions).indexOf(this.activeDescendant) ===
            0}"
        >
          ${this.messages['Move Up'] ?? 'Move Up'}
        </button>
        <button
          type="button"
          class="move-down"
          tabindex=${this.activeDescendant ? 0 : -1}
          aria-keyshortcuts="Alt+ArrowDown"
          @click=${this._handleClick}
          ?disabled="${!this.activeDescendant ||
          Object.keys(this.selectedOptions).indexOf(this.activeDescendant) ===
            Object.keys(this.selectedOptions).length - 1}"
        >
          ${this.messages['Move Down'] ?? 'Move Down'}
        </button>
        <button
          type="button"
          class="remove"
          tabindex=${this.activeDescendant ? 0 : -1}
          @click=${this._handleClick}
          ?disabled="${!this.activeDescendant}"
        >
          ${this.messages.Remove ?? 'Remove'}
        </button>
      </div>
    `;
  }

  liveRegionTemplate() {
    return html`
      <div class="visually-hidden" aria-live="polite">
        ${ifDefined(this.actionMessage)}
      </div>
    `;
  }

  render() {
    return html` ${this.labelTemplate()}
      <div class="selected-options">
        ${this.selectedOptionsTemplate()}
        ${this.selectedOptionsControlsTemplate()}
      </div>
      ${this.availableOptionsTemplate()} ${this.hintTemplate()}
      ${this.liveRegionTemplate()}`;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.dataset.messages) {
      this.messages = JSON.parse(this.dataset.messages);
    }

    this.label = this.querySelector('label').innerText;
    this.hint = this.querySelector('hint').innerText;

    const options = this.querySelectorAll('option');
    const input = this.querySelector('input[type="hidden"]');
    this.name = input.getAttribute('name');

    Array.prototype.forEach.call(options, option => {
      this.options[option.getAttribute('value')] = option.innerText;
    });

    if (input.value) {
      Array.prototype.forEach.call(input.value.split(','), value => {
        this.selectedOptions[value] = this.options[value];
      });
    }

    input.remove();
    this.querySelector('label').remove();
    this.querySelector('hint').remove();
    this.querySelector('select').remove();

    this.updateAvailableOptions();
    this.updateSelectedOptions();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  _handleSelectChange(event) {
    this.selectedAvailableOption = event.target.value;
  }

  _handleFocus() {
    // eslint-disable-next-line prefer-destructuring
    this.activeDescendant = Object.keys(this.selectedOptions)[0];
  }

  _handleKeydown(event) {
    const action = this.getActionFromKey(event);

    switch (action) {
      case this.ListboxActions.MoveUp:
        return this.updateIndex(-1);
      case this.ListboxActions.MoveSelectionUp:
        return this.updateSelectedIndex(-1);
      case this.ListboxActions.MoveDown:
        return this.updateIndex(1);
      case this.ListboxActions.MoveSelectionDown:
        return this.updateSelectedIndex(1);
      default:
        return false;
    }
  }

  _handleClick(event) {
    if (event.target.closest('[role="option"]')) {
      this.activeDescendant = event.target.closest('[role="option"]').id;
    } else if (event.target.closest('.move-up')) {
      this.updateIndex(-1);
    } else if (event.target.closest('.move-down')) {
      this.updateIndex(1);
    } else if (event.target.closest('.remove')) {
      delete this.selectedOptions[this.activeDescendant];
      this.actionMessage = this.messages['Removed $1 from selection']
        ? this.messages['Removed $1 from selection'].replace(
            '$1',
            this.options[this.activeDescendant],
          )
        : `Removed ${this.options[this.activeDescendant]} from selection`;
      this.updateAvailableOptions();
      this.activeDescendant = null;
    } else if (event.target.closest('.add')) {
      this.selectedOptions[this.selectedAvailableOption] =
        this.options[this.selectedAvailableOption];
      this.actionMessage = this.messages['Added $1 to selection']
        ? this.messages['Added $1 to selection'].replace(
            '$1',
            this.options[this.activeDescendant],
          )
        : `Added ${this.options[this.activeDescendant]} to selection`;
      this.updateAvailableOptions();
    }

    this.updateSelectedOptions();
  }

  getActionFromKey(event) {
    const { key, altKey } = event;

    if (key === this.Keys.Down && altKey) {
      return this.ListboxActions.MoveDown;
    }

    if (key === this.Keys.Down) {
      return this.ListboxActions.MoveSelectionDown;
    }

    if (key === this.Keys.Up && altKey) {
      return this.ListboxActions.MoveUp;
    }

    if (key === this.Keys.Up) {
      return this.ListboxActions.MoveSelectionUp;
    }

    return false;
  }

  updateSelectedOptions() {
    const existingInput = this.querySelector('input');
    if (!existingInput) {
      const value = document.createElement('input');
      value.setAttribute('type', 'hidden');
      value.setAttribute('name', `${this.name}[]`);
      value.setAttribute('value', Object.keys(this.selectedOptions).join(','));
      this.appendChild(value);
    } else {
      existingInput.setAttribute(
        'value',
        Object.keys(this.selectedOptions).join(','),
      );
    }
  }

  updateAvailableOptions() {
    this.availableOptions = Object.keys(this.options).reduce((acc, key) => {
      if (!Object.prototype.hasOwnProperty.call(this.selectedOptions, key)) {
        acc[key] = this.options[key];
      }
      return acc;
    }, {});

    // eslint-disable-next-line prefer-destructuring
    this.selectedAvailableOption = Object.keys(this.availableOptions)[0];
  }

  updateIndex(delta) {
    const list = Object.entries(this.selectedOptions);

    const srcIndex = Object.keys(this.selectedOptions).indexOf(
      this.activeDescendant,
    );

    const destIndex = srcIndex + delta;

    if (destIndex >= 0 && destIndex < list.length) {
      const item = list.splice(srcIndex, 1)[0];
      list.splice(destIndex, 0, item);
    }

    this.selectedOptions = Object.fromEntries(list);

    this.actionMessage = this.messages['Moved to position $1']
      ? this.messages['Moved to position $1'].replace('$1', destIndex + 1)
      : `Moved to position ${destIndex + 1}`;
  }

  updateSelectedIndex(delta) {
    const list = Object.entries(this.selectedOptions);

    const srcIndex = Object.keys(this.selectedOptions).indexOf(
      this.activeDescendant,
    );

    const destIndex = srcIndex + delta;

    if (destIndex >= 0 && destIndex < list.length) {
      this.activeDescendant = Object.keys(this.selectedOptions)[destIndex];
    }
  }

  setFocus(hasFocus) {
    this.listBoxHasFocus = hasFocus;
  }
}
