import { Box, Container } from "@mui/material";
import SearchBar from "../SearchBar";

const Header = () => {
  return (
    // <Box style={{ background: "#494aa2" }}>
    <Box sx={{ background: "white", borderBottom: 1, borderColor: "#D2D2D2" }} p={2}>
      <Container>
        <SearchBar size="small" gotoPage={false} />
      </Container>
    </Box>
  );
};

export default Header;
