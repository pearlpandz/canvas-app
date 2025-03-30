import React, { useEffect, useState } from "react";

// Third party Components
import { useForm } from "react-hook-form";

//Styles
import "./Form.css";

const Form = (props) => {
  const { setCompanyDetails, companyDetails } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm({
    mode: "onChange",
  });

  const [preview, setPreview] = useState(null);

  /* To show the data in form if user comes back to form after submit 
   Just added this not sure if required */
  useEffect(() => {
    if (companyDetails && Object.keys(companyDetails).length > 0) {
      setValue("companyName", companyDetails.companyName || "");
      setValue("mobileNumber", companyDetails.mobileNumber || "");
      setValue(
        "alternateMobileNumber",
        companyDetails.alternateMobileNumber || ""
      );
      setValue("email", companyDetails.email || "");
      setValue("website", companyDetails.website || "");
      setValue("description", companyDetails.description || "");
      setValue("image", companyDetails.image || "");
      setPreview(companyDetails.image || null);
      trigger();
    }
  }, [companyDetails, setValue, trigger]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    data.image = preview;
    localStorage.setItem("companyDetails", JSON.stringify(data));
    setCompanyDetails(data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Upload Image</label>
          <div className="image-group">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
            />
            {preview && (
              <img src={preview} alt="Preview" className="image-preview" />
            )}
          </div>
          {errors.image && (
            <span className="error">{errors.image.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Company Name *</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            {...register("companyName", {
              required: "Company Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only alphabets are allowed",
              },
            })}
          />
          {errors.companyName && (
            <span className="error">{errors.companyName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Mobile Number *</label>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            {...register("mobileNumber", {
              required: "Mobile Number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
          />
          {errors.mobileNumber && (
            <span className="error">{errors.mobileNumber.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Alternate Mobile Number</label>
          <input
            type="text"
            placeholder="Enter Alternate Mobile Number"
            {...register("alternateMobileNumber", {
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
          />
          {errors.alternateMobileNumber && (
            <span className="error">
              {errors.alternateMobileNumber.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            placeholder="Enter Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Website *</label>
          <input
            type="url"
            placeholder="Enter Website URL"
            {...register("website", {
              required: "Website is required",
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Enter a valid URL",
              },
            })}
          />
          {errors.website && (
            <span className="error">{errors.website.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            placeholder="Enter Description"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <span className="error">{errors.description.message}</span>
          )}
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;