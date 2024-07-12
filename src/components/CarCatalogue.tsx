import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Flex, Icon, Link, SelectInput, Text } from "vcc-ui";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronSmall from "../../docs/chevron-small.svg";

interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

const CarCatalogue = () => {
  const [allCarsData, setAllCarsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedBodyType, setSelectedBodyType] = useState("");

  const customSlider = useRef<Slider>(null);

  useEffect(() => {
    fetch("./api/cars.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res?.json())
      .then((cars) => {
        setAllCarsData(cars);
        setFilteredData(cars);
      })
      .catch((e) => console.log(e));
  }, []);

  const settings = {
    slidesToShow: filteredData?.length < 4 ? filteredData.length : 4,
    dots: false,
    speed: 300,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          dots: true,
        },
      },
    ],
  };

  const renderBodyTypeFilter = () => {
    const allBodyType = allCarsData?.map((car: Car) => car.bodyType);
    const uniqueBodyType = [...new Set(allBodyType)];
    return (
      <SelectInput
        onChange={handleBodyTypeChange}
        aria-label="Body Type Filter"
        label="Filter"
        value={selectedBodyType}
      >
        <option value="Select All">Select All</option>
        {uniqueBodyType.map((item: string) => {
          return (
            <option value={item} key={item}>
              {item.toUpperCase()}
            </option>
          );
        })}
      </SelectInput>
    );
  };

  const handleBodyTypeChange = (e: any) => {
    const cars = [...allCarsData];
    setSelectedBodyType(e.target.value);
    const filteredCars: any = cars
      .map((i: Car) => (e.target.value === i.bodyType ? i : null))
      .filter((i: any) => i !== null);

    if (filteredCars.length > 0) {
      setFilteredData(filteredCars);
    } else {
      setFilteredData(cars);
    }
  };

  return (
    <Flex className="catalogueContainer" extend={{ padding: 16, overflowX: "hidden" }}>
      <div className="bodyTypeFilter">{renderBodyTypeFilter()}</div>

      <Slider ref={customSlider} {...settings}>
        {filteredData &&
          filteredData.map((i: Car) => (
            <Flex key={i.id} extend={{ maxWidth: "95%" }}>
              <Flex aria-hidden="true" tabIndex={-1}>
                <Text subStyle="emphasis" extend={{ color: "#808080" }}>
                  {i.bodyType.toUpperCase()}
                </Text>
                <Flex
                  extend={{
                    display: "inline-flex",
                    flexDirection: "row",
                  }}
                >
                  <Text subStyle="emphasis" extend={{ paddingRight: "10px" }}>
                    {i.modelName}
                  </Text>
                  <Text subStyle="standard" extend={{ color: "#808080" }}>
                    {i.modelType}
                  </Text>
                </Flex>
              </Flex>
              <div className="imageContainer">
                <Image
                  src={i.imageUrl}
                  alt="car catalogue"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
              </div>

              <Flex
                extend={{
                  flexDirection: "row",
                  justifyContent: "center",
                  textTransform: "uppercase",
                }}
              >
                <Link href={`/learn/:${i.id}`}>
                  Learn <Image src={ChevronSmall} height="10px" />
                </Link>
                <Link href={`/shop/:${i.id}`}>
                  Shop <Image src={ChevronSmall} height="10px" />
                </Link>
              </Flex>
            </Flex>
          ))}
      </Slider>

      <div className="chevronContainer">
        <div onClick={() => customSlider?.current?.slickPrev()}>
          <Icon aria-label="previous" type="mediacircled-previous-40" />
        </div>
        <div onClick={() => customSlider?.current?.slickNext()}>
          <Icon aria-label="previous" type="mediacircled-next-40" />
        </div>
      </div>
    </Flex>
  );
};

export default CarCatalogue;
