import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

export function Button({ variant='contained', children, ...props }) {
  return (
    <StyledMuiButton variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

export function ButtonGitHub({ variant='contained', children, ...props }) {
  return (
    <StyledMuiButtoGitHub variant={variant} {...props}>
      {children}
    </StyledMuiButtoGitHub>
  );
}

const StyledMuiButton = styled(MuiButton)`
  margin-top: 8px !important;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 20px;
  }
`;

const StyledMuiButtoGitHub = styled(MuiButton)`
  margin-top: 8px !important;
  background-color: #333333 !important;
  &:hover {
    background-color: #000000 !important;
  }
  div {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 20px;
  }
`;
