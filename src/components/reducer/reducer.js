import { addComma } from '../function/addComma';

export const result = (
    [
        {ageGroup:['', ''], price: 0},
    ]
)

export const reducer = (state, action) => {
    // console.log(action)
    // console.log('state',state)
    switch (action.type) {
        case 'addItem':
            return [...state, {ageGroup:['', ''], price: 0}];
        case 'deleteItem':
            // console.log(result[action.index])
            return state.filter((_, i) => i !== action.index);
        case 'handleItemChange':
            const { index, name, arrayIndex, targetValue } = action.payload;
            const newData = [...state];
            if (name === 'ageGroup') {
                // console.log('name',name)
                if (!Array.isArray(newData[index][name])) {
                    newData[index][name] = [];
                }
                newData[index][name][arrayIndex] = parseInt(targetValue);
                // console.log(targetValue)
            } else if (name === 'price') {
                newData[index][name] = addComma(targetValue)
            }
            return newData;
            
        default:
            return state;
    }
}


