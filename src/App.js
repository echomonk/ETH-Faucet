import { useEffect, useState } from "react";
import { useCallback } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContract } from "./utils/load-contract";

// a faucet contract that users can add and withdraw ETH.

// Setting provider via web3 injection
function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null
  })

  // State variables
  const [balance, setBalance] = useState(null)
  const [account, setAccount] = useState(null)
  const [shouldReload, reload] = useState(false)

  // If user is not connected to the contract
  const canConnectToContract = account && web3Api.contract
  const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload])

  // When changing account and network
  const setAccountListener = provider => {
    provider.on("accountsChanged", accounts => window.location.reload())
    provider.on("chainChanged", accounts => window.location.reload())
  }

  // To load provider once. It will load again if state is changed.
  // If provider (Metamask) is not loaded it will display error messsage
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()

      if (provider) {
        const contract = await loadContract("Faucet", provider)
        setAccountListener(provider)
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true
        })
      } else {
        setWeb3Api(api => ({...api, isProviderLoaded: true}))
        console.error("Please install Metamask")
      }
    }

    loadProvider()
  }, [])

  // To load balance once. It will load again if state is changed.
  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api
      const balance = await web3.eth.getBalance(contract.address)
      setBalance(web3.utils.fromWei(balance, "ether"), balance)
    }
    web3Api.contract && loadBalance()
  }, [web3Api, shouldReload])

  // To retrieve account.
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount()
  }, [web3Api.web3])

  // This function calls addFunds function from the main contract.
  // It also donates 1 ETH instead of giving option to the user.
  // See buttons below.
  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether")
    })
    reloadEffect()
  }, [web3Api, account, reloadEffect])

  // This function calls addFunds function from the main contract.
  // It also withdraws 0.1 ETH (see modifier(limitWithdraw)in FaucetContract) instead of giving option to the user.
  // See buttons below.
  const withdraw = async () => {
    const { contract, web3 } = web3Api
    const withdrawAmount = web3.utils.toWei("0.1", "ether")
    await contract.withdraw(withdrawAmount, {
      from: account
    })
    reloadEffect()
  } 

  return (
    <>
    <div className="faucet-wrapper">
      <div className="faucet">
        { web3Api.isProviderLoaded ?
          <div className="is-flex is-align-items-center">
          <span>
            <strong className="mr-2">Account: </strong>
          </span>
            { account ? <div>{account}</div> : 
            !web3Api.provider ?
            <>
              <div className="notification is-warning is-size-6 is-rounded">
                Metamask is not detected!{` `}
                <a 
                  rel="noreferrer"
                  target="_blank" 
                  href="https:docs.metamask.io">
                  Install Metamask
                </a>
              </div>
            </> :
            <button 
            className="button is-warning is-light"
              onClick={() => 
                web3Api.provider.request({method: "eth_requestAccounts"}
                )}
            >
              Connect Wallet
              </button>}
          </div> :
          <span>Looking for web3</span>
        }
        <div className="balance-view is-size-2 my-4">
          Current Contract Balance <strong>{balance}</strong> ETH
        </div>
        { !canConnectToContract &&
          <i className="is-block mb-2">
            Please connect to Ganache Network!
          </i>
        }
        <button 
          disabled={!canConnectToContract}
          onClick={addFunds}
          className="button is-info is-light mr-2"> Donate 1 ETH</button>
        <button 
          disabled={!canConnectToContract}
          onClick={withdraw}
          className="button is-success is-light">Withdraw 0.1 ETH</button>
      </div>
    </div>
    </>
  );
}

export default App;
