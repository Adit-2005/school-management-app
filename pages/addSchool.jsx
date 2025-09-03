import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [message, setMessage] = useState("");

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    if (!res.ok) throw new Error("Cloudinary upload failed");
    return res.json();
  };

  const onSubmit = async (data) => {
    setMessage("");
    try {
      let imageUrl = "";
      if (data.image?.[0]) {
        const uploaded = await uploadToCloudinary(data.image[0]);
        imageUrl = uploaded.secure_url;
      }

      const payload = {
        name: data.name?.trim(),
        address: data.address?.trim(),
        city: data.city?.trim(),
        state: data.state?.trim(),
        contact: data.contact?.trim(),
        email_id: data.email_id?.trim(),
        image: imageUrl
      };

      const res = await fetch("/api/addSchool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to add school");
      setMessage(result.message || "School added successfully");
      reset();
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <main className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Add New School</h1>
        <Link href="/showSchools" className="btn bg-slate-800 hover:bg-slate-700">View Schools</Link>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="label">School Name</label>
            <input className="input" placeholder="e.g., Springdale Public School"
              {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">Email</label>
            <input className="input" placeholder="school@example.com"
              {...register("email_id", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
              })} />
            {errors.email_id && <p className="error">{errors.email_id.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="label">Address</label>
            <input className="input" placeholder="123, Main Road"
              {...register("address", { required: "Address is required" })} />
            {errors.address && <p className="error">{errors.address.message}</p>}
          </div>

          <div>
            <label className="label">City</label>
            <input className="input" placeholder="e.g., Pune"
              {...register("city", { required: "City is required" })} />
            {errors.city && <p className="error">{errors.city.message}</p>}
          </div>

          <div>
            <label className="label">State</label>
            <input className="input" placeholder="e.g., Maharashtra"
              {...register("state", { required: "State is required" })} />
            {errors.state && <p className="error">{errors.state.message}</p>}
          </div>

          <div>
            <label className="label">Contact Number</label>
            <input className="input" placeholder="10-12 digit phone"
              {...register("contact", {
                required: "Contact is required",
                pattern: { value: /^[0-9]{10,12}$/, message: "Enter 10-12 digits" }
              })} />
            {errors.contact && <p className="error">{errors.contact.message}</p>}
          </div>

          <div>
            <label className="label">School Image</label>
            <input className="input" type="file" accept="image/*"
              {...register("image", { required: "Image is required" })} />
            {errors.image && <p className="error">{errors.image.message}</p>}
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button type="button" onClick={() => location.reload()} className="btn bg-slate-800 hover:bg-slate-700">
              Reset
            </button>
          </div>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </main>
  );
}
