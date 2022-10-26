import { PropsWithChildren, memo } from 'react';
import tw from 'twin.macro';
import { Sizes } from '../Button';

interface IProps extends PropsWithChildren {
  ready: boolean;
  size?: Sizes;
}

const styledBySize = {
  [Sizes.SMALL]: tw`h-5`,
  [Sizes.MEDIUM]: tw`h-7`,
  [Sizes.LARGE]: tw`h-9`,
};

function Pulse({
  ready, children, size = Sizes.SMALL, ...props
}: IProps) {
  return (
    <div tw="relative" css={[styledBySize[size]]} {...props}>
      <span css={[!ready && tw`opacity-0 z-0 relative`]}>{children}</span>
      {!ready && (
        <div tw="absolute top-0 animate-pulse w-full bg-gray-200" css={[styledBySize[size]]} />
      )}
    </div>
  );
}

Pulse.defaultProps = {
  size: Sizes.SMALL,
};

export default memo(Pulse);
