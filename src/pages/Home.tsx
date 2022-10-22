import { useEffect } from "react";
import { useMetamaskContext } from "../context/MetamaskContext";

export default function Home() {
  const { account, connect } = useMetamaskContext();

  useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <div>
      {!account.isConnected ? (
        <button onClick={() => connect()}>connect</button>
      ) : (
        <></>
      )}
    </div>
  );
}
