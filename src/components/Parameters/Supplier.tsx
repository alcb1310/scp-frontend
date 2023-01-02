/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRequest } from "../../api/connection";
import {
  StoreDataType,
  DisplayStatusType,
  GetSuppliersType,
} from "../../types";
import {
  SupplierAddData,
  SupplierEditData,
  SupplierHomeData,
} from "../../helpers/Supplier";
import Loading from "../Elements/Loading";

export default function Supplier() {
  const [suppliers, setSuppliers] = useState<GetSuppliersType[]>([]);
  const [supplierUuid, setSupplierUuid] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const storeData: StoreDataType = useSelector((state: StoreDataType) => state);

  const [infoToDisplay, setInfoToDisplay] = useState<DisplayStatusType>("home");

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getRequest("/suppliers", null, {
      token: storeData.token,
      type: storeData.type,
    });

    setSuppliers(data.data.detail);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData().catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSupplier = () => {
    setInfoToDisplay("add");
  };

  const saveSupplier = async () => {
    setInfoToDisplay("home");
    await fetchData();
  };

  const editSupplier = (supplierId: string) => {
    setSupplierUuid(supplierId);
    setInfoToDisplay("edit");
  };

  const info = isLoading ? (
    <Loading />
  ) : infoToDisplay === "home" ? (
    <SupplierHomeData
      suppliers={suppliers}
      addSupplier={addSupplier}
      editSupplier={editSupplier}
    />
  ) : infoToDisplay === "add" ? (
    <SupplierAddData saveSupplier={saveSupplier} />
  ) : (
    <SupplierEditData saveSupplier={saveSupplier} supplierUuid={supplierUuid} />
  );

  return <div className="w-full">{info}</div>;
}
