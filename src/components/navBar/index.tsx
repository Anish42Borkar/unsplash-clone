import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
//utility
import axiosInstance from "../../utility/axiosInstance";
// components
import SearchBox from "../search_box";
// images and icons
import UnsplashIcon from "../../assets/icons/unsplash_icon.svg";

const getListOfTopics = async (): Promise<void> => {
  const response: Record<any, any> = await axiosInstance
    .get("topics")
    .catch((e) => e.response);
  console.log(response.data, "topics");
};

const NavBar = (): JSX.Element => {
  useEffect(() => {
    getListOfTopics();
  }, []);
  return (
    <Navbar
      style={{ zIndex: "30" }}
      className=" m-0 w-100 position-sticky top-0 bg-primary "
    >
      <div className=" d-flex justify-content-start p-0 m-0 mr-0 w-100">
        <div className="d-flex justify-content-start  align-items-center w-75   p-0 m-0">
          <Container className="w-10 me-3 ms-1">
            <Image className="w-100" src={UnsplashIcon} rounded />
          </Container>
          <Navbar.Brand href="#home" className="w-100">
            <SearchBox />
          </Navbar.Brand>
        </div>
        {/* <Navbar.Toggle className="bg-info w-100" /> */}

        <Navbar.Collapse className="fs-6 justify-content-around bg-primary m-0 p-0">
          <Navbar.Text>Advertise</Navbar.Text>
          <Navbar.Text>Blog</Navbar.Text>
          <Button className="bg-success">
            <Navbar.Text>Submit a Photo</Navbar.Text>
          </Button>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
