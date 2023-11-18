import React, { Component } from 'react';
// import axios from 'axios';

class TsunamiHealthPredictor extends Component {
    constructor() {
        super();
        this.state = {
            symptom1: 'none',
            symptom2: 'none',
            symptom3: 'none',
            symptom4: 'none',
            symptom5: 'none',
            disease: '',
            remedy: '',
        };
    }

    handleSymptomChange = (symptomName, value) => {
        this.setState({ [symptomName]: value });
    };

    predictDisease = () => {
        // Collect symptom data
        const symptomData = {
            symptom1: this.state.symptom1,
            symptom2: this.state.symptom2,
            symptom3: this.state.symptom3,
            symptom4: this.state.symptom4,
            symptom5: this.state.symptom5,
        };

        // Send symptom data to the backend API
        axios.post('/api/predictDisease', symptomData)
            .then((response) => {
                const { disease, remedy } = response.data;
                this.setState({ disease, remedy });
            })
            .catch((error) => {
                console.error(error);
                // Handle errors, e.g., display an error message to the user
            });
    };

    render() {
        return (
            <div className="container">
                <div className="symptom-dropdown">
                    <label htmlFor="symptom1">Symptom 1:</label>
                    <select
                        id="symptom1"
                        value={this.state.symptom1}
                        onChange={(e) => this.handleSymptomChange('symptom1', e.target.value)}
                    >
                        <option value="Symptom-1">Symptom-1</option>
                        <option value="Symptom-2">Symptom-2</option>
                        <option value="Symptom-3">Symptom-3</option>
                        <option value="Symptom-4">Symptom-4</option>
                        <option value="Symptom-5">Symptom-5</option>
                        <option value="Symptom-6">Symptom-6</option>
                        <option value="Symptom-7">Symptom-7</option>
                        <option value="Symptom-8">Symptom-8</option>
                    </select>
                </div>

                <div className="symptom-dropdown">
                    <label htmlFor="symptom2">Symptom 2:</label>
                    <select
                        id="symptom2"
                        value={this.state.symptom2}
                        onChange={(e) => this.handleSymptomChange('symptom2', e.target.value)}
                    >
                        <option value="Symptom-1">Symptom-1</option>
                        <option value="Symptom-2">Symptom-2</option>
                        <option value="Symptom-3">Symptom-3</option>
                        <option value="Symptom-4">Symptom-4</option>
                        <option value="Symptom-5">Symptom-5</option>
                        <option value="Symptom-6">Symptom-6</option>
                        <option value="Symptom-7">Symptom-7</option>
                        <option value="Symptom-8">Symptom-8</option>
                    </select>
                </div>

                <div className="symptom-dropdown">
                    <label htmlFor="symptom3">Symptom 3:</label>
                    <select
                        id="symptom3"
                        value={this.state.symptom3}
                        onChange={(e) => this.handleSymptomChange('symptom3', e.target.value)}
                    >
                        <option value="Symptom-1">Symptom-1</option>
                        <option value="Symptom-2">Symptom-2</option>
                        <option value="Symptom-3">Symptom-3</option>
                        <option value="Symptom-4">Symptom-4</option>
                        <option value="Symptom-5">Symptom-5</option>
                        <option value="Symptom-6">Symptom-6</option>
                        <option value="Symptom-7">Symptom-7</option>
                        <option value="Symptom-8">Symptom-8</option>
                    </select>
                </div>

                <div className="symptom-dropdown">
                    <label htmlFor="symptom4">Symptom 4:</label>
                    <select
                        id="symptom4"
                        value={this.state.symptom4}
                        onChange={(e) => this.handleSymptomChange('symptom4', e.target.value)}
                    >
                        <option value="Symptom-1">Symptom-1</option>
                        <option value="Symptom-2">Symptom-2</option>
                        <option value="Symptom-3">Symptom-3</option>
                        <option value="Symptom-4">Symptom-4</option>
                        <option value="Symptom-5">Symptom-5</option>
                        <option value="Symptom-6">Symptom-6</option>
                        <option value="Symptom-7">Symptom-7</option>
                        <option value="Symptom-8">Symptom-8</option>
                    </select>
                </div>

                <div className="symptom-dropdown">
                    <label htmlFor="symptom5">Symptom 5:</label>
                    <select
                        id="symptom5"
                        value={this.state.symptom5}
                        onChange={(e) => this.handleSymptomChange('symptom5', e.target.value)}
                    >
                        <option value="Symptom-1">Symptom-1</option>
                        <option value="Symptom-2">Symptom-2</option>
                        <option value="Symptom-3">Symptom-3</option>
                        <option value="Symptom-4">Symptom-4</option>
                        <option value="Symptom-5">Symptom-5</option>
                        <option value="Symptom-6">Symptom-6</option>
                        <option value="Symptom-7">Symptom-7</option>
                        <option value="Symptom-8">Symptom-8</option>
                    </select>
                </div>

                <div className="result">
                    <h2>Predicted Disease:</h2>
                    <p id="disease">{this.state.disease}</p>
                    <h2>Home Remedy:</h2>
                    <p id="remedy">{this.state.remedy}</p>
                </div>
                <button onClick={this.predictDisease}>Predict Disease</button>
            </div>
        );
    }
}

export default TsunamiHealthPredictor;
