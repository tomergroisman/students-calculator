import Add from './Add';
import Delete from './Delete';
import './TextInput.scss';

/**
 * Clear the displayed text
 * @param stateModifier - State modifier function
 */
export const clearText = (stateModifier: Function) => {
  stateModifier("");
}

const TextInput = {
  Add,
  Delete
}


export default TextInput;