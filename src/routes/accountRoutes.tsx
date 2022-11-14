import AccountSettings from "components/organisms/Settings/AccountSettings/AccountSettings";
import Account from "views/Account/Account";

export const accountRoutes = [
  {
    path: "/account/*",
    element: <Account />,
    children: [
      { index: true, element: <AccountSettings /> },
      // todo

      // { path: "general", element: <></> },
      // { path: "reminders", element: <></> },
      // { path: "notifications", element: <></> },
    ],
  },
];
