"use client"
import React, { useState, FormEvent } from 'react';
import { addTenant } from '@/lib/actions/delete';
import styles from '@/lib/actions/addUser.module.css';
import { FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';


const AddUserPage: React.FC = () => {
  const navigator=useRouter()
  const {toast}=useToast()
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await addTenant(formData);
      toast({
        title: "Tenant Added Successfully"
      })
      navigator.push("/tenant-management")
    } catch (error) {
      console.error('Failed to add tenant:', error);
      toast({
        title: "Failed to add tenant"
      })
    }
  };
  return (
    <section className="mt-16 flex justify-center items-center p-16">
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="max-w-sm">
            <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">
            Org. Name
            </label>
            <input
              type="text"
              name="name"
              id="input-label"
              required
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="Name"
            />
          </div>
          <div className="max-w-sm">
            <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">
              Industry
            </label>
            <input
              type="text"
              name='industry'
              id="input-label"
              required
              placeholder="Enter Industry"
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
            />
          </div>
          <div className="max-w-sm">
            <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">
              Descrition
            </label>
            <input
              type="text"
              name='description'
              id="input-label"
              required
              className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              placeholder="Enter description"
            />
          </div>
          <button
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            type="submit"
          >
            Add Tenant
          </button>
          <Link href="/tenant-management">
            <button
              className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-amber-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
           Cancel
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default AddUserPage;
