"use client"
import React, { useState, useEffect, FormEvent } from 'react';
import styles from '@/lib/actions/addUser.module.css';
import {  useRouter, useSearchParams } from 'next/navigation';
import { Description } from '@radix-ui/react-toast';
import { updateTenant } from '@/lib/actions/update-tenant';
import { useToast } from "@/components/ui/use-toast"


const EditTenantPage= () => {
  const [description, setDescription] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [name, setName] = useState<string>('');
  const router = useSearchParams();
  const id  = router.get("id");
  const {toast}=useToast();
  const navigator=useRouter()
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('description',description);
    formData.append('industry', industry);
    formData.append('name', name);
    try {
      await updateTenant( id!,formData);
      toast({
        title: "Tenant Updated Successfully"
      })
      navigator.push("/tenant-management")
    } catch (error:any) {
      console.error('Failed to update tenant:', error.message);
      toast({
        title: "Couldn't Update Tenant"
      })
    }
  };

  return (
    <section className="mt-24 flex-col justify-center items-center p-16">
      <h1>Update user details  </h1>
      <div className={styles.container}>
      
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name Field */}
          <div className="max-w-sm">
            <label htmlFor="name-input" className="block text-sm font-medium mb-2 dark:text-white">
    Name
            </label>
            <input
              type="text"
              id="name-input"
              name="name"
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="Change Name"
              // placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="max-w-sm">
            <label htmlFor="description" className="block text-sm font-medium mb-2 dark:text-white">
            Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="Change Email"
              // placeholder={user?.email}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="max-w-sm">
            <label htmlFor="password-input" className="block text-sm font-medium mb-2 dark:text-white">
            Industry (Leave blank to keep unchanged)
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="Change Industry"
              // value={password}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
         
          {/* Submit Button */}
          <button
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mt-4"
            type="submit"
          >
  Update User
          </button>
        </form>
      </div>
    </section>
  );
};
export default EditTenantPage;
