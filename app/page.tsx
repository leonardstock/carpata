"use client";

import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import Image from "next/image";
import toast from "react-hot-toast";
import CustomSelect from "./components/CustomSelect";
import LoadingIndicator from "./components/LoadingIndicator";
import dynamic from "next/dynamic";
import Link from "next/link";

type ModelResponse = {
    id: string;
    model: string;
};

type Make = {
    value: string;
    label: string;
};

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function Home() {
    const [allMakes, setAllMakes] = useState<Make[]>([]);
    const [make, setMake] = useState<Make | null>(null);
    const [allModels, setAllModels] = useState<ModelResponse[]>([]);
    const [model, setModel] = useState<string>("");
    const [allSubmodels, setAllSubmodels] = useState<ModelResponse[]>([]);
    const [submodel, setSubmodel] = useState<string>("");
    const [dateOfManufacture, setDateOfManufacture] = useState<string>("");
    const [transmission, setTransmission] = useState<string>("");
    const [fuel, setFuel] = useState<string>("");
    const [engineSize, setEngineSize] = useState<string>("");
    const [showAdditionalOptions, setShowAdditionalOptions] =
        useState<boolean>(false);
    const [nextSectionVisible, setNextSectionVisible] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const nextSectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/v1/makes")
            .then((res) => res.json())
            .then((data) => {
                setAllMakes(data);
            })
            .catch(() => {
                toast.error("Error fetching makes. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch("/api/v1/models?make=" + make?.label)
            .then((res) => res.json())
            .then((data) => setAllModels(data))
            .catch(() => {
                toast.error("Error fetching models. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [make]);

    useEffect(() => {
        setIsLoading(true);
        debouncedFetchSubmodels();

        return () => {
            debouncedFetchSubmodels.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model, make, dateOfManufacture]);

    const fetchSubmodels = async () => {
        const response = await fetch(
            "/api/v1/submodels?make=" + make?.label + "&model=" + model
        );
        const data = await response.json();

        if (response.status === 500) {
            toast.error("Error fetching submodels. Please try again.");
            setIsLoading(false);
            return;
        }
        setAllSubmodels(data);
        setIsLoading(false);
    };

    const debouncedFetchSubmodels = debounce(fetchSubmodels, 300);

    const scrollToNextSection = () => {
        if (nextSectionRef.current) {
            nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className='bg-[#152242]'>
            <section className='min-h-screen'>
                <div className='max-w-7xl mx-auto'>
                    <div className='relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-20 xl:pb-20'>
                        <main className='pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-26 xl:pt-25'>
                            <div className='text-center flex flex-col items-center pb-10'>
                                <Image
                                    src={"/CPlogodk.svg"}
                                    alt='logo'
                                    width={0}
                                    height={0}
                                    className='mb-10 w-[200px] h-auto'
                                />
                                <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                                    <span className='block text-white'>
                                        Find your car
                                    </span>
                                    <span className='block text-[rgb(31,234,126)] text-2xl sm:text-3xl mt-2'>
                                        Welcome to the Carpata car picker
                                    </span>
                                </h1>
                                <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl'>
                                    To find guaranteed matching parts, please
                                    use this tool to search for your car.
                                </p>
                            </div>
                            {isLoading && (
                                <div className='relative flex items-center justify-center'>
                                    <div className='absolute'>
                                        <LoadingIndicator />
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </div>

                <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                    <div className='bg-white flex flex-col p-6 rounded-lg shadow-sm border border-gray-200'>
                        <div className='space-y-6'>
                            <div>
                                <label
                                    htmlFor='make'
                                    className='block text-sm font-medium text-gray-700'>
                                    Make
                                    <span className='text-red-500'>*</span>
                                </label>
                                <Select
                                    options={allMakes}
                                    onChange={(selectedOption) => {
                                        setMake(selectedOption as Make);
                                        setModel("");
                                        setDateOfManufacture("");
                                        setSubmodel("");
                                    }}
                                    value={make}
                                    placeholder='Select a make...'
                                    className='mt-1 block w-full rounded-md text-black'
                                    isClearable
                                />
                            </div>
                        </div>

                        <div
                            className={`transition-all duration-300 ease-in-out ${
                                make && make.value !== ""
                                    ? "opacity-100 max-h-[300px] mt-6 flex md:flex-row flex-col md:items-center gap-2"
                                    : "opacity-0 max-h-0 overflow-hidden"
                            }`}>
                            <div className='flex-1'>
                                <label
                                    htmlFor='model'
                                    className='block text-sm font-medium text-gray-700'>
                                    Model
                                    <span className='text-red-500'>*</span>
                                </label>
                                <select
                                    id='model'
                                    name='model'
                                    required
                                    value={model}
                                    onChange={(e) => {
                                        setModel(e.target.value);
                                        setShowAdditionalOptions(true);
                                    }}
                                    tabIndex={make?.value !== "" ? 0 : -1}
                                    className='mt-1 flex w-full rounded-md border-gray-300 shadow-sm p-5 text-black'>
                                    <option value='' disabled>
                                        Select a model
                                    </option>
                                    {allModels.map((entry) => (
                                        <option
                                            key={entry.id}
                                            value={entry.model}
                                            className='text-black'>
                                            {entry.model
                                                .slice(0, 1)
                                                .toUpperCase() +
                                                entry.model
                                                    .slice(1)
                                                    .toLowerCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor='model'
                                    className='block text-sm font-medium text-gray-700'>
                                    Date of Manufacture
                                </label>
                                <input
                                    type='text'
                                    name='dateOfManufacture'
                                    value={dateOfManufacture}
                                    onChange={(e) =>
                                        setDateOfManufacture(e.target.value)
                                    }
                                    placeholder='When was your car built?'
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-4 text-black'
                                />
                            </div>
                        </div>

                        <div
                            className={`transition-all duration-300 ease-in-out ${
                                allSubmodels.length > 0
                                    ? "opacity-100 max-h-[300px] mt-6 "
                                    : "opacity-0 max-h-0 overflow-hidden"
                            }`}>
                            <label
                                htmlFor='submodel'
                                className='block text-sm font-medium text-gray-700'>
                                Submodel
                            </label>
                            <select
                                id='submodel'
                                name='submodel'
                                required
                                value={submodel}
                                onChange={(e) => setSubmodel(e.target.value)}
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-5 text-black'>
                                <option value='' disabled>
                                    Select a Submodel
                                </option>
                                {allSubmodels.map((model) => (
                                    <option
                                        key={model.id}
                                        value={model.model}
                                        className='text-black'>
                                        {model.model.slice(0, 1).toUpperCase() +
                                            model.model.slice(1).toLowerCase()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div
                            className={`transition-all duration-300 ease-in-out ${
                                showAdditionalOptions
                                    ? "opacity-100 max-h-[300px] mt-6 "
                                    : "opacity-0 max-h-0 overflow-hidden"
                            }`}>
                            <div>
                                <CustomSelect
                                    label='Fuel type'
                                    options={[
                                        "Petrol",
                                        "Diesel",
                                        "Electric",
                                        "Hybrid",
                                    ]}
                                    selectedOption={fuel}
                                    onChange={(e) => setFuel(e.target.value)}
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-5 text-black'
                                    standardOptionText='Select a fuel type'
                                />
                            </div>

                            <div className='mt-6'>
                                <CustomSelect
                                    label='Transmission'
                                    options={["Manual", "Automatic", "CVT"]}
                                    selectedOption={transmission}
                                    onChange={(e) =>
                                        setTransmission(e.target.value)
                                    }
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-5 text-black'
                                    standardOptionText='Select a transmission'
                                />
                            </div>

                            <div className='mt-6'>
                                <label
                                    htmlFor='engineSize'
                                    className='block text-sm font-medium text-gray-700'>
                                    Engine Size
                                </label>
                                <input
                                    type='text'
                                    name='engineSize'
                                    value={engineSize}
                                    onChange={(e) =>
                                        setEngineSize(e.target.value)
                                    }
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-4 text-black'
                                />
                            </div>
                        </div>

                        <button
                            className={`transition-all duration-300 ease-in-out ${
                                make?.value !== "" && model !== ""
                                    ? "mt-6 rounded-lg bg-[rgb(31,234,126)] text-black w-[30%] py-2 text-center font-bold cursor-pointer hover:bg-[#93fcc2] self-center"
                                    : "opacity-0 max-h-0 overflow-hidden"
                            }`}
                            disabled={make?.value === "" || model === ""}
                            onClick={() => {
                                setNextSectionVisible(true);

                                setTimeout(() => {
                                    scrollToNextSection();
                                }, 50);
                            }}>
                            Summary
                        </button>
                    </div>
                </div>
            </section>

            <section
                ref={nextSectionRef}
                className={`${
                    nextSectionVisible
                        ? "h-screen flex flex-col items-center justify-center"
                        : "opacity-0 max-h-0 overflow-hidden"
                }`}>
                <h1 className='font-bold text-4xl my-6'>Summary</h1>
                <p className='mb-5'>You have selected the following car:</p>
                <div className='flex flex-col gap-2'>
                    <div>
                        Make:{" "}
                        {make &&
                            make?.label.slice(0, 1).toUpperCase() +
                                make?.label.slice(1).toLowerCase()}
                    </div>
                    <div>
                        Model:{" "}
                        {model.slice(0, 1).toUpperCase() +
                            model.slice(1).toLowerCase()}
                    </div>
                    {dateOfManufacture !== "" && (
                        <div>Date of Manufacture: {dateOfManufacture}</div>
                    )}
                    {fuel !== "" && <div>Fuel: {fuel}</div>}
                    {transmission !== "" && (
                        <div>Transmission: {transmission}</div>
                    )}
                    {engineSize !== "" && <div>Engine Size: {engineSize}</div>}
                </div>

                <div className='flex gap-2 items-center'>
                    <button
                        className='mt-6 rounded-lg bg-white text-black px-6 py-2 text-center font-bold cursor-pointer hover:bg-gray-300 self-center'
                        disabled={make?.value === "" || model === ""}
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}>
                        Edit Car
                    </button>
                    <Link
                        className='mt-6 rounded-lg bg-[rgb(31,234,126)] text-black px-6 py-2 text-center font-bold cursor-pointer hover:bg-[#93fcc2] self-center'
                        href={"/done"}>
                        Find Parts
                    </Link>
                </div>
            </section>
        </div>
    );
}
