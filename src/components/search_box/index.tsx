import { FC } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Image, Container } from "react-bootstrap";

// images and icons
import Searchicons from "../../assets/icons/search_icon.svg";

export interface SearchBoxProps {
  makeRounded?: boolean;
}

const SearchBox: FC<SearchBoxProps> = ({ makeRounded = true }): JSX.Element => {
  return (
    <>
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
          className={`${
            makeRounded && "border-right-radius"
          } bg-success input-box p-0 `}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Search"
        />
      </InputGroup>
    </>
  );
};

export default SearchBox;
