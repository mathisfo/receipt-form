import React, { FC } from 'react';

import { IState } from 'form/state';
import { useInteraction } from 'hooks/useInteraction';
import { useValidation } from 'hooks/useValidation';
import { useDispatch, useSelector } from 'redux/hooks';
import { ActionType } from 'redux/reducers/formReducer';

import { Input } from './Base';

export interface IProps {
  field: keyof IState;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  format?: (value: string) => string;
}

export const ReceiptTextField: FC<IProps> = ({ field, format, ...props }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.form[field] || '');

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = format ? format(event.target.value) : event.target.value;
    dispatch({
      type: ActionType.CHANGE,
      data: {
        [field]: val,
      },
    });
  };

  if (typeof value !== 'string') {
    throw new Error('ReceiptTextField supplied field value is not a string');
  }

  const { validation, level } = useValidation(field);
  const { interacted, setInteracted } = useInteraction(field);

  return (
    <Input
      value={value}
      onChange={change}
      {...props}
      validation={validation}
      validationLevel={level}
      onBlur={setInteracted}
      interacted={interacted}
    />
  );
};
