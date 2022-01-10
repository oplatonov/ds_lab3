const { loadImage } = require('canvas');
const path = require('path');
const { openCV, outputImg } = require('../openCV');
const { conditionalDilation } = require('./conditionalDilation');
const { skeleton } = require('./skeleton');

(async () => {
  await openCV();

  const mat = new cv.Mat();
  const ksize = new cv.Size(10, 10);
  const anchor = new cv.Point(-1, -1);
  const element = cv.getStructuringElement(cv.MORPH_ELLIPSE, ksize, anchor);
  const image = await loadImage(path.join(__dirname, '/horse.png'));
  const src = cv.imread(image);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

  cv.dilate(src, mat, element);
  outputImg(mat, 'dilation');

  cv.erode(src, mat, element);
  outputImg(mat, 'erosion');

  cv.dilate(src, mat, element);
  cv.erode(mat, mat, element);
  outputImg(mat, 'closing');

  cv.erode(src, mat, element);
  cv.dilate(mat, mat, element);
  outputImg(mat, 'opening');

  let result;

  result = skeleton(src);
  outputImg(result, 'skeleton');

  result = conditionalDilation(src);
  outputImg(result, 'conditional');

  src.delete();
  mat.delete();
  result.delete();
})();