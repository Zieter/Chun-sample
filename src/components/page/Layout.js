import React, { useEffect, useReducer, useState } from 'react';
import PriceInput from '../ui/PriceInput';
import AgeGroupSelect from '../ui/AgeGroupSelect';
import { result, reducer } from '../reducer/reducer';
import { getNumberIntervals } from '../function/getNumberIntervals';

const Layout = () => {
    const [state, dispatch] = useReducer(reducer, result);
    const [verify, setVerify] = useState({
        overlap: false,
        addBtn: true,
    });
    // useEffect(() => {
    //     console.log('state', state)
    // }, [state])
    useEffect(() => {
        const asd = getNumberIntervals(state);
        const hasNotInclude = asd.notInclude.some(item => item.some(value => value !== '' && value !== undefined));
        if(hasNotInclude) {
            setVerify(prevState => ({...prevState, addBtn:true}));
        } else {
            setVerify(prevState =>({...prevState, addBtn:false}));
        }
        const hasOverlap = asd.overlap.some(item => item.some(value => value !== '' && value !== undefined));
        if(hasOverlap) {
            setVerify(prevState => ({...prevState, overlap:true}));
        } else {
            setVerify(prevState => ({...prevState, overlap:false}));
        }
    }, [state])
    const handleItemChange = (index, name, arrayIndex, targetValue) => {
        // const valueParseFloat = parseFloat(targetValue)
        dispatch({
            type: 'handleItemChange',
            payload: { index, name, arrayIndex, targetValue }
            // payload: { index, name, arrayIndex, valueParseFloat }
        });
    };
    return (
        <div className="App d-flex">
            <div className='m-auto' style={{width:'50rem'}}>
                {
                    state.map((item, index) => {
                        return (
                            <React.Fragment key={index+'_AgePrice'}>
                                <div className='d-flex justify-content-between mb-2'>
                                    <h5 className='text-dark'>價格設定-{index +1}</h5>
                                    {
                                        state.length !==1 && 
                                        <button className='bg-transparent border-0 text-orange fw-bolder' onClick={() => dispatch({type:'deleteItem', index})}>X 移除</button>
                                    }
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <AgeGroupSelect index={index} data={item} onChange={handleItemChange} overlap={verify.overlap} />
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <PriceInput index={index} data={item} onChange={handleItemChange}/>
                                    </div>
                                </div>
                                { index + 1 !== state.length && <hr />}
                            </React.Fragment>
                        )
                    })
                }
                { 
                    verify.addBtn? 
                    <button className='bg-transparent border-0 text-lightCyan mt-3' onClick={() => dispatch({type:'addItem'})}>+ 新增價格設定</button>
                    :<p>已覆蓋所有年齡範圍!</p>
                }
                
            </div>
        </div>
    )
}

export default Layout;