import React, { useState, useEffect } from 'react';

const ZakatCalculator = () => {
  const [muslimZakat, setMuslimZakat] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const nisab = 595;
    const zakatRate = 0.025;
    if (muslimZakat < nisab) {
      setAmount(0);
    } else {
      const zakatAmount = muslimZakat * zakatRate;
      setAmount(parseFloat(zakatAmount));
    }
  }, [muslimZakat]);

  return (
    <div  >
      <div className="row justify-content-center align-items-center vh-100 ">
        <div className="col-md-4 shadow-none p-3 mb-5 ">
          <h3>Entre Amount</h3>
          <div className="input-group shadow-lg p-3 mb-5 bg-body-tertiary rounded">
          <span class="input-group-text ">TND</span>
            <input type="text" className="form-control" id="amount" onChange={(e) => setMuslimZakat(parseFloat(e.target.value))} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <div className="card-body ">
              <h5 className="card-title shadow-lg p-3 mb-5">ZAKAT</h5>
              <table className="table">
                <tbody>
                <tr>
                    <td><h6>WHAT I HAVE</h6></td>
                    <td>{parseFloat(muslimZakat)}</td>
                  </tr>
                  <tr>
                    <td>Nisab:</td>
                    <td>595</td>
                  </tr>
                  <tr>
                    <td>Zakat Rate:</td>
                    <td>2.5%</td>
                  </tr>
                  <tr>
                    <td>Zakat Amount:</td>
                    <td>{amount.toFixed(2)} Dinar</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
