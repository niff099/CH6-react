import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

import "../App.css";

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function Homepage() {
  // store data secara state react nya
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch data => fetch / axios
  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get("/shops");

        const data = response.data;
        if (data.isSuccess) {
          setShops(data.data.shops);
        } else {
          console.log(response);
          setError("error");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3 tex">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Meet our leadership
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm/6 font-semibold text-indigo-600">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* header */}
      <header className="flex justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-blue-800">Binar Car Rental</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-700">
              Our Services
            </a>
            <a href="#" className="text-gray-700">
              Why Us
            </a>
            <a href="#" className="text-gray-700">
              Testimonial
            </a>
            <a href="#" className="text-gray-700">
              FAQ
            </a>
          </nav>
        </div>
        <button className="px-4 py-2 text-white bg-green-500 rounded-md">
          Register
        </button>
      </header>
      <main className="text-center">
        {loading && <p> loading... </p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.length === 0 ? (
              <p className="text-gray-500">No Data Avalilable.</p>
            ) : (
              shops.map((shop, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md bg-white shadow-md"
                >
                  <img
                    src={shop.products[0].images[0]}
                    alt={shop.products[0].name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="font-semibold">{shop.products[0].name}</h3>
                  <p className="text-green-500 font-bold">
                    Rp {shop.products[0].price} / hari
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                    <span>4 orang</span>
                    <span>Manual</span>
                    <span>Tahun 2020</span>
                  </div>
                  <button className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md">
                    Pilih Mobil
                  </button>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </>
  );
}

export default Homepage;
