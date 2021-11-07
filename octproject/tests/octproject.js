const anchor = require('@project-serum/anchor');

const main = async() => {
  console.log("🚀 Starting test...")

  anchor.setProvider(anchor.Provider.env()); // solana config get
  const program = anchor.workspace.Octproject; // compile code in lib.rs, deploy locally on validator
  const tx = await program.rpc.startStuffOff(); // call and await program.rpc.startStuffOff(), wait for local validator to "mine" instruction

  // anchor.workspace.Octproject = look at programs/octproject/src/lib.rs 


  console.log("📝 Your transaction signature", tx);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();