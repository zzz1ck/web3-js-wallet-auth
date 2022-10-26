import { memo, PropsWithChildren } from 'react';
import tw from 'twin.macro';

export enum Sizes {
  SMALL,
  MEDIUM,
  LARGE,
}
export interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  size?: Sizes;
}

const styledBySize = {
  [Sizes.SMALL]: tw`font-normal text-xs px-2.5 py-1 rounded-md`,
  [Sizes.MEDIUM]: tw`font-medium text-sm px-5 py-2.5 rounded-lg`,
  [Sizes.LARGE]: tw`font-medium px-6 py-4 rounded-lg`,
};

function Button({ children, size = Sizes.MEDIUM, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      tw="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:(ring-4 ring-gray-100) text-center inline-flex items-center dark:(bg-gray-800 border-gray-700 text-white focus:ring-gray-600 hover:bg-gray-700)"
      css={styledBySize[size]}
      {...props}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
  size: Sizes.MEDIUM,
};

export default memo(Button);
