import React from "react";
import "./Settings.css";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTracking: true,
      clearAllData: false,
    };

    // Bind the method to the component instance
    this.change_inactivity_interval = this.change_inactivity_interval.bind(this);
  }

  componentDidMount() {
    // Mount inactivity interval logic
    var index;
    switch (localStorage["inactivity_interval"]) {
      case "30":
        index = "0";
        break;
      case "60":
        index = "1";
        break;
      case "300":
        index = "2";
        break;
      case "600":
        index = "3";
        break;
      case "900":
        index = "4";
        break;
      case "1800":
        index = "5";
        break;
      case "3600":
        index = "6";
        break;
      case "86400":
        index = "7";
        break;
      default:
        index = "0";
        localStorage["inactivity_interval"] = "30";
    }
    document.getElementById("time-options").selectedIndex = index;

    // Mount isTracking state
    this.setState({ isTracking: JSON.parse(localStorage["is_tracking"] || "true") });
  }

  change_inactivity_interval() {
    var inactivity_interval = document.getElementById("time-options").value;
    localStorage["inactivity_interval"] = inactivity_interval;
  }

  render() {
    return (
      <div class="settings">
        <div class="settings-content">
          Stop Tracking After{" "}
          <select
            id="time-options"
            class="settings-options"
            onChange={this.change_inactivity_interval}
          >
            <option value="30">30 seconds</option>
            <option value="60">1 minute</option>
            <option value="300">5 minutes</option>
            <option value="600">10 minutes</option>
            <option value="900">15 minutes</option>
            <option value="1800">30 minutes</option>
            <option value="3600">1 hour</option>
            <option value="86400">Infinite</option>
          </select>{" "}
          of Inactivity
        </div>

        <button
          class="settings-button"
          onClick={() => {
            this.setState({ isTracking: !this.state.isTracking });
            localStorage["is_tracking"] = !JSON.parse(localStorage["is_tracking"]);
          }}
        >
          {this.state.isTracking ? "Pause Tracking" : "Continue Tracking"}
        </button>

        <button
          class="settings-button"
          onClick={() => {
            this.setState({ clearAllData: true });
            localStorage["domains"] = JSON.stringify({});
            localStorage["today_domains"] = JSON.stringify({});
            localStorage["productive"] = JSON.stringify([]);
            localStorage["unproductive"] = JSON.stringify([]);
          }}
        >
          Clear All Data
        </button>
      </div>
    );
  }
}

export default Settings;
