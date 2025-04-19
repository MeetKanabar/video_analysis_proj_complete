import React from "react";

const Newsletter = () => {
    return (
        <div className="-mt-32 relative z-3">
            <div className="mx-auto max-w-2xl lg:max-w-7xl bg-blue-500 rounded-3xl">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8">

                    {/* COLUMN-1 */}
                    <div className="hidden lg:block">
                        <div className="float-right pt-20 relative">
                            <img src="/src/assets/newsletter/bgImage.png" alt="bgimg" className="w-[588px] h-[334px]" />
                            <div className="absolute top-10 right-0">
                                <img src="/src/assets/newsletter/leaf.svg" alt="leafimg" className="w-[81px] h-[81px]" />
                            </div>
                            <div className="absolute bottom-8 left-2">
                                <img src="/src/assets/newsletter/circel.svg" alt="circleimg" className="w-[30px] h-[30px]" />
                            </div>
                        </div>
                    </div>

                    {/* COLUMN-2 */}
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="text-4xl md:text-5xl font-bold mb-3 text-white">Sign up to our newsletter.</h3>
                        <h4 className="text-base font-normal mb-7 text-gray-300">Stay tuned for future updates.</h4>
                        <div className="flex gap-0">
                            <input 
                                type="email" 
                                name="q" 
                                className="py-4 text-sm w-full text-black bg-white rounded-l-lg pl-4" 
                                placeholder="@enter email-address" 
                                autoComplete="off" 
                            />
                            <button className="bg-blue-950 text-white font-medium py-2 px-4 rounded-r-lg">
                                <img src="/src/assets/newsletter/plane.svg" alt="plane-img" className="w-[20px] h-[20px] " />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Newsletter;
