import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Button, Offcanvas } from "react-bootstrap";
//utility
import { getTopicsList } from "../../redux/reducers/topics";
import { getWishListData } from "../../redux/reducers/wishList";
// components
import SearchBox from "../search_box";
// images and icons
import UnsplashIcon from "../../assets/icons/unsplash_icon.svg";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const NavBar = (): JSX.Element => {
  const [show, setShow] = useState(false);

  const topicList = useSelector(getTopicsList);
  const wishListData = useSelector(getWishListData);
  const scrollmenuCont = useRef<HTMLDivElement>(null);

  const leftArrowOnClick = (): void => {
    if (scrollmenuCont.current) {
      scrollmenuCont.current.scrollLeft =
        scrollmenuCont.current.scrollLeft - 200;
    }
  };

  const rightArrowOnClick = (): void => {
    if (scrollmenuCont.current) {
      console.log(scrollmenuCont.current);
      scrollmenuCont.current.scrollLeft =
        scrollmenuCont.current.scrollLeft + 200;
    }
  };

  const handleToggle = () => setShow(!show);

  useEffect(() => {
    console.log(topicList);
  }, []);

  return (
    <>
      <Navbar
        style={{ zIndex: "30" }}
        className="d-flex flex-column m-0 w-100 position-sticky top-0 bg-primary "
      >
        {/* search box */}
        <div className=" d-flex justify-content-between p-0 m-0 mr-0 w-100">
          <div className="d-none d-md-flex justify-content-start align-items-center w-75   p-0 m-0">
            <SearchBar />
          </div>

          <div className="d-flex d-md-none justify-content-start align-items-center w-100   p-0 m-0">
            <SearchBar />
          </div>

          <div
            className="justify-content-around align-items-center  m-0 p-0 d-flex d-md-none"
            onClick={handleToggle}
          >
            <MenuRoundedIcon style={{ fontSize: 34 }} />
          </div>

          {/* <Navbar.Toggle className="bg-info w-100" /> */}

          <div className="fs-6 w-25 justify-content-around align-items-center   m-0 p-0 d-none d-md-flex">
            <a href="https://unsplash.com/advertise">
              <Navbar.Text>Advertise</Navbar.Text>
            </a>
            <a href="https://unsplash.com/blog/">
              <Navbar.Text>Blog</Navbar.Text>
            </a>
            <div className="">
              <NavLink to="/wishlist">
                <Button className="bg-success ">
                  <Navbar.Text className=" me-1">Wishlist</Navbar.Text>
                  <span className="badge bg-danger">
                    {wishListData.counter}
                  </span>
                </Button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Editorial */}
        <div className=" w-100 h-8 d-flex justify-content-around align-items-center  ">
          <div className="w-20 m-2 d-none d-md-block  p-2">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return `p-2 fs-6 ${isActive && "border-bottom  border-5"} `;
              }}
            >
              <Navbar.Text className=" ">Editorial</Navbar.Text>
            </NavLink>

            <NavLink
              to="/following"
              className={({ isActive }) => {
                return `p-2 ${isActive && "border-bottom  border-5"} `;
              }}
            >
              <Navbar.Text className=" ">Following</Navbar.Text>
            </NavLink>
          </div>

          {/* topics list */}
          <div className="scrollmenu_cont position-relative overflow-auto px-3  w-100 w-md-80 ">
            <div ref={scrollmenuCont} className="scrollmenu w-auto   ">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return `p-2 d-inline-block d-md-none fs-6 ${
                    isActive && "border-bottom  border-5"
                  } `;
                }}
              >
                <Navbar.Text className="">Editorial</Navbar.Text>
              </NavLink>

              <NavLink
                to="/following"
                className={({ isActive }) => {
                  return `p-2 d-inline-block d-md-none fs-6 ${
                    isActive && "border-bottom  border-5"
                  } `;
                }}
              >
                <Navbar.Text className="">Following</Navbar.Text>
              </NavLink>

              {topicList?.map((item: any, key: number) => {
                return (
                  <div key={key}>
                    <NavLink
                      to={`topics/${item.id}`}
                      className={({ isActive }) => {
                        return `p-2 fs-6 ${
                          isActive && "border-bottom  border-5"
                        } `;
                      }}
                    >
                      <Navbar.Text className="">{item.title}</Navbar.Text>
                    </NavLink>
                  </div>
                );
              })}
            </div>
            <div className="arrowLeft position-absolute top-50 start-0 translate-middle-y cursor-pointer ">
              <ArrowBackIosRoundedIcon
                style={{ fontSize: 24 }}
                onClick={leftArrowOnClick}
              />
            </div>

            <div className=" position-absolute top-50 end-0 translate-middle-y cursor-pointer">
              <ArrowForwardIosRoundedIcon
                style={{ fontSize: 24 }}
                onClick={rightArrowOnClick}
              />
            </div>
          </div>
        </div>
      </Navbar>
      <Offcanvas show={show} onHide={handleToggle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="fs-6 justify-content-start align-items-start text-dark  m-0 p-0  d-flex flex-column">
            <a href="https://unsplash.com/advertise" className="m-2">
              <Navbar.Text className="text-dark m-3 ">Advertise</Navbar.Text>
            </a>
            <a href="https://unsplash.com/blog/" className="m-2">
              <Navbar.Text className="text-dark m-3  ">Blog</Navbar.Text>
            </a>
            <div className="">
              <NavLink to="/wishlist">
                <Button className="bg-success ">
                  <Navbar.Text className="text-dark m-3 ">Wishlist</Navbar.Text>
                  <span className="badge bg-danger">
                    {wishListData.counter}
                  </span>
                </Button>
              </NavLink>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

function SearchBar(): JSX.Element {
  return (
    <>
      <div className="w-10 me-3 ms-1 p-3">
        <NavLink to="/">
          <Image className="w-100" src={UnsplashIcon} rounded />
        </NavLink>
      </div>
      <div className="w-100 ">
        <SearchBox />
      </div>
    </>
  );
}
export default NavBar;
