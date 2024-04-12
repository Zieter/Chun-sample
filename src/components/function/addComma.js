export const addComma = (price) => {
    const priceStr = price.toString();
    const commaReg = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    const removeComma = priceStr.replace(/,/g, '');
    const priceComma = removeComma.replace(commaReg, ',');
    if (priceStr.charAt(0) === '0' && priceStr.charAt(1) !== '.') {
        return '';
    }

    return priceComma;
}