# Fast-Erc20-Redirect
Ever had you private key exposed? Accidently gave someone a permit which you cannot revoke? This is what you need!

## How does it work?
This will use a Websocket RPC provider to monitor your address.
Whenever an ERC-20 is received it will automatically send it to a another specified address.

## Configure
Open the `fast_erc20_redirect.js` file and fill in values in line 4-7.

privateKey: The hex private key for you wallet (Not the mnemonic seed!)
monitoredAddress: The address matching your private key
newWallet: The target wallet that all tokens are sent to
providerURL: A Websocket RPC provider URL (Most free WSS providers will not work, one option is the <a href="https://www.quicknode.com/">QuickNode</a> free tier)

## How to run
0. **You should read a script before putting your private key into it**
1. Install node & npm
2. `npm i`
3. `node fast_erc20_redirect.js`
4. Keep running 24/7
