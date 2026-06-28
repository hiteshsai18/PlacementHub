import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

function AdminUsers() {

  const [
    users,
    setUsers,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers =
    async () => {

      const res =
        await API.get(
          "/admin/users"
        );

      setUsers(res.data);

    };

  const deleteUser =
    async (id) => {

      if (
        !window.confirm(
          "Delete User?"
        )
      )
        return;

      await API.delete(
        `/admin/users/${id}`
      );

      fetchUsers();

    };

  const updateRole =
    async (
      id,
      role
    ) => {

      await API.put(
        `/admin/users/${id}`,
        {
          role,
        }
      );

      fetchUsers();

    };

  const filtered =
    users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div
      style={{
        display:"flex",
      }}
    >

      <Sidebar/>

      <div
        style={{
          flex:1,
          padding:"20px",
        }}
      >

        <Navbar/>

        <h1>
          Manage Users
        </h1>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
        />

        <br/>
        <br/>

        <table
          border="1"
          cellPadding="10"
        >

          <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

            <th>Actions</th>

          </tr>

          </thead>

          <tbody>

          {filtered.map(
            (user)=>(
              <tr
                key={user._id}
              >

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>

                  <button
                    onClick={()=>
                    updateRole(
                      user._id,
                      user.role==="admin"
                      ?"user"
                      :"admin"
                    )
                    }
                  >
                    Change Role
                  </button>

                  {" "}

                  <button
                    onClick={()=>
                    deleteUser(
                      user._id
                    )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>
            )
          )}

          </tbody>

        </table>

      </div>

    </div>
  );

}

export default AdminUsers;