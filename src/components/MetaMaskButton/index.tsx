import { memo } from 'react';
import tw from 'twin.macro';
import Icon from './Icon';
import Button, { Sizes } from '../Button';
import type { ButtonProps } from '../Button';

const styledBySize = {
  [Sizes.SMALL]: tw`w-3 h-2.5`,
  [Sizes.MEDIUM]: tw`w-6 h-5`,
  [Sizes.LARGE]: tw`w-10 h-8`,
};

function MetaMaskButton({ children, size = Sizes.MEDIUM, ...props }: ButtonProps) {
  return (
    <Button {...props}>
      <Icon css={[styledBySize[size]]} />
      {children}
    </Button>
  );
}

export default memo(MetaMaskButton);
