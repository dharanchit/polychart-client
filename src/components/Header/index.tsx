import { Grid, useTheme } from "@material-ui/core"
import { Link } from "react-router-dom";
import styled from "styled-components"

const HeaderWrapper = styled.div`
  height: 100px;
  display: flex;
  background-color: white;
  width: 100%;
  z-index: 0;
  align-items: center;
  z-index: 1;
  -webkit-box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.1);

  .logo-class {
    text-decoration: none;
    cursor: pointer;
    margin: 0 10px;
    font-size: 24px;
    font-weight: 500;
    color: black;
  }
  
  .logo-class2 {
    text-decoration: none;
    cursor: pointer;
    margin: 0 10px;
    font-size: 20px;
    font-weight: 500;
    color: black;
  }

  margin-bottom: 30px;
`

const Header = () => {
    const theme = useTheme();
  return (
    <HeaderWrapper>
      <Grid
        container
        xs={12}
        justifyContent={"space-between"}

      >
        <Link to="/" className="logo-class">
          <span> Policy Reports </span>  
        </Link>
        <Link to="/overview" className="logo-class2">
          <span> Overview </span>  
        </Link>
      </Grid>
    </HeaderWrapper>
  )
}

export default Header