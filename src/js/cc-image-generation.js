import * as chroma from 'chroma-js';
import store from './store';

const getAverageImageColor = image => {

};

// Genera
const generateCorrectionImage = (colors, itemHeight) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const CCItems = store.state.CCItems;
  const exportHeight = CCItems.length * itemHeight;


  // Get each correction item from state
  CCItems.forEach(item => {
    const referenceColor = chroma(item.color).lab();
    const correctionColorHex = getAverageImageColor(item.image);
    const correctionColor = chroma(CCColorHex).lab();
    const correctionColorAdjusted = [referenceColor[0], correctionColor[1], correctionColor[2]]; // Color with correct lightness
  });
};
