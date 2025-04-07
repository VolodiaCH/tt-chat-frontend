import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import OptionalRender from "../../../common/OptionalRender";
import { User } from "../../../../services/usersService";
import { AuthContext } from "../../../../context/contexts";
import { Path } from "../../../../router/routes";

interface UsersListProps {
  users: User[];
  chatUsername: string | null;
  setChatUsername(username: string | null): void;
  onClose: () => void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  chatUsername,
  setChatUsername,
  onClose,
}) => {
  const { isAuthorised, authEmail, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const otherUsers = users.filter(user => user.username !== authEmail);

  const getListItemClassname = (isSelected: boolean) => {
    return `px-2 py-2 cursor-pointer transition
          ${
            isSelected
              ? "bg-blue-50 text-blue-800 font-medium"
              : "hover:bg-gray-50 text-gray-700"
          }
        `;
  };

  const isUsersEmpty = otherUsers.length === 0;

  return (
    <div className="w-64 sm:w-full bg-white p-4 border-r h-full flex flex-col gap-4">
      <button
        className="sm:hidden text-red-500 hover:text-red-700 transition self-start"
        onClick={onClose}
      >
        Close
      </button>

      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="flex gap-2">
          <OptionalRender condition={isAuthorised}>
            <button
              onClick={signOut}
              className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition text-sm"
            >
              Sign-Out
            </button>
          </OptionalRender>
          <OptionalRender condition={!isAuthorised}>
            <button
              onClick={() => navigate(Path.SignIn)}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition text-sm"
            >
              Sign-In
            </button>
          </OptionalRender>
        </div>
      </div>

      <OptionalRender condition={isUsersEmpty}>
        <span className="text-sm text-gray-500">
          There is no users you can message yet.
        </span>
      </OptionalRender>

      <ul className="overflow-y-auto max-h-[calc(100vh-200px)] pr-1 divide-y">
        {otherUsers.map(user => {
          const isSelected = chatUsername === user.username;

          return (
            <li
              key={user._id}
              className={getListItemClassname(isSelected)}
              onClick={() => setChatUsername(user.username)}
            >
              {user.username}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UsersList;
