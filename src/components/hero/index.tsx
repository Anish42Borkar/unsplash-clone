import { FC, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

// components
import SearchBox from "../search_box";

// utility
import axiosInstance from "../../utility/axiosInstance";

type StateProps = {
  bgUrl: string;
};

const initialImageUrl =
  "https://images.unsplash.com/photo-1654868739497-ee031a3d7088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

const Hero: FC = (): JSX.Element => {
  const [state, setState] = useState<StateProps>({
    bgUrl: "",
  });

  const styles: Record<any, string> = {
    backgroundImage: `url(${state.bgUrl ?? ""})`,
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

  const changeBgHero = async (): Promise<void> => {
    try {
      const response: Record<any, any> = await axiosInstance.get(
        "photos/random",
        { params: { topics: "bo8jQKTaE0Y", w: 1080 } }
      );
      setState(
        (prev): StateProps => ({ ...prev, bgUrl: response.data.urls.regular })
      );
      console.log(response.data.urls.regular, "hero");
    } catch (e) {
      setState((prev): StateProps => ({ ...prev, bgUrl: initialImageUrl }));
    }
  };

  useEffect((): void => {
    changeBgHero();
  }, []);

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
