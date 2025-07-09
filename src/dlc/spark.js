const transfer = await wallet.transfer({
  receiverSparkAddress:
    "sprt1pgssyuuuhnrrdjswal5c3s3rafw9w3y5dd4cjy3duxlf7hjzkp0rqx6dj6mrhu",
  amountSats: 100,
});

console.log("Transfer:", transfer);