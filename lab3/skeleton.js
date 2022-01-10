function skeleton(src) {
    let mat = new cv.Mat(src.rows, src.cols, 0);
    for (let i = 0; i < src.rows; i++)
    for (let j = 0; j < src.cols; j++)
        mat.ucharPtr(i, j)[0] = 0;

    let temp = new cv.Mat(src.rows, src.cols, 0);
    let opening = new cv.Mat(src.rows, src.cols, 0);
    let srcCopy = src.clone();
    let eroded = new cv.Mat(src.rows, src.cols, 0);
    let element = cv.getStructuringElement(cv.MORPH_CROSS, new cv.Size(3, 3));

    while (true) {
    cv.erode(srcCopy, opening, element);
    cv.dilate(opening, opening, element);
    cv.subtract(srcCopy, opening, temp);
    cv.erode(srcCopy, eroded, element);
    cv.bitwise_or(mat, temp, mat);
    srcCopy = eroded.clone();
    if (cv.countNonZero(srcCopy) === 0) break;
    }

    return mat;
}

module.exports = { skeleton };