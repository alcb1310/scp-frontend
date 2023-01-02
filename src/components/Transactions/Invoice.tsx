/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRequest } from "../../api/getRequest";
import {
  DisplayStatusType,
  ErrorType,
  GetSuppliersType,
  ProjectType,
  StoreDataType,
} from "../../types";
import AddButton from "../Buttons/AddButton";
import Loading from "../Elements/Loading";
import { InvoiceFormData } from "../../helpers/Invoice";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import { postRequest, fetchProjectsAndSuppliers } from "../../api/connection";

type InvoiceDisplayType = {
  uuid: string;
  invoice_number: string;
  date: string;
  total: number;
  project: ProjectType;
  supplier: GetSuppliersType;
};

export type SaveInvoiceType = {
  project: string;
  supplier: string;
  invoice_number: string;
  date: string;
  total: number;
};

const useFetchInvoices = (storeData: StoreDataType, setIsLoading: any) => {
  const [invoices, setInvoices] = useState<InvoiceDisplayType[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const invoicesResult = await getRequest("/invoices", null, {
      token: storeData.token,
      type: storeData.type,
    });
    setInvoices(invoicesResult.data.detail);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData().catch((err) => {
      console.error(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return invoices;
};

function InvoiceHomeData({
  invoices,
  addInvoice,
}: {
  invoices: InvoiceDisplayType[];
  addInvoice: any;
}) {
  const invoicesToDisplay = invoices.map((invoice) => {
    return (
      <tr className="hover:bg-indigo-100" key={invoice.uuid}>
        <td className="border-x-2 p-3">{invoice.date}</td>
        <td className="border-x-2 p-3">{invoice.project.name}</td>
        <td className="border-x-2 p-3">{invoice.supplier.name}</td>
        <td className="border-x-2 p-3">{invoice.invoice_number}</td>
        <td className="border-x-2 p-3 text-right">
          {invoice.total.toFixed(2)}
        </td>
      </tr>
    );
  });

  return (
    <table className="mt-2 mx-auto table-auto">
      <caption className="text-left text-2xl font-semibold uppercase pb-5 ">
        <div className="flex justify-between items-center">
          <p className=" w-1/4">Invoices</p>
          <div className="text-base text-right w-1/4">
            <AddButton buttonType="button" text="Add" onEvent={addInvoice} />
          </div>
        </div>
      </caption>
      <thead className="border-b-2 border-black font-bold bg-indigo-200">
        <tr>
          <th className="text-center p-3">Date</th>
          <th className="text-center p-3">Project</th>
          <th className="text-center p-3">Supplier</th>
          <th className="text-center p-3">Number</th>
          <th className="text-center p-3">Total</th>
        </tr>
      </thead>
      <tbody>{invoicesToDisplay}</tbody>
    </table>
  );
}

function InvoiceAddData({ saveInvoice }: { saveInvoice: any }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [suppliers, setSuppliers] = useState<GetSuppliersType[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [addedInvoice, setAddedInvoice] = useState<SaveInvoiceType>({
    project: "",
    supplier: "",
    invoice_number: "",
    date: "",
    total: 0,
  });
  const [displayAddDetail, setDisplayAddDetail] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [invoce, setInvoice] = useState<InvoiceDisplayType | null>(null);

  const storeData = useSelector((state: StoreDataType) => state);

  useEffect(() => {
    fetchProjectsAndSuppliers(
      storeData,
      setIsLoading,
      setProjects,
      setSuppliers
    ).catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError(null);
    setAddedInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const invoiceAddResponse = await postRequest("/invoices", addedInvoice, {
        token: storeData.token,
        type: storeData.type,
      });

      setInvoice(invoiceAddResponse.data.detail);
      setDisplayAddDetail(true);
    } catch (err: any) {
      if (err.response.status === 409)
        setError({
          errorKey: "code",
          errorDescription: err.response.data.detail,
        });
      else setError(err.response.data.detail);
    }
  };

  const handleAddDetail = () => {};
  const handleClose = () => {
    saveInvoice();
  };

  const display = isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit}>
      <InvoiceFormData
        addedInvoice={addedInvoice}
        error={error}
        handleChange={handleChange}
        projects={projects}
        suppliers={suppliers}
      />
      <div className="flex justify-between">
        <div>
          <PrimaryButton
            buttonType="submit"
            text="Submit"
            onEvent={handleSubmit}
          />
          <SecondaryButton
            buttonType="button"
            text="Close"
            onEvent={handleClose}
          />
        </div>
        {displayAddDetail && (
          <PrimaryButton
            buttonType="button"
            text="Add Detail"
            onEvent={handleAddDetail}
          />
        )}
      </div>
    </form>
  );

  return display;
}

export default function Invoice() {
  const [infoToDisplay, setInfoToDisplay] = useState<DisplayStatusType>("home");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const storeData = useSelector((state: StoreDataType) => state);

  const invoices = useFetchInvoices(storeData, setIsLoading);

  const addInovice = () => setInfoToDisplay("add");

  const saveInvoice = () => {
    setInfoToDisplay("home");
  };

  const displayData = isLoading ? (
    <Loading />
  ) : infoToDisplay === "home" ? (
    <InvoiceHomeData invoices={invoices} addInvoice={addInovice} />
  ) : infoToDisplay === "add" ? (
    <InvoiceAddData saveInvoice={saveInvoice} />
  ) : (
    <h1>Invoice</h1>
  );

  return displayData;
}
