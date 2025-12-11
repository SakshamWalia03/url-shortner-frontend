import React, { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import api from "../../api/api";
import toast from "react-hot-toast";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const shortenUrl = `${
        import.meta.env.VITE_REACT_SUBDOMAIN_URL +
        `/s/${res.shortUrl}`
      }`;

      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short URL Copied to Clipboard", {
          position: "bottom-center",
          className: "mb-5",
          duration: 3000,
        });
      });

      await refetch();
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Create ShortURL Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-black/10 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[470px] w-[360px] relative bg-white shadow-xl border border-gray-200 pt-10 pb-6 sm:px-10 px-5 rounded-2xl"
      >
        {/* Close Button */}
        {!loading && (
          <Tooltip title="Close">
            <button
              disabled={loading}
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 hover:bg-gray-100 p-1 rounded-full transition"
            >
              <RxCross2 className="text-gray-700 text-2xl" />
            </button>
          </Tooltip>
        )}

        {/* Title */}
        <h1 className="font-montserrat text-center font-bold sm:text-2xl text-xl text-gray-800">
          Create Short URL
        </h1>

        <p className="text-center text-gray-600 text-sm mt-1 mb-4">
          Paste a long URL below and generate a clean short link
        </p>

        <hr className="border-gray-300 mb-4" />

        {/* Input */}
        <div>
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
          />
        </div>

        {/* Button */}
        <button
          className="w-full btn-gradient py-2.5 text-white font-semibold rounded-lg mt-5 shadow-md hover:opacity-90 transition"
          type="submit"
        >
          {loading ? "Creating..." : "Create Short URL"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewShorten;