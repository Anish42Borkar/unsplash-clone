import { FC } from "react";
import { Container } from "react-bootstrap";

// components
import SearchBox from "../search_box";

// utility
import axiosInstance from "../../utility/axiosInstance";

const initialImageUrl =
  "https://images.unsplash.com/photo-1654034085709-a3981e5718ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

const Hero: FC = (): JSX.Element => {
  const styles: Record<any, string> = {
    backgroundImage: `url(${initialImageUrl})`,
    height: "100%",
    width: "100%",
    backgroundClip: "outline",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
  };

  const transboxStyle = {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(23, 23, 23, 0.33)",
    // opacity: "0.5",
  };

  return (
    <div className="w-100 vh-100" style={styles}>
      <div className="transbox d-flex position-relative " style={transboxStyle}>
        <Container className="text-primary   position-absolute top-50 start-50 translate-middle">
          <p className="fs-1 text-success">Unsplash</p>
          <p className="fs-6 text-success lh-xsm">
            The internet’s source of freely-usable images.
          </p>
          <p className="mb-5 fs-5 lh-xsm">Powered by creators everywhere.</p>
          <SearchBox makeRounded={false} />
        </Container>
      </div>
    </div>
  );
};

export default Hero;
