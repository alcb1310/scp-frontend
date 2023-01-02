/* eslint-disable no-nested-ternary */
import { useState } from "react";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import BudgetItems from "../components/Parameters/BudgetItems";
import Project from "../components/Parameters/Project";
import Supplier from "../components/Parameters/Supplier";

type ActiveParameterPage = "supplier" | "budget-item" | "project" | null;

function Parameters() {
  const [activePage, setActivePage] = useState<ActiveParameterPage>(null);

  const showActivePage =
    activePage === "supplier" ? (
      <Supplier />
    ) : activePage === "budget-item" ? (
      <BudgetItems />
    ) : activePage === "project" ? (
      <Project />
    ) : (
      <div className="mt-5">
        <div className="flex justify-center">
          <div className="container w-2/3">
            <img
              className="w-full rounded-lg shadow-2xl"
              src="/images/parameters-background.jpg"
              alt="main page"
            />
          </div>
        </div>
      </div>
    );

  return (
    <section className="grid grid-cols-12 text-indigo-800 px-5 min-h-96 space-x-6 mb-5">
      <article className="col-span-9">{showActivePage}</article>
      <aside className="col-span-3 my-3 text-right flex flex-col">
        <PrimaryButton
          buttonType="button"
          text="Suppliers"
          onEvent={() => {
            setActivePage("supplier");
          }}
        />
        <PrimaryButton
          buttonType="button"
          text="Budget Items"
          onEvent={() => {
            setActivePage("budget-item");
          }}
        />
        <PrimaryButton
          buttonType="button"
          text="Projects"
          onEvent={() => {
            setActivePage("project");
          }}
        />
        <hr className="border-b-2 border-indigo-200 mt-5 mb-3" />
        <PrimaryButton
          buttonType="button"
          text="Parameters Home"
          onEvent={() => {
            setActivePage(null);
          }}
        />
      </aside>
    </section>
  );
}

export default Parameters;
