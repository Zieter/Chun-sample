const PriceInput = ({index, data, onChange}) => {
    const handleChange = (e) => {
        onChange(index, 'price', '', e.target.value);
    };

    return (<>
        <span>入住費用 (每人每晚)</span>
        <div className="input-group">
            <span className="input-group-text py-2" id="basic-addon1">TWD</span>
            <input 
                type="text" 
                className="form-control" 
                placeholder="請輸入費用" 
                value={data.price} 
                onChange={handleChange}
            />
        </div>
        {
            data.price === '' && 
            <div className='bg-lightOrange text-orange fw-bold rounded px-1 py-2'>
                不可為空白
            </div>
        }
        
        <p className='text-end'>輸入0表示免費</p>
    </>)
}

export default PriceInput;