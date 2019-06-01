import React, { FC, HTMLProps } from 'react';

import { colors } from 'constants/colors';

export interface IProps extends HTMLProps<SVGElement> {
  color?: string;
  title?: string;
}

export const Save: FC<IProps> = ({ ref, color = colors.darkGray, ...props }) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 11 11" {...props}>
      <rect x="5.14996" y="2.70007" width="0.7" height="1.05" fill={color} />
      <path d="M2 2H2.7V4.1H6.2V2.35H2.7V2H7.6L9 3.4V5.5V9H2.7V8.3H7.25V5.85H2.7V9H2V2Z" fill={color} />
      <rect x="3.39996" y="7.59998" width="3.15" height="0.35" fill={color} />
      <rect x="3.39996" y="6.90002" width="3.15" height="0.35" fill={color} />
      <rect x="3.39996" y="6.20007" width="3.15" height="0.35" fill={color} />
    </svg>
  );
};
