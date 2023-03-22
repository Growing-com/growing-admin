import { Box, Drawer } from '@mui/material';

type tBaseLayout = {

}

const BaseLayout: React.FC = ({ children }) => {
  return (
    <Box>
      <Drawer
        variant="permanent"
        anchor="left"
      >
        {children}
      </Drawer>
    </Box>
  )
}

export default BaseLayout;
