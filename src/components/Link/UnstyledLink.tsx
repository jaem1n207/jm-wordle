import React, { forwardRef, memo } from 'react';
import { LinkLikeComponentProps } from './type';

const UnstyledLink = memo(
  forwardRef<HTMLAnchorElement, LinkLikeComponentProps>(({ ...props }, ref) => {
    const { url, external, children, ...restProps } = props;

    const externalAttributes = {
      ...(external && { target: `_blank`, rel: `noopener noreferrer` }),
    };

    return (
      <a ref={ref} href={url} {...externalAttributes} {...restProps}>
        {children}
      </a>
    );
  }),
);

export default UnstyledLink;
