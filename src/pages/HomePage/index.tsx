import SearchBar from "../../components/SearchBar";
import styled from 'styled-components';
import TableData from "../../components/Table";
import { Container } from "@material-ui/core";
import { useState } from "react";
import { Pagination } from '@material-ui/lab';

const SearchBarWrapper = styled.div`
    margin-bottom: 30px;

`;

const PaginationWrapper = styled.div`
    margin-top: 10px
`;

const HomePage = () => {
    const [ noOfPages, setNoOfPages ] = useState<number>(0);
    const [ searchString, setSearchString ] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        pageNo: number,
      ) => {
        setCurrentPage(pageNo);
      };

    return (
        <Container maxWidth="lg">
        <SearchBarWrapper>
            {/* Todo rate limit with debounce */}
            <SearchBar setSearchString={setSearchString} searchString={searchString} />
        </SearchBarWrapper>
        <TableData setNoOfPages={setNoOfPages} searchString={searchString} currentPage={currentPage} />
        <PaginationWrapper>
            <Pagination count={noOfPages} onChange={handlePageChange} page={currentPage} />
        </PaginationWrapper>
        </Container>
    );
}

export default HomePage;