import { useState } from "react";
import { useForm } from "react-hook-form";
import "../css/Contact.css";
let renderCount = 0;

export default function ReactHookFormAdvanced() {
  const {
    register,
    handleSubmit,
    formState: {
      touchedFields,
      isDirty,
      isValid,
      dirtyFields,
      isSubmitted,
      errors,
    },
    watch,
  } = useForm();

  const [data, setData] = useState("");
  const watchIsDeveloper = watch("isDeveloper");
  renderCount += 1;
  return (
    <div className="w-full flex justify-center items-center bg-gray-900 p-8">
      <div
        className="w-2/3 shadow-lg rounded-md bg-white p-8 flex flex-col justify-start"
        style={{ height: "700px" }}
      >
        <h2 className="text-center font-medium text-2xl mb-4">
          Formulario De Contacto
        </h2>
        <div className="user_card ">
          <form
            onSubmit={handleSubmit(setData)}
            className="flex flex-1 flex-col justify-evenly"
          >
            <input
              className="border-2 outline-none p-2 rounded-md"
              placeholder="Name"
              {...register("name")}
            />

            <input
              className="border-2 outline-none p-2 rounded-md"
              placeholder="Email"
              {...register("email", { required: "Email is required." })}
            />

            <input
              className="border-2 outline-none p-2 rounded-md"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />

            <button
              className=" flex justify-center p-2 rounded-md
            w-1/2 self-center bg-gray-900  text-white hover:bg-gray-800"
              type="submit"
            >
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
