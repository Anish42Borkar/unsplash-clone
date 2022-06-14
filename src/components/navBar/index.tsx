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
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

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
      <div className=" d-flex justify-content-between p-0 m-0 mr-0 w-100">
        <div className="d-none d-md-flex justify-content-start align-items-center w-75   p-0 m-0">
          <SearchBar />
        </div>

        <div className="d-flex d-md-none justify-content-start align-items-center w-100   p-0 m-0">
          <SearchBar />
        </div>

        <div className="justify-content-around align-items-center  m-0 p-0 d-flex d-md-none">
          <MenuRoundedIcon style={{ fontSize: 34 }} />
        </div>
        {/* <Navbar.Toggle className="bg-info w-100" /> */}

        <div className="fs-6 w-25 justify-content-around align-items-center  m-0 p-0 d-none d-md-flex">
          <Navbar.Text>Advertise</Navbar.Text>
          <Navbar.Text>Blog</Navbar.Text>
          <div className="">
            <Button className="bg-success ">
              <Navbar.Text>Submit a Photo</Navbar.Text>
            </Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

function SearchBar(): JSX.Element {
  return (
    <>
      <div className="w-10 me-3 ms-1">
        <Image className="w-100" src={UnsplashIcon} rounded />
      </div>
      <Navbar.Brand href="#home" className="w-100">
        <SearchBox />
      </Navbar.Brand>
    </>
  );
}
export default NavBar;
