// Copyright 2019 The Google Research Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Provide util functions.
 *
 * The toggle/hide/show element functions are not used in the whole
 * code, since the code is rather straight forward and can be written directly.
 * However, using these functions is preferred sometimes to improve readability,
 * when there are many elements being hidden or shown.
 */

goog.module('eeg_modelling.eeg_viewer.utils');

const HtmlSanitizer = goog.require('goog.html.sanitizer.HtmlSanitizer');
const JspbMap = goog.require('jspb.Map');
const dom = goog.require('goog.dom');

/**
 * @typedef {{
 *   componentHandler: {
 *     upgradeElement: function(!Element):void,
 *   },
 * }}
 */
let MDLEnhancedWindow;

/**
 * @typedef {{
 *   MaterialCheckbox: {
 *     check: function():void,
 *     uncheck: function():void,
 *   },
 * }}
 */
let MaterialCheckboxElement;


/**
 * Hides or shows an HTML element.
 * @param {string} elementId HTML Id of the element.
 * @param {boolean} hide Whether to hide or show the element.
 */
function toggleElement(elementId, hide) {
  const element = document.getElementById(elementId);
  element.classList.toggle('hidden', hide);
}

/**
 * Hides an HTML element.
 * @param {string} elementId HTML Id of the element.
 */
function hideElement(elementId) {
  toggleElement(elementId, true);
}

/**
 * Shows an HTML element.
 * @param {string} elementId HTML Id of the element.
 */
function showElement(elementId) {
  toggleElement(elementId, false);
}


/**
 * Hides or show a Material Design Lite spinner.
 * @param {string} elementId HTML Id of the spinner.
 * @param {boolean} hide Whether to hide or show the spinner.
 */
function toggleMDLSpinner(elementId, hide) {
  const element = document.getElementById(elementId);
  element.classList.toggle('hidden', hide);
  element.classList.toggle('is-active', !hide);
}

/**
 * Shows a spinner.
 * @param {string} elementId HTML Id of the spinner.
 */
function showMDLSpinner(elementId) {
  toggleMDLSpinner(elementId, false);
}

/**
 * Hides a spinner.
 * @param {string} elementId HTML Id of the spinner.
 */
function hideMDLSpinner(elementId) {
  toggleMDLSpinner(elementId, true);
}


/**
 * Run MDL function upgradeElement on a HTML Element.
 * Run this function on any MDL element created in JS, to enable all MDL
 * functionalities. The element must be inserted in the DOM before calling this
 * function.
 * @param {!Element} element Element to upgrade.
 */
function upgradeMDLElement(element) {
  const mdlCastWindow = /** @type {!MDLEnhancedWindow} */ (window);
  mdlCastWindow.componentHandler.upgradeElement(element);
}

/**
 * Add a MDL tooltip element to display on hover of a target element.
 * @param {!Element} parentElement HTML element to add the tooltip element.
 *     Must be inserted in the DOM before calling this function
 * @param {string} targetId HTML id of the element targeted by the tooltip.
 * @param {string} tooltipText Text to display on the tooltip. HTML is allowed.
 */
function addMDLTooltip(parentElement, targetId, tooltipText) {
  const tooltip = document.createElement('div');
  tooltip.setAttribute('for', targetId);
  tooltip.className = 'mdl-tooltip mdl-tooltip--large';
  dom.safe.setInnerHtml(tooltip, HtmlSanitizer.sanitize(tooltipText));
  parentElement.appendChild(tooltip);

  upgradeMDLElement(tooltip);
}


/**
 * Check or uncheck a MDL checkbox element.
 * See here for MDL checkbox definition:
 * https://getmdl.io/components/#toggles-section
 * @param {!Element} labelElement Label element container of the checkbox.
 * @param {boolean} checked Indicates if should be checked or unchecked.
 */
function toggleMDLCheckbox(labelElement, checked) {
  const labelMDL = /** @type {!MaterialCheckboxElement} */ (labelElement);
  if (checked) {
    labelMDL.MaterialCheckbox.check();
  } else {
    labelMDL.MaterialCheckbox.uncheck();
  }
}

/**
 * Return the keys of a proto map.
 * @param {!JspbMap} protoMap map to extract the keys from.
 * @return {!Array<string>} Array with Map keys
 */
function getProtoMapKeys(protoMap) {
  const keys = [];
  const keyIter = protoMap.keys();
  let key = keyIter.next();
  while (!key.done) {
    keys.push(key.value);
    key = keyIter.next();
  }
  return keys;
}


exports = {
  toggleElement,
  hideElement,
  showElement,
  toggleMDLSpinner,
  showMDLSpinner,
  hideMDLSpinner,
  upgradeMDLElement,
  addMDLTooltip,
  toggleMDLCheckbox,
  getProtoMapKeys,
};
