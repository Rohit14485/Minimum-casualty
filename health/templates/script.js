let symptoms = ['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
'yellow_crust_ooze'];
 const state = {
    symptom1: 0,
    symptom2: 0,
    symptom3: 0,
    symptom4: 0,
    symptom5: 0,
    disease: '',
    remedy: '',
};

const handleSymptomChange = (symptomName, value) => {
    state[symptomName] = value;
};

const predictDisease = () => {
    // Collect symptom data

    const symptomData = {
        symptom1: state.symptom1,
        symptom2: state.symptom2,
        symptom3: state.symptom3,
        symptom4: state.symptom4,
        symptom5: state.symptom5,
    };
    const jsonString = JSON.stringify(symptomData);
    const btn = document.getElementById(predeict);
    btn.addEventListener('click', () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonString,
          };
        fetch('https://www.amazon.in/', options)
    })
    // Simulate the response from the backend API
    // In a real application, you would use AJAX or fetch to send a request to the server
    const response = {
        data: {
            disease: 'Predicted Disease',
            remedy: 'Home Remedy',
        },
    };

    const { disease, remedy } = response.data;
    state.disease = disease;
    state.remedy = remedy;

    // Update the HTML elements
    document.getElementById('disease').textContent = disease;
    document.getElementById('remedy').textContent = remedy;
};

// Function to generate options dynamically
function generateOptions(count, selectId) {
    const selectElement = document.getElementById(selectId);
    for (let i = 0; i < count; i++) {
        const option = document.createElement('option');
        option.value = `${i}`;
        option.textContent = `${symptoms[i]}`;
        selectElement.appendChild(option);
    }
}

// Call the generateOptions function for each select tag
generateOptions(95, 'symptom1');
generateOptions(95, 'symptom2');
generateOptions(95, 'symptom3');
generateOptions(95, 'symptom4');
generateOptions(95, 'symptom5');