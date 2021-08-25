### KPI Migration Guide

Welcome to the official script migration repository. The following instructions will help run a script that will generate a proposal on your Aragon Client DAO to migrate its funds to your new Aragon Govern DAO.

The script needs to be run with node.js and yarn, please make sure both are installed in your local machine. At this point of time it not possible to run this script inside the Aragon Client application with your favorite wallet. 

### Why ?

Aragon Govern enables users to deploy a DAO using proxy contracts (EIP-1167), and 99.9% of the time users will choose this option (since it saves a lot in gas costs). For the migration to happen, the Aragon client DAO will use `send` call from Solidity, which has a 2300 gas forwarding limit. Since Aragon Govern uses proxies, 2300 is not enough to make the `send` work and it will always fail.

The easiest solution available now to overcome this issue is to use Access List Feature (https://eips.ethereum.org/EIPS/eip-2930), but, at this point of time, this feature does not seem to be supported by any dapp wallet. Because of such limitation, the current solution is to use Access List through `Ethers.js` wallet (which runs programatically).

### How ?

**STEP 1**

* Go to `https://client.aragon.org`, find your DAO, and add `/govern-migration` to the end of the url (ex: https://client.aragon.org/#/aragon/govern-migration).
* Insert your Govern Executor Address (it can be found on the DAO settings of your Aragon Govern DAO in `https://govern.aragon.org`).
* Then, click to generate the script. The result will show a huge junk of letters and numbers, this is expected. Make sure that you copy it exactly as it's shown, entirely.

**STEP 2**

* Clone this repository to your local machine.
* Go to the root directory and run `yarn` to install dependencies.
* Open to `mainnet.js` file for edition to update 2 things:
  - Your private key. Look for the first TODO on line 3. More about the security of this step below. Your private key can be exported from your dapp wallet (ex: Metamask)
  - The originaData parameter (The big junk of letters you received in `step 1`). Look for the second TODO on line 15.
* Once all is done, run `node mainnet.js` on the root directory in the terminal. Wait a couple of seconds and it should submit the transaction. A log of the transaction will be displayed in the terminal.
* You should be able to see a new proposal on your Aragon Client DAO ready to be voted now.

### Security

This script is as secure as calling any transaction from any dapp. Although you are adding your private key on the file, this information is not shared or transmitted anywhere, but just used to execute the transaction (this is what a dapp wallet does on the background). Just make sure that once you execute the transaction, you remove the private key from `mainnet.js` file so that it doesn't stay there for future reference. Also, do not commit the changes to your cloned repo. Even better, delete this repo from your machine :)
