import { FC } from "react";

interface MasonryLayoutProps {
  images: string[];
}

const MasonryLayout: FC<MasonryLayoutProps> = ({
  images = [],
}): JSX.Element => {
  return (
    <div className="w-100">
      <div className="row_cont">
        {images.map((val, key) => {
          return (
            <div className="" key={key}>
              <img src={val} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MasonryLayout;
