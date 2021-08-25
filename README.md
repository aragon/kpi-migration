### KPI Migration Guide

Welcome to the official script migration page. The following instruction will help run the script that will migrate the funds
from Aragon's V1 DAO's to new Aragon Govern DAOs.

The script needs to be run through node.js. At this point of time, we can't run this script inside your favorite wallet. 

### Why ?

Our new Govern uses proxy contracts deployed by EIP-1167 if user chooses so. 99.9% of the time, users will choose this option, so we are safe to assume,
that Govern really does use EIP-1167 proxy contracts. For the migration to happen, aragon v1 daos use `send` call from the solidity which has 2300 gas
forwarding limit. Since Govern uses proxies, 2300 is not enough to make the `send` work and it will always fail.

The easiest solution for now is to use Access List Feature (https://eips.ethereum.org/EIPS/eip-2930). Though, at this point of time, this feature does not
seem to be supported by any dapp wallet. Because of such limitations, the current solution is to use Access List through `Ethers.js` wallet.

### How ?

**STEP 1**

* go to `client.aragon.org` , find your dao, and move to `govern-migration` route for that dao.
* put your Govern Executor Address, located on the DAO settings of the specific DAO on `https://govern.aragon.org`.
* Then, generate the script which will show the big, huge junk of letters, numbers. DO MAKE sure that you copy it exactly as it's shown.

**STEP 2**

* clone this repository
* run `yarn`
* go to `mainnet.js` and update 2 things(your private key and your big junk of letters you received in `step 1`. To exactly find what 2 things you have to replace, you will find `TODO` keywords in the `mainnet.js` file)
* once all is done, run `node mainnet.js` in the terminal. Wait a couple of seconds and it should submit the transaction.

### Security

This script is as secure as calling any transaction from any dapp. Just make sure that once you execute the transaction, you remove the private key from
`mainnet.js` file so that it doesn't stay there for future reference or anything...
