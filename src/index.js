import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./rod-of-asclepius.png";

function BodyMassIndexTable() {
  return (
    <table>
      <caption style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
        BMI Ranges
      </caption>
      <tr>
        <th>BMI</th>
        <th>Category</th>
      </tr>
      <tr>
        <td>&lt; 16.0</td>
        <td>Severely underweight</td>
      </tr>
      <tr>
        <td>16.0 - 18.4</td>
        <td>Underweight</td>
      </tr>
      <tr>
        <td>18.5 - 24.9</td>
        <td>Healthy weight</td>
      </tr>
      <tr>
        <td>25.0 - 29.9</td>
        <td>Overweight</td>
      </tr>
      <tr>
        <td>30.0 - 34.9</td>
        <td>Moderately obese</td>
      </tr>
      <tr>
        <td>35.0 - 40.0</td>
        <td>Severely obese</td>
      </tr>
      <tr>
        <td>&gt; 40.0</td>
        <td>Morbidly obese</td>
      </tr>
    </table>
  );
}

function Tabs(props) {
  function clickImp() {
    if (props.form === "met") {
      props.render();
    }
  }

  function clickMet() {
    if (props.form === "imp") {
      props.render();
    }
  }

  return (
    <div className="tab">
      <button onClick={clickImp}>Imperial</button>
      <button onClick={clickMet}>Metric</button>
    </div>
  );
}

function ImperialForm(props) {
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [BMI, setBMI] = useState();

  function handleWeight(e) {
    setWeight(e.target.value);
  }

  function handleFeet(e) {
    setFeet(e.target.value);
  }

  function handleInches(e) {
    setInches(e.target.value);
  }

  function calculateBMI(e) {
    const heightInInches = feet * 12 + parseInt(inches);
    const bodyMassIndex = (weight / Math.pow(heightInInches, 2)) * 703;
    setBMI(bodyMassIndex.toFixed(1));
    e.preventDefault();
  }

  function toggleForm() {
    props.toggle();
  }

  return (
    <form onSubmit={calculateBMI}>
      <Tabs render={toggleForm} form={props.form} />
      <label>Weight</label>
      <br />
      <input
        type="number"
        placeholder="lbs"
        onChange={handleWeight}
        value={weight}
        min="80"
      />
      <br />
      <label>Height</label>
      <br />
      <input
        type="number"
        placeholder="feet"
        onChange={handleFeet}
        value={feet}
        min="2"
        max="7"
      />
      <input
        type="number"
        placeholder="inches"
        onChange={handleInches}
        value={inches}
        min="0"
        max="11"
      />
      <br />
      <button className="calculate-button">Calculate BMI</button>
      <p style={{ fontSize: 20 }}>
        Your BMI:{" "}
        <span style={{ fontWeight: "bold", fontSize: 28 }}>
          {!isNaN(BMI) && BMI}
        </span>
      </p>
    </form>
  );
}

function MetricForm(props) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [BMI, setBMI] = useState();

  function handleWeight(e) {
    setWeight(e.target.value);
  }

  function handleHeight(e) {
    setHeight(e.target.value);
  }

  function calculateBMI(e) {
    const heightInMeters = height * 0.01;
    const bodyMassIndex = weight / Math.pow(heightInMeters, 2);
    setBMI(bodyMassIndex.toFixed(1));
    e.preventDefault();
  }

  function toggleForm() {
    props.toggle();
  }

  return (
    <form onSubmit={calculateBMI}>
      <Tabs render={toggleForm} form={props.form} />
      <label>Weight</label>
      <br />
      <input
        type="number"
        step="0.01"
        placeholder="kg"
        onChange={handleWeight}
        value={weight}
        min="36.29"
      />
      <br />
      <label>Height</label>
      <br />
      <input
        type="number"
        step="0.01"
        placeholder="cm"
        onChange={handleHeight}
        value={height}
        min="60.96"
        max="241.3"
      />
      <br />
      <button className="calculate-button">Calculate BMI</button>
      <p style={{ fontSize: 20 }}>
        Your BMI:{" "}
        <span style={{ fontWeight: "bold", fontSize: 28 }}>
          {!isNaN(BMI) && BMI}
        </span>
      </p>
    </form>
  );
}

// Parent component
class BodyMassIndexCalculator extends React.Component {
  constructor() {
    super();
    this.state = { display: "imp" };
    this.handleImp = this.handleImp.bind(this);
    this.handleMet = this.handleMet.bind(this);
  }

  handleImp() {
    this.setState({
      display: "imp",
    });
  }

  handleMet() {
    this.setState({
      display: "met",
    });
  }

  renderForm() {
    if (this.state.display === "imp") {
      return <ImperialForm toggle={this.handleMet} form={this.state.display} />;
    } else if (this.state.display === "met") {
      return <MetricForm toggle={this.handleImp} form={this.state.display} />;
    }
  }

  render() {
    return (
      <div>
        <img src={logo} alt="" />
        <h1>Calculate Your Body Mass Index</h1>
        {this.renderForm()}
        <BodyMassIndexTable />
      </div>
    );
  }
}

ReactDOM.render(<BodyMassIndexCalculator />, document.getElementById("root"));
