import "./ManageUsers.css";
import UsersForm from "../../components/UsersForm/UsersForm";
import UsersList from "../../components/UsersList/UsersList";
import { useEffect, useState } from "react";
import { getUsers } from "../../service/UserService";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UsersForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UsersList setUsers={setUsers} users={users} />
      </div>
    </div>
  );
};

export default ManageUsers;
