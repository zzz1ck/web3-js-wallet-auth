import React from 'react';
import tw from 'twin.macro';
import { Sizes } from '../';

interface PulseProps extends WithChildren {
  ready: boolean;
  size?: Sizes;
};

const styledBySize = {
  [Sizes.SMALL]: tw`h-5`,
  [Sizes.MEDIUM]: tw`h-7`,
  [Sizes.LARGE]: tw`h-9`,
};

const Pulse = ({ ready, children, size = Sizes.SMALL, ...props }: PulseProps) => (
  <div tw="relative" css={[styledBySize[size]]} {...props}>
    <span css={[!ready && tw`opacity-0 z-0 relative`]}>{children}</span>
    {!ready && (
      <div
        tw="absolute top-0 animate-pulse w-full bg-gray-200"
        css={[styledBySize[size]]}
      />
    )}
  </div>
);

export default React.memo(Pulse);
