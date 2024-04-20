import React from "react";
import { deleteTenant, deleteUser } from "@/lib/actions/delete";
import { fetchTenants, fetchUsers } from "@/lib/actions/get";
import Pagination from "@/components/dashboard/Pagination";
import Link from "next/link";
import styles from "@/app/(auth)/admin/users.module.css"
import Search from "../admin/search";
const TenantPage = async (
  {searchParams}:{
    searchParams?:{
      query?:string;
      page?:number;
    }
  }
) => {
  const q  = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const { count, tens } = await fetchTenants(q, page);
  return (
    <section>
      
      <div className=" mt-32 h-full w-100">
        <div className={`${styles.top} fixed gap-4`} >
          <h2>Welcome Admin</h2>
          <Search />
          <Link href="/tenant-management/add">
            <button type="button" className="btn-primarypy-3 p-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">Create New Tenant</button>
          </Link>
        </div>
        <div className={`${styles.container} `}>
          <div className="overflow-auto">
            <table className={styles.table} >
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Industry</td>
                  {/* <td>Created At</td> */}
                  {/* <td>Role</td> */}
                  <td>Description</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {tens.map((user) => (
                  <tr key={user.id} className="m-16">
                    <td>
                      <div >
                        {user.name}
                      </div>
                    </td>
                    <td>{user.industry}</td>
                    <td>{user.description}</td>
                  
                    {/* <td>{user.createdAt?.toString().slice(4, 16)}</td> */}
                    {/* <td>{user.role==="user" ? "Client":"Manager"}</td> */}
                    {/* <td>{user.tenant.map((item:any)=> {return <p key={user._id}>item.tenantName</p>})}</td> */}
                  
                    <td>
                      <div className={styles.buttons} >
                        <Link href={`/tenant-management/edit-tenant/?id=${user._id}`}>
                          <button className="btn-primarypy-3 p-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                      Edit
                          </button>
                        </Link>
                        <form action={deleteTenant}>
                          <input type="hidden" name="id" value={(user.id)} />
                          <button className="btn-primarypy-3 p-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                      Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination count={count} />
        </div>
      </div>
    </section>
  );
};

export default TenantPage;
