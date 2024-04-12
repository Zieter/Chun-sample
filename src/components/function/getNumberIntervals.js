export const getNumberIntervals = (input) => {
    let inputType = [];

    if(Array.isArray(input[0])) {
        inputType = JSON.parse(JSON.stringify(input));
    } else if( typeof input[0] === 'object' ){
        inputType = filterObject(input, 'ageGroup')
    } else {
        return false
    }

    const filledIntervals = inputType.map(([start, end]) => {
        const filled = [];
        for(let i = start; i<= end; i++) {
            // if(start === end ) {// 暫不使用
            //     filled.push(i);
            // }
            filled.push(i);
        }
        return filled;
    })
    // console.log('filledIntervals',filledIntervals)
    let array = [];
    for(const i in filledIntervals) {
        array = array.concat(filledIntervals[i])
    }
    // console.log('array',array)
    const duplicates = array.filter((item, index) => {
        return array.indexOf(item) !== index;
    });
    // console.log('重複出現的值：', duplicates);

    let notIncludeArray = [];
    const notInclude = Array.from(new Set(array)).flat()
    for(let i=0; i <= 20; i++) {
        if(!notInclude.includes(i)){
            notIncludeArray.push(i)
        }
    }
    // console.log('notIncludeArray:', notIncludeArray);
    const continuousRangesNotInclude = extractContinuousRanges(notIncludeArray)
    // console.log('不包含-連續值的範圍:', continuousRangesNotInclude);
    const uniqueAge = Array.from(new Set(duplicates)).flat();
    // console.log('uniqueAge', uniqueAge)
    const continuousRangesOverlap = extractContinuousRanges(uniqueAge);
    // console.log('重疊-連續值的範圍:', continuousRangesOverlap);

    return  { overlap: continuousRangesOverlap, notInclude: continuousRangesNotInclude }
}

// 抓取物件內指定內容
const filterObject = (data, name) =>{
    return data.reduce((acc, current) => {
        if(Array.isArray(current[name])){
            return [...acc,current[name]]
        } else if (typeof current ==='object'){
            return [...acc,filterObject(current[name], name)]
        }
        return acc;
    }, [])
} 

// 提取陣列內連續值的範圍
const extractContinuousRanges = (arr) => {
    let result = [];
    let start = arr[0];
    let end = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] - 1 === arr[i - 1]) {
            end = arr[i];
        } else {
            result.push([start, end]);
            start = arr[i];
            end = arr[i];
        }
    }
    result.push([start, end]);

    return result;
}
