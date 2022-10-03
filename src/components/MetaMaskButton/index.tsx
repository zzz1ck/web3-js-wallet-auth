import React from 'react';
import tw from 'twin.macro';
import Icon from './Icon';
import { Button, ButtonProps, Sizes } from '..';

const styledBySize = {
  [Sizes.SMALL]: tw`w-3 h-2.5`,
  [Sizes.MEDIUM]: tw`w-6 h-5`,
  [Sizes.LARGE]: tw`w-10 h-8`,
};

const MetaMaskButton = ({ children, size = Sizes.MEDIUM, ...props }: ButtonProps) => (
  <Button {...props}>
    <Icon css={[styledBySize[size]]} />
    {children}
  </Button>
);

export default React.memo(MetaMaskButton);
