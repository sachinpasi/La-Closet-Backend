const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "qhx76dvg9h4mc8st",
  publicKey: "wqchrt5f6grqm9r5",
  privateKey: "306b1b4d3524eaa3db32649fc429d2bb",
});

exports.GetToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(response);
    }
  });
};
exports.ProcessPayment = (req, res) => {
  const nonceFromTheClient = req.body.paymentData.paymentMethodNonce;
  const amountFromClint = req.body.paymentData.amount;

  gateway.transaction.sale(
    {
      amount: amountFromClint,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
