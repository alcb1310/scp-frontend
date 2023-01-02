/* eslint-disable no-nested-ternary */
import { useState } from "react";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Actual from "../components/Reports/Actual";
import Historic from "../components/Reports/Historic";

type ActiveReportPage = "actual" | "historic" | null;

function Reports() {
  const [activePage, setActivePage] = useState<ActiveReportPage>(null);
  const showActivePage =
    activePage === "actual" ? (
      <Actual />
    ) : activePage === "historic" ? (
      <Historic />
    ) : (
      <div className="mt-5">
        <div className="flex justify-center">
          <div className="container w-2/3">
            <img
              src="/images/reports-background.jpg"
              alt="Report main page"
              className="w-full rounded-lg shadow-2xl"
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
          text="Actual"
          onEvent={() => setActivePage("actual")}
        />
        <PrimaryButton
          buttonType="button"
          text="Historic"
          onEvent={() => setActivePage("historic")}
        />
        <hr className="border-b-2 border-indigo-200 mt-5 mb-3" />
        <PrimaryButton
          buttonType="button"
          text="Reports Home"
          onEvent={() => {
            setActivePage(null);
          }}
        />
      </aside>
    </section>
  );
}

export default Reports;
