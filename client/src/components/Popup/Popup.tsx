import { Box, Modal, Typography } from "@mui/material";

interface IPopupProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  children: JSX.Element
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  maxHeight: 700,
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Popup: React.FC<IPopupProps> = ({ isOpen, handleClose, title, children }) => {
  return (
    <Modal open={isOpen} onClose={handleClose} >
      <Box sx={style}>
        <Typography id="modal" variant="h4" component="h2">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default Popup;
