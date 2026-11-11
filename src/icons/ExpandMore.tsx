import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

const ExpandMore = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </SvgIcon>
  );
};

export default ExpandMore;