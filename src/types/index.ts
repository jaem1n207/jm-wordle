import { ReactNode } from 'react';

export interface IBaseComponentProps {
  children?: ReactNode;
}

export interface Aria {
  labelledby?: string | undefined;
  describedby?: string | undefined;
}
