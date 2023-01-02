import { ChangeEventHandler } from "react";
import { ErrorType, GetSuppliersType } from "../../types";
import InputElement from "../../components/Inputs/InputElement";

export default function SupplierForm({
  supplier,
  error,
  handleChange,
}: {
  supplier: GetSuppliersType | null;
  error: ErrorType | null;
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return (
    <>
      <InputElement
        label="ID"
        error={error}
        inputName="supplier_id"
        required
        inputType="text"
        onChange={handleChange}
        value={
          supplier !== null && "supplier_id" in supplier
            ? supplier.supplier_id
            : ""
        }
        enabled
      />
      <InputElement
        label="Name"
        error={error}
        inputName="name"
        required
        inputType="text"
        onChange={handleChange}
        value={supplier !== null && "name" in supplier ? supplier.name : ""}
        enabled
      />
      <InputElement
        label="Contact Name"
        error={error}
        inputName="contact_name"
        required={false}
        inputType="text"
        onChange={handleChange}
        value={
          supplier !== null && "contact_name" in supplier
            ? supplier.contact_name
            : ""
        }
        enabled
      />
      <InputElement
        label="Contact Email"
        error={error}
        inputName="contact_email"
        required={false}
        inputType="text"
        onChange={handleChange}
        value={
          supplier !== null && "contact_email" in supplier
            ? supplier.contact_email
            : ""
        }
        enabled
      />
      <InputElement
        label="Contact Phone"
        error={error}
        inputName="contact_phone"
        required={false}
        inputType="text"
        onChange={handleChange}
        value={
          supplier !== null && "contact_phone" in supplier
            ? supplier.contact_phone
            : ""
        }
        enabled
      />
    </>
  );
}
