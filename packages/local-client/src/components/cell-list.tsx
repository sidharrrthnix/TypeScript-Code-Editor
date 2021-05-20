/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect } from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typedSelector';
import AddCell from './AddCell';
import CellListItem from './cell-list-item';
import './cell-list.css';
const CellList: React.FC = () => {
  const collection = useTypedSelector((state) => state.cells);
  const cells = collection.order.map((id) => collection.data[id]);
  const { fetchCells } = useActions();
  useEffect(() => {
    fetchCells();
  }, []);
  const renderCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell nextCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
      {renderCells}
    </div>
  );
};

export default CellList;
