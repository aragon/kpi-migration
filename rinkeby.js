const ethers = require('ethers');

// TODO: REPLACE THIS
const privateKey = "YOUR_PRIVATE_KEY";

const address = new ethers.Wallet(privateKey).address
const governExecutorProxy = '0x0451533f685fe028c439821b7502e4cf63b4c32f'
const infura = 'https://rinkeby.infura.io/v3/e6842ad9c44a491ea2ce4634511a4b33'

let provider = new ethers.providers.JsonRpcProvider(infura);

let walletWithProvider = new ethers.Wallet(privateKey, provider);

async function call() {
    // TODO: REPLACE THIS with with the same exact data you received in aragon client's migration page
    const originalData = 'REPLACE_HERE';
    
    const data = originalData.split('__');
    const toAddress = data[0]
    const calldatas = data.slice(1)
    const promises = []

    calldatas.forEach(calldata => {
      let tx = walletWithProvider.sendTransaction({
        from: address,
        to: toAddress,
        data: calldata,
        value: 0,
        type: 1,
        accessList: [
          {
            address: governExecutorProxy,
            storageKeys: []
          }
        ]
      })
      promises.push(tx)
    })

    Promise.all(promises).then(data => {
        console.log(data, " all transaction data");
    })
}

call();