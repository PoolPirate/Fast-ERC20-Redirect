import { ethers } from "ethers";
import erc20Abi from "@openzeppelin/contracts/build/contracts/IERC20.json" assert { type: "json" };

const privateKey = "";
const monitoredAddress = "".toLowerCase(); //All lower, no 0x
const newWallet = "".toLowerCase(); //All lower, no 0x
const providerURL = "wss://";

if (privateKey.length == 0) {
  console.log("Specify privateKey!");
  process.exit(0);
}
if (monitoredAddress.length == 0) {
  console.log("Specify monitoredAddress!");
  process.exit(0);
}
if (newWallet.length == 0) {
  console.log("Specify newWallet!");
  process.exit(0);
}
if (providerURL.length == 0) {
  console.log("Specify providerURL!");
  process.exit(0);
}

const provider = new ethers.providers.WebSocketProvider(providerURL);
const wallet = new ethers.Wallet(privateKey, provider);
const erc20Interface = new ethers.utils.Interface(erc20Abi.abi);
const abiCoder = new ethers.utils.AbiCoder();
const filter = {
  topics: [
    ethers.utils.id("Transfer(address,address,uint256)"),
    null,
    abiCoder.encode(["address"], [monitoredAddress]),
  ],
};
provider.on(filter, (params) => {
  redirectTransferAsync(params)
    .then(() => console.log("Successfully redirected"))
    .catch(() => console.log("Redirection failed"));
});
async function redirectTransferAsync(params) {
  if (params.data == "0x") {
    return;
  } //Ignore NFTs

  console.log("Incoming transfer detected: " + params.transactionHash);
  const contractAddress = params.address;
  const contract = new ethers.Contract(contractAddress, erc20Interface, wallet);
  const amount = abiCoder.decode(["uint256"], params.data)[0];
  contract.functions
    .transfer(newWallet, amount)
    .then(() => {
      console.log("Successfully transferred out");
    })
    .catch((ex) => {
      console.log("Transferring failed!");
      console.error(ex);
    });
}

await new Promise((resolve) => {});
