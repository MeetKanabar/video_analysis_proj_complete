import React from "react";

const Aboutdata = [
    {
        imgSrc: "/src/assets/network/bangladesh.svg",
        country: "Bangladesh",
        paragraph: "Event madness gathering innovators & tech enthusiasts in Speced.",
    },
    {
        imgSrc: "/src/assets/network/america.svg",
        country: "United States",
        paragraph: "Event madness gathering innovators & tech enthusiasts in Speced.",
    },
    {
        imgSrc: "/src/assets/network/australia.svg",
        country: "Australia",
        paragraph: "Event madness gathering innovators & tech enthusiasts in Speced.",
    },
    {
        imgSrc: "/src/assets/network/china.svg",
        country: "China",
        paragraph: "Event madness gathering innovators & tech enthusiasts in Speced.",
    },
];

const Network = () => {
    return (
        <div className="bg-blue-100" id="project">
            <div className="mx-auto max-w-2xl py-20 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h3 className="text-4xl sm:text-7xl font-semibold text-center my-10 lh-81">
                    Our network & world <br /> work details.
                </h3>

                <img src="/src/assets/network/map.png" alt="map-image" className="w-full h-auto" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-4 lg:gap-x-8">
                    {Aboutdata.map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 shadow-xl">
                            <div className="flex justify-start items-center gap-2">
                                <img src={item.imgSrc} alt={item.country} width="55" height="55" className="mb-2" />
                                <h4 className="text-xl font-medium text-midnightblue">{item.country}</h4>
                            </div>
                            <hr />
                            <h4 className="text-lg font-normal text-bluegrey my-2">{item.paragraph}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Network;
