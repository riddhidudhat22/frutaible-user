import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/reducer/slice/couner.slice';
// import { decrement, increment } from '../../../redux/action/counter.action';


function Counter(props) {

    const dispatch = useDispatch();

    const countVal=useSelector(state=>state.counter_slice)
    console.log(countVal);
    
    const handleinc = () => {
        dispatch(increment())
    }
    const handledecriment = () => {
        dispatch(decrement())
    }

    return (
        <div>
            <button onClick={handleinc}>+</button>
            {countVal.count}
            <button onClick={handledecriment}>-</button>
        </div>
    );
}

export default Counter;