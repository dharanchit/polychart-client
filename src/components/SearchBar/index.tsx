import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

type SearchBarProps = {
  searchString: string;
  setSearchString: React.Dispatch<string>;
};

const SearchBar = ({ searchString, setSearchString }: SearchBarProps) => {
  return (
    <Grid container xs={12}>
      <TextField
        fullWidth
        label="Search Policy Id or Customer Id"
        variant="outlined"
        value={searchString}
        onChange={(event: any) => setSearchString(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default SearchBar;
