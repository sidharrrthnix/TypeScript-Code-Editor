import { Dispatch } from 'redux';

import { ActionType } from '../action-types';
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from '../action';
import { Cell, CellTypes } from '../cell';
import bundle from '../../bundler';
import axios from 'axios';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};
export const createBundle = (cellId: string, input: string) => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.BUNDLE_START,
    payload: {
      cellId,
    },
  });

  const result = await bundle(input);

  dispatch({
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      cellId,
      bundle: {
        code: result.code,
        error: result.err,
      },
    },
  });
};

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.FETCH_CELLS });

  try {
    const { data }: { data: Cell[] } = await axios.get('/cells');
    dispatch({
      type: ActionType.FETCH_CELLS_COMPLETE,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: ActionType.FETCH_CELLS_ERROR,
      payload: e.message,
    });
  }
};

export const saveCells = () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  const {
    cells: { order, data },
  } = getState();
  const cells = order.map((id) => data[id]);

  try {
    await axios.post('/cells', { cells });
  } catch (e) {
    dispatch({
      type: ActionType.SAVE_CELLS_ERROR,
      payload: e.message,
    });
  }
};
