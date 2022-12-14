import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./component/NavBar";
import { Container } from "@mui/material";
import DashboardTable from "./component/DashboardTable";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./component/Fallback";

function App() {
  const [userData, setUserData] = useState([]);
  const [userDataOriginal, setUserDataOriginal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userDataPerPage] = useState(10);

  const GREEK_TRUST_URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  //getting users data
  const performApiCall = async () => {
    try {
      const response = await axios.get(GREEK_TRUST_URL);
      setUserData(response.data);
      setUserDataOriginal(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    performApiCall();
  }, []);

  // HandleSearch
  const handleSearch = (searchText) => {
    const Data = userDataOriginal.filter((val) => {
      if (searchText === "") {
        return val;
      } else if (
        val.name.toLowerCase().includes(searchText.toLocaleLowerCase())
      ) {
        return val;
      } else if (
        val.email.toLowerCase().includes(searchText.toLocaleLowerCase())
      ) {
        return val;
      } else if (
        val.role.toLowerCase().includes(searchText.toLocaleLowerCase())
      ) {
        return val;
      }
    });

    setUserData(Data);
  };

  // Get posts for pagination
  const userDataLastIndex = currentPage * userDataPerPage;
  const userDataFirstIndex = userDataLastIndex - userDataPerPage;
  const userDataCurrent = userData.slice(userDataFirstIndex, userDataLastIndex);

  //handle page click
  const handlePaginationClick = (event, value) => {
    const pageNumber = value;
    if (pageNumber !== undefined) {
      setCurrentPage(pageNumber);
    }
  };

  const handleError = (error, errorInfo) => {
    console.log(error, errorInfo);
  };

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
        <NavBar></NavBar>
        <br></br>
        <Container maxWidth="lg" className="Dashboard-Container">
          <DashboardTable
            userDataAll={userData}
            userData={userDataCurrent}
            setUserData={setUserData}
            handlePaginationClick={handlePaginationClick}
            userDataPerPage={userDataPerPage}
            totalUserData={userData.length}
            handleSearch={handleSearch}
          />
        </Container>
      </ErrorBoundary>
    </div>
  );
}

export default App;
