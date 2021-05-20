import { useTypedSelector } from './use-typedSelector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { order, data } = state.cells;
    let orderedCells = order.map((id) => data[id]);
    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = (value)=>{
      const root = document.querySelector('#root')

      if(typeof value === 'object'){
        if(value.$$typeof && value.props){
          _ReactDOM.render(value,root)
        }else{

          root.innerHTML = JSON.stringify(value)
        }
      }else{
        root.innerHTML = value
      }
    }
    `;
    const showNoop = `var show = ()=>{}`;
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (cellId === c.id) {
        break;
      }
    }

    return cumulativeCode;
  }).join('\n');
};
