import { FC, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Image, Container } from "react-bootstrap";

// images and icons
import Searchicons from "../../assets/icons/search_icon.svg";

export interface SearchBoxProps {
  makeRounded?: boolean;
}

type FormHookProps = {
  name: string;
};

const SearchBox: FC<SearchBoxProps> = ({ makeRounded = true }): JSX.Element => {
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const onSubmit = async (data: string): Promise<void> => {
    navigate("/search", { state: { str: data } });
  };

  return (
    <>
      <div className="position-relative">
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
            autoComplete="off"
            className={`${
              makeRounded && "border-right-radius"
            } bg-success input-box p-0 `}
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                onSubmit(e.target?.value);
              }
            }}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Search free high-resolution photos"
          />
        </InputGroup>
      </div>
    </>
  );
};

export default SearchBox;
