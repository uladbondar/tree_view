import React, {
  memo,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from 'react';
import { styled, ClickAwayListener } from '@mui/material';

type StyledTreeNodeContainerProps = {
  isFocused: boolean;
  onClick: MouseEventHandler;
};

type TreeNodeContainerProps = PropsWithChildren & {
  id: string;
  onDoubleClick: MouseEventHandler;
};

const StyledTreeNodeContainer = styled('div')<StyledTreeNodeContainerProps>`
  // TODO: move height and color to theme
  height: 24px;
  background-color: ${(props) => (props.isFocused ? '#F0F8FF' : 'transparent')};
  cursor: default;
  user-select: none;
`;

export const TreeNodeContainer: React.FC<TreeNodeContainerProps> = memo(
  ({ id, onDoubleClick, children }) => {
    const [isFocused, setIsFocused] = useState(false);

    const onClick: MouseEventHandler = () => {
      setIsFocused(true);
    };

    const onClickAway = () => {
      setIsFocused(false);
    };

    return (
      <ClickAwayListener onClickAway={onClickAway}>
        <StyledTreeNodeContainer
          isFocused={isFocused}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          data-testid={`tree-node-${id}`}
          role="listitem"
        >
          {children}
        </StyledTreeNodeContainer>
      </ClickAwayListener>
    );
  }
);
