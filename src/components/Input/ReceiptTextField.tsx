import React, { FC, useContext } from 'react';

import { ReceiptContext } from 'contexts/ReceiptData';
import { IState } from 'form/state';
import { ActionType } from 'hooks/useReceiptData';
import { useValidation } from 'hooks/useValidation';

import { Input } from './Base';

export interface IProps {
  field: keyof IState;
  label: string;
  disabled?: boolean;
  placeholder?: string;
}

export const ReceiptTextField: FC<IProps> = ({ field, ...props }) => {
  const { state, dispatch } = useContext(ReceiptContext);

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.CHANGE,
      data: {
        [field]: event.target.value,
      },
    });
  };

  const value = state[field] || '';
  if (typeof value !== 'string') {
    throw new Error('ReceiptTextField supplied field value is not a string');
  }

  const { validation, level } = useValidation(field);

  return <Input value={value} onChange={change} {...props} validation={validation} validationLevel={level} />;
};
