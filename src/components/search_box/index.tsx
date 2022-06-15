import { FC, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Image, Container } from "react-bootstrap";

// images and icons
import Searchicons from "../../assets/icons/search_icon.svg";

export interface SearchBoxProps {
  makeRounded?: boolean;
}

const SearchBox: FC<SearchBoxProps> = ({ makeRounded = true }): JSX.Element => {
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);
  // console.log(searchBoxRef.current?.focus());
  const onFocus = () => {
    if (document.activeElement === searchBoxRef.current) {
      searchListRef.current?.classList.remove("d-none");
    } else {
      searchListRef.current?.classList.add("d-none");
    }
    // console.log(searchListRef.current);
  };

  return (
    <>
      <div className="">
        <InputGroup className="w-100 p-0">
          <InputGroup.Text
            id="inputGroup-sizing-default "
            className={`${makeRounded && "border-left-radius "}`}
          >
            <Container className="w-7 m-0 p-1">
              <Image src={Searchicons} className="w-100" />
            </Container>
          </InputGroup.Text>
          <Form.Control
            ref={searchBoxRef}
            className={`${
              makeRounded && "border-right-radius"
            } bg-success input-box p-0 `}
            onFocus={onFocus}
            onChange={() => {
              if (document.activeElement === searchBoxRef.current) {
                console.log("element has focus");
              } else {
                console.log("element does NOT have focus");
              }
            }}
            onBlur={onFocus}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Search"
          />
        </InputGroup>
        {/* <div
          ref={searchListRef}
          className="search_results d-none position-absolute top-0 bottom-0 mt-6 w-100 w-md-80 mh-10 bg-success shadow-lg rounded  "
        ></div> */}
        <div ref={searchListRef} className="d-none search_results  mt-6 ">
          <div className=" w-90 w-md-60 min-h-14 bg-success shadow-lg mb-6  rounded  "></div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
