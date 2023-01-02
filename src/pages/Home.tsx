import { useEffect } from "react";
import LinkButton from "../components/Buttons/LinkButton";
import Footer from "../components/Elements/Footer";

function Home() {
  useEffect(() => {
    document.body.classList.add("bg-gray-100");
  }, []);

  return (
    <>
      <section id="hero" className="px-8">
        <div className="md:grid md:grid-cols-12 flex flex-col items-center md:space-x-4">
          <div className="md:col-span-5 order-2 mt-5 w-full">
            <h1 className="text-center font-bold uppercase tracking-wide md:text-left text-indigo-800 text-2xl lg:text-4xl xl:text-6xl ">
              Budget Control Application
            </h1>
            <p className="text-gray-700 mt-4">
              Organize each of your project&apos;s budget and make better
              decisions
            </p>
            <div className="space-x-2">
              <LinkButton
                text="Register"
                textColor="text-gray-100"
                buttonColor="bg-indigo-700"
                link="/register"
              />
              <LinkButton
                text="login"
                buttonColor="bg-gray-300"
                textColor="text-indigo-700"
                link="/login"
              />
            </div>
          </div>
          <img
            className="md:col-span-7 w-full object-fill order-1 md:order-5"
            src="/images/hero-image.jpg"
            alt="Budget"
          />
        </div>
      </section>
      <section className="bg-indigo-600">
        <div className="px-8 py-12 text-gray-100 flex flex-wrap space-y-5">
          <article className="bg-indigo-200 text-indigo-600 py-8 px-3 text-center text-xl w-44 mx-auto rounded-xl">
            <p>
              &quot;This app gives me the information I need to make better
              decisions&quot;
            </p>
          </article>
          <article className="bg-indigo-200 text-indigo-600 py-8 px-3 text-center text-xl w-44 mx-auto rounded-xl">
            <p>
              &quot;This app gives me the information I need to make better
              decisions&quot;
            </p>
          </article>
          <article className="bg-indigo-200 text-indigo-600 py-8 px-3 text-center text-xl w-44 mx-auto rounded-xl">
            <p>
              &quot;This app gives me the information I need to make better
              decisions&quot;
            </p>
          </article>
        </div>
      </section>
      <section className="px-8 py-8">
        <h3 className="text-indigo-800 font-bold text-lg text-center uppercase">
          Pricing Options
        </h3>
        <div className="px-8-py-12 flex flex-wrap space-y-5 justify-around">
          <div className="border-indigo-800 border-2 w-44 rounded-lg">
            <h4 className="px-3 py-2">Entry Level</h4>
            <hr className="border-b-2 border-gray-300" />
            <ul className="list-disc list-inside p-3 decoration-indigo-800">
              <li>Full access</li>
              <li>Up to 5 users</li>
            </ul>
            <hr className="border-b-2 border-gray-300" />
            <h5 className="px-3 py-2 text-red-600">
              $ 15 <span className="text-gray-400">/ month</span>
            </h5>
          </div>
          <div className="border-indigo-800 border-2 w-44 rounded-lg">
            <h4 className="px-3 py-2">Mid Level</h4>
            <hr className="border-b-2 border-gray-300" />
            <ul className="list-disc list-inside p-3">
              <li>Full access</li>
              <li>Up to 10 users</li>
            </ul>
            <hr className="border-b-2 border-gray-300" />
            <h5 className="px-3 py-2 text-red-600">
              $ 30 <span className="text-gray-400">/ month</span>
            </h5>
          </div>
          <div className="border-indigo-800 border-2 w-44 rounded-lg">
            <h4 className="px-3 py-2">Corporate Level</h4>
            <hr className="border-b-2 border-gray-300" />
            <ul className="list-disc list-inside p-3">
              <li>Full access</li>
              <li>Unlimited users</li>
            </ul>
            <hr className="border-b-2 border-gray-300" />
            <h5 className="px-3 py-2 text-gray-800">Contact us</h5>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
