import { createContext, useContext, useEffect, useState } from "react";
import { Account } from "../types";

export type MetamaskContextType = {
  account: Account;
  connect: () => void;
};

const defaultAccount = {
  hasMetamask: true,
  isConnected: false,
  chainID: "",
  address: "",
  ethers: 0,
};

const Context = createContext<MetamaskContextType>({
  account: defaultAccount,
  connect: () => {},
});
export const useMetamaskContext = () => useContext(Context);

export default function MetamaskContext({
  children,
}: {
  children: JSX.Element;
}) {
  let [account, setAccount] = useState<Account>(defaultAccount);

  useEffect(() => {
    const ethereum = window.ethereum;

		if (!ethereum) {
			setAccount((acc) => ({
				...acc,
				hasMetamask: false
			}))
			return
		}

    ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
      if (!account.isConnected && accounts.length !== 0)
        setAccount((acc) => ({
          ...acc,
          isConnected: true,
          address: accounts[0],
        }));
    });

    ethereum.request({ method: "eth_chainId" }).then((chainID: string) =>
      setAccount((acc) => ({
        ...acc,
        chainID: chainID,
      }))
    );
		

    ethereum.on("accountsChanged", (accounts: string[]) => {
      console.log("accountsChanged");
      setAccount((acc) => ({
        ...acc,
        address: accounts.length == 0 ? "" : accounts[0],
        isConnected: accounts.length == 0 ? false : true,
      }));
    });

    ethereum.on("chainChanged", (chainID: string) => {
      setAccount((acc) => ({
        ...acc,
        chainID: chainID,
      }));
    });

    return () => {
      ethereum.removeListener("chainChanged", () => null);
      ethereum.removeListener("accountsChanged", () => null);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        account: account,
        connect: () => {
          window.ethereum.request({ method: "eth_requestAccounts" });
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
