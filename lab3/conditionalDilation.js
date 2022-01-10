function conditionalDilation(src) {
    let mat = new cv.Mat();
    let elementV = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(1, 3));
    let elementD = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3));
    let result = new cv.Mat(src.rows, src.cols, 0);
    for (let i = 0; i < result.rows; i++)
        for (let j = 0; j < result.cols; j++)
        result.ucharPtr(i, j)[0] = 0;

    let tempA = new cv.Mat(src.rows, src.cols, 0);
    for (let i = 0; i < tempA.rows; i++)
        for (let j = 0; j < tempA.cols; j++)
        tempA.ucharPtr(i, j)[0] = 0;

    let tempB = new cv.Mat(src.rows, src.cols, 0);
    for (let i = 0; i < tempB.rows; i++)
        for (let j = 0; j < tempB.cols; j++)
        tempA.ucharPtr(i, j)[0] = 0;

    cv.erode(src, mat, elementV);

    while (true) {
        cv.dilate(mat, mat, elementD);
        cv.bitwise_and(src, mat, result);
        mat = result.clone();
        cv.subtract(result, tempA, tempB);
        if (cv.countNonZero(tempB) === 0) break;
        tempA = result.clone();
    }

    return result;
}

module.exports = { conditionalDilation };