import React, { useEffect, useReducer, useState } from 'react';

const AgeGroupSelect = ({index, data, onChange, overlap}) => {
    const handleChange = (e, arrayIndex) => {
        return onChange(index, 'ageGroup', arrayIndex , e.target.value)
    };
    return (<>
        <span>年齡</span>
        <div className="input-group" >
            <select className="form-select" value={data.ageGroup[0]} aria-label="" onChange={(e) => handleChange(e, 0)}>
                <option value="" disabled>請選擇</option>
                {
                    [...new Array(21)].map((_, i) => {
                        if (data.ageGroup[1] && i <= data.ageGroup[1]) {
                            return <option value={i} key={i}>{i}</option>;
                        } else if(!data.ageGroup[1]){
                            return <option value={i} key={i}>{i}</option>;
                        } else {
                            return false;
                        }
                    })
                }
            </select>
            <span className="input-group-text py-2">~</span> 
            <select className="form-select" value={data.ageGroup[1]} aria-label="" onChange={(e) => handleChange(e, 1)}>
                <option value="" disabled>請選擇</option>
                {
                    [...new Array(21)].map((_, i) => {
                        if (i >= data.ageGroup[0]) {
                            return <option value={i} key={i}>{i}</option>;
                        } else {
                            return false;
                        }
                    })
                }
            </select>
        </div>
        {
            data.ageGroup[0] !=='' && data.ageGroup[1] !=='' && overlap &&
            <div className='bg-lightOrange text-orange fw-bold rounded px-1 py-2'>
                年齡區間不可重疊
            </div>
        }
    </>)
}

export default AgeGroupSelect;